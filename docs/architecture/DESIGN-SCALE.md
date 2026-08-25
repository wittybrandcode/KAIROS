# KAIROS DESIGN SCALE
**Target: Kairos 1.0 Stable**

This document establishes the Semantic Token Ontology for Kairos. It defines the central scales. All values in CSS must reference these tokens, never hardcoded pixel values.

## 1. Core Math & Architecture
| Token | Resolution | Description |
|-------|------------|-------------|
| **Base Unit** | `4px` | The unchangeable root resolution of the system. |
| **Design Unit (U)**| `1 Base Unit` | The semantic abstraction of the base unit. |

## 2. Control Heights (The Master Scale)
This scale governs the height of all interactive elements (Buttons, Inputs, Selects).
| Token | Value in U | Target Height |
|-------|------------|---------------|
| `control-xs` | 6U | 24px |
| `control-sm` | 8U | 32px |
| `control-md` | 9U | 36px |
| `control-lg` | 12U | 48px |
| `control-xl` | 14U | 56px |

## 3. Icon-to-Control Ratio
Determines the size of an icon based on its parent control size.
| Token | Value in U | Target Size | Maps to Control |
|-------|------------|-------------|-----------------|
| `icon-xs` | 3U | 12px | `control-xs` |
| `icon-sm` | 3U | 12px | `control-sm` |
| `icon-md` | 4U | 16px | `control-md` |
| `icon-lg` | 5U | 20px | `control-lg` |
| `icon-xl` | 6U | 24px | `control-xl` |

## 4. Vertical Rhythm & Typography
| Token | Value in U | Font Size | Semantic Use |
|-------|------------|-----------|--------------|
| `baseline-grid` | 1U | 4px | The fundamental vertical rhythm |
| `text-xs` | 2.75U | 11px | Badges, Micro-labels |
| `text-sm` | 3U | 12px | Helpers, Secondary text |
| `text-md` | 3.5U | 14px | Standard Body, Default Buttons |
| `text-lg` | 4U | 16px | Large Buttons, Subtitles |
| `text-xl` | 5U | 20px | Small Headings |
| `text-2xl`| 6U | 24px | Medium Headings |

| Token | Weight | Semantic Use |
|-------|--------|--------------|
| `weight-normal` | 400 | Body text |
| `weight-medium` | 500 | Alternative emphasis |
| `weight-bold` | 600 | Buttons, Headers, Emphasized text |

## 5. Spacing Scale (Padding & Gap)
| Token | Value in U | Semantic Gap / Padding |
|-------|------------|------------------------|
| `space-3xs` | 0.5U | Borders, Tally, Critical micro-adjustments |
| `space-2xs` | 1U | Tight component internals |
| `space-xs` | 1.5U | Compact gap, Y-padding for `control-md` |
| `space-sm` | 2U | Standard component internals |
| `space-md` | 3U | Standard gap, X-padding for `control-md` |
| `space-lg` | 4U | Loose component internals |
| `space-xl` | 6U | Section gaps, Layout gaps |
| `space-2xl` | 8U | Major section separation |
| `space-3xl` | 12U | Page level layout separation |

## 6. Motion Scale
| Token | Duration | Semantic Use |
|-------|----------|--------------|
| `motion-instant` | 0ms | No animation |
| `motion-fast` | 100ms | Hovers, Active states, Toggles |
| `motion-normal` | 150ms | Basic transitions, Tabs |
| `motion-medium` | 200ms | Accordions, Height changes |
| `motion-slow` | 300ms | Complex transitions |
| `motion-overlay`| 400ms | Modals, Toast entrances, Backdrops |

## 7. Geometric Constants (Borders & Focus)
| Token | Value | Semantic Use |
|-------|-------|--------------|
| `radius-none` | 0 | Kairos absolute rule |
| `border-none` | 0 | No border |
| `border-base` | 1px | Standard component outline |
| `border-thick` | 2px | Elevated modal boundary, Active state |
| `focus-base` | 2px | Keyboard focus ring width |
