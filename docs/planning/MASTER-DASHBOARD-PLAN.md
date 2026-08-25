# KAIROS 1.0 — MASTER DASHBOARD PLAN
**The Definitive Visual Calibration Facility**

> This document is the single source of truth for building the Master Dashboard.
> No component may be built unless it appears in this plan.
> No component in this plan may be skipped.

---

## 1. Architecture

### 1.1 Location
```
calibration/
├── master-dashboard.html    ← The single page
└── dashboard.css            ← Dashboard-only layout styles (NOT part of Kairos)
```
The `calibration/` directory is separate from `patterns/` because this is not a documentation page — it is an **engineering test facility**. It loads `dist/kairos.css` and `dist/kairos.min.js` as black-box dependencies, exactly as an end-user application would.

### 1.2 Page Structure
```
┌──────────────────────────────────────────────────────┐
│  HEADER (sticky): Kairos 1.0 · Master Dashboard     │
├────────┬─────────────────────────────────────────────┤
│        │                                             │
│  NAV   │  CONTENT AREA                               │
│ (side) │                                             │
│        │  ┌─────────────────────────────────────┐    │
│ L0     │  │  Section: [Phase Name]               │    │
│ L3     │  │  ┌──────────┐  ┌──────────┐         │    │
│ L4     │  │  │ Component│  │ Component│         │    │
│ L5     │  │  │ Card     │  │ Card     │         │    │
│ L6     │  │  └──────────┘  └──────────┘         │    │
│ L7     │  └─────────────────────────────────────┘    │
│ L8     │                                             │
│ L9     │                                             │
│ Tests  │                                             │
│        │                                             │
├────────┴─────────────────────────────────────────────┤
│  FOOTER: Build hash · Token count · Component count  │
└──────────────────────────────────────────────────────┘
```

### 1.3 Sidebar Navigation
The sidebar is a fixed `<nav>` using Kairos's own `kairos-side-tab` system. Each section is a clickable anchor link. Clicking it smooth-scrolls to the section. The active section is highlighted via `IntersectionObserver`.

### 1.4 Component Card Template
Each component is rendered inside a standardized card. The card is NOT a Kairos component — it is a dashboard-local layout container. Inside the card, the component is rendered with **pure Kairos HTML**, exactly as it would appear in a real application.

The card has **4 zones**: ID + Name, Source File, **Contract Tokens** (the primary contracts from `components.css`), and the live component.

```html
<!-- Dashboard card (NOT Kairos) -->
<div class="dash-card" id="comp-button">
  <div class="dash-card-header">
    <span class="dash-card-id">3.01</span>
    <span class="dash-card-name">Button</span>
    <span class="dash-card-file">buttons.css</span>
  </div>
  <div class="dash-card-contracts">
    <!-- Primary contracts — the tokens to adjust if this component looks wrong -->
    <code>--kairos-btn-padding-y</code>
    <code>--kairos-btn-padding-x</code>
    <code>--kairos-btn-icon-gap</code>
  </div>
  <div class="dash-card-body">
    <!-- === PURE KAIROS HTML BELOW === -->
    <button class="kairos-btn">Standard</button>
    <button class="kairos-btn kairos-btn-sm">Small</button>
    <!-- === END KAIROS HTML === -->
  </div>
</div>
```

> **Why Contract Tokens in the card?** During visual calibration, when you see a spacing problem you need to know *immediately* which contract to adjust. You should never have to open 63 CSS files to hunt for it. The contract names printed on the card are your direct entry point into `components.css`.

### 1.5 Design Rules for the Dashboard Itself
- The dashboard's own layout styles live in `dashboard.css`, NOT inside Kairos.
- `dashboard.css` may use `border-radius: 4px` because the dashboard is not subject to LAW-009.
- Inside `.dash-card-body`, **only Kairos classes are permitted**. Zero inline styles. Zero dashboard classes. This ensures we are testing the real CSS output.
- Every interactive component includes its JS behavior via `kairos.min.js`. Accordion must toggle, Tabs must switch, Dropdown must open/close.
- Overlays (Modal, Tooltip, Dropdown, Popover) are rendered **inline statically** with forced visibility so their internal spacing can be visually inspected without hovering.

### 1.6 Live Token Override Panel
At the top of the page (below the header, above the content), there is a collapsible **Live Token Override** panel. This is the single most important testing tool in the entire dashboard.

```
┌─────────────────────────────────────────────────────────────────┐
│  LIVE TOKEN OVERRIDE                                    [▼]    │
├─────────────────────────────────────────────────────────────────┤
│  Spacing MD   [−] ████████████ 12px [+]                        │
│  Icon MD      [−] ████████████ 16px [+]                        │
│  Control MD   [−] ████████████ 36px [+]                        │
│  Motion Fast  [−] ████████████ 100ms [+]                       │
│  Border Base  [−] ████████████  1px [+]                        │
│                                              [ RESET ALL ]     │
└─────────────────────────────────────────────────────────────────┘
```

**How it works:**
- Each `[+]` / `[−]` button increments/decrements the CSS custom property on `:root` by 1px (or 25ms for motion).
- The change is applied via `document.documentElement.style.setProperty()`.
- Every component on the page that references this token will update instantly.
- If **all** components respond uniformly → the contract system is correct.
- If **any** component breaks or stays unchanged → there is a hardcoded value hiding somewhere, and that is a **bug**.
- `[ RESET ALL ]` removes all overrides.

This is the **ultimate test of Kairos's architectural integrity**. If changing `--kairos-space-md` from 12px to 14px causes one button to grow but another to stay the same, it proves that button has a hardcoded value violating LAW-006.

**Tokens exposed in the panel:**
| Token | Default | Purpose |
|-------|---------|--------|
| `--kairos-space-3xs` | 2px | Micro spacing |
| `--kairos-space-xs` | 6px | Compact spacing |
| `--kairos-space-sm` | 8px | Standard internals |
| `--kairos-space-md` | 12px | Standard gap |
| `--kairos-space-lg` | 16px | Loose internals |
| `--kairos-space-xl` | 24px | Section gaps |
| `--kairos-control-xs` | 24px | Smallest control |
| `--kairos-control-sm` | 32px | Small control |
| `--kairos-control-md` | 36px | Standard control |
| `--kairos-control-lg` | 48px | Large control |
| `--kairos-icon-md` | 16px | Standard icon |
| `--kairos-text-md` | 14px | Body text |
| `--kairos-motion-fast` | 100ms | Hover transitions |
| `--kairos-border-base` | 1px | Standard outline |

### 1.7 Loading Strategy
```html
<link rel="stylesheet" href="../dist/kairos.css">       <!-- The real compiled output -->
<link rel="stylesheet" href="dashboard.css">             <!-- Dashboard layout only -->
<script src="../dist/kairos.min.js" defer></script>       <!-- Behavioral JS -->
<script src="dashboard.js" defer></script>                <!-- Live Token Override + IntersectionObserver -->
<script type="module" src="https://unpkg.com/@phosphor-icons/web@2.1.1"></script>
```

---

## 2. Complete Component Inventory

Below is the **exhaustive** list of every component that must appear in the dashboard. Each entry includes:
- **ID**: Unique sequential identifier within its phase.
- **Name**: The component's canonical name.
- **CSS Class**: The primary CSS class(es) used in HTML.
- **Source File**: The CSS file that defines the component.
- **Contract Tokens**: The spacing/sizing contracts from `components.css`.
- **States**: All visual states that must be shown (per LAW-007).
- **VISUAL-CONTRACTS**: Reference to the row in `VISUAL-CONTRACTS.md` if applicable.

---

### PHASE 1: FOUNDATION TOKENS (L0)
*Purpose: Verify that all design tokens render correctly before testing any component.*

#### 1.01 · Color Scale
- **Source:** `foundation/colors.css`
- **What to show:**
  - Cool Steel scale: `--kairos-cs-0` through `--kairos-cs-950` (11 swatches)
  - Semantic surface colors: `--kairos-bg-deep`, `--kairos-bg-surface`, `--kairos-bg-surface-alt`, `--kairos-bg-input`, `--kairos-bg-hover`, `--kairos-bg-selected`, `--kairos-bg-deep-alt`
  - Semantic text colors: `--kairos-text`, `--kairos-text-secondary`, `--kairos-text-muted`, `--kairos-text-placeholder`
  - Semantic border colors: `--kairos-border`, `--kairos-border-muted`, `--kairos-border-active`, `--kairos-border-focus`
  - Broadcast status: `--kairos-status-pgm`, `--kairos-status-pvw`, `--kairos-status-warning`, `--kairos-status-info`
  - Alpha overlays: `--kairos-pgm-bg`, `--kairos-pvw-bg`, `--kairos-warning-bg`

#### 1.02 · Typography Scale
- **Source:** `foundation/typography.css`
- **What to show:**
  - Font sizes: `text-xs` (11px), `text-sm` (12px), `text-md` (14px), `text-lg` (16px), `text-xl` (20px), `text-2xl` (24px)
  - Font weights: `weight-normal` (400), `weight-medium` (500), `weight-bold` (600)
  - Line heights: `leading-tight` (1.2), `leading-base` (1.4)
  - Tracking: `tracking-normal`, `tracking-tight`, `tracking-wider`, `tracking-widest`, `tracking-ultra`, `tracking-super-wide`, `tracking-max`
  - Font families: `font-sans`, `font-mono`

#### 1.03 · Spacing Scale
- **Source:** `foundation/spacing.css`
- **What to show:** Visual blocks for each token:
  - `space-3xs` (2px), `space-2xs` (4px), `space-xs` (6px), `space-sm` (8px), `space-md` (12px), `space-lg` (16px), `space-xl` (24px), `space-2xl` (32px), `space-3xl` (48px)

#### 1.04 · Control Heights
- **Source:** `foundation/sizes.css`
- **What to show:** Horizontal bars at each height:
  - `control-xs` (24px), `control-sm` (32px), `control-md` (36px), `control-lg` (48px), `control-xl` (56px)

#### 1.05 · Icon Scale
- **Source:** `foundation/sizes.css`
- **What to show:** Phosphor icons at each size:
  - `icon-xs` (12px), `icon-sm` (12px), `icon-md` (16px), `icon-lg` (20px), `icon-xl` (24px)

#### 1.06 · Geometry (Borders & Focus)
- **Source:** `foundation/geometry.css`
- **What to show:**
  - `border-none` (0), `border-base` (1px), `border-thick` (2px)
  - `focus-base` (2px) — show a focused element
  - `radius-none` (0) — confirm globally enforced

#### 1.07 · Shadows
- **Source:** `foundation/shadows.css`
- **What to show:** Boxes with each shadow:
  - `shadow-tooltip`, `shadow-dropdown`, `shadow-modal`

#### 1.08 · Motion Scale
- **Source:** `foundation/motion.css`
- **What to show:** Animated boxes demonstrating each duration:
  - `motion-instant` (0ms), `motion-fast` (100ms), `motion-normal` (150ms), `motion-medium` (200ms), `motion-slow` (300ms), `motion-overlay` (400ms)

#### 1.09 · Elevation (Z-Index)
- **Source:** `foundation/elevation.css`
- **What to show:** Stacked layers visualizing:
  - `z-base` (1), `z-sticky` (10), `z-dropdown` (50), `z-modal` (100), `z-tooltip` (200), `z-toast` (9000), `z-max` (9999)

---

### PHASE 2: CONTENT PRIMITIVES (L2, L3)
*Purpose: Test atomic visual elements that other components depend on.*

#### 2.01 · Divider
- **CSS Class:** `.kairos-divider`, `.kairos-divider-vertical`, `.kairos-divider-label`
- **Source:** `components/divider.css`
- **Contracts:** `--kairos-divider-gap`, `--kairos-separator-margin`
- **States:** Horizontal, Vertical, With label
- **Variants:** Default, Muted

#### 2.02 · Heading
- **CSS Class:** `.kairos-heading`, `h1`–`h6`
- **Source:** `components/heading.css`
- **Contracts:** Typography scale tokens
- **Show:** All 6 heading levels

#### 2.03 · Paragraph
- **CSS Class:** `.kairos-paragraph`, `p`
- **Source:** `components/paragraph.css`
- **Contracts:** `--kairos-paragraph-margin`

#### 2.04 · Code
- **CSS Class:** `.kairos-code`, `code`
- **Source:** `components/code.css`
- **Contracts:** `--kairos-code-padding`
- **Show:** Inline code, Block code

#### 2.05 · Kbd (Keyboard Shortcut)
- **CSS Class:** `.kairos-kbd`, `kbd`
- **Source:** `components/kbd.css`
- **Contracts:** `--kairos-kbd-padding-y`, `--kairos-kbd-padding-x`
- **VISUAL-CONTRACTS:** Kbd row (control-xs, space-3xs/xs)

#### 2.06 · Link
- **CSS Class:** `.kairos-link`, `a`
- **Source:** `components/link.css`
- **States:** Default, Hover, Visited, Focus

#### 2.07 · Icon
- **CSS Class:** `.kairos-icon`, `.kairos-icon-xs/sm/md/lg/xl`
- **Source:** `components/icons.css`
- **Show:** All 5 sizes with Phosphor icons

#### 2.08 · Image
- **CSS Class:** `.kairos-image`
- **Source:** `components/image.css`

#### 2.09 · Avatar
- **CSS Class:** `.kairos-avatar`, `.kairos-avatar-sm`, `.kairos-avatar-md`
- **Source:** `components/avatar.css`
- **Contracts:** `--kairos-avatar-name-gap`, `--kairos-name-role-gap`
- **VISUAL-CONTRACTS:** Avatar SM (control-xs), Avatar MD (control-md)

---

### PHASE 3: INPUT & INTERACTION PRIMITIVES (L4)
*Purpose: Test all interactive controls. This is where LAW-001 is most critical.*

#### 3.01 · Button (Standard)
- **CSS Class:** `.kairos-btn`, `.kairos-btn-sm`, `.kairos-btn-lg`
- **Source:** `components/buttons.css`
- **Contracts:** `--kairos-btn-padding-y/x`, `--kairos-btn-sm-padding-y/x`, `--kairos-btn-lg-padding-y/x`, `--kairos-btn-icon-gap`
- **States:** Default, Hover, Active, Focus, Disabled, Loading
- **Variants:** With icon, Without icon, Icon-only
- **VISUAL-CONTRACTS:** Button SM/MD/LG rows

#### 3.02 · Button Group
- **CSS Class:** `.kairos-btn-group`
- **Source:** `components/buttons.css`
- **Contracts:** `--kairos-btn-group-gap`

#### 3.03 · Icon Button
- **CSS Class:** `.kairos-icon-btn`
- **Source:** `components/buttons.css`
- **Contracts:** `--kairos-icon-btn-padding`
- **States:** Default, Hover, Active, Focus, Disabled

#### 3.04 · Text Input
- **CSS Class:** `.kairos-input`
- **Source:** `components/forms.css`
- **Contracts:** `--kairos-input-padding-y/x`, `--kairos-label-input-gap`, `--kairos-input-help-gap`, `--kairos-form-field-gap`
- **States:** Default, Focus, Disabled, Invalid (error), With placeholder, With value
- **VISUAL-CONTRACTS:** Text Input row (control-md, space-xs/md)

#### 3.05 · Label
- **CSS Class:** `.kairos-label`
- **Source:** `components/forms.css`
- **Show:** Label above input, Label inline

#### 3.06 · Settings Input
- **CSS Class:** `.kairos-set-input`
- **Source:** `components/forms.css`
- **Contracts:** `--kairos-set-input-padding-y/x`

#### 3.07 · Hotkey Input
- **CSS Class:** `.kairos-hk-input`
- **Source:** `components/forms.css`
- **Contracts:** `--kairos-hk-input-padding-y/x`

#### 3.08 · Settings Select
- **CSS Class:** `.kairos-set-select`
- **Source:** `components/buttons.css`
- **Contracts:** `--kairos-set-select-padding-y/x`, `--kairos-select-group-gap`
- **States:** Default, Focus, Disabled

#### 3.09 · Checkbox
- **CSS Class:** `.kairos-chk-wrapper`, `.kairos-chk`, `.kairos-chk-indicator`, `.kairos-chk-label`
- **Source:** `components/checkbox.css`
- **Contracts:** `--kairos-chk-size`, `--kairos-control-label-gap`, `--kairos-choice-group-gap`
- **States:** Unchecked, Checked, Disabled, Focus
- **VISUAL-CONTRACTS:** Checkbox row (control-xs)

#### 3.10 · Radio
- **CSS Class:** `.kairos-radio-wrapper`, `.kairos-radio`, `.kairos-radio-indicator`, `.kairos-radio-label`
- **Source:** `components/radio.css`
- **Contracts:** `--kairos-control-label-gap`, `--kairos-choice-group-gap`
- **States:** Unselected, Selected, Disabled, Focus
- **VISUAL-CONTRACTS:** Radio row (control-xs)

#### 3.11 · Switch
- **CSS Class:** `.kairos-switch-wrapper`, `.kairos-switch-input`, `.kairos-switch-track`, `.kairos-switch-thumb`, `.kairos-switch-label`
- **Source:** `components/switch.css`
- **Contracts:** `--kairos-control-label-gap`
- **States:** Off, On, Disabled, Focus
- **VISUAL-CONTRACTS:** Switch row (control-xs)

#### 3.12 · Slider (Range)
- **CSS Class:** `.kairos-slider`, `.kairos-slider-v`
- **Source:** `components/slider.css`
- **Contracts:** `--kairos-slider-thumb-outset-y`, `--kairos-slider-thumb-width`, `--kairos-slider-thumb-height-extra`, vertical variants
- **States:** Default, Hover, Focus, Disabled
- **Show:** Horizontal, Vertical

#### 3.13 · Numeric Stepper
- **CSS Class:** `.kairos-stepper`
- **Source:** `components/stepper.css`
- **Contracts:** `--kairos-stepper-btn-w`, `--kairos-stepper-input-w`, `--kairos-stepper-input-padding-y`, `--kairos-stepper-sm-input-padding-y`, `--kairos-stepper-unit-padding-y/x`
- **States:** Default, Disabled
- **Variants:** With unit label, Without unit label, SM

#### 3.14 · Tag Input
- **CSS Class:** `.kairos-tag-input`
- **Source:** `components/tag-input.css`
- **Contracts:** `--kairos-tag-input-gap`, `--kairos-tag-input-padding-y/x`, `--kairos-tag-input-sm-padding-y/x`, `--kairos-tag-remove-w`
- **States:** Default, Focus, With tags, Empty

#### 3.15 · Slider Input (Composite)
- **CSS Class:** `.kairos-slider-input`
- **Source:** Domain composite
- **Contracts:** `--kairos-slider-input-gap`, `--kairos-slider-input-sm-gap`

---

### PHASE 4: FEEDBACK PRIMITIVES (L5)
*Purpose: Test status indicators and notification elements.*

#### 4.01 · Badge
- **CSS Class:** `.kairos-badge`
- **Source:** `components/badge.css`
- **Contracts:** `--kairos-badge-padding-y/x`, `--kairos-badge-gap`
- **States:** Default, PGM (`.kairos-status-pgm`), PVW (`.kairos-status-pvw`), Warning, Info
- **VISUAL-CONTRACTS:** Badge row (control-xs, space-3xs/xs)

#### 4.02 · Tag
- **CSS Class:** `.kairos-tag`
- **Source:** `components/tag.css`
- **Contracts:** `--kairos-tag-padding-y/x`, `--kairos-tag-gap`
- **Show:** Default, With remove icon

#### 4.03 · Spinner
- **CSS Class:** `.kairos-spinner`, `.kairos-spinner-sm`, `.kairos-spinner-lg`
- **Source:** `components/loading.css`
- **Show:** SM, MD (default), LG

#### 4.04 · Progress Bar
- **CSS Class:** `.kairos-progress`, `.kairos-progress-bar`
- **Source:** `components/progress.css`
- **Contracts:** `--kairos-progress-height`
- **Show:** 25%, 50%, 85%, 100%, Status variants (info, warning, pgm)

#### 4.05 · Status Dot
- **CSS Class:** `.kairos-status-dot`
- **Source:** `components/status-dot.css`
- **Contracts:** `--kairos-status-item-gap`
- **Show:** PGM, PVW, Warning, Info, Off

#### 4.06 · Indicator
- **CSS Class:** `.kairos-indicator`
- **Source:** `components/indicator.css`
- **Contracts:** `--kairos-indicator-gap`

#### 4.07 · Alert
- **CSS Class:** `.kairos-alert`, `.kairos-alert-icon`, `.kairos-alert-content`, `.kairos-alert-close`
- **Source:** `components/feedback.css`
- **Contracts:** `--kairos-alert-padding`, `--kairos-alert-icon-gap`, `--kairos-alert-action-gap`, `--kairos-alert-msg-gap`
- **States:** Info, Warning, PGM (error), PVW (success)
- **VISUAL-CONTRACTS:** Alert row (auto height, space-md/md)

#### 4.08 · Toast
- **CSS Class:** `.kairos-toast`, `.kairos-toast-icon`, `.kairos-toast-content`, `.kairos-toast-close`
- **Source:** `components/toast.css`
- **Contracts:** `--kairos-toast-padding-y/x`, `--kairos-toast-icon-gap`, `--kairos-toast-gap`, `--kairos-toast-viewport-margin`
- **States:** Info, Warning, PGM (error), PVW (success)
- **VISUAL-CONTRACTS:** Toast row (auto height, space-xs/md)
- **Note:** Render inline statically (not floating)

#### 4.09 · Empty State
- **CSS Class:** `.kairos-empty-state`
- **Source:** `components/empty-state.css`
- **Contracts:** `--kairos-empty-state-padding`, `--kairos-empty-state-gap`, `--kairos-empty-state-gap-sm`

---

### PHASE 5: OVERLAYS (L6)
*Purpose: Test floating surfaces. All rendered inline/static for spacing inspection.*

#### 5.01 · Overlay / Backdrop
- **CSS Class:** `.kairos-overlay`
- **Source:** `components/overlay.css`
- **Show:** Semi-transparent backdrop (rendered inline as a colored box)

#### 5.02 · Tooltip
- **CSS Class:** `.kairos-tooltip`, `.kairos-group-tooltip`
- **Source:** `components/tooltip.css`
- **Contracts:** `--kairos-tooltip-padding-y/x`, `--kairos-tooltip-trigger-gap`, `--kairos-tooltip-group-gap`
- **VISUAL-CONTRACTS:** Tooltip row (control-xs, space-3xs/xs)
- **Show:** Rendered statically (visible)

#### 5.03 · Dropdown Menu
- **CSS Class:** `.kairos-dropdown`, `.kairos-dropdown-item`, `.kairos-dropdown-divider`
- **Source:** `components/dropdown.css`
- **Contracts:** `--kairos-dropdown-item-padding-y/x`, `--kairos-dropdown-item-gap`, `--kairos-dropdown-divider-margin-y`
- **VISUAL-CONTRACTS:** Dropdown Menu row (auto, space-xs/md)
- **Show:** Rendered statically (open state forced)

#### 5.04 · Popover
- **CSS Class:** `.kairos-popover`, `.kairos-popover-head`, `.kairos-popover-body`, `.kairos-popover-foot`
- **Source:** `components/popover.css`
- **Contracts:** `--kairos-popover-head-padding-y/x`, `--kairos-popover-body-padding`, `--kairos-popover-foot-padding-y/x`, `--kairos-popover-action-gap`, `--kairos-popover-offset`
- **VISUAL-CONTRACTS:** Popover row (auto, space-xl/xl)
- **Show:** Rendered statically

#### 5.05 · Modal
- **CSS Class:** `.kairos-modal`, `.kairos-modal-header`, `.kairos-modal-body`, `.kairos-modal-footer`
- **Source:** `components/modal.css`
- **Contracts:** `--kairos-modal-padding`, `--kairos-modal-section-gap`, `--kairos-modal-action-gap`
- **VISUAL-CONTRACTS:** Modal row (auto, space-xl/xl, border-thick)
- **Show:** Rendered inline (not floating), with header, body, footer

#### 5.06 · Surface
- **CSS Class:** `.kairos-surface`
- **Source:** `components/surface.css`

---

### PHASE 6: NAVIGATION (L7)
*Purpose: Test navigation patterns.*

#### 6.01 · Navigation Item
- **CSS Class:** `.kairos-nav-item`
- **Source:** `components/navigation.css`
- **Contracts:** `--kairos-nav-item-gap`, `--kairos-nav-item-padding-y/x`
- **States:** Default, Hover, Active

#### 6.02 · Sidebar
- **CSS Class:** `.kairos-sidebar`, `.kairos-sidebar-item`, `.kairos-side-tab`
- **Source:** `components/sidebar.css`
- **Contracts:** `--kairos-sidebar-item-padding-y/x`, `--kairos-sidebar-item-gap`, `--kairos-sidebar-section-gap`, `--kairos-sidebar-padding`, `--kairos-sidebar-gap-lg/sm`
- **States:** Default, Active, With icon

#### 6.03 · Menu Item
- **CSS Class:** `.kairos-menu-item`
- **Source:** `components/components-core.css`
- **Contracts:** `--kairos-menu-item-padding-y/x`, `--kairos-menu-item-gap`, `--kairos-menu-section-gap`
- **States:** Default, Hover, Selected

#### 6.04 · Breadcrumb
- **CSS Class:** `.kairos-breadcrumb`, `.kairos-breadcrumb-item`
- **Source:** `components/breadcrumb.css`
- **Contracts:** `--kairos-breadcrumb-item-gap`, `--kairos-breadcrumb-padding`, `--kairos-breadcrumb-gap`
- **VISUAL-CONTRACTS:** Breadcrumb row (control-xs, space-xs/xs)

#### 6.05 · Tabs
- **CSS Class:** `.kairos-tabs`, `.kairos-tab`, `.kairos-tab-panel`
- **Source:** `components/tabs.css`
- **Contracts:** `--kairos-tab-padding-y/x`, `--kairos-tab-gap`, `--kairos-tab-content-gap`, `--kairos-tab-panel-padding`
- **States:** Active tab, Inactive tab, Hover
- **VISUAL-CONTRACTS:** Tab Item row (control-md, space-xs/md)

#### 6.06 · Pagination
- **CSS Class:** `.kairos-pagination`, `.kairos-pagination-btn`
- **Source:** `components/pagination.css`
- **Contracts:** `--kairos-pagination-item-gap`, `--kairos-pagination-padding`, `--kairos-pagination-gap`
- **States:** Current page, Other pages, Disabled (prev/next)
- **VISUAL-CONTRACTS:** Pagination Btn row (control-sm, space-xs/xs)

#### 6.07 · Link
- **Already covered in 2.06** but showing here for navigation context

---

### PHASE 7: COMPOSITE COMPONENTS (L8)
*Purpose: Test complex assemblies of primitives.*

#### 7.01 · Accordion
- **CSS Class:** `.kairos-accordion`, `.kairos-accordion-item`, `.kairos-accordion-trigger`, `.kairos-accordion-trigger-icon`, `.kairos-accordion-panel`
- **Source:** `components/accordion.css`
- **Contracts:** `--kairos-accordion-padding`, `--kairos-accordion-gap`, `--kairos-accordion-trigger-gap`, `--kairos-accordion-trigger-padding`, `--kairos-accordion-panel-padding`, compact variants
- **States:** Open item, Closed item
- **VISUAL-CONTRACTS:** Accordion Head row (control-lg, space-md/md)
- **JS:** `toggleAccordion()` must work

#### 7.02 · Carousel
- **CSS Class:** `.kairos-carousel`, `.kairos-carousel-slide`, `.kairos-carousel-nav`, `.kairos-carousel-dots`
- **Source:** `components/carousel.css`
- **Contracts:** `--kairos-carousel-slide-padding`, `--kairos-carousel-dots-gap`, `--kairos-carousel-dots-padding`, `--kairos-carousel-nav-gap`, `--kairos-carousel-nav-padding-y/x`, `--kairos-carousel-caption-padding-y/x`, `--kairos-carousel-btn-w/h`, `--kairos-carousel-gap`
- **Show:** 3 slides with nav dots

#### 7.03 · Command Palette
- **CSS Class:** `.kairos-command`, `.kairos-command-input`, `.kairos-command-list`, `.kairos-command-item`
- **Source:** `components/command.css`
- **Contracts:** `--kairos-command-padding`, `--kairos-command-gap`, `--kairos-command-padding-lg`, `--kairos-command-gap-sm`
- **Show:** Rendered inline (static, open)

#### 7.04 · Table
- **CSS Class:** `.kairos-table`
- **Source:** `components/table.css`
- **Contracts:** `--kairos-table-cell-padding-y/x`, `--kairos-table-row-gap`, `--kairos-table-header-data-gap`, `--kairos-table-th-padding-y/x`, `--kairos-table-td-padding-y/x`
- **States:** Default row, Hover row, Selected row, Sortable header
- **VISUAL-CONTRACTS:** Table Cell row (control-md, space-xs/md)

#### 7.05 · Tree
- **CSS Class:** `.kairos-tree`, `.kairos-tree-item`, `.kairos-tree-toggle`
- **Source:** `components/tree.css`
- **Contracts:** `--kairos-tree-padding`, `--kairos-tree-padding-x`, `--kairos-tree-indent`
- **States:** Expanded, Collapsed, Selected, With icon

#### 7.06 · Split Grid
- **CSS Class:** `.kairos-split-grid`, `.kairos-split-grid-cell`
- **Source:** `components/split-grid.css`
- **Contracts:** `--kairos-split-grid-gap`, `--kairos-split-grid-padding`, `--kairos-split-grid-cell-label-padding-y/x`

#### 7.07 · Split Panel
- **CSS Class:** `.kairos-split-panel`, `.kairos-split-pane`, `.kairos-split-handle`
- **Source:** `components/split-grid.css` (shared)
- **Contracts:** `--kairos-split-panel-pane-padding`, `--kairos-split-divider-width/height`, `--kairos-split-pane-label-margin-bottom`, `--kairos-split-divider-w`

#### 7.08 · Composites (Generic)
- **CSS Class:** Various composed layouts
- **Source:** `components/composites.css`

---

### PHASE 8: BROADCAST DOMAIN COMPONENTS (L9)
*Purpose: Test the hardware-mimicking broadcast-specific components.*

#### 8.01 · Bus Bar (Source Bus)
- **CSS Class:** `.kairos-bus-row`, `.kairos-bus-btn`, `.kairos-bus-label`
- **Source:** `domain/bus.css`
- **Contracts:** `--kairos-bus-row-gap`, `--kairos-bus-btn-gap`, `--kairos-bus-btn-padding-y/x`, `--kairos-bus-label-w`, `--kairos-bus-label-padding`, `--kairos-bus-btn-content-gap`, `--kairos-bus-trans-btn-padding-x`
- **States:** PGM selected, PVW selected, Unselected
- **Show:** PGM row, PVW row with 8+ source buttons

#### 8.02 · Key Button (Broadcast Hotkey)
- **CSS Class:** `.kairos-key-btn`, `.kairos-key-btn-id`, `.kairos-key-btn-label`
- **Source:** `domain/buttons.css`
- **Contracts:** `--kairos-key-btn-padding-y/x`, `--kairos-key-btn-padding`, `--kairos-key-btn-gap`, `--kairos-key-btn-tiny-padding-y/x`
- **States:** Default, Active (on), PGM, PVW

#### 8.03 · Transition Button (Cut / Auto)
- **CSS Class:** `.kairos-trans-btn`
- **Source:** `domain/buttons.css`
- **Contracts:** `--kairos-trans-btn-padding-y/x`
- **States:** Idle, Active (firing)

#### 8.04 · Transport Button (Play / Stop / Rec)
- **CSS Class:** `.kairos-tp-btn`
- **Source:** `domain/buttons.css`
- **Contracts:** `--kairos-tp-btn-padding-y/x`, `--kairos-tp-btn-gap`
- **States:** Idle, Active (playing/recording)

#### 8.05 · Buffer Button
- **CSS Class:** `.kairos-buf-btn`
- **Source:** `domain/buttons.css`
- **Contracts:** `--kairos-buf-btn-padding-y/x`

#### 8.06 · Salvo Button
- **CSS Class:** `.kairos-salvo-btn`
- **Source:** `domain/buttons.css`
- **Contracts:** `--kairos-salvo-btn-padding-y/x`

#### 8.07 · Angle Button
- **CSS Class:** `.kairos-angle-btn`
- **Source:** `domain/buttons.css`
- **Contracts:** `--kairos-angle-btn-padding-y/x`, `--kairos-angle-btn-gap`

#### 8.08 · Source Tag
- **CSS Class:** `.kairos-src-tag`, `.kairos-src-tag-id`, `.kairos-src-tag-label`
- **Source:** `domain/source-tag.css`
- **Contracts:** `--kairos-src-tag-gap`, `--kairos-source-tag-gap`
- **States:** Default, PGM, PVW

#### 8.09 · Source Button (Routing)
- **CSS Class:** `.kairos-src-btn`
- **Source:** `components/components-core.css`
- **Contracts:** `--kairos-src-btn-padding-y/x`, `--kairos-src-btn-gap`, `--kairos-src-btn-icon-gap`
- **States:** Default, PGM, PVW, Hover

#### 8.10 · Tally Indicator
- **CSS Class:** `.kairos-tally-led`, `.kairos-tally-group`
- **Source:** `domain/tally.css`
- **Contracts:** `--kairos-tally-label-gap`, `--kairos-tally-group-gap`
- **States:** PGM (red), PVW (green), Off

#### 8.11 · Multiview Label
- **CSS Class:** `.kairos-mv-label`, `.kairos-mv-cell`, `.kairos-mv-tally`
- **Source:** `domain/multiview.css`
- **Contracts:** `--kairos-mv-label-gap`, `--kairos-mv-label-padding-y/x`, `--kairos-mv-tally-pos`, `--kairos-mv-tally-size`, `--kairos-mv-sm-label-padding-x`
- **Show:** 2×2 or 4×4 multiview grid with tally indicators

#### 8.12 · Segment Control
- **CSS Class:** `.kairos-segment-control`, `.kairos-segment-btn`
- **Source:** `domain/segment.css`
- **Contracts:** `--kairos-segment-btn-padding-y/x`, `--kairos-segment-sm-padding-y/x`
- **States:** Selected, Unselected
- **Variants:** Default, SM

#### 8.13 · Rundown Item
- **CSS Class:** `.kairos-rundown-item`, `.kairos-rundown-tc`
- **Source:** `domain/rundown.css`
- **Contracts:** `--kairos-rundown-item-padding-y/x`, `--kairos-rundown-item-gap`, `--kairos-rundown-compact-padding-y/x`, `--kairos-rundown-tc-w`
- **States:** Default, Active (on-air), Next, Played
- **Variants:** Default, Compact

#### 8.14 · Ticker / Marquee
- **CSS Class:** `.kairos-ticker`, `.kairos-ticker-track`, `.kairos-marquee`
- **Source:** `domain/ticker.css`
- **Contracts:** `--kairos-ticker-padding-y`, `--kairos-ticker-track-gap`, `--kairos-ticker-item-gap`, `--kairos-ticker-item-margin`, `--kairos-ticker-label-gap`, `--kairos-ticker-label-padding-x`, `--kairos-marquee-padding`, `--kairos-marquee-text-padding-right`, `--kairos-ticker-speed`, `--kairos-ticker-gap`

#### 8.15 · Property Row
- **CSS Class:** `.kairos-prop-row`, `.kairos-prop-label`, `.kairos-prop-value`
- **Source:** `domain/property.css`
- **Contracts:** `--kairos-prop-gap`, `--kairos-prop-padding-y`, `--kairos-prop-compact-gap`, `--kairos-prop-compact-padding-y`, `--kairos-prop-inline-gap`, `--kairos-prop-label-w`
- **Variants:** Default, Compact, Inline

#### 8.16 · Timecode Display
- **CSS Class:** `.kairos-tc`, `.kairos-tc-sm`
- **Source:** Domain patterns
- **Contracts:** `--kairos-tc-gap`, `--kairos-tc-padding-y/x`, `--kairos-tc-sm-padding-y/x`

#### 8.17 · Countdown Timer
- **CSS Class:** `.kairos-countdown`
- **Source:** Domain patterns
- **Contracts:** `--kairos-countdown-gap`, `--kairos-countdown-padding`, `--kairos-countdown-font-size`

#### 8.18 · Device Card
- **CSS Class:** `.kairos-device-card`
- **Source:** Domain patterns
- **Contracts:** `--kairos-device-card-gap`, `--kairos-device-card-padding`, `--kairos-device-body-gap`, `--kairos-device-meta-gap`, `--kairos-device-status-gap`, `--kairos-device-icon-size`

#### 8.19 · Scene Tree
- **CSS Class:** `.kairos-scene-item`
- **Source:** Domain patterns
- **Contracts:** `--kairos-scene-item-gap`, `--kairos-scene-item-padding-y/x`, `--kairos-scene-children-indent`, `--kairos-scene-indent`, indent increments

#### 8.20 · Filter Stack
- **CSS Class:** `.kairos-filter-item`
- **Source:** Domain patterns
- **Contracts:** `--kairos-filter-item-gap`, `--kairos-filter-item-padding-y/x`, `--kairos-filter-params-gap`

#### 8.21 · Event History
- **CSS Class:** `.kairos-event-item`
- **Source:** Domain patterns
- **Contracts:** `--kairos-event-item-gap`, `--kairos-event-item-padding-y/x`, `--kairos-event-time-w`

#### 8.22 · Keyer Panel
- **CSS Class:** `.kairos-keyer`
- **Source:** Domain patterns
- **Contracts:** `--kairos-keyer-head-gap`, `--kairos-keyer-head-padding`, `--kairos-keyer-body-padding`, `--kairos-keyer-body-gap`, `--kairos-keyer-row-gap`, `--kairos-keyer-swatches-gap`, `--kairos-keyer-swatch-size`, `--kairos-keyer-label-w`

#### 8.23 · Crosspoint Cell
- **CSS Class:** `.kairos-crosspoint`
- **Source:** Domain patterns
- **Contracts:** `--kairos-crosspoint-cell-size`, `--kairos-crosspoint-dest-padding-y/x`

#### 8.24 · Aux Bus
- **CSS Class:** `.kairos-aux`
- **Source:** Domain patterns
- **Contracts:** `--kairos-aux-padding`, `--kairos-aux-label-gap`

#### 8.25 · PGM/PVW Buttons
- **CSS Class:** `.kairos-pgm-pvw-btn`
- **Source:** Domain patterns
- **Contracts:** `--kairos-pgm-pvw-gap`, `--kairos-pgm-pvw-padding-y/x`

#### 8.26 · Macro Button
- **CSS Class:** `.kairos-macro-btn`
- **Source:** Domain patterns
- **Contracts:** `--kairos-macro-padding-y/x`, `--kairos-macro-icon-gap`, `--kairos-macro-grid-gap`

#### 8.27 · Fader
- **CSS Class:** `.kairos-fader`
- **Source:** Domain patterns
- **Contracts:** `--kairos-fader-label-gap`, `--kairos-fader-group-gap`

#### 8.28 · Audio Meter (VU)
- **CSS Class:** `.kairos-meter`
- **Source:** Domain patterns
- **Contracts:** `--kairos-meter-padding-y`, `--kairos-meter-label-gap`, `--kairos-meter-group-gap`, `--kairos-vu-seg-width`, `--kairos-vu-channel-gap`

#### 8.29 · Channel Label
- **CSS Class:** `.kairos-channel-label`
- **Source:** Domain patterns
- **Contracts:** `--kairos-channel-label-padding`, `--kairos-channel-label-gap`

#### 8.30 · Router Destination Card
- **CSS Class:** `.kairos-router-card`
- **Source:** Domain patterns
- **Contracts:** `--kairos-router-card-padding`, `--kairos-router-card-section-gap`, `--kairos-router-card-gap`

---

### PHASE 9: LAYOUT & SHELL (L2)
*Purpose: Test the application-level layout components.*

#### 9.01 · App Shell (Top Bar)
- **CSS Class:** `.kairos-top-bar`
- **Source:** `components/layout.css`, `domain/shell.css`
- **Contracts:** `--kairos-top-bar-padding-x`, `--kairos-top-bar-gap`
- **Show:** Logo area, Menu bar items, Status items

#### 9.02 · Status Bar
- **CSS Class:** `.kairos-status-bar`
- **Source:** `components/components-core.css`
- **Contracts:** `--kairos-status-bar-padding-y/x`, `--kairos-status-bar-gap`, `--kairos-status-item-gap`, `--kairos-status-sep-height`
- **Show:** Online status, FPS, Timecode

#### 9.03 · Menu Bar
- **CSS Class:** `.kairos-menu-bar`
- **Source:** `components/navigation.css`
- **Contracts:** `--kairos-menu-bar-item-gap`

#### 9.04 · Panel Header
- **CSS Class:** `.kairos-panel-header`
- **Source:** `components/components-core.css`
- **Contracts:** `--kairos-panel-header-padding-y/x`
- **Show:** With icon, title, action buttons

#### 9.05 · Section Label
- **CSS Class:** `.kairos-section-label`
- **Source:** `components/components-core.css`
- **Contracts:** `--kairos-section-label-gap`, `--kairos-section-label-margin-bottom`

#### 9.06 · List Items
- **CSS Class:** `.kairos-list-item`
- **Contracts:** `--kairos-list-item-padding-y/x`, `--kairos-list-item-gap`, `--kairos-list-section-gap`

---

### PHASE 10: CONTRACTS & INTENTS SYSTEM (L1)
*Purpose: Test the unified API system.*

#### 10.01 · Intents
- **CSS Class:** `.kairos-intent-neutral`, `.kairos-intent-pvw`, `.kairos-intent-pgm`, `.kairos-intent-warning`, `.kairos-intent-info`
- **Source:** `components/contracts.css`
- **Show:** Same button rendered with each intent

#### 10.02 · Variants
- **CSS Class:** `.kairos-variant-solid`, `.kairos-variant-subtle`, `.kairos-variant-outline`, `.kairos-variant-ghost`
- **Source:** `components/contracts.css`
- **Show:** Same intent rendered with each variant

#### 10.03 · Sizes
- **CSS Class:** `.kairos-size-sm`, `.kairos-size-md`, `.kairos-size-lg`
- **Source:** `components/contracts.css`

#### 10.04 · States
- **CSS Class:** `[data-state="disabled"]`, `[data-state="loading"]`, `[data-state="active"]`, `[data-state="selected"]`, `[data-state="open"]`, `[data-state="pressed"]`
- **Source:** `components/contracts.css`
- **Show:** Button in each state

#### 10.05 · Recipes
- **CSS Class:** `.kairos-recipe-action-pvw`, `.kairos-recipe-action-pgm`, `.kairos-recipe-action-neutral`
- **Source:** `components/contracts.css`

---

### PHASE 11: THE CONSTITUTIONAL CRUCIBLE
*Purpose: Stress tests that validate DESIGN-LAWS.md.*

#### 11.01 · LAW-001: Cross-Axis Alignment Test
Place the following in one horizontal flex row and verify zero vertical jumping:
- Button MD
- Text Input
- Settings Select
- Checkbox with label
- Icon Button
- Badge
- Segment Control
- Key Button

#### 11.02 · LAW-002: Optical Center Test
- Icon-only button next to text button (icon must be optically centered)
- Icons inside badges
- Icons inside tabs

#### 11.03 · LAW-004: Typographic Harmony Test
- Button SM + Input SM (must share `text-sm`)
- Button MD + Input MD (must share `text-md`)
- Button LG + Input LG (must share `text-lg`)

#### 11.04 · LAW-009: Zero Radius Audit
- Every component card must show `border-radius: 0` on all Kairos elements
- Dashboard-level cards may use radius (they are not Kairos)

#### 11.05 · LAW-006: Indirection Test
- Show that changing `--kairos-space-md` in `:root` cascades through all components
- Show that per-component override (e.g. `--kairos-btn-padding-x: var(--kairos-space-lg)`) works without breaking other components

---

### PHASE 12: GLOBAL ALIGNMENT TEST
*Purpose: The single most revealing visual test in the entire system.*

One horizontal `display: flex; align-items: center` row containing ALL of the following components simultaneously:

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│  [Button] [  Input  ] [▼ Select] [☑ Checkbox] [◉ Radio] [━━ Switch] [Tag] [Badge]     │
│  [Kbd]  [<code>]  [🔧 Icon Btn]  [Key Btn]  [Segment]  [Stepper]  [Avatar]            │
└────────────────────────────────────────────────────────────────────────────────────────┘
```

**Components in the row (exhaustive):**
1. `kairos-btn` (MD)
2. `kairos-input` (text)
3. `kairos-set-select`
4. `kairos-chk-wrapper` (with label)
5. `kairos-radio-wrapper` (with label)
6. `kairos-switch-wrapper` (with label)
7. `kairos-tag`
8. `kairos-badge`
9. `kairos-kbd`
10. `kairos-code` (inline)
11. `kairos-icon-btn`
12. `kairos-key-btn`
13. `kairos-segment-btn`
14. `kairos-stepper`
15. `kairos-avatar` (SM)

**What this tests:**
- If there is a **1px vertical misalignment** between any two components, it will be immediately visible because they are all side by side.
- This single row replaces over 100 individual alignment reviews.
- Any component that "jumps" vertically reveals a broken `control-*` height contract or a padding mismatch.

**Variants of this row:**
- Row A: All components at `control-md` (36px) — the default row.
- Row B: All components at `control-sm` (32px) — compact variant.
- Row C: All components at `control-lg` (48px) — large variant.

---

### PHASE 13: TOKEN STRESS TEST
*Purpose: Prove that the contract system is mathematically robust under perturbation.*

This section applies **systematic scaling** to core tokens and displays the result. The user can see instantly whether all components respond proportionally or whether any component breaks.

**Test Matrix:**

| Test | Token Modified | Scale Factor | Expected Result |
|------|---------------|-------------|------------------|
| S-01 | `--kairos-space-md` | × 0.8 (10px) | All components shrink uniformly |
| S-02 | `--kairos-space-md` | × 1.2 (14px) | All components grow uniformly |
| S-03 | `--kairos-control-md` | × 0.9 (32px) | All MD controls shrink uniformly |
| S-04 | `--kairos-control-md` | × 1.1 (40px) | All MD controls grow uniformly |
| S-05 | `--kairos-text-md` | × 0.85 (12px) | All body text shrinks, controls remain aligned |
| S-06 | `--kairos-text-md` | × 1.15 (16px) | All body text grows, controls remain aligned |
| S-07 | `--kairos-border-base` | × 2 (2px) | All borders thicken, layout does not break |

**Implementation:**
Each test is a button that applies the override to `:root`. The same "Global Alignment Row" from Phase 12 is duplicated inside this section so you can see the effect on real components.

**Pass criteria:** Components scale proportionally. No overlapping. No clipping. No misalignment.
**Fail criteria:** Any component stays unchanged, clips its content, or misaligns from its neighbors → a hardcoded value exists → a LAW-006 violation.

---

### PHASE 14: DEPENDENCY VISUALIZATION
*Purpose: Show which Foundation tokens each component depends on, so any future token change can be impact-assessed instantly.*

This section renders a tree diagram for every major component, showing which Foundation-level tokens feed into it.

**Format:**
```
Button
 ├── Colors ─── --kairos-bg-surface, --kairos-border, --kairos-text
 ├── Typography ─── --kairos-text-md, --kairos-weight-bold
 ├── Spacing ─── --kairos-btn-padding-y → --kairos-space-xs
 │               --kairos-btn-padding-x → --kairos-space-md
 │               --kairos-btn-icon-gap  → --kairos-space-2xs
 ├── Motion ─── --kairos-motion-fast
 ├── Border ─── --kairos-border-base
 ├── Focus ─── --kairos-focus-base
 └── Height ─── --kairos-control-md (36px)

Dropdown
 ├── Colors ─── --kairos-bg-input, --kairos-border
 ├── Typography ─── --kairos-text-md
 ├── Spacing ─── --kairos-dropdown-item-padding-y → --kairos-space-xs
 │               --kairos-dropdown-item-padding-x → --kairos-space-md
 ├── Motion ─── --kairos-motion-normal
 ├── Shadow ─── --kairos-shadow-dropdown
 ├── Z-Index ─── --kairos-z-dropdown (50)
 └── Children ─── Dropdown Item, Dropdown Divider

Modal
 ├── Colors ─── --kairos-bg-surface, --kairos-border-active
 ├── Typography ─── --kairos-text-md, --kairos-text-lg
 ├── Spacing ─── --kairos-modal-padding → --kairos-space-xl
 │               --kairos-modal-section-gap → --kairos-space-md
 │               --kairos-modal-action-gap → --kairos-space-xs
 ├── Motion ─── --kairos-motion-overlay
 ├── Border ─── --kairos-border-thick
 ├── Shadow ─── --kairos-shadow-modal
 ├── Z-Index ─── --kairos-z-modal (100)
 └── Children ─── Button, Heading, Divider, Overlay/Backdrop

Accordion
 ├── Colors ─── --kairos-bg-surface, --kairos-border
 ├── Typography ─── --kairos-text-md, --kairos-weight-bold
 ├── Spacing ─── --kairos-accordion-trigger-padding → --kairos-space-md
 │               --kairos-accordion-panel-padding → --kairos-space-md
 │               --kairos-accordion-gap → --kairos-border-base
 ├── Motion ─── --kairos-motion-medium
 └── Children ─── Icon (caret)

Table
 ├── Colors ─── --kairos-bg-surface, --kairos-border-muted
 ├── Typography ─── --kairos-text-md, --kairos-weight-bold (th)
 ├── Spacing ─── --kairos-table-cell-padding-y → --kairos-space-xs
 │               --kairos-table-cell-padding-x → --kairos-space-md
 ├── Border ─── --kairos-border-base
 └── Height ─── --kairos-control-md (row height)

Bus Bar
 ├── Colors ─── --kairos-status-pgm, --kairos-status-pvw
 ├── Typography ─── --kairos-text-sm, --kairos-weight-bold
 ├── Spacing ─── --kairos-bus-btn-padding-y → --kairos-space-3xs
 │               --kairos-bus-btn-padding-x → --kairos-space-xs
 │               --kairos-bus-btn-gap → --kairos-space-3xs
 │               --kairos-bus-row-gap → --kairos-space-3xs
 ├── Border ─── --kairos-border-base
 └── Children ─── Bus Button, Bus Label, Tally LED

Toast
 ├── Colors ─── --kairos-bg-surface, status colors
 ├── Typography ─── --kairos-text-md, --kairos-weight-bold
 ├── Spacing ─── --kairos-toast-padding-y → --kairos-space-xs
 │               --kairos-toast-padding-x → --kairos-space-md
 │               --kairos-toast-icon-gap → --kairos-space-3xs
 ├── Motion ─── --kairos-motion-overlay
 ├── Shadow ─── --kairos-shadow-dropdown
 ├── Z-Index ─── --kairos-z-toast (9000)
 └── Children ─── Icon, Close Button

Tabs
 ├── Colors ─── --kairos-bg-surface-alt, --kairos-border
 ├── Typography ─── --kairos-text-md, --kairos-weight-bold
 ├── Spacing ─── --kairos-tab-padding-y → --kairos-space-xs
 │               --kairos-tab-padding-x → --kairos-space-md
 │               --kairos-tab-gap → --kairos-space-3xs
 ├── Motion ─── --kairos-motion-normal
 ├── Border ─── --kairos-border-base (active indicator)
 └── Height ─── --kairos-control-md

Rundown
 ├── Colors ─── --kairos-bg-surface, status colors
 ├── Typography ─── --kairos-text-md, --kairos-font-mono (TC)
 ├── Spacing ─── --kairos-rundown-item-padding-y → --kairos-space-xs
 │               --kairos-rundown-item-padding-x → --kairos-space-md
 │               --kairos-rundown-item-gap → --kairos-space-md
 ├── Border ─── --kairos-border-base
 └── Children ─── Badge (status), Timecode

Command Palette
 ├── Colors ─── --kairos-bg-input, --kairos-border
 ├── Typography ─── --kairos-text-md
 ├── Spacing ─── --kairos-command-padding → --kairos-space-md
 │               --kairos-command-gap → --kairos-space-xs
 ├── Shadow ─── --kairos-shadow-modal
 ├── Z-Index ─── --kairos-z-modal (100)
 └── Children ─── Input, List Items, Kbd (shortcuts)
```

**Why this matters:**
If you change `--kairos-space-md` from 12px to 16px, you can look at this section and instantly know that Button, Dropdown, Modal, Table, Rundown, Command Palette, and 20+ other components will be affected. No guessing. No debugging. Pure architectural transparency.

---

## 3. Execution Protocol

### 3.1 Build Order
We build **one phase at a time**. After each phase:
1. I commit the HTML to `calibration/master-dashboard.html`.
2. You open it in the browser and visually inspect.
3. You tell me which components look wrong (if any).
4. I trace the issue to the contract token in `components.css` and fix it.
5. We move to the next phase.

### 3.2 Phase Dependencies
```
Phase 1 (Foundation)  → No dependencies
Phase 2 (Content)     → Requires Phase 1
Phase 3 (Input)       → Requires Phase 1
Phase 4 (Feedback)    → Requires Phase 1
Phase 5 (Overlays)    → Requires Phase 1
Phase 6 (Navigation)  → Requires Phase 2
Phase 7 (Composite)   → Requires Phase 3, 4
Phase 8 (Domain)      → Requires Phase 3
Phase 9 (Layout)      → Requires Phase 6, 8
Phase 10 (Contracts)  → Requires Phase 3
Phase 11 (Crucible)   → Requires ALL previous phases
Phase 12 (Alignment)  → Requires Phase 3, 4, 8
Phase 13 (Stress)     → Requires Phase 12
Phase 14 (Dependency) → Requires ALL previous phases
```

### 3.3 Quality Gates
Before a phase is considered DONE:
- [ ] Every component in the phase renders without console errors.
- [ ] Every component shows ALL states listed in this plan.
- [ ] No inline styles on Kairos elements (only Kairos classes).
- [ ] Visual alignment matches `VISUAL-CONTRACTS.md` specifications.
- [ ] LAW-009 (zero radius) verified on all rendered elements.

---

## 4. Statistics

| Metric | Count |
|--------|-------|
| Total Phases | **14** |
| Foundation tokens | 9 sections |
| Generic Components | ~40 |
| Domain Components | ~30 |
| Constitutional Tests | 5 |
| Global Alignment Rows | 3 (SM, MD, LG) |
| Token Stress Tests | 7 |
| Dependency Trees | 10 |
| Live Override Tokens | 14 |
| **Total items to build** | **~84 components + 25 tests** |
| Contract tokens in `components.css` | **~250** |
| CSS source files covered | **63** |

---

*This plan was derived from:*
- [kairos.css](file:///c:/Users/WorkStation/Desktop/kairos-v01/src/kairos.css) — Master import order
- [components.css](file:///c:/Users/WorkStation/Desktop/kairos-v01/src/components/components.css) — All 250+ contract tokens
- [contracts.css](file:///c:/Users/WorkStation/Desktop/kairos-v01/src/components/contracts.css) — Intent/Variant/Size/State system
- [DESIGN-SCALE.md](file:///c:/Users/WorkStation/Desktop/kairos-v01/DESIGN-SCALE.md) — Token ontology
- [DESIGN-LAWS.md](file:///c:/Users/WorkStation/Desktop/kairos-v01/DESIGN-LAWS.md) — 9 constitutional laws
- [VISUAL-CONTRACTS.md](file:///c:/Users/WorkStation/Desktop/kairos-v01/VISUAL-CONTRACTS.md) — Per-component spacing matrix
- [VISUAL-CALIBRATION-QUEUE.md](file:///c:/Users/WorkStation/Desktop/kairos-v01/VISUAL-CALIBRATION-QUEUE.md) — Prioritized calibration queue
- [CALIBRATION-LOG.md](file:///c:/Users/WorkStation/Desktop/kairos-v01/CALIBRATION-LOG.md) — Migration history
