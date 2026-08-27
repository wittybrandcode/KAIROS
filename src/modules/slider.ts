/**
 * Kairos Module — Slider
 * منزلق القيم — أفقي وعمودي
 *
 * Dependencies: core only
 */

import { closest, qa } from '../core/dom';
import { emit, on } from '../core/events';
import { clamp } from '../core/utils';

let initialized = false;

function isVertical(track: HTMLElement): boolean {
  return track.classList.contains('kairos-slider-v') || track.classList.contains('kairos-fader-track');
}

function getValue(track: HTMLElement): number {
  return parseInt(track.getAttribute('aria-valuenow') || track.dataset.value || '0', 10);
}

function setValue(track: HTMLElement, value: number, emitEvent = true): void {
  const min = parseInt(track.getAttribute('aria-valuemin') || '0', 10);
  const max = parseInt(track.getAttribute('aria-valuemax') || '100', 10);
  const clamped = clamp(value, min, max);
  const percent = ((clamped - min) / (max - min)) * 100;

  track.setAttribute('aria-valuenow', String(clamped));
  track.dataset.value = String(clamped);

  const fill = track.querySelector<HTMLElement>('.kairos-slider-fill');
  const thumb = track.querySelector<HTMLElement>('.kairos-slider-thumb, .kairos-fader-thumb');

  if (isVertical(track)) {
    if (fill) {
      fill.style.height = `${percent}%`;
      fill.style.width = '100%';
      (fill as HTMLElement).style.bottom = '0';
      (fill as HTMLElement).style.position = 'absolute';
    }
    if (thumb) {
      (thumb as HTMLElement).style.bottom = `${percent}%`;
    }
  } else {
    if (fill) fill.style.width = `${percent}%`;
    if (thumb) (thumb as HTMLElement).style.left = `${percent}%`;
  }

  // Update sibling value display if exists (next sibling with font-mono)
  const container = track.parentElement;
  if (container) {
    const valueEl = container.querySelector<HTMLElement>('.kairos-text-xs.kairos-font-mono:last-child');
    // Only update if it's a plain number (not -6dB etc) — simple heuristic
    if (valueEl && /^\d+$/.test(valueEl.textContent?.trim() || '')) {
      valueEl.textContent = String(clamped);
    }
  }

  if (emitEvent) {
    emit(track, 'kairos:slider:change', { value: clamped });
  }
}

function valueFromPointer(track: HTMLElement, clientX: number, clientY: number): number {
  const rect = track.getBoundingClientRect();
  const min = parseInt(track.getAttribute('aria-valuemin') || '0', 10);
  const max = parseInt(track.getAttribute('aria-valuemax') || '100', 10);

  if (isVertical(track)) {
    const y = clientY - rect.top;
    const percent = 1 - y / rect.height;
    return Math.round(min + percent * (max - min));
  } else {
    const x = clientX - rect.left;
    const percent = x / rect.width;
    return Math.round(min + percent * (max - min));
  }
}

function initTrack(track: HTMLElement): void {
  if (track.hasAttribute('data-kairos-slider-init')) return;
  track.setAttribute('data-kairos-slider-init', '');

  // ARIA
  if (!track.hasAttribute('role')) track.setAttribute('role', 'slider');
  if (!track.hasAttribute('tabindex')) track.setAttribute('tabindex', '0');
  if (!track.hasAttribute('aria-valuemin')) track.setAttribute('aria-valuemin', '0');
  if (!track.hasAttribute('aria-valuemax')) track.setAttribute('aria-valuemax', '100');
  if (!track.hasAttribute('aria-valuenow')) {
    // Infer from current fill/thumb position
    const fill = track.querySelector<HTMLElement>('.kairos-slider-fill');
    let val = 0;
    if (fill) {
      const w = fill.style.width;
      const h = fill.style.height;
      if (w && w.includes('%')) val = parseInt(w, 10);
      else if (h && h.includes('%')) val = parseInt(h, 10);
      else {
        const thumb = track.querySelector<HTMLElement>('.kairos-slider-thumb, .kairos-fader-thumb');
        if (thumb) {
          const left = thumb.style.left;
          const bottom = (thumb as HTMLElement).style.bottom;
          if (left && left.includes('%')) val = parseInt(left, 10);
          else if (bottom && bottom.includes('%')) val = parseInt(bottom, 10);
        }
      }
    }
    track.setAttribute('aria-valuenow', String(val));
    track.dataset.value = String(val);
  }
  if (!track.hasAttribute('aria-orientation')) {
    track.setAttribute('aria-orientation', isVertical(track) ? 'vertical' : 'horizontal');
  }

  // Pointer handling
  let dragging = false;

  const onPointerMove = (e: PointerEvent) => {
    if (!dragging) return;
    const val = valueFromPointer(track, e.clientX, e.clientY);
    setValue(track, val);
  };

  const onPointerUp = () => {
    if (!dragging) return;
    dragging = false;
    document.removeEventListener('pointermove', onPointerMove);
    document.removeEventListener('pointerup', onPointerUp);
    track.releasePointerCapture?.(0);
  };

  track.addEventListener('pointerdown', (e: PointerEvent) => {
    if (track.hasAttribute('disabled') || track.getAttribute('aria-disabled') === 'true') return;
    dragging = true;
    track.setPointerCapture?.(e.pointerId);
    const val = valueFromPointer(track, e.clientX, e.clientY);
    setValue(track, val);
    document.addEventListener('pointermove', onPointerMove);
    document.addEventListener('pointerup', onPointerUp);
    e.preventDefault();
  });

  // Click on track (fallback for non-pointer)
  track.addEventListener('click', (e: MouseEvent) => {
    if ((e.target as HTMLElement).closest('.kairos-slider-thumb, .kairos-fader-thumb')) return;
    const val = valueFromPointer(track, e.clientX, e.clientY);
    setValue(track, val);
  });

  // Keyboard
  track.addEventListener('keydown', (e: KeyboardEvent) => {
    if (track.hasAttribute('disabled') || track.getAttribute('aria-disabled') === 'true') return;
    const current = getValue(track);
    let next = current;
    const step = 1;
    const bigStep = 10;

    switch (e.key) {
      case 'ArrowRight':
      case 'ArrowUp':
        next = current + step;
        break;
      case 'ArrowLeft':
      case 'ArrowDown':
        next = current - step;
        break;
      case 'PageUp':
        next = current + bigStep;
        break;
      case 'PageDown':
        next = current - bigStep;
        break;
      case 'Home':
        next = parseInt(track.getAttribute('aria-valuemin') || '0', 10);
        break;
      case 'End':
        next = parseInt(track.getAttribute('aria-valuemax') || '100', 10);
        break;
      default:
        return;
    }
    e.preventDefault();
    setValue(track, next);
  });
}

export function init(): void {
  if (initialized) return;
  initialized = true;

  // Init all existing tracks
  qa<HTMLElement>('.kairos-slider-track, .kairos-fader-track').forEach(initTrack);

  // Observe for dynamically added sliders
  const observer = new MutationObserver((mutations) => {
    for (const m of mutations) {
      for (const node of Array.from(m.addedNodes)) {
        if (!(node instanceof HTMLElement)) continue;
        if (node.matches('.kairos-slider-track, .kairos-fader-track')) initTrack(node);
        qa<HTMLElement>('.kairos-slider-track, .kairos-fader-track', node).forEach(initTrack);
      }
    }
  });
  observer.observe(document.body, { childList: true, subtree: true });

  // Also handle focus delegation for dynamically added via events
  on(document, 'focusin', ((e: FocusEvent) => {
    const track = closest<HTMLElement>(e.target as Element, '.kairos-slider-track, .kairos-fader-track');
    if (track && !track.hasAttribute('data-kairos-slider-init')) initTrack(track);
  }) as EventListener);
}

export const Slider = { setValue, getValue, init, _reset: () => { initialized = false; } };
