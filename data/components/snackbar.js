/**
 * TRILAYER DESIGN SYSTEM — SNACKBAR COMPONENT SPECIFICATION
 */

export default {
  id: "snackbar",
  title: "Snackbar",
  status: "Stable",
  version: "1.0.0",
  description: "Snackbars and toasts deliver brief, transient feedback notifications positioned at the edge of the viewport.",
  layerInspectorChains: [
    {
      element: "Snackbar Background",
      componentToken: "--tl-comp-toast-bg",
      semanticToken: "--tl-sys-color-surface-container-highest",
      primitiveTokenLight: "--tl-ref-slate-900",
      primitiveTokenDark: "--tl-ref-slate-800",
      valueLight: "#0F172A",
      valueDark: "#1E293B"
    },
    {
      element: "Snackbar Elevation Shadow",
      componentToken: "--tl-comp-toast-shadow",
      semanticToken: "--tl-sys-elevation-3",
      primitiveTokenLight: "--tl-ref-elevation-3",
      primitiveTokenDark: "--tl-ref-elevation-3",
      valueLight: "0 10px 24px -4px rgba(0,0,0,0.4)",
      valueDark: "0 10px 24px -4px rgba(0,0,0,0.5)"
    }
  ],
  variants: [
    { name: "Message Only", desc: "Brief status message confirming a completed background operation." },
    { name: "Message + Action", desc: "Includes an actionable undo or retry button." }
  ],
  states: ["Info", "Success", "Warning", "Error"],
  codeSnippets: {
    html: `<div class="tl-toast tl-toast--info">
  <span>Design tokens synchronized successfully.</span>
  <button class="tl-toast__close" aria-label="Dismiss">&times;</button>
</div>`,
    css: `.tl-toast {
  background-color: var(--tl-comp-toast-bg);
  color: var(--tl-comp-toast-text);
  border-radius: var(--tl-comp-toast-radius);
}`
  },
  accessibility: {
    aria: [
      { attribute: "role='status'", description: "Non-interruptive alert announced at the next conversational pause." },
      { attribute: "aria-live='polite'", description: "Ensures screen reader does not cut off ongoing narration." }
    ],
    keyboard: [
      { key: "Escape", description: "Dismisses active snackbar." }
    ]
  },
  guidelines: {
    dos: [
      "Keep message under 2 lines of text.",
      "Allow at least 4-6 seconds before auto-dismissing, or pause on hover."
    ],
    donts: [
      "Never present permanent critical errors in auto-dismissing toasts; use Callouts instead."
    ]
  },
  related: ["callout", "tooltip", "dialog"]
};
