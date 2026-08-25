# KAIROS MASTER INVENTORY

> Generated: 2026-06-18
> Version: v01 (pre-RC1)

---

## 1. FOUNDATION

### 1.1 Colors (`src/foundation/colors.css`)

| Token Group | Tokens |
|---|---|
| Cool Steel Scale | `--kairos-cs-0` through `--kairos-cs-1000` (22 stops) |
| Background Hierarchy | `--kairos-bg-deep`, `--kairos-bg-deep-alt`, `--kairos-bg-input`, `--kairos-bg-surface-alt`, `--kairos-bg-surface`, `--kairos-bg-hover`, `--kairos-bg-selected` |
| Border Hierarchy | `--kairos-border-muted`, `--kairos-border`, `--kairos-border-active`, `--kairos-border-focus` |
| Text Hierarchy | `--kairos-text`, `--kairos-text-secondary`, `--kairos-text-muted`, `--kairos-text-placeholder`, `--kairos-text-disabled`, `--kairos-text-inverse` |
| Status Colors | `--kairos-status-pgm`, `--kairos-status-pvw`, `--kairos-status-warning`, `--kairos-status-info`, `--kairos-status-offline` |
| Status Backgrounds | `--kairos-pgm-bg`, `--kairos-pvw-bg`, `--kairos-warning-bg`, `--kairos-error-bg` |
| Interactive States | `--kairos-interactive-hover`, `--kairos-interactive-selected`, `--kairos-interactive-focus` |
| Opacity Variants | `--kairos-pgm-alpha-10/15/20/30`, `--kairos-pgm-bright`, `--kairos-pvw-alpha-0/10/15/20/30/40/80`, `--kairos-pvw-bright`, `--kairos-overlay`, `--kairos-overlay-dark` |
| Aliases | `--kairos-border-error` |

### 1.2 Typography (`src/foundation/typography.css`, `typography-utils.css`)

| Token Group | Tokens |
|---|---|
| Font Size Scale | `--kairos-text-xs` (11px), `--kairos-text-sm` (12px), `--kairos-text-md` (14px), `--kairos-text-lg` (16px), `--kairos-text-xl` (20px), `--kairos-text-2xl` (24px) |
| Font Weight | `--kairos-weight-normal` (400), `--kairos-weight-medium` (500), `--kairos-weight-bold` (600) |
| Line Height | `--kairos-leading-tight` (1.2), `--kairos-leading-base` (1.4) |
| Font Family | `--kairos-font-sans` (Noto Sans), `--kairos-font-mono` (SF Mono / JetBrains Mono) |

### 1.3 Spacing (`src/foundation/spacing.css`)

| Token | Value |
|---|---|
| `--kairos-space-3xs` | 2px |
| `--kairos-space-2xs` | 4px |
| `--kairos-space-xs` | 6px |
| `--kairos-space-sm` | 8px |
| `--kairos-space-md` | 12px |
| `--kairos-space-lg` | 16px |
| `--kairos-space-xl` | 24px |
| `--kairos-space-2xl` | 32px |
| `--kairos-space-3xl` | 48px |

### 1.4 Radius (`src/foundation/spacing.css`)

| Token | Value |
|---|---|
| `--kairos-radius-1` | 0 |
| `--kairos-radius-2` | 0 |
| `--kairos-radius-3` | 0 |
| `--kairos-radius-4` | 0 |
| `--kairos-radius-6` | 0 |

All values are `0`. No exceptions.

### 1.5 Letter Spacing (`src/foundation/spacing.css`)

| Token | Value |
|---|---|
| `--kairos-tracking-tight` | -0.025em |
| `--kairos-tracking-normal` | 0em |
| `--kairos-tracking-wide` | 0.025em |
| `--kairos-tracking-wider` | 0.04em |
| `--kairos-tracking-widest` | 0.05em |
| `--kairos-tracking-extra-wide` | 0.06em |
| `--kairos-tracking-ultra` | 0.08em |
| `--kairos-tracking-max` | 0.1em |
| `--kairos-tracking-super-wide` | 0.15em |

### 1.6 Shadows (`src/foundation/shadows.css`)

| Token | Classes |
|---|---|
| `--kairos-shadow-flat` | `.kairos-shadow-flat` |
| `--kairos-shadow-raised` | `.kairos-shadow-raised` |
| `--kairos-shadow-sticky` | `.kairos-shadow-sticky` |
| `--kairos-shadow-dropdown` | `.kairos-shadow-dropdown` |
| `--kairos-shadow-modal` | `.kairos-shadow-modal` |
| `--kairos-shadow-toast` | `.kairos-shadow-toast` |
| `--kairos-shadow-tooltip` | `.kairos-shadow-tooltip` |

### 1.7 Elevation / Z-Index (`src/foundation/elevation.css`)

| Token | Value | Class |
|---|---|---|
| `--kairos-z-base` | 1 | `.kairos-z-base` |
| `--kairos-z-sticky` | 10 | `.kairos-z-sticky` |
| `--kairos-z-dropdown` | 50 | `.kairos-z-dropdown` |
| `--kairos-z-sticky-nav` | 80 | `.kairos-z-sticky-nav` |
| `--kairos-z-modal` | 100 | `.kairos-z-modal` |
| `--kairos-z-tooltip` | 200 | `.kairos-z-tooltip` |
| `--kairos-z-loader` | 500 | `.kairos-z-loader` |
| `--kairos-z-toast` | 9000 | `.kairos-z-toast` |
| `--kairos-z-max` | 9999 | — |

### 1.8 Motion (`src/foundation/motion.css`)

| Token | Value | Class |
|---|---|---|
| `--kairos-motion-instant` | 0ms | `.kairos-motion-instant` |
| `--kairos-motion-fast` | 100ms | `.kairos-motion-fast` |
| `--kairos-motion-normal` | 150ms | `.kairos-motion-normal` |
| `--kairos-motion-medium` | 200ms | `.kairos-motion-medium` |
| `--kairos-motion-slow` | 300ms | `.kairos-motion-slow` |
| `--kairos-motion-overlay` | 400ms | `.kairos-motion-overlay` |
| `--kairos-easing-linear` | linear | — |
| `--kairos-easing-ease` | ease | — |
| `--kairos-easing-ease-out` | ease-out | — |
| `--kairos-easing-bounce` | cubic-bezier(0.34, 1.56, 0.64, 1) | — |

### 1.9 Animations (`src/foundation/animations.css`)

| Keyframe |
|---|
| `kairos-pulse` |
| `kairos-shimmer` |
| `kairos-spin` |

### 1.10 Sizes (`src/foundation/sizes.css`)

| Token Group | Tokens |
|---|---|
| Icon Sizes | `--kairos-size-icon-xs` (13px), `--kairos-size-icon-sm` (16px), `--kairos-size-icon-md` (20px), `--kairos-size-icon-lg` (24px) |
| Control Heights | `--kairos-size-control-xs` (14px), `--kairos-size-control-sm` (26px), `--kairos-size-control-md` (32px), `--kairos-size-control-lg` (36px), `--kairos-size-control-xl` (44px) |
| Indicator Dots | `--kairos-size-dot-sm` (6px), `--kairos-size-dot-md` (8px), `--kairos-size-dot-lg` (12px) |
| Chrome Bars | `--kairos-size-status-bar` (26px), `--kairos-size-menu-bar` (36px), `--kairos-size-top-bar` (44px) |
| Component Aliases | `--kairos-size-button-sm/md/lg`, `--kairos-size-input`, `--kairos-size-tab`, `--kairos-size-toggle` |
| Broadcast Aliases | `--kairos-size-avatar`, `--kairos-size-tally`, `--kairos-size-scrollbar` |
| Missing (patched) | `--kairos-size-dot`, `--kairos-size-indicator` |

### 1.11 Breakpoints (`src/foundation/breakpoints.css`)

| Token | Value |
|---|---|
| `--kairos-bp-xs` | 360px |
| `--kairos-bp-sm` | 480px |
| `--kairos-bp-md` | 768px |
| `--kairos-bp-lg` | 1024px |
| `--kairos-bp-xl` | 1280px |

### 1.12 Focus (`src/foundation/focus.css`)

| Token |
|---|
| `--kairos-focus-ring-color` |
| `--kairos-focus-ring-width` |
| `--kairos-focus-ring-offset` |

Classes: `.kairos-focus-visible`, `.kairos-focus-within`, `.kairos-sr-only`, `.kairos-skip-link`

### 1.13 Cursors (`src/foundation/cursors.css`)

`.kairos-cursor-pointer`, `.kairos-cursor-grab`, `.kairos-cursor-grabbing`, `.kairos-cursor-col-resize`, `.kairos-cursor-row-resize`, `.kairos-cursor-text`, `.kairos-cursor-not-allowed`, `.kairos-cursor-wait`, `.kairos-cursor-crosshair`, `.kairos-cursor-zoom-in`, `.kairos-cursor-zoom-out`

### 1.14 Reset (`src/foundation/reset.css`)

Global reset layer. Single file.

### 1.15 Themes (`src/themes/themes.css`)

Dark theme is default (defined in `:root`). File reserved for future themes (high-contrast, broadcast-specific).

### 1.16 Geometry (`src/foundation/geometry.css`)

| Token | Value |
|---|---|
| `--kairos-radius-none` | 0 |
| `--kairos-border-none` | 0 |
| `--kairos-border-base` | 1px |
| `--kairos-border-thick` | 2px |
| `--kairos-focus-base` | 2px |

---

## 2. CONTRACTS (`src/components/contracts.css`)

### 2.1 Intents

| Class | Semantic |
|---|---|
| `.kairos-intent-neutral` | Default neutral |
| `.kairos-intent-pvw` | Preview / Success |
| `.kairos-intent-pgm` | Program / Error |
| `.kairos-intent-warning` | Warning / Caution |
| `.kairos-intent-info` | Info / Link |

### 2.2 Variants

| Class | Style |
|---|---|
| `.kairos-variant-solid` | Filled background |
| `.kairos-variant-subtle` | Tinted background |
| `.kairos-variant-outline` | Border only |
| `.kairos-variant-ghost` | No background, no border |

### 2.3 Sizes

| Class |
|---|
| `.kairos-size-sm` |
| `.kairos-size-md` |
| `.kairos-size-lg` |

### 2.4 States

| Selector | Behavior |
|---|---|
| `[data-state="disabled"]` / `[disabled]` | Opacity 0.4, pointer-events none |
| `[data-state="loading"]` | Pointer-events none, cursor wait |
| `[data-state="active"]` / `[data-state="selected"]` / `[aria-selected="true"]` | Selected background |
| `[data-state="open"]` | Open state flag |
| `[data-state="pressed"]` / `[aria-pressed="true"]` | Pressed background |

### 2.5 Recipes

| Class |
|---|
| `.kairos-recipe-action-pvw` |
| `.kairos-recipe-action-pgm` |
| `.kairos-recipe-action-neutral` |

---

## 3. LAYOUT PRIMITIVES

| Primitive | Source | Class |
|---|---|---|
| Box | `src/components/layout.css` | `.kairos-box` |
| Stack | `src/components/layout.css` | `.kairos-stack`, `.kairos-stack-gap-sm/md/lg` |
| Cluster | `src/components/layout.css` | `.kairos-cluster`, `.kairos-cluster-gap-sm/md/lg` |
| Spacer | `src/components/layout.css` | `.kairos-spacer` |
| Divider | `src/components/primitives.css` | `.kairos-divider`, `.kairos-divider.vertical` |
| App Shell | `src/utilities/layout.css` | `.kairos-app-shell` |
| Main Body | `src/utilities/layout.css` | `.kairos-main-body` |
| Panel Left | `src/utilities/layout.css` | `.kairos-panel-left` |
| Panel Main | `src/utilities/layout.css` | `.kairos-panel-main` |
| Panel Right | `src/utilities/layout.css` | `.kairos-panel-right` |
| Resize Handle | `src/utilities/layout.css` | `.kairos-resize-handle` |
| Monitoring Grid | `src/utilities/layout.css` | `.kairos-mon-grid` |
| Split Grid | `src/components/split-grid.css` | `.kairos-split-grid` |

---

## 4. CONTENT PRIMITIVES

| Primitive | Source | Class |
|---|---|---|
| Section Label | `src/components/components-core.css` | `.kairos-section-label` |
| Panel Header | `src/components/components-core.css` | `.kairos-panel-header` |
| Tally LED | `src/components/components-core.css` | `.kairos-tally-led`, `.tally-led.pgm/pvw/aux` |
| Tooltip | `src/components/components-core.css` | `.kairos-tooltip` |
| Icon | `src/components/icons.css` | `.kairos-icon`, size/color variants |
| Badge | `src/components/badge.css` | `.kairos-badge` |
| Chip | `src/components/primitives.css` | `.kairos-chip` |
| Kbd | `src/components/kbd.css` | `.kairos-kbd` |
| Code | `src/components/code.css` | `.kairos-code` |
| Link | `src/components/link.css` | `.kairos-link` |
| Heading | `src/components/heading.css` | `.kairos-heading` |
| Paragraph | `src/components/paragraph.css` | `.kairos-paragraph` |
| Image | `src/components/image.css` | `.kairos-image` |

---

## 5. INPUT PRIMITIVES

| Primitive | Source | Class |
|---|---|---|
| Button | `src/components/buttons.css` | `.kairos-btn`, `.kairos-btn-primary`, `.kairos-btn-secondary`, `.kairos-btn-ghost`, `.kairos-btn-icon` |
| Key Button | `src/components/buttons.css` | `.kairos-key-btn` |
| Source Button | `src/components/buttons.css` | `.kairos-src-btn` |
| Transition Button | `src/components/buttons.css` | `.kairos-trans-btn` |
| Transport Button | `src/components/buttons.css` | `.kairos-tp-btn` |
| Buffer Button | `src/components/buttons.css` | `.kairos-buf-btn` |
| Salvo Button | `src/components/buttons.css` | `.kairos-salvo-btn` |
| Angle Button | `src/components/buttons.css` | `.kairos-angle-btn` |
| Macro Button | `src/components/buttons.css` | `.kairos-macro-btn` |
| Button Group | `src/components/buttons.css` | `.kairos-btn-group` |
| Icon Button | `src/components/buttons.css` | `.kairos-icon-btn` |
| Settings Select | `src/components/buttons.css` | `.kairos-set-select` |
| Input | `src/components/forms.css` | `.kairos-input` |
| Textarea | `src/components/forms.css` | `.kairos-textarea` |
| Select | `src/components/forms.css` | `.kairos-select` |
| Checkbox | `src/components/forms.css` | `.kairos-checkbox` |
| Radio | `src/components/forms.css` | `.kairos-radio` |
| Switch | `src/components/forms.css` | `.kairos-switch` |
| Slider | `src/components/slider.css` | `.kairos-slider` |
| Stepper | `src/components/stepper.css` | `.kairos-stepper` |
| Tag Input | `src/components/tag-input.css` | `.kairos-tag-input` |

---

## 6. FEEDBACK PRIMITIVES

| Primitive | Source | Class |
|---|---|---|
| Spinner | `src/components/loading.css` | `.kairos-spinner`, `.kairos-spinner-lg`, `.kairos-spinner-sm` |
| Skeleton | `src/components/loading.css` | `.kairos-skeleton`, `.kairos-skeleton-text`, `.kairos-skeleton-title`, `.kairos-skeleton-avatar`, `.kairos-skeleton-btn` |
| Progress | `src/components/primitives.css` | `.kairos-progress`, `.kairos-progress-bar` |
| Progress (extended) | `src/components/progress.css` | `.kairos-progress` variants |
| Badge | `src/components/badge.css` | `.kairos-badge` |
| Toast (stack) | `src/components/overlays.css` | `.kairos-toast`, `.kairos-toast-stack` |
| Toast (fixed) | `src/components/feedback.css` | `.kairos-toast-fixed` |
| Alert | `src/components/overlays.css` | `.kairos-alert` |
| Flash | `src/components/feedback.css` | `.kairos-flash` |
| Log Entry | `src/components/data-display.css` | `.kairos-log-entry` |
| Log Filter Bar | `src/components/feedback.css` | `.kairos-log-filter-bar` |
| Status Dot | `src/components/status-dot.css` | `.kairos-status-dot` |
| Indicator | `src/components/indicator.css` | `.kairos-indicator` |
| Empty State | `src/components/empty-state.css` | `.kairos-empty-state` |
| Tag | `src/components/tag.css` | `.kairos-tag` |

---

## 7. OVERLAY PRIMITIVES

| Primitive | Source | Class |
|---|---|---|
| Overlay | `src/components/overlay.css` | `.kairos-overlay`, `.kairos-overlay-host` |
| Backdrop | `src/components/overlay.css` | `.kairos-backdrop` |
| Popover | `src/components/popover.css` | `.kairos-popover`, `.kairos-popover-host` |
| Popover Positioning | `src/components/popover.css` | `.kairos-popover-top/bottom/left/right` |
| Tooltip (hover) | `src/components/overlays.css` | `.kairos-tip`, `.kairos-tip-host` |
| Surface | `src/components/surface.css` | `.kairos-surface` |

---

## 8. COMPOSITE COMPONENTS

| Component | Source | Primary Class |
|---|---|---|
| Modal | `src/components/modal/modal.css` + `modal.ts` | `<kairos-modal>` (Web Component) |
| Dropdown | `src/components/dropdown/dropdown.css` + `dropdown.ts` | `<kairos-dropdown>` (Web Component) |
| Tabs | `src/components/tabs/` | `<kairos-tabs>` (Web Component) |
| Split Panel | `src/components/split-panel/` | `<kairos-split-panel>` (Web Component) |
| Accordion | `src/components/accordion.css` | `.kairos-accordion` |
| Sidebar | `src/components/sidebar.css` | `.kairos-sidebar` |
| Command Palette | `src/components/command.css` | `.kairos-command` |
| Carousel | `src/components/carousel.css` | `.kairos-carousel` |
| Breadcrumb | `src/components/breadcrumb.css` | `.kairos-breadcrumb` |
| Pagination | `src/components/pagination.css` | `.kairos-pagination` |
| Tree | `src/components/tree.css` | `.kairos-tree` |
| Table | `src/components/table.css` | `.kairos-table` |
| Navigation | `src/components/navigation.css` | `.kairos-nav`, `.kairos-side-tab`, `.kairos-top-bar`, `.kairos-status-bar`, `.kairos-menu-bar` |
| Tabs (light DOM) | `src/components/tabs.css` | `.kairos-tab-bar`, `.kairos-tab-item` |
| Divider (extended) | `src/components/divider.css` | `.kairos-divider` variants |
| Keyer | `src/components/composites.css` | `.kairos-keyer` |
| Crosspoint Matrix | `src/components/composites.css` | `.kairos-crosspoint` |
| AUX Bus | `src/components/composites.css` | `.kairos-aux` |
| Countdown | `src/components/composites.css` | `.kairos-countdown` |
| Timecode | `src/components/composites.css` | `.kairos-tc` |
| Device Card | `src/components/composites.css` | `.kairos-device-card` |
| Scene Tree | `src/components/composites.css` | `.kairos-scene-tree` |
| Filter Stack | `src/components/composites.css` | `.kairos-filter-stack` |
| Event History | `src/components/composites.css` | `.kairos-event-history` |
| Slider with Input | `src/components/composites.css` | `.kairos-slider-input` |
| Source Item | `src/components/data-display.css` | `.kairos-source-item`, `.kairos-source-list` |
| Highlight Item | `src/components/data-display.css` | `.kairos-hl-item`, `.kairos-hl-list` |
| I/O Label | `src/components/data-display.css` | `.kairos-io-label`, `.kairos-io-list` |
| Destination Label | `src/components/data-display.css` | `.kairos-dest-label`, `.kairos-dest-row` |
| Flow Node | `src/components/data-display.css` | `.kairos-flow-node`, `.kairos-flow-row` |
| Modal Form | `src/components/overlays.css` | `.kairos-form-row`, `.kairos-form-label`, `.kairos-form-input`, `.kairos-choice-group` |
| Popover Content | `src/components/overlays.css` | `.kairos-popover-head/title/body/foot/close/menu-item/divider` |
| Avatar | `src/components/avatar.css` | `.kairos-avatar` |

---

## 9. DOMAIN COMPONENTS (Broadcast)

| Component | Source |
|---|---|
| Bus | `src/domain/bus.css` |
| Source Tag | `src/domain/source-tag.css` |
| Property Row | `src/domain/property.css` |
| Multiview | `src/domain/multiview.css` |
| Production | `src/domain/production.css` |
| Shell | `src/domain/shell.css` |
| Rundown | `src/domain/rundown.css` |
| Segment | `src/domain/segment.css` |
| Ticker / Marquee | `src/domain/ticker.css` |
| UI Patterns | `src/domain/ui-patterns.css` |
| Buttons | `src/domain/buttons.css` |
| Composites | `src/domain/composites.css` |
| Tally | `src/domain/tally.css` |

---

## 10. PATTERNS (Reference Pages)

| Pattern | File |
|---|---|
| Accordion | `patterns/accordion.html` |
| App Shell | `patterns/app-shell.html` |
| AUX Bus | `patterns/aux-bus.html` |
| Border Width | `patterns/border-width.html` |
| Breakpoints | `patterns/breakpoints.html` |
| Bus | `patterns/bus.html` |
| Carousel | `patterns/carousel.html` |
| Colors | `patterns/colors.html` |
| Colour Swatch | `patterns/colour-swatch.html` |
| Components | `patterns/components.html` |
| Core Components | `patterns/core-components.html` |
| Countdown | `patterns/countdown.html` |
| Crosspoint | `patterns/crosspoint.html` |
| Cursors | `patterns/cursors.html` |
| Device Card | `patterns/device-card.html` |
| Divider | `patterns/divider.html` |
| Elevation | `patterns/elevation.html` |
| Event History | `patterns/event-history.html` |
| Filter Stack | `patterns/filter-stack.html` |
| Focus | `patterns/focus.html` |
| Icon Library | `patterns/icon-library.html` |
| Icons | `patterns/icons.html` |
| Index | `patterns/index.html` |
| Keyer | `patterns/keyer.html` |
| Layout | `patterns/layout.html` |
| Loading | `patterns/loading.html` |
| Modals | `patterns/modals.html` |
| Motion | `patterns/motion.html` |
| Multiview | `patterns/multiview.html` |
| Popover | `patterns/popover.html` |
| Property | `patterns/property.html` |
| Radius | `patterns/radius.html` |
| Replay Panel | `patterns/replay-panel.html` |
| Reset | `patterns/reset.html` |
| Routing Matrix | `patterns/routing-matrix.html` |
| Rundown | `patterns/rundown.html` |
| Scene Tree | `patterns/scene-tree.html` |
| Segment | `patterns/segment.html` |
| Settings | `patterns/settings.html` |
| Shadows | `patterns/shadows.html` |
| Sizes | `patterns/sizes.html` |
| Slider Input | `patterns/slider-input.html` |
| Source Tag | `patterns/source-tag.html` |
| Spacing | `patterns/spacing.html` |
| Split Grid | `patterns/split-grid.html` |
| Split Panel | `patterns/split-panel.html` |
| States | `patterns/states.html` |
| Stepper | `patterns/stepper.html` |
| System Monitoring | `patterns/system-monitoring.html` |
| Tag Input | `patterns/tag-input.html` |
| Themes | `patterns/themes.html` |
| Ticker | `patterns/ticker.html` |
| Timecode | `patterns/timecode.html` |
| Toasts | `patterns/toasts.html` |
| Tooltips | `patterns/tooltips.html` |
| Typography | `patterns/typography.html` |
| UI Patterns | `patterns/ui-patterns.html` |
| Utilities | `patterns/utilities.html` |
| Validation | `patterns/validation.html` |
| VU Meter | `patterns/vu-meter.html` |

**Total: 60 pattern pages**

---

## 11. JAVASCRIPT MODULES

### 11.1 Core (`src/core/`)

| Module | File | Exports |
|---|---|---|
| DOM | `core/dom.ts` | `$`, `$$`, `closest`, `resolveTarget` |
| Events | `core/events.ts` | `emit`, `on`, `off` |
| State | `core/state.ts` | `setState`, `getState`, `toggleState` |
| Focus | `core/focus.ts` | `trapFocus`, `releaseFocus`, `focusFirst` |
| Keyboard | `core/keyboard.ts` | `onKey`, `rove` |
| Animation | `core/animation.ts` | `animate`, `fadeIn`, `fadeOut` |
| Observer | `core/observer.ts` | `observe`, `disconnect` |
| Utils | `core/utils.ts` | `uid`, `debounce`, `throttle` |

### 11.2 Modules (`src/modules/`)

| Module | File | Class |
|---|---|---|
| Modal | `modules/modal.ts` | `Modal` |
| Dropdown | `modules/dropdown.ts` | `Dropdown` |
| Accordion | `modules/accordion.ts` | `Accordion` |
| Tabs | `modules/tabs.ts` | `Tabs` |
| Toast | `modules/toast.ts` | `Toast` |
| Sidebar | `modules/sidebar.ts` | `Sidebar` |
| Command | `modules/command.ts` | `Command` |

### 11.3 Web Components

| Component | File |
|---|---|
| `<kairos-modal>` | `src/components/modal/modal.ts` |
| `<kairos-dropdown>` | `src/components/dropdown/dropdown.ts` |
| `<kairos-tabs>` | `src/components/tabs/tabs.ts` |
| `<kairos-split-panel>` | `src/components/split-panel/split-panel.ts` |

---

## 12. UTILITIES

### 12.1 Display

`.kairos-flex`, `.kairos-inline-flex`, `.kairos-grid`, `.kairos-block`, `.kairos-inline`, `.kairos-inline-block`, `.kairos-hidden`

### 12.2 Flex Direction

`.kairos-row`, `.kairos-col`, `.kairos-row-reverse`, `.kairos-col-reverse`

### 12.3 Flex Wrap

`.kairos-wrap`, `.kairos-nowrap`, `.kairos-wrap-reverse`

### 12.4 Align Items

`.kairos-items-center`, `.kairos-items-start`, `.kairos-items-end`, `.kairos-items-stretch`, `.kairos-items-baseline`

### 12.5 Justify Content

`.kairos-justify-center`, `.kairos-justify-start`, `.kairos-justify-end`, `.kairos-justify-between`, `.kairos-justify-around`, `.kairos-justify-evenly`

### 12.6 Flex Grow/Shrink

`.kairos-flex-1`, `.kairos-grow`, `.kairos-shrink-0`, `.kairos-shrink`

### 12.7 Gap

`.kairos-gap-extra-tight`, `.kairos-gap-compact`, `.kairos-gap-standard`, `.kairos-gap-loose`, `.kairos-gap-extra-loose`, `.kairos-gap-0`

### 12.8 Overflow

`.kairos-overflow-hidden`, `.kairos-overflow-auto`, `.kairos-overflow-scroll`, `.kairos-overflow-visible`, `.kairos-overflow-x-auto`, `.kairos-overflow-y-auto`, `.kairos-overflow-x-hidden`, `.kairos-overflow-y-hidden`

### 12.9 Position

`.kairos-relative`, `.kairos-absolute`, `.kairos-fixed`, `.kairos-sticky`

### 12.10 Width/Height

`.kairos-w-full`, `.kairos-w-auto`, `.kairos-h-full`, `.kairos-h-auto`, `.kairos-w-screen`, `.kairos-h-screen`, `.kairos-min-w-0`, `.kairos-min-h-0`, `.kairos-w-min`, `.kairos-min-h-screen`

### 12.11 Inset

`.kairos-inset-0`

### 12.12 Object Fit

`.kairos-object-cover`, `.kairos-object-contain`, `.kairos-object-fill`

### 12.13 Text Alignment

`.kairos-text-left`, `.kairos-text-center`, `.kairos-text-right`

### 12.14 Opacity

`.kairos-opacity-0/25/50/75/100`

### 12.15 Pointer Events

`.kairos-pointer-events-none`, `.kairos-pointer-events-auto`

### 12.16 User Select

`.kairos-select-none`, `.kairos-select-text`, `.kairos-select-all`

### 12.17 Visibility

`.kairos-visible`, `.kairos-invisible`

### 12.18 Padding (5 levels × 6 directions + all)

`p`, `px`, `py`, `pt`, `pr`, `pb`, `pl` × `extra-tight`, `compact`, `standard`, `loose`, `extra-loose`

### 12.19 Margin (5 levels × 6 directions + auto)

`m`, `mx`, `my`, `mt`, `mr`, `mb`, `ml` × `extra-tight`, `compact`, `standard`, `loose`, `extra-loose` + `auto`

### 12.20 Background Color

`.kairos-bg-deep`, `.kairos-bg-deep-alt`, `.kairos-bg-input`, `.kairos-bg-surface`, `.kairos-bg-surface-alt`, `.kairos-bg-hover`, `.kairos-bg-selected`, `.kairos-bg-transparent`

### 12.21 Text Color

`.kairos-text-color`, `.kairos-text-color-secondary`

### 12.22 Font

`.kairos-font-sans`, `.kairos-font-mono`

### 12.23 Font Size

`.kairos-text-xs/sm/base/lg/xl/2xl/3xl/4xl`

### 12.24 Letter Spacing

`.kairos-tracking-tight/normal/wide/wider/widest/extra-wide/ultra/max/super-wide`

### 12.25 Grid

`.kairos-grid-cols-2/3/4/5/6/8`, `.kairos-col-span-2/3`

### 12.26 Border

`.kairos-border-thin`, `.kairos-border-none`, `.kairos-border-t/b/r/l`, `.kairos-border-t-muted`, `.kairos-border-b-muted`, `.kairos-border-color-muted`, `.kairos-border-color-active`

### 12.27 Transition

`.kairos-transition-colors`, `.kairos-transition-opacity`

### 12.28 Appearance

`.kairos-appearance-none`

### 12.29 Whitespace

`.kairos-whitespace-nowrap`, `.kairos-whitespace-pre`

### 12.30 Misc

`.kairos-outline-none`, `.kairos-sr-only`

### 12.31 Responsive

`.kairos-hide-xs/sm/md`, `.kairos-show-lg/xl`, `.kairos-show-xs/sm/md`

### 12.32 Container Queries

`.kairos-container`, `.kairos-container-normal`, `.kairos-container-size`, `.kairos-container-panel`, `.kairos-container-sidebar`, `.kairos-container-main`, `.kairos-c-hide-xs/sm/md`, `.kairos-c-show-lg/xl`, `.kairos-c-show-xs/sm/md`

---

## 13. HOOKS / EVENTS

| Event | Emitter |
|---|---|
| `kairos:modal:before-open` | Modal |
| `kairos:modal:opened` | Modal |
| `kairos:modal:before-close` | Modal |
| `kairos:modal:closed` | Modal |
| `kairos:dropdown:before-open` | Dropdown |
| `kairos:dropdown:opened` | Dropdown |
| `kairos:dropdown:before-close` | Dropdown |
| `kairos:dropdown:closed` | Dropdown |
| `kairos:dropdown:select` | Dropdown |
| `kairos:accordion:before-open` | Accordion |
| `kairos:accordion:before-close` | Accordion |
| `kairos:accordion:opened` | Accordion |
| `kairos:accordion:closed` | Accordion |
| `kairos:tab:changed` | Tabs |
| `kairos:toast:show` | Toast |
| `kairos:toast:hide` | Toast |
| `kairos:sidebar:before-open` | Sidebar |
| `kairos:sidebar:opened` | Sidebar |
| `kairos:sidebar:before-close` | Sidebar |
| `kairos:sidebar:closed` | Sidebar |
| `kairos:command:execute` | Command |

**Total: 21 events**

---

## 14. DATA ATTRIBUTES

| Attribute | Usage |
|---|---|
| `data-kairos-toggle="modal"` | Open modal |
| `data-kairos-toggle="dropdown"` | Open dropdown |
| `data-kairos-toggle="accordion"` | Toggle accordion |
| `data-kairos-toggle="tab"` | Switch tab |
| `data-kairos-toggle="toast"` | Show toast |
| `data-kairos-toggle="sidebar"` | Open sidebar |
| `data-kairos-toggle="command"` | Open command palette |
| `data-kairos-target` | Selector for target element |
| `data-kairos-dismiss` | Close parent overlay |
| `data-kairos-duration` | Toast auto-dismiss duration |
| `data-kairos-allow-multiple` | Accordion multi-open |
| `data-kairos-menu-item` | Dropdown item marker |
| `data-state` | Universal state attribute (`open`, `closed`, `disabled`, `loading`, `active`, `selected`, `pressed`) |

---

## 15. CSS VARIABLES (Contract Groups)

### Component Contracts (`src/components/components.css`)

| # | Group | Count |
|---|---|---|
| 1 | Buttons | 32 tokens |
| 2 | Inputs / Forms | 12 tokens |
| 3 | Menu / Dropdown | 6 tokens |
| 4 | Tabs | 4 tokens |
| 5 | Cards / Panels | 6 tokens |
| 6 | Modal / Dialog | 3 tokens |
| 7 | Tooltips / Popovers | 10 tokens |
| 8 | Toast / Alert | 7 tokens |
| 9 | Badges / Tags | 3 tokens |
| 10 | Tables | 4 tokens |
| 11 | Bars | 5 tokens |
| 12 | Sidebar / Navigation | 4 tokens |
| 13 | Lists | 4 tokens |
| 14 | Avatar | 2 tokens |
| 15 | Switch / Checkbox / Radio | 2 tokens |
| 16 | Breadcrumb | 2 tokens |
| 17 | Pagination | 2 tokens |
| 18 | Divider | 1 token |
| 19 | Section Label | 2 tokens |
| 20 | Timeline | 3 tokens |
| 21 | Fader | 2 tokens |
| 22 | Audio Meter | 3 tokens |
| 23 | Macro Button | 4 tokens |
| 24 | Router Card | 3 tokens |
| 25 | PGM/PVW Buttons | 3 tokens |
| 26 | Source Button | 4 tokens |
| 27 | Tally | 2 tokens |
| 28 | Channel Label | 2 tokens |
| 29 | Choice Group | 1 token |
| 30 | Scrollbar | 1 token |
| 31 | Kbd | 2 tokens |
| 32 | Tooltip Group | 1 token |
| 33 | Empty State | 2 tokens |
| 34 | Bus Bar | 6 tokens |
| 35 | Source Tag | 1 token |
| 36 | Property Row | 3 tokens |
| 37 | Multiviewer | 3 tokens |
| 38 | Segmented Control | 2 tokens |
| 39 | Stepper | 2 tokens |
| 40 | Rundown | 4 tokens |
| 41 | Carousel | 3 tokens |
| 42 | Ticker | 2 tokens |
| 43 | Accordion | 2 tokens |
| — | Auto-generated | ~100 tokens |
| — | Reference Patterns | ~20 tokens |

---

## 16. PUBLIC API

### 16.1 CSS Public API

* All `--kairos-*` variables in `:root`
* All `.kairos-*` classes
* All `data-state` selectors
* All `data-kairos-*` attributes

### 16.2 JavaScript Public API (`window.Kairos`)

| Namespace | Members |
|---|---|
| `Kairos.dom` | `$`, `$$`, `closest`, `resolveTarget` |
| `Kairos.events` | `emit`, `on`, `off` |
| `Kairos.state` | `setState`, `getState`, `toggleState` |
| `Kairos.focus` | `trapFocus`, `releaseFocus`, `focusFirst` |
| `Kairos.keyboard` | `onKey`, `rove` |
| `Kairos.animation` | `animate`, `fadeIn`, `fadeOut` |
| `Kairos.observer` | `observe`, `disconnect` |
| `Kairos.utils` | `uid`, `debounce`, `throttle` |
| `Kairos.Modal` | Module class |
| `Kairos.Dropdown` | Module class |
| `Kairos.Accordion` | Module class |
| `Kairos.Tabs` | Module class |
| `Kairos.Toast` | Module class |
| `Kairos.Sidebar` | Module class |
| `Kairos.Command` | Module class |
| `Kairos.loadFonts` | Function |
| `Kairos.init` | Function |

### 16.3 Web Components

| Tag |
|---|
| `<kairos-modal>` |
| `<kairos-dropdown>` |
| `<kairos-tabs>` |
| `<kairos-split-panel>` |

---

## 17. MISSING ITEMS

| Item | Layer | Reason |
|---|---|---|
| Surface | Overlay Primitive | No generic `kairos-surface` for elevated content containers |
| Portal | Overlay Primitive | No DOM teleportation primitive |
| Anchor | Overlay Primitive | No anchor positioning primitive |
| Indicator | Feedback Primitive | No generic `kairos-indicator` for inline status signals |
| StatusDot | Feedback Primitive | `kairos-tally-led` exists but no generic `kairos-status-dot` |
| Separator | Layout Primitive | `kairos-divider` exists but no semantic `<hr>` Separator |
| Kbd | Content Primitive | Contract exists (`--kairos-kbd-*`) but no CSS class |
| Tag (standalone) | Content Primitive | `kairos-tag-input` has tags, but no standalone `kairos-tag` |
| Empty State | Feedback Primitive | Contract exists (`--kairos-empty-state-*`) but no CSS class |
| Context Menu | Composite | No dedicated context menu component |
| Combobox | Composite | No combobox / autocomplete component |
| Dialog (non-modal) | Composite | No non-modal dialog variant |
| High-contrast Theme | Themes | `themes.css` is empty placeholder |
| Light Theme | Themes | Not implemented |

---

## 18. DUPLICATES

| Concept | Locations | Issue |
|---|---|---|
| Spinner | `src/components/primitives.css` + `src/components/loading.css` | Defined in both files with different sizes/borders |
| Popover content classes | `src/components/overlays.css` (`.kairos-popover-head/body/foot/etc`) + `src/components/popover.css` (positioning only) | Content structure remains in overlays.css while positioning moved to popover.css |
| Source button contracts | `components.css` lines 39-41 + lines 336-339 | `--kairos-src-btn-*` defined twice with different values |
| Tab styles | `src/components/tabs.css` (light DOM) + `src/components/tabs/` (Web Component) | Two implementations for the same component |
| Modal contracts | `src/modules/modal.ts` (module) + `src/components/modal/modal.ts` (Web Component) | Two implementations for the same component |
| Dropdown contracts | `src/modules/dropdown.ts` (module) + `src/components/dropdown/dropdown.ts` (Web Component) | Two implementations for the same component |
| Badge contracts | `components.css` lines 182-184 + lines 470-471 | `--kairos-badge-padding-*` defined twice |
| Rundown contracts | `components.css` lines 418-424 + lines 685-688 | `--kairos-rundown-item-*` defined twice |
| Segment contracts | `components.css` lines 426-429 + lines 669-670 | `--kairos-segment-btn-*` defined twice |

---

## 19. DEPRECATED

| Item | Reason |
|---|---|
| `badge.ts` | **DELETED** — Primitive must not contain JavaScript (ADR violation) |
| `.kairos-popover-host.open` selector | Replaced by `[data-state="open"]` per ADR-0003 |
| `.kairos-toast.show` selector | Legacy class, replaced by `[data-state="open"]` |
| `.kairos-toast-fixed.show` selector | Legacy class, replaced by `[data-state="open"]` |
| `.kairos-scene-toggle.open` | Should use `data-state="open"` |
| `.kairos-scene-children.open` | Should use `data-state="open"` |
| `.kairos-filter-btn.active` | Should use `data-state="active"` |
| `.kairos-crosspoint-cell.active` | Should use `data-state="active"` |
| `.kairos-aux-btn.active` | Should use `data-state="active"` |

---

## 20. SUMMARY

| Category | Count |
|---|---|
| Foundation Modules | 15 |
| Contract Types | 5 (Intent, Variant, Size, State, Recipe) |
| Layout Primitives | 7 |
| Content Primitives | 8 |
| Input Primitives | 20 |
| Feedback Primitives | 11 |
| Overlay Primitives | 5 |
| Composite Components | 30 |
| Domain Components | 10 |
| Pattern Pages | 60 |
| JS Core Modules | 8 |
| JS Behavior Modules | 7 |
| Web Components | 4 |
| Utility Groups | 32 |
| Public Events | 21 |
| Data Attributes | 13 |
| CSS Variable Groups | 43+ |
| Missing Items | 14 |
| Duplicates | 9 |
| Deprecated | 9 |
| **Total Inventory Items** | **~321** |
