# Browser Support Matrix

> This document defines the officially supported browsers and environments for the Kairos Design Framework. It strictly governs which CSS and JS features are permissible in the codebase.

---

## Supported Environments

Kairos aims to support the majority of modern production environments, specifically focusing on the desktop setups typical in broadcast control rooms.

### Tier 1: Fully Supported (Must Work)
All features, styling, and animations must perform flawlessly. Bugs in these browsers are treated as high-priority framework issues.

- **Google Chrome** (Latest 2 versions)
- **Microsoft Edge** (Latest 2 versions)
- **Mozilla Firefox** (Latest 2 ESR versions + Latest)
- **Apple Safari** (macOS, Latest 2 versions)
- **Electron** (v20+, Chromium 104+)

### Tier 2: Best Effort (Should Work)
We strive for functional parity, but minor visual degradations are acceptable if workarounds are too costly.

- **Chrome for Android** (Latest)
- **Safari for iOS** (Latest 2 versions)

### Unsupported (Do Not Fix)
Bugs reported against these browsers will be closed as "WontFix".

- Internet Explorer (All versions)
- Legacy Edge (EdgeHTML)
- Safari version <= 14

---

## Allowed CSS Features

To maintain compatibility with our target environments, we strictly restrict the CSS features we use.

### ✅ Approved for Immediate Use
- CSS Custom Properties (Variables)
- CSS `calc()`, `min()`, `max()`, `clamp()`
- `@media` queries (Standard width/height/prefers-color-scheme)
- `:focus-visible` pseudo-class
- `appearance: none`
- `gap` in Flexbox
- `aspect-ratio`

### ❌ Strictly Prohibited
Do not use these features under any circumstances until officially approved by an architecture review.
- **CSS Nesting**: Browser support is too narrow, especially for older LTS Electron builds.
- **`:has()` selector**: Not yet universal enough across all target ESR versions.
- **Container Queries (`@container`)**: Requires too much polyfilling overhead for our current baseline.
- **Popover API**: We maintain strict JS control over layering via our `src/modules/` architecture.
- **`@layer` (Cascade Layers)**: We rely on strict `@import` order in `kairos.css` to manage specificity.

---

## Allowed JS Features

The JavaScript engine (`src/core` and `src/modules`) is compiled to ES6/ES2015.

### ✅ Approved for Immediate Use
- Native `CustomEvent`
- `WeakMap` / `WeakSet`
- `MutationObserver`, `ResizeObserver`, `IntersectionObserver`
- `Element.closest()`
- ES6 standard library (`Array.prototype.find`, `Object.assign`, etc.)

### ❌ Strictly Prohibited
- Experimental DOM APIs (unless behind a feature flag or with a robust polyfill).
- Anything requiring a heavy runtime polyfill (e.g., generator regenerator runtimes).
