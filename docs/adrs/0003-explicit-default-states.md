# ADR 0003: Explicit Default States

**Status:** Accepted
**Date:** 2026-06-16

## Context
Initially, the framework relied on implicit default states. For example, if a Modal did not have `data-state="open"`, it was implicitly considered closed. This led to ambiguous test failures (e.g., E2E tests timing out while waiting for a `data-state="closed"` attribute that never existed).

## Decision
All components must declare their state explicitly at all times. 
If a component is closed by default, its HTML markup MUST include `data-state="closed"`. 
There are no "implicit" states. `data-state` must always have a string value.

## Consequences
- **Pros:** 
  - Deterministic testing: We can write tests that expect an element to have a specific attribute.
  - Better DevTools experience: The state of every component is immediately obvious in the Elements panel.
  - Reduced JS branching: JS engines don't need to check for `null` attributes to guess the state.
- **Cons:** 
  - Slightly more verbose HTML markup.
