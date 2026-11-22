/**
 * TRILAYER DESIGN SYSTEM — SELECT COMPONENT SPECIFICATION
 */

export default {
  id: "select",
  title: "Select",
  status: "Stable",
  version: "1.0.0",
  description: "Select controls allow users to pick one or more options from a structured drop-down list.",
  layerInspectorChains: [
    {
      element: "Select Background Fill",
      componentToken: "--tl-comp-input-bg",
      semanticToken: "--tl-sys-color-surface-container",
      primitiveTokenLight: "--tl-ref-white",
      primitiveTokenDark: "--tl-ref-slate-900",
      valueLight: "#FFFFFF",
      valueDark: "#0F172A"
    },
    {
      element: "Select Border Focus",
      componentToken: "--tl-comp-input-border-focus",
      semanticToken: "--tl-sys-color-primary",
      primitiveTokenLight: "--tl-ref-indigo-500",
      primitiveTokenDark: "--tl-ref-indigo-400",
      valueLight: "#5B5BD6",
      valueDark: "#818CF8"
    }
  ],
  variants: [
    { name: "Single Select", desc: "Selects one option from predefined system choices." },
    { name: "Density Sizes", desc: "Supports small (32px), medium (40px), and large (48px) heights." }
  ],
  states: ["Default", "Hover", "Focus", "Disabled", "Error"],
  codeSnippets: {
    html: `<div class="tl-form-group">
  <label class="tl-label" for="region-select">Deployment Region</label>
  <select id="region-select" class="tl-select">
    <option value="iad">US East (N. Virginia)</option>
    <option value="sfo">US West (Oregon)</option>
    <option value="fra">EU Central (Frankfurt)</option>
  </select>
</div>`,
    css: `.tl-select {
  height: var(--tl-comp-input-height);
  background-color: var(--tl-comp-input-bg);
  border: 1px solid var(--tl-comp-input-border);
}`
  },
  accessibility: {
    aria: [
      { attribute: "aria-describedby", description: "Associates input with helper text or error explanations." }
    ],
    keyboard: [
      { key: "ArrowDown / ArrowUp", description: "Cycles through list of available options." },
      { key: "Enter", description: "Selects the focused option." }
    ]
  },
  guidelines: {
    dos: [
      "Always pair with an explicit <label> element using matching 'for' and 'id' attributes."
    ],
    donts: [
      "Avoid selects with only 2 choices; use Radio Buttons or a Switch instead."
    ]
  },
  related: ["text-field", "radio", "switch"]
};
