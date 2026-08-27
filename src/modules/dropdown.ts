/**
 * Kairos Module — Dropdown
 * مكون القائمة المنسدلة
 *
 * Implements: docs/component-specs/dropdown.md
 * Dependencies: core only
 *
 * Lifecycle:
 *   trigger click → before-open → data-state="open" → transitionend → opened
 *   outside click / Escape / item click → before-close → data-state="closed" → transitionend → closed
 */

import { closest, resolveTarget, qa } from '../core/dom';
import { emit, on } from '../core/events';
import * as State from '../core/state';
import { waitTransition } from '../core/animation';
import { onEscape, onArrows, onActivate } from '../core/keyboard';

let activeDropdown: HTMLElement | null = null;
let activeTrigger: HTMLElement | null = null;
let cleanups: (() => void)[] = [];

/** Open a dropdown */
async function openDropdown(trigger: HTMLElement, dropdown: HTMLElement): Promise<void> {
  // Close any already-open dropdown first
  if (activeDropdown) {
    await closeDropdown(activeDropdown);
  }

  const allowed = emit(dropdown, 'kairos:dropdown:before-open', null, { cancelable: true });
  if (!allowed) return;

  State.open(dropdown);
  trigger.setAttribute('aria-expanded', 'true');
  activeDropdown = dropdown;
  activeTrigger = trigger;

  // Keyboard: Escape to close
  cleanups.push(
    onEscape((e) => {
      e.preventDefault();
      closeDropdown(dropdown);
    })
  );

  // Keyboard: Arrow navigation within items
  const items = qa<HTMLElement>('.kairos-dropdown-item:not([disabled])', dropdown);
  let selectedIndex = -1;

  cleanups.push(
    onArrows(dropdown, {
      down: () => {
        selectedIndex = Math.min(selectedIndex + 1, items.length - 1);
        items[selectedIndex]?.focus();
      },
      up: () => {
        selectedIndex = Math.max(selectedIndex - 1, 0);
        items[selectedIndex]?.focus();
      },
    })
  );

  // Outside click to close
  cleanups.push(
    on(document, 'click', ((e: MouseEvent) => {
      const wrapper = closest(e.target as Element, '.kairos-dropdown-wrapper');
      if (!wrapper || !wrapper.contains(dropdown)) {
        closeDropdown(dropdown);
      }
    }) as EventListener)
  );

  await waitTransition(dropdown);
  emit(dropdown, 'kairos:dropdown:opened');
}

/** Close a dropdown */
async function closeDropdown(dropdown: HTMLElement): Promise<void> {
  if (!State.is(dropdown, 'open')) return;

  const allowed = emit(dropdown, 'kairos:dropdown:before-close', null, { cancelable: true });
  if (!allowed) return;

  State.close(dropdown);
  if (activeTrigger) {
    activeTrigger.setAttribute('aria-expanded', 'false');
    activeTrigger.focus();
    activeTrigger = null;
  }

  cleanups.forEach((fn) => fn());
  cleanups = [];
  activeDropdown = null;

  await waitTransition(dropdown);
  emit(dropdown, 'kairos:dropdown:closed');
}

let initialized = false;

/** Initialize dropdown delegation */
export function init(): void {
  if (initialized) return;
  initialized = true;

  on(document, 'click', ((e: MouseEvent) => {
    // Toggle trigger
    const trigger = closest<HTMLElement>(e.target as Element, '[data-kairos-toggle="dropdown"]');
    if (trigger) {
      e.preventDefault();
      e.stopPropagation();
      const dropdown = resolveTarget(trigger) ||
        trigger.parentElement?.querySelector<HTMLElement>('.kairos-dropdown');
      if (!dropdown) return;

      if (State.is(dropdown, 'open')) {
        closeDropdown(dropdown);
      } else {
        openDropdown(trigger, dropdown);
      }
      return;
    }

    // Item click: emit select event, then close
    const item = closest<HTMLElement>(e.target as Element, '.kairos-dropdown-item');
    if (item && activeDropdown) {
      emit(activeDropdown, 'kairos:dropdown:select', { item });
      closeDropdown(activeDropdown);
    }
  }) as EventListener);
}

export const Dropdown = { open: openDropdown, close: closeDropdown, init };
