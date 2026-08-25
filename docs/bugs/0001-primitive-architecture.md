# Bug Report: Primitive Layer - Orthogonality & Hidden Abstractions

**ID:** RC-0001
**Component:** Global Primitive Layer
**Gate Failed:** Gate 1: Architecture
**Severity:** Critical

## Description
An architectural audit of the Primitive Foundation revealed severe violations of the separation of concerns, "Primitive Purity", and "No JS in Primitives" rules.

## Expected Behavior
1. Primitives must contain exactly zero JavaScript.
2. Abstract components like `Overlay`, `Backdrop`, `Popover`, and `Surface` must exist as independent primitives, rather than being hidden inside `Modal`, `Sidebar`, or `Dropdown` logic.
3. The framework must provide explicit layout primitives (`Box`, `Stack`, `Cluster`, `Spacer`) to facilitate rapid composition.

## Actual Behavior
1. `src/components/badge.ts` exists and contains JavaScript logic to render a Web Component, directly violating ADR-0001.
2. `Overlay` and `Backdrop` logic is tightly coupled inside `overlays.css`, `modal.css`, and `sidebar.css`.
3. `Popover` logic is intertwined with `overlays.css` and Dropdown behavior.
4. No structural Layout primitives exist.

---
*The sections below are to be filled during the Fix Sprint.*

## Root Cause
The `badge` was incorrectly implemented as a Web Component with JavaScript (`badge.ts`). Layout patterns (`Box`, `Stack`, `Cluster`) were missing, forcing components to reinvent spacing. Core abstraction layers for Overlays and Popovers were hidden inside composites (`modal.css`, `sidebar.css`, `overlays.css`), leading to tightly coupled styling and duplication.

## Fix
1. Deleted `badge.ts` to strictly enforce zero JS inside Primitive components.
2. Extracted `Popover` into `src/components/popover.css` with a dedicated primitive class `.kairos-popover`.
3. Extracted `Overlay` into `src/components/overlay.css` as `.kairos-overlay` and `.kairos-backdrop`.
4. Created `src/components/layout.css` to introduce structural layout primitives (`Box`, `Stack`, `Cluster`, `Spacer`).
5. Updated `src/kairos.css` to import all new primitive layers immediately after `primitives.css` and removed Popover classes from `overlays.css`.

## Test Added
This was an architectural/CSS extraction, verified by passing the Playwright baseline layout checks (no visual regressions expected since classes map functionally).

## Closed By
Antigravity

