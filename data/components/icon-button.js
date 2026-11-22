/**
 * TRILAYER DESIGN SYSTEM — ICON BUTTON COMPONENT SPECIFICATION
 */

export default {
  id: "icon-button",
  title: "Icon Button",
  status: "Stable",
  version: "1.0.0",
  description: "Icon buttons trigger actions using compact visual iconography, saving space in dense toolbars and table headers.",
  layerInspectorChains: [
    {
      element: "Icon Button Radius",
      componentToken: "--tl-comp-button-radius",
      semanticToken: "--tl-sys-shape-control",
      primitiveTokenLight: "--tl-ref-radius-8",
      primitiveTokenDark: "--tl-ref-radius-8",
      valueLight: "8px",
      valueDark: "8px"
    },
    {
      element: "Icon Button Hover Fill",
      componentToken: "--tl-comp-button-ghost-hover-bg",
      semanticToken: "--tl-sys-color-surface-container-high",
      primitiveTokenLight: "--tl-ref-slate-100",
      primitiveTokenDark: "--tl-ref-slate-800",
      valueLight: "#F1F5F9",
      valueDark: "#1E293B"
    }
  ],
  variants: [
    { name: "Small (32px)", desc: "Inline table row and dense header actions." },
    { name: "Medium (40px)", desc: "Standard navigation and toolbar triggers." },
    { name: "Large (48px)", desc: "Touch-first mobile interfaces and prominent action bars." }
  ],
  states: ["Default", "Hover", "Active", "Focus-Visible", "Disabled"],
  codeSnippets: {
    html: `<button class="tl-btn-icon tl-btn-icon--md" aria-label="Search documentation">
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
</button>`,
    css: `.tl-btn-icon--md {
  width: var(--tl-comp-button-height-md);
  height: var(--tl-comp-button-height-md);
}`
  },
  accessibility: {
    aria: [
      { attribute: "aria-label", description: "Mandatory accessible name for screen readers explaining the action (e.g. 'Search', 'Close dialog')." }
    ],
    keyboard: [
      { key: "Enter / Space", description: "Triggers icon button action." }
    ]
  },
  guidelines: {
    dos: [
      "Always include an aria-label explaining the action.",
      "Ensure touch target meets 44x44px minimum on mobile devices."
    ],
    donts: [
      "Never use cryptic or ambiguous icons without supporting tooltips."
    ]
  },
  related: ["button", "tooltip", "chip"]
};
