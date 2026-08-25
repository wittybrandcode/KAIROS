# Definition of Done (DoD)

To prevent any ambiguity about whether a component is "finished," every component in Kairos MUST pass all 12 criteria of this Definition of Done before it is considered ready for a Stable release.

## The 12-Point Checklist

1. **RFC Approved:** `[ ]` The component has a fully written and approved Request for Comments in `docs/rfcs/`.
2. **ADR Impact Reviewed:** `[ ]` The component conforms to all Architectural Decision Records (ADRs).
3. **Component Spec Written:** `[ ]` The visual and structural specifications are documented.
4. **Design Contract Satisfied:** `[ ]` All Intents, Variants, Sizes, States, and Recipes are implemented perfectly.
5. **Behavior Contract Satisfied:** `[ ]` All Triggers, Targets, Events, Lifecycles, and Animations are built exactly to spec.
6. **Testing Complete:** `[ ]` Unit, E2E, Contract, and Visual tests exist and are passing on CI.
7. **Accessibility (A11y) Perfect:** `[ ]` WCAG AA, Keyboard navigation, Focus traps, and Screen Reader support are verified via Axe and manual testing.
8. **Browser Compatibility Verified:** `[ ]` Tested and identical on Chromium, WebKit, and Firefox.
9. **Documentation Written:** `[ ]` Public API and Edge Cases are fully documented.
10. **Pattern Example Available:** `[ ]` A working, copy-pasteable example exists in `patterns/`.
11. **Scoreboard Grade ≥ 95%:** `[ ]` The component has passed the RC Gates audit with a near-perfect score.
12. **All 10 Gates Passed:** `[ ]` No `❌ BLOCK` flags exist for this component on the Scoreboard.

> **If a component is missing even a single checkmark, it is NOT DONE.**
