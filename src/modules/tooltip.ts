/**
 * Kairos Module — Tooltip
 * مكون التلميح السياقي
 *
 * Implements: docs/component-specs/tooltip.md
 * Dependencies: core only
 *
 * Behavior:
 *   - Hover already works via CSS (.kairos-tip-host:hover .kairos-tip { opacity:1 })
 *   - JS adds focus-triggered display + aria-describedby + Escape dismiss
 *   - Supports both static .kairos-tip inside host and dynamic data-kairos-tooltip
 */

import { closest } from '../core/dom';
import { emit, on } from '../core/events';
import { onEscape } from '../core/keyboard';
import { uid } from '../core/utils';

let initialized = false;
let activeTooltip: HTMLElement | null = null;
let activeTrigger: HTMLElement | null = null;
let escapeCleanup: (() => void) | null = null;

/** Show tooltip for a trigger */
function showTooltip(trigger: HTMLElement, tip: HTMLElement): void {
  if (activeTooltip === tip) return;

  // Ensure tip has id for aria-describedby
  if (!tip.id) tip.id = uid('kairos-tooltip-');
  trigger.setAttribute('aria-describedby', tip.id);

  // Make tip visible (JS focus path) — CSS hover already handles mouse
  tip.dataset.state = 'open';
  (tip as HTMLElement).style.opacity = '1';
  tip.setAttribute('role', 'tooltip');

  activeTooltip = tip;
  activeTrigger = trigger;

  emit(trigger, 'kairos:tooltip:show', { tip });

  // Escape to hide
  if (escapeCleanup) escapeCleanup();
  escapeCleanup = onEscape(() => hideTooltip());
}

/** Hide current tooltip */
function hideTooltip(): void {
  if (!activeTooltip || !activeTrigger) return;

  const tip = activeTooltip;
  const trigger = activeTrigger;

  tip.dataset.state = 'closed';
  (tip as HTMLElement).style.opacity = '0';
  trigger.removeAttribute('aria-describedby');

  emit(trigger, 'kairos:tooltip:hide', { tip });

  activeTooltip = null;
  activeTrigger = null;

  if (escapeCleanup) {
    escapeCleanup();
    escapeCleanup = null;
  }
}

/** Resolve tip element for a trigger */
function resolveTip(trigger: HTMLElement): HTMLElement | null {
  // Case 1: data-kairos-tooltip -> dynamic tooltip (create if not exists)
  const text = trigger.getAttribute('data-kairos-tooltip');
  if (text) {
    let tip = document.getElementById(trigger.getAttribute('aria-describedby') || '');
    if (!tip) {
      tip = document.createElement('div');
      tip.className = 'kairos-tooltip';
      tip.textContent = text;
      tip.dataset.state = 'closed';
      document.body.appendChild(tip);
    }
    return tip as HTMLElement;
  }

  // Case 2: .kairos-tip inside host
  const host = closest<HTMLElement>(trigger, '.kairos-tip-host');
  if (host) {
    return host.querySelector<HTMLElement>('.kairos-tip');
  }

  // Case 3: trigger itself is inside host, find sibling tip
  const parentHost = trigger.closest('.kairos-tip-host');
  if (parentHost) {
    return parentHost.querySelector<HTMLElement>('.kairos-tip');
  }

  return null;
}

/** Initialize tooltip delegation */
export function init(): void {
  if (initialized) return;
  initialized = true;

  // Focus triggers show
  on(document, 'focusin', ((e: FocusEvent) => {
    const trigger = closest<HTMLElement>(e.target as Element, '.kairos-tip-host, [data-kairos-tooltip]');
    if (!trigger) return;

    // Find the actual focusable element inside host, or the trigger itself
    const tip = resolveTip(trigger) || resolveTip(e.target as HTMLElement);
    if (!tip) return;

    showTooltip(trigger as HTMLElement, tip);
  }) as EventListener);

  // Blur hides
  on(document, 'focusout', ((e: FocusEvent) => {
    const trigger = closest<HTMLElement>(e.target as Element, '.kairos-tip-host, [data-kairos-tooltip]');
    if (!trigger) return;
    hideTooltip();
  }) as EventListener);
}

export const Tooltip = { show: showTooltip, hide: hideTooltip, init, _reset: () => { initialized = false; hideTooltip(); } };
