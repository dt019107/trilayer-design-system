/**
 * TRILAYER DESIGN SYSTEM — ACCORDION COMPONENT SPECIFICATION
 */

export default {
  id: "accordion",
  title: "Accordion",
  status: "Stable",
  version: "1.0.0",
  description: "Accordions stack vertically expandable panels, enabling progressive disclosure of dense content.",
  layerInspectorChains: [
    {
      element: "Accordion Border",
      componentToken: "--tl-comp-accordion-border",
      semanticToken: "--tl-sys-color-outline",
      primitiveTokenLight: "--tl-ref-slate-300",
      primitiveTokenDark: "--tl-ref-slate-700",
      valueLight: "#CBD5E1",
      valueDark: "#334155"
    },
    {
      element: "Accordion Hover Fill",
      componentToken: "--tl-comp-accordion-hover-bg",
      semanticToken: "--tl-sys-color-surface-container-low",
      primitiveTokenLight: "--tl-ref-slate-50",
      primitiveTokenDark: "--tl-ref-slate-900",
      valueLight: "#F8FAFC",
      valueDark: "#0F172A"
    }
  ],
  variants: [
    { name: "Single Expand", desc: "Only one item open at a time; expanding closes siblings." },
    { name: "Multi Expand", desc: "Allows several sections to remain open simultaneously." }
  ],
  states: ["Collapsed", "Expanded", "Hover", "Focus-Visible"],
  codeSnippets: {
    html: `<div class="tl-accordion">
  <div class="tl-accordion-item">
    <button class="tl-accordion-trigger" aria-expanded="true">
      <span>What is the 3-tier token architecture?</span>
      <span class="tl-accordion-icon">&darr;</span>
    </button>
    <div class="tl-accordion-body is-expanded">
      Primitives define raw palette steps; semantic tokens define roles; component tokens bind to elements.
    </div>
  </div>
</div>`,
    css: `.tl-accordion {
  border: 1px solid var(--tl-comp-accordion-border);
  border-radius: var(--tl-comp-card-radius);
}`
  },
  accessibility: {
    aria: [
      { attribute: "aria-expanded", description: "Communicates expansion state (true/false) to screen readers." },
      { attribute: "aria-controls", description: "Links the trigger button to the collapsible content ID." }
    ],
    keyboard: [
      { key: "Enter / Space", description: "Toggles open/closed state of the focused accordion header." }
    ]
  },
  guidelines: {
    dos: [
      "Use accordions to reduce visual cognitive load when users only need specific sections."
    ],
    donts: [
      "Do not hide critical primary actions or errors inside collapsed panels."
    ]
  },
  related: ["card", "dialog", "tabs"]
};
