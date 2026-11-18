# Trilayer Design System — 3-Layer Scalable Production Architecture

A production-grade, 3-layer design system implementation adhering to the W3C Design Tokens Community Group (DTCG) specification and Figma Variables architecture.

---

## 🏛️ The 3-Layer Architecture

```
Layer 1: Primitives (Raw Values)
   └── e.g., color/blue/600 (#2563EB), space/16 (16px), radius/6 (6px)
         ↓ (aliased by)
Layer 2: Semantics (Functional Purpose & Themes)
   └── e.g., color/bg/brand, color/text/primary, space/inset/md
         ↓ (aliased by)
Layer 3: Component Tokens (Component-Scoped)
   └── e.g., button/primary/bg, input/border/focus, card/radius
```

### The Inviolable Linking Rules
1. **Never Skip a Layer**: A component token must never bind directly to a Primitive.
2. **One-Way Dependency**: Primitives $\rightarrow$ Semantics $\rightarrow$ Components.
3. **Theming Lives in Layer 2**: Light/Dark modes, multi-brand palettes, and density settings are resolved at the **Semantic** layer, leaving components completely decoupled from theme logic.

---

## 🚀 Quick Start

Open `index.html` directly in any web browser, or serve it with any static HTTP server:

```bash
# Using Python
python3 -m http.server 8080

# Using Node / npx
npx serve .
```

Open [http://localhost:8080](http://localhost:8080) in your browser.

---

## 📁 File Structure

```
.
├── index.html                   # Interactive Design System Portal, Playground & Docs
├── css/
│   ├── tokens-primitives.css    # Layer 1: Raw palette ramps, space, typography, radii, shadows
│   ├── tokens-semantics.css     # Layer 2: Functional tokens, Light/Dark modes, multi-brand palettes
│   ├── tokens-components.css    # Layer 3: Component-scoped design tokens
│   ├── reset.css                # Modern CSS reset & typographic base
│   ├── components.css           # Production component library (Buttons, Inputs, Cards, Modals, etc.)
│   └── docs.css                 # Documentation portal layout and styling
├── js/
│   ├── tokens-data.js           # Structured token metadata for search, inspector & export
│   ├── theme.js                 # Theme (Light/Dark), Brand (Blue/Purple/Emerald/Amber) & Density switcher
│   ├── components.js            # Interactive behaviors (Modals, Dropdowns, Tabs, dynamic Toast system)
│   ├── playground.js            # Live interactive component configurator & 3-layer trace visualizer
│   └── app.js                   # Contrast calculations, token matrix filter, DTCG download
├── tokens/
│   └── tokens.json              # W3C DTCG / Style Dictionary compliant design tokens JSON
└── README.md                    # System documentation and Figma alignment guide
```

---

## 🧩 Figma Implementation Guide

### 1. Variables Collections in Figma
1. **`01_Primitives`**:
   - Mode: `Value`
   - Scope: Deselect all scopes or prefix names with `_` to hide from designers' variable pickers.
2. **`02_Semantics`**:
   - Modes: `Light` and `Dark` (plus Brand modes if using Enterprise).
   - Alias: Bind every variable to its corresponding Primitive in `01_Primitives`.
   - Scoping: Set text tokens to **Text fill only**, borders to **Stroke only**, and backgrounds to **Frame fill only**.
3. **`03_Components`**:
   - Mode: `Value`
   - Alias: Bind strictly to `02_Semantics`.

### 2. Auto Layout & Component Construction
- Every component is built 100% on **Auto Layout**.
- Paddings and gaps are bound to `space/*` tokens.
- Corner radii are bound to `radius/*` tokens.
- Text layers use predefined Text Styles linked to semantic typography roles.

---

## 💻 Style Dictionary & Code Handoff

The `tokens/tokens.json` file adheres to the W3C DTCG format. To compile tokens to iOS, Android, or SCSS, install Style Dictionary:

```bash
npm install -g style-dictionary
style-dictionary build
```

---

## 🛡️ Pre-Release QA Regression Guard

Before shipping or tagging any release, run the automated QA regression suite:

```bash
node qa/audit.mjs
```

This automated auditor validates:
1. **Strict 3-Layer Token Architecture**: 0 hex, rgb, or named colors in `/css/components/`, 0 skipped layers.
2. **Token References**: 0 undefined CSS variables across the entire cascade.
3. **Component CSS Hygiene**: 0 hardcoded spacing, radius, or font-size pixel dimensions.
4. **Data Sync**: 0 drift between `/data/tokens.js` and CSS custom properties.
5. **Color Science & Contrast**: WCAG 2.2 AA contrast ($\ge 4.5:1$) across Light and Dark themes, verified over 5 diverse seed palettes (Light, Dark, Yellow, Gray, Default).
6. **Navigation & Links**: 100% crawl across all registered routes with 0 broken links and 0 missing static assets.
7. **Semantic Structure**: Exactly one `<h1>` per page, zero skipped heading levels, and 5 required ARIA landmarks (`header`, `nav`, `main`, `aside`, `footer`).

---

## ♿ Accessibility Standard (WCAG 2.2 AA)

All semantic text/background pairings meet or exceed **WCAG 2.2 AA** contrast ($4.5:1$ for body text, $3:1$ for large headings and interactive focus boundaries). Keyboard focus rings utilize high-contrast 2px outlines with 2px offset. Overlays provide modal focus trapping, Escape dismissal, and return focus to triggering elements. Forced-colors mode (`@media (forced-colors: active)`) and reduced motion preferences (`@media (prefers-reduced-motion: reduce)`) are fully honored.

