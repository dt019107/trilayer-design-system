/**
 * TRILAYER DESIGN SYSTEM — PROGRESS COMPONENT SPECIFICATION
 */

export default {
  id: "progress",
  title: "Progress",
  status: "Stable",
  version: "1.0.0",
  description: "Progress indicators display the completion status of task sequences, uploads, or ongoing processes.",
  layerInspectorChains: [
    {
      element: "Progress Indicator Fill",
      componentToken: "--tl-comp-button-primary-bg",
      semanticToken: "--tl-sys-color-primary",
      primitiveTokenLight: "--tl-ref-indigo-500",
      primitiveTokenDark: "--tl-ref-indigo-400",
      valueLight: "#5B5BD6",
      valueDark: "#818CF8"
    },
    {
      element: "Progress Track Fill",
      componentToken: "--tl-comp-spinner-track",
      semanticToken: "--tl-sys-color-surface-container-highest",
      primitiveTokenLight: "--tl-ref-slate-200",
      primitiveTokenDark: "--tl-ref-slate-700",
      valueLight: "#E2E8F0",
      valueDark: "#334155"
    }
  ],
  variants: [
    { name: "Determinate Bar", desc: "Shows specific percentage of progress (0% to 100%)." },
    { name: "Indeterminate", desc: "Continuous cycling animation when duration is unknown." }
  ],
  states: ["Determinate (65%)", "Indeterminate", "Completed (100%)"],
  codeSnippets: {
    html: `<div style="width: 100%; background: var(--tl-comp-spinner-track); border-radius: 9999px; height: 8px; overflow: hidden;" role="progressbar" aria-valuenow="65" aria-valuemin="0" aria-valuemax="100">
  <div style="background: var(--tl-sys-color-primary); height: 100%; width: 65%;"></div>
</div>`,
    css: `.tl-progress-bar {
  background-color: var(--tl-comp-spinner-track);
  border-radius: var(--tl-sys-shape-full);
}`
  },
  accessibility: {
    aria: [
      { attribute: "role='progressbar'", description: "Identifies element as progress indicator to screen readers." },
      { attribute: "aria-valuenow", description: "Current percentage or value." }
    ],
    keyboard: []
  },
  guidelines: {
    dos: [
      "Use determinate progress bars whenever the task length or file size can be calculated."
    ],
    donts: [
      "Avoid stalling progress bars at 99% without descriptive status text."
    ]
  },
  related: ["spinner", "skeleton", "badge"]
};
