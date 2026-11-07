---
name: screenshot-to-code
description: >-
  Extract and faithfully implement UI designs directly from user-provided screenshots,
  mockups, or reference images into clean, responsive, production-ready React, Tailwind CSS,
  and Framer Motion code.
---

# Screenshot to Code & Pixel-Perfect Design Implementation

This skill guides the precise translation of visual designs, screenshots, and UI mockups into high-fidelity code that matches the reference image exactly.

## 1. Visual Dissection Methodology

When the user provides a screenshot or reference image:

1. **Layout & Grid Analysis:**
   - Identify the overarching structure: flex rows, flex columns, grid templates, aspect ratios.
   - Note fixed vs responsive elements (e.g. fixed sidebars, centered max-width content columns, floating corner badges).
   - Measure relative spacing: gap sizes, paddings, margins, alignment (`items-center`, `justify-between`).

2. **Typography Matching:**
   - Identify font families: Monospace (code/tech), Serif/Cursive (organic/vintage), Sans-Serif (modern clean).
   - Match sizing scale: `text-[10px]`, `text-xs`, `text-sm`, `text-base`, `text-lg`, `text-xl`, `text-2xl`+.
   - Inspect font weights: `font-normal` (400), `font-medium` (500), `font-semibold` (600), `font-bold` (700).
   - Check line height and letter spacing: `leading-tight`, `leading-relaxed`, `tracking-tight`, `tracking-wider`.

3. **Color, Gradients & Depth:**
   - Sample exact hex/HSL colors for backgrounds, text, muted elements, and accent highlights.
   - Recreate depth: drop shadows (`shadow-sm`, `shadow-lg`, `shadow-2xl`, custom colored glow `shadow-[0_8px_30px_rgba(...)]`).
   - Match borders: radius (`rounded-lg`, `rounded-xl`, `rounded-2xl`, `rounded-full`), border width, and border opacity.
   - Check surface materials: glassmorphism (`backdrop-blur-md bg-card/80 border border-white/10`), frosted overlays, gradients.

4. **Interactive States & Motion:**
   - Add Framer Motion transitions for entrances, layout shifts, and hover states.
   - Maintain accessibility: support `prefers-reduced-motion` and appropriate ARIA roles (`role="button"`, `role="link"`, `aria-label`).

## 2. Code Implementation Standards

- **Component Structure:** Break complex UIs into clean, reusable modular components following `shadcn/ui` conventions.
- **Type Safety:** Define explicit TypeScript interfaces for all props, states, and data models.
- **Icons:** Use Lucide React icons matching the icons in the reference image, or create clean SVG path approximations if custom.
- **Responsiveness:** Ensure mobile, tablet, and desktop views look intentional and uncompromised.
