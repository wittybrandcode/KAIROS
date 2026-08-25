/**
 * Kairos Core — Observer Utilities
 * مراقبات المتصفح — MutationObserver, ResizeObserver, IntersectionObserver
 */

/** Observe DOM mutations on an element. Returns a cleanup function. */
export function onMutation(
  el: Element,
  callback: MutationCallback,
  options?: MutationObserverInit
): () => void {
  const observer = new MutationObserver(callback);
  observer.observe(el, options || { childList: true, subtree: true });
  return () => observer.disconnect();
}

/** Observe attribute changes on an element. Returns a cleanup function. */
export function onAttributeChange(
  el: Element,
  callback: (attr: string, oldValue: string | null) => void,
  attributes?: string[]
): () => void {
  return onMutation(
    el,
    (mutations) => {
      for (const mutation of mutations) {
        if (mutation.type === 'attributes' && mutation.attributeName) {
          callback(mutation.attributeName, mutation.oldValue);
        }
      }
    },
    {
      attributes: true,
      attributeOldValue: true,
      attributeFilter: attributes,
    }
  );
}

/** Observe size changes on an element. Returns a cleanup function. */
export function onResize(
  el: Element,
  callback: (entry: ResizeObserverEntry) => void
): () => void {
  const observer = new ResizeObserver((entries) => {
    for (const entry of entries) {
      callback(entry);
    }
  });
  observer.observe(el);
  return () => observer.disconnect();
}

/** Observe visibility/intersection changes. Returns a cleanup function. */
export function onIntersection(
  el: Element,
  callback: (entry: IntersectionObserverEntry) => void,
  options?: IntersectionObserverInit
): () => void {
  const observer = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      callback(entry);
    }
  }, options);
  observer.observe(el);
  return () => observer.disconnect();
}
