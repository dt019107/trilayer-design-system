/**
 * TRILAYER DESIGN SYSTEM — SITE NAVIGATION DATA
 * Master information architecture module for hash router and adaptive navigation.
 */

export const navigation = [
  {
    title: "Get started",
    path: "/get-started",
    children: [
      { title: "For designers", path: "/get-started/designers" },
      { title: "For developers", path: "/get-started/developers" },
      { title: "Installation", path: "/get-started/installation" }
    ]
  },
  {
    title: "Foundations",
    path: "/foundations",
    children: [
      { title: "Color", path: "/foundations/color" },
      { title: "Typography", path: "/foundations/typography" },
      { title: "Spacing & layout", path: "/foundations/spacing" },
      { title: "Shape", path: "/foundations/shape" },
      { title: "Elevation", path: "/foundations/elevation" },
      { title: "Motion", path: "/foundations/motion" },
      { title: "Iconography", path: "/foundations/iconography" },
      { title: "Accessibility", path: "/foundations/accessibility" }
    ]
  },
  {
    title: "Tokens",
    path: "/tokens",
    children: [
      { title: "The three layers", path: "/tokens/layers" },
      { title: "Reference", path: "/tokens/reference" },
      { title: "Theming", path: "/tokens/theming" },
      { title: "Naming", path: "/tokens/naming" }
    ]
  },
  {
    title: "Components",
    path: "/components",
    children: [
      { title: "Overview", path: "/components" },
      { title: "Button", path: "/components/button", status: "Stable" },
      { title: "Icon Button", path: "/components/icon-button", status: "Stable" },
      { title: "Text Field", path: "/components/text-field", status: "Stable" },
      { title: "Checkbox", path: "/components/checkbox", status: "Stable" },
      { title: "Radio", path: "/components/radio", status: "Stable" },
      { title: "Switch", path: "/components/switch", status: "Stable" },
      { title: "Select", path: "/components/select", status: "Stable" },
      { title: "Tabs", path: "/components/tabs", status: "Stable" },
      { title: "Card", path: "/components/card", status: "Stable" },
      { title: "Chip", path: "/components/chip", status: "Stable" },
      { title: "Badge", path: "/components/badge", status: "Stable" },
      { title: "Avatar", path: "/components/avatar", status: "Stable" },
      { title: "Skeleton", path: "/components/skeleton", status: "Stable" },
      { title: "Callout", path: "/components/callout", status: "Stable" },
      { title: "Spinner", path: "/components/spinner", status: "Stable" },
      { title: "Dialog", path: "/components/dialog", status: "Stable" },
      { title: "Menu", path: "/components/menu", status: "Beta" },
      { title: "Tooltip", path: "/components/tooltip", status: "Stable" },
      { title: "Snackbar", path: "/components/snackbar", status: "Beta" },
      { title: "Accordion", path: "/components/accordion", status: "Beta" },
      { title: "Progress", path: "/components/progress", status: "Beta" },
      { title: "Divider", path: "/components/divider", status: "Stable" }
    ]
  },
  {
    title: "Patterns",
    path: "/patterns",
    children: [
      { title: "Forms & Validation", path: "/patterns/forms" },
      { title: "Empty States", path: "/patterns/empty-states" },
      { title: "Data Tables", path: "/patterns/data-tables" },
      { title: "Navigation Patterns", path: "/patterns/navigation" }
    ]
  },
  {
    title: "Content",
    path: "/content",
    children: [
      { title: "Voice & tone", path: "/content/voice-and-tone" },
      { title: "UX writing", path: "/content/ux-writing" }
    ]
  },
  {
    title: "Resources",
    path: "/resources",
    children: [
      { title: "Figma kit", path: "/resources/figma" },
      { title: "Changelog", path: "/resources/changelog" },
      { title: "Roadmap", path: "/resources/roadmap" },
      { title: "Migration", path: "/resources/migration" }
    ]
  },
  {
    title: "Contribute",
    path: "/contribute",
    children: [
      { title: "Process", path: "/contribute/process" },
      { title: "Definition of done", path: "/contribute/definition-of-done" },
      { title: "Status labels", path: "/contribute/status-labels" }
    ]
  }
];

