# ADR 0004: Deprecation of Web Components

## Status
Accepted

## Context
Kairos initially experimented with Web Components (Shadow DOM) for complex UI elements like Modal, Dropdown, Tabs, and Split Panels. At the same time, we maintained Light DOM implementations driven by Vanilla JS modules and `data-state` attributes. This resulted in dual implementations for the same conceptual components, leading to a violation of the Single Source of Truth principle.

Furthermore, Web Components with Shadow DOM introduce strict encapsulation boundaries that complicate our global CSS styling and contract enforcement. Our philosophy explicitly states: "DOM is source of truth, CSS is presentation, JS is behavior only." Shadow DOM hides the DOM, making it difficult to style elements via our atomic and composable CSS architecture.

## Decision
We are officially deprecating and removing all Web Component implementations (`src/components/modal/`, `src/components/dropdown/`, `src/components/tabs/`, `src/components/split-panel/`).

Moving forward, Kairos will standardise on:
1. **Light DOM** for all component structures.
2. **Vanilla JavaScript (`src/modules/*.js`)** for behavior via event delegation.
3. **Data Attributes (`data-state`, `data-kairos-*`)** as the sole API for state transitions.

## Consequences
- **Positive:** A single, unified source of truth for every component.
- **Positive:** Full compatibility with global CSS variables and contract enforcement.
- **Positive:** Simpler developer experience, removing the cognitive overhead of Shadow DOM vs Light DOM.
- **Negative:** We lose native Shadow DOM style encapsulation, making strict adherence to CSS scoping (`kairos-*` prefixes) absolutely critical. This tradeoff is acceptable as our linting rules already enforce these boundaries.
