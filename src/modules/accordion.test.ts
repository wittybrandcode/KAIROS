/**
 * Kairos Module — Accordion tests
 * Covers: docs/component-specs/accordion.md behavior contract
 */

import { beforeEach, describe, expect, it } from 'vitest';
import { Accordion } from './accordion';

function setup(html: string): void {
  document.body.innerHTML = html;
}

const basic = `
  <div class="kairos-accordion" id="acc">
    <div class="kairos-accordion-item">
      <button class="kairos-accordion-trigger" data-kairos-toggle="accordion">A</button>
      <div class="kairos-accordion-panel">Panel A</div>
    </div>
    <div class="kairos-accordion-item" data-state="open">
      <button class="kairos-accordion-trigger" data-kairos-toggle="accordion">B</button>
      <div class="kairos-accordion-panel">Panel B</div>
    </div>
  </div>
`;

function triggerOf(label: string): HTMLElement {
  const triggers = Array.from(document.querySelectorAll<HTMLElement>('.kairos-accordion-trigger'));
  return triggers.find((t) => t.textContent === label)!;
}

function itemOf(label: string): HTMLElement {
  return triggerOf(label).closest<HTMLElement>('.kairos-accordion-item')!;
}

function click(label: string): void {
  triggerOf(label).dispatchEvent(new MouseEvent('click', { bubbles: true }));
}

describe('Accordion module', () => {
  beforeEach(() => {
    setup(basic);
  });

  it('opens a closed item on trigger click and syncs aria-expanded', () => {
    Accordion.init();
    click('A');
    expect(itemOf('A').dataset.state).toBe('open');
    expect(triggerOf('A').getAttribute('aria-expanded')).toBe('true');
  });

  it('closes an open item on second click', () => {
    Accordion.init();
    click('A');
    click('A');
    expect(itemOf('A').dataset.state).not.toBe('open');
    expect(triggerOf('A').getAttribute('aria-expanded')).toBe('false');
  });

  it('closes siblings by default (single-open mode)', () => {
    Accordion.init();
    click('A');
    expect(itemOf('A').dataset.state).toBe('open');
    expect(itemOf('B').dataset.state).not.toBe('open');
  });

  it('keeps siblings open when data-kairos-allow-multiple="true"', () => {
    document.getElementById('acc')!.setAttribute('data-kairos-allow-multiple', 'true');
    Accordion.init();
    click('A');
    expect(itemOf('A').dataset.state).toBe('open');
    expect(itemOf('B').dataset.state).toBe('open');
  });

  it('prevents opening when kairos:accordion:before-open is canceled', () => {
    Accordion.init();
    document.addEventListener('kairos:accordion:before-open', (e) => e.preventDefault(), { once: true });
    click('A');
    expect(itemOf('A').dataset.state).not.toBe('open');
  });

  it('isolates nested accordions from the outer group', () => {
    setup(`
      <div class="kairos-accordion" id="outer">
        <div class="kairos-accordion-item">
          <button class="kairos-accordion-trigger" data-kairos-toggle="accordion">Outer</button>
          <div class="kairos-accordion-panel">
            <div class="kairos-accordion" id="inner">
              <div class="kairos-accordion-item">
                <button class="kairos-accordion-trigger" data-kairos-toggle="accordion">Inner</button>
                <div class="kairos-accordion-panel">Deep</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `);
    Accordion.init();
    click('Inner');
    const innerItem = triggerOf('Inner').closest<HTMLElement>('.kairos-accordion-item')!;
    const outerItem = triggerOf('Outer').closest<HTMLElement>('.kairos-accordion-item')!;
    expect(innerItem.dataset.state).toBe('open');
    expect(outerItem.dataset.state).not.toBe('open');
  });
});
