import { describe, it, expect, vi } from 'vitest';
import * as events from './events';

describe('Core Events Module', () => {
  it('emits a custom event on the target element', () => {
    const element = document.createElement('div');
    const handler = vi.fn();
    
    element.addEventListener('kairos:test', handler);
    
    const result = events.emit(element, 'kairos:test', { value: 42 });
    
    expect(handler).toHaveBeenCalledTimes(1);
    const event = handler.mock.calls[0]![0] as CustomEvent;
    expect(event.detail).toEqual({ value: 42 });
    expect(result).toBe(true); // Default cancelable is false, so it wasn't cancelled
  });

  it('respects cancelable events', () => {
    const element = document.createElement('div');
    element.addEventListener('kairos:test:cancelable', (e) => {
      e.preventDefault();
    });
    
    const result = events.emit(element, 'kairos:test:cancelable', null, { cancelable: true });
    
    // The event was cancelled
    expect(result).toBe(false);
  });

  it('adds an event listener and returns a cleanup function', () => {
    const element = document.createElement('div');
    const handler = vi.fn();
    
    const cleanup = events.on(element, 'click', handler as EventListener);
    
    element.click();
    expect(handler).toHaveBeenCalledTimes(1);
    
    cleanup();
    element.click();
    expect(handler).toHaveBeenCalledTimes(1); // Should not increment
  });

  it('removes an event listener using off()', () => {
    const element = document.createElement('div');
    const handler = vi.fn();
    
    events.on(element, 'click', handler as EventListener);
    events.off(element, 'click', handler as EventListener);
    
    element.click();
    expect(handler).not.toHaveBeenCalled();
  });

  it('adds a one-time event listener', () => {
    const element = document.createElement('div');
    const handler = vi.fn();
    
    events.once(element, 'click', handler as EventListener);
    
    element.click();
    element.click();
    
    expect(handler).toHaveBeenCalledTimes(1);
  });
});
