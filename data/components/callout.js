/**
 * TRILAYER DESIGN SYSTEM — CALLOUT COMPONENT SPECIFICATION
 */

export default {
  id: "callout",
  title: "Callout",
  status: "Stable",
  version: "1.0.0",
  description: "Callouts communicate important in-context messages, alerts, and instructions with semantic color coding.",
  layerInspectorChains: [
    {
      element: "Info Callout Fill",
      componentToken: "--tl-comp-callout-info-bg",
      semanticToken: "--tl-sys-color-surface-container-high",
      primitiveTokenLight: "--tl-ref-indigo-50",
      primitiveTokenDark: "--tl-ref-slate-800",
      valueLight: "#EFF0FC",
      valueDark: "#1E293B"
    },
    {
      element: "Success Callout Fill",
      componentToken: "--tl-comp-callout-success-bg",
      semanticToken: "--tl-sys-color-success-container",
      primitiveTokenLight: "--tl-ref-emerald-50",
      primitiveTokenDark: "--tl-ref-emerald-950",
      valueLight: "#ECFDF5",
      valueDark: "#022C22"
    }
  ],
  variants: [
    { name: "Info", desc: "Neutral recommendations, context, and documentation notes." },
    { name: "Success", desc: "Confirmations, successful verifications, and approvals." },
    { name: "Warning", desc: "Notices, deprecation warnings, or actions needing attention." },
    { name: "Danger", desc: "Security alerts, critical failures, or destructive actions." }
  ],
  states: ["Standard With Title", "Compact Single-Line"],
  codeSnippets: {
    html: `<div class="tl-callout tl-callout--info" role="status">
  <div class="tl-callout__icon">
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
  </div>
  <div class="tl-callout__content">
    <div class="tl-callout__title">Pro Tip</div>
    <p class="tl-callout__body">Tokens update dynamically across components without reloading.</p>
  </div>
</div>`,
    css: `.tl-callout--info {
  background-color: var(--tl-comp-callout-info-bg);
  border-color: var(--tl-comp-callout-info-border);
  color: var(--tl-comp-callout-info-text);
}`
  },
  accessibility: {
    aria: [
      { attribute: "role='status'", description: "Used for non-urgent informative or success notices." },
      { attribute: "role='alert'", description: "Used for urgent warning and danger notices requiring immediate attention." }
    ],
    keyboard: []
  },
  guidelines: {
    dos: [
      "Include a clear semantic icon alongside text to support color-blind users.",
      "Keep message copy concise and actionable."
    ],
    donts: [
      "Do not overwhelm users with multiple stacked callouts on a single view."
    ]
  },
  related: ["tooltip", "snackbar", "card"]
};
