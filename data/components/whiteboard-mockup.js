/**
 * TRILAYER DESIGN SYSTEM — WHITEBOARD MOCKUP COMPONENT SPECIFICATION
 * Miro Collaborative Visual Workspace Frame.
 */

export default {
  id: "whiteboard-mockup",
  title: "Whiteboard Mockup",
  status: "Stable",
  version: "1.0.0",
  description: "Collaborative canvas frame illustrating visual workspace nodes: pastel sticky notes, multiplayer cursor pointers, connector lines, and top toolbars.",
  
  layerInspectorChains: [
    {
      element: "Whiteboard Canvas Elevation",
      componentToken: "--tl-comp-whiteboard-shadow",
      semanticToken: "--tl-sys-elevation-whiteboard",
      primitiveTokenLight: "--tl-ref-elevation-whiteboard",
      primitiveTokenDark: "--tl-ref-elevation-whiteboard",
      valueLight: "0px 12px 32px -4px rgba(5,0,56,0.08)",
      valueDark: "0px 12px 32px -4px rgba(5,0,56,0.08)"
    },
    {
      element: "Sticky Note Canary Yellow Fill",
      componentToken: "--tl-comp-card-feature-yellow-bg",
      semanticToken: "--tl-sys-color-miro-yellow",
      primitiveTokenLight: "--tl-ref-miro-yellow",
      primitiveTokenDark: "--tl-ref-miro-yellow",
      valueLight: "#FFD02F",
      valueDark: "#FFD02F"
    },
    {
      element: "Sticky Note Coral Pastel Fill",
      componentToken: "--tl-comp-card-feature-coral-bg",
      semanticToken: "--tl-sys-color-miro-coral-light",
      primitiveTokenLight: "--tl-ref-miro-coral-light",
      primitiveTokenDark: "--tl-ref-miro-coral-light",
      valueLight: "#FFC6C6",
      valueDark: "#FFC6C6"
    },
    {
      element: "Canvas Corner Radius",
      componentToken: "--tl-comp-card-feature-radius",
      semanticToken: "--tl-sys-shape-xxxl",
      primitiveTokenLight: "--tl-ref-radius-28",
      primitiveTokenDark: "--tl-ref-radius-28",
      valueLight: "28px",
      valueDark: "28px"
    }
  ],

  variants: [
    { name: "Live Multiplayer Canvas", desc: "Interactive whiteboard canvas with live user cursors, pastel sticky notes, and connector links." },
    { name: "Sticky Note Wall", desc: "Grid-based retrospective sticky board in yellow, coral, teal, and rose pastel tints." },
    { name: "Flowchart & Smart Diagram", desc: "Connected architecture graph showing real-time collaborative state." }
  ],

  states: ["Default", "Node-Selected", "Connecting", "Dragging", "Multiplayer-Active"],

  codeSnippets: {
    html: `<!-- Miro Whiteboard Mockup Specimen -->
<div class="tl-whiteboard-canvas">
  <div class="tl-whiteboard-toolbar">
    <button class="tl-whiteboard-tool is-active" aria-label="Select tool">↖</button>
    <button class="tl-whiteboard-tool" aria-label="Sticky note tool">📝</button>
    <button class="tl-whiteboard-tool" aria-label="Connector line tool">➔</button>
    <button class="tl-whiteboard-tool" aria-label="Shape tool">▢</button>
  </div>

  <!-- Pastel Sticky Notes -->
  <div class="tl-sticky-note tl-sticky-note--yellow">
    <p>⚡ Phase 1: Token Engine Complete</p>
    <span class="tl-sticky-author">Deepak T.</span>
  </div>
</div>`,
    css: `.tl-whiteboard-canvas {
  background-color: var(--tl-sys-color-miro-canvas);
  border: 1px solid var(--tl-sys-color-miro-hairline);
  border-radius: var(--tl-comp-card-feature-radius);
  box-shadow: var(--tl-comp-whiteboard-shadow);
  position: relative;
  overflow: hidden;
}`
  },

  accessibility: {
    aria: [
      { attribute: "role='region'", description: "Defines the whiteboard mockup as a milestone workspace region." },
      { attribute: "aria-label='Interactive Whiteboard Canvas'", description: "Gives clear landmark purpose for assistive screen readers." }
    ],
    keyboard: [
      { key: "Tab", description: "Cycles through active whiteboard sticky notes and action controls." },
      { key: "Arrow keys", description: "Pans and focuses through canvas nodes." }
    ]
  },

  guidelines: {
    dos: [
      "Use pastel card tints (yellow, coral, teal, rose) with high-contrast text for whiteboard representations.",
      "Include authentic multiplayer cursor tags to convey the live collaboration feeling."
    ],
    donts: [
      "Never place low-contrast white text on canary yellow (#FFD02F) or coral (#FFC6C6) cards.",
      "Avoid rigid rectangular grids; stagger sticky nodes slightly for organic workspace realism."
    ]
  },

  related: ["card", "button", "chip"]
};
