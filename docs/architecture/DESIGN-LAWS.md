# KAIROS DESIGN LAWS
*Constitutional Principles of the Kairos Design Engineering Platform*

These laws are non-negotiable. They define the structural and visual integrity of the framework. Any PR or modification that violates these laws must be rejected.

---

### LAW-001: The Law of Geometric Equality
> **Every control of the same size must have identical height.**
> No exception. A `control-md` Button, Input, Select, and Segmented Control must perfectly align horizontally when placed in a cluster. 

### LAW-002: The Law of Optical Alignment
> **Every icon inside a control must align to the optical center.**
> No exception. Margins, paddings, and flex properties must be calculated to ensure true center alignment, circumventing font baselines if necessary.

### LAW-003: The Law of Spacing Integrity
> **Spacing between icon and text is always defined by the Icon Gap Token.**
> Never hardcoded. `var(--kairos-btn-icon-gap)` governs the space. You may not use `margin-left: 4px` or `&nbsp;`.

### LAW-004: The Law of Typographic Harmony
> **Controls sharing the same semantic level must share typography.**
> A `control-sm` button and a `control-sm` input must use the exact same `text-*` and `weight-*` tokens.

### LAW-005: The Law of Hierarchical Dependency
> **No primitive may depend on a composite.**
> A Button cannot contain CSS that targets a Toolbar. A Toolbar may contain CSS that arranges Buttons. Information flows upward only.

### LAW-006: The Law of Indirection
> **No component may access Foundation tokens directly.**
> Components must only consume Component Contracts (e.g., `var(--kairos-btn-padding-x)`). Component Contracts map to Foundation Tokens (e.g., `var(--kairos-space-md)`). This enables per-component overrides without breaking system architecture.

### LAW-007: The Law of Explicit State
> **Every state must be explicit. No implicit state.**
> Hover, Focus, Active, Disabled, Loading, Selected, Invalid. All must be accounted for and visually distinct in every interactive primitive.

### LAW-008: The Law of Separation of Concerns
> **JS changes state. CSS renders state. DOM stores state.**
> Do not use `element.style` in JavaScript. JavaScript may only toggle `data-*` attributes or `.active` classes. The CSS handles the visual transition.

### LAW-009: The Law of Absolute Shapes
> **Zero Border Radius. Always.**
> Kairos represents broadcast hardware. Hardware has physical edges. `border-radius: 0` is enforced globally. No pills, no circles, no rounded rectangles.
