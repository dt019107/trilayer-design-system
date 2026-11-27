/**
 * TRILAYER DESIGN SYSTEM — DIALOG COMPONENT SPECIFICATION
 */

export default {
  id: "dialog",
  title: "Dialog",
  status: "Stable",
  version: "1.0.0",
  description: "Modal dialogs inform users about a task and can contain critical confirmations, require decisions, or display focused content on an overlay surface.",
  
  layerInspectorChains: [
    {
      element: "Dialog Surface",
      componentToken: "--tl-comp-dialog-surface-bg",
      semanticToken: "--tl-sys-color-surface",
      primitiveTokenLight: "--tl-ref-white",
      primitiveTokenDark: "--tl-ref-gray-950",
      valueLight: "#FFFFFF",
      valueDark: "#0A0C0E"
    },
    {
      element: "Dialog Overlay Scrim",
      componentToken: "--tl-comp-dialog-scrim-bg",
      semanticToken: "--tl-sys-color-scrim",
      primitiveTokenLight: "--tl-ref-black",
      primitiveTokenDark: "--tl-ref-black",
      valueLight: "#000000 (48% opacity)",
      valueDark: "#000000 (72% opacity)"
    },
    {
      element: "Dialog Radius",
      componentToken: "--tl-comp-dialog-radius",
      semanticToken: "--tl-sys-shape-overlay",
      primitiveTokenLight: "--tl-ref-radius-16",
      primitiveTokenDark: "--tl-ref-radius-16",
      valueLight: "16px",
      valueDark: "16px"
    },
    {
      element: "Dialog Elevation",
      componentToken: "--tl-comp-dialog-shadow",
      semanticToken: "--tl-sys-elevation-4",
      primitiveTokenLight: "--tl-ref-elevation-4",
      primitiveTokenDark: "--tl-ref-elevation-4",
      valueLight: "0 12px 28px -4px rgba(18,20,23,0.12)",
      valueDark: "0 12px 28px -4px rgba(18,20,23,0.12)"
    }
  ],

  variants: [
    { name: "Confirmation Dialog", desc: "Requires user decision to proceed with high-stakes action." },
    { name: "Alert Dialog", desc: "Communicates urgent system conditions or irreversible operations." }
  ],

  states: ["Closed", "Opening (Enter)", "Open (Focus Trapped)", "Closing (Exit)"],

  codeSnippets: {
    html: `<div class="tl-dialog-overlay" role="dialog" aria-modal="true" aria-labelledby="modal-title">
  <div class="tl-dialog">
    <div class="tl-dialog-header">
      <h3 class="tl-dialog-title" id="modal-title">Revoke API Token?</h3>
      <button class="tl-btn-icon tl-btn-icon--sm" data-dialog-close aria-label="Close">
        &times;
      </button>
    </div>
    <div class="tl-dialog-body">
      Are you sure you want to deactivate production keys?
    </div>
    <div class="tl-dialog-footer">
      <button class="tl-btn tl-btn--outline tl-btn--sm" data-dialog-close>Cancel</button>
      <button class="tl-btn tl-btn--danger tl-btn--sm">Revoke Key</button>
    </div>
  </div>
</div>`,
    css: `.tl-dialog {
  background-color: var(--tl-comp-dialog-surface-bg);
  border-radius: var(--tl-comp-dialog-radius);
  box-shadow: var(--tl-comp-dialog-shadow);
  padding: var(--tl-comp-dialog-padding);
}`
  },

  accessibility: {
    aria: [
      { attribute: "role='dialog'", description: "Identifies the container as a modal dialog." },
      { attribute: "aria-modal='true'", description: "Tells assistive technology to ignore background content." },
      { attribute: "aria-labelledby='id'", description: "Links the dialog title to dialog accessibility tree." }
    ],
    keyboard: [
      { key: "Tab / Shift+Tab", description: "Traps focus inside modal elements only." },
      { key: "Escape", description: "Dismisses the dialog and restores trigger focus." }
    ]
  },

  guidelines: {
    dos: [
      "Keep dialog actions focused on exactly two choices: cancel pathway and confirming action.",
      "Always provide clear affirmative button text (e.g. 'Delete Repository' instead of 'Yes')."
    ],
    donts: [
      "Never nest dialogs within dialogs.",
      "Do not use dialogs for non-essential information that can be rendered inline."
    ]
  },

  related: ["button", "card", "tooltip"]
};

