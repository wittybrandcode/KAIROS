/**
 * Kairos Module — Tooltip tests
 * Covers: docs/component-specs/tooltip.md
 */

import { beforeEach, describe, expect, it } from 'vitest';
import { Tooltip } from './tooltip';

function setup(html: string): void {
  document.body.innerHTML = html;
}

const basic = `
  <div class="kairos-tip-host" id="host">
    <button id="trigger">Hover me</button>
    <span class="kairos-tip" id="tip">Tooltip text</span>
  </div>
  <button id="outside">outside</button>
`;

describe('Tooltip module', () => {
  beforeEach(() => {
    setup(basic);
    // Reset
    (Tooltip as any)._reset?.();
    Tooltip.init();
  });

  it('shows on focus and sets aria-describedby', () => {
    const trigger = document.querySelector<HTMLElement>('.kairos-tip-host')!;
    const tip = document.getElementById('tip')!;
    const btn = document.getElementById('trigger')!;
    btn.focus();
    // Dispatch focusin on host
    trigger.dispatchEvent(new FocusEvent('focusin', { bubbles: true }));
    expect(tip.dataset.state).toBe('open');
    expect(trigger.getAttribute('aria-describedby')).toBe(tip.id);
  });

  it('hides on focusout', async () => {
    const trigger = document.querySelector<HTMLElement>('.kairos-tip-host')!;
    const tip = document.getElementById('tip')!;
    const btn = document.getElementById('trigger')!;
    btn.focus();
    trigger.dispatchEvent(new FocusEvent('focusin', { bubbles: true }));
    expect(tip.dataset.state).toBe('open');
    trigger.dispatchEvent(new FocusEvent('focusout', { bubbles: true }));
    // focusout hides after timeout
    await new Promise((r) => setTimeout(r, 10));
    expect(tip.dataset.state).toBe('closed');
  });

  it('hides on Escape', () => {
    const trigger = document.querySelector<HTMLElement>('.kairos-tip-host')!;
    const tip = document.getElementById('tip')!;
    const btn = document.getElementById('trigger')!;
    btn.focus();
    trigger.dispatchEvent(new FocusEvent('focusin', { bubbles: true }));
    expect(tip.dataset.state).toBe('open');
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
    expect(tip.dataset.state).toBe('closed');
  });

  it('creates dynamic tooltip for data-kairos-tooltip', () => {
    document.body.innerHTML = `<button id="dyn" data-kairos-tooltip="Dynamic text">Btn</button>`;
    (Tooltip as any)._reset?.();
    Tooltip.init();
    const btn = document.getElementById('dyn')!;
    btn.dispatchEvent(new FocusEvent('focusin', { bubbles: true }));
    const tip = document.querySelector<HTMLElement>('.kairos-tooltip');
    expect(tip).not.toBeNull();
    expect(tip?.textContent).toBe('Dynamic text');
    expect(btn.getAttribute('aria-describedby')).toBe(tip?.id);
  });

  it('is idempotent (second init does not duplicate)', () => {
    Tooltip.init();
    Tooltip.init();
    const trigger = document.querySelector<HTMLElement>('.kairos-tip-host')!;
    const tip = document.getElementById('tip')!;
    const btn = document.getElementById('trigger')!;
    btn.focus();
    trigger.dispatchEvent(new FocusEvent('focusin', { bubbles: true }));
    expect(tip.dataset.state).toBe('open');
  });
});
