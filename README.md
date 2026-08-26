# KAIROS — Broadcast Design System

Design system for **broadcast control surfaces** (switchers, routing matrices, audio consoles).
Pure CSS + TypeScript. Zero runtime dependencies.

> Dark theme only · Sharp corners (`border-radius: 0`) · Cool steel gray + 4 status colors (PGM red / PVW green / Warning yellow / Info blue) · Motion ≤ 300ms · Uppercase by default

## Quick Start

```bash
npm install
npm run dev          # → http://localhost:5178
```

## Commands

| Command | Purpose |
|---------|---------|
| `npm run dev` | Dev server on port **5178** with HMR |
| `npm run build` | Build icons → lib (ESM+UMD+CSS) → patterns |
| `npm run lint` | Stylelint with 4 custom Kairos rules |
| `npm test` | Vitest unit tests |
| `npx tsc --noEmit` | Strict typecheck |

## Architecture

```
src/
├── foundation/    L0  Design tokens (colors, spacing, typography, sizes, motion…)
├── components/    L1–L8  Contracts + UI primitives by layer
├── domain/        L9  Broadcast-specific (bus, shell, multiview, rundown…)
├── modules/       JS behavior (Modal, Dropdown, Accordion, Tabs, Toast)
├── core/          dom · events · state · focus · keyboard · animation · observer · utils
├── icons/         1,512 generated Phosphor SVGs + replacement engine
├── themes/        Dark-only overrides
└── utilities/     Atomic utility classes

kairos.css         Single entry point (@import order matters)
kairos.ts          JS entry point → window.Kairos
showcase-data/     HTML fragments loaded by showcase.js
```

**Layered import order (L0→L9)** in `src/kairos.css` is contractual — do not reorder.

## Core Principles

1. **DOM is the source of truth** — state lives in `data-state` attributes
2. **CSS owns all rendering** — JS handles behavior only
3. **Contract tokens** — components never consume foundation spacing/color tokens directly (linter-enforced via `kairos/contract-enforcement`)
4. **Event delegation** — everything driven by `data-kairos-toggle / -target / -dismiss`
5. **Cancelable lifecycle events** — `kairos:{component}:before-{open,close}` → `{opened,closed}`

## Status

See [PROJECT-HANDOVER.md](PROJECT-HANDOVER.md) for the full audit, gap list, and v1.0 roadmap.
Component behavior specs live in [`docs/component-specs/`](docs/component-specs/).
Development conventions every contributor/agent must follow: [AGENTS.md](AGENTS.md).
