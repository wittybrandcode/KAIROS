# Modal Component Specification

## Purpose
A dialog box/popup window that is displayed on top of the current page. It interrupts the user's workflow to demand an action or convey critical information.

## HTML Structure
```html
<button data-kairos-toggle="modal" data-kairos-target="#my-modal">Open</button>

<div id="my-modal" class="kairos-modal" data-state="closed" role="dialog" aria-modal="true" aria-labelledby="my-modal-title">
  <div class="kairos-modal-backdrop" data-kairos-dismiss></div>
  <div class="kairos-modal-content">
    <div class="kairos-modal-header">
      <h2 id="my-modal-title">Title</h2>
      <button data-kairos-dismiss aria-label="Close">X</button>
    </div>
    <div class="kairos-modal-body">...</div>
  </div>
</div>
```

## Behavior Contract
- Clicking the trigger finds the target modal via `data-kairos-target`.
- Sets `data-state="open"` on the target.
- Clicking `.kairos-modal-backdrop` or a `[data-kairos-dismiss]` button sets `data-state="closed"`.
- Prevents scrolling on the `<body>` while open (adds a class like `.kairos-no-scroll`).

## Keyboard
- `Escape`: Closes the modal.
- `Tab`: Traps focus within `.kairos-modal-content`.
- `Shift + Tab`: Traps focus backwards.

## Focus Management
- On open: Focus moves to the first focusable element inside `.kairos-modal-content`.
- On close: Focus returns to the button that triggered the modal.

## Events
- `kairos:modal:before-open`
- `kairos:modal:opened`
- `kairos:modal:before-close`
- `kairos:modal:closed`

## Edge Cases
- **Nested Modals**: Not supported. Only one modal should be open at a time. If another opens, the previous one should close or stack underneath visually but lose focus priority.
- **Missing Backdrop**: Clicking outside the `.kairos-modal-content` should still dismiss unless explicitly disabled via `data-backdrop="static"`.
