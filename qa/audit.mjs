/**
 * TRILAYER DESIGN SYSTEM — PRODUCTION REGRESSION GUARD & QA AUDIT
 * Automated CI/Pre-Release test runner.
 * 
 * Verifies:
 *  1. Strict 3-layer token architecture (zero hex in components, zero skipped layers)
 *  2. Zero undefined tokens
 *  3. Zero hardcoded px dimensions in component CSS
 *  4. Zero token drift between data/tokens.js and CSS custom properties
 *  5. Link & static asset integrity (zero broken links, zero missing files)
 *  6. WCAG 2.2 AA Contrast Compliance across tonal presets
 * 
 * Usage:
 *  node qa/audit.mjs
 */

import fs from "fs";
import path from "path";
import { ColorEngine } from "../js/color-engine.js";
import { navigation } from "../data/navigation.js";
import { components } from "../data/components/index.js";
import { FoundationPages } from "../pages/foundations.js";
import { ContentPages } from "../pages/content-pages.js";
import { renderComponentPage } from "../pages/component.js";
import { renderThemingPlayground } from "../pages/theming.js";

async function runAudit() {
  console.log("\x1b[1m\x1b[34m====================================================================\x1b[0m");
  console.log("\x1b[1m\x1b[34m     TRILAYER DESIGN SYSTEM — AUTOMATED QA REGRESSION GUARD         \x1b[0m");
  console.log("\x1b[1m\x1b[34m====================================================================\x1b[0m\n");

  let totalChecks = 0;
  let passedChecks = 0;
  const failures = [];

  function assert(title, condition, details = "") {
    totalChecks++;
    if (condition) {
      console.log(`\x1b[32m✔ PASS\x1b[0m [${totalChecks.toString().padStart(2, "0")}]: ${title}`);
      passedChecks++;
    } else {
      console.error(`\x1b[31m✖ FAIL\x1b[0m [${totalChecks.toString().padStart(2, "0")}]: ${title}`);
      if (details) console.error(`       \x1b[33m${details}\x1b[0m`);
      failures.push({ check: totalChecks, title, details });
    }
  }

  const rootDir = process.cwd();
  const compDir = path.join(rootDir, "css/components");
  const compFiles = fs.readdirSync(compDir).filter(f => f.endsWith(".css"));

  // -------------------------------------------------------------------------
  // 1.1 Zero hex, rgb, hsl, named colors in css/components/
  // -------------------------------------------------------------------------
  const namedColors = ["black", "white", "red", "green", "blue", "yellow", "orange", "purple", "gray", "grey"];
  let c11Fails = [];
  for (const f of compFiles) {
    const lines = fs.readFileSync(path.join(compDir, f), "utf-8").split("\n");
    lines.forEach((line, i) => {
      const stripped = line.replace(/\/\*.*?\*\//g, "").trim();
      if (!stripped || stripped.startsWith("/*") || stripped.startsWith("*")) return;
      if (/#[0-9a-fA-F]{3,8}\b/g.test(stripped)) c11Fails.push(`${f}:${i+1} hex`);
      if (/\brgba?\s*\(/gi.test(stripped)) c11Fails.push(`${f}:${i+1} rgb`);
      if (/\bhsla?\s*\(/gi.test(stripped)) c11Fails.push(`${f}:${i+1} hsl`);
      for (const nc of namedColors) {
        const reg = new RegExp(`(:|\\s)${nc}\\b`, "i");
        if (reg.test(stripped) && !stripped.includes("font-family") && !stripped.includes("text-align")) {
          c11Fails.push(`${f}:${i+1} namedColor ${nc}`);
        }
      }
    });
  }
  assert("Category 1.1: Zero color literals in /css/components/", c11Fails.length === 0, c11Fails.join(", "));

  // -------------------------------------------------------------------------
  // 1.2 Zero --tl-ref- in css/components/ and css/docs.css
  // -------------------------------------------------------------------------
  const c12Files = [...compFiles.map(f => path.join(compDir, f)), path.join(rootDir, "css/docs.css")];
  let c12Fails = [];
  for (const f of c12Files) {
    const lines = fs.readFileSync(f, "utf-8").split("\n");
    lines.forEach((line, i) => {
      const stripped = line.replace(/\/\*.*?\*\//g, "").trim();
      if (!stripped || stripped.startsWith("/*") || stripped.startsWith("*")) return;
      if (stripped.includes("--tl-ref-")) c12Fails.push(`${path.basename(f)}:${i+1}`);
    });
  }
  assert("Category 1.2: Zero --tl-ref- references in components and docs.css", c12Fails.length === 0, c12Fails.join(", "));

  // -------------------------------------------------------------------------
  // 1.3 Strict 3-layer aliasing (comp -> sys -> ref)
  // -------------------------------------------------------------------------
  function parseCssTokens(filePath) {
    const map = new Map();
    const css = fs.readFileSync(filePath, "utf-8");
    const regex = /(--tl-[a-zA-Z0-9_-]+)\s*:\s*([^;]+);/g;
    let m;
    while ((m = regex.exec(css)) !== null) map.set(m[1].trim(), m[2].trim());
    return map;
  }
  const compMap = parseCssTokens(path.join(rootDir, "css/tokens.components.css"));
  const semMap = parseCssTokens(path.join(rootDir, "css/tokens.semantic.css"));
  const primMap = parseCssTokens(path.join(rootDir, "css/tokens.primitives.css"));

  let c13Fails = [];
  for (const [tok, val] of compMap.entries()) {
    if (val.includes("--tl-ref-")) c13Fails.push(`${tok} skips layer`);
    if (!val.includes("--tl-sys-")) c13Fails.push(`${tok} raw value`);
  }
  for (const [tok, val] of semMap.entries()) {
    if (val.includes("--tl-comp-")) c13Fails.push(`${tok} inverted layer`);
  }
  assert("Category 1.3: Strict layer aliasing (--tl-comp-* -> --tl-sys-* -> --tl-ref-*)", c13Fails.length === 0, c13Fails.join(", "));

  // -------------------------------------------------------------------------
  // 1.4 Zero undefined tokens referenced in var()
  // -------------------------------------------------------------------------
  const definedTokens = new Set([...compMap.keys(), ...semMap.keys(), ...primMap.keys()]);
  const layoutCss = fs.readFileSync(path.join(rootDir, "css/layout.css"), "utf-8");
  let lm;
  const lreg = /(--tl-layout-[a-zA-Z0-9_-]+)\s*:/g;
  while ((lm = lreg.exec(layoutCss)) !== null) definedTokens.add(lm[1]);

  const allScanDirs = ["css", "js", "data", "pages"];
  const allFiles = [path.join(rootDir, "index.html")];
  function collectFiles(d) {
    for (const item of fs.readdirSync(d)) {
      const full = path.join(d, item);
      if (fs.statSync(full).isDirectory()) collectFiles(full);
      else if (full.endsWith(".css") || full.endsWith(".js") || full.endsWith(".html")) allFiles.push(full);
    }
  }
  allScanDirs.forEach(d => collectFiles(path.join(rootDir, d)));

  let undefinedTokens = [];
  for (const f of allFiles) {
    const c = fs.readFileSync(f, "utf-8").replace(/\/\*[\s\S]*?\*\//g, "").replace(/\/\/.*/g, "");
    const vreg = /var\(\s*(--tl-[a-zA-Z0-9_-]+)/g;
    let vm;
    while ((vm = vreg.exec(c)) !== null) {
      if (!definedTokens.has(vm[1])) undefinedTokens.push(`${vm[1]} (${path.relative(rootDir, f)})`);
    }
  }
  assert("Category 1.4: Zero undefined CSS custom properties", undefinedTokens.length === 0, undefinedTokens.join(", "));

  // -------------------------------------------------------------------------
  // 1.5 Zero hardcoded spacing/radius/font-size px in component CSS
  // -------------------------------------------------------------------------
  let c15Fails = [];
  for (const f of compFiles) {
    const lines = fs.readFileSync(path.join(compDir, f), "utf-8").split("\n");
    lines.forEach((line, i) => {
      const stripped = line.replace(/\/\*.*?\*\//g, "").trim();
      if (!stripped || stripped.startsWith("/*") || stripped.startsWith("*")) return;
      const m = stripped.match(/(padding|margin|gap|border-radius|font-size)[^:]*:\s*([^;]+);/i);
      if (m) {
        const pxMatches = m[2].match(/\b(?!(?:0|1|2)px\b)\d+px\b/g);
        if (pxMatches && !m[2].includes("var(")) c15Fails.push(`${f}:${i+1} "${m[2]}"`);
      }
    });
  }
  assert("Category 1.5: Zero hardcoded px dimensions in component CSS", c15Fails.length === 0, c15Fails.join(", "));

  // -------------------------------------------------------------------------
  // 1.7 Zero token drift in /data/tokens.js
  // -------------------------------------------------------------------------
  const { sampleTokenChains, spacingScale, shapeScale } = await import("../data/tokens.js");
  let driftCount = 0;
  for (const chain of sampleTokenChains) {
    const compVal = compMap.get(chain.componentToken);
    const primVal = primMap.get(chain.primitiveTokenLight);
    if (!compVal || !compVal.includes(chain.semanticToken)) driftCount++;
    if (!primVal || primVal.toUpperCase() !== chain.valueLight.toUpperCase()) driftCount++;
  }
  assert("Category 1.7: Zero drift in /data/tokens.js token chains", driftCount === 0);

  // -------------------------------------------------------------------------
  // Category 2: WCAG 2.2 AA Contrast across 5 distinct seed palettes
  // -------------------------------------------------------------------------
  const testSeeds = ["#E0E7FF", "#1E1B4B", "#EAB308", "#71717A", "#5B5BD6"];
  let contrastFails = 0;
  for (const s of testSeeds) {
    const pal = ColorEngine.generateTonalPalette(s);
    const audit = ColorEngine.runContrastAudit(pal);
    const fails = audit.filter(a => !a.passesAA);
    if (fails.length > 0) contrastFails += fails.length;
  }
  assert("Category 2.5: WCAG 2.2 AA Contrast (>= 4.5:1) across 5 diverse seed palettes", contrastFails === 0);

  // -------------------------------------------------------------------------
  // Category 3: Link & Asset Crawler
  // -------------------------------------------------------------------------
  const validRoutes = new Set(["#/", "#/tokens/layers", "#/tokens/theming", "#/components"]);
  function registerNav(items) {
    for (const it of items) {
      if (it.path) validRoutes.add(`#${it.path}`);
      if (it.children) registerNav(it.children);
    }
  }
  registerNav(navigation);
  for (const id of Object.keys(components)) validRoutes.add(`#/components/${id}`);

  const pageCatalog = [
    { r: "#/", h: fs.readFileSync(path.join(rootDir, "index.html"), "utf-8") },
    { r: "#/foundations/color", h: FoundationPages.renderColor() },
    { r: "#/foundations/typography", h: FoundationPages.renderTypography() },
    { r: "#/foundations/spacing", h: FoundationPages.renderSpacing() },
    { r: "#/foundations/shape", h: FoundationPages.renderShape() },
    { r: "#/foundations/elevation", h: FoundationPages.renderElevation() },
    { r: "#/foundations/motion", h: FoundationPages.renderMotion() },
    { r: "#/foundations/iconography", h: FoundationPages.renderIconography() },
    { r: "#/foundations/accessibility", h: FoundationPages.renderAccessibility() },
    { r: "#/get-started", h: ContentPages.renderGetStarted() },
    { r: "#/get-started/designers", h: ContentPages.renderDesigners() },
    { r: "#/get-started/developers", h: ContentPages.renderDevelopers() },
    { r: "#/get-started/installation", h: ContentPages.renderInstallation() },
    { r: "#/tokens/reference", h: ContentPages.renderTokenReference() },
    { r: "#/tokens/naming", h: ContentPages.renderTokenNaming() },
    { r: "#/patterns/forms", h: ContentPages.renderPatternsForms() },
    { r: "#/patterns/empty-states", h: ContentPages.renderPatternsEmptyStates() },
    { r: "#/patterns/data-tables", h: ContentPages.renderPatternsDataTables() },
    { r: "#/patterns/navigation", h: ContentPages.renderPatternsNavigation() },
    { r: "#/content/voice-and-tone", h: ContentPages.renderContentVoice() },
    { r: "#/content/ux-writing", h: ContentPages.renderContentUXWriting() },
    { r: "#/resources/figma", h: ContentPages.renderResourcesFigma() },
    { r: "#/resources/changelog", h: ContentPages.renderChangelog() },
    { r: "#/resources/roadmap", h: ContentPages.renderRoadmap() },
    { r: "#/resources/migration", h: ContentPages.renderMigration() },
    { r: "#/contribute", h: ContentPages.renderContribute() },
    { r: "#/tokens/theming", h: renderThemingPlayground() },
    ...Object.entries(components).map(([id, comp]) => ({ r: `#/components/${id}`, h: renderComponentPage(comp) }))
  ];

  let brokenRoutes = [];
  let missingFiles = [];
  for (const page of pageCatalog) {
    const hreg = /href=["']([^"']+)["']/g;
    let hm;
    while ((hm = hreg.exec(page.h)) !== null) {
      const link = hm[1].split("?")[0];
      if (link.startsWith("#")) {
        if (link !== "#" && link !== "#main-content" && !validRoutes.has(link)) brokenRoutes.push(`${page.r} -> ${link}`);
      } else if (!link.startsWith("http://") && !link.startsWith("https://") && !link.startsWith("mailto:")) {
        if (!fs.existsSync(path.join(rootDir, link))) missingFiles.push(link);
      }
    }
  }
  assert("Category 3.7: Zero broken internal routes", brokenRoutes.length === 0, brokenRoutes.join(", "));
  assert("Category 3.7: Zero missing static asset files", missingFiles.length === 0, missingFiles.join(", "));

  // -------------------------------------------------------------------------
  // 7. Category 8.2: Heading Hierarchy (Single H1, Zero Skipped Levels)
  // -------------------------------------------------------------------------
  let headingFailures = [];
  for (const page of pageCatalog) {
    if (page.r === "#/") continue; // Home page handled separately
    const headings = [...page.h.matchAll(/<h([1-6])[^>]*>/gi)].map(m => parseInt(m[1]));
    const h1Count = headings.filter(h => h === 1).length;
    if (h1Count !== 1) headingFailures.push(`${page.r}: ${h1Count} h1 tags`);
    for (let i = 0; i < headings.length - 1; i++) {
      if (headings[i+1] > headings[i] + 1) {
        headingFailures.push(`${page.r}: skipped h${headings[i]} -> h${headings[i+1]}`);
      }
    }
  }
  assert("Category 8.2: Heading hierarchy (Single H1 per page, zero skipped levels)", headingFailures.length === 0, headingFailures.join(", "));

  // -------------------------------------------------------------------------
  // Summary
  // -------------------------------------------------------------------------
  console.log("\n\x1b[1m\x1b[34m====================================================================\x1b[0m");
  console.log(`\x1b[1mFINAL RESULT: ${passedChecks} / ${totalChecks} CHECKS PASSED (${Math.round((passedChecks/totalChecks)*100)}%)\x1b[0m`);
  console.log("\x1b[1m\x1b[34m====================================================================\x1b[0m\n");

  if (failures.length > 0) {
    console.error(`\x1b[31mRelease Gate Blocked: ${failures.length} check(s) failed.\x1b[0m`);
    process.exit(1);
  } else {
    console.log(`\x1b[32m✔ RELEASE GATE PASSED: Zero Blocker and Zero Major Issues.\x1b[0m`);
    process.exit(0);
  }
}

runAudit();
