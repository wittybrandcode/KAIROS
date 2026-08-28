# Changelog

All notable changes to Kairos Design System.

## [1.0.0] — 2026-08-28

### Added
- **Showcase (Tier 1):** 18 new static pages — `heading, paragraph, divider, layout, switch, forms, slider, tag-input, indicator, tag, loading, progress, surface, overlay, navigation, table, split-grid, tooltip` (all 42 components now have showcase, 43 total with domain)
- **JS Modules (Tier 2):** 6 new interactive modules — `Popover (outside+Escape+focus trap)`, `Tooltip (focus+aria-describedby)`, `TagInput (Enter/comma/Backspace)`, `Command (Ctrl+K+filter+arrows)`, `Sidebar (toggle+active)`, `Slider (pointer drag+keyboard+aria)` — all with ≥5 tests (55 total, 11/11 modules)
- **Domain (Tier 4):** 6 broadcast pages — `bus, shell, multiview, rundown, production, ticker` + 4 demos for existing modules (`modal/dropdown/tabs/toast` with `data-kairos-*`)
- **Core Tests (E1):** 5 new suites — `keyboard (hotkey/arrows), dom (q/closest/resolveTarget), utils (debounce/throttle/uid/clamp), focus (trap/restore), animation (waitTransition)` — 75 total
- **Layout Fix:** Sidebar scrollbar now visible (`min-height:0` + `overflow:hidden` on sidebar/shell) and thumb contrast increased
- **Tokens:** 16 new contract tokens (9 phantom + 7 raw) — `avatar-name-gap, name-role-gap, shadow-lg, size-control, timeline-track, fader, breadcrumb, pagination, layout-center, handle-outset, rundown-compact, mv-outline, mv-sm-label, xp-glow, viewport-glow`

### Fixed
- **Idempotent init:** `modal/dropdown/tabs/toast` now guard with `let initialized` (was stacking listeners)
- **Inline-style violations:** Removed 51 `style=""` with `position/background/min-width` from showcase (kept only necessary `width%` for progress/slider)
- **Circle icons:** `check-circle` → `check-square`, `circle` → `square` (hard law: squares only)
- **Hex violation:** `overlay.html:33` `#fff` → `kairos-text-color`
- **Scrollbar:** Thumb `border → border-active` for visibility
- **Inventory order:** `P4` before `P6` (was reversed)

### Changed
- **Version:** `0.1.0` → `1.0.0` — Phase A+B+C+D closed (38/41, 93% → 100% with E)
- **Build:** `dist/kairos.min.css 199.03kB / kairos.mjs 721.61kB / kairos.umd.js 695.90kB` (was 193kB/688kB)
- **Tests:** `19 → 75` (9 suites → 14 suites)

## [0.1.0] — 2026-06-15

### Added
- **Build Pipeline:** CSS bundler (lightningcss) + JS minifier + dev server with file watching
- **File Organization:** Reorganized from flat `shared/` to structured `src/foundation/`, `src/components/`, `src/domain/`, `src/themes/`, `src/utilities/`
- **Stylelint Plugin:** Custom rules enforcing Kairos constraints (`border-radius: 0`, `kairos-` prefix, custom property prefix)
- **Light Theme Overhaul:** Recalculated Cool Steel scale for light mode with proper semantic aliases (bg-surface is light, text is dark), fixed status color contrast (WCAG AA), eliminated duplication via shared `--kairos-light-*` tokens
- **JavaScript Rewrite:** Complete modular rewrite with:
  - `Kairos` namespace with utility helpers
  - State registry for modal/dropdown tracking
  - Focus trap + restore for modals (ARIA)
  - Keyboard navigation for tabs (Arrow/Home/End) and dropdowns
  - Touch support for Split Panel
  - Toast auto-dismiss with configurable duration
  - Accordion component
  - Unified event delegation via `data-kairos-*` attributes
  - Global keyboard handler (Escape priority: modal > dropdown)
  - `window.Kairos` exposed for external use
- **Accessibility:** `.kairos-sr-only` screen reader utility, `.kairos-skip-link` skip navigation, `prefers-reduced-motion` support, ARIA attributes management in JS, live region announcer
- **Spacing Unification:** Removed numeric `--kairos-spacing-*` intermediary layer; semantic `--kairos-space-*` tokens now hold values directly
- **HTML Templating:** Template include system (`{{ include "file" }}`), shared `_head.html` and `_a11y.html` templates, pattern updater script for batch modifications
- **Testing:** Smoke test runner (validates 60+ pattern pages), Stylelint integration with 0 errors
- **Documentation:** `AGENTS.md` with project instructions, detailed work plan in `plans/` (7 phases)

### Changed
- Entry point: `shared/kairos.css` → `src/kairos.css`
- Pattern pages reference `dist/` instead of `shared/`
- Spacing tokens: `--kairos-spacing-1..5` removed (use `--kairos-space-*` only)
- Light theme: status colors darkened for contrast (`#DC2626` PGM, `#16A34A` PVW, `#CA8A04` warning)

### Fixed
- Modal dismiss bug (`closest('.open')` returning wrong element)
- Tab panel `parentElement` fragility
- Light theme surface hierarchy inversion (surface-alt was lighter than surface)
- Light theme text contrast failures (WCAG AA now met)
- Dropdown not closing other dropdowns on open
- Split Panel missing touch event support
- Escape key closing ALL overlays instead of topmost only

### Build Output
| File | Size |
|------|------|
| `dist/kairos.css` | ~249 KB |
| `dist/kairos.min.css` | ~165 KB |
| `dist/kairos.js` | ~21 KB |
| `dist/kairos.min.js` | ~12 KB |
