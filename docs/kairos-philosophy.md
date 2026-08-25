# Kairos v01 — Design Philosophy

> **The design system for broadcast control systems.**
> Everything exists to help the operator make the right decision in the critical moment.

---

## 1. What is Kairos

Kairos is a specialised design system for broadcast control surfaces — switchers, routing matrices, audio consoles, production panels. It is not a general-purpose UI framework. It is a visual language built for environments where:

- Information density is extreme
- Decisions are made in milliseconds
- Errors are visible to millions
- Operators work 12-hour shifts under hot studio lights

Every pixel, every millisecond, every colour — calculated with professional precision.

The name comes from the Ancient Greek **καιρός (kairos)** — the opportune moment, the critical window in which action must be taken. In broadcast, every moment is kairos.

---

## 2. Seven Core Principles

### I. Hard Edges — الزوايا الحادة

```
border-radius: 0 — everywhere, always, without exception.
```

There are no rounded corners in Kairos. No circles. No pill buttons. No soft edges. This is not an oversight — it is a fundamental stance.

Broadcast equipment has always had hard edges. The racks, the monitors, the switcher panels — industrial, precise, unapologetic. Roundness implies softness, playfulness, consumer-grade. Kairos is none of those things. Every corner being sharp communicates: *this is professional equipment, not a toy*.

Even the loading spinner is a rotating square.

### II. Cool Steel — الفولاذ البارد

```
A single cool-gray scale. No warm colors anywhere.
```

Every neutral in Kairos is derived from a single 12-step cool-steel scale (`--kairos-cs-950` → `--kairos-cs-0`). Each value is biased toward blue. There is no beige, no brown, no warm gray.

This guarantees total chromatic harmony — any combination of tokens produces a visually cohesive interface. No colour clashes, no accidental warmth, no decisions to make. The hierarchy comes from lightness, not hue.

### III. Density First — الكثافة أولاً

```
13px base. 2px minimum gap. Every pixel earns its place.
```

Broadcast interfaces show more information per square inch than almost any other domain. Source names, tally states, format badges, timecode, audio levels, transition status — all competing for space.

Kairos starts small (13px body text, 2px minimum spacing) and scales up only where necessary. The default button is 32px tall — not 40px, not 48px. Every pixel that can be saved is saved, because the operator needs to see more, not bigger.

### IV. Uppercase by Default — الأحرف الكبيرة

```
Buttons, tabs, panel headers, labels — all uppercase with wide letter-spacing.
```

Lowercase is for reading. Uppercase is for scanning. In a broadcast control surface, the operator does not read — they scan. They glance at a button and need to identify it instantly. Uppercase with generous tracking (`0.05em`–`0.15em`) creates distinct word shapes that the peripheral vision can recognise without focus.

### V. Status Colors Only — ألوان الحالة فقط

```
Four saturated colors. Everything else is cool steel gray.
```

| Color | Token | Meaning |
|-------|-------|---------|
| Red | `--kairos-status-pgm` | On Air / Program / Error |
| Green | `--kairos-status-pvw` | Preview / Success |
| Yellow | `--kairos-status-warning` | Warning / Caution |
| Blue | `--kairos-status-info` | Information / Signal |

These four colours are the *only* saturated colours in the entire system. When red appears, the operator knows instantly: something is live. When green appears: something is being previewed. No ambiguity, no indecision.

If everything is coloured, nothing is coloured. By restricting saturation to four semantic states, we create an immediate visual hierarchy that the operator can read without thinking.

### VI. No Dependencies — بدون اعتماديات

```
Vanilla CSS. Vanilla JavaScript. Zero frameworks.
```

Kairos depends on nothing. No React, no Vue, no Tailwind, no Bootstrap, no jQuery. A broadcast control system must be predictable, auditable, and deployable anywhere. Every line of CSS and JS in Kairos exists in this repository — nothing is fetched from a CDN (except the icon font and Google Fonts, which are replaceable).

A single `kairos.css` import is all you need.

### VII. Bilingual by Design — ثنائي اللغة بالقصد

```
English + Arabic. Not translation — simultaneous existence.
```

Kairos is built for both Latin and Arabic scripts from the ground up. The spacing system accommodates Arabic characters (which are wider and connect). The typography stack includes `'Noto Sans Arabic'` at the same weight and size as the Latin. Comments, token names, documentation — all bilingual.

This is not localisation added later. It is structural from day one.

---

## 3. Color: The Cool Steel Spectrum

### The Gray Scale

The Kairos color system is a single 12-step scale from near-black to white, every step biased toward blue:

```
cs-950  #07080B   Deepest — almost black, blue undertone
cs-900  #090A0E   Deep background
cs-850  #0A0C11   Deep background alt
cs-800  #0D0F14   Input background
cs-750  #10131A   Surface alt
cs-700  #141720   Surface (cards, panels)
cs-650  #1A1E28   Hover state
cs-600  #1E2330   Muted border
cs-500  #283042   Default border
cs-450  #2C3242   Active border
cs-400  #2D3343   Selected background
cs-350  #3A4155   Interactive focus
cs-300  #4A5568   Placeholder text
cs-250  #5A6578
cs-200  #718096
cs-150  #8896A8   Muted text
cs-100  #A0AEC0   Secondary text
cs-50   #CBD5E0
cs-0    #FFFFFF   Primary text
```

The scale maps onto semantic layers through token aliases:

```
Background hierarchy:    deep → input → surface → hover → selected
Border hierarchy:        muted → default → active → focus
Text hierarchy:          placeholder → muted → secondary → primary
```

No colour in this scale is purely neutral. Each has a deliberate blue cast (`#07080B` not `#000000`, `#141720` not `#1A1A1A`). This creates visual coherence across every surface — no warm patches, no colour contamination.

### The Four Status Colours

The only saturated colours in Kairos occupy exactly four semantic slots:

- **PGM (Red — `#FF3B30`):** Program. On air. Active source. Error. The most important colour in broadcast — visible from across the room.
- **PVW (Green — `#22C55E`):** Preview. Next source. Success. Confirmation. The opposite of PGM — what will happen, not what is happening.
- **Warning (Yellow — `#EAB308`):** Caution. Near-limit. Signal warning. Rare enough to mean something.
- **Info (Blue — `#3B82F6`):** Information. Link active. Signal present. The quietest status colour.

These four colours are never used decoratively. They are always semantic. If a colour appears, it means something — the operator should react.

### Alpha Precision

Status colour alpha values follow a mathematical sequence derived from video compositing mathematics:

```
0.063 ≈ 16/255
0.082 ≈ 21/255
0.125 ≈ 32/255
0.188 ≈ 48/255
0.251 ≈ 64/255
```

These are not arbitrary — they correspond to real alpha compositing steps used in video mixing.

---

## 4. Typography: Density is Clarity

### The Scale

The typographic scale follows a `1.25×` ratio from a 13px base:

| Token | Size | Ratio | Use |
|-------|------|-------|-----|
| xs | 10px | 0.77× | Extremely tight spaces |
| **sm** | **13px** | **1×** | **Base — buttons, lists, labels** |
| base | 16px | 1.23× | Panel titles, values |
| lg | 20px | 1.54× | Section headings, matrix values |
| xl | 24px | 1.85× | Control room displays |
| 2xl | 30px | 2.31× | Overlays, full-screen |
| 3xl | 38px | 2.92× | Heavy confirmation |
| 4xl | 48px | 3.69× | Maximum — splash, critical alert |

All text at `sm` (13px) by default. Larger sizes are explicit opt-ins.

### Uppercase + Tracking

The combination of uppercase text with wide letter-spacing is a defining characteristic of Kairos:

```
Button text:     uppercase + 0.08em tracking
Tab text:        uppercase + 0.05em tracking
Panel header:    uppercase + 0.15em tracking
Label text:      uppercase + 0.04em tracking
```

Uppercase text with tight tracking is hard to read. Uppercase text with wide tracking becomes a series of distinct glyph shapes that the brain processes as patterns rather than words. This is ideal for scan-intensive interfaces.

### Line Heights

Line heights decrease as font sizes increase — the opposite of most design systems:

```
sm:    1.38
base:  1.375
lg:    1.4
xl:    1.33
4xl:   1.2
```

Large text needs tighter lines because it is read from further away. Small text needs looser lines for readability.

### Font Stacks

```css
--kairos-font-sans: 'Noto Sans', 'Noto Sans Arabic', system-ui, sans-serif;
--kairos-font-mono: 'SF Mono', 'JetBrains Mono', 'Fira Code', monospace;
```

Sans for body and descriptive text. Mono for code, sources, numeric values, labels, and any text that must align precisely. Arabic support at the same weight and size as Latin — no compromise.

---

## 5. Spacing: The Broken Geometric Scale

### The Scale

Most design systems use a 2× geometric progression: 2, 4, 8, 16, 32, 64. Kairos breaks this pattern deliberately:

| Level | Value | Ratio | Token |
|-------|-------|-------|-------|
| extra-tight | 2px | 1× (base unit) | `--kairos-space-extra-tight` |
| compact | **6px** | **3×** | `--kairos-space-compact` |
| standard | 12px | 2× | `--kairos-space-standard` |
| loose | 24px | 2× | `--kairos-space-loose` |
| extra-loose | 48px | 2× | `--kairos-space-extra-loose` |

The 2px → 6px jump is intentionally 3× instead of 2×.

Broadcast interfaces require a middle ground between "barely touching" (2px) and "clearly separate" (12px). The 4px that a pure 2× scale would give at this position is too tight for label-to-input spacing but too loose for dot-to-label spacing. 6px is the broadcast compromise — the "icon next to text" gap, the "label above field" gap, the "button inside a bar" gap.

After 6px, the scale returns to 2× through 12, 24, 48. This gives the system room to breathe at the macro level while staying tight at the micro level.

### The Contract Pattern

Kairos does not use spacing tokens directly in component CSS. Instead, every component defines its own spacing contract — a set of component-scoped tokens that consume the global scale:

```css
:root {
  --kairos-btn-padding-y:    var(--kairos-space-compact);   /* 6px  */
  --kairos-btn-padding-x:    var(--kairos-space-standard);  /* 12px */
  --kairos-btn-icon-gap:     var(--kairos-space-extra-tight); /* 2px */
  --kairos-btn-group-gap:    var(--kairos-space-compact);   /* 6px  */
}
```

This pattern (inherited from IBM Carbon and Lightning Design System) means:
- Changing the global spacing scale updates every component automatically
- Individual components can override their contract without affecting others
- The contract documents exactly which spacing decisions each component makes

---

## 6. Zero Radius

```

```

This section intentionally contains no code, no examples, no alternatives.

`border-radius: 0` is not configurable. It is not overridable. It is not a choice.

The reset sets `border-radius: 0` on every HTML element. Every component reaffirms it. There is no `--kairos-radius` token that can be changed — all five radius tokens are hardcoded to `0`. There is no escape hatch.

Rationale:
- Broadcast monitors are rectangular. The content they display should be rectangular.
- Rounded corners imply consumer-grade design (phones, social media, entertainment).
- Every rounded corner is wasted space in an interface that needs every pixel.
- Circles are semantically meaningless in a rectangular grid. A tally indicator does not need to be round — a small square works identically.
- Once you allow one `border-radius: 4px`, the next question is "why not 6px?" — the slope is infinite. Zero is the only stable value.

---

## 7. Motion: Speed is Respect

### Duration Scale

| Token | Value | Feel |
|-------|-------|------|
| instant | 0.05s | Subconscious — barely perceived |
| fast | 0.1s | Quick response |
| **normal** | **0.15s** | **Default — most interactions** |
| slow | 0.3s | Maximum — the "long" animation |

Kairos has no slow animations. There are no 500ms transitions, no 1-second flourishes. The longest motion in the system is 300ms — fast enough to feel responsive, slow enough to track with the eye.

This is deliberate: broadcast operators cannot afford to wait for animations. A transition that takes 300ms is already an eternity when you are cutting live.

### Easing

All motion uses `var(--kairos-easing-ease)` — a single, consistent easing curve. No bounces, no elastic, no spring. Motion in Kairos is functional, not expressive. It communicates state change, nothing more.

### What Moves

- **Modals:** slide in (0.15s), fade backdrop (0.1s)
- **Toasts:** slide in from right (0.15s)
- **Dropdowns:** fade + slide (0.1s)
- **Tabs:** instant switch (0.05s)
- **Hover states:** colour shift (0.1s)
- **Carousel:** slide (0.3s — the longest animation)

Nothing decorative. Nothing that delays the operator.

---

## 8. Elevation: Z-Index Layers

The z-index system reserves specific ranges for specific purposes, with deliberate gaps to prevent stacking context wars:

```
base:         1      (normal document flow)
sticky:      10      (stickied headers)
dropdown:    50      (dropdown menus)
sticky-nav:  80      (persistent navigation)
toast:       90      (notifications)
modal:      100      (modal dialogs)
tooltip:    200      (tooltips, hover cards)
loader:     500      (full-screen loading)
max:       9999      (emergency only — use with extreme caution)
```

The gaps between layers (from 1→10→50→80→90→100→200→500→9999) ensure that no matter how many components are added within a layer, they cannot accidentally escape into the next layer.

---

## 9. Component Contracts

### The Contract Pattern

Every component in Kairos defines exactly three things:

1. **Its spacing contract** — padding, gap, margin tokens in `components.css`
2. **Its visual contract** — borders, backgrounds, typography in its own `.css` file
3. **Its behaviour contract** — data attributes, event handling in `kairos.js`

### How to Build a Component

1. **Define the contract:** Extract spacing values into `--kairos-{component}-*` tokens in `components.css`. Use the five-level scale (2px–48px).
2. **Define the structure:** Write the CSS in a dedicated file. Import it in `kairos.css`.
3. **Define the behaviour:** If interactive, use `data-kairos-*` attributes. Event delegation in `kairos.js`. No inline event handlers.
4. **Document:** Create a reference page in `patterns/` showing all states, tokens, and usage examples.

### Contract Tokens by Component

| Component | Y-Pad | X-Pad | Gap | Section Gap |
|-----------|-------|-------|-----|-------------|
| Button | 6px | 12px | 2px | 6px |
| Input | 6px | 12px | 2px | — |
| Table cell | 6px | 12px | — | — |
| Card | 12px | 12px | — | 24px |
| Modal | 12px | 24px | 12px | 24px |
| Bus bar | 2px | 6px | 2px | 6px |

---

## 10. Bilingual by Design

Kairos is not an English interface with Arabic translation added later. It is a bilingual interface built from the ground up.

### Structural Decisions

- **Typography stack:** Noto Sans Arabic at the same weight, size, and availability as Noto Sans Latin
- **Spacing:** Arabic characters are wider and connect differently — the spacing system accommodates both
- **Token names:** English for code, Arabic comments for context
- **Documentation:** All reference pages and documentation include both languages
- **Layout:** RTL support is structural, not patched

### Why This Matters

Broadcast operations are global. A master control room in Doha, a production truck in London, a news studio in Cairo — they share equipment, workflows, and standards. The interface should not force an operator to work in a language they do not think in.

---

## 11. The Broadcast Mindset

Every design decision in Kairos is tested against one question:

> *Does this help the Technical Director make the right call in the next 50 milliseconds?*

- **Sharp corners** — because the TD glances, they do not focus.
- **13px base** — because 48 sources on a single panel must all be legible.
- **Uppercase + wide tracking** — because "CAM 03" at a glance is faster than "Camera Three".
- **Four status colours** — because red must always mean PGM, always.
- **300ms max animation** — because the cut happens *now*, not in 500ms.
- **Zero dependencies** — because this panel needs to work in an air-gapped control room for the next decade.
- **Bilingual** — because the operator thinks in Arabic but the system speaks English.

Kairos is not beautiful. It is precise. Those are not the same thing, and this system chooses precision every time.

---

## 12. Hard Rules

```
These rules are non-negotiable. Every component, every page, every line of CSS.

❌ No border-radius. Zero. On everything. Always.
❌ No warm colors. Cool steel gray only + 4 status colors.
❌ No external CSS frameworks. Vanilla only.
❌ No hardcoded pixel values in component CSS — use contract tokens.
❌ No decorative motion. Every animation communicates state change.
❌ No inline event handlers. Use data-kairos-* attributes.
❌ No circles, no pills, no dots. Squares and rectangles only.

✅ Every class starts with kairos-
✅ Every CSS variable starts with --kairos-
✅ Status colors are the only saturated colors
✅ Components own their spacing through contracts
✅ All corners are sharp
✅ Bilingual — English and Arabic, always
```

---

## 13. Glossary

| Term | Meaning |
|------|---------|
| **Kairos (καιρός)** | The right moment, the critical window — the name of this system |
| **Cool Steel (CS)** | The 12-step cool-gray colour scale that forms the neutral palette |
| **PGM** | Program — the live output, indicated by red |
| **PVW** | Preview — the next source to go live, indicated by green |
| **Crosspoint** | A routing intersection in a matrix — input × output |
| **Tally** | A small indicator showing source status (PGM, PVW, AUX) |
| **Contract** | A component's spacing token set in `components.css` |
| **Source** | A signal input — camera, media, graphics |
| **Destination** | A signal output — PGM, PVW, DSK, AUX |
| **DSK** | DownStream Key — a graphics overlay layer |
| **M/E** | Mix/Effect — a processing layer in the switcher |
| **TD** | Technical Director — the primary operator of the control surface |
| **Kairos (the software)** | Panasonic's live production platform, unrelated to this design system |

---

> **Kairos v01.** Built for broadcast. Every pixel calculated, every millisecond accounted for, every decision intentional.
>
> Hard edges. Cool steel. Broadcast precision.
