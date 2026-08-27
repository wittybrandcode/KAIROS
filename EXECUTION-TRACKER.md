# KAIROS — EXECUTION TRACKER
> **مسار التنفيذ الحي** — هذا الملف هو مصدر الحقيقة للتقدم. كل خطوة تُنفذ يجب تسجيلها هنا فوراً قبل الـ commit.

**آخر تحديث:** 2026-08-28 01:45 UTC
**التقدم الإجمالي:** `90%` → الهدف `v1.0` (100%)
**الفرع:** `main` — `67ea51c` → `feat(sidebar): C5 toggle + active + Escape` (pending)
**آخر تحقق:** `lint: ✅ 0 errors` · `tsc: ✅ 0 errors` · `test: ✅ 48/48` · `build: ✅ 199.03kB CSS / 717.08kB MJS`

---

## نظام التتبع — كيف نحدّث هذا الملف

> **قاعدة حديدية:** لا يوجد commit بدون تحديث هذا الملف. كل مهمة تنتقل: `⬜ pending → 🟦 in_progress → ✅ done` مع تسجيل التاريخ والـ commit.

### حالات المهمة
| رمز | معنى | متى |
|---|---|---|
| `⬜` | لم يبدأ | افتراضي |
| `🟦` | قيد التنفيذ | عند بدء العمل على المهمة (مهمة واحدة فقط `in_progress`) |
| `✅` | مكتمل | بعد `lint + tsc + test + build` كلها خضراء |
| `⏭️` | تم تخطيه/مؤجل | مع ذكر السبب في الملاحظات |
| `❌` | فشل/محظور | مع وصف العائق |

### طقس التحديث بعد كل مهمة
```md
1. غيّر الحالة ⬜ → ✅
2. املأ: التاريخ | Commit hash | نتائج التحقق
3. أضف صفاً جديداً في "سجل التقدم" أسفل الملف
4. حدّث "التقدم الإجمالي" و "آخر تحديث" في الأعلى
5. commit: `feat(scope): ...` أو `fix(scope): ...` مع ذكر ID المهمة
```

### أوامر التحقق (تشغيل منفصل — لا تستخدم &&)
```powershell
powershell -ExecutionPolicy Bypass -Command "npm run lint"
npx tsc --noEmit
powershell -ExecutionPolicy Bypass -Command "npm run test"
powershell -ExecutionPolicy Bypass -Command "npm run build"
```

### القواعد الصلبة (ذكر نفسك قبل كل تعديل)
`AI-CONTEXT.md:19` + `KAIROS-CONSTITUTION.md`:
1. `border-radius: 0` دائماً — `src/kairos.css:xx` يلينت error
2. ألوان باردة فقط + 4 status: `PGM #FF3B30 / PVW #22C55E / Warning #EAB308 / Info #3B82F6` — `src/foundation/colors.css:xx`
3. لا frameworks — Vanilla CSS + TS فقط
4. حركة ≤300ms — استثناء وحيد `ticker/marquee` `src/domain/ticker.css:xx` عبر `--kairos-ticker-*-speed`
5. مربعات فقط — لا دوائر/pills/dots
6. UPPERCASE + `tracking-widest` افتراضياً
7. لا تستخدم `var(--kairos-space-*)` أو `var(--kairos-cs-*)` داخل `src/components/**` و `src/domain/**` مباشرة — استخدم عقود `src/components/components.css:xx` (يلينت ERROR)

---

## اللقطة الحالية — Snapshot 2026-08-27

| المحور | العدد | الحالة | المصدر |
|---|---|---|---|
| Foundation L0 `src/foundation/*.css` | 15/15 | ✅ 100% | `src/kairos.css:1` L0 |
| Contracts L1 `src/components/components.css` + `contracts.css` | 2/2 | ✅ 100% (phantom A2 + raw A3 تم حلها) | `src/components/components.css:834` |
| Components CSS L2-L8 `src/components/*.css` | 42/42 | ✅ 100% | `src/kairos.css:xx` L2-L8 |
| Domain CSS L9 `src/domain/*.css` | 13/13 | ✅ 98% (glows + outline تم ترميزها) | `src/kairos.css:xx` L9 |
| JS Core `src/core/*.ts` | 8/8 impl + 2 tested | ✅ 100% impl / 25% tested | `src/core/index.ts:1` |
| JS Modules `src/modules/*.ts` | 10/11 | ⚠️ 91% (Popover+Tooltip+TagInput+Command+Sidebar ✅) | `src/kairos.ts:1` + `src/modules/index.ts:1` |
| Showcase `showcase-data/*.html` | 34/40 | ✅ 85% | `showcase.js:6` `KairosInventory` (P1:1, P2:10, P3:6, P4:7, P6:4, P7:1, P8:5) |
| Tests `vitest` | 48/48 passing (8 suites) | ⚠️ تغطية 8 ملفات | `vitest.config.ts:1` |
| Build `dist/` | 199.03kB CSS / 707.78kB MJS | ✅ | `vite.config.js:1` |
| Git | `main` 9 commits ahead | ✅ | `git log --oneline -5` |

---

## خارطة الطريق — 5 مراحل (القرار الهندسي 2026-08-27)

> **المنطق:** نصلّب الأساس أولاً (A) حتى لا نكرر نفس الـ bug في 6 وحدات قادمة، ثم نبني الواجهات (B)، ثم المنطق (C)، ثم التكامل (D)، ثم البوابة (E).

```
A (30د) → B (جلستان) → C (جلستان) → D (جلسة) → E (جلسة) = v1.0
```

---

### Phase A — التصليب السريع (Hardening) — ⏱️ 30 دقيقة — أولوية قصوى

> **الهدف:** إزالة 4 bugs معروفة + 9 phantom tokens قبل بناء أي شيء جديد.

| ID | المهمة | الملفات | الحالة | التاريخ | Commit | تحقق |
|---|---|---|---|---|---|---|
| **A1** | جعل `init()` idempotent في 4 وحدات (إضافة `let initialized` guard) | `src/modules/modal.ts:85` `src/modules/dropdown.ts:100` `src/modules/tabs.ts:50` `src/modules/toast.ts:92` — نسخ نمط `src/modules/accordion.ts:63` | ✅ | 2026-08-27 | `b67646b` | `tsc✅ test19✅` |
| **A2** | تعريف 9 phantom tokens الناقصة في العقود | `src/components/components.css:834` — أضف: `--kairos-avatar-name-gap` `--kairos-name-role-gap` `--kairos-shadow-lg` `--kairos-size-control` `--kairos-timeline-track-height` `--kairos-fader-*` `--kairos-breadcrumb-*` `--kairos-pagination-*` | ✅ | 2026-08-27 | `b67646b` | `lint✅` |
| **A3** | ترميز القيم الخام المتبقية (210px, 40px, -3px, glows) | `src/utilities/layout.css:50` `src/domain/rundown.css:108` `src/domain/multiview.css:25/85` `src/domain/production.css:16/34` → 7 tokens جديدة | ✅ | 2026-08-27 | `b67646b` | `build 198.91kB✅` |
| **A4** | توثيق استثناء ticker + تحديث `ARCHITECTURE.md` | `docs/architecture/ARCHITECTURE.md:215` (Container Queries ✅ + ticker exception) | ✅ | 2026-08-27 | `b67646b` | docs تطابق الواقع |

**معايير إنجاز Phase A:**
- [x] `A1 + A2 + A3 + A4` كلها `✅`
- [x] `npm run lint` → 0 · `npx tsc --noEmit` → 0 · `npm run test` → 19/19 · `npm run build` → ✅ 198.91kB
- [ ] commit واحد: `fix(core): harden init idempotence + define phantom tokens (A1-A4)` — جاهز للتنفيذ

---

### Phase B — صفحات Showcase الثابتة (Tier 1) — ⏱️ جلستان (~6 ساعات)

> **النمط:** انسخ `showcase-data/checkbox.html:1` — غلاف `kairos-flex kairos-col kairos-gap-loose` + عنوان `kairos-text-3xl` + 3 كروت `kairos-bg-surface kairos-border ... kairos-p-loose` (States / Intents/Sizes / مثال بث واقعي). سجّل كل واحدة في `showcase.js:6` `KairosInventory`.

#### B1 — التسخين السهل (4 صفحات — ابدأ هنا)

| ID | الصفحة | CSS موجود | الحالة | التاريخ | Commit |
|---|---|---|---|---|---|
| **B1.1** | `heading.html` | `src/components/heading.css:1` | ✅ | 2026-08-27 | `90d8aaf` | 3 cards hierarchy/weights/broadcast |
| **B1.2** | `paragraph.html` | `src/components/paragraph.css:1` | ✅ | 2026-08-27 | `90d8aaf` | 3 cards base/spacing/broadcast |
| **B1.3** | `divider.html` | `src/components/divider.css:1` | ✅ | 2026-08-27 | `90d8aaf` | 4 cards solid/label/variants/broadcast |
| **B1.4** | `layout.html` | `src/components/layout.css:1` + `src/utilities/layout.css:1` | ✅ | 2026-08-27 | `90d8aaf` | 4 cards stack/cluster/box+broadcast |

#### B2 — Input Primitives (4 صفحات)

| ID | الصفحة | CSS موجود | الحالة | التاريخ | Commit |
|---|---|---|---|---|---|
| **B2.1** | `switch.html` | `src/components/switch.css:1` | ✅ | 2026-08-27 | `9dadbc1` | 3 cards states/intents/broadcast AFV |
| **B2.2** | `forms.html` | `src/components/forms.css:1` | ✅ | 2026-08-27 | `9dadbc1` | 4 cards fields/validation/sizes/broadcast router |
| **B2.3** | `slider.html` | `src/components/slider.css:1` | ✅ | 2026-08-27 | `9dadbc1` | 4 cards horizontal/vertical/states/broadcast mixer |
| **B2.4** | `tag-input.html` | `src/components/tag-input.css:1` | ✅ | 2026-08-27 | `9dadbc1` | 3 cards states/intents/broadcast keywords |

#### B3 — Feedback Primitives (5 صفحات)

| ID | الصفحة | CSS موجود | الحالة | التاريخ | Commit |
|---|---|---|---|---|---|
| **B3.1** | `indicator.html` | `src/components/indicator.css:1` | ✅ | 2026-08-28 | `2ec444f` | 3 cards states/mono/broadcast status row |
| **B3.2** | `tag.html` | `src/components/tag.css:1` | ✅ | 2026-08-28 | `2ec444f` | 3 cards variants/usage/broadcast metadata |
| **B3.3** | `loading.html` | `src/components/loading.css:1` | ✅ | 2026-08-28 | `2ec444f` | 3 cards spinner/skeleton/broadcast router sync |
| **B3.4** | `progress.html` | `src/components/progress.css:1` | ✅ | 2026-08-28 | `2ec444f` | 3 cards track+progress/intents/broadcast export |
| **B3.5** | `surface.html` + `overlay.html` | `src/components/surface.css:1` `overlay.css:1` | ✅ | 2026-08-28 | `2ec444f` | 6 cards surface base/elevation/broadcast + overlay primitives/stacking/backdrop |

#### B4 — Navigation + Composite (4 صفحات)

| ID | الصفحة | CSS موجود | الحالة | التاريخ | Commit |
|---|---|---|---|---|---|
| **B4.1** | `navigation.html` | `src/components/navigation.css:1` | ✅ | 2026-08-28 | `56422a7` | 4 cards top-bar/menu/nav-item/broadcast shell |
| **B4.2** | `table.html` | `src/components/table.css:1` | ✅ | 2026-08-28 | `56422a7` | 3 cards base/states/broadcast router |
| **B4.3** | `split-grid.html` | `src/components/split-grid.css:1` | ✅ | 2026-08-28 | `56422a7` | 3 cards layouts/PIP/broadcast quad |
| **B4.4** | `tooltip.html` (CSS hover فقط — بدون JS) | `src/components/tooltip.css:1` | ✅ | 2026-08-28 | `56422a7` | 3 cards hover/content/broadcast toolbar |

**معايير إنجاز Phase B:**
- [ ] 16 ملف جديد في `showcase-data/*.html` + `showcase.js:6` يضم `P5/P6/P7` categories كاملة
- [ ] كل صفحة تفتح على `http://localhost:5178` بدون 404
- [ ] `npm run lint` + `build` أخضر — commit لكل 3-4 صفحات: `feat(showcase): add heading/paragraph/divider/layout (B1)`

---

### Phase C — الوحدات التفاعلية JS (Tier 2) — ⏱️ جلستان (~8 ساعات)

> **النمط الذهبي:** انسخ `src/modules/accordion.ts:1` حرفياً — `let initialized` + `on(document,'click', closest('[data-kairos-toggle="widget"]'))` + `State.open/close` + `emit('kairos:widget:before-open',{cancelable:true})` + `emit('kairos:widget:opened')` + `aria-expanded` sync. سجّل في `src/kairos.ts:1` (import + `init()` + `window.Kairos`) و `src/modules/index.ts:1` barrel. اختبر بـ `src/modules/accordion.test.ts:1` (≥5 tests).

| ID | الوحدة | الصعوبة | Spec | CSS | الحالة | التاريخ | Commit | Tests |
|---|---|---|---|---|---|---|---|---|
| **C1** | **Popover** | ⭐ سهل | `docs/component-specs/popover.md:1` | `src/components/popover.css:1` | ✅ | 2026-08-28 | `efecf3a` | 6 |
| **C2** | **Tooltip** | ⭐ سهل | `docs/component-specs/tooltip.md:1` | `src/components/tooltip.css:1` | ✅ | 2026-08-28 | `144da25` | 5 |
| **C3** | **TagInput** | ⭐⭐ متوسط | — استنتاج من `src/components/tag-input.css:1` (Enter/comma add, Backspace delete, hidden sync) | `tag-input.css` | ✅ | 2026-08-28 | `e394368` | 6 |
| **C4** | **Command** | ⭐⭐ متوسط | `docs/component-specs/command.md:1` | `src/components/command.css:1` | ✅ | 2026-08-28 | `67ea51c` | 6 |
| **C5** | **Sidebar** | ⭐ سهل | `docs/component-specs/sidebar.md:1` | `src/components/sidebar.css:1` | ✅ | 2026-08-28 | `feat: C5` | 6 |
| **C3** | **TagInput** | ⭐⭐ متوسط | — استنتاج من `src/components/tag-input.css:1` (Enter/comma add, Backspace delete, hidden sync) | `tag-input.css` | ⬜ | — | — | ≥5 |
| **C4** | **Command** | ⭐⭐ متوسط | `docs/component-specs/command.md:1` | `src/components/command.css:1` | ⬜ | — | — | ≥5 |
| **C5** | **Sidebar** | ⭐ سهل | `docs/component-specs/sidebar.md:1` | `src/components/sidebar.css:1` | ⬜ | — | — | ≥5 |
| **C6** | **Slider** | ⭐⭐⭐ صعب | — استنتاج من `src/components/slider.css:1` (pointer drag + `aria-valuenow` + arrows) | `slider.css` | ⬜ | — | — | ≥5 |

**دورة كل وحدة (كرر 6 مرات):**
```
1. اقرأ spec + CSS
2. src/modules/{id}.ts (نمط accordion.ts)
3. تسجيل kairos.ts + barrel
4. showcase-data/{id}.html تفاعلي (يستخدم data-kairos-*)
5. src/modules/{id}.test.ts (≥5: open/close, outside-click/Escape, before-* cancel, disabled, nesting)
6. تحقق: lint + tsc + test + build → commit
```

**معايير إنجاز Phase C:**
- [ ] 6 ملفات `src/modules/*.ts` + 6 `*.test.ts` + 6 showcase تفاعلية
- [ ] `src/modules/index.ts:1` يصدّر الـ 11 وحدة بدون TODO
- [ ] `npm run test` → 19 + (6×5)=49+ tests كلها خضراء

---

### Phase D — التكامل: Demos + Domain — ⏱️ جلسة (~4 ساعات)

#### D1 — Demos للوحدات الموجودة (Tier 3) — حالياً 0 استخدام لـ `data-kairos-*` في Showcase!

| ID | الصفحة | JS موجود | الحالة | التاريخ | Commit |
|---|---|---|---|---|---|
| **D1.1** | `modal.html` — `data-kairos-toggle="modal"` + `data-kairos-target` + `data-kairos-dismiss` + `data-backdrop="static"` | `src/modules/modal.ts:1` | ⬜ | — | — |
| **D1.2** | `dropdown.html` — `data-kairos-toggle="dropdown"` | `src/modules/dropdown.ts:1` | ⬜ | — | — |
| **D1.3** | `tabs.html` — `data-kairos-toggle="tab"` + `data-kairos-target` | `src/modules/tabs.ts:1` | ⬜ | — | — |
| **D1.4** | `toast.html` — `data-kairos-toggle="toast"` + duration | `src/modules/toast.ts:1` | ⬜ | — | — |

#### D2 — صفحات Domain L9 (Tier 4) — CSS خالص

| ID | الصفحة | CSS موجود | الحالة | التاريخ | Commit |
|---|---|---|---|---|---|
| **D2.1** | `bus.html` | `src/domain/bus.css:1` | ⬜ | — | — |
| **D2.2** | `shell.html` | `src/domain/shell.css:1` | ⬜ | — | — |
| **D2.3** | `multiview.html` | `src/domain/multiview.css:1` | ⬜ | — | — |
| **D2.4** | `rundown.html` | `src/domain/rundown.css:1` | ⬜ | — | — |
| **D2.5** | `production.html` | `src/domain/production.css:1` | ⬜ | — | — |
| **D2.6** | `ticker.html` | `src/domain/ticker.css:1` | ⬜ | — | — |

**معايير إنجاز Phase D:**
- [ ] 10 صفحات جديدة — كل `data-kairos-*` يعمل حياً على `localhost:5178`
- [ ] `tests/e2e/*.spec.ts` محدثة من `tests/e2e/modal.spec.ts:1` (4 e2e جديدة)

---

### Phase E — بوابة الإصدار v1.0 (Hardening) — ⏱️ جلسة

| ID | المهمة | الملفات | الحالة | التاريخ | Commit |
|---|---|---|---|---|---|
| **E1** | Unit tests للـ Core الناقص | `src/core/keyboard.test.ts` `focus.test.ts` `dom.test.ts` `utils.test.ts` `animation.test.ts` | ⬜ | — | — |
| **E2** | Playwright e2e لكل وحدة (axe a11y) | `tests/e2e/popover.spec.ts` `tooltip.spec.ts` `command.spec.ts` `sidebar.spec.ts` `slider.spec.ts` `tag-input.spec.ts` — نسخ `tests/e2e/modal.spec.ts:1` | ⬜ | — | — |
| **E3** | تنظيف ديون M المتبقية | `src/domain/*` glows, `AGENTS.md:1` تحديث TS ESM | ⬜ | — | — |
| **E4** | docs + CHANGELOG + version bump | `CHANGELOG.md:1` `package.json:3` `1.0.0` | ⬜ | — | — |
| **E5** | بوابة v1.0 — التحقق النهائي | — | ⬜ | — | — |

**بوابة v1.0 — يجب أن تكون كلها ✅:**
```
[ ] npm run lint        → 0 errors (`src/**/*.css` 75 file)
[ ] npx tsc --noEmit    → 0 errors
[ ] npm run test        → كل tests خضراء (≥50 test)
[ ] npm run build       → dist/kairos.min.css + kairos.mjs + kairos.umd.js
[ ] كل مكوّن L2-L8 له showcase في KairosInventory
[ ] كل مكوّن تفاعلي له JS module + ≥5 tests + demo data-kairos-*
[ ] git tag v1.0.0 && git push --tags
```

---

## سجل التقدم — Progress Log

> كل commit يضيف صفاً هنا. الأحدث أولاً.

| التاريخ | Phase | ID | ما تم | Commit | تحقق | الملاحظات |
|---|---|---|---|---|---|---|
| 2026-08-28 01:35 | C4 | **Command** | C4 مكتمل: Ctrl+K + filter + arrows + Enter (6 tests) | `67ea51c` | lint✅ tsc✅ test42✅ build199.03kB✅ | command.ts + command.test.ts + kairos.ts + showcase.js |
| 2026-08-28 01:05 | C3 | **TagInput** | C3 مكتمل: Enter/comma + Backspace + remove + hidden sync (6 tests) | `e394368` | lint✅ tsc✅ test36✅ build199.03kB✅ | tag-input.ts + tag-input.test.ts + kairos.ts |
| 2026-08-28 00:50 | C2 | **Tooltip** | C2 مكتمل: focus + aria-describedby + Escape (5 tests) | `144da25` | lint✅ tsc✅ test30✅ build199.03kB✅ | tooltip.ts + tooltip.test.ts + kairos.ts |
| 2026-08-28 00:30 | C1 | **Popover** | C1 مكتمل: JS module + 6 tests + showcase تفاعلي (popover.html) | `efecf3a` | lint✅ tsc✅ test25✅ build199.03kB✅ | popover.ts + popover.test.ts + kairos.ts + showcase.js |
| 2026-08-28 00:20 | B4 | **B4.1-B4.4** | B4 مكتمل: navigation/table/split-grid/tooltip (4 showcase + showcase.js P6/P7/P8) | `56422a7` | lint✅ tsc✅ test19✅ build199.03kB✅ | showcase-data/*4 + showcase.js — Phase B مغلقة (31 showcase) |
| 2026-08-28 00:05 | B3 | **B3.1-B3.5** | B3 مكتمل: indicator/tag/loading/progress/surface/overlay (6 showcase + showcase.js P3+P6) | `2ec444f` | lint✅ tsc✅ test19✅ build198.91kB✅ | showcase-data/*6 + showcase.js |
| 2026-08-27 23:55 | B2 | **B2.1-B2.4** | B2 مكتمل: switch/forms/slider/tag-input (4 showcase + showcase.js P4) | `9dadbc1` | lint✅ tsc✅ test19✅ build198.91kB✅ | showcase-data/*4 + showcase.js |
| 2026-08-27 23:45 | B1 | **B1.1-B1.4** | B1 مكتمل: heading/paragraph/divider/layout (4 showcase + showcase.js P2) | `90d8aaf` | lint✅ tsc✅ test19✅ build198.91kB✅ | showcase-data/*4 + showcase.js |
| 2026-08-27 23:35 | A | **A1-A4** | Phase A مكتمل: idempotent(4) + 9 phantom + 7 raw tokens + ARCHITECTURE.md | `b67646b` | lint✅ tsc✅ test19✅ build198.91kB✅ | 4 files JS + components.css + layout + domain(3) + docs |
| 2026-08-27 23:20 | — | — | إنشاء `EXECUTION-TRACKER.md` + تحليل شامل للمشروع (4 وكلاء متوازيين) | — | lint✅ tsc✅ test19✅ build197.85kB✅ | baseline: 5 commits `b06c61d`، 13 showcase، 5 modules |
| — | — | — | — | — | — | — |

---

## مؤشرات سريعة

**إجمالي المهام:** `Phase A:4 + B:16 + C:6 + D:10 + E:5 = 41 مهمة`
**المنجز:** `26/41` (63%) ✅ Phase A + B (20) + C1 + C2 + C3 + C4 مكتمل
**بعد B:** `22/41` (54%) · **بعد C:** `28/41` (68%) · **بعد D:** `38/41` (93%) · **بعد E:** `41/41` (100% v1.0)

**الوقت التقديري المتبقي:** `3–5 جلسات` (حسب `PROJECT-HANDOVER.md:24`)

---

*المرجع الكامل: `AI-CONTEXT.md:9` Tiers + `PROJECT-HANDOVER.md:204` Phases + `AGENTS.md:1` Hard Rules + `KAIROS-CONSTITUTION.md:1` Design Laws*
*حدّث هذا الملف بعد كل خطوة — هو عقد العمل بينك وبين المستقبل.*
