/**
 * TRILAYER DESIGN SYSTEM — TOKEN METADATA & CHAIN CATALOG
 * Programmatic source of truth for the Layer Inspector, specimens, and theme engine.
 * 
 * Each token chain maps:
 * Component Token (--tl-comp-*) -> Semantic Role (--tl-sys-*) -> Primitive Ref (--tl-ref-*) -> Raw Value
 */

export const tokenLayers = {
  primitives: {
    name: "Primitives",
    prefix: "--tl-ref-",
    accent: "neutral",
    color: "#64748B",
    description: "Raw values with no contextual meaning. The foundational building blocks."
  },
  semantic: {
    name: "Semantic",
    prefix: "--tl-sys-",
    accent: "indigo",
    color: "#5B5BD6",
    description: "Role-based tokens that alias primitives. Change by mode (light/dark) and density."
  },
  components: {
    name: "Component",
    prefix: "--tl-comp-",
    accent: "teal",
    color: "#0D9488",
    description: "Scoped tokens defining component anatomy. Only reference semantic tokens."
  }
};

export const sampleTokenChains = [
  {
    element: "Primary Button Background",
    componentToken: "--tl-comp-button-primary-bg",
    semanticToken: "--tl-sys-color-primary",
    primitiveTokenLight: "--tl-ref-indigo-500",
    primitiveTokenDark: "--tl-ref-indigo-500",
    valueLight: "#5B5BD6",
    valueDark: "#5B5BD6"
  },
  {
    element: "Primary Button Text",
    componentToken: "--tl-comp-button-primary-text",
    semanticToken: "--tl-sys-color-on-primary",
    primitiveTokenLight: "--tl-ref-white",
    primitiveTokenDark: "--tl-ref-white",
    valueLight: "#FFFFFF",
    valueDark: "#FFFFFF"
  },
  {
    element: "Control Corner Radius",
    componentToken: "--tl-comp-button-radius",
    semanticToken: "--tl-sys-shape-control",
    primitiveTokenLight: "--tl-ref-radius-8",
    primitiveTokenDark: "--tl-ref-radius-8",
    valueLight: "8px",
    valueDark: "8px"
  },
  {
    element: "Card Background Surface",
    componentToken: "--tl-comp-card-bg",
    semanticToken: "--tl-sys-color-surface-container",
    primitiveTokenLight: "--tl-ref-white",
    primitiveTokenDark: "--tl-ref-gray-900",
    valueLight: "#FFFFFF",
    valueDark: "#121417"
  },
  {
    element: "Input Border (Default)",
    componentToken: "--tl-comp-input-border",
    semanticToken: "--tl-sys-color-outline",
    primitiveTokenLight: "--tl-ref-gray-300",
    primitiveTokenDark: "--tl-ref-gray-500",
    valueLight: "#CED4DA",
    valueDark: "#868E96"
  },
  {
    element: "Tertiary / Component Accent",
    componentToken: "--tl-comp-button-tertiary-bg",
    semanticToken: "--tl-sys-color-tertiary",
    primitiveTokenLight: "--tl-ref-teal-600",
    primitiveTokenDark: "--tl-ref-teal-400",
    valueLight: "#0D9488",
    valueDark: "#2DD4BF"
  }
];

export const colorPrimitives = {
  indigo: [
    { name: "--tl-ref-indigo-25",  hex: "#F7F7FD" },
    { name: "--tl-ref-indigo-50",  hex: "#EFF0FC" },
    { name: "--tl-ref-indigo-100", hex: "#E0E2F9" },
    { name: "--tl-ref-indigo-200", hex: "#C4C8F4" },
    { name: "--tl-ref-indigo-300", hex: "#9FA6EC" },
    { name: "--tl-ref-indigo-400", hex: "#787FE3" },
    { name: "--tl-ref-indigo-500", hex: "#5B5BD6", isSeed: true },
    { name: "--tl-ref-indigo-600", hex: "#4844C7" },
    { name: "--tl-ref-indigo-700", hex: "#3A35AE" },
    { name: "--tl-ref-indigo-800", hex: "#2F2A8E" },
    { name: "--tl-ref-indigo-900", hex: "#262272" },
    { name: "--tl-ref-indigo-950", hex: "#161346" }
  ],
  gray: [
    { name: "--tl-ref-gray-0",    hex: "#FFFFFF" },
    { name: "--tl-ref-gray-25",   hex: "#FCFCFD" },
    { name: "--tl-ref-gray-50",   hex: "#F8F9FA" },
    { name: "--tl-ref-gray-100",  hex: "#F1F3F5" },
    { name: "--tl-ref-gray-150",  hex: "#E9ECEF" },
    { name: "--tl-ref-gray-200",  hex: "#DEE2E6" },
    { name: "--tl-ref-gray-300",  hex: "#CED4DA" },
    { name: "--tl-ref-gray-400",  hex: "#ADB5BD" },
    { name: "--tl-ref-gray-500",  hex: "#868E96" },
    { name: "--tl-ref-gray-600",  hex: "#495057" },
    { name: "--tl-ref-gray-700",  hex: "#343A40" },
    { name: "--tl-ref-gray-800",  hex: "#212529" },
    { name: "--tl-ref-gray-850",  hex: "#181B1E" },
    { name: "--tl-ref-gray-900",  hex: "#121417" },
    { name: "--tl-ref-gray-950",  hex: "#0A0C0E" },
    { name: "--tl-ref-gray-1000", hex: "#050607" }
  ],
  teal: [
    { name: "--tl-ref-teal-50",  hex: "#F0FDFA" },
    { name: "--tl-ref-teal-100", hex: "#CCFBF1" },
    { name: "--tl-ref-teal-200", hex: "#99F6E4" },
    { name: "--tl-ref-teal-300", hex: "#5EEAD4" },
    { name: "--tl-ref-teal-400", hex: "#2DD4BF" },
    { name: "--tl-ref-teal-500", hex: "#14B8A6" },
    { name: "--tl-ref-teal-600", hex: "#0D9488" },
    { name: "--tl-ref-teal-700", hex: "#0F766E" },
    { name: "--tl-ref-teal-800", hex: "#115E59" },
    { name: "--tl-ref-teal-900", hex: "#134E4A" },
    { name: "--tl-ref-teal-950", hex: "#042F2E" }
  ],
  emerald: [
    { name: "--tl-ref-emerald-50",  hex: "#ECFDF5" },
    { name: "--tl-ref-emerald-100", hex: "#D1FAE5" },
    { name: "--tl-ref-emerald-200", hex: "#A7F3D0" },
    { name: "--tl-ref-emerald-300", hex: "#6EE7B7" },
    { name: "--tl-ref-emerald-400", hex: "#34D399" },
    { name: "--tl-ref-emerald-500", hex: "#10B981" },
    { name: "--tl-ref-emerald-600", hex: "#059669" },
    { name: "--tl-ref-emerald-700", hex: "#047857" },
    { name: "--tl-ref-emerald-800", hex: "#065F46" },
    { name: "--tl-ref-emerald-900", hex: "#064E3B" },
    { name: "--tl-ref-emerald-950", hex: "#022C22" }
  ],
  amber: [
    { name: "--tl-ref-amber-50",  hex: "#FFFBEB" },
    { name: "--tl-ref-amber-100", hex: "#FEF3C7" },
    { name: "--tl-ref-amber-200", hex: "#FDE68A" },
    { name: "--tl-ref-amber-300", hex: "#FCD34D" },
    { name: "--tl-ref-amber-400", hex: "#FBBF24" },
    { name: "--tl-ref-amber-500", hex: "#F59E0B" },
    { name: "--tl-ref-amber-600", hex: "#D97706" },
    { name: "--tl-ref-amber-700", hex: "#B45309" },
    { name: "--tl-ref-amber-800", hex: "#92400E" },
    { name: "--tl-ref-amber-900", hex: "#78350F" },
    { name: "--tl-ref-amber-950", hex: "#451A03" }
  ],
  rose: [
    { name: "--tl-ref-rose-50",  hex: "#FFF1F2" },
    { name: "--tl-ref-rose-100", hex: "#FFE4E6" },
    { name: "--tl-ref-rose-200", hex: "#FECDD3" },
    { name: "--tl-ref-rose-300", hex: "#FDA4AF" },
    { name: "--tl-ref-rose-400", hex: "#FB7185" },
    { name: "--tl-ref-rose-500", hex: "#F43F5E" },
    { name: "--tl-ref-rose-600", hex: "#E11D48" },
    { name: "--tl-ref-rose-700", hex: "#BE123C" },
    { name: "--tl-ref-rose-800", hex: "#9F1239" },
    { name: "--tl-ref-rose-900", hex: "#881337" },
    { name: "--tl-ref-rose-950", hex: "#4C0519" }
  ],
  sky: [
    { name: "--tl-ref-sky-50",  hex: "#F0F9FF" },
    { name: "--tl-ref-sky-100", hex: "#E0F2FE" },
    { name: "--tl-ref-sky-200", hex: "#BAE6FD" },
    { name: "--tl-ref-sky-300", hex: "#7DD3FC" },
    { name: "--tl-ref-sky-400", hex: "#38BDF8" },
    { name: "--tl-ref-sky-500", hex: "#0EA5E9" },
    { name: "--tl-ref-sky-600", hex: "#0284C7" },
    { name: "--tl-ref-sky-700", hex: "#0369A1" },
    { name: "--tl-ref-sky-800", hex: "#075985" },
    { name: "--tl-ref-sky-900", hex: "#0C4A6E" },
    { name: "--tl-ref-sky-950", hex: "#082F49" }
  ],
  violet: [
    { name: "--tl-ref-violet-50",  hex: "#F5F3FF" },
    { name: "--tl-ref-violet-100", hex: "#EDE9FE" },
    { name: "--tl-ref-violet-200", hex: "#DDD6FE" },
    { name: "--tl-ref-violet-300", hex: "#C4B5FD" },
    { name: "--tl-ref-violet-400", hex: "#A78BFA" },
    { name: "--tl-ref-violet-500", hex: "#8B5CF6" },
    { name: "--tl-ref-violet-600", hex: "#7C3AED" },
    { name: "--tl-ref-violet-700", hex: "#6D28D9" },
    { name: "--tl-ref-violet-800", hex: "#5B21B6" },
    { name: "--tl-ref-violet-900", hex: "#4C1D95" },
    { name: "--tl-ref-violet-950", hex: "#2E1065" }
  ]
};

export const semanticColorRoles = [
  { role: "--tl-sys-color-primary", name: "Primary", desc: "Key high-emphasis brand actions and focus rings", lightRef: "--tl-ref-indigo-500", darkRef: "--tl-ref-indigo-400" },
  { role: "--tl-sys-color-on-primary", name: "On Primary", desc: "Text and glyphs overlaid on primary color", lightRef: "--tl-ref-white", darkRef: "--tl-ref-indigo-950" },
  { role: "--tl-sys-color-primary-container", name: "Primary Container", desc: "Low-contrast brand accent fills", lightRef: "--tl-ref-indigo-50", darkRef: "--tl-ref-indigo-900" },
  { role: "--tl-sys-color-secondary", name: "Secondary", desc: "Medium-emphasis utility components", lightRef: "--tl-ref-indigo-700", darkRef: "--tl-ref-indigo-200" },
  { role: "--tl-sys-color-tertiary", name: "Tertiary", desc: "Teal motif distinguishing component layers", lightRef: "--tl-ref-teal-600", darkRef: "--tl-ref-teal-400" },
  { role: "--tl-sys-color-surface", name: "Surface", desc: "Default canvas background", lightRef: "--tl-ref-white", darkRef: "--tl-ref-gray-950" },
  { role: "--tl-sys-color-surface-container", name: "Surface Container", desc: "Subtle background cards and panel blocks", lightRef: "--tl-ref-gray-50", darkRef: "--tl-ref-gray-900" },
  { role: "--tl-sys-color-on-surface", name: "On Surface", desc: "High-contrast headings and body text", lightRef: "--tl-ref-gray-900", darkRef: "--tl-ref-gray-50" },
  { role: "--tl-sys-color-on-surface-variant", name: "On Surface Variant", desc: "Secondary descriptions and meta labels", lightRef: "--tl-ref-gray-600", darkRef: "--tl-ref-gray-300" },
  { role: "--tl-sys-color-outline", name: "Outline", desc: "Default border and control boundaries", lightRef: "--tl-ref-gray-300", darkRef: "--tl-ref-gray-700" }
];

export const spacingScale = [
  { token: "--tl-ref-space-2",  value: "2px",  rem: "0.125rem", role: "Micro alignments" },
  { token: "--tl-ref-space-4",  value: "4px",  rem: "0.25rem",  role: "Icon gaps, inline badges" },
  { token: "--tl-ref-space-8",  value: "8px",  rem: "0.5rem",   role: "Control gaps, chip paddings" },
  { token: "--tl-ref-space-12", value: "12px", rem: "0.75rem",  role: "Button gaps, card inner headers" },
  { token: "--tl-ref-space-16", value: "16px", rem: "1rem",     role: "Base grid gutter, control paddings" },
  { token: "--tl-ref-space-20", value: "20px", rem: "1.25rem",  role: "Breadcrumb gaps, panel margins" },
  { token: "--tl-ref-space-24", value: "24px", rem: "1.5rem",   role: "Standard card padding, section gap" },
  { token: "--tl-ref-space-32", value: "32px", rem: "2rem",     role: "Major section headings, content padding" },
  { token: "--tl-ref-space-40", value: "40px", rem: "2.5rem",   role: "Header padding, desktop canvas margins" },
  { token: "--tl-ref-space-48", value: "48px", rem: "3rem",     role: "Section divisions" },
  { token: "--tl-ref-space-64", value: "64px", rem: "4rem",     role: "Major layout bounds" },
  { token: "--tl-ref-space-80", value: "80px", rem: "5rem",     role: "Hero spacing" },
  { token: "--tl-ref-space-96", value: "96px", rem: "6rem",     role: "Page footers" }
];

export const shapeScale = [
  { token: "--tl-ref-radius-0",    value: "0px",    role: "--tl-sys-shape-none", desc: "Square elements, sharp dividers" },
  { token: "--tl-ref-radius-4",    value: "4px",    role: "--tl-sys-shape-xs", desc: "Tooltips, small code tags" },
  { token: "--tl-ref-radius-8",    value: "8px",    role: "--tl-sys-shape-sm / --tl-sys-shape-control", desc: "Buttons, inputs, chips, controls" },
  { token: "--tl-ref-radius-12",   value: "12px",   role: "--tl-sys-shape-md / --tl-sys-shape-container", desc: "Cards, panels, surface containers" },
  { token: "--tl-ref-radius-16",   value: "16px",   role: "--tl-sys-shape-lg / --tl-sys-shape-overlay", desc: "Modals, dialogs, sheets" },
  { token: "--tl-ref-radius-24",   value: "24px",   role: "--tl-sys-shape-xl", desc: "Hero feature banners, prominent cards" },
  { token: "--tl-ref-radius-full", value: "9999px", role: "--tl-sys-shape-full / --tl-sys-shape-badge", desc: "Status pills, avatars, circular icon triggers" }
];

export const typographyScale = [
  { role: "Display Large", token: "--tl-sys-typescale-display-large", size: "56px", line: "1.15", weight: "800", font: "Manrope" },
  { role: "Headline Large", token: "--tl-sys-typescale-headline-large", size: "32px", line: "1.25", weight: "700", font: "Manrope" },
  { role: "Headline Medium", token: "--tl-sys-typescale-headline-medium", size: "24px", line: "1.35", weight: "700", font: "Manrope" },
  { role: "Title Large", token: "--tl-sys-typescale-title-large", size: "20px", line: "1.4", weight: "600", font: "Manrope" },
  { role: "Title Medium", token: "--tl-sys-typescale-title-medium", size: "16px", line: "1.4", weight: "600", font: "Manrope" },
  { role: "Body Large", token: "--tl-sys-typescale-body-large", size: "16px", line: "1.6", weight: "400", font: "Inter" },
  { role: "Body Medium", token: "--tl-sys-typescale-body-medium", size: "14px", line: "1.5", weight: "400", font: "Inter" },
  { role: "Body Small", token: "--tl-sys-typescale-body-small", size: "13px", line: "1.4", weight: "400", font: "Inter" },
  { role: "Label Medium", token: "--tl-sys-typescale-label-medium", size: "12px", line: "1.35", weight: "600", font: "Inter" },
  { role: "Label Caps", token: "--tl-sys-typescale-label-caps", size: "11px", line: "1.0", weight: "700", font: "Manrope (Caps)" }
];

export const elevationScale = [
  { level: "Level 0", token: "--tl-sys-elevation-0", shadow: "none", role: "Flat resting surfaces, tables, outlined cards" },
  { level: "Level 1", token: "--tl-sys-elevation-1", shadow: "0 1px 2px rgba(18,20,23,0.05)", role: "Resting cards, primary buttons, switches" },
  { level: "Level 2", token: "--tl-sys-elevation-2", shadow: "0 2px 6px rgba(18,20,23,0.08)", role: "Card hover state, tooltips, small popovers" },
  { level: "Level 3", token: "--tl-sys-elevation-3", shadow: "0 6px 16px rgba(18,20,23,0.09)", role: "Toasts, snackbars, floating action triggers" },
  { level: "Level 4", token: "--tl-sys-elevation-4", shadow: "0 12px 28px rgba(18,20,23,0.12)", role: "Modal dialogs, command palettes" },
  { level: "Level 5", token: "--tl-sys-elevation-5", shadow: "0 24px 48px rgba(18,20,23,0.16)", role: "Full-screen overlays, persistent side sheets" }
];

export const motionScale = [
  { name: "Standard", curve: "cubic-bezier(0.2, 0.0, 0.0, 1.0)", token: "--tl-sys-motion-easing-standard", desc: "Default easing for all general component state transitions" },
  { name: "Decelerate (Enter)", curve: "cubic-bezier(0.0, 0.0, 0.2, 1.0)", token: "--tl-sys-motion-easing-enter", desc: "Incoming elements (modals opening, toasts appearing)" },
  { name: "Accelerate (Exit)", curve: "cubic-bezier(0.3, 0.0, 1.0, 1.0)", token: "--tl-sys-motion-easing-exit", desc: "Outgoing elements (dialogs closing, toasts exiting)" },
  { name: "Emphasized", curve: "cubic-bezier(0.4, 0.0, 0.2, 1.0)", token: "--tl-sys-motion-easing-emphasized", desc: "Expansions, hero transitions, drawer slide movements" }
];
