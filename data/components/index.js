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
import avatar from "./avatar.js";
import skeleton from "./skeleton.js";
import callout from "./callout.js";
import spinner from "./spinner.js";
import tabs from "./tabs.js";
import accordion from "./accordion.js";
import select from "./select.js";
import divider from "./divider.js";
import iconButton from "./icon-button.js";
import menu from "./menu.js";
import progress from "./progress.js";
import snackbar from "./snackbar.js";
import whiteboardMockup from "./whiteboard-mockup.js";

export const components = {
  "button": button,
  "icon-button": iconButton,
  "text-field": textField,
  "select": select,
  "checkbox": checkbox,
  "radio": radio,
  "switch": switchComp,
  "card": card,
  "badge": badge,
  "chip": chip,
  "tooltip": tooltip,
  "avatar": avatar,
  "skeleton": skeleton,
  "callout": callout,
  "spinner": spinner,
  "dialog": dialog,
  "menu": menu,
  "snackbar": snackbar,
  "tabs": tabs,
  "accordion": accordion,
  "divider": divider,
  "progress": progress,
  "whiteboard-mockup": whiteboardMockup
};

export const componentsList = Object.values(components);

