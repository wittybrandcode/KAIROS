# ADR 0002: CSS Owns Rendering

**Status:** Accepted
**Date:** 2026-06-16

## Context
Animating and manipulating styles via JavaScript (e.g. `element.style.display = 'block'`, `element.style.opacity = '1'`) leads to inline styles that are hard to override, unmaintainable, and often perform poorly compared to native CSS transitions.

## Decision
CSS has absolute ownership of rendering and layout. JavaScript is strictly prohibited from mutating `element.style`.
JavaScript's only role in rendering is mutating the `data-state` attribute. CSS will listen to these attribute changes (e.g. `[data-state="open"]`) and apply the appropriate layout, visibility, and transition properties.

## Consequences
- **Pros:** Clear separation of concerns. CSS performance is maximized. Themes can completely override component appearance without fighting JS inline styles.
- **Cons:** JS must wait for `transitionend` events to perform lifecycle cleanups (like removing a node or shifting focus), which requires careful event listener management and fallback timeouts.
