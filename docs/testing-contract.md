# Testing Contract

> This document defines what it means for a Kairos component to "pass" its tests.
> A component is not considered complete until it satisfies all applicable dimensions of this contract.

---

## 1. Structure Test (DOM & Classes)
Ensures the component renders correctly and accepts the required design contracts.
- **✓** Renders the root element with the correct `.kairos-{component}` class.
- **✓** Consumes `.kairos-intent-*`, `.kairos-variant-*`, and `.kairos-size-*` classes correctly.
- **✓** Does not render invalid nested elements.
- **✓** Applies dynamic classes (if any) based on options.

## 2. Accessibility Test (a11y)
Ensures the component is usable by assistive technologies. Tested via `axe-core`.
- **✓** Passes `axe-core` audits with zero violations.
- **✓** Root element has the correct `role` (e.g., `dialog`, `tablist`, `status`).
- **✓** ARIA attributes (e.g., `aria-expanded`, `aria-hidden`, `aria-selected`) update correctly during state changes.
- **✓** Form controls have accessible labels.

## 3. Keyboard Test
Ensures full operability without a mouse.
- **✓** Can be activated via `Enter` or `Space` (if it is a trigger).
- **✓** Can be dismissed via `Escape` (Modals, Dropdowns, Toast, Command, Sidebar).
- **✓** Supports arrow key navigation (`ArrowUp`/`ArrowDown`/`ArrowLeft`/`ArrowRight`) for lists, menus, and tabs.
- **✓** Supports `Home`/`End` for navigating to boundaries in lists.

## 4. Focus Test
Ensures logical focus flow and trapping.
- **✓** Receives focus when navigated via `Tab`.
- **✓** Traps focus within the container when open (Modals, Sidebars on mobile).
- **✓** Restores focus to the trigger element when closed.
- **✓** Focus is clearly visible via the `--kairos-focus-ring` (Visual Test).

## 5. State Test
Ensures the JavaScript engine correctly mutates the single source of truth.
- **✓** Mutates `data-state` to `"open"` or `"closed"` or `"active"` as expected.
- **✓** Does not mutate `style.display` or `style.visibility` directly.
- **✓** Handles multiple rapid state changes without tearing or deadlocks.

## 6. Event Test
Ensures lifecycle hooks fire reliably.
- **✓** Emits `kairos:{component}:before-open` (cancelable).
- **✓** Emits `kairos:{component}:opened` strictly after `transitionend`.
- **✓** Emits `kairos:{component}:before-close` (cancelable).
- **✓** Emits `kairos:{component}:closed` strictly after `transitionend`.
- **✓** Emits contextual events (e.g., `kairos:dropdown:select`).

## 7. Contract Test (Public API)
Ensures the `window.Kairos` API surface behaves as documented.
- **✓** `Kairos.Component.open(el)` works identically to clicking a trigger.
- **✓** `Kairos.Component.close(el)` works identically to clicking a dismiss button.
- **✓** Calling `open()` on an already open component does nothing (idempotent).

## 8. Visual Regression Test
Ensures pixel-perfect stability across builds.
- **✓** Snapshot matches base image exactly (zero diff tolerance for standard states).
- **✓** Verified in Light mode.
- **✓** Verified in Dark mode.
- **✓** Verified across focus states.
