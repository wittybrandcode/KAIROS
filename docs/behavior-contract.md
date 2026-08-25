# Kairos Behavior Contract

## Purpose
This document defines the global standard for JavaScript interactions within the Kairos framework. Every interactive component must strictly adhere to these rules before its JavaScript module is written.

---

## 1. Trigger & Target System

All interactions are declarative and defined via HTML `data` attributes to minimize JavaScript setup.

### Core Attributes
- `data-kairos-toggle="[component]"`: Defines the component type triggered (e.g., `modal`, `dropdown`, `collapse`).
- `data-kairos-target="[selector]"`: CSS selector pointing to the element to manipulate. If absent, targets next sibling or parent based on context.
- `data-kairos-dismiss`: Attached to a button inside a component to close its closest parent component.

---

## 2. State Management

Visual states must be driven exclusively by the `data-state` attribute, which maps directly to CSS transitions.

### Standard States
- `data-state="closed"` (Default implicit state)
- `data-state="open"` (Overlay is visible)
- `data-state="active"` (Item is currently selected)
- `data-state="disabled"` (Interaction disabled)
- `data-state="loading"` (Async task pending)

JavaScript MUST NOT manipulate inline styles directly for visibility (e.g., no `display: none` or `opacity: 1` via JS). JS only flips the `data-state` string.

---

## 3. Global Lifecycle & Events

Every component dispatches native CustomEvents on its root DOM node. 

### Event Naming
Format: `kairos:[component]:[action]`

### Required Lifecycle Hooks
1. `kairos:[component]:before-open`: Fired before the opening transition starts. Can be canceled (`event.preventDefault()`).
2. `kairos:[component]:opened`: Fired after the CSS opening transition completes.
3. `kairos:[component]:before-close`: Fired before the closing transition starts. Can be canceled.
4. `kairos:[component]:closed`: Fired after the CSS closing transition completes.

---

## 4. Animation Timing

- JavaScript synchronizes with CSS transitions. 
- Wait for the native `transitionend` event on the component.
- Fallback timeout: If `transitionend` doesn't fire within `var(--kairos-duration-normal) + 50ms`, JS forcefully completes the lifecycle to prevent freezing.

---

## 5. Accessibility (ARIA) & Focus Management

### ARIA Syncing
- When `data-state="open"`: `aria-expanded="true"`, `aria-hidden="false"`.
- When `data-state="closed"`: `aria-expanded="false"`, `aria-hidden="true"`.

### Focus Trapping (For Modals, Dialogs)
1. On open, focus moves to the first focusable element inside the target.
2. `Tab` loops within the component's boundaries.
3. `Shift+Tab` loops backwards.
4. On close, focus is returned to the original trigger element.

---

## 6. Keyboard Navigation

- `Escape`: Closes any active overlay (Modal, Dropdown, Popover, Toast).
- `ArrowDown` / `ArrowUp`: Navigates lists (Dropdowns, Command Palette) and sets `data-state="selected"`.
- `Enter` / `Space`: Activates the currently selected item.
- `Home` / `End`: Jumps to start/end of lists.
