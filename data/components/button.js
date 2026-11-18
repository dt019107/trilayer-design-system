/**
 * TRILAYER DESIGN SYSTEM — BUTTON COMPONENT SPECIFICATION
 */

export default {
  id: "button",
  title: "Button",
  status: "Stable",
  version: "1.0.0",
  description: "Buttons communicate actions that users can take. They are placed throughout your UI in dialogs, forms, cards, and toolbars.",
  
  layerInspectorChains: [
    {
      element: "Button Background (Primary)",
      componentToken: "--tl-comp-button-primary-bg",
      semanticToken: "--tl-sys-color-primary",
      primitiveTokenLight: "--tl-ref-indigo-500",
      primitiveTokenDark: "--tl-ref-indigo-400",
      valueLight: "#5B5BD6",
      valueDark: "#787FE3"
    },
    {
      element: "Button Text (On Primary)",
      componentToken: "--tl-comp-button-primary-text",
      semanticToken: "--tl-sys-color-on-primary",
      primitiveTokenLight: "--tl-ref-white",
      primitiveTokenDark: "--tl-ref-indigo-950",
      valueLight: "#FFFFFF",
      valueDark: "#161346"
    },
    {
      element: "Button Corner Radius",
      componentToken: "--tl-comp-button-radius",
      semanticToken: "--tl-sys-shape-control",
      primitiveTokenLight: "--tl-ref-radius-8",
      primitiveTokenDark: "--tl-ref-radius-8",
      valueLight: "8px",
      valueDark: "8px"
    },
    {
      element: "Button Height (Medium)",
      componentToken: "--tl-comp-button-height-md",
      semanticToken: "--tl-sys-density-control-height-md",
      primitiveTokenLight: "--tl-ref-space-40",
      primitiveTokenDark: "--tl-ref-space-40",
      valueLight: "40px",
      valueDark: "40px"
    }
  ],

  variants: [
    { name: "Primary", desc: "High emphasis, single primary action on screen." },
    { name: "Secondary (Tonal)", desc: "Medium emphasis for secondary pathways." },
    { name: "Tertiary (Teal)", desc: "Distinct accent representing the component layer." },
    { name: "Outline", desc: "Bordered container for cancel or navigation links." },
    { name: "Ghost (Text)", desc: "Lowest visual weight for inline or repetitive actions." },
    { name: "Destructive", desc: "High-emphasis red for permanent or dangerous actions." }
  ],

  states: ["Default", "Hover", "Focus-visible", "Active (Pressed)", "Disabled", "Loading"],

  codeSnippets: {
    html: `<!-- Primary Button -->
<button class="tl-btn tl-btn--primary tl-btn--md">Save Changes</button>

<!-- Secondary / Tonal Button -->
<button class="tl-btn tl-btn--secondary tl-btn--md">Save Draft</button>

<!-- Loading State -->
<button class="tl-btn tl-btn--primary tl-btn--md is-loading" disabled>Saving...</button>`,
    css: `.tl-btn--primary {
  background-color: var(--tl-comp-button-primary-bg);
  color: var(--tl-comp-button-primary-text);
  border-radius: var(--tl-comp-button-radius);
  height: var(--tl-comp-button-height-md);
  padding: 0 var(--tl-comp-button-padding-x-md);
}`
  },

  accessibility: {
    aria: [
      { attribute: "role='button'", description: "Implicit for native <button> elements." },
      { attribute: "aria-disabled='true'", description: "Conveys disabled state when maintaining keyboard tab order." },
      { attribute: "aria-busy='true'", description: "Announces asynchronous processing during loading state." }
    ],
    keyboard: [
      { key: "Tab", description: "Moves focus to the button with visible 2px offset ring." },
      { key: "Enter / Space", description: "Activates the button action." }
    ]
  },

  guidelines: {
    dos: [
      "Use exactly one primary button per screen to establish visual hierarchy.",
      "Pair primary actions with outline or secondary buttons for cancel/back actions."
    ],
    donts: [
      "Never place two high-emphasis primary buttons side-by-side.",
      "Do not use vague labels like 'OK'; prefer explicit action verbs like 'Save Changes' or 'Publish'."
    ]
  },

  related: ["icon-button", "chip", "dialog"]
};

