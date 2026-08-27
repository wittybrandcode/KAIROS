/**
 * Kairos Module — Popover tests
 * Covers: docs/component-specs/popover.md behavior contract
 */

import { beforeEach, describe, expect, it } from 'vitest';
import { Popover } from './popover';

function setup(html: string): void {
  document.body.innerHTML = html;
}

const basic = `
  <div class="kairos-popover-wrapper" id="w1">
    <button data-kairos-toggle="popover" data-kairos-target="#p1" aria-expanded="false">Trigger A</button>
    <div id="p1" class="kairos-popover" data-state="closed" role="dialog">
      <input type="text" />
      <button data-kairos-dismiss>Close</button>
    </div>
  </div>
  <div class="kairos-popover-wrapper" id="w2">
    <button data-kairos-toggle="popover" data-kairos-target="#p2">Trigger B</button>
    <div id="p2" class="kairos-popover" data-state="closed" role="dialog"></div>
  </div>
  <div id="outside">outside</div>
`;

function triggerA(): HTMLElement {
  return document.querySelector<HTMLElement>('[data-kairos-target="#p1"]')!;
}
function popoverA(): HTMLElement {
  return document.getElementById('p1')!;
}
function triggerB(): HTMLElement {
  return document.querySelector<HTMLElement>('[data-kairos-target="#p2"]')!;
}
function popoverB(): HTMLElement {
  return document.getElementById('p2')!;
}

function click(el: HTMLElement): void {
  el.dispatchEvent(new MouseEvent('click', { bubbles: true }));
}

describe('Popover module', () => {
  beforeEach(() => {
    Popover._reset();
    setup(basic);
    Popover.init();
  });

  it('opens on trigger click and sets aria-expanded', () => {
    click(triggerA());
    expect(popoverA().dataset.state).toBe('open');
    expect(triggerA().getAttribute('aria-expanded')).toBe('true');
  });

  it('closes on second trigger click (toggle)', () => {
    click(triggerA());
    click(triggerA());
    expect(popoverA().dataset.state).toBe('closed');
    expect(triggerA().getAttribute('aria-expanded')).toBe('false');
  });

  it('closes on outside click', () => {
    click(triggerA());
    expect(popoverA().dataset.state).toBe('open');
    click(document.getElementById('outside')!);
    expect(popoverA().dataset.state).toBe('closed');
  });

  it('closes on Escape', () => {
    click(triggerA());
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
    expect(popoverA().dataset.state).toBe('closed');
  });

  it('prevents opening when before-open is canceled', () => {
    popoverA().addEventListener('kairos:popover:before-open', (e) => e.preventDefault(), { once: true });
    click(triggerA());
    expect(popoverA().dataset.state).not.toBe('open');
  });

  it('closes via dismiss button inside popover', () => {
    click(triggerA());
    const dismiss = popoverA().querySelector<HTMLElement>('[data-kairos-dismiss]')!;
    click(dismiss);
    expect(popoverA().dataset.state).toBe('closed');
  });
});
