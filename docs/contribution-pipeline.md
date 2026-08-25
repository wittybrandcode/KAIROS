# Design Review Pipeline

To ensure Kairos remains an industrial-grade engineering platform, we enforce a strict, unidirectional production line for all new components. A component cannot skip a step.

## The Pipeline

1. **Idea / Need:** A requirement arises from the broadcast domain.
2. **RFC (`docs/rfcs/`):** The author writes an RFC using the `0000-template.md`.
3. **Component Spec:** Initial HTML and CSS contracts are drafted.
4. **Design Review:** Core maintainers review the visual hierarchy, tokens, and geometry.
5. **Behavior Review:** Core maintainers review the JS interaction model and events.
6. **Accessibility Review:** Review of ARIA labels, semantic HTML, and keyboard trapping.
7. **Implementation:** Code is written (CSS + Vanilla JS).
8. **Unit Test:** `Vitest` coverage must hit 100% for the core state/event logic.
9. **E2E Test:** `Playwright` simulates interactions across Chromium, Firefox, WebKit.
10. **Visual Test:** `Playwright` visual regression snapshots are generated.
11. **Documentation:** The `patterns/*.html` reference is created.
12. **Release:** Merged into `main`.

No component is allowed into the `main` branch unless it has successfully passed all 12 stages.
