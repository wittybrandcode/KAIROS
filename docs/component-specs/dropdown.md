# Dropdown Component Specification

## Purpose
A contextual menu that provides a list of actions or links relative to a specific trigger element.

## HTML Structure
```html
<div class="kairos-dropdown-wrapper">
  <button data-kairos-toggle="dropdown" aria-haspopup="menu" aria-expanded="false">
    Actions
  </button>
  <div class="kairos-dropdown" data-state="closed" role="menu">
    <button class="kairos-dropdown-item" role="menuitem">Edit</button>
    <button class="kairos-dropdown-item" role="menuitem">Delete</button>
  </div>
</div>
```

## Behavior Contract
- Triggering sets `data-state="open"` on `.kairos-dropdown` and `aria-expanded="true"` on the trigger.
- Closes automatically when an item is clicked, or when clicking outside the `.kairos-dropdown-wrapper`.

## Keyboard
- `ArrowDown`: Opens dropdown (if closed) or moves focus to the next item.
- `ArrowUp`: Moves focus to the previous item.
- `Enter` / `Space`: Selects the focused item.
- `Escape`: Closes the dropdown and returns focus to the trigger.

## Focus Management
- Focus moves to the `.kairos-dropdown` or its first item upon opening via keyboard.
- Roving tabindex or direct focus can be used for navigating items.

## Events
- `kairos:dropdown:before-open`
- `kairos:dropdown:opened`
- `kairos:dropdown:before-close`
- `kairos:dropdown:closed`
- `kairos:dropdown:select` (Fired on the selected item)

## Edge Cases
- **Viewport Bounds**: Needs positioning logic (e.g., Popper.js style or native anchor positioning) to prevent clipping off the edge of the screen.
