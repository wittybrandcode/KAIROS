# ADR 0001: DOM is Source of Truth

**Status:** Accepted
**Date:** 2026-06-16

## Context
Frameworks like React and Vue use a virtual DOM and a reactive state store (Redux, Signals, Context) to manage UI state. Kairos is a vanilla CSS/JS design system intended to be framework-agnostic. We need a way to manage state without introducing a heavy reactive layer or pub/sub architecture.

## Decision
The DOM itself will act as the single source of truth.
We will not use state stores, signals, or event buses to track UI state.
State will be read from and written directly to standard HTML attributes (specifically `data-state`).

## Consequences
- **Pros:** Zero dependencies. Extremely fast. Works natively with CSS attribute selectors (e.g., `[data-state="open"]`). Debugging is trivial because the state is fully visible in the browser DevTools inspector.
- **Cons:** Manipulating the DOM directly can be slower in mass updates, but broadcast UI components (Modals, Tabs) do not suffer from mass update performance issues.
