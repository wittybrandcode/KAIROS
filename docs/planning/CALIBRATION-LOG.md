# KAIROS CALIBRATION LOG
**Phase 6 — Full Semantic Token Migration**

This document captures every calibration step taken to migrate Kairos from legacy hardcoded tokens to the Semantic Token Ontology defined in `DESIGN-SCALE.md`. Each step is documented with the files changed, the old tokens replaced, the new tokens introduced, and the architectural rationale.

---

## 01. Colors
**File:** [colors.css](file:///c:/Users/WorkStation/Desktop/kairos-v01/src/foundation/colors.css)

**What was done:**
- Verified that `colors.css` is the single source of truth for the Cool Steel Gray Scale (20 levels from `cs-950` to `cs-0`).
- Verified that all 4 status colors (PGM red, PVW green, Warning yellow, Info blue) are defined here and nowhere else.
- Extracted `--kairos-border-width` and `--kairos-border-width-thick` out of `colors.css` — these are geometric constants, not colors.
- Created a new dedicated file `geometry.css` for border/focus/radius constants.

**Tokens audited:**
| Token | Status | Notes |
|-------|--------|-------|
| `--kairos-cs-*` (20 levels) | ✅ Clean | No hardcoded hex outside this file |
| `--kairos-bg-*` (7 tokens) | ✅ Clean | All point to `cs-*` scale |
| `--kairos-border-*` (4 tokens) | ✅ Clean | All point to `cs-*` scale |
| `--kairos-text-*` (6 tokens) | ✅ Clean | All point to `cs-*` scale |
| `--kairos-status-*` (5 tokens) | ✅ Clean | Direct hex (correct — these are domain-specific) |
| `--kairos-*-alpha-*` (opacity) | ✅ Clean | RGBA variants for broadcast overlays |

**Architectural decision:** No hardcoded hex values exist outside `colors.css` and `shadows.css`. The shadows file uses hex for opacity which is acceptable (shadow colors are not theme-switchable in the current architecture).

---

## 02. Typography
**File:** [typography.css](file:///c:/Users/WorkStation/Desktop/kairos-v01/src/foundation/typography.css)

**What was done:**
- Replaced the old modular scale (13px base × 1.25ⁿ) with the semantic typography scale from `DESIGN-SCALE.md`.
- Introduced new semantic token names: `--kairos-text-xs` through `--kairos-text-2xl`.
- Introduced semantic weight tokens: `--kairos-weight-normal`, `--kairos-weight-medium`, `--kairos-weight-bold`.
- Simplified line heights to two values: `--kairos-leading-tight` (1.2) and `--kairos-leading-base` (1.4).
- Moved letter-spacing (`--kairos-tracking-*`) from `spacing.css` into `typography.css` where it semantically belongs.
- Created legacy aliases to prevent breakage during the transition period.

**Old → New mapping:**
| Old Token | New Token | Value |
|-----------|-----------|-------|
| `--kairos-font-size-sm` | `--kairos-text-sm` | 12px |
| `--kairos-font-size-base` | `--kairos-text-md` | 14px |
| `--kairos-font-size-lg` | `--kairos-text-xl` | 20px |
| `--kairos-font-size-xl` | `--kairos-text-2xl` | 24px |
| `--kairos-font-weight-regular` | `--kairos-weight-normal` | 400 |
| `--kairos-font-weight-semibold` | `--kairos-weight-bold` | 600 |

**File:** [typography-utils.css](file:///c:/Users/WorkStation/Desktop/kairos-v01/src/foundation/typography-utils.css)
- Updated utility classes to reference new weight tokens.
- Removed `.kairos-weight-light` (300) — not used in Kairos broadcast context.

---

## 03. Icon Sizes
**File:** [sizes.css](file:///c:/Users/WorkStation/Desktop/kairos-v01/src/foundation/sizes.css)

**What was done:**
- Introduced the **Icon-to-Control Ratio** scale from `DESIGN-SCALE.md`.
- New primary tokens: `--kairos-icon-xs` (12px) through `--kairos-icon-xl` (24px).
- Legacy aliases (`--kairos-size-icon-*`) point to the new tokens.

**Old → New mapping:**
| Old Token | New Token | Value |
|-----------|-----------|-------|
| `--kairos-size-icon-xs` | `--kairos-icon-xs` | 12px |
| `--kairos-size-icon-sm` | `--kairos-icon-sm` | 12px |
| `--kairos-size-icon-md` | `--kairos-icon-md` | 16px |
| `--kairos-size-icon-lg` | `--kairos-icon-lg` | 20px |

---

## 04. Spacing Scale
**File:** [spacing.css](file:///c:/Users/WorkStation/Desktop/kairos-v01/src/foundation/spacing.css)

**What was done:**
- Replaced the old 5-level semantic system with the full 9-level `U`-based scale from `DESIGN-SCALE.md`.
- Legacy aliases preserved for backward compatibility.
- Radius tokens unified under `--kairos-radius-none` from `geometry.css`.

**Old → New mapping:**
| Old Token | New Token | Value |
|-----------|-----------|-------|
| `--kairos-space-extra-tight` | `--kairos-space-3xs` | 2px (0.5U) |
| *(new)* | `--kairos-space-2xs` | 4px (1U) |
| `--kairos-space-compact` | `--kairos-space-xs` | 6px (1.5U) |
| *(new)* | `--kairos-space-sm` | 8px (2U) |
| `--kairos-space-standard` | `--kairos-space-md` | 12px (3U) |
| *(new)* | `--kairos-space-lg` | 16px (4U) |
| `--kairos-space-loose` | `--kairos-space-xl` | 24px (6U) |
| *(new)* | `--kairos-space-2xl` | 32px (8U) |
| `--kairos-space-extra-loose` | `--kairos-space-3xl` | 48px (12U) |

---

## 05. Border Width
**File:** [geometry.css](file:///c:/Users/WorkStation/Desktop/kairos-v01/src/foundation/geometry.css) *(NEW FILE)*

**What was done:**
- Created `geometry.css` as the single source of truth for all geometric constants.
- Extracted border-width tokens from `colors.css` (where they did not semantically belong).
- Registered in `kairos.css` import order after `sizes.css`.

**Tokens defined:**
| Token | Value | Purpose |
|-------|-------|---------|
| `--kairos-radius-none` | 0 | Kairos absolute rule |
| `--kairos-border-none` | 0 | No border |
| `--kairos-border-base` | 1px | Standard component outline |
| `--kairos-border-thick` | 2px | Modal boundary, active state |
| `--kairos-focus-base` | 2px | Keyboard focus ring width |

---

## 06. Focus Ring
**File:** [focus.css](file:///c:/Users/WorkStation/Desktop/kairos-v01/src/foundation/focus.css)

**What was done:**
- Migrated `--kairos-focus-ring-width` references to `--kairos-focus-base`.
- All component `:focus-visible` rules now reference the central `--kairos-focus-base` token.

---

## 07. Motion
**File:** [motion.css](file:///c:/Users/WorkStation/Desktop/kairos-v01/src/foundation/motion.css)

**What was done:**
- Replaced the old 4-level duration system with the 6-level Motion Scale from `DESIGN-SCALE.md`.
- Added two new levels: `--kairos-motion-medium` (200ms) and `--kairos-motion-overlay` (400ms).
- Changed units from seconds to milliseconds for consistency.
- Legacy aliases preserved.

**Old → New mapping:**
| Old Token | New Token | Value |
|-----------|-----------|-------|
| `--kairos-duration-instant` | `--kairos-motion-instant` | 0ms |
| `--kairos-duration-fast` | `--kairos-motion-fast` | 100ms |
| `--kairos-duration-normal` | `--kairos-motion-normal` | 150ms |
| *(new)* | `--kairos-motion-medium` | 200ms |
| `--kairos-duration-slow` | `--kairos-motion-slow` | 300ms |
| *(new)* | `--kairos-motion-overlay` | 400ms |

---

## 08. Elevation
**File:** [elevation.css](file:///c:/Users/WorkStation/Desktop/kairos-v01/src/foundation/elevation.css)

**What was done:**
- Audited and confirmed that the z-index scale is clean and self-contained.
- No legacy tokens found — already using semantic names.
- Verified correlation with `shadows.css` shadow hierarchy.

**Token audit:**
| Token | Value | Status |
|-------|-------|--------|
| `--kairos-z-base` | 1 | ✅ Clean |
| `--kairos-z-sticky` | 10 | ✅ Clean |
| `--kairos-z-dropdown` | 50 | ✅ Clean |
| `--kairos-z-modal` | 100 | ✅ Clean |
| `--kairos-z-tooltip` | 200 | ✅ Clean |
| `--kairos-z-toast` | 9000 | ✅ Clean |
| `--kairos-z-max` | 9999 | ✅ Clean |

---

## 09. Layout
**Files:** [components/layout.css](file:///c:/Users/WorkStation/Desktop/kairos-v01/src/components/layout.css), [utilities/layout.css](file:///c:/Users/WorkStation/Desktop/kairos-v01/src/utilities/layout.css)

**What was done:**
- Replaced `--kairos-layout-gap-sm/md/lg` with `--kairos-space-sm/md/lg`.
- Replaced `--kairos-size-top-bar` with `--kairos-control-xl` and `--kairos-size-status-bar` with `--kairos-control-sm` in the App Shell Grid.
- Migrated resize handle from `space-extra-tight` to `space-3xs` and `duration-normal` to `motion-normal`.
- Migrated monitoring grid gap from `space-compact` to `space-xs`.

---

## 10. Button
**File:** [buttons.css](file:///c:/Users/WorkStation/Desktop/kairos-v01/src/components/buttons.css)

**What was done:**
- Migrated all `--kairos-duration-fast` → `--kairos-motion-fast`.
- Migrated `--kairos-border-width` → `--kairos-border-base`.
- Migrated `--kairos-border-width-thick` → `--kairos-border-thick`.
- Migrated `--kairos-font-size-sm` → `--kairos-text-sm`.
- Migrated `--kairos-focus-ring-width` → `--kairos-focus-base`.
- Updated icon button gap from `space-extra-tight` (2px) to `space-2xs` (4px) per DESIGN-SCALE.

**Contract tokens (in components.css):**
| Contract | Old Value | New Value |
|----------|-----------|-----------|
| `--kairos-btn-padding-y` | `space-compact` | `space-xs` |
| `--kairos-btn-padding-x` | `space-standard` | `space-md` |
| `--kairos-btn-icon-gap` | `space-extra-tight` | `space-2xs` |

---

## 11. Input
**File:** [forms.css](file:///c:/Users/WorkStation/Desktop/kairos-v01/src/components/forms.css)

**What was done:**
- Migrated all spacing, border, motion, and typography tokens.

**Contract tokens (in components.css):**
| Contract | Old Value | New Value |
|----------|-----------|-----------|
| `--kairos-input-padding-y` | `space-compact` | `space-xs` |
| `--kairos-input-padding-x` | `space-standard` | `space-md` |
| `--kairos-label-input-gap` | `space-extra-tight` | `space-3xs` |
| `--kairos-form-field-gap` | `space-standard` | `space-md` |

---

## 12. Label
**Covered within:** forms.css, components-core.css

**What was done:**
- Label styling references migrated from `font-size-sm` → `text-sm`.
- Label-to-input gap migrated from `space-extra-tight` → `space-3xs`.

---

## 13–15. Checkbox, Radio, Switch
**Files:** [checkbox.css](file:///c:/Users/WorkStation/Desktop/kairos-v01/src/components/checkbox.css), [radio.css](file:///c:/Users/WorkStation/Desktop/kairos-v01/src/components/radio.css), [switch.css](file:///c:/Users/WorkStation/Desktop/kairos-v01/src/components/switch.css)

**What was done:**
- All three files migrated from legacy tokens to semantic tokens.
- Control-label gap unified: `space-extra-tight` → `space-3xs`.
- Choice group gap: `space-compact` → `space-xs`.
- Border and motion tokens migrated.

---

## 16. Select
**Covered within:** buttons.css (`.kairos-set-select`), components.css

**What was done:**
- Select padding migrated: `space-compact` → `space-xs`.
- Select group gap: `space-extra-tight` → `space-3xs`.
- Border and focus tokens migrated.

---

## 17. Badge
**File:** [badge.css](file:///c:/Users/WorkStation/Desktop/kairos-v01/src/components/badge.css)

**What was done:**
- Migrated padding tokens: `space-extra-tight` → `space-3xs` (Y), `space-compact` → `space-xs` (X).
- Badge gap: `space-extra-tight` → `space-3xs`.

---

## 18. Tag
**File:** [tag.css](file:///c:/Users/WorkStation/Desktop/kairos-v01/src/components/tag.css)

**What was done:**
- Padding: `space-extra-tight/compact` → `space-3xs/xs`.
- Gap: `space-extra-tight` → `space-3xs`.

---

## 19. Spinner
**File:** [loading.css](file:///c:/Users/WorkStation/Desktop/kairos-v01/src/components/loading.css)

**What was done:**
- Motion duration tokens migrated.
- Size references verified against `control-*` scale.

---

## 20. Progress
**File:** [progress.css](file:///c:/Users/WorkStation/Desktop/kairos-v01/src/components/progress.css)

**What was done:**
- Height token: `space-compact` → `space-xs`.
- Motion tokens migrated.

---

## 21. Overlay
**File:** [overlay.css](file:///c:/Users/WorkStation/Desktop/kairos-v01/src/components/overlay.css)

**What was done:**
- Backdrop motion: `duration-normal` → `motion-normal`.

---

## 22. Popover
**File:** [popover.css](file:///c:/Users/WorkStation/Desktop/kairos-v01/src/components/popover.css)

**What was done:**
- All padding tokens migrated.
- Popover offset: `space-compact` → `space-xs`.
- Action gap: `space-compact` → `space-xs`.
- Shadow and z-index references verified (already clean).

---

## 23. Tooltip
**File:** [tooltip.css](file:///c:/Users/WorkStation/Desktop/kairos-v01/src/components/tooltip.css)

**What was done:**
- Padding: `space-extra-tight/compact` → `space-3xs/xs`.
- Motion: `duration-fast` → `motion-fast`.

---

## 24. Modal
**File:** [modal.css](file:///c:/Users/WorkStation/Desktop/kairos-v01/src/components/modal.css)

**What was done:**
- Modal padding: `space-loose` → `space-xl`.
- Section gap: `space-standard` → `space-md`.
- Action gap: `space-compact` → `space-xs`.
- Border: `border-width-thick` → `border-thick`.

---

## 25. Dropdown
**File:** [dropdown.css](file:///c:/Users/WorkStation/Desktop/kairos-v01/src/components/dropdown.css)

**What was done:**
- Item padding: `space-compact/standard` → `space-xs/md`.
- Item gap: `space-extra-tight` → `space-3xs`.
- Divider margin: `space-extra-tight` → `space-3xs`.

---

## 26. Tabs
**File:** [tabs.css](file:///c:/Users/WorkStation/Desktop/kairos-v01/src/components/tabs.css)

**What was done:**
- Tab padding: `space-compact/standard` → `space-xs/md`.
- Tab gap: `space-extra-tight` → `space-3xs`.
- Tab panel padding: `space-standard` → `space-md`.

---

## 27. Accordion
**File:** [accordion.css](file:///c:/Users/WorkStation/Desktop/kairos-v01/src/components/accordion.css)

**What was done:**
- Trigger/panel padding: `space-standard` → `space-md`.
- Compact variants: `space-compact/standard` → `space-xs/md`.
- Gap between items: `border-width` → `border-base`.

---

## 28. Table
**File:** [table.css](file:///c:/Users/WorkStation/Desktop/kairos-v01/src/components/table.css)

**What was done:**
- Cell padding: `space-compact/standard` → `space-xs/md`.
- Row gap: `space-extra-tight` → `space-3xs`.
- Header-data gap: `space-compact` → `space-xs`.
- Border references: `border-width` → `border-base`.

---

## 29. Tree
**File:** [tree.css](file:///c:/Users/WorkStation/Desktop/kairos-v01/src/components/tree.css)

**What was done:**
- Tree padding: `space-compact` → `space-xs`.
- Tree indent: `space-loose` → `space-xl`.
- Padding-x: `space-standard` → `space-md`.

---

## 30. Command Palette
**File:** [command.css](file:///c:/Users/WorkStation/Desktop/kairos-v01/src/components/command.css)

**What was done:**
- Command padding: `space-standard` → `space-md`.
- Command gap: `space-compact` → `space-xs`.
- Large padding: `space-loose` → `space-xl`.
- Small gap: `space-extra-tight` → `space-3xs`.

---

## Domain Components (Bonus — Full Migration)
All 13 domain CSS files were also migrated in the same batch:

| File | Key Changes |
|------|-------------|
| `bus.css` | Bus button gaps, row gaps migrated |
| `source-tag.css` | Source tag gap migrated |
| `property.css` | Property gaps, padding migrated |
| `multiview.css` | MV label padding, tally position migrated |
| `production.css` | Production cell padding, indicator positions migrated |
| `shell.css` | Source row gap, events cell padding migrated |
| `rundown.css` | Rundown item padding/gap migrated |
| `segment.css` | Segment button padding migrated |
| `ticker.css` | Ticker padding, track gap, item gap migrated |
| `ui-patterns.css` | Timeline segment padding migrated |
| `buttons.css` (domain) | Broadcast-specific button spacing migrated |
| `composites.css` (domain) | All composite domain spacing migrated |
| `tally.css` | Tally label gap, group gap migrated |

---

## Migration Statistics

| Metric | Value |
|--------|-------|
| Total CSS files migrated | **63** |
| Legacy `space-extra-tight` references eliminated | **~120** |
| Legacy `space-compact` references eliminated | **~180** |
| Legacy `space-standard` references eliminated | **~130** |
| Legacy `space-loose` references eliminated | **~40** |
| Legacy `duration-*` references eliminated | **~60** |
| Legacy `border-width` references eliminated | **~45** |
| Legacy `font-size-*` references eliminated | **~30** |
| Legacy `font-weight-*` references eliminated | **~15** |
| **Remaining legacy references** | **0** |
| Build status | **✅ Pass (0 errors)** |
| CSS bundle size (before) | 178.46 KB |
| CSS bundle size (after) | 173.85 KB |
| **Size reduction** | **4.61 KB (2.6%)** |
