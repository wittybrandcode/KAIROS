# Kairos 1.0 Release Candidate Gates

To ensure Kairos remains an industrial-grade engineering platform, the transition to `1.0 Stable` is strictly governed by 10 Gates. A component or feature cannot be included in the release candidate unless it passes every single gate with a score of 95% or higher.

## Gate 1: Architecture
- Does it adhere strictly to `ARCHITECTURE.md`?
- Are relevant ADRs updated and respected?
- Was an RFC authored and approved before implementation?
- Is the Layering correct (no circular dependencies between Foundation > Components > Domain)?
- Are import rules followed strictly?

## Gate 2: Design Contract
- Are all Intents (Pgm, Pvw, Warn, Info, Neutral) implemented?
- Are all Variants (Solid, Outline, Ghost) implemented?
- Are all Sizes (Sm, Md, Lg) implemented?
- Are all CSS state pseudo-classes and data-states styled?
- Is the visual Recipe perfectly compliant?

## Gate 3: Behavior Contract
- Are the Triggers correctly mapped (e.g. `data-kairos-toggle`)?
- Are the Targets correctly resolved?
- Is the component Lifecycle (Mount, Update, Unmount) clean without memory leaks?
- Are all CustomEvents emitted accurately?
- Is Keyboard navigation fully supported?
- Is Focus trapped/restored correctly?
- Are Animations constrained to max 300ms using CSS `transitionend` with a fallback timeout?

## Gate 4: Accessibility
- Is WCAG AA contrast maintained?
- Are all required ARIA attributes present (`aria-expanded`, `aria-hidden`, `aria-live`, `role`)?
- Does it behave perfectly with a Screen Reader?
- Can it be operated 100% via Keyboard?
- Is `:focus-visible` clearly distinguishable?

## Gate 5: Testing
- Unit Tests (Vitest + JSDOM) coverage ≥ 95%.
- E2E Tests (Playwright) cover all major user flows.
- Contract Tests ensure the `window.Kairos.*` API works.
- Visual Regression Tests show 0 unintended diffs.
- Accessibility Tests (`axe-core`) return 0 violations.

## Gate 6: Browser Compatibility
Fully functional and visually identical on:
- Chromium (Chrome, Edge, Electron 28+)
- WebKit (Safari, iOS)
- Firefox

## Gate 7: Performance
- Bundle size within budget (JS < 10kb gzipped, CSS < 15kb gzipped).
- Tree Shaking verified (no unused CSS/JS in build).
- Render cost is minimal (no layout thrashing).

## Gate 8: Public API
- `window.Kairos` exposes only exactly what is documented in `api-contract.md`.
- No accidental global variables or leaked classes.
- Standardized data attributes.

## Gate 9: Documentation
- Component Spec is written.
- `patterns/*.html` provides a functional, copy-pasteable example.
- Accessibility notes documented.
- Edge cases documented.

## Gate 10: Release
- CHANGELOG.md is updated.
- SemVer adhered to (Major.Minor.Patch).
- License verified.
- NPM Package build passes completely.
