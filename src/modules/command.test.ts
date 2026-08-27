/**
 * Kairos Module — Command tests
 */

import { beforeEach, describe, expect, it } from 'vitest';
import { Command } from './command';

function setup(html: string): void {
  document.body.innerHTML = html;
}

const basic = `
  <div class="kairos-command" data-state="closed">
    <input type="text" class="kairos-command-input" />
    <div class="kairos-command-list" role="listbox">
      <div class="kairos-command-item" role="option">CAM 01</div>
      <div class="kairos-command-item" role="option">CAM 02</div>
      <div class="kairos-command-item" role="option">VTR</div>
    </div>
  </div>
`;

function command(): HTMLElement {
  return document.querySelector<HTMLElement>('.kairos-command')!;
}
function input(): HTMLInputElement {
  return document.querySelector<HTMLInputElement>('.kairos-command-input')!;
}
function items(): HTMLElement[] {
  return Array.from(document.querySelectorAll<HTMLElement>('.kairos-command-item'));
}

describe('Command module', () => {
  beforeEach(() => {
    setup(basic);
    (Command as any)._reset?.();
    Command.init();
  });

  it('opens on Ctrl+K hotkey', () => {
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'k', ctrlKey: true, bubbles: true }));
    expect(command().dataset.state).toBe('open');
  });

  it('filters list on input', () => {
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'k', ctrlKey: true, bubbles: true }));
    const inp = input();
    inp.value = 'CAM 01';
    inp.dispatchEvent(new Event('input', { bubbles: true }));
    const visible = items().filter((el) => el.style.display !== 'none');
    expect(visible.length).toBe(1);
    expect(visible[0]?.textContent).toContain('CAM 01');
  });

  it('moves selection with ArrowDown', () => {
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'k', ctrlKey: true, bubbles: true }));
    const inp = input();
    inp.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }));
    expect(items()[1]?.dataset.state).toBe('selected');
  });

  it('executes on Enter and closes', () => {
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'k', ctrlKey: true, bubbles: true }));
    const inp = input();
    inp.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
    expect(command().dataset.state).toBe('closed');
  });

  it('closes on Escape', () => {
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'k', ctrlKey: true, bubbles: true }));
    expect(command().dataset.state).toBe('open');
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
    expect(command().dataset.state).toBe('closed');
  });

  it('is idempotent', () => {
    Command.init();
    Command.init();
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'k', ctrlKey: true, bubbles: true }));
    expect(command().dataset.state).toBe('open');
  });
});
