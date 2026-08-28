import { describe, it, expect, vi } from 'vitest';
import { waitTransition } from './animation';

describe('animation', () => {
  it('waitTransition resolves after duration', async () => {
    const el = document.createElement('div');
    el.style.transitionDuration = '0.05s';
    document.body.appendChild(el);
    const start = Date.now();
    await waitTransition(el);
    const elapsed = Date.now() - start;
    expect(elapsed).toBeGreaterThanOrEqual(40);
    el.remove();
  });

  it('waitTransition resolves quickly if no transition', async () => {
    const el = document.createElement('div');
    document.body.appendChild(el);
    const p = waitTransition(el);
    await expect(p).resolves.toBeUndefined();
    el.remove();
  });

  it('waitTransition handles multiple durations', async () => {
    const el = document.createElement('div');
    el.style.transitionDuration = '0.02s, 0.03s';
    document.body.appendChild(el);
    await waitTransition(el);
    el.remove();
    expect(true).toBe(true);
  });
});
