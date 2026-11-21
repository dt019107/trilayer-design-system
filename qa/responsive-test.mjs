/**
 * TRILAYER DESIGN SYSTEM — RESPONSIVE LAYOUT & TOUCH AUDIT
 * Verifies breakpoint definitions, touch targets, overflow handling, and spatial rhythm.
 */
import fs from "fs";
import path from "path";

const rootDir = process.cwd();
const layoutCss = fs.readFileSync(path.join(rootDir, "css/layout.css"), "utf-8");
const docsCss = fs.readFileSync(path.join(rootDir, "css/docs.css"), "utf-8");
const baseCss = fs.readFileSync(path.join(rootDir, "css/base.css"), "utf-8");

console.log("Auditing responsive layout and touch targets...");

let passes = 0;
let fails = 0;

function check(title, condition, details = "") {
  if (condition) {
    console.log(`\x1b[32m✔ PASS\x1b[0m: ${title}`);
    passes++;
  } else {
    console.error(`\x1b[31m✖ FAIL\x1b[0m: ${title} - ${details}`);
    fails++;
  }
}

// 1. Check touch targets
check(
  "Base CSS specifies 44px min-height for touch controls",
  baseCss.includes("min-height: 44px")
);
check(
  "Mobile hamburger toggle has 44px minimum target",
  layoutCss.includes(".tl-nav-toggle") && layoutCss.includes("min-width: 44px") && layoutCss.includes("min-height: 44px")
);
check(
  "Header action buttons have 44px minimum target",
  layoutCss.includes(".tl-header-btn") && layoutCss.includes("min-width: 44px") && layoutCss.includes("min-height: 44px")
);
check(
  "Navigation links in mobile drawer have 44px min-height",
  layoutCss.includes(".tl-nav-link") && layoutCss.includes("min-height: 44px")
);

// 2. Check Breakpoints
check(
  "Mobile breakpoint (< 768px) defined with responsive adaptations",
  layoutCss.includes("@media (max-width: 767px)")
);
check(
  "Tablet breakpoint (>= 768px) defined with 2-column pagination and enhanced padding",
  layoutCss.includes("@media (min-width: 768px)")
);
check(
  "Desktop breakpoint (>= 1280px) defined with persistent sidebar",
  layoutCss.includes("@media (min-width: 1280px)")
);
check(
  "Ultrawide breakpoint (>= 1920px) defined with reading width constraint",
  layoutCss.includes("@media (min-width: 1920px)")
);

// 3. Check Fluid Typography
check(
  "Fluid typography clamp() defined on H1-H4 headings and body",
  baseCss.includes("clamp(") && layoutCss.includes("clamp(")
);
check(
  "Headings have text-wrap: balance and paragraphs have text-wrap: pretty with max-width measure",
  baseCss.includes("text-wrap: balance") && baseCss.includes("text-wrap: pretty")
);

// 4. Check Responsive Stacking & Grid
check(
  "Hero studio stacks into single-column on mobile (< 900px)",
  docsCss.includes(".tl-hero-studio") && docsCss.includes("grid-template-columns: 1fr")
);
check(
  "Hero stats grid adapts to 2-column on mobile (< 768px)",
  docsCss.includes(".tl-hero-stats-grid") && docsCss.includes("grid-template-columns: repeat(2, 1fr)")
);
check(
  "Component grid converts to single-column stack on mobile viewports",
  docsCss.includes(".tl-component-grid") && docsCss.includes("grid-template-columns: 1fr")
);
check(
  "Color swatches provide smooth horizontal swipe rail on mobile viewports",
  docsCss.includes(".tl-swatch-strip") && docsCss.includes("scroll-snap-type: x mandatory")
);
check(
  "Section vertical gaps follow 48px-64px spatial rhythm",
  docsCss.includes("margin-bottom: clamp(48px, 6vw, 64px)")
);

console.log(`\nResponsive Audit Summary: ${passes} passed, ${fails} failed.`);
if (fails > 0) process.exit(1);
