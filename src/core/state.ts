/**
 * Kairos Core — State Helpers
 * مساعدات الحالة — الـ DOM هو مصدر الحقيقة الوحيد
 *
 * No Store. No Signals. No PubSub.
 * Every function is a thin wrapper around element.dataset.state.
 */

/** Set data-state to "open" */
export function open(el: HTMLElement): void {
  el.dataset.state = 'open';
}

/** Set data-state to "closed" */
export function close(el: HTMLElement): void {
  el.dataset.state = 'closed';
}

/** Toggle data-state between "open" and "closed" */
export function toggle(el: HTMLElement): void {
  el.dataset.state = el.dataset.state === 'open' ? 'closed' : 'open';
}

/** Set data-state to "active" */
export function activate(el: HTMLElement): void {
  el.dataset.state = 'active';
}

/** Set data-state to "inactive" */
export function deactivate(el: HTMLElement): void {
  el.dataset.state = 'inactive';
}

/** Set data-state to "loading" */
export function loading(el: HTMLElement): void {
  el.dataset.state = 'loading';
}

/** Set data-state to "selected" */
export function selected(el: HTMLElement): void {
  el.dataset.state = 'selected';
}

/** Set data-state to "disabled" */
export function disable(el: HTMLElement): void {
  el.dataset.state = 'disabled';
}

/** Read the current data-state value */
export function read(el: HTMLElement): string {
  return el.dataset.state || '';
}

/** Check if element has a specific state */
export function is(el: HTMLElement, state: string): boolean {
  return el.dataset.state === state;
}
