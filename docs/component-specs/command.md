# Command Palette Component Specification

## Purpose
A global search and action execution overlay, usually triggered by a keyboard shortcut.

## HTML Structure
```html
<div id="cmd-palette" class="kairos-modal" data-state="closed" role="dialog">
  <div class="kairos-modal-backdrop" data-kairos-dismiss></div>
  <div class="kairos-command">
    <input type="text" class="kairos-command-input" placeholder="Search..." autofocus>
    <div class="kairos-command-list" role="listbox">
      <div class="kairos-command-item" data-state="selected" role="option">Action 1</div>
      <div class="kairos-command-item" data-state="active" role="option">Action 2</div>
    </div>
  </div>
</div>
```

## Behavior Contract
- Typically wrapped inside a Modal, so it inherits Modal opening/closing behavior.
- Typing in the input filters the `.kairos-command-list`.
- The state engine handles DOM mutation for filtering (hiding non-matching items).

## Keyboard
- `Ctrl+K` or `Cmd+K`: Global shortcut to open.
- `ArrowDown`: Moves `data-state="selected"` to the next visible item.
- `ArrowUp`: Moves `data-state="selected"` to the previous visible item.
- `Enter`: Executes the selected action and closes the palette.
- `Escape`: Closes the palette.

## ARIA
- Input has `aria-controls`, `aria-activedescendant`.
- List has `role="listbox"`.
- Items have `role="option"`.

## Events
- `kairos:command:execute` (Fires with the action payload)
- Inherits `kairos:modal:*` events.

## Edge Cases
- **Empty State**: Displays an "No results found" message if all items are hidden.
- **Scroll Sync**: Pressing `ArrowDown` must scroll the `.kairos-command-list` to keep the selected item in view.
