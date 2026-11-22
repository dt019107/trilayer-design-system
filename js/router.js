/**
 * TRILAYER DESIGN SYSTEM — CLIENT-SIDE HASH ROUTER
 * Hash-based mini router (#/foundations/color).
 * Renders views dynamically, updates page title, and notifies navigation.
 */

import { navigation } from "../data/navigation.js";
import {
  sampleTokenChains,
  tokenLayers,
  colorPrimitives,
  spacingScale,
  shapeScale,
  typographyScale,
  elevationScale,
  semanticColorRoles
} from "../data/tokens.js";
import { FoundationPages } from "../pages/foundations.js";
import { components, componentsList } from "../data/components/index.js";
import { renderComponentPage } from "../pages/component.js";
import { renderThemingPlayground } from "../pages/theming.js";
import { ContentPages } from "../pages/content-pages.js";
import { ColorEngine } from "./color-engine.js";

export class Router {
  constructor(navController) {
    this.navController = navController;
    this.container = document.getElementById("tl-view-container");
    this.init();
  }

  init() {
    window.addEventListener("hashchange", () => this.handleRoute());
    // Initial route handling
    if (!window.location.hash) {
      window.location.hash = "#/";
    } else {
      this.handleRoute();
    }
  }

  getRoutePath() {
    let hash = window.location.hash.slice(1); // remove '#'
    if (!hash || hash === "") hash = "/";
    if (!hash.startsWith("/")) hash = `/${hash}`;
    return hash;
  }

  handleRoute() {
    const path = this.getRoutePath();
    this.navController.setActivePath(path);
    this.render(path);
    window.scrollTo({ top: 0, behavior: "instant" });
    this.updateMeta(path);
  }

  updateMeta(path) {
    const descEl = document.querySelector('meta[name="description"]');
    if (!descEl) return;
    const title = document.title.split("—")[0].trim();
    descEl.setAttribute("content", `${title} — Trilayer Design System architecture, tokens, and components.`);
  }

  render(path) {
    if (!this.container) return;

    if (path === "/" || path === "") {
      this.renderHome();
      document.title = "Trilayer — Three layers. One source of truth.";
      return;
    }

    // Get Started (Phase 8)
    if (path === "/get-started") {
      this.container.innerHTML = ContentPages.renderGetStarted();
      document.title = "Get Started — Trilayer Design System";
      return;
    }
    if (path === "/get-started/designers") {
      this.container.innerHTML = ContentPages.renderDesigners();
      document.title = "Trilayer for Designers — Figma Guide";
      return;
    }
    if (path === "/get-started/developers") {
      this.container.innerHTML = ContentPages.renderDevelopers();
      document.title = "Trilayer for Developers — Zero-Build Guide";
      return;
    }
    if (path === "/get-started/installation") {
      this.container.innerHTML = ContentPages.renderInstallation();
      document.title = "Installation & Setup — Trilayer Design System";
      return;
    }

    // Foundations (Phase 4 & 8)
    if (path === "/foundations" || path === "/foundations/color") {
      this.container.innerHTML = FoundationPages.renderColor();
      document.title = "Color System — Trilayer Foundations";
      return;
    }
    if (path === "/foundations/typography") {
      this.container.innerHTML = FoundationPages.renderTypography();
      document.title = "Typography System — Trilayer Foundations";
      return;
    }
    if (path === "/foundations/spacing") {
      this.container.innerHTML = FoundationPages.renderSpacing();
      document.title = "Spacing & Layout — Trilayer Foundations";
      return;
    }
    if (path === "/foundations/shape") {
      this.container.innerHTML = FoundationPages.renderShape();
      document.title = "Shape Scale — Trilayer Foundations";
      return;
    }
    if (path === "/foundations/elevation") {
      this.container.innerHTML = FoundationPages.renderElevation();
      document.title = "Elevation & Surfaces — Trilayer Foundations";
      return;
    }
    if (path === "/foundations/motion") {
      this.container.innerHTML = FoundationPages.renderMotion();
      document.title = "Motion & Choreography — Trilayer Foundations";
      if (typeof window.__replayMotion === "function") {
        setTimeout(window.__replayMotion, 100);
      }
      return;
    }
    if (path === "/foundations/iconography") {
      this.container.innerHTML = FoundationPages.renderIconography();
      document.title = "Iconography System — Trilayer Foundations";
      return;
    }
    if (path === "/foundations/accessibility") {
      this.container.innerHTML = FoundationPages.renderAccessibility();
      document.title = "Accessibility Standards — Trilayer Foundations";
      return;
    }

    // Tokens (Phase 1, 6 & 8)
    if (path === "/tokens" || path === "/tokens/layers") {
      this.renderTokenLayers();
      document.title = "The Three Layers — Trilayer Tokens";
      return;
    }
    if (path === "/tokens/reference") {
      this.container.innerHTML = ContentPages.renderTokenReference();
      document.title = "Token Reference — Trilayer Design System";
      return;
    }
    if (path === "/tokens/theming") {
      this.container.innerHTML = renderThemingPlayground();
      document.title = "Theme Engine & Playground — Trilayer Design System";
      return;
    }
    if (path === "/tokens/naming") {
      this.container.innerHTML = ContentPages.renderTokenNaming();
      document.title = "Token Naming Taxonomy — Trilayer Design System";
      return;
    }

    // Patterns (Phase 8)
    if (path === "/patterns" || path === "/patterns/forms") {
      this.container.innerHTML = ContentPages.renderPatternsForms();
      document.title = "Forms & Validation Patterns — Trilayer Design System";
      return;
    }
    if (path === "/patterns/empty-states") {
      this.container.innerHTML = ContentPages.renderPatternsEmptyStates();
      document.title = "Empty States Pattern — Trilayer Design System";
      return;
    }
    if (path === "/patterns/data-tables") {
      this.container.innerHTML = ContentPages.renderPatternsDataTables();
      document.title = "Data Tables Pattern — Trilayer Design System";
      return;
    }
    if (path === "/patterns/navigation") {
      this.container.innerHTML = ContentPages.renderPatternsNavigation();
      document.title = "Navigation Patterns — Trilayer Design System";
      return;
    }

    // Content: Voice, Tone & UX Writing (Phase 8)
    if (path === "/content" || path === "/content/voice-and-tone") {
      this.container.innerHTML = ContentPages.renderContentVoice();
      document.title = "Voice & Tone Guidelines — Trilayer Design System";
      return;
    }
    if (path === "/content/ux-writing") {
      this.container.innerHTML = ContentPages.renderContentUXWriting();
      document.title = "UX Writing & Copy Rules — Trilayer Design System";
      return;
    }

    // Resources: Figma, Changelog, Roadmap, Migration (Phase 8)
    if (path === "/resources" || path === "/resources/changelog") {
      this.container.innerHTML = ContentPages.renderChangelog();
      document.title = "Release Changelog — Trilayer Design System";
      return;
    }
    if (path === "/resources/figma") {
      this.container.innerHTML = ContentPages.renderResourcesFigma();
      document.title = "Figma UI Kit & Tokens Sync — Trilayer Resources";
      return;
    }
    if (path === "/resources/roadmap") {
      this.container.innerHTML = ContentPages.renderRoadmap();
      document.title = "Product Roadmap — Trilayer Design System";
      return;
    }
    if (path === "/resources/migration") {
      this.container.innerHTML = ContentPages.renderMigration();
      document.title = "Migration Guide — Trilayer Design System";
      return;
    }

    // Contribute: Process, Definition of Done, Status Labels (Phase 8)
    if (path.startsWith("/contribute")) {
      this.container.innerHTML = ContentPages.renderContribute();
      document.title = "Contribution Guidelines & Governance — Trilayer Design System";
      return;
    }

    // Component Directory Overview
    if (path === "/components") {
      this.renderComponentsDirectory();
      document.title = "Components Overview — Trilayer Design System";
      return;
    }

    // Single Component Page rendered dynamically from /data/components/*.js
    if (path.startsWith("/components/")) {
      const compId = path.replace("/components/", "");
      const compData = components[compId];
      if (compData) {
        this.container.innerHTML = renderComponentPage(compData);
        document.title = `${compData.title} Component — Trilayer Design System`;
        return;
      }
    }

    // Generic matching from navigation data
    let matchedItem = null;
    let sectionTitle = "";

    for (const sec of navigation) {
      if (sec.path === path) {
        matchedItem = sec;
        sectionTitle = sec.title;
        break;
      }
      if (sec.children) {
        const found = sec.children.find(c => c.path === path);
        if (found) {
          matchedItem = found;
          sectionTitle = sec.title;
          break;
        }
      }
    }

    if (matchedItem) {
      this.renderStandardPage(sectionTitle, matchedItem, path);
      document.title = `${matchedItem.title} — Trilayer Design System`;
    } else {
      this.render404(path);
      document.title = "404 Not Found — Trilayer Design System";
    }
  }

  renderHome() {
    const colorFamilies = [
      { id: "indigo", name: "Primary Brand (Indigo)", swatches: colorPrimitives.indigo },
      { id: "gray", name: "Neutral Slate (Surfaces & Text)", swatches: colorPrimitives.gray },
      { id: "emerald", name: "Functional Success (Emerald)", swatches: colorPrimitives.emerald },
      { id: "amber", name: "Functional Warning (Amber)", swatches: colorPrimitives.amber },
      { id: "rose", name: "Functional Danger (Rose)", swatches: colorPrimitives.rose },
      { id: "sky", name: "Functional Information (Sky)", swatches: colorPrimitives.sky },
      { id: "violet", name: "Creative Accent (Violet)", swatches: colorPrimitives.violet },
      { id: "teal", name: "Tertiary Accent (Teal)", swatches: colorPrimitives.teal }
    ];

    this.container.innerHTML = `
      <div class="tl-home-hero">
        <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 12px; margin-bottom: 20px;">
          <div class="tl-hero-eyebrow">
            <span class="tl-pulse-dot"></span>
            SYSTEM v2.0 &bull; W3C DTCG ARCHITECTURE &bull; WCAG 2.2 AAA VERIFIED
          </div>
          <div style="display: flex; align-items: center; gap: 8px;">
            <a href="tokens/tokens.json" download="trilayer-tokens.json" class="tl-btn tl-btn--primary tl-btn--sm" style="text-decoration: none;">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
              Export Tokens (.JSON)
            </a>
            <a href="#/resources/figma" class="tl-btn tl-btn--outline tl-btn--sm" style="text-decoration: none;">
              Figma Variables Guide
            </a>
            <a href="https://github.com/dt019107/trilayer-design-system" target="_blank" rel="noopener noreferrer" class="tl-btn tl-btn--ghost tl-btn--sm" style="text-decoration: none;">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg> GitHub
            </a>
          </div>
        </div>

        <h1 style="font-size: clamp(34px, 5vw, 54px); font-weight: 800; line-height: 1.12; margin-bottom: 16px; letter-spacing: -0.03em;">
          The Design System Built Like an <span class="tl-gradient-text">Artboard.</span>
        </h1>

        <p style="font-size: clamp(16px, 1.8vw, 19px); color: var(--tl-sys-color-on-surface-variant); max-width: 820px; margin-bottom: 24px; line-height: 1.55;">
          Three layers. Mathematical precision. Zero drift. Complete Figma Variables parity and production-grade CSS custom properties across wide-range palettes, typography, spatial scales, and interactive accessible components.
        </p>

        <!-- System Architecture KPI Metrics Grid -->
        <div class="tl-hero-stats-grid">
          <div class="tl-hero-stat-card">
            <span class="tl-hero-stat-value">88</span>
            <span class="tl-hero-stat-label">Tonal Swatches &bull; 8 Spectrum Ramps</span>
          </div>
          <div class="tl-hero-stat-card">
            <span class="tl-hero-stat-value">3-Tier</span>
            <span class="tl-hero-stat-label">Token Cascade (Comp &rarr; Sys &rarr; Ref)</span>
          </div>
          <div class="tl-hero-stat-card">
            <span class="tl-hero-stat-value">28+</span>
            <span class="tl-hero-stat-label">Accessible Interactive Components</span>
          </div>
          <div class="tl-hero-stat-card">
            <span class="tl-hero-stat-value">100%</span>
            <span class="tl-hero-stat-label">WCAG 2.2 AA / AAA Verified Contrast</span>
          </div>
        </div>

        <!-- Live Interactive Token Studio Simulator -->
        <div class="tl-hero-studio">
          <div style="display: flex; flex-direction: column; gap: 14px;">
            <div style="display: flex; align-items: center; justify-content: space-between;">
              <strong style="font-size: 15px; color: var(--tl-sys-color-on-surface); display: flex; align-items: center; gap: 8px;">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 2a7 7 0 0 0 7 7c0 2-1 3-2 4s-1 2-1 3"/><path d="M9 18h6"/></svg>
                Live Brand Seed Engine
              </strong>
              <button class="tl-btn tl-btn--ghost tl-btn--sm" onclick="window.__onResetTheme()">Reset Seed</button>
            </div>
            <p style="font-size: 13px; color: var(--tl-sys-color-on-surface-muted); margin: 0; line-height: 1.45;">
              Select a brand seed color. The engine recalculates the complete 12-step perceptual tonal ramp and updates all semantic mappings live across the entire interface.
            </p>
            <div style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap;">
              <input type="color" id="hero-color-picker" value="#5B5BD6" style="width: 44px; height: 44px; min-width: 44px; min-height: 44px; border: none; border-radius: var(--tl-sys-shape-xs); cursor: pointer; background: transparent;" oninput="window.__onSeedChange(this.value)" aria-label="Brand Seed Color Picker">
              <button class="tl-chip" onclick="window.__onSeedChange('#5B5BD6')"><span style="width: 8px; height: 8px; border-radius: 9999px; background: #5B5BD6;"></span> Indigo</button>
              <button class="tl-chip" onclick="window.__onSeedChange('#059669')"><span style="width: 8px; height: 8px; border-radius: 9999px; background: #059669;"></span> Emerald</button>
              <button class="tl-chip" onclick="window.__onSeedChange('#E11D48')"><span style="width: 8px; height: 8px; border-radius: 9999px; background: #E11D48;"></span> Crimson</button>
              <button class="tl-chip" onclick="window.__onSeedChange('#7C3AED')"><span style="width: 8px; height: 8px; border-radius: 9999px; background: #7C3AED;"></span> Violet</button>
              <button class="tl-chip" onclick="window.__onSeedChange('#0284C7')"><span style="width: 8px; height: 8px; border-radius: 9999px; background: #0284C7;"></span> Sky</button>
              <button class="tl-chip" onclick="window.__onSeedChange('#D97706')"><span style="width: 8px; height: 8px; border-radius: 9999px; background: #D97706;"></span> Amber</button>
            </div>
            
            <!-- 3-Tier Trace Chain -->
            <div style="background: var(--tl-sys-color-surface-container-high); border: 1px solid var(--tl-sys-color-outline); border-radius: var(--tl-sys-shape-control); padding: 12px; margin-top: 4px;">
              <div style="font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; color: var(--tl-sys-color-on-surface-muted); margin-bottom: 8px;">Token Resolution Chain</div>
              <div style="font-family: var(--tl-sys-font-family-code); font-size: 11px; display: flex; flex-direction: column; gap: 6px;">
                <div style="display: flex; align-items: center; justify-content: space-between;"><span style="color: var(--tl-sys-color-on-surface-muted);">Layer 1 Primitive:</span><span style="color: var(--tl-sys-color-link);">--tl-ref-color-indigo-600</span></div>
                <div style="display: flex; align-items: center; justify-content: space-between;"><span style="color: var(--tl-sys-color-on-surface-muted);">Layer 2 Semantic:</span><span style="color: var(--tl-sys-color-success);">--tl-sys-color-primary</span></div>
                <div style="display: flex; align-items: center; justify-content: space-between;"><span style="color: var(--tl-sys-color-on-surface-muted);">Layer 3 Component:</span><span style="color: var(--tl-sys-color-primary);">--tl-comp-button-primary-bg</span></div>
              </div>
            </div>
          </div>

          <!-- Live Reactive Component Playground -->
          <div style="display: flex; flex-direction: column; justify-content: space-between; gap: 16px; background: var(--tl-sys-color-surface-container-high); border: 1px solid var(--tl-sys-color-outline); border-radius: var(--tl-sys-shape-control); padding: 18px;">
            <div style="display: flex; align-items: center; justify-content: space-between;">
              <span style="font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.06em; color: var(--tl-sys-color-on-surface-muted);">Live Component Reactive Binding</span>
              <span id="hero-contrast-ratio" class="tl-badge tl-badge--brand" style="font-size: 11px; text-transform: none;">7.2:1 AAA</span>
            </div>
            <div style="display: flex; gap: 10px; align-items: center; flex-wrap: wrap;">
              <button class="tl-btn tl-btn--primary tl-btn--md" onclick="Toast.show({ message: 'Primary Action verified with active seed!', type: 'info' })">Primary Action</button>
              <button class="tl-btn tl-btn--secondary tl-btn--md" onclick="Toast.show({ message: 'Secondary Tonal Surface verified!', type: 'info' })">Secondary Tonal</button>
              <button class="tl-btn tl-btn--outline tl-btn--md" onclick="Toast.show({ message: 'Outline Border verified!', type: 'info' })">Outline</button>
            </div>
            <div style="display: flex; gap: 10px; align-items: center; flex-wrap: wrap;">
              <label class="tl-switch" style="display: inline-flex; align-items: center; gap: 8px; cursor: pointer;">
                <input type="checkbox" checked style="accent-color: var(--tl-sys-color-primary);" aria-label="Auto Sync Toggle">
                <span style="font-size: 13px; color: var(--tl-sys-color-on-surface);">Auto Sync</span>
              </label>
              <span class="tl-chip" style="pointer-events: none;">DTCG Compliant</span>
            </div>
            <div style="font-size: 12px; color: var(--tl-sys-color-on-surface-muted); line-height: 1.4; border-top: 1px solid var(--tl-sys-color-outline-variant); padding-top: 10px;">
              Elements bind directly to Layer 3 tokens, immediately inheriting algorithmic lightness, contrast ratios, and accessible text tints without CSS recompilation.
            </div>
          </div>
        </div>

        <!-- Quick-Start Installation & Drop-in Integration (Biings DS Pattern) -->
        <div class="tl-card tl-has-lift tl-surface-ambient" style="margin-top: 24px; padding: clamp(20px, 3vw, 28px); border-radius: var(--tl-sys-shape-container); border: 1px solid var(--tl-sys-color-outline);">
          <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 12px; margin-bottom: 16px;">
            <div>
              <div style="font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.06em; color: var(--tl-sys-color-link); margin-bottom: 4px;">Developer Onboarding</div>
              <h2 style="font-size: 18px; margin: 0; color: var(--tl-sys-color-on-surface);">Quick Start: 3 Steps to Production</h2>
            </div>
            <span class="tl-badge tl-badge--brand">Zero-Build &bull; ES Modules</span>
          </div>

          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 16px;">
            <div style="background: var(--tl-sys-color-surface-container); border: 1px solid var(--tl-sys-color-outline-variant); border-radius: var(--tl-sys-shape-control); padding: 14px;">
              <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
                <span style="display: inline-flex; align-items: center; justify-content: center; width: 22px; height: 22px; border-radius: 9999px; background: var(--tl-sys-color-primary); color: var(--tl-sys-color-on-primary); font-size: 11px; font-weight: 700;">1</span>
                <strong style="font-size: 13px; color: var(--tl-sys-color-on-surface);">Install via NPM</strong>
              </div>
              <pre style="margin: 0; padding: 10px; background: var(--tl-sys-color-surface-container-high); border-radius: var(--tl-sys-shape-xs); font-family: var(--tl-sys-font-family-code); font-size: 12px; color: var(--tl-sys-color-link); overflow-x: auto;"><code>npm install @trilayer/core</code></pre>
            </div>

            <div style="background: var(--tl-sys-color-surface-container); border: 1px solid var(--tl-sys-color-outline-variant); border-radius: var(--tl-sys-shape-control); padding: 14px;">
              <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
                <span style="display: inline-flex; align-items: center; justify-content: center; width: 22px; height: 22px; border-radius: 9999px; background: var(--tl-sys-color-primary); color: var(--tl-sys-color-on-primary); font-size: 11px; font-weight: 700;">2</span>
                <strong style="font-size: 13px; color: var(--tl-sys-color-on-surface);">Drop in CSS Cascade</strong>
              </div>
              <pre style="margin: 0; padding: 10px; background: var(--tl-sys-color-surface-container-high); border-radius: var(--tl-sys-shape-xs); font-family: var(--tl-sys-font-family-code); font-size: 12px; color: var(--tl-sys-color-on-surface-variant); overflow-x: auto;"><code>&lt;link rel="stylesheet" href="css/tokens.components.css"&gt;</code></pre>
            </div>

            <div style="background: var(--tl-sys-color-surface-container); border: 1px solid var(--tl-sys-color-outline-variant); border-radius: var(--tl-sys-shape-control); padding: 14px;">
              <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
                <span style="display: inline-flex; align-items: center; justify-content: center; width: 22px; height: 22px; border-radius: 9999px; background: var(--tl-sys-color-primary); color: var(--tl-sys-color-on-primary); font-size: 11px; font-weight: 700;">3</span>
                <strong style="font-size: 13px; color: var(--tl-sys-color-on-surface);">Consume Component Tokens</strong>
              </div>
              <pre style="margin: 0; padding: 10px; background: var(--tl-sys-color-surface-container-high); border-radius: var(--tl-sys-shape-xs); font-family: var(--tl-sys-font-family-code); font-size: 12px; color: var(--tl-sys-color-on-surface-variant); overflow-x: auto;"><code>color: var(--tl-comp-button-primary-bg);</code></pre>
            </div>
          </div>
        </div>

        <!-- Quick Jump Artboard Bar -->
        <div class="tl-quicknav-bar">
          <span style="font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.06em; color: var(--tl-sys-color-on-surface-muted); margin-right: 4px;">Jump to Artboard:</span>
          <a href="#artboard-colors" class="tl-quicknav-pill">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 2a7 7 0 0 0 7 7c0 2-1 3-2 4s-1 2-1 3"/><path d="M9 18h6"/></svg>
            01. Color Palette System
          </a>
          <a href="#artboard-typography" class="tl-quicknav-pill">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="4 7 4 4 20 4 20 7"/><line x1="9" y1="20" x2="15" y2="20"/><line x1="12" y1="4" x2="12" y2="20"/></svg>
            02. Typography Scale
          </a>
          <a href="#artboard-spatial" class="tl-quicknav-pill">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/></svg>
            03. Spacing &amp; Radii
          </a>
          <a href="#artboard-components" class="tl-quicknav-pill">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16.5 9.4 7.55 4.24a1.78 1.78 0 0 0-2.5 1.55v12.42a1.78 1.78 0 0 0 2.5 1.55L16.5 14.6a1.78 1.78 0 0 0 0-3.2z"/></svg>
            04. UI Components
          </a>
        </div>
      </div>

      <!-- =====================================================================
           ARTBOARD 01: COLOR PALETTE SYSTEM (Wide Ranges of Ramps)
           ===================================================================== -->
      <section class="tl-artboard" id="artboard-colors">
        <div class="tl-artboard-header">
          <div>
            <h2 class="tl-artboard-title">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 2a7 7 0 0 0 7 7c0 2-1 3-2 4s-1 2-1 3"/><path d="M9 18h6"/></svg>
              01. Color Palette System
            </h2>
            <p style="font-size: 13px; color: var(--tl-sys-color-on-surface-variant); margin: 4px 0 0 0;">
              Full-spectrum 11-step tonal swatches (50 to 950). Click any swatch to copy its token name and hex value.
            </p>
          </div>
          <div style="display: flex; align-items: center; gap: 8px;">
            <span class="tl-frame-tag">Frame: 1120 × 860</span>
            <span class="tl-badge tl-badge--brand">8 Tonal Palettes</span>
          </div>
        </div>

        <div class="tl-artboard-body">
          ${colorFamilies.map(fam => `
            <div class="tl-swatch-row">
              <div class="tl-swatch-row-header">
                <strong style="font-size: 13px; color: var(--tl-sys-color-on-surface);">${fam.name}</strong>
                <span style="font-size: 11px; font-family: var(--tl-sys-font-family-code); color: var(--tl-sys-color-on-surface-muted);">11 Steps</span>
              </div>
              <div class="tl-swatch-strip">
                ${fam.swatches.map(s => {
                  const step = s.name.split("-").pop();
                  const darkRatio = ColorEngine.getContrastRatio("#000000", s.hex);
                  const whiteRatio = ColorEngine.getContrastRatio("#FFFFFF", s.hex);
                  const txtColor = darkRatio >= whiteRatio ? "#000000" : "#FFFFFF";
                  return `
                    <div class="tl-swatch-item" style="background-color: ${s.hex}; color: ${txtColor};"
                         onclick="copyToClipboard('${s.name}', '${s.name} (${s.hex})')"
                         title="Click to copy ${s.name} (${s.hex})">
                      <span style="font-weight: 700; opacity: 0.95;">${step}</span>
                      <span style="font-size: 9px; opacity: 0.8;">${s.hex}</span>
                    </div>
                  `;
                }).join("")}
              </div>
            </div>
          `).join("")}

          <!-- Semantic Roles Overview Swatch Card -->
          <div style="margin-top: 24px; padding-top: 20px; border-top: 1px solid var(--tl-sys-color-outline-variant);">
            <strong style="font-size: 13px; display: block; margin-bottom: 12px; color: var(--tl-sys-color-on-surface);">Active Semantic UI Roles (Layer 2 Mappings):</strong>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(140px, 1fr)); gap: 10px;">
              <div class="tl-card" style="padding: 10px; background: var(--tl-sys-color-primary); color: var(--tl-sys-color-on-primary);">
                <div style="font-size: 11px; opacity: 0.85;">Primary Action</div>
                <strong style="font-size: 13px;">Brand Primary</strong>
              </div>
              <div class="tl-card" style="padding: 10px; background: var(--tl-sys-color-primary-container); color: var(--tl-sys-color-on-primary-container); border: 1px solid var(--tl-sys-color-outline-variant);">
                <div style="font-size: 11px; opacity: 0.85;">Container Accent</div>
                <strong style="font-size: 13px;">Primary Tonal</strong>
              </div>
              <div class="tl-card" style="padding: 10px; background: var(--tl-sys-color-surface); color: var(--tl-sys-color-on-surface); border: 1px solid var(--tl-sys-color-outline-variant);">
                <div style="font-size: 11px; color: var(--tl-sys-color-on-surface-muted);">Base Surface</div>
                <strong style="font-size: 13px;">Canvas Surface</strong>
              </div>
              <div class="tl-card" style="padding: 10px; background: var(--tl-sys-color-surface-container); color: var(--tl-sys-color-on-surface); border: 1px solid var(--tl-sys-color-outline-variant);">
                <div style="font-size: 11px; color: var(--tl-sys-color-on-surface-muted);">Card Surface</div>
                <strong style="font-size: 13px;">Container</strong>
              </div>
              <div class="tl-card" style="padding: 10px; background: var(--tl-sys-color-success); color: var(--tl-sys-color-on-primary);">
                <div style="font-size: 11px; opacity: 0.85;">Success Role</div>
                <strong style="font-size: 13px;">Confirmed</strong>
              </div>
              <div class="tl-card" style="padding: 10px; background: var(--tl-sys-color-warning); color: #000;">
                <div style="font-size: 11px; opacity: 0.85;">Warning Role</div>
                <strong style="font-size: 13px;">Attention</strong>
              </div>
              <div class="tl-card" style="padding: 10px; background: var(--tl-sys-color-error); color: var(--tl-sys-color-on-primary);">
                <div style="font-size: 11px; opacity: 0.85;">Danger Role</div>
                <strong style="font-size: 13px;">Critical Error</strong>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- =====================================================================
           ARTBOARD 02: TYPOGRAPHY SCALE & TEXT PATTERNS
           ===================================================================== -->
      <section class="tl-artboard" id="artboard-typography">
        <div class="tl-artboard-header">
          <div>
            <h2 class="tl-artboard-title">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="4 7 4 4 20 4 20 7"/><line x1="9" y1="20" x2="15" y2="20"/><line x1="12" y1="4" x2="12" y2="20"/></svg>
              02. Typography &amp; Typographic Patterns
            </h2>
            <p style="font-size: 13px; color: var(--tl-sys-color-on-surface-variant); margin: 4px 0 0 0;">
              High-impact structural headings in Manrope paired with ergonomic Inter body copy and JetBrains Mono for code.
            </p>
          </div>
          <div style="display: flex; align-items: center; gap: 8px;">
            <span class="tl-frame-tag">Frame: 1120 × 740</span>
            <span class="tl-badge tl-badge--brand">3 Typefaces</span>
          </div>
        </div>

        <div class="tl-artboard-body">
          <div class="tl-type-poster">
            <!-- Display Large -->
            <div class="tl-type-row">
              <div class="tl-type-meta">
                <strong style="font-size: 13px; color: var(--tl-sys-color-on-surface);">Display Large</strong>
                <span class="tl-type-badge">Manrope Bold</span>
                <span class="tl-type-badge">48px / 1.15</span>
                <span class="tl-type-badge">Tracking -0.03em</span>
                <span class="tl-type-badge" style="color: var(--tl-sys-color-link);">--tl-sys-typescale-display-large-size</span>
              </div>
              <div style="font-family: var(--tl-sys-font-family-heading); font-size: clamp(32px, 4vw, 48px); font-weight: 800; line-height: 1.15; letter-spacing: -0.03em; color: var(--tl-sys-color-on-surface);">
                Craft timeless digital products at enterprise scale.
              </div>
            </div>

            <!-- Headline 1 -->
            <div class="tl-type-row">
              <div class="tl-type-meta">
                <strong style="font-size: 13px; color: var(--tl-sys-color-on-surface);">Headline 1</strong>
                <span class="tl-type-badge">Manrope Bold</span>
                <span class="tl-type-badge">30px / 1.25</span>
                <span class="tl-type-badge">Tracking -0.02em</span>
                <span class="tl-type-badge" style="color: var(--tl-sys-color-link);">--tl-sys-typescale-headline-large-size</span>
              </div>
              <div style="font-family: var(--tl-sys-font-family-heading); font-size: 30px; font-weight: 700; line-height: 1.25; letter-spacing: -0.02em; color: var(--tl-sys-color-on-surface);">
                Design once, deploy across every screen.
              </div>
            </div>

            <!-- Headline 2 -->
            <div class="tl-type-row">
              <div class="tl-type-meta">
                <strong style="font-size: 13px; color: var(--tl-sys-color-on-surface);">Headline 2</strong>
                <span class="tl-type-badge">Manrope SemiBold</span>
                <span class="tl-type-badge">24px / 1.3</span>
                <span class="tl-type-badge" style="color: var(--tl-sys-color-link);">--tl-sys-typescale-headline-medium-size</span>
              </div>
              <div style="font-family: var(--tl-sys-font-family-heading); font-size: 24px; font-weight: 600; line-height: 1.3; color: var(--tl-sys-color-on-surface);">
                Unified variables across Figma and production code.
              </div>
            </div>

            <!-- Body Large -->
            <div class="tl-type-row">
              <div class="tl-type-meta">
                <strong style="font-size: 13px; color: var(--tl-sys-color-on-surface);">Body Large</strong>
                <span class="tl-type-badge">Inter Regular</span>
                <span class="tl-type-badge">16px / 1.6</span>
                <span class="tl-type-badge" style="color: var(--tl-sys-color-link);">--tl-sys-typescale-body-large-size</span>
              </div>
              <div style="font-family: var(--tl-sys-font-family-body); font-size: 16px; line-height: 1.6; color: var(--tl-sys-color-on-surface-variant); max-width: 840px;">
                Trilayer pairs structural geometry for impact with human-centered ergonomics for extended reading. All color pairings pass WCAG 2.2 AA contrast standards automatically.
              </div>
            </div>

            <!-- Body Medium (Default UI) -->
            <div class="tl-type-row">
              <div class="tl-type-meta">
                <strong style="font-size: 13px; color: var(--tl-sys-color-on-surface);">Body Medium (Standard UI)</strong>
                <span class="tl-type-badge">Inter Regular</span>
                <span class="tl-type-badge">14px / 1.5</span>
                <span class="tl-type-badge" style="color: var(--tl-sys-color-link);">--tl-sys-typescale-body-medium-size</span>
              </div>
              <div style="font-family: var(--tl-sys-font-family-body); font-size: 14px; line-height: 1.5; color: var(--tl-sys-color-on-surface-variant); max-width: 840px;">
                The primary text style engineered for interactive controls, cards, table cells, dialogues, and form field descriptions.
              </div>
            </div>

            <!-- Body Small -->
            <div class="tl-type-row">
              <div class="tl-type-meta">
                <strong style="font-size: 13px; color: var(--tl-sys-color-on-surface);">Body Small &amp; Helper</strong>
                <span class="tl-type-badge">Inter Regular</span>
                <span class="tl-type-badge">12px / 1.4</span>
                <span class="tl-type-badge" style="color: var(--tl-sys-color-link);">--tl-sys-typescale-body-small-size</span>
              </div>
              <div style="font-family: var(--tl-sys-font-family-body); font-size: 12px; line-height: 1.4; color: var(--tl-sys-color-on-surface-muted);">
                Microcopy, auxiliary helper notes, timestamps, and compact status metadata.
              </div>
            </div>

            <!-- Label Caps -->
            <div class="tl-type-row">
              <div class="tl-type-meta">
                <strong style="font-size: 13px; color: var(--tl-sys-color-on-surface);">Label Caps (Overline)</strong>
                <span class="tl-type-badge">Inter 700 Caps</span>
                <span class="tl-type-badge">11px / Tracking 0.08em</span>
                <span class="tl-type-badge" style="color: var(--tl-sys-color-link);">--tl-sys-typescale-label-caps-size</span>
              </div>
              <div style="font-family: var(--tl-sys-font-family-body); font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; color: var(--tl-sys-color-on-surface-muted);">
                SYSTEM ARCHITECTURE &bull; TOKEN CATALOG &bull; COMPONENT SPECIFICATION
              </div>
            </div>

            <!-- Code Monospace -->
            <div class="tl-type-row" style="border-bottom: none;">
              <div class="tl-type-meta">
                <strong style="font-size: 13px; color: var(--tl-sys-color-on-surface);">Code Monospace</strong>
                <span class="tl-type-badge">JetBrains Mono</span>
                <span class="tl-type-badge">13px / 1.5</span>
                <span class="tl-type-badge" style="color: var(--tl-sys-color-link);">--tl-sys-font-family-code</span>
              </div>
              <div style="font-family: var(--tl-sys-font-family-code); font-size: 13px; color: var(--tl-sys-color-link); background: var(--tl-sys-color-surface-container); padding: 10px 14px; border-radius: var(--tl-sys-shape-xs); display: inline-block;">
                const buttonToken = var(--tl-comp-button-primary-bg);
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- =====================================================================
           ARTBOARD 03: SPATIAL SYSTEM, RADII & ELEVATION DEPTH
           ===================================================================== -->
      <section class="tl-artboard" id="artboard-spatial">
        <div class="tl-artboard-header">
          <div>
            <h2 class="tl-artboard-title">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/></svg>
              03. Spacing, Corner Radii &amp; Elevation Depth
            </h2>
            <p style="font-size: 13px; color: var(--tl-sys-color-on-surface-variant); margin: 4px 0 0 0;">
              Predictable 4px/8px modular cadence, ergonomic soft corners, and layered ambient + key drop shadows.
            </p>
          </div>
          <div style="display: flex; align-items: center; gap: 8px;">
            <span class="tl-frame-tag">Frame: 1120 × 620</span>
            <span class="tl-badge tl-badge--brand">Spatial Rhythm</span>
          </div>
        </div>

        <div class="tl-artboard-body">
          <!-- Spacing Visual Rulers -->
          <div style="margin-bottom: 28px;">
            <strong style="font-size: 13px; display: block; margin-bottom: 12px; color: var(--tl-sys-color-on-surface);">Modular Spacing Bars (2px &ndash; 64px):</strong>
            <div style="display: flex; flex-direction: column; gap: 8px;">
              ${spacingScale.slice(1, 9).map(item => `
                <div style="display: flex; align-items: center; gap: 12px;">
                  <span style="font-family: var(--tl-sys-font-family-code); font-size: 11px; min-width: 44px; color: var(--tl-sys-color-on-surface); font-weight: 600;">${item.value}</span>
                  <div style="height: 18px; width: ${item.value}; background: var(--tl-sys-color-primary); border-radius: var(--tl-sys-shape-xs); min-width: 4px;"></div>
                  <span style="font-family: var(--tl-sys-font-family-code); font-size: 11px; color: var(--tl-sys-color-on-surface-muted);">${item.token}</span>
                  <span style="font-size: 12px; color: var(--tl-sys-color-on-surface-variant); margin-left: auto;">${item.role}</span>
                </div>
              `).join("")}
            </div>
          </div>

          <!-- Corner Radii & Elevation in 2 Columns -->
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 24px; padding-top: 20px; border-top: 1px solid var(--tl-sys-color-outline-variant);">
            <!-- Corner Radii -->
            <div>
              <strong style="font-size: 13px; display: block; margin-bottom: 12px; color: var(--tl-sys-color-on-surface);">Corner Radii Scale:</strong>
              <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(120px, 1fr)); gap: 10px;">
                ${shapeScale.map(sh => `
                  <div class="tl-card" style="padding: 12px; border-radius: ${sh.value}; background: var(--tl-sys-color-surface-container); text-align: center;">
                    <strong style="font-size: 14px; display: block;">${sh.value}</strong>
                    <span style="font-size: 11px; color: var(--tl-sys-color-on-surface-muted);">${sh.role}</span>
                  </div>
                `).join("")}
              </div>
            </div>

            <!-- Elevation Depth -->
            <div>
              <strong style="font-size: 13px; display: block; margin-bottom: 12px; color: var(--tl-sys-color-on-surface);">Elevation &amp; Shadow Levels:</strong>
              <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(120px, 1fr)); gap: 10px;">
                ${elevationScale.slice(0, 4).map(el => `
                  <div class="tl-card" style="padding: 14px; box-shadow: var(${el.token}); background: var(--tl-sys-color-surface); text-align: center;">
                    <strong style="font-size: 13px; display: block;">${el.level}</strong>
                    <span style="font-size: 10px; color: var(--tl-sys-color-on-surface-muted);">${el.role}</span>
                  </div>
                `).join("")}
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- =====================================================================
           ARTBOARD 04: REUSABLE COMPONENT SHOWCASE (Full Figma Component Sheet)
           ===================================================================== -->
      <section class="tl-artboard" id="artboard-components">
        <div class="tl-artboard-header">
          <div>
            <h2 class="tl-artboard-title">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16.5 9.4 7.55 4.24a1.78 1.78 0 0 0-2.5 1.55v12.42a1.78 1.78 0 0 0 2.5 1.55L16.5 14.6a1.78 1.78 0 0 0 0-3.2z"/></svg>
              04. Reusable UI Components
            </h2>
            <p style="font-size: 13px; color: var(--tl-sys-color-on-surface-variant); margin: 4px 0 0 0;">
              Production components across variants, sizes, and interactive states.
            </p>
          </div>
          <div style="display: flex; align-items: center; gap: 8px;">
            <span class="tl-frame-tag">Frame: 1120 × 1400</span>
            <span class="tl-badge tl-badge--brand">Live Interactive</span>
          </div>
        </div>

        <div class="tl-artboard-body">
          <div class="tl-component-grid">

            <!-- 1. Buttons Matrix -->
            <div class="tl-component-card" style="grid-column: 1 / -1;">
              <h3 class="tl-component-card-title">Buttons &bull; Variants, Sizes &amp; States</h3>
              
              <!-- Variant Row -->
              <div style="display: flex; gap: 12px; flex-wrap: wrap; align-items: center;">
                <button class="tl-btn tl-btn--primary" onclick="Toast.show({ message: 'Primary Button Clicked', type: 'info' })">Primary Action</button>
                <button class="tl-btn tl-btn--secondary" onclick="Toast.show({ message: 'Secondary Button Clicked', type: 'info' })">Secondary Tonal</button>
                <button class="tl-btn tl-btn--outline" onclick="Toast.show({ message: 'Outline Button Clicked', type: 'info' })">Outline Border</button>
                <button class="tl-btn tl-btn--ghost" onclick="Toast.show({ message: 'Ghost Button Clicked', type: 'info' })">Ghost Flat</button>
                <button class="tl-btn tl-btn--danger" onclick="Toast.show({ message: 'Destructive Action Triggered', type: 'error' })">Destructive</button>
              </div>

              <!-- Sizes Row -->
              <div style="display: flex; gap: 12px; flex-wrap: wrap; align-items: center; padding-top: 12px; border-top: 1px solid var(--tl-sys-color-outline-variant);">
                <button class="tl-btn tl-btn--primary tl-btn--lg">Large (48px)</button>
                <button class="tl-btn tl-btn--primary tl-btn--md">Medium (40px)</button>
                <button class="tl-btn tl-btn--primary tl-btn--sm">Small (32px)</button>
              </div>

              <!-- States & Icons Row -->
              <div style="display: flex; gap: 12px; flex-wrap: wrap; align-items: center; padding-top: 12px; border-top: 1px solid var(--tl-sys-color-outline-variant);">
                <button class="tl-btn tl-btn--primary" disabled>Disabled State</button>
                <button class="tl-btn tl-btn--primary is-loading">Loading</button>
                <button class="tl-btn tl-btn--primary">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                  Leading Icon
                </button>
                <button class="tl-btn tl-btn--secondary">
                  Trailing Icon
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"/></svg>
                </button>
                <button class="tl-btn-icon tl-btn-icon--md" aria-label="Settings action">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
                </button>
              </div>
            </div>

            <!-- 2. Form Fields & Controls -->
            <div class="tl-component-card">
              <h3 class="tl-component-card-title">Form Controls &bull; Inputs &amp; Switches</h3>
              
              <div class="tl-form-group">
                <label class="tl-label" for="demo-input-name">Full Name</label>
                <input type="text" id="demo-input-name" class="tl-input" placeholder="e.g. Alex Morgan" value="Alex Morgan">
              </div>

              <div class="tl-form-group">
                <label class="tl-label" for="demo-input-err">Email Address <span class="tl-label-required">*</span></label>
                <input type="email" id="demo-input-err" class="tl-input tl-input--error" value="invalid-email" aria-invalid="true">
                <span class="tl-helper-text tl-helper-text--error">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                  Please enter a valid email address
                </span>
              </div>

              <div style="display: flex; flex-direction: column; gap: 10px; padding-top: 12px; border-top: 1px solid var(--tl-sys-color-outline-variant);">
                <label class="tl-checkbox-label">
                  <input type="checkbox" class="tl-checkbox-input" checked>
                  <span>Remember preferences</span>
                </label>
                <label class="tl-switch-label">
                  <input type="checkbox" class="tl-switch-input" checked>
                  <span class="tl-switch-track"><span class="tl-switch-thumb"></span></span>
                  <span>Enable push notifications</span>
                </label>
              </div>
            </div>

            <!-- 3. Badges, Status Dots & Chips -->
            <div class="tl-component-card">
              <h3 class="tl-component-card-title">Status Badges, Indicators &amp; Chips</h3>
              
              <div style="display: flex; gap: 8px; flex-wrap: wrap;">
                <span class="tl-badge tl-badge--neutral">Draft</span>
                <span class="tl-badge tl-badge--brand">Active</span>
                <span class="tl-badge tl-badge--success">Published</span>
                <span class="tl-badge tl-badge--warning">Pending</span>
                <span class="tl-badge tl-badge--danger">Archived</span>
              </div>

              <div style="display: flex; gap: 16px; align-items: center; padding-top: 12px; border-top: 1px solid var(--tl-sys-color-outline-variant);">
                <div style="display: flex; align-items: center; gap: 6px; font-size: 13px;">
                  <span style="width: 8px; height: 8px; border-radius: 9999px; background: var(--tl-sys-color-success);"></span>
                  Online
                </div>
                <div style="display: flex; align-items: center; gap: 6px; font-size: 13px;">
                  <span style="width: 8px; height: 8px; border-radius: 9999px; background: var(--tl-sys-color-warning);"></span>
                  Away
                </div>
                <div style="display: flex; align-items: center; gap: 6px; font-size: 13px;">
                  <span style="width: 8px; height: 8px; border-radius: 9999px; background: var(--tl-sys-color-error);"></span>
                  Busy
                </div>
              </div>

              <div style="display: flex; gap: 8px; flex-wrap: wrap; padding-top: 12px; border-top: 1px solid var(--tl-sys-color-outline-variant);">
                <button class="tl-chip tl-chip--selected">
                  <span>Design Tokens</span> &check;
                </button>
                <button class="tl-chip">
                  <span>Figma Variables</span>
                </button>
                <button class="tl-chip">
                  <span>WCAG 2.2</span>
                </button>
              </div>
            </div>

            <!-- 4. Interactive Metric / Surface Card -->
            <div class="tl-component-card">
              <h3 class="tl-component-card-title">Card Surfaces &bull; KPI Metric Card</h3>
              
              <div class="tl-card" style="padding: 18px; background: var(--tl-sys-color-surface);">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
                  <span style="font-size: 12px; color: var(--tl-sys-color-on-surface-muted); font-weight: 600; text-transform: uppercase;">Total Token Adoptions</span>
                  <span class="tl-badge tl-badge--success">+24.5%</span>
                </div>
                <div style="font-size: 28px; font-weight: 800; font-family: var(--tl-sys-font-family-heading); color: var(--tl-sys-color-on-surface); margin-bottom: 6px;">
                  1,420,890
                </div>
                <p style="font-size: 12px; color: var(--tl-sys-color-on-surface-variant); margin-bottom: 14px;">
                  Live component instances across web and Figma libraries.
                </p>
                <div style="height: 6px; width: 100%; background: var(--tl-sys-color-surface-container-high); border-radius: 9999px; overflow: hidden;">
                  <div style="height: 100%; width: 78%; background: var(--tl-sys-color-primary); border-radius: 9999px;"></div>
                </div>
              </div>
            </div>

            <!-- 5. User Profile Card -->
            <div class="tl-component-card">
              <h3 class="tl-component-card-title">Card Surfaces &bull; User Profile Card</h3>
              
              <div class="tl-card" style="padding: 16px; display: flex; align-items: center; gap: 14px; background: var(--tl-sys-color-surface);">
                <div style="width: 44px; height: 44px; border-radius: 9999px; background: var(--tl-sys-color-primary); color: #fff; display: grid; place-content: center; font-weight: 700; position: relative;">
                  DW
                  <span style="position: absolute; bottom: 0; right: 0; width: 10px; height: 10px; border-radius: 9999px; background: var(--tl-sys-color-success); border: 2px solid var(--tl-sys-color-surface);"></span>
                </div>
                <div style="flex: 1;">
                  <strong style="font-size: 14px; color: var(--tl-sys-color-on-surface); display: block;">Devin Walker</strong>
                  <span style="font-size: 12px; color: var(--tl-sys-color-on-surface-muted);">Principal Design Architect</span>
                </div>
                <span class="tl-badge tl-badge--brand">Admin</span>
              </div>
            </div>

            <!-- 6. Overlays & Toast Trigger -->
            <div class="tl-component-card">
              <h3 class="tl-component-card-title">Feedback &bull; Live Toast Alerts</h3>
              
              <div style="display: flex; gap: 8px; flex-wrap: wrap;">
                <button class="tl-btn tl-btn--outline tl-btn--sm" onclick="Toast.show({ message: 'Changes saved successfully!', type: 'success' })">Trigger Success Toast</button>
                <button class="tl-btn tl-btn--outline tl-btn--sm" onclick="Toast.show({ message: 'Warning: Unsaved draft exists', type: 'warning' })">Trigger Warning Toast</button>
                <button class="tl-btn tl-btn--outline tl-btn--sm" onclick="Toast.show({ message: 'Error loading token schema', type: 'error' })">Trigger Error Toast</button>
              </div>

              <div style="margin-top: 12px; padding: 12px; background: var(--tl-sys-color-surface-container); border-radius: var(--tl-sys-shape-control); font-size: 13px;">
                Toasts auto-dismiss after 4 seconds and pause on hover/focus.
              </div>
            </div>

          </div>
        </div>
      </section>

      <!-- =====================================================================
           THE THREE-LAYER ARCHITECTURE RULE (Core System Architecture)
           ===================================================================== -->
      <section class="card" style="margin-bottom: 40px; border-left: 4px solid var(--tl-sys-color-primary);">
        <h2 style="font-size: 20px; margin-bottom: 12px; display: flex; align-items: center; gap: 10px;">
          <svg class="tl-brand-logo-svg" viewBox="0 0 32 32" fill="none">
            <path d="M16 3L30 10L16 17L2 10L16 3Z" fill="var(--tl-sys-color-layer-component)" opacity="0.9"/>
            <path d="M16 10L30 17L16 24L2 17L16 10Z" fill="var(--tl-sys-color-layer-semantic)" opacity="0.95"/>
            <path d="M16 17L30 24L16 31L2 24L16 17Z" fill="var(--tl-sys-color-layer-primitives)"/>
          </svg>
          The Three-Layer Architecture Rule
        </h2>
        <p style="margin-bottom: 20px; font-size: 14px; color: var(--tl-sys-color-on-surface-variant);">
          Every element in Trilayer resolves down a one-way dependency chain. Components may only reference component tokens; semantic tokens adapt to mode; primitives store immutable scales.
        </p>

        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 16px;">
          <div style="padding: 16px; border-radius: var(--tl-sys-shape-container); background: var(--tl-sys-color-surface-container); border: 1px solid var(--tl-sys-color-outline-variant);">
            <span class="layer-badge layer-badge--comp" style="margin-bottom: 8px;">Layer 3: Component</span>
            <h3 style="font-size: 15px; margin-bottom: 6px;">--tl-comp-*</h3>
            <p style="font-size: 13px;">Scoped tokens defining component anatomy, hit areas, and states. Never references primitives.</p>
          </div>

          <div style="padding: 16px; border-radius: var(--tl-sys-shape-container); background: var(--tl-sys-color-surface-container); border: 1px solid var(--tl-sys-color-outline-variant);">
            <span class="layer-badge layer-badge--sem" style="margin-bottom: 8px;">Layer 2: Semantic</span>
            <h3 style="font-size: 15px; margin-bottom: 6px;">--tl-sys-*</h3>
            <p style="font-size: 13px;">Role-based intent tokens. Adapts dynamically to light/dark themes and density modes.</p>
          </div>

          <div style="padding: 16px; border-radius: var(--tl-sys-shape-container); background: var(--tl-sys-color-surface-container); border: 1px solid var(--tl-sys-color-outline-variant);">
            <span class="layer-badge layer-badge--prim" style="margin-bottom: 8px;">Layer 1: Primitives</span>
            <h3 style="font-size: 15px; margin-bottom: 6px;">--tl-ref-*</h3>
            <p style="font-size: 13px;">Raw color ramps, 4px/8px spacing scales, and radii with zero contextual meaning.</p>
          </div>
        </div>
      </section>

      <!-- Pagination to next page -->
      <div class="tl-page-pagination">
        <div></div>
        <a href="#/components" class="tl-page-pagination-link tl-page-pagination-link--next">
          <span class="tl-page-pagination-dir">Next Section &rarr;</span>
          <span class="tl-page-pagination-title">Browse All 11 Components</span>
        </a>
      </div>
    `;
  }

  renderTokenLayers() {
    this.container.innerHTML = `
      <div class="tl-page-header">
        <div class="tl-page-title-row">
          <h1 class="tl-page-title">The Three Layers</h1>
          <span class="tl-nav-badge tl-nav-badge--stable">Architecture Core</span>
        </div>
        <p class="tl-page-subtitle">
          How Trilayer decouples design decisions across three isolated token tiers to prevent style leaks, allow instant theme swaps, and support seamless dark mode.
        </p>
      </div>

      <div class="card" style="margin-bottom: 32px;">
        <h2 style="font-size: 18px; margin-bottom: 12px;">Live Token Chain Inspection</h2>
        <p style="font-size: 14px; margin-bottom: 20px;">
          Select any element to trace how its style flows from raw primitive hex, through semantic purpose, into scoped component consumption:
        </p>

        <div class="token-chain-list">
          ${sampleTokenChains.map(item => `
            <div class="token-chain-item">
              <strong style="min-width: 180px;">${item.element}:</strong>
              <span class="token-pill" style="border-color: var(--tl-sys-color-layer-component);">${item.componentToken}</span>
              <span class="arrow">&rarr;</span>
              <span class="token-pill" style="border-color: var(--tl-sys-color-layer-semantic);">${item.semanticToken}</span>
              <span class="arrow">&rarr;</span>
              <span class="token-pill" style="border-color: var(--tl-sys-color-layer-primitives);">${item.primitiveTokenLight}</span>
              <span class="arrow">&rarr;</span>
              <strong style="font-family: var(--tl-sys-font-family-code);">${item.valueLight}</strong>
            </div>
          `).join("")}
        </div>
      </div>

      <div class="tl-page-pagination">
        <a href="#/tokens" class="tl-page-pagination-link">
          <span class="tl-page-pagination-dir">&larr; Previous</span>
          <span class="tl-page-pagination-title">Tokens Overview</span>
        </a>
        <a href="#/tokens/reference" class="tl-page-pagination-link tl-page-pagination-link--next">
          <span class="tl-page-pagination-dir">Next Page &rarr;</span>
          <span class="tl-page-pagination-title">Token Reference</span>
        </a>
      </div>
    `;
  }

  renderComponentsDirectory() {
    this.container.innerHTML = `
      <div class="tl-page-header">
        <div class="tl-page-title-row">
          <h1 class="tl-page-title">Components Overview</h1>
          <span class="tl-badge tl-badge--brand">${componentsList.length} Components Available</span>
        </div>
        <p class="tl-page-subtitle">
          Every component in Trilayer is constructed using scoped component tokens, honoring accessible keyboard states, and fully tested in Light and Dark themes.
        </p>
      </div>

      <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 16px; margin-bottom: 32px;">
        ${componentsList.map(comp => `
          <a href="#/components/${comp.id}" class="tl-card tl-card--interactive" style="text-decoration: none;">
            <div class="tl-card-header">
              <h2 class="tl-card-title" style="font-size: 16px;">${comp.title}</h2>
              <span class="tl-nav-badge tl-nav-badge--${(comp.status || 'stable').toLowerCase()}">${comp.status}</span>
            </div>
            <p class="tl-card-body" style="font-size: 13px; margin-bottom: 12px;">${comp.description}</p>
            <div class="tl-card-footer" style="padding-top: 10px;">
              <span style="font-size: 12px; font-weight: 600; color: var(--tl-sys-color-link);">View Spec &amp; Token Chain &rarr;</span>
            </div>
          </a>
        `).join("")}
      </div>

      <div class="tl-page-pagination">
        <a href="#/tokens" class="tl-page-pagination-link">
          <span class="tl-page-pagination-dir">&larr; Previous</span>
          <span class="tl-page-pagination-title">Design Tokens</span>
        </a>
        <a href="#/patterns" class="tl-page-pagination-link tl-page-pagination-link--next">
          <span class="tl-page-pagination-dir">Next Section &rarr;</span>
          <span class="tl-page-pagination-title">Patterns &amp; Templates</span>
        </a>
      </div>
    `;
  }

  renderStandardPage(sectionTitle, item, path) {
    const badge = item.status 
      ? `<span class="tl-nav-badge tl-nav-badge--${item.status.toLowerCase()}">${item.status}</span>`
      : "";

    this.container.innerHTML = `
      <div class="tl-page-header">
        <div class="tl-page-title-row">
          <h1 class="tl-page-title">${item.title}</h1>
          ${badge}
        </div>
        <p class="tl-page-subtitle">
          Documentation and technical specifications for ${item.title} in the Trilayer Design System.
        </p>
      </div>

      <div class="card" style="margin-bottom: 32px;">
        <h2 style="font-size: 18px; margin-bottom: 12px;">Overview &amp; Purpose</h2>
        <p style="font-size: 14px; margin-bottom: 16px;">
          Part of the <strong>${sectionTitle}</strong> collection. Ready for live component specimens and token mapping in Wave 2.
        </p>
        <div style="padding: 12px 16px; background: var(--tl-sys-color-surface-container); border-radius: var(--tl-sys-shape-control); font-family: var(--tl-sys-font-family-code); font-size: 13px; color: var(--tl-sys-color-on-surface-variant);">
          Route: <strong>#${path}</strong>
        </div>
      </div>

      <div class="tl-page-pagination">
        <a href="#/" class="tl-page-pagination-link">
          <span class="tl-page-pagination-dir">&larr; Return Home</span>
          <span class="tl-page-pagination-title">Three layers. One source of truth.</span>
        </a>
        <a href="#/components" class="tl-page-pagination-link tl-page-pagination-link--next">
          <span class="tl-page-pagination-dir">Explore &rarr;</span>
          <span class="tl-page-pagination-title">Components Registry</span>
        </a>
      </div>
    `;
  }

  render404(path) {
    this.container.innerHTML = `
      <div class="tl-page-header">
        <h1 class="tl-page-title">404: Page Not Found</h1>
        <p class="tl-page-subtitle">
          No documentation matches the route <code>#${path}</code>.
        </p>
      </div>
      <div class="card">
        <p style="margin-bottom: 16px;">The requested URL could not be resolved in the navigation registry.</p>
        <a href="#/" class="tl-btn tl-btn--primary" style="text-decoration: none;">
          &larr; Back to Trilayer Home
        </a>
      </div>
    `;
  }
}

