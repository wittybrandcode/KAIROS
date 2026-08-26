# KAIROS — AI DEVELOPER CONTEXT

> **هذا الملف مكتوب لوكيل برمجة ذكي**: اقرأه بالكامل ثم ابدأ العمل مباشرة.
> Self-contained brief for any AI coding agent. Read top-to-bottom, then work. No human explanation required.

---

## 1 · WHAT THIS PROJECT IS

**Kairos** = a design system for **TV broadcast control surfaces** (vision switchers, routing matrices, audio consoles). NOT a general-purpose UI framework. Think: dark control-room panels, PGM/PVW tally logic, hotkey grids, multiviewers.

- **Stack:** Vanilla CSS (custom properties) + TypeScript ES Modules + Vite 8. **Zero runtime dependencies.**
- **Philosophy:** DOM is the single source of truth. State lives in `data-state` attributes. CSS owns rendering. JS only writes state + dispatches events. No virtual DOM, no stores, no frameworks.
- **Target:** v1.0 = every component ships clean tokenized CSS + showcase page + (if interactive) JS module + unit tests.
- **Repo:** https://github.com/wittybrandcode/KAIROS (branch `main`)

---

## 2 · GROUND RULES — VIOLATING THESE FAILS LINT/BUILD

| # | Rule | Enforcement |
|---|------|-------------|
| 1 | `border-radius: 0` everywhere | stylelint error |
| 2 | Cool gray palette + ONLY 4 status colors: PGM red, PVW green, Warning yellow, Info blue | review |
| 3 | No CSS frameworks, no inline styles, no inline event handlers | review |
| 4 | Animation ≤ **300ms**. Only exception: ticker/marquee scroll (`src/domain/ticker.css`, contract tokens) | review |
| 5 | Squares/rectangles only — no circles, pills, dots | review |
| 6 | Uppercase + wide letter-spacing on buttons/tabs/labels/headers | review |
| 7 | All custom properties prefixed `--kairos-` | stylelint warning |
| 8 | All classes prefixed `kairos-` (short state words whitelisted: `pgm pvw active open sm lg cut auto …`) | stylelint warning |
| 9 | **Contract enforcement:** inside `src/components/**` + `src/domain/**` NEVER write `var(--kairos-space-*)` or `var(--kairos-cs-*)` directly — use contract tokens from `src/components/components.css` | **stylelint ERROR** |

Foundation tokens you MAY use directly in components/domain: `--kairos-text-*`, `--kairos-size-*`, `--kairos-border-*`, `--kairos-status-*`, `--kairos-focus-*`, `--kairos-motion-*`, `--kairos-easing-*`, `--kairos-font-*`, `--kairos-weight-*`, `--kairos-tracking-*`, `--kairos-icon-*`.

Naming: tokens `--kairos-{category}-{name}` · classes `.kairos-{component}-{element}` · attributes `data-kairos-toggle/-target/-dismiss`.
Spacing scale (5 only): extra-tight 2 · compact 6 · standard 12 · loose 24 · extra-loose 48 (aliases space-3xs…3xl).

---

## 3 · ENVIRONMENT & COMMANDS (Windows)

```powershell
# PowerShell blocks npm.ps1 by default — ALWAYS run npm through:
powershell -ExecutionPolicy Bypass -Command "npm run dev"

npm run dev        # Vite dev server, STRICT port 5178
npm run build      # build:icons && vite lib build && build:patterns
npm run lint       # stylelint src/**/*.css   → must print NOTHING
npx tsc --noEmit   # strict typecheck        → must print NOTHING
npm run test       # vitest (jsdom)          → all green required
```

Hard-won gotchas:
- Do NOT chain commands with `$?`/`&&` when shelling out — outer shell mangles them. One command per call.
- Playwright e2e is wired to `http://localhost:5178` (matches Vite strictPort).
- `src/icons/registry.ts` (1,512 icons) is **generated** by `npm run build:icons` — never hand-edit.
- Dev mode: `index.html` loads `src/kairos.css` + `<script type="module" src="src/kairos.ts">` directly (HMR). `dist/` is gitignored output.

---

## 4 · ARCHITECTURE MAP

```
src/kairos.css      single entry; @import ORDER IS CONTRACT (L0→L9):
  L0 foundation/    colors·spacing·typography·sizes·motion·focus·reset…
  L1 contracts      components/contracts.css (intent/variant/state) + components.css (per-component contracts)
  L2 layout         utilities/layout.css · components/layout.css · divider.css
  L3 content        components-core (.kairos-input base!) · icons · badge · kbd · code · link · heading · paragraph · data-display
  L4 input          buttons · forms · checkbox · radio · switch · slider · tag-input
  L5 feedback       loading · progress · feedback · status-dot · indicator · tag · toast · alert
  L6 overlay        overlay · popover · surface · modal · dropdown · tooltip
  L7 navigation     navigation · tabs
  L8 composite      accordion · command · sidebar · table · split-grid · composites
  L9 domain/        bus · shell · multiview · production · rundown · ticker… (broadcast)

src/kairos.ts       JS entry → window.Kairos
src/core/           dom(q,qa,closest,getFocusable) events(emit/on/once)
                    state(open/close/toggle/activate/read/is) focus(trap/restore)
                    keyboard(onEscape,onActivate,hotkey) animation(waitTransition)
                    observer(onMutation) utils(debounce,throttle,uid,clamp,merge)
src/modules/        modal · dropdown · accordion · tabs · toast (+ index.ts barrel)
showcase.js         sidebar inventory[] + fetches showcase-data/{id}.html into #main-viewer
```

---

## 5 · HOW TO WRITE COMPONENT CSS

1. Contract tokens in `src/components/components.css` (pull values from foundation):
```css
--kairos-widget-padding-y: var(--kairos-space-xs);   /* 6px */
--kairos-widget-padding-x: var(--kairos-space-md);   /* 12px */
```
2. Component file = design properties only, consuming those contracts. Structural resets come free from the `.kairos-input` base class (components-core.css: appearance / display:inline-flex / position:relative / cursor / box-sizing / border-radius:0). Inputs get `class="kairos-widget kairos-input"` in HTML.
3. Reference pattern: **`src/components/radio.css`** is the purest file in the repo — imitate it.
4. States are pure CSS reacting to `[data-state]`, `:checked`, `.active` etc. — no JS styling ever.

---

## 6 · HOW TO WRITE AN INTERACTIVE MODULE (copy this skeleton)

Imitate `src/modules/accordion.ts` exactly:

```ts
import { closest } from '../core/dom';
import { emit, on } from '../core/events';
import * as State from '../core/state';

let initialized = false;                    // REQUIRED: init() MUST be idempotent
export function init(): void {
  if (initialized) return;
  initialized = true;
  on(document, 'click', ((e: MouseEvent) => {
    const trigger = closest<HTMLElement>(e.target as Element, '[data-kairos-toggle="widget"]');
    if (!trigger || trigger.hasAttribute('disabled')) return;
    const item = closest<HTMLElement>(trigger, '.kairos-widget-item');
    if (!item) return;
    if (!emit(item, 'kairos:widget:before-open', {}, { cancelable: true })) return;
    State.open(item);
    emit(item, 'kairos:widget:opened');
  }) as EventListener);
}
export const Widget = { open, close, toggle, init };
```

Rules: document-level delegation only · cancelable `before-*` then terminal `*ed` lifecycle events · sync ARIA (`aria-expanded`) · Escape/outside-click handled where spec says so · register in BOTH `src/kairos.ts` (import + init() call + API object) AND `src/modules/index.ts` barrel.

---

## 7 · TESTS

Vitest + jsdom, glob `src/**/*.test.ts`. Pattern: `src/modules/accordion.test.ts` — set `document.body.innerHTML`, call `init()` once, dispatch `new MouseEvent('click',{bubbles:true})`, assert `dataset.state` + ARIA + cancellation. Every new module ships ≥5 tests: toggle open/close, group behavior, event cancellation, edge case (nesting/disabled).

---

## 8 · CURRENT COMPLETION MATRIX

| Area | Status |
|---|---|
| Foundation + Contracts | ✅ 100% (comp-padding-sm/md/lg, opacity-disabled/subtle/bypassed/locked, ticker speeds) |
| Component CSS (42 files) | ✅ clean & tokenized |
| Domain CSS (13 files) | ✅ clean & tokenized |
| JS core (8 modules) | ✅ complete · `tsc --noEmit` clean |
| JS behavior modules | ✅ Modal · Dropdown · Accordion · Tabs · Toast |
| Unit tests | ✅ 19 passing (state 8 · events 5 · accordion 6) |
| Showcase fragments (13) | typography · icons · badges · buttons · checkbox · radio · kbd · code · link · data-display · alert · status-dot · accordion |
| Git | ✅ pushed to origin/main |

---

## 9 · REMAINING WORK — DO IN THIS ORDER

### Tier 1 · Static showcase pages (~15 min each, no JS)
Create `showcase-data/{id}.html` following `checkbox.html`'s section pattern (States → Intents/Sizes → realistic broadcast example), then register `{ id, name, key }` in the `KairosInventory` array at the top of `showcase.js`:
`heading · paragraph · divider · layout · surface · overlay · indicator · tag · loading · progress · table · switch · forms · tooltip(CSS hover) · navigation · split-grid`

### Tier 2 · Missing JS modules (CSS exists; specs live in docs/component-specs/)
| Order | Module | Key behaviors | Spec file |
|---|---|---|---|
| 1 | **Popover** | trigger open/close, outside-click dismiss, Escape; 4 placement variants already in CSS | component-specs/popover.md |
| 2 | **Tooltip** | focus-triggered display + `aria-describedby`; hover already works via CSS | component-specs/tooltip.md |
| 3 | **TagInput** | Enter/comma adds tag, Backspace deletes, remove-button clicks, hidden value sync | — (infer from tag-input.css) |
| 4 | **Command** | Ctrl+K hotkey (`core/keyboard.ts` → `hotkey()` exists, unused!), filter list, arrow navigation, select commit | component-specs/command.md |
| 5 | **Sidebar** | collapse/expand toggle, active-item state | component-specs/sidebar.md |
| 6 | **Slider** | pointer drag → fill %, keyboard arrows, ARIA slider role | — (infer from slider.css) |

Each = module .ts + ≥5 tests + interactive showcase fragment + registration (see §6).

### Tier 3 · Interactive demos for EXISTING modules
Modal/Dropdown/Tabs/Toast have zero demo pages using their `data-kairos-*` attributes. Build: `showcase-data/modal.html`, `dropdown.html`, `tabs.html`, `toast.html`.

### Tier 4 · Domain pages
bus.html · shell.html · multiview.html · rundown.html · production.html (L9 components are pure CSS).

### Tier 5 · Hardening toward v1.0
- Make `init()` idempotent in modal/dropdown/tabs/toast (same listener-stacking bug fixed in accordion).
- Unit tests for untested core: keyboard · focus · utils · dom.
- Playwright e2e per module (copy pattern from tests/e2e/modal.spec.ts, includes axe a11y audit).
- Medium debt: container-query breakpoints in domain/shell.css should read from foundation tokens.

---

## 10 · PER-TASK WORKFLOW (repeat this cycle)

```
1. Read spec (docs/component-specs/{id}.md if exists) + existing CSS file
2. Complete CSS if gaps (contract tokens ONLY — §5)
3. Create showcase-data/{id}.html   (§9 Tier 1 pattern)
4. Register id in KairosInventory (showcase.js)
5. If interactive: src/modules/{id}.ts via §6 skeleton + register in kairos.ts + barrel
6. Write unit tests (§7)
7. VERIFY ALL FOUR: lint clean · tsc clean · tests green · build ok
8. git commit (conventional: feat(scope): … / fix: … / docs: …)
```

---

## 11 · PITFALLS THAT ALREADY BIT US — DON'T REPEAT

1. **Non-idempotent `init()`** stacked duplicate listeners and broke tests → always guard with a module flag.
2. Writing raw px/hex in component CSS → linter error or review rejection. Tokens only.
3. `var(--kairos-space-xs)` directly inside components/domain → **stylelint ERROR**. Route through contract tokens.
4. Mismatched var() fallbacks hide bugs (e.g. `var(--kairos-size-dot, 8px)` when token=6px). Avoid px fallbacks on defined tokens.
5. Editing `src/icons/registry.ts` by hand → overwritten by next build. Regenerate instead.
6. PowerShell: plain `npm ...` fails (execution policy); `$?` chaining breaks. Use `-ExecutionPolicy Bypass`, one command per call.
7. Vite port is STRICT 5178 — anything else (Playwright etc.) must match.

---

## 12 · DEFINITION OF DONE — v1.0

- [ ] `npm run lint` prints nothing · `npx tsc --noEmit` prints nothing · `npm test` all green · `npm run build` succeeds
- [ ] Every component in L2–L8 has a showcase page registered in inventory
- [ ] Every interactive component has: JS module + ≥5 unit tests + working data-kairos demo page
- [ ] All Tier-5 hardening items closed
- [ ] CHANGELOG.md updated; bump package.json to 1.0.0; `git tag v1.0.0 && git push --tags`

---

## 13 · DOC INDEX (read only if you need depth)

| File | Purpose |
|---|---|
| AGENTS.md | condensed rules (subset of this file) |
| PROJECT-HANDOVER.md | full audit report + history of decisions |
| KAIROS-CONSTITUTION.md · docs/architecture/DESIGN-LAWS.md · ARCHITECTURE.md | design law details |
| docs/component-specs/*.md | per-component behavior contracts (accordion, command, dropdown, modal, popover, sidebar, tabs, toast, tooltip) |

**Start now with §9 Tier 1. Commit after every finished component.**

