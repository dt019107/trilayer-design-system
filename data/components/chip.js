/**
 * TRILAYER DESIGN SYSTEM — CHIP COMPONENT SPECIFICATION
 */

export default {
  id: "chip",
  title: "Chip",
  status: "Stable",
  version: "1.0.0",
  description: "Chips allow users to filter content, trigger contextual actions, or make selections in a compact layout.",
  layerInspectorChains: [
    {
      element: "Active Chip Background",
      componentToken: "--tl-comp-chip-active-bg",
      semanticToken: "--tl-sys-color-primary-container",
      primitiveTokenLight: "--tl-ref-indigo-50",
      primitiveTokenDark: "--tl-ref-indigo-900",
      valueLight: "#EFF0FC",
      valueDark: "#262272"
    }
  ],
  variants: [
    { name: "Filter Chip", desc: "Selectable pill that narrows down data sets." },
    { name: "Input / Removable Chip", desc: "Represents an added entity with a dismissal button." }
  ],
  states: ["Default", "Hover", "Selected / Active", "Disabled"],
  codeSnippets: {
    html: `<button class="tl-chip is-active" aria-pressed="true">
  Primitives
</button>

<div class="tl-chip">
  <span>Design Token</span>
  <span class="tl-chip__close" aria-label="Remove">&times;</span>
</div>`,
    css: `.tl-chip.is-active {
  background-color: var(--tl-comp-chip-active-bg);
  color: var(--tl-comp-chip-active-text);
  border-color: var(--tl-comp-chip-active-border);
}`
  },
  accessibility: {
    aria: [{ attribute: "aria-pressed='true/false'", description: "Conveys toggle selection state on filter chips." }],
    keyboard: [{ key: "Space / Enter", description: "Selects or activates the chip." }]
  },
  guidelines: {
    dos: ["Use filter chips in horizontal scrollable or wrapped lists to refine search results."],
    donts: ["Do not use chips for primary page calls-to-action; use Buttons instead."]
  },
  related: ["badge", "button"]
};

