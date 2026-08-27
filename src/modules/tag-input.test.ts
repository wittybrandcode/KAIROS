/**
 * Kairos Module — TagInput tests
 */

import { beforeEach, describe, expect, it } from 'vitest';
import { TagInput } from './tag-input';

function setup(html: string): void {
  document.body.innerHTML = html;
}

const basic = `
  <div class="kairos-tag-input" id="container">
    <span class="kairos-tag-input-tag">existing <button class="kairos-tag-input-remove">×</button></span>
    <input type="text" id="input" />
    <input type="hidden" id="hidden" data-kairos-tag-input-value />
  </div>
  <div id="outside"></div>
`;

function container(): HTMLElement {
  return document.getElementById('container')!;
}
function input(): HTMLInputElement {
  return document.getElementById('input') as HTMLInputElement;
}
function hidden(): HTMLInputElement {
  return document.getElementById('hidden') as HTMLInputElement;
}

function pressKey(el: HTMLElement, key: string): void {
  el.dispatchEvent(new KeyboardEvent('keydown', { key, bubbles: true }));
}

function click(el: HTMLElement): void {
  el.dispatchEvent(new MouseEvent('click', { bubbles: true }));
}

describe('TagInput module', () => {
  beforeEach(() => {
    setup(basic);
    (TagInput as any)._reset?.();
    TagInput.init();
  });

  it('adds tag on Enter', () => {
    input().value = 'newtag';
    pressKey(input(), 'Enter');
    const tags = container().querySelectorAll('.kairos-tag-input-tag');
    expect(tags.length).toBe(2);
    expect(tags[1]?.textContent).toContain('newtag');
    expect(input().value).toBe('');
  });

  it('adds tag on comma', () => {
    input().value = 'commaTag,';
    pressKey(input(), ',');
    const tags = container().querySelectorAll('.kairos-tag-input-tag');
    expect(tags.length).toBe(2);
    expect(tags[1]?.textContent).toContain('commaTag');
  });

  it('removes last tag on Backspace with empty input', () => {
    input().value = '';
    pressKey(input(), 'Backspace');
    const tags = container().querySelectorAll('.kairos-tag-input-tag');
    expect(tags.length).toBe(0);
  });

  it('removes tag via remove button click', () => {
    const btn = container().querySelector<HTMLElement>('.kairos-tag-input-remove')!;
    click(btn);
    const tags = container().querySelectorAll('.kairos-tag-input-tag');
    expect(tags.length).toBe(0);
  });

  it('syncs hidden input value', () => {
    input().value = 'alpha';
    pressKey(input(), 'Enter');
    expect(hidden().value).toBe('existing,alpha');
    const btn = container().querySelectorAll<HTMLElement>('.kairos-tag-input-remove')[0]!;
    click(btn);
    expect(hidden().value).toBe('alpha');
  });

  it('prevents adding when before-add is canceled', () => {
    container().addEventListener('kairos:tag-input:before-add', (e) => e.preventDefault(), { once: true });
    input().value = 'blocked';
    pressKey(input(), 'Enter');
    const tags = container().querySelectorAll('.kairos-tag-input-tag');
    expect(tags.length).toBe(1);
  });
});
