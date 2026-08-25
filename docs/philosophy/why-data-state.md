# Why Explicit Data States Are Mandatory

In Kairos, every stateful component must explicitly declare its state. For example, a closed modal must have `data-state="closed"`. It is illegal to assume that the absence of a `data-state` attribute means "closed."

## Why?
1. **Deterministic Styling:** CSS attribute selectors like `[data-state="closed"]` are robust. Relying on `:not([data-state="open"])` creates weak specificity chains that can break unexpectedly and are harder to debug.
2. **Animation Lifecycles:** Framework-agnostic animations require clean transitions. Moving from `closed` to `opening` to `open` gives us explicit hooks for `transitionend` events to fire reliably. Implicit states make lifecycle tracking messy.
3. **Self-Documenting HTML:** When an engineer looks at the DOM tree, they shouldn't have to guess what the default state of a component is. `data-state="closed"` immediately signals the developer's intent and the component's current mode.
