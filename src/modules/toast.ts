/**
 * Kairos Module — Toast
 * مكون الإشعارات
 *
 * Implements: docs/component-specs/toast.md
 * Dependencies: core only
 *
 * Lifecycle:
 *   show() → data-state="open" → auto-dismiss timer → data-state="closed" → remove from DOM
 *   hover pauses timer, mouseleave resumes
 */

import { closest, q } from '../core/dom';
import { emit, on } from '../core/events';
import * as State from '../core/state';
import { waitTransition } from '../core/animation';

/** Timer map: element → timeout ID */
const timers = new WeakMap<HTMLElement, ReturnType<typeof setTimeout>>();
const remaining = new WeakMap<HTMLElement, { start: number; delay: number }>();

/** Show a toast */
async function showToast(
  toast: HTMLElement,
  options?: { duration?: number }
): Promise<void> {
  const duration = options?.duration ?? 5000;

  State.open(toast);
  toast.setAttribute('role', 'status');
  toast.setAttribute('aria-live', 'polite');

  emit(toast, 'kairos:toast:show');

  // Auto-dismiss with hover pause
  if (duration > 0) {
    startTimer(toast, duration);

    // Pause on hover
    on(toast, 'mouseenter', (() => {
      pauseTimer(toast);
    }) as EventListener);

    on(toast, 'mouseleave', (() => {
      resumeTimer(toast);
    }) as EventListener);
  }
}

/** Dismiss a toast */
async function dismissToast(toast: HTMLElement): Promise<void> {
  clearTimer(toast);
  State.close(toast);

  emit(toast, 'kairos:toast:hide');

  await waitTransition(toast);

  // Remove from DOM after transition
  toast.remove();
}

function startTimer(toast: HTMLElement, delay: number): void {
  clearTimer(toast);
  remaining.set(toast, { start: Date.now(), delay });
  const id = setTimeout(() => dismissToast(toast), delay);
  timers.set(toast, id);
}

function pauseTimer(toast: HTMLElement): void {
  const data = remaining.get(toast);
  if (!data) return;
  clearTimer(toast);
  const elapsed = Date.now() - data.start;
  remaining.set(toast, { start: 0, delay: data.delay - elapsed });
}

function resumeTimer(toast: HTMLElement): void {
  const data = remaining.get(toast);
  if (!data || data.delay <= 0) return;
  startTimer(toast, data.delay);
}

function clearTimer(toast: HTMLElement): void {
  const id = timers.get(toast);
  if (id) {
    clearTimeout(id);
    timers.delete(toast);
  }
}

/** Initialize toast delegation */
export function init(): void {
  on(document, 'click', ((e: MouseEvent) => {
    // Trigger: show toast
    const trigger = closest<HTMLElement>(e.target as Element, '[data-kairos-toggle="toast"]');
    if (trigger) {
      e.preventDefault();
      const targetSelector = trigger.getAttribute('data-kairos-target');
      if (!targetSelector) return;
      const toast = document.querySelector<HTMLElement>(targetSelector);
      if (!toast) return;
      const duration = parseInt(trigger.getAttribute('data-kairos-duration') || '5000', 10);
      showToast(toast, { duration });
      return;
    }

    // Dismiss button
    const dismiss = closest<HTMLElement>(e.target as Element, '[data-kairos-dismiss]');
    if (dismiss) {
      const toast = closest<HTMLElement>(dismiss, '.kairos-toast');
      if (toast) {
        e.preventDefault();
        dismissToast(toast);
      }
    }
  }) as EventListener);
}

export const Toast = { show: showToast, dismiss: dismissToast, init };
