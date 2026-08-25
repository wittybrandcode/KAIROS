/**
 * Kairos Module — Modal
 * مكون النافذة المنبثقة
 *
 * Implements: docs/component-specs/modal.md
 * Dependencies: core only (no other modules)
 *
 * Lifecycle:
 *   data-state="closed" → trigger click → before-open → data-state="open" → transitionend → opened
 *   data-state="open" → dismiss/Escape → before-close → data-state="closed" → transitionend → closed
 */

import { q, qa, closest, resolveTarget } from '../core/dom';
import { emit, on } from '../core/events';
import * as State from '../core/state';
import * as Focus from '../core/focus';
import { waitTransition } from '../core/animation';
import { onEscape } from '../core/keyboard';

/** Track cleanup functions for the currently open modal */
let activeCleanups: (() => void)[] = [];

/** Open a modal */
async function openModal(modal: HTMLElement): Promise<void> {
  if (State.is(modal, 'open')) return;

  // Cancelable before-open event
  const allowed = emit(modal, 'kairos:modal:before-open', null, { cancelable: true });
  if (!allowed) return;

  // Set state — CSS takes over the visual transition
  State.open(modal);
  modal.setAttribute('aria-hidden', 'false');

  // Prevent body scroll
  document.body.classList.add('kairos-no-scroll');

  // Trap focus inside the modal content
  const content = q<HTMLElement>('.kairos-modal-content', modal);
  if (content) {
    const cleanupTrap = Focus.trap(content);
    activeCleanups.push(cleanupTrap);
  }

  // Register Escape to close
  const cleanupEsc = onEscape((e) => {
    e.preventDefault();
    closeModal(modal);
  });
  activeCleanups.push(cleanupEsc);

  // Wait for CSS transition to complete, then emit opened
  await waitTransition(modal);
  emit(modal, 'kairos:modal:opened');
}

/** Close a modal */
async function closeModal(modal: HTMLElement): Promise<void> {
  if (!State.is(modal, 'open')) return;

  // Cancelable before-close event
  const allowed = emit(modal, 'kairos:modal:before-close', null, { cancelable: true });
  if (!allowed) return;

  // Set state — CSS handles the closing transition
  State.close(modal);
  modal.setAttribute('aria-hidden', 'true');

  // Remove all active listeners
  activeCleanups.forEach((fn) => fn());
  activeCleanups = [];

  // Restore body scroll
  document.body.classList.remove('kairos-no-scroll');

  // Restore focus to the trigger
  Focus.restore();

  // Wait for transition, then emit closed
  await waitTransition(modal);
  emit(modal, 'kairos:modal:closed');
}

/** Initialize modal delegation */
export function init(): void {
  // Click delegation: open triggers
  on(document, 'click', ((e: MouseEvent) => {
    const trigger = closest<HTMLElement>(e.target as Element, '[data-kairos-toggle="modal"]');
    if (trigger) {
      e.preventDefault();
      const modal = resolveTarget(trigger);
      if (modal) openModal(modal);
      return;
    }

    // Dismiss buttons
    const dismiss = closest<HTMLElement>(e.target as Element, '[data-kairos-dismiss]');
    if (dismiss) {
      const modal = closest<HTMLElement>(dismiss, '.kairos-modal');
      if (modal) {
        e.preventDefault();
        closeModal(modal);
        return;
      }
    }

    // Backdrop click (clicking directly on the modal overlay, not its content)
    const target = e.target as HTMLElement;
    if (target.classList.contains('kairos-modal-backdrop')) {
      const modal = closest<HTMLElement>(target, '.kairos-modal');
      if (modal && modal.getAttribute('data-backdrop') !== 'static') {
        closeModal(modal);
      }
    }
  }) as EventListener);
}

/** Public API */
export const Modal = { open: openModal, close: closeModal, init };
