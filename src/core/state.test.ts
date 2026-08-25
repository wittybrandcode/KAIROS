import { describe, it, expect, beforeEach } from 'vitest';
import * as state from './state';

describe('Core State Module', () => {
  let element: HTMLElement;

  beforeEach(() => {
    element = document.createElement('div');
  });

  describe('open() / close() / toggle()', () => {
    it('sets state to open', () => {
      state.open(element);
      expect(element.getAttribute('data-state')).toBe('open');
    });

    it('sets state to closed', () => {
      element.setAttribute('data-state', 'open');
      state.close(element);
      expect(element.getAttribute('data-state')).toBe('closed');
    });

    it('toggles state between open and closed', () => {
      state.toggle(element);
      expect(element.getAttribute('data-state')).toBe('open');
      
      state.toggle(element);
      expect(element.getAttribute('data-state')).toBe('closed');
    });
  });

  describe('activate() / deactivate()', () => {
    it('sets state to active', () => {
      state.activate(element);
      expect(element.getAttribute('data-state')).toBe('active');
    });

    it('sets state to inactive when deactivated', () => {
      element.setAttribute('data-state', 'active');
      state.deactivate(element);
      expect(element.getAttribute('data-state')).toBe('inactive');
    });
  });

  describe('read() and is()', () => {
    it('reads the current state', () => {
      element.setAttribute('data-state', 'loading');
      expect(state.read(element)).toBe('loading');
    });

    it('returns empty string if no state is set', () => {
      expect(state.read(element)).toBe('');
    });

    it('correctly identifies if an element has a specific state', () => {
      element.setAttribute('data-state', 'selected');
      expect(state.is(element, 'selected')).toBe(true);
      expect(state.is(element, 'open')).toBe(false);
    });
  });
});
