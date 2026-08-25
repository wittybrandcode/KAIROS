# KAIROS v1.0 — PROJECT STATUS REPORT & HANDOVER
**تقرير الحالة الكامل وخطة إكمال النسخة الأولى الدقيقة**

---

## الملخص التنفيذي

Kairos هو نظام تصميم لمساحات تحكم البث التلفزيوني (switchers, routers, audio consoles).
CSS خالص + TypeScript بدون أي framework وقت التشغيل.

| المحور | الحالة |
|--------|--------|
| **Foundation (L0)** | ✅ مكتمل 100% — 15 ملف، نظيف |
| **Contracts (L1)** | ⚠️ 95% — 6 tokens وهمية غير معرّفة (C5) |
| **Components CSS (L2–L8)** | ✅ 42 ملف موجودة ونظيفة (لا قيم خام تقريباً) |
| **Domain CSS (L9)** | ✅ 13 ملف نظيفة بعد جولة التنظيف الأخيرة |
| **JS Core** | ✅ 8 وحدات مكتملة وممتازة (2 فقط مختبرة) |
| **JS Modules** | ⚠️ 4 من 11 — modal, dropdown, tabs, toast فقط |
| **Showcase HTML** | ❌ 12 من ~40 صفحة مطلوبة |
| **Tests** | ❌ 13 unit test + 1 e2e فقط |
| **Git** | 🔴 **غير مهيأ نهائياً — أولوية قصوى قتالية** |

**نسبة الإنجاز التقديرية للنسخة v1.0: ~65%**
**الجهد المتبقي التقديري: 3–5 جلسات عمل مركزة**

---

## 1. لقطة المشروع (Snapshot)

```
Stack:     Vanilla CSS + TypeScript ES Modules + Vite 8
Runtime:   صفر dependencies (كل شيء devDependencies)
Icons:     1,512 أيقونة Phosphor مولّدة تلقائياً (registry.ts = 6057 سطر)
Build:     dist/kairos.min.css (193KB) · kairos.mjs (688KB) · kairos.umd.js (666KB)
Dev:       npm run dev → localhost:5178 (strictPort)
Tests:     vitest (jsdom) + Playwright e2e (⚠️ منفذ خاطئ — انظر B2)
Docs:      docs/ يحوي 48 ملفاً منها الدستور والـ specs
```

### الأوامر المتاحة
```bash
npm run dev          # Vite dev server — port 5178
npm run build        # icons → vite lib → patterns
npm run lint         # stylelint مع 4 قواعد Kairos مخصصة
npm run lint:fix
npm run test         # vitest run (13 اختباراً حالياً)
npm run test:e2e     # Playwright (⚠️ يحتاج إصلاح المنفذ أولاً)
npm run test:smoke   # يتخطى نفسه (patterns/ غير موجود)
```

### معمارية الطبقات (src/kairos.css)
```
L0 Foundation      15 ملف   fonts·colors·spacing·typography·sizes·motion·focus...
L1 Contracts        2       contracts.css (intent/variant/state) + components.css (عقود المكوّنات)
L2 Layout           3       utilities/layout + components/layout + divider
L3 Content          9       core·icons·badge·kbd·code·link·heading·paragraph·data-display
L4 Input            7       buttons·forms·checkbox·radio·switch·slider·tag-input
L5 Feedback         8       loading·progress·feedback·status-dot·indicator·tag·toast·alert
L6 Overlay          6       overlay·popover·surface·modal·dropdown·tooltip
L7 Navigation       2       navigation·tabs
L8 Composite        6       accordion·command·sidebar·table·split-grid·composites
L9 Domain          13       bus·shell·multiview·production·rundown·ticker...
Themes              2       dark فقط (ممنوع light) — themes.css فارغ placeholder
Utilities           2       ~250 كلاس ذرية + app-shell scaffolding
```

---

## 2. ما اكتمل فعلياً ✅

1. **كل الـ CSS**: 42 مكوّن + 13 domain — كلها تستعمل `var(--kairos-*)` حصراً، لا hex خام، لا border-radius، حركات ≤300ms (استثناءان موثقان أدناه).
2. **نظام العقود**: كل مكوّن يعرّف متغيراته في `components.css` والـ linter (`kairos/contract-enforcement`) يمنع استخدام `--kairos-space-*` و`--kairos-cs-*` مباشرة داخل components/domain.
3. **JS Core ممتاز**: `dom·events·state·focus(trap/restore)·keyboard(hotkey/arrows)·animation(waitTransition)·observer·utils` — كل API يعيد cleanup function.
4. **4 وحدات سلوكية بنفس النمط**: Modal/Dropdown/Tabs/Toast — كلها event delegation عبر `data-kairos-*` + lifecycle events قابلة للإلغاء (`before-open/close`) + انتقالات عبر `waitTransition`.
5. **محرك الأيقونات**: يستبدل `<i class="kairos-icon-*">` بـ SVG مع viewBox محسوب بدقة + MutationObserver للمحتوى الديناميكي.
6. **جولتا تنظيف شاملتان**: جميع القيم الخام تقريباً تحولت إلى عقد tokens (بقيت مواضع معدودة — قسم 4).

---

## 3. الفجوات (ما تبقى) ❌

### 3.1 Showcase HTML — 28 صفحة ناقصة
موجود: `typography, icons, badges, buttons, checkbox, radio, kbd, code, link, data-display, alert, status-dot`
ناقص (الأهم أولاً):
```
switch · forms · slider · tag-input                    (يكمل P4 Inputs)
indicator · tag · toast · progress · loading           (P5 Feedback)
modal · dropdown · tooltip · popover · overlay · surface (P6 Overlay — تحتاج data-kairos demo!)
tabs · navigation                                       (P7)
accordion · command · table · sidebar · split-grid      (P8 Composite)
heading · paragraph · layout                            (P2/L2 السهلة — ابدأ بهم للتدفئة)
```
ثم صفحات Domain: bus · shell · multiview · rundown · production.

> **قاعدة**: كل صفحة showcase تُنشأ بنفس نمط `checkbox.html`: عنوان + أقسام `States/Intents/Sizes` + مثال بث واقعي، وتُسجَّل في مصفوفة `KairosInventory` أعلى `showcase.js`.

### 3.2 JS Modules — 7 وحدات سلوكية مفقودة
CSS موجود وجاهز ينتظر كاتب حالة (`data-state`). بالترتيب المقترح:

| الوحدة | السلوك المطلوب | ملاحظة تسريع |
|--------|----------------|---------------|
| **Accordion** | toggle trigger → panel، aria-expanded | انسخ نمط tabs.ts حرفياً |
| **Popover** | فتح/إغلاق + خارج-نقر + Escape | positioning ثابت (4 variants جاهزة CSS) |
| **Tooltip** | focus-trigger + aria-describedby | hover موجود CSS؛ أضف keyboard فقط |
| **Command** | Ctrl+K + فلترة + أسهم | `core.keyboard.hotkey()` جاهز وغير مستخدم! |
| **Slider** | pointer drag + keyboard + aria-valuenow | الأصعب تقنياً |
| **TagInput** | Enter/comma إضافة، Backspace حذف | سهل |
| **Sidebar** | collapse/expand + active state | سهل |

### 3.3 Tests
- Unit لكل module جديد (jsdom + testing-library متوفرة)
- Unit للـ core غير المختبَر: `keyboard, focus, utils, dom`
- e2e لكل interactive module (انسخ نمط `tests/e2e/modal.spec.ts` مع axe)

---

## 4. الأخطاء الحرجة وحلولها 🔧

### C1 — 🔴 المشروع بلا Git (أولوية قصوى مطلقة)
`.git` غير موجود. أي نقل للجهاز الآخر = نسخ يدوي معرض للفقد.
```bash
git init
git add -A && git commit -m "chore: baseline before handover"
# ثم ارفع لـ GitHub/GitLab private قبل لمس أي شيء آخر
```
(يوجد ملف غريب اسمه `nul` في الجذر — احذفه قبل الإضافة.)

### C2 — مخالفة قاعدة الحركة
`src/components/navigation.css:61`:
```css
.kairos-status-dot[data-state="recording"] { animation: kairos-pulse 1.2s ease-in-out infinite; }
```
**الحل**: `300ms`.

### C3 — تعارض الـ disabled opacity (3 معايير متنافسة!)
- `forms.css:58`, `tabs.css:43` → 0.32 ✔ token
- `buttons.css:39` → **0.4 خام** ✘
- `contracts.css:114` → **0.4 محلي** ✘
**الحل**: وحّد الكل على `var(--kairos-opacity-disabled)` وقرر: هل الرقم القياسي 0.32 أم 0.4؟ (قرار تصميمي واحد يُطبق مرة واحدة.)

### C4 — Fallback مضلل
`status-dot.css:6-7` يستعمل `var(--kairos-size-dot, 8px)` لكن التوكن فعلياً **6px**.
**الحل**: استخدم `var(--kairos-size-dot-md)` (8px فعلاً) أو أزل الـ fallback.

### C5 — عقود وهمية (Phantom tokens)
`contracts.css:93-106` يشير إلى `--kairos-comp-padding-{sm,md,lg}-{x,y}` وهي **غير معرّفة في أي مكان** — النظام كله يعمل على fallbacks خام (2/6/12/24px).
**الحل**: عرّفها في `components.css` مربوطة بـ space tokens:
```css
--kairos-comp-padding-sm-y: var(--kairos-space-3xs);  --kairos-comp-padding-sm-x: var(--kairos-space-xs);
--kairos-comp-padding-md-y: var(--kairos-space-xs);   --kairos-comp-padding-md-x: var(--kairos-space-md);
--kairos-comp-padding-lg-y: var(--kairos-space-md);   --kairos-comp-padding-lg-x: var(--kairos-space-xl);
```

### B1 — 🔴 كلاسات مكسورة في showcase أنشأناها حديثاً
- `.kairos-gap-xs` مستخدمة في `checkbox.html` و`status-dot.html` — **غير موجودة** (الموجود: `gap-extra-tight/compact/standard/loose`)
- `.kairos-bg-muted / .kairos-bg-pgm / .kairos-bg-pvw` في `data-display.html` — **غير موجودة**
**الحل**: استبدل `gap-xs` → `gap-extra-tight`، وأضِف الثلاث bg أو استبدلها بـ `bg-surface` + inline style مؤقت حتى تُضاف كـ utilities رسمية.

### B2 — e2e معطّل: تعارض منافذ
Vite strict على **5178** بينما Playwright webServer/baseURL على **5173**.
**الحل**: وحّد على 5178 في `playwright.config`.

### B3 — Barrel مكسور كامن
`src/modules/index.ts` يصدّر `Accordion/Sidebar/Command` من ملفات **غير موجودة**. لا يضر الآن لأن kairos.ts يستورد مباشرة — لكنه قنبلة موقوتة.
**الحل**: إما أنشئ الوحدات الثلاث (مخطط أصلاً) أو علّق الأسطر حتى إنشائها.

### B4 — توكن ميت يخالف القاعدة
`foundation/motion.css:12` → `--kairos-motion-overlay: 400ms` غير مستخدم أبداً ويؤسس لمدة تخالف دستور الـ 300ms.
**الحل**: احذفه أو عدّله 300ms.

### M — ديون متوسطة (جدولة لاحقة)
- `domain/shell.css` — container-query breakpoints خام (200/160/600/400/240px) بدل توكنز breakpoints
- ticker/marquee (10s–40s): حركة وظيفية للبث — **وثّق استثناءً رسمياً** في AGENTS.md بدل تركها رمادية
- ~10 مواضع px متفرقة: multiview `-3px/1px`، rundown `40px`، box-shadow glows في production.css، layout.css `210px/-3px`
- `AGENTS.md` يقول "IIFE vanilla JS" بينما الواقع TS ESM — حدّث الوثيقة

---

## 5. منهجية العمل لإكمال v1.0 📋

### القواعد غير القابلة للتفاوض (من AGENTS.md + الدروس المستفادة)
1. `border-radius: 0` دائماً — الـ linter يمنع
2. ألوان باردة فقط + 4 status (PGM أحمر/PVV أخضر/Warning أصفر/Info أزرق) — لا warm colors
3. CSS خالص، صفر frameworks
4. حركة ≤ **300ms** (استثناء موثق فقط: ticker/marquee)
5. مربعات ومستطيلات فقط — لا دوائر/pills
6. UPPERCASE افتراضياً مع letter-spacing واسع
7. **التسمية**: `--kairos-{category}-{name}`, `.kairos-{component}-{element}`, `data-kairos-{action}`
8. **المسافات**: 5 مستويات فقط (`extra-tight 2 / compact 6 / standard 12 / loose 24 / extra-loose 48`)
9. **نمط المكوّن**: CSS = خصائص التصميم فقط عبر عقد tokens؛ الخصائص الهيكلية (`appearance/display/cursor/position:relative...`) تعيش في كلاس `.kairos-input` المشترك
10. **JS**: TS ESM، delegation عبر `data-kairos-*`، DOM هو مصدر الحقيقة (`data-state`)، CSS يملك الرندرة، أحداث lifecycle قابلة للإلغاء

### دورة العمل الثابتة لكل مكوّن (كرّرها)
```
1. اقرأ spec المكوّن في docs/component-specs/ إن وُجد
2. أكمل CSS الناقص إن وجد (عبر عقد tokens حصراً)
3. أنشئ showcase-data/{id}.html (أنماط checkbox.html)
4. سجّله في KairosInventory أعلى showcase.js
5. إن كان تفاعلياً: أنشئ src/modules/{id}.ts بنمط tabs.ts + سجّله في kairos.ts init()
6. اختبر يدوياً على localhost:5178 ثم: npm run lint && npm run test && npm run build
7. commit
```

### خارطة الطريق المقترحة (7 مراحل)

**Phase 0 — اليوم قبل أي شيء (30 دقيقة)**
```
□ git init + commit + push remote
□ حذف ملف nul
□ إصلاح B1 (كلاسات gap-xs/bg-muted المكسورة)
□ إصلاح C2 (1.2s → 300ms)
□ إصلاح B2 (توحيد منفذ playwright=5178)
□ تعليق barrel المكسور B3
```

**Phase 1 — توحيد الأساس (جلسة)**
```
□ قرار C3: معيار disabled opacity واحد + تطبيقه
□ حل C5: تعريف الـ 6 padding phantom tokens
□ حل C4: fallback الـ status-dot
□ حذف motion-overlay الميت (B4)
□ توثيق استثناء ticker/marquee في AGENTS.md
□ Utilities الناقصة: gap-xs؟ لا — أضف bg-muted/pgm/pvw رسمياً
```

**Phase 2 — Showcase السهل (جلسة)** — heading·paragraph·layout·divider·surface·overlay·indicator·tag·loading·progress·table·kbd إضافات
> كل واحدة ≈ 15 دقيقة بالنمط الجاهز

**Phase 3 — JS Modules السبعة (جلستان)** — بالترتيب: Accordion → Popover → Tooltip → TagInput → Command → Sidebar → Slider
> لكل واحدة: module.ts + تسجيل في kairos.ts + showcase تفاعلي + unit test

**Phase 4 — Overlay & Navigation Demos (جلسة)**
> modal/dropdown/tabs/toast موجودة JS — تنقصها صفحات showcase تُظهر data-kairos-* شغالة فعلاً (حالياً لا يوجد أي HTML في المستودع يستخدم data-kairos-*!)

**Phase 5 — Domain Pages (جلسة)** — bus·shell·multiview·rundown·production

**Phase 6 — التصلب (جلسة)**
```
□ unit tests للـ core الناقص (keyboard·focus·utils·dom)
□ e2e لكل module مع axe accessibility
□ تنظيف ديون M المتبقية
□ تحديث AGENTS.md (TS ESM وليس IIFE)
□ CHANGELOG.md + رفع version إلى 1.0.0
```

**Phase 7 — بوابة الإصدار v1.0**
```
✓ lint: 0 errors
✓ test: كل الاختبارات خضراء
✓ build: ينتج dist سليمة
✓ كل مكوّن له صفحة showcase
✓ كل مكوّن تفاعلي له JS module + e2e
✓ docs محدّثة وتطابق الواقع
✓ git tag v1.0.0
```

---

## 6. معلومات النقل للجهاز الآخر 💾

### ما يجب نقله (إضافة لكامل المجلد)
1. **المجلد كاملاً** (بدون node_modules — سيُعاد تثبيتها)
2. هذا التقرير (`PROJECT-HANDOVER.md`)
3. **الأهم**: أنشئ الريبو البعيد *قبل* النقل

### خطوات التشغيل على الجهاز الجديد
```bash
npm install          # يعيد بناء node_modules
npm run build:icons  # يولّد src/icons/registry.ts (موجود لكن تأكد)
npm run dev          # → http://localhost:5178
```
> متطلب: Node حديث (Vite 8 + TS 6). لو فشل `npm run dev` بسبب Execution Policy في PowerShell:
> `powershell -ExecutionPolicy Bypass -Command "npm run dev"`

### أخطاء شائعة في هذه البيئة (Windows)
- PowerShell يمنع npm.ps1 → استخدم `powershell -ExecutionPolicy Bypass -Command "npm ..."`
- لا تستخدم `&&` في PowerShell 5.1 → استخدم `;` أو نفّذ الأوامر منفصلة
- مسار المشروع فيه مسافة ("kairos v 1.0") — اقتبس المسارات دائماً

---

## 7. جدول المسؤولية السريع

| # | المهمة | الأولوية | الوقت | الملف |
|---|--------|----------|-------|-------|
| 1 | git init + remote + push | 🔴 قاتلة | 15د | — |
| 2 | إصلاح كلاسات showcase المكسورة | 🔴 عالية | 10د | checkbox/status-dot/data-display.html |
| 3 | animation 1.2s → 300ms | 🔴 عالية | 1د | navigation.css:61 |
| 4 | توحيد disabled opacity | 🟠 عالية | 20د | buttons.css + contracts.css |
| 5 | تعريف phantom padding tokens | 🟠 عالية | 10د | components.css |
| 6 | إصلاح منفذ Playwright | 🟠 متوسطة | 5د | playwright.config |
| 7 | 28 صفحة showcase | 🟡 أساسية | 6-8س | showcase-data/ |
| 8 | 7 JS modules + tests | 🟡 أساسية | 8-10س | src/modules/ |
| 9 | تنظيف ديون M | 🟢 تحسين | 2س | متفرقات |
| 10 | تحديث docs + CHANGELOG | 🟢 إصدار | 1س | docs/ |

---
*تم إنتاج هذا التقرير عبر تحليل موازٍ بأربعة وكلاء متخصصين: المعمارية، اكتمال المكوّنات، تدقيق JavaScript، وتقييم الدين التقني.*
