/**
 * Kairos Core — Focus Management
 * إدارة التركيز — حبس واستعادة التركيز
 */

import { getFocusable } from './dom';
import { on } from './events';

/** Stack of previously focused elements (for nested overlays) */
const focusStack: HTMLElement[] = [];

/** Trap focus inside a container */
export function trap(container: HTMLElement): () => void {
  // Save the element that had focus before trapping
  const previouslyFocused = document.activeElement as HTMLElement | null;
  if (previouslyFocused) {
    focusStack.push(previouslyFocused);
  }

  // Focus the first focusable element
  const focusable = getFocusable(container);
  if (focusable.length > 0) {
    focusable[0]!.focus();
  } else {
    // If no focusable children, make the container itself focusable
    container.setAttribute('tabindex', '-1');
    container.focus();
  }

  // Set up the Tab key trap
  const cleanup = on(container, 'keydown', (e: KeyboardEvent) => {
    if (e.key !== 'Tab') return;

    const elements = getFocusable(container);
    if (elements.length === 0) {
      e.preventDefault();
      return;
    }

    const first = elements[0]!;
    const last = elements[elements.length - 1]!;

    if (e.shiftKey) {
      if (document.activeElement === first) {
        e.preventDefault();
        last.focus();
      }
    } else {
      if (document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  });

  return cleanup;
}

/** Restore focus to the element that was focused before the last trap() */
export function restore(): void {
  const previous = focusStack.pop();
  if (previous && typeof previous.focus === 'function') {
    previous.focus();
  }
}

/** Move focus to the next focusable element inside a container */
export function next(container: HTMLElement): void {
  const elements = getFocusable(container);
  if (elements.length === 0) return;

  const currentIndex = elements.indexOf(document.activeElement as HTMLElement);
  const nextIndex = currentIndex < elements.length - 1 ? currentIndex + 1 : 0;
  elements[nextIndex]!.focus();
}

/** Move focus to the previous focusable element inside a container */
export function previous(container: HTMLElement): void {
  const elements = getFocusable(container);
  if (elements.length === 0) return;

  const currentIndex = elements.indexOf(document.activeElement as HTMLElement);
  const prevIndex = currentIndex > 0 ? currentIndex - 1 : elements.length - 1;
  elements[prevIndex]!.focus();
}
