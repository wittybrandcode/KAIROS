# KAIROS DEPENDENCY RULES

> **This document is LAW.**
>
> No pull request, no RFC, no ADR may override these rules.
>
> Any violation is a blocking defect.

---

## The Dependency Direction

```
L0  Foundation
     │
     ▼
L1  Contracts
     │
     ▼
L2  Layout Primitives
     │
     ▼
L3  Content Primitives
     │
     ▼
L4  Input Primitives
     │
     ▼
L5  Feedback Primitives
     │
     ▼
L6  Overlay Primitives
     │
     ▼
L7  Navigation Primitives
     │
     ▼
L8  Composite Components
     │
     ▼
L9  Domain Components
```

---

## The Rule

> **A layer may depend ONLY on layers BELOW it.**
>
> **A layer may NEVER depend on a layer ABOVE it or a layer AT the same level.**

---

## What This Means

| Layer | May Import From | May NOT Import From |
|---|---|---|
| L0 Foundation | Nothing | Everything |
| L1 Contracts | L0 | L2–L9 |
| L2 Layout | L0, L1 | L3–L9 |
| L3 Content | L0, L1, L2 | L4–L9 |
| L4 Input | L0, L1, L2, L3 | L5–L9 |
| L5 Feedback | L0, L1, L2, L3, L4 | L6–L9 |
| L6 Overlay | L0, L1, L2, L3, L4, L5 | L7–L9 |
| L7 Navigation | L0–L6 | L8–L9 |
| L8 Composite | L0–L7 | L9 |
| L9 Domain | L0–L8 | Nothing above |

---

## Dependency Violations (Current)

All critical primitive-to-domain dependency violations have been resolved.

---

## Resolved Violations

### [RESOLVED] V-001: Domain in Primitive

```
VIOLATION: buttons.css contains SourceButton, MacroButton,
           TransitionButton, TransportButton, BufferButton,
           SalvoButton, AngleButton, KeyButton.

RULE:      L4 (Input) may not know about L9 (Domain).

FIX:       Moved all 8 broadcast button classes to src/domain/buttons.css.
           buttons.css retains only: Button, IconButton, ButtonGroup.
```

### [RESOLVED] V-002: Domain in Composite

```
VIOLATION: composites.css contains Keyer, Crosspoint, AUX Bus,
           Countdown, Timecode, Device Card, Scene Tree,
           Filter Stack, Event History.

RULE:      L8 (Composite) may not contain L9 (Domain) elements.

FIX:       Moved all 9 broadcast composites to src/domain/composites.css.
```

### [RESOLVED] V-003: Feedback in Content

```
VIOLATION: components-core.css contains Tally LED.

RULE:      L3 (Content) should only contain generic structure, not Broadcast status.

FIX:       Moved .kairos-tally-led to src/domain/tally.css.
```

### [RESOLVED] V-004: Composites in Primitive

```
VIOLATION: primitives.css contains Chip and Avatar.

RULE:      Avatar is a composite of image+badge+status. Chip is input/composite.

FIX:       Moved to src/components/avatar.css and src/components/tag.css.
```

### V-005: Multiple Sources of Truth

```
VIOLATION: Modal, Dropdown, Tabs each have TWO implementations.
           - src/modules/*.ts (light DOM, event delegation)
           - src/components/*/  (Web Component, Shadow DOM)

RULE:      Each concept must have exactly ONE source of truth.

FIX:       Choose ONE implementation per component.
           Deprecate and remove the other.
```

---

## File-to-Layer Mapping

### L0 — Foundation
```
src/foundation/colors.css
src/foundation/typography.css
src/foundation/typography-utils.css
src/foundation/spacing.css
src/foundation/sizes.css
src/foundation/shadows.css
src/foundation/elevation.css
src/foundation/motion.css
src/foundation/animations.css
src/foundation/breakpoints.css
src/foundation/focus.css
src/foundation/cursors.css
src/foundation/reset.css
```

### L1 — Contracts
```
src/components/contracts.css
src/components/components.css        (spacing contracts)
```

### L2 — Layout Primitives
```
src/components/layout.css            (Box, Stack, Cluster, Spacer)
src/components/divider.css           (Divider, Separator)
src/utilities/layout.css             (App Shell, Panels, Grid)
```

### L3 — Content Primitives
```
src/components/components-core.css   (Section Label, Panel Header)
src/components/icons.css
src/components/badge.css
[MISSING] kbd.css
[MISSING] code.css
```

### L4 — Input Primitives
```
src/components/buttons.css           (Button, IconButton, ButtonGroup ONLY)
src/components/forms.css
src/components/slider.css
src/components/stepper.css
src/components/tag-input.css
```

### L5 — Feedback Primitives
```
src/components/loading.css           (Spinner, Skeleton)
src/components/primitives.css        (Progress)
src/components/feedback.css          (Toast fixed, Flash, Log Filter)
src/components/progress.css
[MISSING] status-dot.css
[MISSING] indicator.css
[MISSING] empty-state.css
```

### L6 — Overlay Primitives
```
src/components/overlay.css           (Overlay, Backdrop)
src/components/popover.css           (Popover)
[MISSING] surface.css
```

### L7 — Navigation Primitives
```
src/components/navigation.css
src/components/breadcrumb.css
src/components/pagination.css
src/components/tabs.css              (light DOM tab bar)
src/components/tree.css
```

### L8 — Composite Components
```
src/components/overlays.css          (Toast stack, Alert, Tooltip, Modal form)
src/components/accordion.css
src/components/carousel.css
src/components/command.css
src/components/sidebar.css
src/components/table.css
src/components/split-grid.css
src/components/modal/               (Web Component)
src/components/dropdown/            (Web Component)
src/components/tabs/                (Web Component)
src/components/split-panel/         (Web Component)
src/modules/                        (Behavior modules)
```

### L9 — Domain Components
```
src/domain/bus.css
src/domain/source-tag.css
src/domain/property.css
src/domain/multiview.css
src/domain/production.css
src/domain/shell.css
src/domain/rundown.css
src/domain/segment.css
src/domain/ticker.css
src/domain/ui-patterns.css
[SHOULD MOVE HERE] Domain buttons from buttons.css
[SHOULD MOVE HERE] Domain composites from composites.css
```

---

## Import Order in kairos.css

The import order in `src/kairos.css` MUST follow the dependency direction exactly:

```css
/* L0 */ @import './foundation/...';
/* L1 */ @import './components/contracts.css';
/* L1 */ @import './components/components.css';
/* L2 */ @import './components/layout.css';
/* L2 */ @import './components/divider.css';
/* L3 */ @import './components/components-core.css';
/* L3 */ @import './components/icons.css';
/* L3 */ @import './components/badge.css';
/* L4 */ @import './components/buttons.css';
/* L4 */ @import './components/forms.css';
/* L4 */ @import './components/slider.css';
/* L4 */ @import './components/stepper.css';
/* L4 */ @import './components/tag-input.css';
/* L5 */ @import './components/loading.css';
/* L5 */ @import './components/primitives.css';
/* L5 */ @import './components/progress.css';
/* L5 */ @import './components/feedback.css';
/* L6 */ @import './components/overlay.css';
/* L6 */ @import './components/popover.css';
/* L7 */ @import './components/navigation.css';
/* L7 */ @import './components/breadcrumb.css';
/* L7 */ @import './components/pagination.css';
/* L7 */ @import './components/tabs.css';
/* L7 */ @import './components/tree.css';
/* L8 */ @import './components/overlays.css';
/* L8 */ @import './components/accordion.css';
/* L8 */ @import './components/carousel.css';
/* L8 */ @import './components/command.css';
/* L8 */ @import './components/sidebar.css';
/* L8 */ @import './components/table.css';
/* L8 */ @import './components/split-grid.css';
/* L8 */ @import './components/composites.css';
/* L9 */ @import './domain/...';
```

---

## Enforcement

1. **Code Review**: Every PR must be checked against this dependency map.
2. **Linting**: A future CI check should verify that no file imports from a higher layer.
3. **ADR**: Any exception to these rules requires a formal ADR with justification.
4. **Naming**: File names must reflect their layer. Domain files live in `src/domain/`. Primitive files live in `src/components/`.

---

## One Sentence

> **Dependencies flow downward. Never upward. Never sideways. No exceptions.**
