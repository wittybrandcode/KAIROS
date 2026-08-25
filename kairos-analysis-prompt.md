# برومبت تحليل إطار Kairos Design System

## الهدف
تحليل شامل لإطار واجهات المستخدم Kairos المخصص لأنظمة التحكم في البث (broadcast control surfaces) وفق منهجية احترافية. المطلوب: تقييم البنية المعمارية، جودة الكود، الاتساق، والالتزام بالمنهجية المتبعة، مع توصيات قابلة للتنفيذ للتطوير وتصحيح المسار.

## معلومات أساسية عن المشروع

**الرؤية**: إطار تصميم متخصص لأنظمة التحكم في البث (مفاتيح البث، مصفوفات التوجيه، خلاطات الصوت) — ليس إطار عام.

**الهيكل:**
```
src/
├── foundation/    → Design tokens: colors, spacing, typography, sizes, elevation, motion
├── components/    → Generic UI: buttons, forms, overlays, navigation, tables
├── domain/        → Broadcast-specific: bus, multiview, shell, rundown, source-tag
├── themes/        → Light/dark theme overrides
├── utilities/     → Utility classes (flex, grid, gap, overflow, etc.)
├── icons/         → Icon registry + SVG replacement engine
├── core/          → Shared utilities (DOM, Events, State, Focus, Keyboard, Animation)
├── modules/       → Component modules (Modal, Dropdown, Accordion, Tabs, Toast, Sidebar, Command)
├── kairos.css     → Entry point (@import order matters)
└── kairos.ts      → Entry point

patterns/          → 60+ HTML reference pages (one per component/pattern)
dist/              → Built output (kairos.css, kairos.min.css, kairos.js, kairos.min.js)
docs/              → Philosophy document
scripts/           → Build, lint, serve scripts
```

**الأدوات والتقنيات:**
- Vanilla CSS + Vanilla JS (بدون إطارات خارجية)
- Vite + LightningCSS للبناء
- TypeScript للمصدر، يبني إلى UMD + ES Module
- Stylelint للفحص
- NPM scripts: `dev`, `build`, `build:css`, `build:js`, `lint`, `lint:fix`, `test`

**القوانين الصارمة (Hard Rules):**
1. `border-radius: 0` في كل مكان بدون استثناء
2. لا ألوان دافئة — فقط رمادي فولاذي + 4 ألوان حالة (PGM أحمر، PVW أخضر، تحذير أصفر، معلومات أزرق)
3. لا إطارات CSS خارجية
4. لا حركة زخرفية — أقصى مدة أنيميشن 300ms
5. لا دوائر أو نقاط — مربعات ومستطيلات فقط
6. uppercase افتراضيًا في الأزرار، التبويبات، التسميات

**أمثلة على الصياغات:**
- CSS variables: `--kairos-{category}-{name}` (مثال: `--kairos-bg-surface`, `--kairos-status-pgm`)
- CSS classes: `.kairos-{component}-{element}-{modifier}` (مثال: `.kairos-btn-primary`, `.kairos-side-tab.active`)
- Data attributes: `data-kairos-toggle`, `data-kairos-target`, `data-kairos-dismiss`
- Spacing: 5-level semantic tokens (extra-tight 2px, compact 6px, standard 12px, loose 24px, extra-loose 48px)

**آلية عمل الأيقونات:**
- HTML يكتب `<i class="kairos-icon-circles-four kairos-icon-md kairos-icon-pvw"></i>`
- JavaScript يستبدل `<i>` بـ `<svg>` عبر `createElementNS` مع `viewBox` و `path` من الـ registry
- CSS يطبق الحجم (`width: var(--kairos-icon-md)`) واللون (`color: var(--kairos-status-pvw)`)
- MutationObserver يراقب DOM load الديناميكي

---

## مجالات التحليل المطلوبة

### 1. تحليل البنية المعمارية (Architecture)
- هل الفصل بين foundation / components / domain / themes صحيح ومنطقي؟
- هل هناك تداخل بين الطبقات؟ (مثال: هل تستخدم الـ domain components بشكل صحيح؟)
- هل التسلسل الهرمي للـ CSS imports في `kairos.css` سليم؟
- هل نمط `Component Contract Pattern` (كل مكون يعرف متغيراته الخاصة في `components.css`) مطبق باستمرار؟
- هل هناك تكرار في تعريف المتغيرات؟
- هل التبعيات بين الـ JS modules سليمة (core ← modules ← icons)؟

### 2. تحليل جودة الكود (Code Quality)
- هل أسماء المتغيرات (CSS variables) متسقة مع معيار `--kairos-{category}-{name}`؟
- هل أسماء الكلاسات متسقة مع معيار `kairos-{component}-{element}-{modifier}`؟
- هل الـ JavaScript يتبع نمط IIFE + Event Delegation + data-kairos-* attributes؟
- هل هناك كود ميت (dead code) أو تعليقات قديمة؟
- هل هناك مشاكل في TypeScript typing؟
- هل الـ Selectors في CSS محددة بشكل مناسب (specificity)؟
- هل هناك أخطاء linting حالية؟

### 3. تحليل الاتساق (Consistency)
- هل هناك مكونات تستخدم spacing مباشر بدلاً من semantic tokens (5 levels)؟
- هل كل المكونات تستخدم `border-radius: 0`؟
- هل كل النصوص المعروضة uppercase مع letter-spacing واسع؟
- هل كل الألوان تأتي من الـ design tokens فقط (لا ألوان hardcoded)؟
- هل كل الأيقونات تستخدم SVG بدلاً من icon fonts؟
- هل كل الـ motion يلتزم بـ 300ms max؟
- هل الـ CSS variables كلها تستخدم الـ `var()` بدلاً من القيم المباشرة؟

### 4. تحليل CSS
- هل الـ CSS variables معرفة بشكل كامل لكل الـ tokens في foundation/؟
- هل الـ `lightningcss` يلغي قواعد عن طريق الخطأ أثناء البناء؟
- هل هناك مشاكل في ترتيب الـ @import؟
- هل الـ utilities classes متسقة ومكتملة (كل ما يحتاجه المطور؟)؟
- هل الـ `kairos.css` entry point يستورد كل شيء بالترتيب الصحيح؟
- هل الـ `kairos.min.css` يطابق `kairos.css` بعد البناء؟
- هل حجم الـ CSS النهائي مناسب للاستخدام الإنتاجي؟

### 5. تحليل JavaScript
- هل آلية تحميل الأيقونات عبر MutationObserver تعمل مع كل الحالات (تحميل ديناميكي، SPA، partial page update)؟
- هل هناك تسرب للذاكرة (MutationObserver لم ينفصل `disconnect`)؟
- هل الـ modules مستقلة عن بعضها كما ينص المبدأ (لا تبعيات متبادلة بين modules)؟
- هل `data-kairos-*` attributes تستخدم بشكل متسق عبر كل الـ modules؟
- هل الـ UMD + ES Module builds يعملان بشكل صحيح؟
- هل TypeScript source maps متوفرة؟

### 6. تحليل الـ Patterns (نماذج HTML المرجعية)
- هل الـ 60+ صفحة HTML في `patterns/` تتطابق مع CSS الفعلي (استخدام الكلاسات الصحيحة)؟
- هل هناك Patterns مكررة أو متداخلة؟
- هل كل pattern يظهر المكون في حالاته المختلفة (default, hover, active, disabled, pgm, pvw, etc.)؟
- هل هناك حالات ناقصة؟

### 7. تحليل الأداء والبناء
- هل Build سليم بدون أخطاء (`npm run build` يمر بنجاح)؟
- حجم الـ CSS والـ JS النهائي — هل هو مناسب للتطبيق المستهدف؟
- هل LightningCSS التهيئة صحيحة (browserslist, targets, minification)؟
- هل الـ Tree-shaking يعمل بشكل صحيح مع Vite؟
- هل هناك JS chunks غير ضرورية؟

### 8. تحليل الاختبارات
- هل `npm run test` يعمل حاليًا؟
- ما هو مستوى التغطية الحالية للاختبارات؟
- هل هناك اختبارات للـ JavaScript modules؟
- هل هناك اختبارات بصرية (Visual regression tests)؟
- هل هناك اختبارات توافق متصفحات (Cross-browser)؟

### 9. تحليل المنتج النهائي
- هل `dist/` يطابق المصدر من حيث المحتوى؟
- هل `index.html` يربط المسارات الصحيحة؟
- هل كل الملفات اللازمة موجودة في `dist/`؟
- هل مكتبة Kairos قابلة للاستخدام من مشروع خارجي (CDN, npm install)؟
- هل الـ Documentation ("docs/") كافية لمطور جديد؟

### 10. تحليل داكن / فاتح (Themes)
- هل الثيم الداكن والفاتح يعملان بشكل كامل؟
- هل هناك ألوان غير معرفة في أحد الثيمين؟
- هل آلية التبديل بين الثيمين تعمل بشكل صحيح؟

---

## المخرجات المطلوبة (Deliverables)

### 1. تقرير تقييم شامل
- درجة النضج (1-10) في كل مجال من المجالات أعلاه مع مبرر
- أهم 5 مشاكل حرجة (Critical issues) — مع خطورة كل مشكلة وتأثيرها وطريقة الإصلاح المقترحة
- أهم 10 مشاكل متوسطة (Medium issues) — مع خطورة كل مشكلة وطريقة الإصلاح
- ملاحظات تحسينية (Enhancement suggestions)

### 2. خريطة طريق (Roadmap) مقترحة
- **المرحلة 1 — إصلاحات عاجلة (Critical fixes)**: المشاكل التي تمنع الاستخدام أو تسبب أخطاء
- **المرحلة 2 — تحسينات أساسية**: ضبط consistency، إكمال الناقص، توحيد الصياغات
- **المرحلة 3 — تطوير مستقبلي**: إضافة ميزات جديدة، تحسين الأداء، زيادة التغطية

### 3. توصيات منهجية
- هل المشروع يحتاج إعادة هيكلة جزئية أم كلية؟
- هل نمط الـ Component Contract يحتاج توثيق إضافي أو تدقيق؟
- هل هناك حاجة لإضافة TypeScript interfaces للمكونات؟
- كيف يمكن تحسين الـ Developer Experience للمطور الجديد؟
- هل هناك حاجة لإضافة نظام اختبارات شامل (Unit + Integration + Visual)؟
- هل الـ naming conventions تحتاج مراجعة؟

---

## طريقة العمل المقترحة لتنفيذ التحليل

1. **قراءة الأساسيات**: اقرأ `docs/` و `AGENTS.md` و `src/kairos.css` entry point و `src/kairos.ts` entry point لفهم الفلسفة والهيكل
2. **تحليل الـ Foundation**: افحص مجلد `src/foundation/` بالكامل لتقييم اكتمال design tokens
3. **تحليل Components**: افحص عينة من `src/components/` (5-10 مكونات) للتحقق من تطبيق `Component Contract Pattern` والاتساق
4. **تحليل Domain**: افحص عينة من `src/domain/` (3-5 مكونات) لنفس الغرض
5. **تحليل الـ JS**: افحص `src/core/` و `src/modules/` و `src/icons/` للتحقق من الجودة والعزلة
6. **تحليل التوافق بين Patterns والكود**: افحص عينة من `patterns/` (10-15 صفحة) للتأكد من أن HTML يستخدم الكلاسات الصحيحة
7. **اختبار البناء**: نفذ `npm run build` وتحقق من سلامة المخرجات في `dist/`
8. **اختبار الأدوات**: نفذ `npm run lint` و `npm run test` وسجل أي أخطاء أو تحذيرات
9. **تقديم التقرير النهائي** حسب المخرجات المطلوبة أعلاه
