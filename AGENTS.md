# Kairos Design System — Agent Instructions

## Project Overview
Kairos is a specialized design system for **broadcast control surfaces** (switchers, routing matrices, audio consoles). It is not a general-purpose UI framework.

## Architecture
```
src/
├── foundation/    → Design tokens: colors, spacing, typography, sizes, elevation, motion
├── components/    → Generic UI: buttons, forms, overlays, navigation, tables
├── domain/        → Broadcast-specific: bus, multiview, shell, rundown, source-tag
├── themes/        → Dark theme overrides (light theme forbidden)
├── utilities/     → Utility classes (flex, grid, gap, overflow, etc.)
├── kairos.css     → Entry point (@import order matters)
├── kairos.ts      → Entry point (imports all JS modules)
└── icons/         → Icon registry + replacement engine

showcase-data/     → HTML fragments loaded dynamically by showcase.js
dist/              → Built output (kairos.min.css, kairos.mjs, kairos.umd.js)
docs/              → Philosophy document
scripts/           → Build, lint, serve scripts
```

## Commands
```bash
npm run dev          # Dev server on localhost:5178 with file watching
npm run build        # Build CSS + JS to dist/
npm run build:css    # Build CSS only
npm run build:js     # Build JS only
npm run lint         # Lint all CSS in src/
npm run lint:fix     # Auto-fix lint issues
npm run test         # Run vitest unit tests
npm run test:smoke   # Run smoke tests
```

## Hard Rules (NON-NEGOTIABLE)
1. **border-radius: 0** — everywhere, always, no exceptions. The linter enforces this.
2. **No warm colors** — Cool steel gray only + 4 status colors (PGM red, PVW green, warning yellow, info blue).
3. **No external CSS frameworks** — Vanilla CSS + TS only.
4. **No decorative motion** — Max animation duration is 300ms.
   - *Documented exception:* ticker/marquee scrolling in `src/domain/ticker.css` is functional broadcast content motion; its durations are contract tokens (`--kairos-ticker-*-speed`, `--kairos-marquee-*-speed`).
5. **No circles, pills, or dots** — Squares and rectangles only.
6. **Uppercase by default** — Buttons, tabs, labels, panel headers all uppercase with wide letter-spacing.

## Naming Conventions
- CSS variables: `--kairos-{category}-{name}` (e.g., `--kairos-bg-surface`, `--kairos-status-pgm`)
- CSS classes: `.kairos-{component}-{element}-{modifier}` (e.g., `.kairos-btn-primary`, `.kairos-side-tab.active`)
- Data attributes: `data-kairos-toggle`, `data-kairos-target`, `data-kairos-dismiss`
- All spacing via 5-level semantic tokens: `--kairos-space-extra-tight`/`3xs` (2px), `--kairos-space-compact`/`xs` (6px), `--kairos-space-standard`/`md` (12px), `--kairos-space-loose`/`xl` (24px), `--kairos-space-extra-loose`/`3xl` (48px) — aliases `3xs/xs/md/xl/3xl` canonical in `src/foundation/spacing.css:12`

## Component Contract Pattern
Each component defines its own spacing contract in `src/components/components.css`:
```css
--kairos-btn-padding-y: var(--kairos-space-compact);     /* 6px */
--kairos-btn-padding-x: var(--kairos-space-standard);    /* 12px */
```
Component CSS files use contract tokens, not raw spacing values.

## JavaScript Pattern
- TypeScript ES modules (bundled to ESM + UMD via Vite)
- Event delegation via `data-kairos-*` attributes
- No inline event handlers, no inline styles
- No framework dependencies
- DOM is the source of truth: state lives in `data-state` attributes, CSS owns all rendering
