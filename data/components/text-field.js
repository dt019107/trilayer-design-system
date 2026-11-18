/**
 * TRILAYER DESIGN SYSTEM — TEXT FIELD COMPONENT SPECIFICATION
 */

export default {
  id: "text-field",
  title: "Text Field",
  status: "Stable",
  version: "1.0.0",
  description: "Text fields allow users to enter and edit text, passwords, numbers, and dates within forms and search surfaces.",
  
  layerInspectorChains: [
    {
      element: "Input Background",
      componentToken: "--tl-comp-input-bg",
      semanticToken: "--tl-sys-color-surface-container-lowest",
      primitiveTokenLight: "--tl-ref-white",
      primitiveTokenDark: "--tl-ref-gray-1000",
      valueLight: "#FFFFFF",
      valueDark: "#050607"
    },
    {
      element: "Input Border (Default)",
      componentToken: "--tl-comp-input-border",
      semanticToken: "--tl-sys-color-outline",
      primitiveTokenLight: "--tl-ref-gray-300",
      primitiveTokenDark: "--tl-ref-gray-700",
      valueLight: "#CED4DA",
      valueDark: "#343A40"
    },
    {
      element: "Input Border (Focus)",
      componentToken: "--tl-comp-input-border-focus",
      semanticToken: "--tl-sys-color-primary",
      primitiveTokenLight: "--tl-ref-indigo-500",
      primitiveTokenDark: "--tl-ref-indigo-400",
      valueLight: "#5B5BD6",
      valueDark: "#787FE3"
    },
    {
      element: "Input Border (Error)",
      componentToken: "--tl-comp-input-error-border",
      semanticToken: "--tl-sys-color-error",
      primitiveTokenLight: "--tl-ref-rose-600",
      primitiveTokenDark: "--tl-ref-rose-400",
      valueLight: "#E11D48",
      valueDark: "#FB7185"
    }
  ],

  variants: [
    { name: "Single-line Input", desc: "Default text entry field for emails, names, and short strings." },
    { name: "Multiline Textarea", desc: "Expandable text block for comments, notes, and descriptions." },
    { name: "Required Field", desc: "Indicates mandatory input with persistent visual marker." },
    { name: "Validation Error", desc: "High-contrast error border with descriptive helper message." }
  ],

  states: ["Default", "Hover", "Focus (3px ring)", "Disabled", "Error"],

  codeSnippets: {
    html: `<div class="tl-form-group">
  <label class="tl-label" for="username">
    Organization Domain <span class="tl-label-required" aria-hidden="true">*</span>
  </label>
  <input type="text" id="username" class="tl-input" placeholder="acme-corp" aria-required="true" aria-describedby="username-helper">
  <span id="username-helper" class="tl-helper-text">Your vanity subdomain URL.</span>
</div>`,
    css: `.tl-input {
  background-color: var(--tl-comp-input-bg);
  border: 1px solid var(--tl-comp-input-border);
  border-radius: var(--tl-comp-input-radius);
  height: var(--tl-comp-input-height);
  padding: 0 var(--tl-comp-input-padding-x);
}`
  },

  accessibility: {
    aria: [
      { attribute: "aria-required='true'", description: "Communicates required validation to screen readers." },
      { attribute: "aria-invalid='true'", description: "Flags field as failing validation." },
      { attribute: "aria-describedby", description: "Links the field ID to helper or error message ID." }
    ],
    keyboard: [
      { key: "Tab", description: "Focuses the input field and displays visible focus ring." }
    ]
  },

  guidelines: {
    dos: [
      "Always position persistent labels directly above inputs with supporting instructions.",
      "Include explicit error messages that explain how to resolve invalid input."
    ],
    donts: [
      "Never substitute labels with placeholder text; placeholders disappear once typed into."
    ]
  },

  related: ["checkbox", "radio", "select"]
};

