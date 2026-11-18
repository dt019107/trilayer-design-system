/**
 * TRILAYER DESIGN SYSTEM — TOOLTIP COMPONENT SPECIFICATION
 */

export default {
  id: "tooltip",
  title: "Tooltip",
  status: "Stable",
  version: "1.0.0",
  description: "Tooltips display informative text when users hover over, focus on, or tap an interactive element.",
  layerInspectorChains: [
    {
      element: "Tooltip Background",
      componentToken: "--tl-comp-tooltip-bg",
      semanticToken: "--tl-sys-color-inverse-surface",
      primitiveTokenLight: "--tl-ref-gray-900",
      primitiveTokenDark: "--tl-ref-gray-50",
      valueLight: "#121417",
      valueDark: "#F8F9FA"
    },
    {
      element: "Tooltip Text",
      componentToken: "--tl-comp-tooltip-text",
      semanticToken: "--tl-sys-color-inverse-on-surface",
      primitiveTokenLight: "--tl-ref-gray-50",
      primitiveTokenDark: "--tl-ref-gray-900",
      valueLight: "#F8F9FA",
      valueDark: "#121417"
    }
  ],
  variants: [{ name: "Plain Tooltip", desc: "Short descriptive string explaining an icon or label." }],
  states: ["Hidden", "Visible on Hover / Focus"],
  codeSnippets: {
    html: `<div class="tl-tooltip-wrapper">
  <button class="tl-btn-icon tl-btn-icon--md" aria-label="Search">
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
  </button>
  <div class="tl-tooltip" role="tooltip">Search documentation (Cmd+K)</div>
</div>`,
    css: `.tl-tooltip {
  background-color: var(--tl-comp-tooltip-bg);
  color: var(--tl-comp-tooltip-text);
  border-radius: var(--tl-comp-tooltip-radius);
  padding: 4px 8px;
}`
  },
  accessibility: {
    aria: [
      { attribute: "role='tooltip'", description: "Identifies tooltip container." },
      { attribute: "aria-describedby", description: "Links target button to tooltip ID." }
    ],
    keyboard: [{ key: "Escape", description: "Dismisses tooltip while focus remains on trigger." }]
  },
  guidelines: {
    dos: ["Provide tooltips for icon-only buttons so their action is unambiguous."],
    donts: ["Never put interactive buttons, links, or essential critical instructions in a tooltip."]
  },
  related: ["button", "dialog"]
};

