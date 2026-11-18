/**
 * TRILAYER DESIGN SYSTEM — RADIO BUTTON COMPONENT SPECIFICATION
 */

export default {
  id: "radio",
  title: "Radio Button",
  status: "Stable",
  version: "1.0.0",
  description: "Radio buttons allow users to select exactly one option from a set of mutually exclusive choices.",
  layerInspectorChains: [
    {
      element: "Selected Radio Dot",
      componentToken: "--tl-comp-control-track-active-bg",
      semanticToken: "--tl-sys-color-primary",
      primitiveTokenLight: "--tl-ref-indigo-500",
      primitiveTokenDark: "--tl-ref-indigo-400",
      valueLight: "#5B5BD6",
      valueDark: "#787FE3"
    }
  ],
  variants: [{ name: "Radio Option", desc: "Mutually exclusive single-choice option." }],
  states: ["Unselected", "Selected", "Disabled"],
  codeSnippets: {
    html: `<label class="tl-radio-label">
  <input type="radio" name="plan" class="tl-radio-input" checked>
  <span>Production Plan</span>
</label>`,
    css: `.tl-radio-input:checked {
  border-color: var(--tl-comp-control-track-active-bg);
}`
  },
  accessibility: {
    aria: [{ attribute: "role='radiogroup'", description: "Wraps group of related radios." }],
    keyboard: [{ key: "Arrow keys", description: "Navigates and selects among radio options in group." }]
  },
  guidelines: {
    dos: ["Group at least two radio buttons together; never have an isolated single radio."],
    donts: ["Do not use radios when more than 5 options exist; use a Select dropdown instead."]
  },
  related: ["checkbox", "switch", "select"]
};

