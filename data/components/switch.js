/**
 * TRILAYER DESIGN SYSTEM — SWITCH COMPONENT SPECIFICATION
 */

export default {
  id: "switch",
  title: "Switch",
  status: "Stable",
  version: "1.0.0",
  description: "Switches toggle the state of a single setting on or off immediately without requiring a save confirmation.",
  layerInspectorChains: [
    {
      element: "Active Switch Track",
      componentToken: "--tl-comp-control-track-active-bg",
      semanticToken: "--tl-sys-color-primary",
      primitiveTokenLight: "--tl-ref-indigo-500",
      primitiveTokenDark: "--tl-ref-indigo-400",
      valueLight: "#5B5BD6",
      valueDark: "#787FE3"
    },
    {
      element: "Switch Sliding Thumb",
      componentToken: "--tl-comp-control-thumb-bg",
      semanticToken: "--tl-sys-color-surface",
      primitiveTokenLight: "--tl-ref-white",
      primitiveTokenDark: "--tl-ref-gray-950",
      valueLight: "#FFFFFF",
      valueDark: "#0A0C0E"
    }
  ],
  variants: [{ name: "Binary Setting Switch", desc: "Instantaneous preference toggle." }],
  states: ["Off", "On", "Disabled"],
  codeSnippets: {
    html: `<label class="tl-switch-label">
  <input type="checkbox" class="tl-switch-input" checked>
  <span>Strict Token Linting</span>
</label>`,
    css: `.tl-switch-input:checked {
  background-color: var(--tl-comp-control-track-active-bg);
  border-color: var(--tl-comp-control-track-active-bg);
}`
  },
  accessibility: {
    aria: [{ attribute: "role='switch'", description: "Communicates on/off state clearly to screen readers." }],
    keyboard: [{ key: "Space / Enter", description: "Toggles between on and off states." }]
  },
  guidelines: {
    dos: ["Use switches for binary decisions that take effect immediately."],
    donts: ["Do not use switches if user must submit a form to save changes; use Checkboxes instead."]
  },
  related: ["checkbox", "radio"]
};

