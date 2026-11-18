/**
 * TRILAYER DESIGN SYSTEM — CHECKBOX COMPONENT SPECIFICATION
 */

export default {
  id: "checkbox",
  title: "Checkbox",
  status: "Stable",
  version: "1.0.0",
  description: "Checkboxes allow users to select one or more items from a set, or toggle between checked, unchecked, or indeterminate states.",
  layerInspectorChains: [
    {
      element: "Active Checkbox Track",
      componentToken: "--tl-comp-control-track-active-bg",
      semanticToken: "--tl-sys-color-primary",
      primitiveTokenLight: "--tl-ref-indigo-500",
      primitiveTokenDark: "--tl-ref-indigo-400",
      valueLight: "#5B5BD6",
      valueDark: "#787FE3"
    },
    {
      element: "Checkbox Border",
      componentToken: "--tl-comp-control-border",
      semanticToken: "--tl-sys-color-outline",
      primitiveTokenLight: "--tl-ref-gray-300",
      primitiveTokenDark: "--tl-ref-gray-700",
      valueLight: "#CED4DA",
      valueDark: "#343A40"
    }
  ],
  variants: [{ name: "Standard Checkbox", desc: "Binary toggle for multi-select options." }],
  states: ["Unchecked", "Checked", "Indeterminate", "Disabled"],
  codeSnippets: {
    html: `<label class="tl-checkbox-label">
  <input type="checkbox" class="tl-checkbox-input" checked>
  <span>I agree to Trilayer Terms</span>
</label>`,
    css: `.tl-checkbox-input:checked {
  background-color: var(--tl-comp-control-track-active-bg);
  border-color: var(--tl-comp-control-track-active-bg);
}`
  },
  accessibility: {
    aria: [{ attribute: "aria-checked='mixed'", description: "Communicates indeterminate state to screen readers." }],
    keyboard: [{ key: "Space", description: "Toggles checked state." }]
  },
  guidelines: {
    dos: ["Use checkboxes when users can choose any number of options including none or all."],
    donts: ["Do not use checkboxes if only one mutual option can be selected; use Radios instead."]
  },
  related: ["radio", "switch", "text-field"]
};

