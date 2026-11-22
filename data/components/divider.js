/**
 * TRILAYER DESIGN SYSTEM — DIVIDER COMPONENT SPECIFICATION
 */

export default {
  id: "divider",
  title: "Divider",
  status: "Stable",
  version: "1.0.0",
  description: "Dividers provide visual separation between grouped content sections, lists, and toolbars.",
  layerInspectorChains: [
    {
      element: "Divider Hairline Rule",
      componentToken: "--tl-comp-divider-margin",
      semanticToken: "--tl-sys-space-lg",
      primitiveTokenLight: "--tl-ref-space-24",
      primitiveTokenDark: "--tl-ref-space-24",
      valueLight: "24px",
      valueDark: "24px"
    }
  ],
  variants: [
    { name: "Horizontal", desc: "Full-width section rule separating vertical page blocks." },
    { name: "Vertical", desc: "Subtle inline hairline separating buttons or navigation pills." }
  ],
  states: ["Horizontal Rule", "Vertical Inset"],
  codeSnippets: {
    html: `<hr class="tl-divider">
<div style="display: flex; align-items: center;">
  <span>First Section</span>
  <div class="tl-divider--vertical" aria-hidden="true"></div>
  <span>Second Section</span>
</div>`,
    css: `.tl-divider {
  border: none;
  border-top: 1px solid var(--tl-sys-color-outline-variant);
}`
  },
  accessibility: {
    aria: [
      { attribute: "aria-hidden='true'", description: "Hides decorative dividers from screen readers to prevent noise." }
    ],
    keyboard: []
  },
  guidelines: {
    dos: [
      "Use vertical dividers to create clear boundaries in top navbars and button bars."
    ],
    donts: [
      "Never overuse dividers where whitespace padding alone already creates grouping."
    ]
  },
  related: ["card", "tabs", "button"]
};
