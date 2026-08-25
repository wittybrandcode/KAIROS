# ⚖️ دستور بناء مكونات كايروس (Kairos Constitution)

> [!IMPORTANT]
> هذا الدستور هو "القانون الأعلى" (Supreme Law) لبناء أي مكون HTML أو واجهة عرض داخل نظام كايروس. يُمنع منعاً باتاً انتهاك أي بند من هذه البنود عند برمجة أو توليد أكواد المكونات.

---

## 🛑 البند الأول: النقاء المطلق (Absolute Purity)
1. **لا للتنسيقات المضمنة (No Inline Styles):** يُمنع استخدام `style="..."` في عناصر HTML لبناء التصميم (كالـ `margin` أو `padding`). الاستثناء الوحيد هو لحقن قيم المتغيرات الديناميكية (CSS Variables) مثل `style="--kairos-progress: 50%"`.
2. **لا كلاسات خارجية:** الكلاسات المسموحة هي فقط كلاسات كايروس الأساسية التي تبدأ بـ `.kairos-` (سواء كلاسات المكونات أو كلاسات الـ Utilities).

---

## 📏 البند الثاني: المسافات والأحجام (Spacing & Layout)
1. **الهيكلة الصارمة (Strict Semantics):** يُمنع اختراع حاويات عشوائية أو استخدام مقاسات Tailwind (مثل `p-xl` أو `gap-sm`). التباعد الخارجي (Layout) يعتمد حصراً على "السلم الخماسي الدلالي لكايروس":
   - `extra-tight` (2px)
   - `compact` (6px)
   - `standard` (12px)
   - `loose` (24px)
   - `extra-loose` (48px)
2. **قانون الاستخدام:** للتباعد الخارجي استخدم Utilities مثل `.kairos-p-standard` أو `.kairos-gap-loose`. أما داخل المكون (Component Internals)، فيُمنع استخدام الـ Utilities ويجب الاعتماد على "عقود التباعد" (CSS Variables) المحددة في `components.css`.

---

## 🧊 البند الثالث: قوانين التصميم الهندسية (Design Geometry)
1. **زوايا حادة للأبد:** `border-radius: 0`. لا يوجد أي استثناء لأي زر أو بطاقة أو حقل نصي. كل شيء حاد.
2. **الأحرف الكبيرة (Uppercase Default):** أزرار التحكم، رؤوس الجداول، والتسميات (Labels) يجب أن تستخدم فئة `.kairos-uppercase` وتوسيع المسافات `.kairos-tracking-wider` أو `widest` كوضع افتراضي.
3. **السمة الفاتحة ممنوعة منعاً باتاً:** لا Light Theme، لا High Contrast. السمة الوحيدة المسموحة هي Dark Theme المحددة في `colors.css :root`.

---

## 🗂️ البند الرابع: الشمولية المنهجية (Exhaustive Variations)
عند بناء مكون لعرضه في لوحة التوثيق (Showcase)، يجب عدم الاكتفاء بشكل واحد! بل يجب توليد **كافة الحالات الهندسية الممكنة** المدعومة في كود الـ CSS الأصلي للمكون بالترتيب التالي:

### قالب العرض القياسي (Standard Showcase Template)
```
1. HEADER    → عنوان المكون + وصف (عربي/إنجليزي)
2. INTENTS × VARIANTS  → جميع التركيبات (إن وُجدت)
3. SIZES     → جميع الأحجام (sm, md, lg — إن وُجدت)
4. CONTENT   → أنواع المحتوى (نص، أيقونة+نص، أيقونة فقط)
5. STATES    → Normal, Disabled, Active (إن وُجدت)
6. BROADCAST → أمثلة واقعية من عالم البث
```

**مثال تطبيقي (عند بناء الأزرار Buttons):**
يجب أن يحتوي العرض على:
- **المحتوى:** أزرار (نص فقط)، أزرار (أيقونة فقط)، أزرار (أيقونة + نص)، أزرار (نص + أيقونة).
- **الأحجام (Sizes):** أزرار صغيرة (`kairos-size-sm`)، عادية، وكبيرة (`kairos-size-lg`).
- **الأنماط (Variants):** أزرار صلبة (`variant-solid`)، أزرار شفافة بحدود (`variant-outline`)، أزرار شبحية (`variant-ghost`).
- **الحالات (Intents):** (Neutral, PGM, PVW, Warning, Info).
- **حالات التفاعل:** عرض حالة (Disabled) وحالة الـ (Active/Pressed).

---

## 🎨 البند الخامس: حظر الألوان الثابتة (No Hardcoded Colors)
- لا يجوز أبداً كتابة ألوان Hex (`#FF0000`) أو RGBA داخل مكونات الـ HTML.
- كل الألوان يجب استدعاؤها عبر كلاسات كايروس (مثل `.kairos-text-color-pgm` و `.kairos-bg-surface-alt`) أو عبر المتغيرات الأصلية.

---

## 🛡️ البند السادس: معمارية النواة النقية (Pure Core Architecture)
بناء المكونات الخاصة بكايروس (مثل الأزرار والنصوص) يجب أن يكون بصيغة (HTML/CSS) خالصة. يُمنع منعاً باتاً برمجة المكونات الأساسية باستخدام أطر عمل مثل (React أو Vue) لضمان بقاء كايروس إطاراً مستقلاً (Framework-Agnostic) صالحاً للعمل في أي بيئة بث.

---

## 📋 البند السابع: بروتوكول البناء المنهجي (Systematic Build Protocol)

### 7.1 خريطة الطريق (Roadmap)
يُبنى كل مكون حسب **المرحلة (Phase)** التي ينتمي إليها. يُمنع تخطي المراحل:

| المرحلة | المكونات | الحالة |
|---------|---------|--------|
| P0 | Foundation (tokens, reset, utilities) | ✅ مكتمل |
| P1 | Content Primitives (9): Heading, Paragraph, Badge, Icon, Kbd, Code, Link, Data Display | 🔄 قيد العمل |
| P2 | Input Primitives (7): Button, Form, Checkbox, Radio, Switch, Slider, Tag Input | ⏳ |
| P3 | Feedback Primitives (8): Loading, Progress, Feedback, Status Dot, Indicator, Tag, Toast, Alert | ⏳ |
| P4 | Navigation Primitives (2): Navigation, Tabs | ⏳ |
| P5 | Overlays (6): Overlay, Popover, Surface, Modal, Dropdown, Tooltip | ⏳ |
| P6 | Composites (5): Accordion, Command, Sidebar, Table, Split Grid | ⏳ |
| P7 | Domain (13): Bus, Source Tag, Property, Multiview, Production, Shell, Rundown, Segment, Ticker, Tally, UI Patterns, Domain Buttons, Composites | ⏳ |

### 7.2 دورة بناء المكون الواحد (Single Component Build Cycle)
لكل مكون، يجب تنفيذ الخطوات التالية **بالتسلسل**:

```
الخطوة 1: STUDY  ← قراءة ملف CSS للمكون في src/components/ أو src/domain/
                 لفهم العقود (contracts) والكلاسات المتاحة
الخطوة 2: BUILD  ← إنشاء/showcase-data/{component}.html وفق القالب القياسي
الخطوة 3: STYLE  ← التأكد من صحة كل الكلاسات (لا أخطاء إملائية)
الخطوة 4: COLOR  ← التأكد من عدم وجود ألوان ثابتة (Hex/RGBA)
الخطوة 5: VERIFY ← التأكد من عدم وجود border-radius مخالف
الخطوة 6: REGISTER ← إضافة المكون إلى قائمة KairosInventory في showcase.js
```

### 7.3 نموذج التسجيل في showcase.js
يُضاف كل مكون جديد إلى `KairosInventory` في الموقع المناسب حسب الطبقة:
```javascript
{ id: "component-name", name: "Component Name", key: "LX" }
```
حيث `LX` هو رقم المرحلة (L1, L2, ..., L7).

### 7.4 معايير القبول (Acceptance Criteria)
- [ ] CSS موجود مسبقاً في `src/components/` أو `src/domain/`
- [ ] Showcase HTML يغطي: **Intents × Variants + Sizes + Content + States + Broadcast Examples**
- [ ] لا يحتوي الـ HTML على أي `style="..."` أو ألوان Hex
- [ ] جميع الكلاسات تبدأ بـ `.kairos-`
- [ ] `border-radius` غير مستخدم
- [ ] الأحرف الكبيرة (uppercase) مستخدمة في العناوين والتسميات
- [ ] المكون مسجل في `showcase.js`

---

## ⚙️ التعهد (The Pledge)
أنا كمساعد ذكاء اصطناعي، **أتعهد** بقراءة هذا الدستور وتطبيقه بصرامة بالغة قبل كتابة أي سطر HTML جديد في مشروع كايروس.
