/**
 * TRILAYER DESIGN SYSTEM — AVATAR COMPONENT SPECIFICATION
 */

export default {
  id: "avatar",
  title: "Avatar",
  status: "Stable",
  version: "1.0.0",
  description: "Avatars represent users or entities with initials, images, presence status badges, and clustered groups.",
  layerInspectorChains: [
    {
      element: "Avatar Surface Fill",
      componentToken: "--tl-comp-avatar-bg",
      semanticToken: "--tl-sys-color-surface-container-high",
      primitiveTokenLight: "--tl-ref-slate-100",
      primitiveTokenDark: "--tl-ref-slate-800",
      valueLight: "#F1F5F9",
      valueDark: "#1E293B"
    },
    {
      element: "Status Dot Online",
      componentToken: "--tl-comp-avatar-status-online",
      semanticToken: "--tl-sys-color-success",
      primitiveTokenLight: "--tl-ref-emerald-500",
      primitiveTokenDark: "--tl-ref-emerald-400",
      valueLight: "#10B981",
      valueDark: "#34D399"
    }
  ],
  variants: [
    { name: "Image Avatar", desc: "User photograph with automatic circular mask and aspect ratio handling." },
    { name: "Initials Avatar", desc: "Text abbreviation fallback when no photo is provided." },
    { name: "Presence Status", desc: "Online (green), busy (red), or away (amber) status indicator dot." },
    { name: "Avatar Group", desc: "Stacked overlapping avatars with +N counter for teams and contributors." }
  ],
  states: ["Small (24px)", "Medium (32px)", "Large (40px)", "Extra Large (48px)"],
  codeSnippets: {
    html: `<div class="tl-avatar tl-avatar--lg">
  <span>DT</span>
  <span class="tl-avatar__status tl-avatar__status--online" aria-label="Online"></span>
</div>`,
    css: `.tl-avatar--lg {
  width: var(--tl-comp-avatar-size-lg);
  height: var(--tl-comp-avatar-size-lg);
  border-radius: var(--tl-comp-avatar-radius);
}`
  },
  accessibility: {
    aria: [
      { attribute: "aria-label", description: "Provides the user's full name when an initials or image avatar is presented without visible name." },
      { attribute: "role='img'", description: "Ensures screen readers recognize initials containers as visual representations." }
    ],
    keyboard: []
  },
  guidelines: {
    dos: [
      "Always provide an initials fallback for broken or loading profile images.",
      "Include accessible text for presence indicators."
    ],
    donts: [
      "Never stack more than 5 avatars without an overflow '+N' counter."
    ]
  },
  related: ["badge", "chip", "card"]
};
