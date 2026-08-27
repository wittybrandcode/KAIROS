/**
 * Kairos Module — Slider tests
 */

import { beforeEach, describe, expect, it } from 'vitest';
import { Slider } from './slider';

function setup(html: string): void {
  document.body.innerHTML = html;
}

const basic = `
  <div class="kairos-slider-track kairos-slider-h" id="h" aria-valuemin="0" aria-valuemax="100" aria-valuenow="45">
    <div class="kairos-slider-fill" style="width: 45%;"></div>
    <div class="kairos-slider-thumb" style="left: 45%;"></div>
  </div>
  <div class="kairos-slider-track kairos-slider-v" id="v" aria-valuemin="0" aria-valuemax="100" aria-valuenow="70">
    <div class="kairos-slider-fill" style="height: 70%;"></div>
    <div class="kairos-slider-thumb" style="bottom: 70%;"></div>
  </div>
`;

function hTrack(): HTMLElement {
  return document.getElementById('h')!;
}
function vTrack(): HTMLElement {
  return document.getElementById('v')!;
}

describe('Slider module', () => {
  beforeEach(() => {
    setup(basic);
    (Slider as any)._reset?.();
    Slider.init();
  });

  it('initializes ARIA attributes', () => {
    expect(hTrack().getAttribute('role')).toBe('slider');
    expect(hTrack().getAttribute('aria-orientation')).toBe('horizontal');
    expect(vTrack().getAttribute('aria-orientation')).toBe('vertical');
    expect(hTrack().getAttribute('tabindex')).toBe('0');
  });

  it('sets value via setValue and updates fill/thumb', () => {
    Slider.setValue(hTrack(), 80);
    expect(hTrack().getAttribute('aria-valuenow')).toBe('80');
    const fill = hTrack().querySelector<HTMLElement>('.kairos-slider-fill')!;
    const thumb = hTrack().querySelector<HTMLElement>('.kairos-slider-thumb')!;
    expect(fill.style.width).toBe('80%');
    expect(thumb.style.left).toBe('80%');
  });

  it('clamps value to min/max', () => {
    Slider.setValue(hTrack(), 200);
    expect(hTrack().getAttribute('aria-valuenow')).toBe('100');
    Slider.setValue(hTrack(), -10);
    expect(hTrack().getAttribute('aria-valuenow')).toBe('0');
  });

  it('handles keyboard ArrowRight to increase', () => {
    Slider.setValue(hTrack(), 50);
    hTrack().focus();
    hTrack().dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true }));
    expect(hTrack().getAttribute('aria-valuenow')).toBe('51');
  });

  it('handles keyboard ArrowLeft to decrease', () => {
    Slider.setValue(hTrack(), 50);
    hTrack().dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowLeft', bubbles: true }));
    expect(hTrack().getAttribute('aria-valuenow')).toBe('49');
  });

  it('handles vertical slider keyboard', () => {
    Slider.setValue(vTrack(), 50);
    vTrack().dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowUp', bubbles: true }));
    expect(vTrack().getAttribute('aria-valuenow')).toBe('51');
  });

  it('is idempotent', () => {
    Slider.init();
    Slider.init();
    Slider.setValue(hTrack(), 60);
    expect(hTrack().getAttribute('aria-valuenow')).toBe('60');
  });
});
