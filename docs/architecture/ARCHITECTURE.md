# KAIROS ARCHITECTURE

> The constitution of the Kairos Design Framework.
> If all other documentation is lost, this file alone should be enough
> for any engineer to understand the framework's philosophy in 30 minutes.

---

## Vision

Kairos is a specialized design system for **broadcast control surfaces** — switchers, routing matrices, audio consoles, and production environments. It is not a general-purpose UI framework.

Every design decision serves one principle: **operators must never hesitate**. In live broadcast, a 200ms delay or a misread button can mean lost airtime. Kairos optimizes for speed, clarity, and zero ambiguity.

---

## Core Principles

1. **DOM is the single source of truth.** No internal stores, no signals, no event buses. If `element.dataset.state === "open"`, the element is open. Period.

2. **CSS handles all rendering.** JavaScript never writes `display: none`, `opacity`, or inline styles for visibility. JS flips `data-state`; CSS transitions take over.

3. **JavaScript handles behavior only.** Focus management, keyboard navigation, event dispatching, and lifecycle coordination. Nothing visual.

4. **No warm colors.** Cool steel gray palette + 4 semantic status colors only (PGM red, PVW green, Warning yellow, Info blue).

5. **No border-radius.** Everywhere, always, zero exceptions. The linter enforces this.

6. **No decorative motion.** Maximum animation duration is 300ms. Every animation must serve a functional purpose.

7. **Uppercase by default.** Buttons, tabs, labels, and panel headers use uppercase with wide letter-spacing for maximum readability at distance.

---

## Layers

```
┌─────────────────────────────────┐
│         FOUNDATION              │  Design tokens: colors, spacing, typography,
│                                 │  sizes, elevation, motion, focus, cursors
├─────────────────────────────────┤
│         CONTRACTS               │  Intent, Variant, Size, State, Recipe
│                                 │  (consumed by ALL components)
├─────────────────────────────────┤
│         PRIMITIVES              │  Button, Input, Checkbox, Radio, Switch,
│                                 │  Select, Textarea, Label, Divider, Spinner,
│                                 │  Progress, Avatar, Chip, Badge, Icon
├─────────────────────────────────┤
│         COMPOSITES              │  Modal, Dropdown, Accordion, Tabs, Toast,
│                                 │  Sidebar, Breadcrumb, Pagination, Tree,
│                                 │  Command, Table, Tooltip, Popover
├─────────────────────────────────┤
│         DOMAIN                  │  Broadcast-specific: Bus, Multiview, Shell,
│                                 │  Rundown, Source-Tag, Keyer, Crosspoint
├─────────────────────────────────┤
│         THEMES                  │  Light/Dark overrides
├─────────────────────────────────┤
│         UTILITIES               │  Layout helpers, flex, grid, gap, overflow
└─────────────────────────────────┘
```

---

## Contracts

### Design Contract (CSS)
Every component consumes these contract layers:

| Layer | Mechanism | Example |
|-------|-----------|---------|
| **Intent** | `.kairos-intent-*` classes | `.kairos-intent-pvw`, `.kairos-intent-pgm` |
| **Variant** | `.kairos-variant-*` classes | `.kairos-variant-solid`, `.kairos-variant-outline` |
| **Size** | `.kairos-size-*` classes | `.kairos-size-sm`, `.kairos-size-md`, `.kairos-size-lg` |
| **State** | `data-state` attributes | `data-state="open"`, `data-state="active"` |
| **Recipe** | `.kairos-recipe-*` classes | `.kairos-recipe-action-pvw` |

Components consume contract variables with fallbacks:
```css
background: var(--kairos-comp-current-bg, [default]);
border-color: var(--kairos-comp-current-border, [default]);
color: var(--kairos-comp-current-text, [default]);
```

### Behavior Contract (JS)
Every interactive component follows:

| Aspect | Rule |
|--------|------|
| **Trigger** | `data-kairos-toggle="[type]"` + `data-kairos-target="[selector]"` |
| **State** | JS only sets `data-state`. CSS handles visuals. |
| **Events** | `kairos:[component]:[action]` via native `CustomEvent` |
| **Lifecycle** | `before-open` → `opened` → `before-close` → `closed` |
| **Animation** | `transitionend` + fallback timeout (duration + 50ms) |
| **Focus** | Trap on open, restore on close, stack for nesting |
| **Keyboard** | `Escape` closes, `Arrows` navigate, `Enter/Space` activates |

Full specifications: `docs/behavior-contract.md`

---

## Directory Rules

```
src/
├── foundation/     Design tokens ONLY. No component logic.
├── components/     CSS for all UI components. One file per component or group.
├── domain/         Broadcast-specific CSS. Never generic UI.
├── themes/         Theme overrides only. No new components.
├── utilities/      Utility classes only. No component logic.
├── core/           JS utilities shared by ALL modules. No component logic.
│                   Every function is pure or a thin DOM wrapper.
├── modules/        JS behavior for interactive components.
│                   Each module depends on core/ ONLY.
│                   No inter-module imports. Ever.
└── kairos.ts       Entry point. Imports core + modules. Exposes global.
```

**Rules:**
- Foundation files define `--kairos-*` variables only.
- Component files consume `--kairos-comp-*` contract variables.
- Module files import from `../core/` only. Never from `../modules/`.
- No file in `src/` may import from `dist/`.

---

## Naming Rules

| Category | Pattern | Example |
|----------|---------|---------|
| CSS Variable | `--kairos-{category}-{name}` | `--kairos-bg-surface`, `--kairos-status-pgm` |
| CSS Class | `.kairos-{component}-{element}-{modifier}` | `.kairos-btn-primary`, `.kairos-modal-header` |
| Data Attribute | `data-kairos-{action}` | `data-kairos-toggle`, `data-kairos-dismiss` |
| State Attribute | `data-state="{value}"` | `data-state="open"`, `data-state="active"` |
| JS Event | `kairos:{component}:{action}` | `kairos:modal:opened`, `kairos:dropdown:select` |
| JS Core Export | `src/core/{concern}.ts` | `dom.ts`, `events.ts`, `state.ts` |
| JS Module Export | `src/modules/{component}.ts` | `modal.ts`, `dropdown.ts` |

---

## Public API

The public API is everything exposed via `window.Kairos`:

```ts
// Core
Kairos.dom       // q, qa, closest, resolveTarget, getFocusable
Kairos.events    // emit, on, off, once
Kairos.state     // open, close, toggle, activate, loading, selected, is, read
Kairos.focus     // trap, restore, next, previous
Kairos.keyboard  // onEscape, onArrows, onActivate, hotkey
Kairos.animation // waitTransition, waitAnimation, transitionPromise
Kairos.observer  // onMutation, onResize, onIntersection
Kairos.utils     // debounce, throttle, uid, clamp, merge

// Modules
Kairos.Modal     // open, close
Kairos.Dropdown  // open, close
Kairos.Accordion // toggle
Kairos.Tabs      // activate
Kairos.Toast     // show, dismiss
Kairos.Sidebar   // open, close
Kairos.Command   // open, close
```

See `docs/api-contract.md` for the full frozen API surface.

---

## Extension Rules

### Adding a New Component
1. Write its CSS in `src/components/{name}.css`.
2. It MUST consume `--kairos-comp-*` contract variables with fallbacks.
3. It MUST pass the checklist in `docs/component-contract.md`.
4. Write its behavior spec in `docs/component-specs/{name}.md`.
5. Write its JS module in `src/modules/{name}.ts` (core imports only).
6. Add it to `docs/component-matrix.md`.
7. Add a pattern page in `patterns/{name}.html`.

### Adding a New Core Utility
1. It MUST be generic (not component-specific).
2. It MUST have zero dependencies on modules.
3. It MUST return a cleanup function if it registers listeners.

---

## Deprecation Rules

1. **Mark**: Add `@deprecated` comment and `/* DEPRECATED: use X instead */` to CSS.
2. **Warn**: Log a console warning in JS when deprecated API is called.
3. **Keep**: Maintain the deprecated API for at least **one major version**.
4. **Remove**: Remove only in the next major version (e.g., 1.x → 2.0).

---

## Versioning Rules

See `docs/versioning.md` for full details.

- **1.x**: No breaking CSS, JS, or HTML changes. Additive only.
- **2.x**: Breaking changes allowed with migration guide.
- **Patch (x.x.1)**: Bug fixes only.
- **Minor (x.1.0)**: New components, new utilities, new tokens.
- **Major (2.0.0)**: Contract changes, renamed classes, removed APIs.

---

## Browser Support

See `docs/browser-support.md` for the full matrix.

**Tier 1 (Must Work):** Chrome, Edge, Firefox, Safari (latest 2 versions), Electron.
**Tier 2 (Should Work):** Chrome Android, Safari iOS.

**CSS Features Used:**
- CSS Custom Properties ✅
- CSS `calc()` ✅
- `@media` queries ✅
- `:focus-visible` ✅
- `appearance: none` ✅
- Container Queries ✅ (`@container` — used in `src/domain/shell.css:12` + `src/foundation/breakpoints.css:35`; raw px in `@container (max-width: ...)` cannot use `var()` — document with `/* --kairos-bp-* */` comments)
- Ticker/Marquee functional motion ✅ — durations `10s–40s` via `--kairos-ticker-*-speed` / `--kairos-marquee-*-speed` (`src/components/components.css:827`) are **documented exceptions** to the 300ms rule (`AGENTS.md:4`)

**CSS Features NOT Used (intentionally):**
- CSS Nesting ❌ (browser support too narrow)
- `:has()` ❌ (not yet universal)
- Popover API ❌ (we use our own)
- `@layer` ❌ (not needed, import order is sufficient)
