/**
 * TRILAYER DESIGN SYSTEM — TABS COMPONENT SPECIFICATION
 */

export default {
  id: "tabs",
  title: "Tabs",
  status: "Stable",
  version: "1.0.0",
  description: "Tabs organize content into multiple panels, allowing users to navigate between related views in the same context.",
  layerInspectorChains: [
    {
      element: "Tab Active Indicator",
      componentToken: "--tl-comp-tabs-indicator-color",
      semanticToken: "--tl-sys-color-link",
      primitiveTokenLight: "--tl-ref-indigo-500",
      primitiveTokenDark: "--tl-ref-indigo-400",
      valueLight: "#5B5BD6",
      valueDark: "#818CF8"
    },
    {
      element: "Tab Inactive Text",
      componentToken: "--tl-comp-tabs-text",
      semanticToken: "--tl-sys-color-on-surface-variant",
      primitiveTokenLight: "--tl-ref-slate-600",
      primitiveTokenDark: "--tl-ref-slate-400",
      valueLight: "#475569",
      valueDark: "#94A3B8"
    }
  ],
  variants: [
    { name: "Underline Tabs", desc: "Default navigation tabs with bottom active indicator bar." },
    { name: "Icon + Label", desc: "Tabs pairing leading SVG icon with descriptive text." }
  ],
  states: ["Default", "Hover", "Selected (Active)", "Focus-Visible", "Disabled"],
  codeSnippets: {
    html: `<div class="tl-tabs-list" role="tablist">
  <button class="tl-tab-btn is-active" role="tab" aria-selected="true">Design Tokens</button>
  <button class="tl-tab-btn" role="tab" aria-selected="false">Components</button>
  <button class="tl-tab-btn" role="tab" aria-selected="false">Changelog</button>
</div>`,
    css: `.tl-tab-btn.is-active {
  color: var(--tl-comp-tabs-active-text);
  border-bottom-color: var(--tl-comp-tabs-indicator-color);
}`
  },
  accessibility: {
    aria: [
      { attribute: "role='tablist'", description: "Container designating the tab navigation area." },
      { attribute: "role='tab'", description: "Interactive tab trigger button." },
      { attribute: "aria-selected", description: "Indicates the active panel to assistive technology." }
    ],
    keyboard: [
      { key: "ArrowLeft / ArrowRight", description: "Moves focus between sibling tab triggers." },
      { key: "Enter / Space", description: "Activates focused tab panel." }
    ]
  },
  guidelines: {
    dos: [
      "Keep tab labels short, mutually exclusive, and predictable.",
      "Sync URL hash or state to allow direct deep-linking."
    ],
    donts: [
      "Avoid wrapping tabs into multiple rows; use horizontal swipe scrolling instead."
    ]
  },
  related: ["button", "card", "divider"]
};
