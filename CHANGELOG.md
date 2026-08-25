# Changelog

All notable changes to Kairos Design System.

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
