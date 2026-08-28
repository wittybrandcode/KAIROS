# KAIROS — CORRECTION PLAN
> **خطة تصحيح شاملة للمكونات الغريبة** — `Production` + `Multiview` + `Shell` + `Command`
> الهدف: إعادة هذه الأجزاء إلى دستور كايروس (hard edges, cool steel + 4 status, squares, uppercase, 300ms) وربطها بمكان عملها الحقيقي داخل `Shell`.

**تاريخ:** 2026-08-28 03:20 UTC — بعد `v1.0.0` `30fd2ac` (75 tests, 43 showcases)
**الحالة قبل التصحيح:** `lint 0` · `tsc 0` · `test 75/75` · `build 199.03kB` — لكن 4 مكونات بلا ملامح كايروس بصرية
**المرجع:** `KAIROS-CONSTITUTION.md:1` + `docs/architecture/DESIGN-LAWS.md:1` + `AGENTS.md:36` Hard Rules

---

## 1 · لماذا تبدو غريبة — التشخيص السريع

| المكون | الملف | ما يخالف الدستور | أين يجب أن يعمل (مفقود) |
|---|---|---|---|
| **Production** | `src/domain/production.css:1` (181 سطر) | `glow` `0 0 4px` `production.css:16` و `inset 0 0 20px` `production.css:34` — blur ممنوع (kaios = `border 1px` حاد فقط). `200x120` `production.css:25` و `80px` `production.css:144` خام بلا `space`. `knob` `production.css:51` يوحي بدائرة. بلا `uppercase+tracking` | داخل `multiview` + `bus` + `shell.center` `src/domain/shell.css:43` — حالياً معزول في `showcase-data/production.html:1` |
| **Multiview** | `src/domain/multiview.css:1` (90 سطر) | `border-thick 2px` `multiview.css:9` على كل الخلايا (kaios: `1px` افتراضي، `2px` فقط `active`). `outline-offset -3px` `multiview.css:25` سالب مخصص. `label` `multiview.css:42` `bg-surface` تباين ضعيف (يجب `bg-pgm/pvw` صارخ عند `ON AIR`) | داخل `shell.center` و `shell.right-panel` `src/domain/shell.css:92` كـ `grid` متجاوب — `showcase-data/multiview.html:1` يعرض 4 خلايا منفصلة بلا `grid` |
| **Shell** | `src/domain/shell.css:1` (131 سطر) | `@container 200/160/600/400/240px` `shell.css:33` خام بلا `var(--kairos-bp-*)`. `260px 1fr 280px` `shell.css:8` بلا `contract`. `top-bar`/`status-bar` `shell.css:7` بلا `tally`/`rec`/`meters` — يبدو `admin dashboard` عام | هو `kairos-stage` `shell.css:7` `100vh` الحاوي لكل شيء — `showcase-data/shell.html:1` يعرضه `300px` داخل بطاقة، ليس `app shell` حقيقي |
| **Command** | `src/components/command.css:1` (101 سطر) | `shadow-lg` `command.css:13` غير معرّف أصلاً (أضفنا alias `components.css:840`). `max-width 600px` `command.css:10` خام. `input` `command.css:30` بلا `tracking-widest`. أيقونة `magnifying-glass` كانت 256px (أصلحنا `command.html:28` `kairos-icon-sm`) لكن اللوحة لا تزال `spotlight` عام بلا `PGM/PVW`/`tally`/`bus` | المفروض `Ctrl+K` داخل `shell` `src/domain/shell.css:7` لتبديل المصادر بسرعة — `showcase-data/command.html:1` يعرضها `modal` منفصل بلا سياق `switcher` |

**القاسم المشترك:** الأربعة **تستخدم `var(--kairos-*)` تقنيًا** لكنها **تفتقد `uppercase + tracking-widest` + `border 1px حاد` + `PGM/PVW صارخ` + `space 2/6/12/24/48`** — لذلك تبدو "محاكاة عامة" وليست `control surface`.

---

## 2 · مبادئ التصحيح (لا نخرج عن كايروس)

1. **الدستور أولاً:** `border-radius:0` `src/foundation/reset.css:8` — `cool steel + 4 status` `src/foundation/colors.css:12` — `≤300ms` `src/foundation/motion.css:7` (استثناء `ticker` فقط) — `squares` — `uppercase tracking-widest` `AGENTS.md:36`
2. **العقد أولاً:** كل `px` خام → `var(--kairos-space-* / --kairos-size-* / --kairos-component-*)` في `src/components/components.css:1` — اللينتر `kairos/contract-enforcement` يمنع `var(--kairos-space-*)` مباشرة في `components/domain`
3. **المكان أولاً:** `shell` هو الحاوي — `multiview` و `production` و `command` يجب أن تُعرض **داخل `shell`** في `showcase` (كما في `shell.css:43` `center` + `side-panel` + `right-panel`)، ليس كجزر منفصلة
4. **الشكل لاحقًا:** نثبت الأصول (tokens + `data-state`) أولاً — أي تعديل لاحق في `foundation` سيُحدّث الـ 43 showcase تلقائيًا

---

## 3 · خطة التصحيح — 4 مراحل (6 أيام عمل)

### Phase R1 — Production: من `glow` إلى `hard edge` (يومان)

| ID | المهمة | الملف:السطر | الإصلاح | التحقق |
|---|---|---|---|---|
| **R1.1** | إزالة `glow` | `production.css:16` `0 0 4px` + `production.css:34` `inset 0 0 20px` | استبدل `box-shadow: glow` بـ `border: 2px solid` + `background: var(--kairos-pgm-alpha-20)` (مثل `bus` `src/domain/bus.css:1`) | `lint0` + بصري: `pgm`/`pvw` حاد بلا ضباب |
| **R1.2** | ترميز الأبعاد | `production.css:25` `200/120` + `production.css:144` `80px` + `production.css:69` `timeline-track-height` | عرّف `--kairos-viewport-width/height` و `--kairos-vu-meter-height` في `components.css:1` كـ `var(--kairos-space-* )` أو `control-*` | `grep -r "200px" src/domain` = 0 |
| **R1.3** | `uppercase + tracking` | `production.css:36` `source-label` + `production.css:51` `knob` | أضف `text-transform:uppercase; letter-spacing:var(--kairos-tracking-widest)` + `font-weight:bold` | `AGENTS.md:36` مكتمل |
| **R1.4** | `knob` من دائرة إلى مربع | `production.css:51` `width: toggle` | أضف `border-radius:0` صريح + `aspect-ratio:1` + `background: var(--kairos-bg-surface)` + `border: 2px` | بصري: مربع حاد لا يوحي بدائرة |
| **R1.5** | ربطه بـ `shell` | `showcase-data/production.html:1` | أعد كتابة الـ showcase ليعرض `crosspoint` + `viewport` + `timeline` **داخل `kairos-stage` `kairos-shell`** (كما في `shell.html:1`) مع `PGM`/`PVW` حقيقي | `http://localhost:5178` `production` يبدو جزءًا من `shell` لا جزيرة |

### Phase R2 — Multiview: من `2px` عام إلى `1px` + `tally` صارخ (يوم)

| ID | المهمة | الملف:السطر | الإصلاح | التحقق |
|---|---|---|---|---|
| **R2.1** | `border` | `multiview.css:9` `border-thick 2px` على كل `.kairos-mv` | غيّر إلى `border-base 1px` افتراضي، `border-thick 2px` فقط عند `.pgm`/`.pvw`/`sel` | `multiview.css:16` يبقى `border-color: pgm/pvw` |
| **R2.2** | `outline-offset` | `multiview.css:25` `-3px` | استبدل بـ `calc(-1 * var(--kairos-border-thick))` أو عرّف `--kairos-mv-outline-offset` كـ `var(--kairos-border-thick)` | `grep outline-offset` = token |
| **R2.3** | `label` تباين | `multiview.css:42` `bg-surface` | عند `.pgm` اجعل `label` `bg-pgm` `color: var(--kairos-bg-deep)` (كما هو) لكن أضف `font-weight:bold` + `tracking-widest`؛ عند `pvw` اجعل `color: var(--kairos-bg-deep)` صارخ | بصري: `ON AIR` يصرخ |
| **R2.4** | `small` variant | `multiview.css:80` `min-height 40px` | وحّد مع `production` `viewport-sm` عبر `--kairos-mv-sm-min-height: var(--kairos-control-sm)` | `components.css:1` موحّد |
| **R2.5** | ربطه بـ `shell` | `showcase-data/multiview.html:1` | اعرض `multiview` كـ `grid` `4-up` **داخل `shell.right-panel`** مع `tally` حقيقي `PGM`/`PVW`، ليس 4 خلايا منفصلة | `shell.css:92` `right-panel` يحتوي `multiview` |

### Phase R3 — Shell: من `px خام` و `admin` عام إلى `broadcast shell` (يوم)

| ID | المهمة | الملف:السطر | الإصلاح | التحقق |
|---|---|---|---|---|
| **R3.1** | `container` tokens | `shell.css:33` `200/160/600/400/240px` | احذف `px` الخام، استبدل بتعليق `/* --kairos-bp-sm/md/lg */` + وحّد مع `foundation/breakpoints.css:7` `360/480/768` — وثّق أن `var()` لا يعمل في `@container` لكن التعليق يربطه | `grep "200px" src/domain/shell.css` = تعليق فقط |
| **R3.2** | `260px 1fr 280px` | `shell.css:8` | انقل `260/280` إلى `components.css:1` كـ `--kairos-shell-panel-side/main` مع `var(--kairos-space-*)` أو `control` + `layout.css:17` | `shell.css:8` يستخدم tokens فقط |
| **R3.3** | `top-bar` بلا `tally` | `shell.css:7` `top-bar` | أضف `tally` `PGM`/`PVW` + `rec` + `audio meters` `shell.css:122` `audio-section` داخل `top-bar` و `status-bar` `shell.css:20` | `showcase-data/shell.html:1` يبدو `switcher` لا `dashboard` |
| **R3.4** | `showcase` حقيقي | `showcase-data/shell.html:1` `height:300px` | اجعل `shell` يملأ `100vh` في الـ showcase (كما في `index.html:7` `kairos-stage`) مع `side-panel` `center` `right-panel` كاملة | `http://localhost:5178` `shell` يملأ الشاشة |

### Phase R4 — Command: من `spotlight عام` إلى `broadcast palette` (يومان)

| ID | المهمة | الملف:السطر | الإصلاح | التحقق |
|---|---|---|---|---|
| **R4.1** | `shadow` + `max-width` | `command.css:10` `600px` + `command.css:13` `shadow-lg` | `600px` → `--kairos-command-max-width` موجود `components.css:1`، `shadow-lg` → `shadow-modal` `src/foundation/elevation.css:1` | `grep "600px" src/components/command.css` = 0 |
| **R4.2** | `input` tracking | `command.css:30` | أضف `text-transform:uppercase; letter-spacing:var(--kairos-tracking-wider)` + `font-weight:bold` | `AGENTS.md:36` |
| **R4.3** | `palette` داخل `shell` | `showcase-data/command.html:24` `kairos-modal` | غيّر الـ showcase ليعرض `command` **داخل `shell.center`** مع `bus` `src/domain/bus.css:1` و `PGM/PVW` حقيقي، ليس `modal` منفصل — `Ctrl+K` يفتح `command` فوق `shell` مع `backdrop` `kairos-overlay` `src/components/overlay.css:15` | `command` يبدو جزءًا من `shell` |
| **R4.4** | `empty + scroll` | `command.css:44` `max-height 300px` | أضف `empty state` `No results` موجود `command.ts:55` لكن اجعله `kairos-text-color-muted` `uppercase` + `tracking` | `command.spec` `Empty State` |
| **R4.5** | أيقونة (تم) | `command.html:28` `magnifying-glass` | تم إصلاح `a89fbd3` `kairos-icon-sm` — تحقق بصري أن `16px` لا تغطي `input` | `http://localhost:5178` `command` طبيعي |

---

## 4 · أين تعمل — خريطة التكامل بعد التصحيح

```
kairos-stage (100vh) src/domain/shell.css:7
├── kairos-top-bar (tally + rec + meters) — R3.3
├── kairos-shell (260px 1fr 280px) — R3.2
│   ├── kairos-side-panel (sources + scenes) — R3.3
│   ├── kairos-center (switcher + multiview + production) — R1.5 + R2.5 + R4.3
│   │   ├── kairos-mv (4-up) — R2
│   │   ├── kairos-viewport (pgm/pvw) + kairos-xp-cell — R1
│   │   └── kairos-command (Ctrl+K) — R4
│   └── kairos-right-panel (metrics + events + ticker) — R3.3
└── kairos-status-bar (tally + timecode) — R3.3
```

كل `showcase-data/*.html:1` بعد التصحيح سيعرض المكون **داخل `shell`** (كما في `index.html:7`) — لذلك سيحمل ملامح كايروس تلقائيًا (hard edge + cool steel + PGM/PVW).

---

## 5 · التحقق — Definition of Done للتصحيح

```
[ ] npm run lint → 0 (لا border-radius، لا warm، لا raw px خارج foundation)
[ ] npx tsc --noEmit → 0
[ ] npm run test → 75/75 + 4×5 (R1-R4) = 95/95
[ ] npm run build → 199.03kB CSS / 721.61kB MJS
[ ] كل 4 showcases تعرض داخل shell — http://localhost:5178 يبدو control surface لا dashboard
[ ] git commit per phase: fix(production): R1, fix(multiview): R2, fix(shell): R3, feat(command): R4
[ ] EXECUTION-TRACKER.md:1 محدث — R1-R4 → 45/41 (100%+)
```

---

## 6 · المخاطر وكيف نتجنبها

* **لا نخرج عن كايروس:** أي `px` جديد → `components.css:1` contract؛ أي لون → `cool steel + 4 status` `colors.css:12`؛ أي حركة → `≤300ms` `motion.css:7`
* **لا نكسر الـ shell:** أي تعديل في `shell.css:7` يجب أن يحافظ على `min-height:0` + `overflow:hidden` `src/components/sidebar.css:6` (إصلاح `117f646` للـ scrollbar)
* **الشكل لاحقًا:** بعد R1-R4، أي تعديل في `foundation` سيُحدّث الـ 43 showcase تلقائيًا — لا حاجة لإعادة كتابة HTML

---

*المرجع: `src/domain/*.css:1` 13 ملف + `src/components/command.css:1` + `showcase-data/*.html:1` 43 + `EXECUTION-TRACKER.md:1` 41/41*
*هذا الملف هو عقد التصحيح — كل مرحلة commit واحد، ثم انتظر أمرك التالي.*
