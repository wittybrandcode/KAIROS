# 📦 جرد مكونات إطار عمل كايروس (Kairos Framework Inventory)

> [!NOTE]
> هذا المستند هو مرجع شامل لكل مكونات التصميم الأساسية والمتقدمة (Primitives & Composites) والمكونات المتخصصة بمجال البث (Domain) المتوفرة في نواة إطار `Kairos v01`.
>
> **الحالة:** ✅ = Showcase موجود | ⏳ = قيد العمل | 📝 = CSS موجود + Showcase ناقص | 🔴 = CSS ناقص

## 🏗️ P1: Foundation
| المكون | CSS | Showcase | الحالة |
|--------|-----|----------|--------|
| Typography | ✅ `src/foundation/` | ✅ `typography.html` | ✅ |
| Design Tokens | ✅ `src/foundation/` (15 files) | — | ✅ |

## 📝 P2: Content Primitives
| المكون | CSS | Showcase | الحالة |
|--------|-----|----------|--------|
| Heading | ✅ `heading.css` | ✅ ضمن `typography.html` | ✅ |
| Paragraph | ✅ `paragraph.css` | ✅ ضمن `typography.html` | ✅ |
| Badge | ✅ `badge.css` | ✅ `badges.html` | ✅ |
| Icon | ✅ `icons.css` | ✅ `icons.html` | ✅ |
| Kbd | ✅ `kbd.css` | ✅ `kbd.html` | ✅ |
| Code | ✅ `code.css` | ✅ `code.html` | ✅ |
| Link | ✅ `link.css` | ✅ `link.html` | ✅ |
| Data Display | ✅ `data-display.css` | ✅ `data-display.html` | ✅ |

## 🖱️ P3: Feedback Primitives
| المكون | CSS | Showcase | الحالة |
|--------|-----|----------|--------|
| Alert | ✅ `alert.css` | ✅ `alert.html` | ✅ |
| Loading / Spinner | ✅ `loading.css` | ⏳ | 📝 |
| Progress | ✅ `progress.css` | ⏳ | 📝 |
| Feedback | ✅ `feedback.css` | ⏳ | 📝 |
| Status Dot | ✅ `status-dot.css` | ⏳ | 📝 |
| Indicator | ✅ `indicator.css` | ⏳ | 📝 |
| Tag | ✅ `tag.css` | ⏳ | 📝 |
| Toast | ✅ `toast.css` | ⏳ | 📝 |

## 📡 P4: Input Primitives
| المكون | CSS | Showcase | الحالة |
|--------|-----|----------|--------|
| Button | ✅ `buttons.css` | ✅ `buttons.html` | ✅ |
| Form | ✅ `forms.css` | ⏳ | 📝 |
| Checkbox | ✅ `checkbox.css` | ⏳ | 📝 |
| Radio | ✅ `radio.css` | ⏳ | 📝 |
| Switch / Toggle | ✅ `switch.css` | ⏳ | 📝 |
| Slider | ✅ `slider.css` | ⏳ | 📝 |
| Tag Input | ✅ `tag-input.css` | ⏳ | 📝 |

## 🗺️ P5: Navigation Primitives
| المكون | CSS | Showcase | الحالة |
|--------|-----|----------|--------|
| Navigation | ✅ `navigation.css` | ⏳ | 📝 |
| Tabs | ✅ `tabs.css` | ⏳ | 📝 |

## 🪟 P6: Overlays
| المكون | CSS | Showcase | الحالة |
|--------|-----|----------|--------|
| Overlay | ✅ `overlay.css` | ⏳ | 📝 |
| Popover | ✅ `popover.css` | ⏳ | 📝 |
| Surface | ✅ `surface.css` | ⏳ | 📝 |
| Modal | ✅ `modal.css` | ⏳ | 📝 |
| Dropdown | ✅ `dropdown.css` | ⏳ | 📝 |
| Tooltip | ✅ `tooltip.css` | ⏳ | 📝 |

## 🧩 P7: Composites
| المكون | CSS | Showcase | الحالة |
|--------|-----|----------|--------|
| Accordion | ✅ `accordion.css` | ⏳ | 📝 |
| Command | ✅ `command.css` | ⏳ | 📝 |
| Sidebar | ✅ `sidebar.css` | ⏳ | 📝 |
| Table | ✅ `table.css` | ⏳ | 📝 |
| Split Grid | ✅ `split-grid.css` | ⏳ | 📝 |

## 🎛️ P8: Domain Components
| المكون | CSS | Showcase | الحالة |
|--------|-----|----------|--------|
| Bus | ✅ `domain/bus.css` | ⏳ | 📝 |
| Source Tag | ✅ `domain/source-tag.css` | ⏳ | 📝 |
| Property | ✅ `domain/property.css` | ⏳ | 📝 |
| Multiview | ✅ `domain/multiview.css` | ⏳ | 📝 |
| Production | ✅ `domain/production.css` | ⏳ | 📝 |
| Shell | ✅ `domain/shell.css` | ⏳ | 📝 |
| Rundown | ✅ `domain/rundown.css` | ⏳ | 📝 |
| Segment | ✅ `domain/segment.css` | ⏳ | 📝 |
| Ticker | ✅ `domain/ticker.css` | ⏳ | 📝 |
| Tally | ✅ `domain/tally.css` | ⏳ | 📝 |
| UI Patterns | ✅ `domain/ui-patterns.css` | ⏳ | 📝 |
| Domain Buttons | ✅ `domain/buttons.css` | ⏳ | 📝 |
| Domain Composites | ✅ `domain/composites.css` | ⏳ | 📝 |

## الإحصائيات (Statistics)
| الفئة | المجموع | ✅ مكتمل | 📝 ناقص |
|-------|---------|----------|--------|
| P1 Foundation | 2 | 2 | 0 |
| P2 Content Primitives | 8 | 8 | 0 |
| P3 Feedback Primitives | 8 | 1 | 7 |
| P4 Input Primitives | 7 | 1 | 6 |
| P5 Navigation | 2 | 0 | 2 |
| P6 Overlays | 6 | 0 | 6 |
| P7 Composites | 5 | 0 | 5 |
| P8 Domain | 13 | 0 | 13 |
| **المجموع الكلي** | **51** | **12** | **39** |
