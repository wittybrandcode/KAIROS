/**
 * Kairos Core — Event Utilities
 * نظام الأحداث المخصصة
 *
 * Thin wrappers around native CustomEvent.
 * No Event Bus. No PubSub. Just DOM events.
 */

/** Emit a namespaced CustomEvent on an element */
export function emit<T = unknown>(
  el: Element | Document,
  name: string,
  detail?: T,
  options?: { cancelable?: boolean }
): boolean {
  const event = new CustomEvent(name, {
    bubbles: true,
    cancelable: options?.cancelable ?? false,
    detail,
  });
  return el.dispatchEvent(event);
}

/** Add an event listener (returns a cleanup function) */
export function on<K extends keyof HTMLElementEventMap>(
  el: EventTarget,
  type: K,
  handler: (e: HTMLElementEventMap[K]) => void,
  options?: boolean | AddEventListenerOptions
): () => void;
export function on(
  el: EventTarget,
  type: string,
  handler: EventListener,
  options?: boolean | AddEventListenerOptions
): () => void;
export function on(
  el: EventTarget,
  type: string,
  handler: EventListener,
  options?: boolean | AddEventListenerOptions
): () => void {
  el.addEventListener(type, handler, options);
  return () => el.removeEventListener(type, handler, options);
}

/** Remove an event listener */
export function off(
  el: EventTarget,
  type: string,
  handler: EventListener,
  options?: boolean | EventListenerOptions
): void {
  el.removeEventListener(type, handler, options);
}

/** Add a one-time event listener */
export function once(
  el: EventTarget,
  type: string,
  handler: EventListener
): () => void {
  return on(el, type, handler, { once: true });
}
