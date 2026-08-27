/**
 * Kairos Module — Sidebar tests
 */

import { beforeEach, describe, expect, it } from 'vitest';
import { Sidebar } from './sidebar';

function setup(html: string): void {
  document.body.innerHTML = html;
}

const basic = `
  <button data-kairos-toggle="sidebar" data-kairos-target="#sb">Toggle</button>
  <aside id="sb" class="kairos-sidebar" data-state="closed">
    <nav class="kairos-sidebar-content">
      <a class="kairos-sidebar-item">Item A</a>
      <a class="kairos-sidebar-item">Item B</a>
    </nav>
    <button data-kairos-dismiss>Close</button>
  </aside>
  <div id="outside"></div>
`;

function sidebar(): HTMLElement {
  return document.getElementById('sb')!;
}
function toggleBtn(): HTMLElement {
  return document.querySelector<HTMLElement>('[data-kairos-toggle="sidebar"]')!;
}
function dismissBtn(): HTMLElement {
  return document.querySelector<HTMLElement>('[data-kairos-dismiss]')!;
}
function items(): HTMLElement[] {
  return Array.from(document.querySelectorAll<HTMLElement>('.kairos-sidebar-item'));
}
function click(el: HTMLElement): void {
  el.dispatchEvent(new MouseEvent('click', { bubbles: true }));
}

describe('Sidebar module', () => {
  beforeEach(() => {
    setup(basic);
    (Sidebar as any)._reset?.();
    Sidebar.init();
  });

  it('opens on toggle click', () => {
    click(toggleBtn());
    expect(sidebar().dataset.state).toBe('open');
  });

  it('closes on second toggle', () => {
    click(toggleBtn());
    click(toggleBtn());
    expect(sidebar().dataset.state).toBe('closed');
  });

  it('closes on dismiss button', () => {
    click(toggleBtn());
    expect(sidebar().dataset.state).toBe('open');
    click(dismissBtn());
    expect(sidebar().dataset.state).toBe('closed');
  });

  it('activates item on click', () => {
    click(toggleBtn());
    click(items()[1]!);
    expect(items()[1]!.dataset.state).toBe('active');
    expect(items()[0]!.dataset.state).not.toBe('active');
  });

  it('prevents opening when before-open canceled', () => {
    sidebar().addEventListener('kairos:sidebar:before-open', (e) => e.preventDefault(), { once: true });
    click(toggleBtn());
    expect(sidebar().dataset.state).not.toBe('open');
  });

  it('closes on Escape', () => {
    click(toggleBtn());
    expect(sidebar().dataset.state).toBe('open');
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
    expect(sidebar().dataset.state).toBe('closed');
  });
});
