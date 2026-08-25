/**
 * Kairos Core — Keyboard Utilities
 * أدوات لوحة المفاتيح
 */

import { on } from './events';

type KeyHandler = (e: KeyboardEvent) => void;

/** Register a global keydown handler for Escape */
export function onEscape(handler: KeyHandler): () => void {
  return on(document, 'keydown', ((e: KeyboardEvent) => {
    if (e.key === 'Escape') handler(e);
  }) as EventListener);
}

/** Register a handler for Enter or Space */
export function onActivate(
  el: HTMLElement,
  handler: KeyHandler
): () => void {
  return on(el, 'keydown', ((e: KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handler(e);
    }
  }) as EventListener);
}

/** Register ArrowDown/ArrowUp handlers for list navigation */
export function onArrows(
  el: HTMLElement,
  handlers: { down?: KeyHandler; up?: KeyHandler }
): () => void {
  return on(el, 'keydown', ((e: KeyboardEvent) => {
    if (e.key === 'ArrowDown' && handlers.down) {
      e.preventDefault();
      handlers.down(e);
    }
    if (e.key === 'ArrowUp' && handlers.up) {
      e.preventDefault();
      handlers.up(e);
    }
  }) as EventListener);
}

/** Register ArrowLeft/ArrowRight handlers for horizontal navigation */
export function onHorizontalArrows(
  el: HTMLElement,
  handlers: { left?: KeyHandler; right?: KeyHandler }
): () => void {
  return on(el, 'keydown', ((e: KeyboardEvent) => {
    if (e.key === 'ArrowLeft' && handlers.left) {
      e.preventDefault();
      handlers.left(e);
    }
    if (e.key === 'ArrowRight' && handlers.right) {
      e.preventDefault();
      handlers.right(e);
    }
  }) as EventListener);
}

/** Register Home/End handlers */
export function onHomeEnd(
  el: HTMLElement,
  handlers: { home?: KeyHandler; end?: KeyHandler }
): () => void {
  return on(el, 'keydown', ((e: KeyboardEvent) => {
    if (e.key === 'Home' && handlers.home) {
      e.preventDefault();
      handlers.home(e);
    }
    if (e.key === 'End' && handlers.end) {
      e.preventDefault();
      handlers.end(e);
    }
  }) as EventListener);
}

/** Register Tab key handler */
export function onTab(
  el: HTMLElement,
  handler: KeyHandler
): () => void {
  return on(el, 'keydown', ((e: KeyboardEvent) => {
    if (e.key === 'Tab') handler(e);
  }) as EventListener);
}

/** Register a global keyboard shortcut (e.g., Ctrl+K) */
export function hotkey(
  combo: string,
  handler: KeyHandler
): () => void {
  const parts = combo.toLowerCase().split('+');
  const key = parts.pop()!;
  const modifiers = {
    ctrl: parts.includes('ctrl'),
    shift: parts.includes('shift'),
    alt: parts.includes('alt'),
    meta: parts.includes('meta'),
  };

  return on(document, 'keydown', ((e: KeyboardEvent) => {
    if (
      e.key.toLowerCase() === key &&
      e.ctrlKey === modifiers.ctrl &&
      e.shiftKey === modifiers.shift &&
      e.altKey === modifiers.alt &&
      e.metaKey === modifiers.meta
    ) {
      e.preventDefault();
      handler(e);
    }
  }) as EventListener);
}
