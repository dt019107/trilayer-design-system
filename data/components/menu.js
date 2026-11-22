/**
 * TRILAYER DESIGN SYSTEM — MENU COMPONENT SPECIFICATION
 */

export default {
  id: "menu",
  title: "Menu",
  status: "Stable",
  version: "1.0.0",
  description: "Menus display a list of choices or actions on temporary floating surfaces triggered by buttons or user interactions.",
  layerInspectorChains: [
    {
      element: "Menu Surface Fill",
      componentToken: "--tl-comp-card-bg",
      semanticToken: "--tl-sys-color-surface-container-high",
      primitiveTokenLight: "--tl-ref-white",
      primitiveTokenDark: "--tl-ref-slate-800",
      valueLight: "#FFFFFF",
      valueDark: "#1E293B"
    },
    {
      element: "Menu Shadow Elevation",
      componentToken: "--tl-comp-dialog-shadow",
      semanticToken: "--tl-sys-elevation-3",
      primitiveTokenLight: "--tl-ref-elevation-3",
      primitiveTokenDark: "--tl-ref-elevation-3",
      valueLight: "0 10px 24px -4px rgba(0,0,0,0.4)",
      valueDark: "0 10px 24px -4px rgba(0,0,0,0.5)"
    }
  ],
  variants: [
    { name: "Action Menu", desc: "List of executable tasks (Copy, Rename, Delete)." },
    { name: "Navigation Menu", desc: "List of links to jump between pages and contexts." }
  ],
  states: ["Open (Visible)", "Closed (Hidden)", "Item Hover", "Item Focused", "Disabled Item"],
  codeSnippets: {
    html: `<div class="tl-card" style="width: 220px; padding: 6px; box-shadow: var(--tl-comp-dialog-shadow);">
  <button class="tl-btn tl-btn--ghost tl-btn--sm" style="width: 100%; justify-content: flex-start;">Rename</button>
  <button class="tl-btn tl-btn--ghost tl-btn--sm" style="width: 100%; justify-content: flex-start;">Duplicate</button>
  <hr class="tl-divider" style="margin: 4px 0;">
  <button class="tl-btn tl-btn--danger tl-btn--sm" style="width: 100%; justify-content: flex-start;">Delete</button>
</div>`,
    css: `.tl-menu {
  background-color: var(--tl-sys-color-surface-container-high);
  border: 1px solid var(--tl-sys-color-outline);
}`
  },
  accessibility: {
    aria: [
      { attribute: "role='menu'", description: "Specifies a container of interactive menu items." },
      { attribute: "role='menuitem'", description: "Designates individual options." }
    ],
    keyboard: [
      { key: "ArrowDown / ArrowUp", description: "Moves focus between menu items." },
      { key: "Escape", description: "Closes menu and returns focus to the trigger button." }
    ]
  },
  guidelines: {
    dos: [
      "Group destructive actions separately at the bottom with a divider.",
      "Close menu automatically when an item is selected or user clicks outside."
    ],
    donts: [
      "Never put primary forms or multi-step wizards inside a menu popup."
    ]
  },
  related: ["button", "dialog", "select"]
};
