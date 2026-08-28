import { describe, it, expect, vi } from 'vitest';
import { debounce, throttle, uid, clamp, merge } from './utils';

describe('utils', () => {
  it('uid generates unique', () => {
    const a = uid();
    const b = uid();
    expect(a).not.toBe(b);
    expect(a.startsWith('kairos-')).toBe(true);
  });

  it('clamp restricts', () => {
    expect(clamp(5, 0, 10)).toBe(5);
    expect(clamp(-5, 0, 10)).toBe(0);
    expect(clamp(15, 0, 10)).toBe(10);
  });

  it('merge combines', () => {
    expect(merge({ a: 1 } as any, { b: 2 } as any)).toEqual({ a: 1, b: 2 });
    expect(merge({ a: 1 }, { a: 2 })).toEqual({ a: 2 });
  });

  it('debounce delays', async () => {
    vi.useFakeTimers();
    const fn = vi.fn();
    const deb = debounce(fn, 100);
    deb();
    deb();
    expect(fn).not.toHaveBeenCalled();
    vi.advanceTimersByTime(100);
    expect(fn).toHaveBeenCalledTimes(1);
    vi.useRealTimers();
  });

  it('throttle limits', async () => {
    vi.useFakeTimers();
    const fn = vi.fn();
    const thr = throttle(fn, 100);
    thr();
    thr();
    expect(fn).toHaveBeenCalledTimes(1);
    vi.advanceTimersByTime(100);
    thr();
    expect(fn).toHaveBeenCalledTimes(2);
    vi.useRealTimers();
  });
});
