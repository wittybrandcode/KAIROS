/**
 * Kairos Module — Accordion
 * مكون الأكورديون
 *
 * Implements: docs/component-specs/accordion.md
 * Dependencies: core only
 */

import { closest, q, qa } from '../core/dom';
import { emit, on } from '../core/events';
import * as State from '../core/state';

const TRIGGER_SELECTOR = '[data-kairos-toggle="accordion"]';
const ITEM_SELECTOR = '.kairos-accordion-item';
const GROUP_SELECTOR = '.kairos-accordion';

/** Sync a trigger's ARIA attributes with its item state */
function syncTrigger(item: HTMLElement, open: boolean): void {
  const trigger = q('.kairos-accordion-trigger', item);
  if (trigger) trigger.setAttribute('aria-expanded', open ? 'true' : 'false');
}

/** Close sibling items when the group enforces single-open mode */
function closeSiblings(item: HTMLElement, group: HTMLElement): void {
  const allowMultiple = group.getAttribute('data-kairos-allow-multiple') === 'true';
  if (allowMultiple) return;

  qa<HTMLElement>(ITEM_SELECTOR, group).forEach((sibling) => {
    if (sibling !== item && State.is(sibling, 'open')) close(sibling);
  });
}

/** Open an accordion item (cancelable lifecycle) */
export function open(item: HTMLElement): void {
  if (State.is(item, 'open')) return;
  if (!emit(item, 'kairos:accordion:before-open', {}, { cancelable: true })) return;

  const group = closest<HTMLElement>(item, GROUP_SELECTOR);
  if (group) closeSiblings(item, group);

  State.open(item);
  syncTrigger(item, true);
  emit(item, 'kairos:accordion:opened');
}

/** Close an accordion item (cancelable lifecycle) */
export function close(item: HTMLElement): void {
  if (!State.is(item, 'open')) return;
  if (!emit(item, 'kairos:accordion:before-close', {}, { cancelable: true })) return;

  State.close(item);
  syncTrigger(item, false);
  emit(item, 'kairos:accordion:closed');
}

/** Toggle an accordion item */
export function toggle(item: HTMLElement): void {
  if (State.is(item, 'open')) close(item);
  else open(item);
}

/** Initialize accordion delegation + sync existing ARIA state (idempotent) */
let initialized = false;

export function init(): void {
  if (initialized) return;
  initialized = true;

  // Click delegation — closest() guarantees nested accordions stay isolated
  on(document, 'click', ((e: MouseEvent) => {
    const trigger = closest<HTMLElement>(e.target as Element, TRIGGER_SELECTOR);
    if (!trigger || trigger.hasAttribute('disabled') || State.is(trigger, 'disabled')) return;

    const item = closest<HTMLElement>(trigger, ITEM_SELECTOR);
    if (!item) return;

    e.preventDefault();
    toggle(item);
  }) as EventListener);

  // Sync aria-expanded for any server-rendered open/closed markup
  qa<HTMLElement>(`${ITEM_SELECTOR} .kairos-accordion-trigger`).forEach((trigger) => {
    const item = closest<HTMLElement>(trigger, ITEM_SELECTOR);
    if (item) syncTrigger(item, State.is(item, 'open'));
  });
}

export const Accordion = { open, close, toggle, init };
