# Sidebar Component Specification

## Purpose
A collapsable or fixed navigation panel typically positioned on the left side of the screen.

## HTML Structure
```html
<button data-kairos-toggle="sidebar" data-kairos-target="#main-sidebar">Menu</button>

<aside id="main-sidebar" class="kairos-sidebar" data-state="open">
  <div class="kairos-sidebar-header">
    <button data-kairos-dismiss aria-label="Close Sidebar">X</button>
  </div>
  <nav class="kairos-sidebar-content">
    <a href="#" class="kairos-sidebar-item" data-state="active">Dashboard</a>
  </nav>
</aside>
```

## Behavior Contract
- Toggling sets `data-state="open"` or `closed`.
- On mobile breakpoints, the sidebar acts like a Modal (requires a backdrop, traps focus).
- On desktop breakpoints, it pushes content and does not trap focus.

## Keyboard
- Mobile: Matches Modal keyboard behavior (`Escape` to close, `Tab` trap).
- Desktop: Standard tab flow navigation.

## ARIA
- Mobile: `role="dialog"`, `aria-modal="true"`.
- Desktop: `role="navigation"`.

## Events
- `kairos:sidebar:before-open`
- `kairos:sidebar:opened`
- `kairos:sidebar:before-close`
- `kairos:sidebar:closed`

## Edge Cases
- **Breakpoint Transitions**: JS must observe window resize to switch ARIA roles and trap logic dynamically if the breakpoint crosses the mobile threshold.
