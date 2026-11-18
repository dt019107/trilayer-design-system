/**
 * 3-LAYER TOKEN METADATA ARCHITECTURE
 * Structured data for the Interactive Token Inspector, Contrast Checker, and DTCG/Figma Export.
 */

window.DS_TOKENS = {
  // LAYER 1: PRIMITIVES
  primitives: [
    // Neutrals (Luxury Precision Warm Neutrals)
    { name: "--pr-color-neutral-0", category: "color", value: "#ffffff", desc: "Pure white base" },
    { name: "--pr-color-neutral-50", category: "color", value: "#fbfbfd", desc: "Warm luxury light canvas" },
    { name: "--pr-color-neutral-100", category: "color", value: "#f4f5f8", desc: "Subtle background container" },
    { name: "--pr-color-neutral-200", category: "color", value: "#e9ecf1", desc: "Subtle borders" },
    { name: "--pr-color-neutral-300", category: "color", value: "#d6dbe4", desc: "Default border lines" },
    { name: "--pr-color-neutral-400", category: "color", value: "#94a3b8", desc: "Muted text, placeholders" },
    { name: "--pr-color-neutral-500", category: "color", value: "#64748b", desc: "Mid tone slate" },
    { name: "--pr-color-neutral-600", category: "color", value: "#475569", desc: "Secondary text" },
    { name: "--pr-color-neutral-700", category: "color", value: "#334155", desc: "Dark borders, muted elements" },
    { name: "--pr-color-neutral-800", category: "color", value: "#1e293b", desc: "Dark surface background" },
    { name: "--pr-color-neutral-900", category: "color", value: "#0f172a", desc: "Primary text & dark canvas" },
    { name: "--pr-color-neutral-950", category: "color", value: "#0c0e12", desc: "Velvet obsidian dark canvas" },

    // Precision Lapis Brand Anchor
    { name: "--pr-color-blue-500", category: "color", value: "#3b5bfd", desc: "Focus ring & active highlights" },
    { name: "--pr-color-blue-600", category: "color", value: "#2d55ff", desc: "Precision Lapis brand interactive" },
    { name: "--pr-color-blue-700", category: "color", value: "#1d4ed8", desc: "Brand interactive hover color" },

    // Emerald
    { name: "--pr-color-emerald-500", category: "color", value: "#10b981", desc: "Success indicator" },
    { name: "--pr-color-emerald-600", category: "color", value: "#059669", desc: "Success base fill" },

    // Amber
    { name: "--pr-color-amber-500", category: "color", value: "#f59e0b", desc: "Warning base fill" },

    // Red
    { name: "--pr-color-red-500", category: "color", value: "#ef4444", desc: "Danger base fill" },
    { name: "--pr-color-red-600", category: "color", value: "#dc2626", desc: "Destructive actions" },

    // Spacing
    { name: "--pr-space-4", category: "space", value: "4px", desc: "Micro spacing unit" },
    { name: "--pr-space-8", category: "space", value: "8px", desc: "Standard compact space" },
    { name: "--pr-space-12", category: "space", value: "12px", desc: "Input & small container padding" },
    { name: "--pr-space-16", category: "space", value: "16px", desc: "Base layout & container padding" },
    { name: "--pr-space-24", category: "space", value: "24px", desc: "Section & modal spacing" },
    { name: "--pr-space-32", category: "space", value: "32px", desc: "Large layout gaps" },

    // Radii
    { name: "--pr-radius-4", category: "radius", value: "4px", desc: "Small controls, checkboxes" },
    { name: "--pr-radius-6", category: "radius", value: "6px", desc: "Standard buttons & inputs" },
    { name: "--pr-radius-8", category: "radius", value: "8px", desc: "Larger controls" },
    { name: "--pr-radius-12", category: "radius", value: "12px", desc: "Cards & popovers" },
    { name: "--pr-radius-16", category: "radius", value: "16px", desc: "Modals & dialogs" },
    { name: "--pr-radius-full", category: "radius", value: "9999px", desc: "Pills, avatars, switches" }
  ],

  // LAYER 2: SEMANTICS (Aliases Layer 1)
  semantics: [
    {
      name: "--sem-color-bg-canvas",
      aliasLight: "--pr-color-neutral-50",
      aliasDark: "--pr-color-neutral-950",
      category: "color",
      role: "App backdrop / viewport background"
    },
    {
      name: "--sem-color-bg-surface",
      aliasLight: "--pr-color-neutral-0",
      aliasDark: "--pr-color-neutral-900",
      category: "color",
      role: "Standard card and container background"
    },
    {
      name: "--sem-color-bg-subtle",
      aliasLight: "--pr-color-neutral-100",
      aliasDark: "--pr-color-neutral-800",
      category: "color",
      role: "Secondary backgrounds, chips, table headers"
    },
    {
      name: "--sem-color-bg-brand-default",
      aliasLight: "--sem-brand-600 (#1e5ee6)",
      aliasDark: "--sem-brand-500 (#3670f4)",
      category: "color",
      role: "Primary action background"
    },
    {
      name: "--sem-color-text-primary",
      aliasLight: "--pr-color-neutral-900",
      aliasDark: "--pr-color-neutral-50",
      category: "color",
      role: "Headings, body copy, active labels"
    },
    {
      name: "--sem-color-text-secondary",
      aliasLight: "--pr-color-neutral-600",
      aliasDark: "--pr-color-neutral-400",
      category: "color",
      role: "Helper text, subtitles, table headers"
    },
    {
      name: "--sem-color-text-inverse",
      aliasLight: "--pr-color-neutral-0",
      aliasDark: "--pr-color-neutral-950",
      category: "color",
      role: "Text placed on dark/brand fills"
    },
    {
      name: "--sem-color-border-default",
      aliasLight: "--pr-color-neutral-300",
      aliasDark: "--pr-color-neutral-700",
      category: "color",
      role: "Standard input and card boundaries"
    },
    {
      name: "--sem-color-border-focus",
      aliasLight: "--sem-brand-500",
      aliasDark: "--sem-brand-400",
      category: "color",
      role: "Focus rings and highlighted strokes"
    },
    {
      name: "--sem-radius-control",
      aliasLight: "--pr-radius-6",
      aliasDark: "--pr-radius-6",
      category: "radius",
      role: "Standard button and input corner roundness"
    },
    {
      name: "--sem-radius-card",
      aliasLight: "--pr-radius-12",
      aliasDark: "--pr-radius-12",
      category: "radius",
      role: "Card and dropdown container corners"
    },
    {
      name: "--sem-space-inset-md",
      aliasLight: "--pr-space-16",
      aliasDark: "--pr-space-16",
      category: "space",
      role: "Standard interior padding for components"
    }
  ],

  // LAYER 3: COMPONENT TOKENS (Aliases Layer 2)
  components: [
    {
      component: "Button",
      token: "--btn-primary-bg",
      aliasSemantic: "--sem-color-bg-brand-default",
      resolvedPrimitive: "--pr-color-blue-600 (#1e5ee6) / blue-500 (#3670f4)",
      property: "background-color"
    },
    {
      component: "Button",
      token: "--btn-primary-text",
      aliasSemantic: "--sem-color-text-inverse",
      resolvedPrimitive: "--pr-color-white (Light) / neutral-950 (#070b13)",
      property: "color"
    },
    {
      component: "Button",
      token: "--btn-radius",
      aliasSemantic: "--sem-radius-control",
      resolvedPrimitive: "--pr-radius-6 (6px)",
      property: "border-radius"
    },
    {
      component: "Input",
      token: "--input-bg",
      aliasSemantic: "--sem-color-bg-surface",
      resolvedPrimitive: "--pr-color-white (Light) / neutral-900 (#0d1522)",
      property: "background-color"
    },
    {
      component: "Input",
      token: "--input-border-default",
      aliasSemantic: "--sem-color-border-default",
      resolvedPrimitive: "--pr-color-neutral-300 (#c6d2df) / neutral-700 (#303e50)",
      property: "border-color"
    },
    {
      component: "Input",
      token: "--input-border-focus",
      aliasSemantic: "--sem-color-border-focus",
      resolvedPrimitive: "--sem-brand-500 (#3670f4)",
      property: "border-color (focus)"
    },
    {
      component: "Card",
      token: "--card-bg",
      aliasSemantic: "--sem-color-bg-surface",
      resolvedPrimitive: "--pr-color-white (Light) / neutral-900 (#0d1522)",
      property: "background-color"
    },
    {
      component: "Card",
      token: "--card-radius",
      aliasSemantic: "--sem-radius-card",
      resolvedPrimitive: "--pr-radius-12 (12px)",
      property: "border-radius"
    },
    {
      component: "Badge",
      token: "--badge-brand-bg",
      aliasSemantic: "--sem-color-bg-brand-subtle",
      resolvedPrimitive: "--sem-brand-50 (#eff5ff) / brand-subtle alpha (Dark)",
      property: "background-color"
    },
    {
      component: "Modal",
      token: "--modal-bg",
      aliasSemantic: "--sem-color-bg-surface-raised",
      resolvedPrimitive: "--pr-color-white (Light) / neutral-800 (#1c2635)",
      property: "background-color"
    }
  ]
};
