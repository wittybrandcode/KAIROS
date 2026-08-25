# Testing Policy

> This document establishes the strict rules governing CI/CD, contributions, and bug tracking. It ensures the framework's quality scales linearly with its size.

---

## 1. Zero Tolerance on Coverage Drops
No Pull Request (PR) will be merged if it reduces the overall test coverage. 
- Target coverage for `src/core/`: **100%**
- Target coverage for `src/modules/`: **95%+**

## 2. No Component Without Tests
A new component (or module) is rejected at the PR level if it does not include:
1. Unit Tests (DOM structure, basic API).
2. End-to-End Tests (Keyboard, Focus, Lifecycle).
3. Accessibility Audits (axe-core integration).

## 3. Test-Driven Bug Fixes
Every bug report filed against Kairos MUST be fixed according to the following workflow:
1. Write a failing test that reproduces the bug exactly.
2. Verify the test fails in CI.
3. Fix the bug in the source code.
4. Verify the test now passes.
5. Merge.
*A bug fix submitted without a reproducing test will not be accepted.*

## 4. Public API is Sacred
Every method, event, and property exposed in `window.Kairos` (as defined in `api-contract.md`) must have a corresponding test. If the API changes, the test must fail.

## 5. Visual Regression is Mandatory
Because Kairos is a CSS-first framework, JS tests are insufficient. 
- Every component must have snapshots covering all Variants, Intents, Sizes, and States.
- Any PR that introduces a Visual Regression diff must have an explicit sign-off from a Maintainer stating the visual change is intentional.

## 6. Testing Environments
Tests must run in the exact environments defined in `docs/browser-support.md`. Playwright will run tests against:
- Chromium
- WebKit
- Firefox

## 7. Mocking Rule
Mocking the DOM is strictly prohibited. Tests must run against a real DOM (jsdom for Unit, real browsers for E2E). 
- `setTimeout` and `requestAnimationFrame` may be mocked for speed, but real timing must be verified in E2E.
