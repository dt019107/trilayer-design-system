/**
 * TRILAYER DESIGN SYSTEM — SKELETON COMPONENT SPECIFICATION
 */

export default {
  id: "skeleton",
  title: "Skeleton",
  status: "Stable",
  version: "1.0.0",
  description: "Skeletons display low-fidelity placeholder wireframes while content loads, reducing perceived wait time.",
  layerInspectorChains: [
    {
      element: "Skeleton Base Surface",
      componentToken: "--tl-comp-skeleton-bg",
      semanticToken: "--tl-sys-color-surface-container",
      primitiveTokenLight: "--tl-ref-slate-200",
      primitiveTokenDark: "--tl-ref-slate-800",
      valueLight: "#E2E8F0",
      valueDark: "#1E293B"
    },
    {
      element: "Skeleton Shimmer Pulse",
      componentToken: "--tl-comp-skeleton-highlight",
      semanticToken: "--tl-sys-color-surface-container-highest",
      primitiveTokenLight: "--tl-ref-slate-100",
      primitiveTokenDark: "--tl-ref-slate-700",
      valueLight: "#F1F5F9",
      valueDark: "#334155"
    }
  ],
  variants: [
    { name: "Text Line", desc: "Simulates body typography with rounded horizontal bars." },
    { name: "Headline / Title", desc: "Thicker heading line with variable width (e.g. 60%)." },
    { name: "Avatar Circle", desc: "Circular skeleton for user and entity avatars." },
    { name: "Card Placeholder", desc: "Full container skeleton for images and media cards." }
  ],
  states: ["Shimmering Pulse", "Static Wireframe"],
  codeSnippets: {
    html: `<div class="tl-skeleton tl-skeleton--title"></div>
<div class="tl-skeleton tl-skeleton--text"></div>
<div class="tl-skeleton tl-skeleton--text" style="width: 80%;"></div>`,
    css: `.tl-skeleton {
  background-color: var(--tl-comp-skeleton-bg);
  border-radius: var(--tl-comp-skeleton-radius);
}`
  },
  accessibility: {
    aria: [
      { attribute: "aria-busy='true'", description: "Notifies assistive tech that content within container is loading." },
      { attribute: "aria-live='polite'", description: "Ensures screen readers announce real content once rendered." }
    ],
    keyboard: []
  },
  guidelines: {
    dos: [
      "Match the skeleton dimensions closely to the rendered content to prevent cumulative layout shift (CLS).",
      "Respect user prefers-reduced-motion settings."
    ],
    donts: [
      "Avoid using bright flashing animations for skeletons."
    ]
  },
  related: ["card", "spinner", "badge"]
};
