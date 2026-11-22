/**
 * TRILAYER DESIGN SYSTEM — SPINNER COMPONENT SPECIFICATION
 */

export default {
  id: "spinner",
  title: "Spinner",
  status: "Stable",
  version: "1.0.0",
  description: "Spinners provide indeterminate visual feedback when an action or view is actively loading.",
  layerInspectorChains: [
    {
      element: "Spinner Track Color",
      componentToken: "--tl-comp-spinner-track",
      semanticToken: "--tl-sys-color-surface-container-highest",
      primitiveTokenLight: "--tl-ref-slate-200",
      primitiveTokenDark: "--tl-ref-slate-700",
      valueLight: "#E2E8F0",
      valueDark: "#334155"
    },
    {
      element: "Spinner Active Indicator",
      componentToken: "--tl-comp-spinner-indicator",
      semanticToken: "--tl-sys-color-primary",
      primitiveTokenLight: "--tl-ref-indigo-500",
      primitiveTokenDark: "--tl-ref-indigo-400",
      valueLight: "#5B5BD6",
      valueDark: "#818CF8"
    }
  ],
  variants: [
    { name: "Small (16px)", desc: "Fits inline inside buttons and inputs." },
    { name: "Medium (24px)", desc: "Standard component-level loader for cards and panes." },
    { name: "Large (32px)", desc: "Page-level and modal loading states." }
  ],
  states: ["Active Spin", "Inline With Button"],
  codeSnippets: {
    html: `<div class="tl-spinner tl-spinner--md" role="status" aria-label="Loading content..."></div>`,
    css: `.tl-spinner--md {
  width: var(--tl-comp-spinner-size-md);
  height: var(--tl-comp-spinner-size-md);
}`
  },
  accessibility: {
    aria: [
      { attribute: "role='status'", description: "Informs screen readers that an ongoing activity is taking place." },
      { attribute: "aria-label", description: "Provides clear textual explanation (e.g. 'Loading content...')." }
    ],
    keyboard: []
  },
  guidelines: {
    dos: [
      "Use small spinners inside buttons to preserve button width during form submission.",
      "Always provide an accessible aria-label."
    ],
    donts: [
      "Do not use multiple uncoordinated spinners in the same viewport."
    ]
  },
  related: ["button", "skeleton", "card"]
};
