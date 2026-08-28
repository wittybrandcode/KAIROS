import { describe, it, expect, vi, beforeEach } from 'vitest';
import { onEscape, onArrows, hotkey } from './keyboard';

describe('keyboard', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  it('onEscape triggers on Escape', () => {
    const fn = vi.fn();
    const cleanup = onEscape(fn);
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
    expect(fn).toHaveBeenCalled();
    cleanup();
    fn.mockClear();
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
    expect(fn).not.toHaveBeenCalled();
  });

  it('onArrows handles ArrowDown/Up', () => {
    const div = document.createElement('div');
    document.body.appendChild(div);
    const down = vi.fn();
    const up = vi.fn();
    const cleanup = onArrows(div, { down, up });
    div.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }));
    expect(down).toHaveBeenCalled();
    div.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowUp', bubbles: true }));
    expect(up).toHaveBeenCalled();
    cleanup();
  });

  it('hotkey triggers on Ctrl+K', () => {
    const fn = vi.fn();
    const cleanup = hotkey('ctrl+k', fn);
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'k', ctrlKey: true, bubbles: true }));
    expect(fn).toHaveBeenCalled();
    fn.mockClear();
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'k', bubbles: true }));
    expect(fn).not.toHaveBeenCalled();
    cleanup();
  });

  it('hotkey handles Shift+Alt', () => {
    const fn = vi.fn();
    const cleanup = hotkey('shift+alt+x', fn);
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'x', shiftKey: true, altKey: true, bubbles: true }));
    expect(fn).toHaveBeenCalled();
    cleanup();
  });
});
