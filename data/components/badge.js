/**
 * TRILAYER DESIGN SYSTEM — BADGE COMPONENT SPECIFICATION
 */

export default {
  id: "badge",
  title: "Badge",
  status: "Stable",
  version: "1.0.0",
  description: "Badges highlight status, tag attributes, or categorize items with high visual scanability.",
  layerInspectorChains: [
    {
      element: "Brand Badge Fill",
      componentToken: "--tl-comp-badge-brand-bg",
      semanticToken: "--tl-sys-color-primary-container",
      primitiveTokenLight: "--tl-ref-indigo-50",
      primitiveTokenDark: "--tl-ref-indigo-900",
      valueLight: "#EFF0FC",
      valueDark: "#262272"
    },
    {
      element: "Success Badge Fill",
      componentToken: "--tl-comp-badge-success-bg",
      semanticToken: "--tl-sys-color-success-container",
      primitiveTokenLight: "--tl-ref-emerald-50",
      primitiveTokenDark: "--tl-ref-emerald-950",
      valueLight: "#ECFDF5",
      valueDark: "#022C22"
    }
  ],
  variants: [
    { name: "Neutral", desc: "Metadata tags and version indicators." },
    { name: "Brand", desc: "Active state or system-level property." },
    { name: "Success", desc: "Passed test, verified credential, or online status." },
    { name: "Warning", desc: "Pending review, deprecated token, or notice." },
    { name: "Danger", desc: "Critical error, revoked key, or security alert." }
  ],
  states: ["Static Label", "Pill with Status Dot"],
  codeSnippets: {
    html: `<span class="tl-badge tl-badge--success">
  <span class="tl-badge__dot"></span>WCAG AA Compliant
</span>`,
    css: `.tl-badge--success {
  background-color: var(--tl-comp-badge-success-bg);
  color: var(--tl-comp-badge-success-text);
  border: 1px solid var(--tl-comp-badge-success-border);
}`
  },
  accessibility: {
    aria: [{ attribute: "aria-label", description: "Provides accessible textual explanation if status dot is used." }],
    keyboard: []
  },
  guidelines: {
    dos: ["Include a supporting text label next to color dots to ensure color-blind accessibility."],
    donts: ["Never rely exclusively on color to convey status."]
  },
  related: ["chip", "card", "button"]
};

