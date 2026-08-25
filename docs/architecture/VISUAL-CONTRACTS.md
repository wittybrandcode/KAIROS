# SEMANTIC VISUAL CONTRACTS MATRIX
**Target: Kairos 1.0 Stable**

This matrix relies completely on the Semantic Token Ontology (`DESIGN-SCALE.md`). 
**Zero Numbers Policy:** No geometric, motion, or typographic value is expressed here as a raw number. All values are pointers to the master central scale.

## 1. Input & Interaction Primitives (L4)

| Primitive      | Height Token | Padding Token (Y / X) | Gap Token | Icon Token | Typography Token | Border Token | Motion Token | Focus Ring |
|----------------|--------------|-----------------------|-----------|------------|------------------|--------------|--------------|------------|
| Button SM      | `control-sm` | `space-3xs / space-xs`| `space-2xs`| `icon-sm`  | `text-sm-bold`   | `border-base`| `motion-fast`| `focus-base` |
| Button MD      | `control-md` | `space-xs / space-md` | `space-xs`| `icon-md`  | `text-md-bold`   | `border-base`| `motion-fast`| `focus-base` |
| Button LG      | `control-lg` | `space-md / space-xl` | `space-sm`| `icon-lg`  | `text-lg-bold`   | `border-base`| `motion-fast`| `focus-base` |
| Text Input     | `control-md` | `space-xs / space-md` | `space-xs`| `icon-md`  | `text-md-normal` | `border-base`| `motion-fast`| `focus-base` |
| Checkbox       | `control-xs`*| `- / -`               | `-`       | `icon-xs`* | `-`              | `border-base`| `motion-fast`| `focus-base` |
| Radio          | `control-xs`*| `- / -`               | `-`       | `icon-xs`* | `-`              | `border-base`| `motion-fast`| `focus-base` |
| Switch         | `control-xs`*| `- / -`               | `-`       | `icon-sm`* | `-`              | `border-base`| `motion-fast`| `focus-base` |
| Slider Thumb   | `control-xs`*| `- / -`               | `-`       | `-`        | `-`              | `border-base`| `motion-fast`| `focus-base` |

*(Note: Checkbox/Radio/Switch use a custom width mapping derived from height to ensure perfect geometric squares/rectangles).*

## 2. Content & Feedback Primitives (L3, L5)

| Primitive      | Height Token | Padding Token (Y / X) | Gap Token | Icon Token | Typography Token | Border Token | Motion Token | Focus Ring |
|----------------|--------------|-----------------------|-----------|------------|------------------|--------------|--------------|------------|
| Badge          | `control-xs`*| `space-3xs / space-xs`| `space-3xs`| `icon-xs` | `text-xs-bold`   | `border-none`| `motion-normal`| `-`      |
| Avatar SM      | `control-xs` | `- / -`               | `-`       | `-`        | `-`              | `border-none`| `motion-normal`| `-`      |
| Avatar MD      | `control-md` | `- / -`               | `-`       | `-`        | `text-md-bold`   | `border-none`| `motion-normal`| `-`      |
| Toast          | `auto`       | `space-xs / space-md` | `space-xs`| `icon-xl`  | `text-md-bold`   | `border-base`| `motion-overlay`| `-`     |
| Alert          | `auto`       | `space-md / space-md` | `space-md`| `icon-xl`  | `text-md-bold`   | `border-base`| `motion-normal`| `-`      |
| Kbd            | `control-xs` | `space-3xs / space-xs`| `-`       | `-`        | `text-sm-normal` | `border-base`| `motion-instant`| `-`     |

## 3. Overlay Primitives (L6)

| Primitive      | Min Height   | Padding Token (Y / X) | Gap Token | Icon Token | Typography Token | Border Token | Motion Token   | Box Shadow |
|----------------|--------------|-----------------------|-----------|------------|------------------|--------------|----------------|------------|
| Tooltip        | `control-xs` | `space-3xs / space-xs`| `-`       | `-`        | `text-sm-normal` | `border-base`| `motion-fast`  | `shadow-tooltip`  |
| Dropdown Menu  | `auto`       | `space-xs / space-md` | `space-3xs`| `icon-md` | `text-md-normal` | `border-base`| `motion-normal`| `shadow-dropdown` |
| Popover        | `auto`       | `space-xl / space-xl` | `space-xs`| `-`        | `text-md-normal` | `border-base`| `motion-normal`| `shadow-dropdown` |
| Modal          | `auto`       | `space-xl / space-xl` | `space-md`| `icon-xl`  | `text-md-normal` | `border-thick`| `motion-overlay`| `shadow-modal`   |

## 4. Navigation & Composites (L7, L8)

| Primitive      | Height Token | Padding Token (Y / X) | Gap Token | Icon Token | Typography Token | Border Token | Motion Token | Focus Ring |
|----------------|--------------|-----------------------|-----------|------------|------------------|--------------|--------------|------------|
| Tab Item       | `control-md` | `space-xs / space-md` | `space-3xs`| `icon-md` | `text-md-bold`   | `border-none`| `motion-normal`| `focus-base` |
| Breadcrumb     | `control-xs` | `space-xs / space-xs` | `space-3xs`| `icon-xs` | `text-sm-normal` | `border-none`| `motion-fast`  | `focus-base` |
| Pagination Btn | `control-sm` | `space-xs / space-xs` | `space-3xs`| `icon-md` | `text-md-bold`   | `border-base`| `motion-fast`  | `focus-base` |
| Accordion Head | `control-lg` | `space-md / space-md` | `space-xs`| `icon-md`  | `text-md-bold`   | `border-base`| `motion-medium`| `focus-base` |
| Table Cell     | `control-md` | `space-xs / space-md` | `-`       | `-`        | `text-md-normal` | `border-base`| `motion-instant`| `-`      |

> **Absolute Architecture Rule:** If an engineer proposes changing the padding of `Button MD`, they do not modify the button's CSS. They either change the button's token assignment in this matrix, or they modify the definition of `space-xs` / `space-md` in `DESIGN-SCALE.md`.
