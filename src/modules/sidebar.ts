/**
 * Kairos Module — Sidebar
 * الشريط الجانبي القابل للطي
 *
 * Implements: docs/component-specs/sidebar.md
 * Dependencies: core only
 */

import { closest, qa, resolveTarget } from '../core/dom';
import { emit, on } from '../core/events';
import * as State from '../core/state';
import { onEscape } from '../core/keyboard';

let initialized = false;
let activeSidebar: HTMLElement | null = null;
let escapeCleanup: (() => void) | null = null;
let documentCleanup: (() => void) | null = null;

function openSidebar(sidebar: HTMLElement): void {
  if (State.is(sidebar, 'open')) return;
  if (!emit(sidebar, 'kairos:sidebar:before-open', null, { cancelable: true })) return;
  State.open(sidebar);
  sidebar.setAttribute('aria-hidden', 'false');
  activeSidebar = sidebar;

  // Escape to close
  if (escapeCleanup) escapeCleanup();
  escapeCleanup = onEscape(() => closeSidebar(sidebar));

  emit(sidebar, 'kairos:sidebar:opened');
}

function closeSidebar(sidebar: HTMLElement): void {
  if (!State.is(sidebar, 'open')) return;
  if (!emit(sidebar, 'kairos:sidebar:before-close', null, { cancelable: true })) return;
  State.close(sidebar);
  sidebar.setAttribute('aria-hidden', 'true');
  activeSidebar = null;

  if (escapeCleanup) {
    escapeCleanup();
    escapeCleanup = null;
  }

  emit(sidebar, 'kairos:sidebar:closed');
}

function toggleSidebar(sidebar: HTMLElement): void {
  if (State.is(sidebar, 'open')) closeSidebar(sidebar);
  else openSidebar(sidebar);
}

function activateItem(item: HTMLElement): void {
  const sidebar = closest<HTMLElement>(item, '.kairos-sidebar');
  if (!sidebar) return;
  qa<HTMLElement>('.kairos-sidebar-item', sidebar).forEach((el) => {
    if (el === item) {
      el.dataset.state = 'active';
    } else if (el.dataset.state === 'active') {
      delete el.dataset.state;
    }
  });
  emit(sidebar, 'kairos:sidebar:change', { item });
}

export function init(): void {
  if (initialized) return;
  initialized = true;

  // Toggle via data-kairos-toggle="sidebar"
  documentCleanup = on(document, 'click', ((e: MouseEvent) => {
    const trigger = closest<HTMLElement>(e.target as Element, '[data-kairos-toggle="sidebar"]');
    if (trigger) {
      e.preventDefault();
      const sidebar = resolveTarget(trigger) || document.querySelector<HTMLElement>('.kairos-sidebar');
      if (!sidebar) return;
      toggleSidebar(sidebar);
      return;
    }

    // Dismiss button
    const dismiss = closest<HTMLElement>(e.target as Element, '[data-kairos-dismiss]');
    if (dismiss) {
      const sidebar = closest<HTMLElement>(dismiss, '.kairos-sidebar');
      if (sidebar) {
        e.preventDefault();
        closeSidebar(sidebar);
        return;
      }
    }

    // Activate sidebar item
    const item = closest<HTMLElement>(e.target as Element, '.kairos-sidebar-item');
    if (item) {
      // Don't prevent default for links, just activate
      activateItem(item);
    }
  }) as EventListener);
}

export const Sidebar = { open: openSidebar, close: closeSidebar, toggle: toggleSidebar, activate: activateItem, init, _reset: () => { if (escapeCleanup) { escapeCleanup(); escapeCleanup = null; } if (documentCleanup) { documentCleanup(); documentCleanup = null; } initialized = false; activeSidebar = null; } };
