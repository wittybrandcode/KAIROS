/**
 * Kairos Module — Popover
 * مكون الطبقة السياقية الغنية
 *
 * Implements: docs/component-specs/popover.md
 * Dependencies: core only
 *
 * Lifecycle:
 *   trigger click → before-open → data-state="open" → trap focus → transitionend → opened
 *   outside click / Escape / dismiss → before-close → data-state="closed" → restore focus → transitionend → closed
 */

import { closest, resolveTarget } from '../core/dom';
import { emit, on } from '../core/events';
import * as State from '../core/state';
import * as Focus from '../core/focus';
import { waitTransition } from '../core/animation';
import { onEscape } from '../core/keyboard';

let activePopover: HTMLElement | null = null;
let activeTrigger: HTMLElement | null = null;
let cleanups: (() => void)[] = [];

/** Open a popover */
async function openPopover(trigger: HTMLElement, popover: HTMLElement): Promise<void> {
  if (State.is(popover, 'open')) return;

  // Close any already-open popover first
  if (activePopover && activePopover !== popover) {
    await closePopover(activePopover);
  }

  const allowed = emit(popover, 'kairos:popover:before-open', null, { cancelable: true });
  if (!allowed) return;

  State.open(popover);
  trigger.setAttribute('aria-expanded', 'true');
  activePopover = popover;
  activeTrigger = trigger;

  // Trap focus inside popover
  const cleanupTrap = Focus.trap(popover);
  cleanups.push(cleanupTrap);

  // Escape to close
  cleanups.push(
    onEscape((e) => {
      e.preventDefault();
      closePopover(popover);
    })
  );

  // Outside click to close (outside wrapper/host)
  cleanups.push(
    on(document, 'click', ((e: MouseEvent) => {
      const wrapper = closest(e.target as Element, '.kairos-popover-wrapper, .kairos-popover-host');
      if (!wrapper || !wrapper.contains(popover)) {
        closePopover(popover);
      }
    }) as EventListener)
  );

  await waitTransition(popover);
  emit(popover, 'kairos:popover:opened');
}

/** Close a popover */
async function closePopover(popover: HTMLElement): Promise<void> {
  if (!State.is(popover, 'open')) return;

  const allowed = emit(popover, 'kairos:popover:before-close', null, { cancelable: true });
  if (!allowed) return;

  State.close(popover);
  if (activeTrigger) {
    activeTrigger.setAttribute('aria-expanded', 'false');
    activeTrigger = null;
  }

  cleanups.forEach((fn) => fn());
  cleanups = [];
  activePopover = null;

  Focus.restore();

  await waitTransition(popover);
  emit(popover, 'kairos:popover:closed');
}

let initialized = false;
let documentCleanup: (() => void) | null = null;

/** Reset internal state for testing */
export function _reset(): void {
  initialized = false;
  if (documentCleanup) {
    documentCleanup();
    documentCleanup = null;
  }
  cleanups.forEach((fn) => fn());
  cleanups = [];
  activePopover = null;
  activeTrigger = null;
}

/** Initialize popover delegation */
export function init(): void {
  if (initialized) return;
  initialized = true;

  documentCleanup = on(document, 'click', ((e: MouseEvent) => {
    // Toggle trigger
    const trigger = closest<HTMLElement>(e.target as Element, '[data-kairos-toggle="popover"]');
    if (trigger) {
      e.preventDefault();
      e.stopPropagation();
      const popover = resolveTarget(trigger) ||
        trigger.parentElement?.querySelector<HTMLElement>('.kairos-popover') ||
        closest<HTMLElement>(trigger, '.kairos-popover-wrapper')?.querySelector<HTMLElement>('.kairos-popover');
      if (!popover) return;

      if (State.is(popover, 'open')) {
        closePopover(popover);
      } else {
        openPopover(trigger, popover);
      }
      return;
    }

    // Dismiss button inside popover
    const dismiss = closest<HTMLElement>(e.target as Element, '[data-kairos-dismiss]');
    if (dismiss && activePopover) {
      const popoverEl = closest<HTMLElement>(dismiss, '.kairos-popover');
      if (popoverEl) {
        e.preventDefault();
        closePopover(popoverEl);
      }
    }
  }) as EventListener);
}

export const Popover = { open: openPopover, close: closePopover, init, _reset };
