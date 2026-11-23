/**
 * TRILAYER DESIGN SYSTEM — MOBILE RESPONSIVE ENGINE AUDIT
 * Validates mobile viewport rules across all stylesheets and templates:
 * - Viewport bounds & horizontal overflow prevention (max-width: 100vw, overflow-x: hidden)
 * - Header compacting on mobile viewports (< 768px)
 * - Spacing ruler responsive stacking (< 640px)
 * - Token chain stepped resolution flow on mobile
 * - Variant matrix table mobile card transformation
 * - Minimum touch target dimensions (44x44px)
 */

import fs from "fs";
import path from "path";

const rootDir = process.cwd();
const layoutCss = fs.readFileSync(path.join(rootDir, "css/layout.css"), "utf-8");
const docsCss = fs.readFileSync(path.join(rootDir, "css/docs.css"), "utf-8");
const baseCss = fs.readFileSync(path.join(rootDir, "css/base.css"), "utf-8");
const routerJs = fs.readFileSync(path.join(rootDir, "js/router.js"), "utf-8");
const componentJs = fs.readFileSync(path.join(rootDir, "pages/component.js"), "utf-8");

console.log("\x1b[1m\x1b[36m====================================================================\x1b[0m");
console.log("\x1b[1m\x1b[36m     TRILAYER — MOBILE RESPONSIVENESS & TOUCH AUDIT                 \x1b[0m");
console.log("\x1b[1m\x1b[36m====================================================================\x1b[0m\n");

let passed = 0;
let failed = 0;

function assert(name, condition, errorMsg = "") {
  if (condition) {
    console.log(`\x1b[32m✔ PASS\x1b[0m: ${name}`);
    passed++;
  } else {
    console.error(`\x1b[31m✖ FAIL\x1b[0m: ${name} - ${errorMsg}`);
    failed++;
  }
}

// 1. Root and Viewport Containment
assert(
  "HTML & Body prevent horizontal page expansion",
  baseCss.includes("overflow-x: hidden") && baseCss.includes("max-width: 100vw")
);

assert(
  "App Shell (.tl-app) constrained to 100vw with overflow-x hidden",
  layoutCss.includes(".tl-app") && layoutCss.includes("max-width: 100vw") && layoutCss.includes("overflow-x: hidden")
);

// 2. Mobile Header Protection
assert(
  "Density dropdown hidden completely on mobile (< 768px)",
  layoutCss.includes(".tl-density-wrapper") && layoutCss.includes("display: none !important")
);

assert(
  "Header has fluid brand title to prevent overflow",
  layoutCss.includes(".tl-brand-title") && layoutCss.includes("clamp(")
);

assert(
  "Search button converts to compact 44x44px touch target on mobile",
  layoutCss.includes(".tl-search-trigger") && layoutCss.includes("width: 44px") && layoutCss.includes("height: 44px")
);

// 3. Flagship Hero on Mobile
assert(
  "Hero action buttons have responsive wrapping class .tl-hero-actions-row",
  routerJs.includes("tl-hero-actions-row") && docsCss.includes(".tl-hero-actions-row")
);

assert(
  "Hero action buttons stack cleanly on narrow mobile viewports",
  docsCss.includes("@media (max-width: 600px)") && docsCss.includes(".tl-hero-actions-row")
);

// 4. Spacing Ruler Blowout Prevention
assert(
  "Spacing rulers use responsive row class .tl-spacing-ruler-row",
  routerJs.includes("tl-spacing-ruler-row") && docsCss.includes(".tl-spacing-ruler-row")
);

assert(
  "Spacing rulers stack role text vertically on mobile viewports (< 640px)",
  docsCss.includes("@media (max-width: 640px)") && docsCss.includes(".tl-spacing-ruler-row")
);

// 5. Token Chain Stepped Resolution
assert(
  "Token resolution chain uses responsive flow class .tl-token-chain-flow",
  componentJs.includes("tl-token-chain-flow") && docsCss.includes(".tl-token-chain-flow")
);

assert(
  "Token resolution chain stacks vertically with rotated arrows on mobile (< 640px)",
  docsCss.includes("@media (max-width: 640px)") && docsCss.includes(".tl-token-chain-flow") && docsCss.includes("rotate(90deg)")
);

// 6. Variant Matrix Table Mobile Card Transformation
assert(
  "Variant matrix table transforms into standalone cards on mobile (< 640px)",
  docsCss.includes("@media (max-width: 640px)") && docsCss.includes(".tl-variant-matrix-table") && docsCss.includes("display: block")
);

// 7. Touch Ergonomics
assert(
  "All interactive controls meet 44px minimum target on coarse pointers and mobile viewports",
  baseCss.includes("@media (pointer: coarse), (max-width: 767px)") && baseCss.includes("min-height: 44px")
);

console.log(`\nMobile Audit Result: ${passed} passed, ${failed} failed.`);
if (failed > 0) process.exit(1);
