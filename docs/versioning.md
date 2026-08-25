# Versioning Strategy & Release Engineering

> This document defines how Kairos versions are structured, our deprecation policy, and how we handle breaking changes to ensure stability for consumers.

---

## Semantic Versioning (SemVer)

Kairos strictly follows Semantic Versioning `MAJOR.MINOR.PATCH`.

- **MAJOR (e.g., 2.0.0)**: Incompatible API changes, removal of deprecated features, or structural DOM changes.
- **MINOR (e.g., 1.1.0)**: New features, new components, or additive styling changes that are backwards compatible.
- **PATCH (e.g., 1.0.1)**: Backwards compatible bug fixes, performance improvements, or documentation updates.

---

## The 1.x Guarantee

During the 1.x lifecycle, the following are strictly guaranteed:

1. **No Breaking CSS**: Existing class names (`.kairos-*`) and CSS Variables (`--kairos-*`) will not be removed or renamed.
2. **No Breaking JS**: The public `window.Kairos` API (as defined in `api-contract.md`) will not change its signature.
3. **No Breaking HTML**: Expected DOM structures and `data-kairos-*` attributes will remain functional.

---

## Deprecation Policy

When an API, class, or feature needs to be retired, it must follow this cycle:

1. **Mark**: 
   - CSS: Add a `/* DEPRECATED: use X instead */` comment.
   - JS: Add JSDoc `@deprecated` tag.
2. **Warn**: 
   - JS: Implement `console.warn('[Kairos] Feature X is deprecated and will be removed in v2.0. Use Y instead.')`.
3. **Keep**: 
   - The deprecated feature MUST remain fully functional for the remainder of the current major version lifecycle.
4. **Remove**: 
   - The feature is completely removed only in the next MAJOR version release (e.g., 1.x -> 2.0).

---

## Breaking Changes Policy (Major Versions)

A major version bump is triggered when any of the following occur:

- Removing a previously deprecated CSS class or CSS variable.
- Changing the default `border-radius` rule (highly unlikely).
- Renaming or removing properties/methods from `window.Kairos`.
- Modifying the expected DOM nesting structure of composite components (e.g., if a Modal suddenly requires a new wrapper `div`).
- Dropping support for a previously supported browser tier.

### Migration Guides
Every Major version release MUST be accompanied by a `MIGRATION-[version].md` guide that details:
1. What changed.
2. Why it changed.
3. A clear "Before/After" code example showing how to update the codebase.

---

## Release Process (Changesets)

All changes intended for a release must be accompanied by a changeset file.

1. **Development**: Create a branch, write code, add tests.
2. **Changeset**: Run the changeset CLI to document the intent (patch, minor, major) and provide a summary of the change.
3. **Review**: PR review verifies the changeset accuracy against the Versioning Strategy.
4. **Release**: The CI pipeline consumes unreleased changesets, bumps versions, generates the CHANGELOG, and publishes the packages.
