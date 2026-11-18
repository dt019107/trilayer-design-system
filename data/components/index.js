/**
 * TRILAYER DESIGN SYSTEM — COMPONENT REGISTRY
 * Aggregates all single-file component definitions.
 * Adding a component to the design system = adding one file in /data/components/
 */

import button from "./button.js";
import textField from "./text-field.js";
import dialog from "./dialog.js";
import checkbox from "./checkbox.js";
import radio from "./radio.js";
import switchComp from "./switch.js";
import card from "./card.js";
import badge from "./badge.js";
import chip from "./chip.js";
import tooltip from "./tooltip.js";

export const components = {
  "button": button,
  "text-field": textField,
  "dialog": dialog,
  "checkbox": checkbox,
  "radio": radio,
  "switch": switchComp,
  "card": card,
  "badge": badge,
  "chip": chip,
  "tooltip": tooltip
};

export const componentsList = Object.values(components);

