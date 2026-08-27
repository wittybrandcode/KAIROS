/**
 * Kairos Module — Command Palette
 * لوحة الأوامر السريعة
 *
 * Implements: docs/component-specs/command.md
 * Dependencies: core only
 */

import { closest, qa, q } from '../core/dom';
import { emit, on } from '../core/events';
import * as State from '../core/state';
import { hotkey, onEscape } from '../core/keyboard';

let initialized = false;
let activeCommand: HTMLElement | null = null;
let openCleanups: (() => void)[] = [];
let initCleanups: (() => void)[] = [];

/** Get visible items */
function visibleItems(list: HTMLElement): HTMLElement[] {
  return qa<HTMLElement>('.kairos-command-item', list).filter((el) => el.style.display !== 'none' && !el.hasAttribute('hidden'));
}

/** Update selected state */
function selectItem(item: HTMLElement, list: HTMLElement): void {
  qa<HTMLElement>('.kairos-command-item', list).forEach((el) => {
    if (el === item) {
      el.dataset.state = 'selected';
      el.setAttribute('aria-selected', 'true');
      // Scroll into view (guard for jsdom)
      (el as any).scrollIntoView?.({ block: 'nearest' });
    } else if (el.dataset.state === 'selected') {
      el.dataset.state = 'active';
      el.setAttribute('aria-selected', 'false');
    }
  });
}

/** Filter list based on query */
function filterList(input: HTMLInputElement, list: HTMLElement): void {
  const query = input.value.toLowerCase().trim();
  const items = qa<HTMLElement>('.kairos-command-item', list);
  let hasVisible = false;

  items.forEach((item) => {
    const text = (item.textContent || '').toLowerCase();
    const match = !query || text.includes(query);
    item.style.display = match ? '' : 'none';
    if (match) hasVisible = true;
    if (!match && item.dataset.state === 'selected') {
      item.dataset.state = 'active';
    }
  });

  // Handle empty state
  let empty = list.querySelector<HTMLElement>('[data-kairos-empty]');
  if (!hasVisible) {
    if (!empty) {
      empty = document.createElement('div');
      empty.setAttribute('data-kairos-empty', '');
      empty.className = 'kairos-text-sm kairos-text-color-muted kairos-p-standard kairos-text-center';
      empty.textContent = 'No results found';
      list.appendChild(empty);
    }
    empty.style.display = '';
  } else if (empty) {
    empty.style.display = 'none';
  }

  // Ensure one selected
  const visible = visibleItems(list);
  if (visible.length && !visible.some((el) => el.dataset.state === 'selected')) {
    selectItem(visible[0]!, list);
  }
}

/** Open command palette */
function openCommand(command: HTMLElement): void {
  if (State.is(command, 'open')) return;
  if (!emit(command, 'kairos:command:before-open', null, { cancelable: true })) return;

  // Find modal wrapper if exists, otherwise use command directly
  const modal = closest<HTMLElement>(command, '.kairos-modal') || command;
  State.open(modal);
  if (modal !== command) State.open(command);

  activeCommand = command;
  const input = q<HTMLInputElement>('.kairos-command-input', command);
  if (input) {
    input.value = '';
    input.focus();
    // Reset filter
    const list = q<HTMLElement>('.kairos-command-list', command);
    if (list) {
      qa<HTMLElement>('.kairos-command-item', list).forEach((el) => (el.style.display = ''));
      const empty = list.querySelector<HTMLElement>('[data-kairos-empty]');
      if (empty) empty.style.display = 'none';
      const first = visibleItems(list)[0];
      if (first) selectItem(first, list);
    }
  }

  // Escape to close
  openCleanups.push(
    onEscape(() => closeCommand(command))
  );

  emit(command, 'kairos:command:opened');
}

/** Close command palette */
function closeCommand(command: HTMLElement): void {
  const modal = closest<HTMLElement>(command, '.kairos-modal') || command;
  if (!State.is(modal, 'open') && !State.is(command, 'open')) return;
  if (!emit(command, 'kairos:command:before-close', null, { cancelable: true })) return;

  State.close(modal);
  if (modal !== command) State.close(command);

  openCleanups.forEach((fn) => fn());
  openCleanups = [];
  activeCommand = null;

  emit(command, 'kairos:command:closed');
}

/** Initialize command palette */
export function init(): void {
  if (initialized) return;
  initialized = true;

  // Hotkey Ctrl+K / Cmd+K
  const cleanupHotkey = hotkey('ctrl+k', () => {
    const cmd = q<HTMLElement>('.kairos-command');
    if (!cmd) return;
    if (State.is(cmd, 'open') || State.is(closest<HTMLElement>(cmd, '.kairos-modal') || cmd, 'open')) {
      closeCommand(cmd);
    } else {
      openCommand(cmd);
    }
  });
  // Also Cmd+K (meta)
  const cleanupMeta = hotkey('meta+k', () => {
    const cmd = q<HTMLElement>('.kairos-command');
    if (!cmd) return;
    if (State.is(cmd, 'open')) closeCommand(cmd);
    else openCommand(cmd);
  });
  initCleanups.push(cleanupHotkey, cleanupMeta);

  // Input filtering
  initCleanups.push(
    on(document, 'input', ((e: Event) => {
      const input = e.target as HTMLElement;
      if (!(input instanceof Element) || !input.matches('.kairos-command-input')) return;
      const command = closest<HTMLElement>(input, '.kairos-command');
      if (!command) return;
      const list = q<HTMLElement>('.kairos-command-list', command);
      if (!list) return;
      filterList(input as HTMLInputElement, list);
    }) as EventListener)
  );

  // Keyboard navigation within command
  initCleanups.push(
    on(document, 'keydown', ((e: KeyboardEvent) => {
      const input = e.target as HTMLElement;
      if (!(input instanceof Element) || !input.matches('.kairos-command-input')) return;
      const command = closest<HTMLElement>(input, '.kairos-command');
      if (!command) return;
      const list = q<HTMLElement>('.kairos-command-list', command);
      if (!list) return;

      const visible = visibleItems(list);
      if (!visible.length) return;
      const selected = visible.find((el) => el.dataset.state === 'selected') || visible[0]!;
      const idx = visible.indexOf(selected);

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        const next = visible[Math.min(idx + 1, visible.length - 1)]!;
        selectItem(next, list);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        const prev = visible[Math.max(idx - 1, 0)]!;
        selectItem(prev, list);
      } else if (e.key === 'Enter') {
        e.preventDefault();
        const current = visible.find((el) => el.dataset.state === 'selected') || selected;
        if (current) {
          emit(command, 'kairos:command:execute', { item: current, value: current.textContent?.trim() });
          closeCommand(command);
        }
      }
    }) as EventListener)
  );

  // Click on item to execute
  initCleanups.push(
    on(document, 'click', ((e: MouseEvent) => {
      const item = closest<HTMLElement>(e.target as Element, '.kairos-command-item');
      if (!item) return;
      const command = closest<HTMLElement>(item, '.kairos-command');
      if (!command) return;
      const list = closest<HTMLElement>(item, '.kairos-command-list');
      if (!list) return;
      // Only if visible
      if (item.style.display === 'none') return;
      selectItem(item, list as HTMLElement);
      emit(command, 'kairos:command:execute', { item, value: item.textContent?.trim() });
      closeCommand(command);
    }) as EventListener)
  );
}

export const Command = { open: openCommand, close: closeCommand, init, _reset: () => { openCleanups.forEach((fn) => fn()); openCleanups = []; initCleanups.forEach((fn) => fn()); initCleanups = []; initialized = false; activeCommand = null; } };
