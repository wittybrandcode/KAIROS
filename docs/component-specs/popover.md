# Popover Component Specification

## Purpose
A rich, contextual overlay that displays more information than a tooltip, often including interactive elements like buttons or forms.

## HTML Structure
```html
<div class="kairos-popover-wrapper">
  <button data-kairos-toggle="popover" aria-expanded="false" aria-haspopup="dialog">Settings</button>
  <div class="kairos-popover" data-state="closed" role="dialog">
    <div class="kairos-popover-content">
      <input type="text" placeholder="Value">
      <button data-kairos-dismiss>Save</button>
    </div>
  </div>
</div>
```

## Behavior Contract
- Similar to Dropdown, but traps focus like a Modal because it contains interactive elements.
- Clicking outside the `.kairos-popover-wrapper` closes it.
- Unlike a Tooltip, it is triggered by Click, not Hover.

## Keyboard
- `Escape`: Closes the popover.
- `Tab`: Traps focus within `.kairos-popover` if interactive elements exist.

## Focus Management
- Focus moves inside the popover on open.
- Focus returns to the trigger on close.

## Events
- `kairos:popover:before-open`
- `kairos:popover:opened`
- `kairos:popover:before-close`
- `kairos:popover:closed`

## Edge Cases
- **Positioning**: Must dynamically calculate available space to position itself without clipping.
- **Form Submission**: If a form inside the popover is submitted, it should optionally trigger a close event via `data-kairos-dismiss`.
