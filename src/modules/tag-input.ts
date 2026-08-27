/**
 * Kairos Module — TagInput
 * إدخال الوسوم المتعدد
 *
 * Dependencies: core only
 *
 * Behavior:
 *   - Enter or comma adds tag (trims, dedupes, ignores empty)
 *   - Backspace with empty input deletes last tag
 *   - Click on .kairos-tag-input-remove removes its tag
 *   - Syncs hidden input if present (input[type=hidden][data-kairos-tag-input-value])
 *   - Emits kairos:tag-input:add / remove / change
 */

import { closest, qa } from '../core/dom';
import { emit, on } from '../core/events';

let initialized = false;
let cleanups: (() => void)[] = [];

/** Create a tag element */
function createTag(text: string): HTMLElement {
  const tag = document.createElement('span');
  tag.className = 'kairos-tag-input-tag';
  tag.textContent = text + ' ';
  const btn = document.createElement('button');
  btn.className = 'kairos-tag-input-remove';
  btn.setAttribute('type', 'button');
  btn.setAttribute('aria-label', `Remove ${text}`);
  btn.textContent = '×';
  tag.appendChild(btn);
  return tag;
}

/** Get all tag texts in container */
function getTags(container: HTMLElement): string[] {
  return qa<HTMLElement>('.kairos-tag-input-tag', container).map((el) => {
    // First text node is the tag text
    const text = el.childNodes[0]?.textContent?.trim() || el.textContent?.replace('×', '').trim() || '';
    return text;
  });
}

/** Sync hidden input if present */
function syncValue(container: HTMLElement): void {
  const hidden = container.querySelector<HTMLInputElement>('input[type="hidden"][data-kairos-tag-input-value], input[type="hidden"]');
  if (hidden) {
    hidden.value = getTags(container).join(',');
    hidden.dispatchEvent(new Event('change', { bubbles: true }));
  }
  emit(container, 'kairos:tag-input:change', { tags: getTags(container) });
}

/** Add a tag to container */
export function addTag(container: HTMLElement, text: string): boolean {
  const trimmed = text.trim().replace(/^,|,$/g, '').trim();
  if (!trimmed) return false;
  if (getTags(container).includes(trimmed)) return false;

  if (!emit(container, 'kairos:tag-input:before-add', { tag: trimmed }, { cancelable: true })) return false;

  const input = container.querySelector<HTMLInputElement>('input:not([type="hidden"])');
  const tag = createTag(trimmed);
  if (input) {
    container.insertBefore(tag, input);
  } else {
    container.appendChild(tag);
  }

  syncValue(container);
  emit(container, 'kairos:tag-input:add', { tag: trimmed });
  return true;
}

/** Remove a tag element */
export function removeTag(tagEl: HTMLElement): void {
  const container = closest<HTMLElement>(tagEl, '.kairos-tag-input');
  if (!container) return;
  const text = tagEl.childNodes[0]?.textContent?.trim() || '';
  if (!emit(container, 'kairos:tag-input:before-remove', { tag: text }, { cancelable: true })) return;
  tagEl.remove();
  syncValue(container);
  emit(container, 'kairos:tag-input:remove', { tag: text });
}

/** Initialize tag-input delegation */
export function init(): void {
  if (initialized) return;
  initialized = true;

  // Enter / comma to add
  cleanups.push(
    on(document, 'keydown', ((e: KeyboardEvent) => {
      const input = e.target as HTMLElement;
      if (!input.matches('.kairos-tag-input input:not([type="hidden"])')) return;
      const container = closest<HTMLElement>(input, '.kairos-tag-input');
      if (!container) return;

      if (e.key === 'Enter' || e.key === ',') {
        e.preventDefault();
        const value = (input as HTMLInputElement).value;
        if (addTag(container, value)) {
          (input as HTMLInputElement).value = '';
        } else if (value.trim()) {
          // Even if not added (duplicate/empty), clear comma
          if (e.key === ',') (input as HTMLInputElement).value = '';
        }
      } else if (e.key === 'Backspace' && (input as HTMLInputElement).value === '') {
        const tags = qa<HTMLElement>('.kairos-tag-input-tag', container);
        const last = tags[tags.length - 1];
        if (last) {
          e.preventDefault();
          removeTag(last);
        }
      }
    }) as EventListener)
  );

  // Click on remove button
  cleanups.push(on(document, 'click', ((e: MouseEvent) => {
    const btn = closest<HTMLElement>(e.target as Element, '.kairos-tag-input-remove');
    if (!btn) return;
    e.preventDefault();
    const tag = closest<HTMLElement>(btn, '.kairos-tag-input-tag');
    if (tag) removeTag(tag);
  }) as EventListener));

  // Click on container focuses input
  cleanups.push(on(document, 'click', ((e: MouseEvent) => {
    const container = closest<HTMLElement>(e.target as Element, '.kairos-tag-input');
    if (!container) return;
    const target = e.target as HTMLElement;
    if (target.closest('.kairos-tag-input-tag') || target.matches('input')) return;
    const input = container.querySelector<HTMLInputElement>('input:not([type="hidden"])');
    input?.focus();
  }) as EventListener));
}

export const TagInput = { add: addTag, remove: removeTag, init, _reset: () => { cleanups.forEach((fn) => fn()); cleanups = []; initialized = false; } };
