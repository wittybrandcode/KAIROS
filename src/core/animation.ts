/**
 * Kairos Core — Animation Utilities
 * أدوات الحركة — transitionend + Fallback Timeout
 *
 * CSS drives all animations.
 * JS only waits for them to complete.
 */

/**
 * Returns a Promise that resolves when CSS transitions finish on an element.
 * Uses transitionend as primary signal with a fallback timeout.
 *
 * Flow:
 *   change data-state → CSS starts transition → transitionend → resolve
 *   OR fallback timeout → resolve
 */
export function waitTransition(el: HTMLElement, fallbackMs?: number): Promise<void> {
  return new Promise((resolve) => {
    // Read the computed transition duration to determine the fallback
    const computed = getComputedStyle(el);
    const durationStr = computed.transitionDuration || '0s';
    // Parse "0.2s" or "200ms" into milliseconds
    const durationMs = parseDuration(durationStr);

    // If there's no transition, resolve immediately
    if (durationMs === 0) {
      resolve();
      return;
    }

    let resolved = false;

    const done = () => {
      if (resolved) return;
      resolved = true;
      el.removeEventListener('transitionend', onEnd);
      clearTimeout(timer);
      resolve();
    };

    const onEnd = (e: TransitionEvent) => {
      // Only resolve for transitions on this element, not children
      if (e.target === el) done();
    };

    el.addEventListener('transitionend', onEnd);

    // Fallback: duration + 50ms safety margin
    const timeout = fallbackMs ?? durationMs + 50;
    const timer = setTimeout(done, timeout);
  });
}

/**
 * Returns a Promise that resolves when CSS animations finish on an element.
 */
export function waitAnimation(el: HTMLElement, fallbackMs?: number): Promise<void> {
  return new Promise((resolve) => {
    const computed = getComputedStyle(el);
    const durationStr = computed.animationDuration || '0s';
    const durationMs = parseDuration(durationStr);

    if (durationMs === 0) {
      resolve();
      return;
    }

    let resolved = false;

    const done = () => {
      if (resolved) return;
      resolved = true;
      el.removeEventListener('animationend', onEnd);
      clearTimeout(timer);
      resolve();
    };

    const onEnd = (e: AnimationEvent) => {
      if (e.target === el) done();
    };

    el.addEventListener('animationend', onEnd);

    const timeout = fallbackMs ?? durationMs + 50;
    const timer = setTimeout(done, timeout);
  });
}

/**
 * Convenience: change state, then wait for transition to complete.
 * Returns a promise that resolves after the CSS transition finishes.
 */
export function transitionPromise(
  el: HTMLElement,
  applyChange: () => void
): Promise<void> {
  const promise = waitTransition(el);
  applyChange();
  return promise;
}

/** Parse CSS duration string ("0.2s", "200ms") to milliseconds */
function parseDuration(value: string): number {
  const match = value.trim().match(/^([\d.]+)(m?s)$/);
  if (!match) return 0;
  const num = parseFloat(match[1] ?? '0');
  const unit = match[2];
  return unit === 'ms' ? num : num * 1000;
}
