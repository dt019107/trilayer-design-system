/**
 * TRILAYER DESIGN SYSTEM — CARD COMPONENT SPECIFICATION
 */

export default {
  id: "card",
  title: "Card",
  status: "Stable",
  version: "1.0.0",
  description: "Cards contain content and actions about a single subject, establishing clear visual containment on surfaces.",
  layerInspectorChains: [
    {
      element: "Card Background Surface",
      componentToken: "--tl-comp-card-bg",
      semanticToken: "--tl-sys-color-surface",
      primitiveTokenLight: "--tl-ref-white",
      primitiveTokenDark: "--tl-ref-gray-950",
      valueLight: "#FFFFFF",
      valueDark: "#0A0C0E"
    },
    {
      element: "Card Border",
      componentToken: "--tl-comp-card-border",
      semanticToken: "--tl-sys-color-outline-variant",
      primitiveTokenLight: "--tl-ref-gray-200",
      primitiveTokenDark: "--tl-ref-gray-800",
      valueLight: "#DEE2E6",
      valueDark: "#212529"
    },
    {
      element: "Card Corner Radius",
      componentToken: "--tl-comp-card-radius",
      semanticToken: "--tl-sys-shape-container",
      primitiveTokenLight: "--tl-ref-radius-12",
      primitiveTokenDark: "--tl-ref-radius-12",
      valueLight: "12px",
      valueDark: "12px"
    }
  ],
  variants: [
    { name: "Miro Feature Card (28px)", desc: "Soft 28px corner card with subtle elevation and generous 32px padding." },
    { name: "Miro Canary Yellow Card", desc: "Signature brand yellow card (#ffd02f) for feature hero moments." },
    { name: "Miro Coral Sticky Card", desc: "Pastel coral sticky note card (#ffc6c6) with #600000 ink." },
    { name: "Miro Teal Sticky Card", desc: "Pastel teal sticky note card (#c3faf5) with #187574 moss text." },
    { name: "Miro Rose Sticky Card", desc: "Pastel rose sticky note card (#fde0f0) for moodboards and ideas." },
    { name: "Elevated Card", desc: "Default resting surface with subtle ambient shadow." },
    { name: "Outlined Card", desc: "Flat boundary for dense dashboard grids." },
    { name: "Interactive Card", desc: "Clickable surface with hover elevation lift." }
  ],
  states: ["Default", "Hover", "Focus-visible", "Pressed"],
  codeSnippets: {
    html: `<div class="tl-card">
  <div class="tl-card-header">
    <h3 class="tl-card-title">Security Key</h3>
    <span class="tl-badge tl-badge--brand">Active</span>
  </div>
  <div class="tl-card-body">Manage FIDO2 hardware authentication.</div>
  <div class="tl-card-footer">
    <button class="tl-btn tl-btn--outline tl-btn--sm">Settings</button>
  </div>
</div>`,
    css: `.tl-card {
  background-color: var(--tl-comp-card-bg);
  border: 1px solid var(--tl-comp-card-border);
  border-radius: var(--tl-comp-card-radius);
  padding: var(--tl-comp-card-padding);
}`
  },
  accessibility: {
    aria: [{ attribute: "role='region' or article", description: "Designates independent card content chunk." }],
    keyboard: [{ key: "Tab", description: "Tabs through actionable elements in footer." }]
  },
  guidelines: {
    dos: ["Group a single discrete subject per card."],
    donts: ["Never nest clickable interactive cards inside other clickable parent cards."]
  },
  related: ["dialog", "badge", "button"]
};

