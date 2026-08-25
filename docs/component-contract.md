# Kairos Component Contract

## Golden Rule

Every component that enters the Kairos framework MUST implement the following layers.
If a component does not satisfy these requirements, it MUST NOT be merged.

---

## Required Layers

### 1. Intent
Semantic color identity. Every component consumes `--kairos-comp-*` variables.

| Class                    | Purpose                |
| ------------------------ | ---------------------- |
| `.kairos-intent-neutral` | Default steel/gray     |
| `.kairos-intent-pvw`     | Preview / Success      |
| `.kairos-intent-pgm`     | Program / Error        |
| `.kairos-intent-warning`  | Warning               |
| `.kairos-intent-info`     | Informational          |

### 2. Variant
Visual rendering style.

| Class                     | Purpose                          |
| ------------------------- | -------------------------------- |
| `.kairos-variant-solid`   | Filled background, colored text  |
| `.kairos-variant-subtle`  | Tinted background, colored text  |
| `.kairos-variant-outline` | Transparent bg, colored border   |
| `.kairos-variant-ghost`   | No border, no bg, colored text   |

### 3. Size
Spacing and font size.

| Class             | Padding Y             | Padding X              |
| ----------------- | --------------------- | ---------------------- |
| `.kairos-size-sm` | `--kairos-space-extra-tight` (2px) | `--kairos-space-compact` (6px) |
| `.kairos-size-md` | `--kairos-space-compact` (6px)     | `--kairos-space-standard` (12px) |
| `.kairos-size-lg` | `--kairos-space-standard` (12px)   | `--kairos-space-loose` (24px) |

### 4. State
Interaction and lifecycle state via `data-state` attributes.

| Attribute                    | Purpose                     |
| ---------------------------- | --------------------------- |
| `data-state="active"`        | Currently active/selected   |
| `data-state="selected"`      | Explicitly selected         |
| `data-state="disabled"`      | Non-interactive             |
| `data-state="loading"`       | Awaiting async operation    |
| `data-state="open"`          | Expanded/visible            |
| `data-state="pressed"`       | Toggle is ON                |
| `[disabled]`                 | Native HTML disabled        |
| `[aria-selected="true"]`     | ARIA selected               |
| `[aria-pressed="true"]`      | ARIA toggle pressed         |
| `[aria-invalid="true"]`      | ARIA validation error       |

---

## CSS Variable Consumption

Every component MUST consume the contract variables with fallbacks:

```css
.kairos-[component] {
  background: var(--kairos-comp-current-bg, [default]);
  border-color: var(--kairos-comp-current-border, [default]);
  color: var(--kairos-comp-current-text, [default]);
  padding: var(--kairos-comp-padding-y, [default]) var(--kairos-comp-padding-x, [default]);
  font-size: var(--kairos-comp-font-size, [default]);
}
```

This pattern ensures components work standalone (with fallbacks) AND respond to contract modifiers when applied.

---

## Data Attributes

All interactive behavior MUST use `data-kairos-*` attributes:

| Attribute               | Purpose                          |
| ----------------------- | -------------------------------- |
| `data-kairos-toggle`    | Toggle visibility of a target    |
| `data-kairos-dismiss`   | Close/remove the parent overlay  |
| `data-kairos-target`    | ID reference to target element   |
| `data-state`            | Component state management       |

---

## Accessibility

Every interactive component MUST:

1. Be keyboard focusable (`tabindex="0"` or native focusable element)
2. Have `:focus-visible` styles using `--kairos-focus-ring-*` tokens
3. Use appropriate ARIA attributes (`aria-expanded`, `aria-selected`, etc.)
4. Support `[disabled]` with `opacity: 0.4` and `pointer-events: none`

---

## Naming Convention

```
.kairos-[component]                    → Base class
.kairos-[component]-[element]          → Child element
.kairos-intent-[name]                  → Intent modifier
.kairos-variant-[name]                 → Variant modifier
.kairos-size-[name]                    → Size modifier
.kairos-recipe-[name]                  → Pre-composed shortcut
data-state="[state]"                   → State attribute
```

---

## Component Checklist

Before merging any component, verify:

- [ ] Consumes `--kairos-comp-current-*` variables with fallbacks
- [ ] Supports all 5 intents
- [ ] Supports at least `solid` and `outline` variants
- [ ] Supports `sm`, `md`, `lg` sizes
- [ ] Supports `disabled`, `active`, `loading` states
- [ ] Has `:focus-visible` styling
- [ ] Uses `data-kairos-*` attributes for JS behavior
- [ ] Uses semantic spacing tokens (not raw px values)
- [ ] All class names start with `kairos-`
- [ ] Has a pattern HTML documentation page
