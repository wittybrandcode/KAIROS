/**
 * Kairos Module — Tabs
 * مكون الألسن
 *
 * Implements: docs/component-specs/tabs.md
 * Dependencies: core only
 */

import { closest, q, qa } from '../core/dom';
import { emit, on } from '../core/events';
import * as State from '../core/state';
import { onHorizontalArrows } from '../core/keyboard';

/** Activate a tab and its corresponding panel */
function activateTab(tab: HTMLElement): void {
  const tabsContainer = closest<HTMLElement>(tab, '.kairos-tabs');
  if (!tabsContainer) return;

  // Deactivate all tabs and panels in this container
  const allTabs = qa<HTMLElement>('.kairos-tab', tabsContainer);
  const allPanels = qa<HTMLElement>('.kairos-tabs-panel', tabsContainer);

  allTabs.forEach((t) => {
    State.deactivate(t);
    t.setAttribute('aria-selected', 'false');
    t.setAttribute('tabindex', '-1');
  });

  allPanels.forEach((p) => {
    State.deactivate(p);
  });

  // Activate the clicked tab
  State.activate(tab);
  tab.setAttribute('aria-selected', 'true');
  tab.setAttribute('tabindex', '0');
  tab.focus();

  // Activate the corresponding panel
  const targetSelector = tab.getAttribute('data-kairos-target');
  if (targetSelector) {
    const panel = document.querySelector<HTMLElement>(targetSelector);
    if (panel) State.activate(panel);
  }

  emit(tabsContainer, 'kairos:tab:changed', { tab });
}

let initialized = false;

/** Initialize tabs delegation */
export function init(): void {
  if (initialized) return;
  initialized = true;

  // Click delegation
  on(document, 'click', ((e: MouseEvent) => {
    const tab = closest<HTMLElement>(e.target as Element, '[data-kairos-toggle="tab"]');
    if (tab && !tab.hasAttribute('disabled') && !State.is(tab, 'disabled')) {
      e.preventDefault();
      activateTab(tab);
    }
  }) as EventListener);

  // Keyboard: Arrow navigation within tab lists
  on(document, 'keydown', ((e: KeyboardEvent) => {
    const tab = closest<HTMLElement>(e.target as Element, '.kairos-tab');
    if (!tab) return;

    const tablist = closest<HTMLElement>(tab, '.kairos-tabs-list');
    if (!tablist) return;

    const tabs = qa<HTMLElement>('.kairos-tab:not([disabled])', tablist);
    const currentIndex = tabs.indexOf(tab);
    if (currentIndex === -1) return;

    let nextIndex = -1;
    if (e.key === 'ArrowRight') {
      nextIndex = currentIndex < tabs.length - 1 ? currentIndex + 1 : 0;
    } else if (e.key === 'ArrowLeft') {
      nextIndex = currentIndex > 0 ? currentIndex - 1 : tabs.length - 1;
    } else if (e.key === 'Home') {
      nextIndex = 0;
    } else if (e.key === 'End') {
      nextIndex = tabs.length - 1;
    }

    if (nextIndex >= 0) {
      e.preventDefault();
      activateTab(tabs[nextIndex]!);
    }
  }) as EventListener);
}

export const Tabs = { activate: activateTab, init };
