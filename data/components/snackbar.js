/**
 * TRILAYER DESIGN SYSTEM — SNACKBAR & TOAST SPECIFICATION
 */

export default {
  id: "snackbar",
  title: "Snackbar & Toast",
  status: "Stable",
  version: "2.1.0",
  description: "Transient notifications providing contextual feedback, non-blocking status updates, and lightweight undo actions positioned at the viewport edge.",
  layerInspectorChains: [
    {
      element: "Toast Background",
      componentToken: "--tl-comp-toast-bg",
      semanticToken: "--tl-sys-color-surface-container-highest",
      primitiveTokenLight: "--tl-ref-gray-150",
      primitiveTokenDark: "--tl-ref-gray-150",
      valueLight: "#E9ECEF",
      valueDark: "#E9ECEF"
    },
    {
      element: "Toast Border Outline",
      componentToken: "--tl-comp-toast-border",
      semanticToken: "--tl-sys-color-outline",
      primitiveTokenLight: "--tl-ref-gray-400",
      primitiveTokenDark: "--tl-ref-gray-400",
      valueLight: "#ADB5BD",
      valueDark: "#ADB5BD"
    },
    {
      element: "Toast Elevation Shadow",
      componentToken: "--tl-comp-toast-shadow",
      semanticToken: "--tl-sys-elevation-3",
      primitiveTokenLight: "--tl-ref-elevation-3",
      primitiveTokenDark: "--tl-ref-elevation-3",
      valueLight: "0 6px 16px rgba(18,20,23,0.09)",
      valueDark: "0 6px 16px rgba(18,20,23,0.09)"
    },
    {
      element: "Action Button Text",
      componentToken: "--tl-comp-toast-action-color",
      semanticToken: "--tl-sys-color-primary",
      primitiveTokenLight: "--tl-ref-indigo-500",
      primitiveTokenDark: "--tl-ref-indigo-500",
      valueLight: "#5B5BD6",
      valueDark: "#5B5BD6"
    }
  ],
  variants: [
    { name: "Info Notification", desc: "Standard informative status update with polite screen-reader announcement." },
    { name: "Success Confirmation", desc: "Confirms that a background operation, synchronization, or save succeeded." },
    { name: "Warning with Action", desc: "Warns of non-blocking conditions with an optional contextual undo button." },
    { name: "Error Alert", desc: "Assertive alert for recoverable network or validation failures." }
  ],
  states: ["Entering", "Visible (Resting)", "Hover / Focused (Paused)", "Exiting"],
  codeSnippets: {
    html: `<div class="tl-toast tl-toast--info" role="status" aria-live="polite">
  <span class="tl-toast__icon">
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
  </span>
  <div class="tl-toast__content">
    <span class="tl-toast__title">Design tokens synced</span>
    <span class="tl-toast__message">Synchronized 146 design variables across themes.</span>
    <button type="button" class="tl-toast__action">View details</button>
  </div>
  <button type="button" class="tl-toast__close" aria-label="Dismiss notification">&times;</button>
  <div class="tl-toast__progress" aria-hidden="true"></div>
</div>`,
    css: `.tl-toast {
  background-color: var(--tl-comp-toast-bg);
  border: 1px solid var(--tl-comp-toast-border);
  border-left-width: 3px;
  border-radius: var(--tl-comp-toast-radius);
  box-shadow: var(--tl-comp-toast-shadow);
  color: var(--tl-comp-toast-text);
  font-family: var(--tl-sys-font-family-body);
  font-size: var(--tl-sys-typescale-body-small-size);
}`
  },
  accessibility: {
    aria: [
      { attribute: "role='status' & aria-live='polite'", description: "Used on info, success, and neutral notifications so ongoing narration is not interrupted." },
      { attribute: "role='alert' & aria-live='assertive'", description: "Used on error and warning notifications to immediately inform the user of recoverable issues." },
      { attribute: "aria-label='Dismiss notification'", description: "Explicit accessible name provided on the close trigger." }
    ],
    keyboard: [
      { key: "Escape", description: "Dismisses currently focused toast notification." },
      { key: "Tab", description: "Moves focus to the toast action button, then to the close trigger." },
      { key: "Hover / Focus", description: "Automatically pauses the auto-dismiss countdown timer to prevent missed content." }
    ]
  },
  guidelines: {
    dos: [
      "Keep message concise, ideally 1-2 lines.",
      "Provide an actionable label when undo is possible ('Undo', 'Retry').",
      "Allow at least 4000ms duration and pause timer on hover and focus."
    ],
    donts: [
      "Never present permanent or destructive critical errors solely in auto-dismissing toasts; use Callouts or Dialogs instead.",
      "Never stack more than 3-4 simultaneous toasts in the viewport."
    ]
  },
  related: ["callout", "tooltip", "dialog"]
};
