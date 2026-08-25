# Toast Component Specification

## Purpose
A brief, non-blocking notification that appears temporarily to provide feedback to the user.

## HTML Structure
```html
<div class="kairos-toast-container">
  <div class="kairos-toast" data-state="open" role="status" aria-live="polite">
    <div class="kairos-toast-content">Message</div>
    <button data-kairos-dismiss aria-label="Close">X</button>
  </div>
</div>
```

## Behavior Contract
- Appends into `.kairos-toast-container` (which acts as a fixed positioning boundary).
- Sets `data-state="open"` to trigger entry animation.
- Automatically sets `data-state="closed"` after a timeout (e.g., 3000ms).
- Pauses the timeout if the user hovers over the toast.
- Clicking the dismiss button closes it immediately.
- Once `data-state="closed"` animation completes, the element is removed from the DOM.

## Keyboard
- Because toasts are non-blocking, they usually don't intercept focus.
- A hotkey (e.g., `F8`) can be globally bound to focus the toast container.

## ARIA
- `role="status"` or `role="alert"` for critical errors.
- `aria-live="polite"` (or `assertive`).

## Events
- `kairos:toast:show`
- `kairos:toast:hide`

## Edge Cases
- **Multiple Toasts**: They stack vertically. The container should handle the overflow.
- **Hover**: Timeout strictly pauses on `mouseenter` and resumes on `mouseleave`.
