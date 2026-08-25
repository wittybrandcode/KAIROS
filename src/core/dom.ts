/**
 * Kairos Core — DOM Utilities
 * استعلامات وعمليات DOM
 *
 * All DOM queries and manipulations go through this module.
 * No other module touches the DOM directly for queries.
 */

/** Query a single element */
export function q<T extends Element = Element>(
  selector: string,
  context: Document | Element = document
): T | null {
  return context.querySelector<T>(selector);
}

/** Query all elements */
export function qa<T extends Element = Element>(
  selector: string,
  context: Document | Element = document
): T[] {
  return Array.from(context.querySelectorAll<T>(selector));
}

/** Find closest ancestor matching selector */
export function closest<T extends Element = Element>(
  el: Element | null,
  selector: string
): T | null {
  return el ? (el.closest(selector) as T | null) : null;
}

/** Resolve a target element from a trigger's data-kairos-target */
export function resolveTarget(trigger: Element): HTMLElement | null {
  const selector = trigger.getAttribute('data-kairos-target');
  if (!selector) return null;
  return document.querySelector<HTMLElement>(selector);
}

/** Get all focusable elements inside a container */
const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

export function getFocusable(container: HTMLElement): HTMLElement[] {
  return Array.from(container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR));
}
