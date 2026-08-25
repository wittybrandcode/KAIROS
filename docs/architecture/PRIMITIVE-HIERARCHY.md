# KAIROS PRIMITIVE HIERARCHY

> The definitive architectural taxonomy of every element in Kairos.
>
> Generated: 2026-06-18
>
> Purpose: Answer one question — **Where does every element belong?**

---

## Reading Guide

```
✅  EXISTS     — Implemented and in the correct layer
⚠️  MISPLACED  — Implemented but in the wrong layer
❌  MISSING    — Not implemented, should exist
🔁  DUPLICATE  — Multiple implementations exist
🗑️  DEPRECATED — Should be removed
```

---

## LAYER 0 — FOUNDATION

> Tokens only. No HTML. No classes. Pure design decisions.

```
Foundation
 ├── Colors                     ✅  src/foundation/colors.css
 │     ├── Cool Steel Scale          (22 stops)
 │     ├── Background Hierarchy      (7 tokens)
 │     ├── Border Hierarchy          (4 tokens)
 │     ├── Text Hierarchy            (6 tokens)
 │     ├── Status Colors             (5 tokens)
 │     └── Opacity Variants          (14 tokens)
 │
 ├── Typography                 ✅  src/foundation/typography.css
 │     ├── Font Size Scale           (7 stops: sm → 4xl)
 │     ├── Font Weight               (5 stops: light → bold)
 │     ├── Line Height               (7 stops)
 │     └── Font Family               (sans + mono)
 │
 ├── Spacing                    ✅  src/foundation/spacing.css
 │     └── 5-Level Semantic          (2 → 6 → 12 → 24 → 48)
 │
 ├── Letter Spacing             ✅  src/foundation/spacing.css
 │     └── 9-Level Scale             (tight → super-wide)
 │
 ├── Radius                     ✅  src/foundation/spacing.css
 │     └── ALL = 0                   (enforced, no exceptions)
 │
 ├── Shadows                    ✅  src/foundation/shadows.css
 │     └── 7-Level Depth             (flat → tooltip)
 │
 ├── Elevation                  ✅  src/foundation/elevation.css
 │     └── 9-Level Z-Index           (base → max)
 │
 ├── Motion                     ✅  src/foundation/motion.css
 │     ├── Duration                  (instant → slow, max 300ms)
 │     └── Easing                    (linear, ease, ease-out, bounce)
 │
 ├── Animations                 ✅  src/foundation/animations.css
 │     ├── kairos-pulse
 │     ├── kairos-shimmer
 │     └── kairos-spin
 │
 ├── Sizes                      ✅  src/foundation/sizes.css
 │     ├── Icon Sizes                (xs → lg)
 │     ├── Control Heights           (xs → xl)
 │     ├── Indicator Dots            (sm → lg)
 │     └── Chrome Bars               (status, menu, top)
 │
 ├── Breakpoints                ✅  src/foundation/breakpoints.css
 │     └── 5-Level                   (xs → xl)
 │
 ├── Focus                      ✅  src/foundation/focus.css
 │     ├── Ring Tokens               (color, width, offset)
 │     └── Accessibility             (sr-only, skip-link)
 │
 ├── Cursors                    ✅  src/foundation/cursors.css
 │     └── 11 Cursor Classes
 │
 └── Reset                      ✅  src/foundation/reset.css
```

---

## LAYER 1 — CONTRACTS

> Modifiers. No HTML structure. Applied via class composition.

```
Contracts
 ├── Intent                     ✅  src/components/contracts.css
 │     ├── .kairos-intent-neutral
 │     ├── .kairos-intent-pvw
 │     ├── .kairos-intent-pgm
 │     ├── .kairos-intent-warning
 │     └── .kairos-intent-info
 │
 ├── Variant                    ✅  src/components/contracts.css
 │     ├── .kairos-variant-solid
 │     ├── .kairos-variant-subtle
 │     ├── .kairos-variant-outline
 │     └── .kairos-variant-ghost
 │
 ├── Size                       ✅  src/components/contracts.css
 │     ├── .kairos-size-sm
 │     ├── .kairos-size-md
 │     └── .kairos-size-lg
 │
 ├── State                      ✅  src/components/contracts.css
 │     ├── data-state="disabled"
 │     ├── data-state="loading"
 │     ├── data-state="active"
 │     ├── data-state="selected"
 │     ├── data-state="open"
 │     └── data-state="pressed"
 │
 └── Recipe                     ✅  src/components/contracts.css
       ├── .kairos-recipe-action-pvw
       ├── .kairos-recipe-action-pgm
       └── .kairos-recipe-action-neutral
```

---

## LAYER 2 — LAYOUT PRIMITIVES

> Structural containers. No visual style. No behavior.

```
Layout
 ├── Box                        ✅  src/components/layout.css
 ├── Stack                      ✅  src/components/layout.css
 ├── Cluster                    ✅  src/components/layout.css
 ├── Spacer                     ✅  src/components/layout.css
 ├── Divider                    ✅  src/components/primitives.css
 ├── Separator                  ❌  MISSING — semantic <hr> variant of Divider
 ├── App Shell                  ✅  src/utilities/layout.css
 ├── Panel                      ✅  src/utilities/layout.css
 ├── Resize Handle              ✅  src/utilities/layout.css
 └── Grid                       ✅  src/utilities/utilities.css (grid-cols-*)
```

---

## LAYER 3 — CONTENT PRIMITIVES

> Atomic visual elements. HTML + CSS only. Zero JavaScript. Single responsibility.

```
Content
 ├── Section Label              ✅  src/components/components-core.css
 ├── Panel Header               ✅  src/components/components-core.css
 ├── Icon                       ✅  src/components/icons.css
 ├── Avatar                     ⚠️  src/components/primitives.css
 │                                   ISSUE: Not a true Primitive.
 │                                   Avatar = Image + Shape + Size.
 │                                   Should be a COMPOSITE or removed.
 │
 ├── Kbd                        ❌  MISSING — Contract exists (--kairos-kbd-*),
 │                                   no CSS class .kairos-kbd
 │
 ├── Code                       ❌  MISSING — No .kairos-code inline primitive
 ├── Link                       ❌  MISSING — No .kairos-link primitive
 ├── Heading                    ❌  MISSING — No .kairos-heading primitive
 ├── Paragraph                  ❌  MISSING — No .kairos-paragraph primitive
 └── Image                      ❌  MISSING — No .kairos-image primitive
```

---

## LAYER 4 — INPUT PRIMITIVES

> Interactive controls. HTML + CSS. JavaScript only for behavior delegation.

```
Control
 ├── Button                     ✅  src/components/buttons.css
 │     ├── .kairos-btn               PRIMARY PRIMITIVE
 │     ├── .kairos-btn-primary       Variant (should use Intent+Variant)
 │     ├── .kairos-btn-secondary     Variant
 │     ├── .kairos-btn-ghost         Variant (duplicate of contract)
 │     ├── .kairos-btn-icon          ✅  IconButton
 │     ├── .kairos-icon-btn          🔁  DUPLICATE of .kairos-btn-icon
 │     ├── .kairos-btn-group         ✅  ButtonGroup
 │     │
 │     │   ── MISPLACED (Domain, not Primitive) ──
 │     │
 │     ├── .kairos-key-btn           ⚠️  → should be in src/domain/
 │     ├── .kairos-src-btn           ⚠️  → should be in src/domain/
 │     ├── .kairos-trans-btn         ⚠️  → should be in src/domain/
 │     ├── .kairos-tp-btn            ⚠️  → should be in src/domain/
 │     ├── .kairos-buf-btn           ⚠️  → should be in src/domain/
 │     ├── .kairos-salvo-btn         ⚠️  → should be in src/domain/
 │     ├── .kairos-angle-btn         ⚠️  → should be in src/domain/
 │     └── .kairos-macro-btn         ⚠️  → should be in src/domain/
 │
 ├── Input                      ✅  src/components/forms.css
 │     ├── .kairos-input             Text input
 │     ├── .kairos-textarea          Multi-line
 │     ├── .kairos-form-input        Container
 │     ├── .kairos-form-label        Label
 │     └── .kairos-form-row          Field row
 │
 ├── Selection                  ✅  src/components/forms.css
 │     ├── .kairos-select            Dropdown select
 │     ├── .kairos-checkbox          ✅
 │     ├── .kairos-radio             ✅
 │     ├── .kairos-switch            ✅
 │     ├── .kairos-choice            ✅
 │     └── .kairos-choice-group      ✅
 │
 ├── Range                      ✅  src/components/slider.css
 │     └── .kairos-slider            Slider / Range input
 │
 ├── Stepper                    ✅  src/components/stepper.css
 │     └── .kairos-stepper           Numeric stepper
 │
 └── Tag Input                  ✅  src/components/tag-input.css
       └── .kairos-tag-input         Tokenized input
```

### Correct Button Hierarchy

```
                    ┌─────────────────────────┐
                    │     PRIMITIVE LAYER      │
                    │                          │
                    │  Button (.kairos-btn)    │
                    │  IconButton              │
                    │  ButtonGroup             │
                    └──────────┬──────────────┘
                               │
              ┌────────────────┼────────────────┐
              │                │                 │
              ▼                ▼                 ▼
      ┌──────────────┐ ┌─────────────┐  ┌──────────────┐
      │   DOMAIN     │ │   DOMAIN    │  │   DOMAIN     │
      │              │ │             │  │              │
      │ SourceButton │ │ MacroButton │  │ TransButton  │
      │ KeyButton    │ │ SalvoButton │  │ TranspButton │
      │ AngleButton  │ │ BufferButton│  │ PGM/PVW      │
      └──────────────┘ └─────────────┘  └──────────────┘
```

---

## LAYER 5 — FEEDBACK PRIMITIVES

> Status communication. HTML + CSS only. Zero JavaScript.

```
Feedback
 ├── Badge                      ✅  src/components/badge.css
 │                                   Pure CSS. badge.ts deleted (ADR compliance).
 │
 ├── Chip                       ⚠️  src/components/primitives.css
 │                                   ISSUE: Chip is Composite (icon + label + close).
 │                                   Should be promoted to Composite layer.
 │
 ├── Tag                        ❌  MISSING — No standalone .kairos-tag
 │                                   (only .kairos-tag-input child tags exist)
 │
 ├── Indicator                  ❌  MISSING — No generic .kairos-indicator
 │                                   for inline status signals
 │
 ├── StatusDot                  ⚠️  src/components/components-core.css
 │                                   EXISTS as .kairos-tally-led but named as
 │                                   Domain component instead of generic Primitive.
 │                                   Should have .kairos-status-dot as generic.
 │
 ├── Spinner                    🔁  DUPLICATE
 │                                   src/components/primitives.css
 │                                   src/components/loading.css
 │                                   Two definitions with different dimensions.
 │
 ├── Progress                   ✅  src/components/primitives.css + progress.css
 │     ├── .kairos-progress
 │     └── .kairos-progress-bar
 │
 ├── Skeleton                   ✅  src/components/loading.css
 │     ├── .kairos-skeleton
 │     ├── .kairos-skeleton-text
 │     ├── .kairos-skeleton-title
 │     ├── .kairos-skeleton-avatar
 │     └── .kairos-skeleton-btn
 │
 └── Empty State                ❌  MISSING — Contract exists
                                     (--kairos-empty-state-*), no CSS class.
```

### Correct Feedback Hierarchy

```
Feedback (Pure CSS, ZERO JS)
 │
 ├── Passive (read-only indicators)
 │     ├── Badge           ← count, label
 │     ├── Tag             ← category label, removable
 │     ├── StatusDot       ← tiny signal (PGM/PVW/offline)
 │     └── Indicator       ← inline signal bar
 │
 ├── Temporal (loading states)
 │     ├── Spinner         ← rotating
 │     ├── Progress        ← determinate bar
 │     └── Skeleton        ← placeholder shimmer
 │
 └── Contextual (messages)
       ├── Alert           ← inline message
       ├── Toast           ← timed notification
       ├── Flash           ← full-screen overlay message
       └── Empty State     ← "no data" placeholder
```

---

## LAYER 6 — OVERLAY PRIMITIVES

> Positioning and layering. The building blocks for ALL floating UI.

```
Overlay
 ├── Overlay                    ✅  src/components/overlay.css
 │     └── .kairos-overlay           Generic positioned container
 │
 ├── Backdrop                   ✅  src/components/overlay.css
 │     └── .kairos-backdrop          Full-screen dimming layer
 │
 ├── Popover                    ✅  src/components/popover.css
 │     └── .kairos-popover           Anchored floating panel
 │
 ├── Surface                    ❌  MISSING — Elevated content container
 │                                   Should provide .kairos-surface
 │
 ├── Portal                     ❌  MISSING — DOM teleportation target
 │                                   (JS-only concept, no CSS needed)
 │
 └── Anchor                     ❌  MISSING — Anchor positioning reference
```

### Correct Overlay → Composite Chain

```
              ┌─────────────────────────────┐
              │      OVERLAY PRIMITIVES     │
              │                             │
              │  Overlay   Backdrop         │
              │  Popover   Surface          │
              │  Portal    Anchor           │
              └──────────────┬──────────────┘
                             │
                             │ composed into
                             │
              ┌──────────────▼──────────────┐
              │      COMPOSITE LAYER        │
              │                             │
              │  Modal     = Backdrop       │
              │              + Surface      │
              │              + Focus Trap   │
              │                             │
              │  Dropdown  = Popover        │
              │              + Menu List    │
              │              + Keyboard     │
              │                             │
              │  Tooltip   = Popover        │
              │              + Label        │
              │              + Hover/Focus  │
              │                             │
              │  Command   = Backdrop       │
              │              + Surface      │
              │              + Input        │
              │              + List         │
              │                             │
              │  Combobox  = Input          │
              │              + Popover      │
              │              + List         │
              │                             │
              │  Context   = Popover        │
              │    Menu      + Menu List    │
              │              + Right-click  │
              │                             │
              │  Sidebar   = Backdrop       │
              │              + Surface      │
              │              + Slide anim   │
              └─────────────────────────────┘
```

---

## LAYER 7 — NAVIGATION PRIMITIVES

> Directional hints and interactive handles.

```
Navigation
 ├── Breadcrumb                 ✅  src/components/breadcrumb.css
 ├── Pagination                 ✅  src/components/pagination.css
 ├── Tab Bar                    ✅  src/components/tabs.css
 ├── Side Tab                   ✅  src/components/navigation.css
 ├── Top Bar                    ✅  src/components/navigation.css
 ├── Menu Bar                   ✅  src/components/navigation.css
 ├── Status Bar                 ✅  src/components/navigation.css
 ├── Tree                       ✅  src/components/tree.css
 │
 ├── Caret / Chevron            ❌  MISSING — No directional icon primitive
 ├── Handle / Grip              ❌  MISSING — No drag handle primitive
 └── Counter                    ❌  MISSING — No navigation counter primitive
```

---

## LAYER 8 — COMPOSITE COMPONENTS

> Multi-primitive assemblies. May contain JavaScript for behavior.

```
Composite
 ├── Modal                      🔁  TWO implementations
 │     ├── src/modules/modal.ts           (light DOM, event delegation)
 │     └── src/components/modal/modal.ts  (Web Component, Shadow DOM)
 │
 ├── Dropdown                   🔁  TWO implementations
 │     ├── src/modules/dropdown.ts
 │     └── src/components/dropdown/dropdown.ts
 │
 ├── Tabs                       🔁  TWO implementations
 │     ├── src/modules/tabs.ts
 │     └── src/components/tabs/tabs.ts
 │
 ├── Accordion                  ✅  src/modules/accordion.ts
 ├── Toast                      ✅  src/modules/toast.ts
 ├── Sidebar                    ✅  src/modules/sidebar.ts
 ├── Command Palette            ✅  src/modules/command.ts
 ├── Split Panel                ✅  src/components/split-panel/
 ├── Split Grid                 ✅  src/components/split-grid.css
 ├── Carousel                   ✅  src/components/carousel.css
 ├── Table                      ✅  src/components/table.css
 ├── Tag Input                  ✅  src/components/tag-input.css
 ├── Stepper                    ✅  src/components/stepper.css
 ├── Slider + Input             ✅  src/components/composites.css
 │
 │   ── MISSING COMPOSITES ──
 │
 ├── Combobox                   ❌  MISSING
 ├── Context Menu               ❌  MISSING
 ├── Dialog (non-modal)         ❌  MISSING
 ├── Date Picker                ❌  MISSING (not critical for broadcast)
 └── Color Picker               ❌  MISSING (not critical for broadcast)
```

---

## LAYER 9 — DOMAIN COMPONENTS (Broadcast)

> Business-specific. Built on Primitives + Composites.

```
Domain
 ├── Bus                        ✅  src/domain/bus.css
 │     ├── PGM Bus Row
 │     ├── PVW Bus Row
 │     └── AUX Bus Row               ✅  src/components/composites.css
 │
 ├── Source                     ✅
 │     ├── Source Tag                  src/domain/source-tag.css
 │     ├── Source Item                 src/components/data-display.css
 │     └── Source List                 src/components/data-display.css
 │
 ├── Multiview                  ✅  src/domain/multiview.css
 ├── Production                 ✅  src/domain/production.css
 ├── Shell                      ✅  src/domain/shell.css
 ├── Rundown                    ✅  src/domain/rundown.css
 ├── Segment                    ✅  src/domain/segment.css
 ├── Ticker / Marquee           ✅  src/domain/ticker.css
 ├── Property Row               ✅  src/domain/property.css
 ├── UI Patterns                ✅  src/domain/ui-patterns.css
 │
 ├── Keyer                      ✅  src/components/composites.css
 ├── Crosspoint Matrix          ✅  src/components/composites.css
 ├── Countdown / Timer          ✅  src/components/composites.css
 ├── Timecode                   ✅  src/components/composites.css
 ├── Device Card                ✅  src/components/composites.css
 ├── Scene Tree                 ✅  src/components/composites.css
 ├── Filter Stack               ✅  src/components/composites.css
 ├── Event History              ✅  src/components/composites.css
 │
 │   ── MISPLACED (currently in buttons.css, should be here) ──
 │
 ├── Key Button                 ⚠️  src/components/buttons.css
 ├── Source Button               ⚠️  src/components/buttons.css
 ├── Transition Button           ⚠️  src/components/buttons.css
 ├── Transport Button            ⚠️  src/components/buttons.css
 ├── Buffer Button               ⚠️  src/components/buttons.css
 ├── Salvo Button                ⚠️  src/components/buttons.css
 ├── Angle Button                ⚠️  src/components/buttons.css
 └── Macro Button                ⚠️  src/components/buttons.css
```

---

## DIAGNOSIS

### Elements in the WRONG layer

| Element | Current Location | Correct Location |
|---|---|---|
| Key Button | `buttons.css` (Primitive) | `src/domain/` (Domain) |
| Source Button | `buttons.css` (Primitive) | `src/domain/` (Domain) |
| Transition Button | `buttons.css` (Primitive) | `src/domain/` (Domain) |
| Transport Button | `buttons.css` (Primitive) | `src/domain/` (Domain) |
| Buffer Button | `buttons.css` (Primitive) | `src/domain/` (Domain) |
| Salvo Button | `buttons.css` (Primitive) | `src/domain/` (Domain) |
| Angle Button | `buttons.css` (Primitive) | `src/domain/` (Domain) |
| Macro Button | `buttons.css` (Primitive) | `src/domain/` (Domain) |
| Chip | `primitives.css` (Primitive) | Composite layer |
| Avatar | `primitives.css` (Primitive) | Composite or remove |
| Tally LED | `components-core.css` (Content) | Feedback (as generic StatusDot) |
| Popover content | `overlays.css` (mixed) | Should be with `popover.css` |
| AUX Bus | `composites.css` (Composite) | `src/domain/` (Domain) |
| Countdown | `composites.css` (Composite) | `src/domain/` (Domain) |
| Timecode | `composites.css` (Composite) | `src/domain/` (Domain) |
| Keyer | `composites.css` (Composite) | `src/domain/` (Domain) |
| Crosspoint | `composites.css` (Composite) | `src/domain/` (Domain) |
| Device Card | `composites.css` (Composite) | `src/domain/` (Domain) |
| Scene Tree | `composites.css` (Composite) | `src/domain/` (Domain) |
| Filter Stack | `composites.css` (Composite) | `src/domain/` (Domain) |
| Event History | `composites.css` (Composite) | `src/domain/` (Domain) |

### Duplicate implementations (must resolve to ONE)

| Element | Implementation A | Implementation B | Recommendation |
|---|---|---|---|
| Modal | `src/modules/modal.ts` | `src/components/modal/modal.ts` | Keep ONE, deprecate other |
| Dropdown | `src/modules/dropdown.ts` | `src/components/dropdown/dropdown.ts` | Keep ONE, deprecate other |
| Tabs | `src/modules/tabs.ts` | `src/components/tabs/tabs.ts` | Keep ONE, deprecate other |
| Spinner | `primitives.css` | `loading.css` | Keep `loading.css`, remove from `primitives.css` |
| Badge contract | `components.css:182` | `components.css:470` | Merge into single definition |
| Source Button contract | `components.css:39` | `components.css:336` | Merge into single definition |
| Rundown contract | `components.css:418` | `components.css:685` | Merge into single definition |
| Segment contract | `components.css:426` | `components.css:669` | Merge into single definition |

---

## FULL HIERARCHY (Clean Target State)

```
KAIROS
 │
 ├── L0: Foundation ──────────────── 15 modules
 │     Colors, Typography, Spacing, Radius, Shadows,
 │     Elevation, Motion, Animations, Sizes, Breakpoints,
 │     Focus, Cursors, Reset, Typography Utils, Themes
 │
 ├── L1: Contracts ───────────────── 5 types
 │     Intent (5), Variant (4), Size (3), State (6), Recipe (3)
 │
 ├── L2: Layout Primitives ───────── 10 elements
 │     Box, Stack, Cluster, Spacer, Divider, Separator,
 │     App Shell, Panel, Resize Handle, Grid
 │
 ├── L3: Content Primitives ──────── 10 elements
 │     Section Label, Panel Header, Icon, Kbd, Code,
 │     Link, Heading, Paragraph, Image, Tooltip
 │
 ├── L4: Input Primitives ────────── 14 elements
 │     Button, IconButton, ButtonGroup, Input, Textarea,
 │     Select, Checkbox, Radio, Switch, Slider,
 │     Stepper, Tag Input, Form Row, Form Label
 │
 ├── L5: Feedback Primitives ─────── 10 elements
 │     Badge, Tag, StatusDot, Indicator, Spinner,
 │     Progress, Skeleton, Alert, Toast, Empty State
 │
 ├── L6: Overlay Primitives ──────── 6 elements
 │     Overlay, Backdrop, Popover, Surface, Portal, Anchor
 │
 ├── L7: Navigation Primitives ───── 10 elements
 │     Breadcrumb, Pagination, Tab Bar, Side Tab,
 │     Top Bar, Menu Bar, Status Bar, Tree,
 │     Handle, Counter
 │
 ├── L8: Composite Components ────── 15 elements
 │     Modal, Dropdown, Tabs, Accordion, Toast Stack,
 │     Sidebar, Command Palette, Split Panel, Split Grid,
 │     Carousel, Table, Slider+Input, Combobox,
 │     Context Menu, Dialog
 │
 └── L9: Domain (Broadcast) ──────── 25 elements
       Bus (PGM/PVW/AUX), Source Tag, Source Button,
       Key Button, Transition Button, Transport Button,
       Buffer Button, Salvo Button, Angle Button,
       Macro Button, Multiview, Production, Shell,
       Rundown, Segment, Ticker, Property Row,
       Keyer, Crosspoint, Countdown, Timecode,
       Device Card, Scene Tree, Filter Stack,
       Event History
```

---

## SCORE

| Layer | Exists | Missing | Misplaced | Duplicate | Score |
|---|---|---|---|---|---|
| L0: Foundation | 15 | 0 | 0 | 0 | **100%** |
| L1: Contracts | 5 | 0 | 0 | 0 | **100%** |
| L2: Layout | 8 | 1 | 0 | 0 | **89%** |
| L3: Content | 3 | 6 | 1 | 0 | **30%** |
| L4: Input | 12 | 0 | 8 | 1 | **57%** |
| L5: Feedback | 6 | 3 | 2 | 1 | **50%** |
| L6: Overlay | 3 | 3 | 0 | 0 | **50%** |
| L7: Navigation | 8 | 2 | 0 | 0 | **80%** |
| L8: Composite | 12 | 3 | 0 | 3 | **67%** |
| L9: Domain | 17 | 0 | 8 | 2 | **65%** |

### Overall Primitive Purity: **68%**

> 32% of elements are either missing, misplaced, or duplicated.
>
> The code that exists WORKS. The quality is world-class.
> But the TAXONOMY is wrong in ~1/3 of cases.
