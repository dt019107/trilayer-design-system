/**
 * TRILAYER DESIGN SYSTEM — REMAINING SECTIONS RENDERER (PHASE 8)
 * Renders Get Started, Tokens Reference & Naming, Patterns, Content Guidelines,
 * Resources (Changelog, Roadmap, Migration), and Contribution Guidelines.
 */

export const ContentPages = {
  /* ==========================================================================
     1. GET STARTED
     ========================================================================== */
  renderGetStarted() {
    return `
      <div class="tl-page-header">
        <div class="tl-page-title-row">
          <h1 class="tl-page-title">Getting Started</h1>
          <span class="tl-badge tl-badge--brand">v2.0 Architecture</span>
        </div>
        <p class="tl-page-subtitle">
          Trilayer is engineered for seamless collaboration between designers and front-end engineers using a unified three-layer token contract.
        </p>
      </div>

      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px; margin-bottom: 32px;">
        <a href="#/get-started/designers" class="tl-card tl-card--interactive" style="text-decoration: none;">
          <div class="tl-card-header">
            <h2 class="tl-card-title" style="font-size: 18px;">For Designers</h2>
            <span class="tl-badge tl-badge--brand">Figma Kit</span>
          </div>
          <p class="tl-card-body" style="font-size: 13px;">
            Figma variables architecture, Auto Layout V5 conventions, component properties, and token synchronization.
          </p>
          <div class="tl-card-footer">
            <span style="font-size: 13px; font-weight: 600; color: var(--tl-sys-color-link);">Designer Guide &rarr;</span>
          </div>
        </a>

        <a href="#/get-started/developers" class="tl-card tl-card--interactive" style="text-decoration: none;">
          <div class="tl-card-header">
            <h2 class="tl-card-title" style="font-size: 18px;">For Developers</h2>
            <span class="tl-badge tl-badge--success">Zero-Build</span>
          </div>
          <p class="tl-card-body" style="font-size: 13px;">
            Vanilla HTML, CSS custom properties, and ES module controllers. Deploy anywhere without compilation tools.
          </p>
          <div class="tl-card-footer">
            <span style="font-size: 13px; font-weight: 600; color: var(--tl-sys-color-link);">Developer Guide &rarr;</span>
          </div>
        </a>

        <a href="#/get-started/installation" class="tl-card tl-card--interactive" style="text-decoration: none;">
          <div class="tl-card-header">
            <h2 class="tl-card-title" style="font-size: 18px;">Installation</h2>
            <span class="tl-badge tl-badge--neutral">CDN / Static</span>
          </div>
          <p class="tl-card-body" style="font-size: 13px;">
            Import the 3-layer CSS cascade, Google Fonts pairing, and base reset in under 60 seconds.
          </p>
          <div class="tl-card-footer">
            <span style="font-size: 13px; font-weight: 600; color: var(--tl-sys-color-link);">Quick Setup &rarr;</span>
          </div>
        </a>
      </div>

      <div class="tl-page-pagination">
        <a href="#/" class="tl-page-pagination-link">
          <span class="tl-page-pagination-dir">&larr; Previous</span>
          <span class="tl-page-pagination-title">Home</span>
        </a>
        <a href="#/get-started/designers" class="tl-page-pagination-link tl-page-pagination-link--next">
          <span class="tl-page-pagination-dir">Next Page &rarr;</span>
          <span class="tl-page-pagination-title">For Designers</span>
        </a>
      </div>
    `;
  },

  renderDesigners() {
    return `
      <div class="tl-page-header">
        <div class="tl-page-title-row">
          <h1 class="tl-page-title">Trilayer for Designers</h1>
          <span class="tl-badge tl-badge--brand">Figma Variables</span>
        </div>
        <p class="tl-page-subtitle">
          How to design with Trilayer's 3-layer tokens in Figma using Collections, Modes, Component Properties, and Auto Layout.
        </p>
      </div>

      <div class="card" style="margin-bottom: 24px;">
        <h2 style="font-size: 18px; margin-bottom: 12px;">1. Figma Variable Collections</h2>
        <p style="font-size: 14px; margin-bottom: 16px;">
          Trilayer mirrors the exact CSS architecture inside Figma via three distinct variable collections:
        </p>
        <ul style="padding-left: 20px; font-size: 13px; line-height: 1.8; color: var(--tl-sys-color-on-surface-variant);">
          <li><strong>Primitives Collection:</strong> Stores raw color ramps (Indigo 25-950, Slate 0-1000) and spacing numbers (4, 8, 12, 16).</li>
          <li><strong>Semantic Collection (with Modes):</strong> Contains Light and Dark modes. Aliases primitives (e.g. <code>color/primary</code> &rarr; <code>indigo-500</code> in Light, <code>indigo-400</code> in Dark).</li>
          <li><strong>Components Collection:</strong> Scoped variables for buttons, inputs, dialogs, and cards. Aliases semantic roles exclusively.</li>
        </ul>
      </div>

      <div class="card" style="margin-bottom: 32px;">
        <h2 style="font-size: 18px; margin-bottom: 12px;">2. Auto Layout &amp; Component Properties</h2>
        <p style="font-size: 14px; margin-bottom: 16px;">
          To avoid variant explosion (hundreds of redundant frame boxes), Trilayer uses Component Properties:
        </p>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 16px;">
          <div style="padding: 16px; background: var(--tl-sys-color-surface-container); border-radius: var(--tl-sys-shape-control);">
            <strong>Boolean Property:</strong> Toggles leading/trailing icons or loading spinners on and off without variant switches.
          </div>
          <div style="padding: 16px; background: var(--tl-sys-color-surface-container); border-radius: var(--tl-sys-shape-control);">
            <strong>Text Property:</strong> Exposes label text directly in the sidebar for rapid copywriting.
          </div>
          <div style="padding: 16px; background: var(--tl-sys-color-surface-container); border-radius: var(--tl-sys-shape-control);">
            <strong>Instance Swap:</strong> Allows swapping icon glyphs directly from your shared icon library.
          </div>
        </div>
      </div>

      <div class="tl-page-pagination">
        <a href="#/get-started" class="tl-page-pagination-link">
          <span class="tl-page-pagination-dir">&larr; Previous</span>
          <span class="tl-page-pagination-title">Get Started</span>
        </a>
        <a href="#/get-started/developers" class="tl-page-pagination-link tl-page-pagination-link--next">
          <span class="tl-page-pagination-dir">Next Page &rarr;</span>
          <span class="tl-page-pagination-title">For Developers</span>
        </a>
      </div>
    `;
  },

  renderDevelopers() {
    return `
      <div class="tl-page-header">
        <div class="tl-page-title-row">
          <h1 class="tl-page-title">Trilayer for Developers</h1>
          <span class="tl-badge tl-badge--success">ES Modules &amp; Vanilla CSS</span>
        </div>
        <p class="tl-page-subtitle">
          Built with zero dependencies, no heavy build pipelines, and complete framework interoperability (React, Vue, Svelte, or plain HTML).
        </p>
      </div>

      <div class="card" style="margin-bottom: 24px;">
        <h2 style="font-size: 18px; margin-bottom: 12px;">Architecture Guarantees</h2>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 16px;">
          <div style="padding: 16px; background: var(--tl-sys-color-surface-container); border-radius: var(--tl-sys-shape-control);">
            <strong style="color: var(--tl-sys-color-link);">1. Zero Hex in Components</strong>
            <p style="font-size: 13px; margin: 4px 0 0;">Never write a hardcoded hex code in component CSS. Every color binds to <code>--tl-comp-*</code>.</p>
          </div>
          <div style="padding: 16px; background: var(--tl-sys-color-surface-container); border-radius: var(--tl-sys-shape-control);">
            <strong style="color: var(--tl-sys-color-link);">2. Instant Theme Swaps</strong>
            <p style="font-size: 13px; margin: 4px 0 0;">Toggle <code>data-theme="light"</code> or <code>"dark"</code> on <code>&lt;html&gt;</code> to transform every surface instantly.</p>
          </div>
          <div style="padding: 16px; background: var(--tl-sys-color-surface-container); border-radius: var(--tl-sys-shape-control);">
            <strong style="color: var(--tl-sys-color-link);">3. Density Scaling</strong>
            <p style="font-size: 13px; margin: 4px 0 0;">Toggle <code>data-density="compact"</code> or <code>"comfortable"</code> for data-heavy tabular screens.</p>
          </div>
        </div>
      </div>

      <div class="tl-page-pagination">
        <a href="#/get-started/designers" class="tl-page-pagination-link">
          <span class="tl-page-pagination-dir">&larr; Previous</span>
          <span class="tl-page-pagination-title">For Designers</span>
        </a>
        <a href="#/get-started/installation" class="tl-page-pagination-link tl-page-pagination-link--next">
          <span class="tl-page-pagination-dir">Next Page &rarr;</span>
          <span class="tl-page-pagination-title">Installation</span>
        </a>
      </div>
    `;
  },

  renderInstallation() {
    return `
      <div class="tl-page-header">
        <div class="tl-page-title-row">
          <h1 class="tl-page-title">Installation &amp; Setup</h1>
          <span class="tl-badge tl-badge--brand">Static Integration</span>
        </div>
        <p class="tl-page-subtitle">
          Include Trilayer in any web application by linking the CSS token layers and base typography.
        </p>
      </div>

      <div class="tl-code-block-wrapper">
        <div class="tl-code-header">
          <span style="font-size: 13px; font-weight: 600; color: var(--tl-sys-color-on-surface);">HTML &lt;head&gt; Cascade</span>
          <button class="tl-copy-code-btn" onclick="copyToClipboard(document.getElementById('install-code').textContent, 'Installation snippet copied!')">
            Copy Snippet
          </button>
        </div>
        <pre class="tl-code-pre"><code id="install-code">&lt;!-- Trilayer 3-Layer Token Cascade --&gt;
&lt;link rel="stylesheet" href="css/tokens.primitives.css"&gt;
&lt;link rel="stylesheet" href="css/tokens.semantic.css"&gt;
&lt;link rel="stylesheet" href="css/tokens.components.css"&gt;
&lt;link rel="stylesheet" href="css/base.css"&gt;

&lt;!-- Component Stylesheets as Needed --&gt;
&lt;link rel="stylesheet" href="css/components/button.css"&gt;
&lt;link rel="stylesheet" href="css/components/input.css"&gt;
&lt;link rel="stylesheet" href="css/components/card.css"&gt;</code></pre>
      </div>

      <div class="tl-page-pagination">
        <a href="#/get-started/developers" class="tl-page-pagination-link">
          <span class="tl-page-pagination-dir">&larr; Previous</span>
          <span class="tl-page-pagination-title">For Developers</span>
        </a>
        <a href="#/tokens/layers" class="tl-page-pagination-link tl-page-pagination-link--next">
          <span class="tl-page-pagination-dir">Next Page &rarr;</span>
          <span class="tl-page-pagination-title">The Three Layers</span>
        </a>
      </div>
    `;
  },

  /* ==========================================================================
     2. TOKENS: REFERENCE & NAMING
     ========================================================================== */
  renderTokenReference() {
    return `
      <div class="tl-page-header">
        <div class="tl-page-title-row">
          <h1 class="tl-page-title">Token Reference Guide</h1>
          <span class="tl-badge tl-badge--brand">Full Catalog</span>
        </div>
        <p class="tl-page-subtitle">
          Comprehensive dictionary of prefixes, layer boundaries, and recommended token usages.
        </p>
      </div>

      <div class="card" style="margin-bottom: 32px;">
        <h2 style="font-size: 18px; margin-bottom: 12px;">Layer Prefixes &amp; Strict Scope</h2>
        <div style="overflow-x: auto;">
          <table style="width: 100%; border-collapse: collapse; font-size: 13px;">
          <thead>
            <tr style="border-bottom: 2px solid var(--tl-sys-color-outline-variant); text-align: left;">
              <th style="padding: 10px 12px;">Layer Tier</th>
              <th style="padding: 10px 12px;">Prefix</th>
              <th style="padding: 10px 12px;">Can Alias</th>
              <th style="padding: 10px 12px;">Example</th>
            </tr>
          </thead>
          <tbody>
            <tr style="border-bottom: 1px solid var(--tl-sys-color-outline-variant);">
              <td style="padding: 10px 12px;"><strong>Layer 1: Primitives</strong></td>
              <td style="padding: 10px 12px;"><code style="color: var(--tl-sys-color-layer-primitives);">--tl-ref-*</code></td>
              <td style="padding: 10px 12px;">None (Raw hex, px, ms, ratios)</td>
              <td style="padding: 10px 12px;"><code>--tl-ref-indigo-500: #5B5BD6;</code></td>
            </tr>
            <tr style="border-bottom: 1px solid var(--tl-sys-color-outline-variant);">
              <td style="padding: 10px 12px;"><strong>Layer 2: Semantic</strong></td>
              <td style="padding: 10px 12px;"><code style="color: var(--tl-sys-color-layer-semantic);">--tl-sys-*</code></td>
              <td style="padding: 10px 12px;">Primitives (<code>--tl-ref-*</code>)</td>
              <td style="padding: 10px 12px;"><code>--tl-sys-color-primary: var(--tl-ref-indigo-500);</code></td>
            </tr>
            <tr style="border-bottom: 1px solid var(--tl-sys-color-outline-variant);">
              <td style="padding: 10px 12px;"><strong>Layer 3: Component</strong></td>
              <td style="padding: 10px 12px;"><code style="color: var(--tl-sys-color-layer-component);">--tl-comp-*</code></td>
              <td style="padding: 10px 12px;">Semantic roles (<code>--tl-sys-*</code>)</td>
              <td style="padding: 10px 12px;"><code>--tl-comp-button-primary-bg: var(--tl-sys-color-primary);</code></td>
            </tr>
          </tbody>
        </table>
        </div>
      </div>

      <div class="tl-page-pagination">
        <a href="#/tokens/layers" class="tl-page-pagination-link">
          <span class="tl-page-pagination-dir">&larr; Previous</span>
          <span class="tl-page-pagination-title">The Three Layers</span>
        </a>
        <a href="#/tokens/theming" class="tl-page-pagination-link tl-page-pagination-link--next">
          <span class="tl-page-pagination-dir">Next Page &rarr;</span>
          <span class="tl-page-pagination-title">Theme Engine</span>
        </a>
      </div>
    `;
  },

  renderTokenNaming() {
    return `
      <div class="tl-page-header">
        <div class="tl-page-title-row">
          <h1 class="tl-page-title">Token Naming Conventions</h1>
          <span class="tl-badge tl-badge--brand">Standard Rules</span>
        </div>
        <p class="tl-page-subtitle">
          Strict kebab-case taxonomy ensuring full semantic readability and automatic tooling linters.
        </p>
      </div>

      <div class="tl-dodont-grid">
        <div class="tl-dodont-card tl-dodont-card--do">
          <div class="tl-dodont-title">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
            Correct Syntax
          </div>
          <ul style="padding-left: 18px; margin: 0; font-size: 13px; line-height: 1.8;">
            <li><code>--tl-ref-[family]-[step]</code> (e.g. <code>--tl-ref-indigo-500</code>)</li>
            <li><code>--tl-sys-[category]-[role]-[mode?]</code> (e.g. <code>--tl-sys-color-primary</code>)</li>
            <li><code>--tl-comp-[component]-[variant?]-[element]</code> (e.g. <code>--tl-comp-button-primary-bg</code>)</li>
          </ul>
        </div>

        <div class="tl-dodont-card tl-dodont-card--dont">
          <div class="tl-dodont-title">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            Anti-Patterns
          </div>
          <ul style="padding-left: 18px; margin: 0; font-size: 13px; line-height: 1.8;">
            <li>Never name semantic tokens after visual colors: <code>--tl-sys-blue</code> (Wrong!)</li>
            <li>Never reference a primitive inside component CSS (Skips Layer 2!).</li>
            <li>Never hardcode raw pixels or hex colors in components.</li>
          </ul>
        </div>
      </div>

      <div class="tl-page-pagination">
        <a href="#/tokens/theming" class="tl-page-pagination-link">
          <span class="tl-page-pagination-dir">&larr; Previous</span>
          <span class="tl-page-pagination-title">Theme Engine</span>
        </a>
        <a href="#/components" class="tl-page-pagination-link tl-page-pagination-link--next">
          <span class="tl-page-pagination-dir">Next Page &rarr;</span>
          <span class="tl-page-pagination-title">Components Registry</span>
        </a>
      </div>
    `;
  },

  /* ==========================================================================
     3. PATTERNS: FORMS, EMPTY STATES, DATA TABLES, NAVIGATION
     ========================================================================== */
  renderPatternsForms() {
    return `
      <div class="tl-page-header">
        <div class="tl-page-title-row">
          <h1 class="tl-page-title">Form Design &amp; Validation Patterns</h1>
          <span class="tl-badge tl-badge--success">Pattern</span>
        </div>
        <p class="tl-page-subtitle">
          Standardized guidelines for constructing accessible forms, managing validation states, and displaying helpful error summaries.
        </p>
      </div>

      <div class="card" style="margin-bottom: 24px;">
        <h2 style="font-size: 18px; margin-bottom: 12px;">Production Form Layout</h2>
        <div style="display: flex; flex-direction: column; gap: 16px; max-width: 480px;">
          <div class="tl-form-group">
            <label class="tl-label" for="pat-name">Full Name <span class="tl-label-required">*</span></label>
            <input type="text" id="pat-name" class="tl-input" value="Alex Torres">
          </div>

          <div class="tl-form-group">
            <label class="tl-label" for="pat-email">Work Email <span class="tl-label-required">*</span></label>
            <input type="email" id="pat-email" class="tl-input is-error" value="alex.torres">
            <span class="tl-helper-text tl-helper-text--error">Please enter a valid domain address (e.g. name@company.com).</span>
          </div>

          <div class="tl-form-group">
            <label class="tl-checkbox-label">
              <input type="checkbox" class="tl-checkbox-input" checked>
              <span>Enforce WebAuthn hardware key authentication</span>
            </label>
          </div>

          <div style="display: flex; gap: 12px; margin-top: 8px;">
            <button class="tl-btn tl-btn--primary tl-btn--md">Save Organization Policy</button>
            <button class="tl-btn tl-btn--outline tl-btn--md">Cancel</button>
          </div>
        </div>
      </div>

      <div class="tl-page-pagination">
        <a href="#/components" class="tl-page-pagination-link">
          <span class="tl-page-pagination-dir">&larr; Previous</span>
          <span class="tl-page-pagination-title">Components</span>
        </a>
        <a href="#/patterns/empty-states" class="tl-page-pagination-link tl-page-pagination-link--next">
          <span class="tl-page-pagination-dir">Next Page &rarr;</span>
          <span class="tl-page-pagination-title">Empty States</span>
        </a>
      </div>
    `;
  },

  renderPatternsEmptyStates() {
    return `
      <div class="tl-page-header">
        <div class="tl-page-title-row">
          <h1 class="tl-page-title">Empty States Pattern</h1>
          <span class="tl-badge tl-badge--brand">Pattern</span>
        </div>
        <p class="tl-page-subtitle">
          Constructive empty states orient users when no data exists yet, offering clear next steps to populate the view.
        </p>
      </div>

      <div class="card" style="text-align: center; padding: 48px 24px; margin-bottom: 32px;">
        <div style="width: 56px; height: 56px; border-radius: var(--tl-sys-shape-full); background: var(--tl-sys-color-primary-container); color: var(--tl-sys-color-on-primary-container); display: inline-flex; align-items: center; justify-content: center; margin-bottom: 16px;">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
        </div>
        <h2 style="font-size: 20px; margin-bottom: 8px;">No API Tokens Generated</h2>
        <p style="font-size: 14px; max-width: 440px; margin: 0 auto 24px; color: var(--tl-sys-color-on-surface-variant);">
          Your team has not created any automation tokens. Generate a token to authenticate GitHub Actions and Figma pipelines.
        </p>
        <button class="tl-btn tl-btn--primary tl-btn--md" onclick="Toast.show({ message: 'Opening token generation modal...', type: 'info' })">
          Create New Token &rarr;
        </button>
      </div>

      <div class="tl-page-pagination">
        <a href="#/patterns/forms" class="tl-page-pagination-link">
          <span class="tl-page-pagination-dir">&larr; Previous</span>
          <span class="tl-page-pagination-title">Forms &amp; Validation</span>
        </a>
        <a href="#/patterns/data-tables" class="tl-page-pagination-link tl-page-pagination-link--next">
          <span class="tl-page-pagination-dir">Next Page &rarr;</span>
          <span class="tl-page-pagination-title">Data Tables</span>
        </a>
      </div>
    `;
  },

  renderPatternsDataTables() {
    return `
      <div class="tl-page-header">
        <div class="tl-page-title-row">
          <h1 class="tl-page-title">Data Tables Pattern</h1>
          <span class="tl-badge tl-badge--brand">Pattern</span>
        </div>
        <p class="tl-page-subtitle">
          Tabular layouts for dense data inspection, status indicators, and row action triggers.
        </p>
      </div>

      <div class="card" style="padding: 0; overflow: hidden; margin-bottom: 32px;">
        <div style="overflow-x: auto;">
          <table style="width: 100%; border-collapse: collapse; font-size: 13px;">
            <thead>
              <tr style="border-bottom: 1px solid var(--tl-sys-color-outline-variant); background-color: var(--tl-sys-color-surface-container-low); text-align: left;">
                <th style="padding: 12px 16px;">Key Identifier</th>
                <th style="padding: 12px 16px;">Scope</th>
                <th style="padding: 12px 16px;">Owner</th>
                <th style="padding: 12px 16px;">Last Used</th>
                <th style="padding: 12px 16px; text-align: right;">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr style="border-bottom: 1px solid var(--tl-sys-color-outline-variant);">
                <td style="padding: 12px 16px;">
                  <strong>figma-sync-live</strong><br>
                  <code style="font-size: 11px; color: var(--tl-sys-color-on-surface-muted);">tl_live_89a0f...</code>
                </td>
                <td style="padding: 12px 16px;"><span class="tl-badge tl-badge--brand">tokens:write</span></td>
                <td style="padding: 12px 16px;">sarah.chen@trilayer.design</td>
                <td style="padding: 12px 16px;">12 mins ago</td>
                <td style="padding: 12px 16px; text-align: right;">
                  <button class="tl-btn tl-btn--ghost tl-btn--sm" style="color: var(--tl-sys-color-error);" onclick="Toast.show({ message: 'Token revocation initiated.', type: 'error' })">Revoke</button>
                </td>
              </tr>
              <tr style="border-bottom: 1px solid var(--tl-sys-color-outline-variant);">
                <td style="padding: 12px 16px;">
                  <strong>github-actions-linter</strong><br>
                  <code style="font-size: 11px; color: var(--tl-sys-color-on-surface-muted);">tl_live_44b19...</code>
                </td>
                <td style="padding: 12px 16px;"><span class="tl-badge tl-badge--neutral">tokens:read</span></td>
                <td style="padding: 12px 16px;">alex.torres@trilayer.design</td>
                <td style="padding: 12px 16px;">2 hours ago</td>
                <td style="padding: 12px 16px; text-align: right;">
                  <button class="tl-btn tl-btn--ghost tl-btn--sm" style="color: var(--tl-sys-color-error);" onclick="Toast.show({ message: 'Token revocation initiated.', type: 'error' })">Revoke</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div class="tl-page-pagination">
        <a href="#/patterns/empty-states" class="tl-page-pagination-link">
          <span class="tl-page-pagination-dir">&larr; Previous</span>
          <span class="tl-page-pagination-title">Empty States</span>
        </a>
        <a href="#/patterns/navigation" class="tl-page-pagination-link tl-page-pagination-link--next">
          <span class="tl-page-pagination-dir">Next Page &rarr;</span>
          <span class="tl-page-pagination-title">Navigation Patterns</span>
        </a>
      </div>
    `;
  },

  renderPatternsNavigation() {
    return `
      <div class="tl-page-header">
        <div class="tl-page-title-row">
          <h1 class="tl-page-title">Navigation Patterns</h1>
          <span class="tl-badge tl-badge--brand">Responsive UX</span>
        </div>
        <p class="tl-page-subtitle">
          Adaptive layout strategies across breakpoints: Desktop Drawer, Tablet Rail, Mobile Off-Canvas, and Breadcrumbs.
        </p>
      </div>

      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 16px; margin-bottom: 32px;">
        <div class="card">
          <h2 style="font-size: 16px; margin-bottom: 8px;">Desktop: Persistent Drawer</h2>
          <p style="font-size: 13px; color: var(--tl-sys-color-on-surface-variant); margin-bottom: 12px;">
            At &ge; 1024px, the sidebar is fixed at 280px width, sticky with independent scrolling. Nested sections expand and collapse with state persistence.
          </p>
          <span class="tl-badge tl-badge--neutral">&ge; 1024px Viewports</span>
        </div>

        <div class="card">
          <h2 style="font-size: 16px; margin-bottom: 8px;">Tablet: Compact Rail</h2>
          <p style="font-size: 13px; color: var(--tl-sys-color-on-surface-variant); margin-bottom: 12px;">
            At 768px &ndash; 1023px, the navigation collapses into an icon-first vertical rail or hamburger toggle, reserving horizontal space for content.
          </p>
          <span class="tl-badge tl-badge--neutral">768px &ndash; 1023px</span>
        </div>

        <div class="card">
          <h2 style="font-size: 16px; margin-bottom: 8px;">Mobile: Off-Canvas Drawer</h2>
          <p style="font-size: 13px; color: var(--tl-sys-color-on-surface-variant); margin-bottom: 12px;">
            Under 768px, a top bar with hamburger button triggers a slide-in drawer with modal backdrop scrim and body scroll lock.
          </p>
          <span class="tl-badge tl-badge--neutral">&lt; 768px Viewports</span>
        </div>
      </div>

      <div class="card" style="margin-bottom: 32px;">
        <h2 style="font-size: 18px; margin-bottom: 12px;">Breadcrumbs &amp; Pagination Spec</h2>
        <p style="font-size: 14px; margin-bottom: 16px;">
          Deep links always reflect the full hierarchy via semantic <code>&lt;nav aria-label="Breadcrumb"&gt;</code> with chevron dividers, while footer pagination provides sequential previous/next journeys.
        </p>
        <div style="padding: 12px 16px; background: var(--tl-sys-color-surface-container); border-radius: var(--tl-sys-shape-control); font-size: 13px; font-family: var(--tl-sys-font-family-code);">
          Home &gt; Patterns &gt; Navigation Patterns
        </div>
      </div>

      <div class="tl-page-pagination">
        <a href="#/patterns/data-tables" class="tl-page-pagination-link">
          <span class="tl-page-pagination-dir">&larr; Previous</span>
          <span class="tl-page-pagination-title">Data Tables</span>
        </a>
        <a href="#/content/voice-and-tone" class="tl-page-pagination-link tl-page-pagination-link--next">
          <span class="tl-page-pagination-dir">Next Section &rarr;</span>
          <span class="tl-page-pagination-title">Voice &amp; Tone</span>
        </a>
      </div>
    `;
  },

  /* ==========================================================================
     4. CONTENT: VOICE, TONE & UX WRITING
     ========================================================================== */
  renderContentVoice() {
    return `
      <div class="tl-page-header">
        <div class="tl-page-title-row">
          <h1 class="tl-page-title">Voice &amp; Tone Guidelines</h1>
          <span class="tl-badge tl-badge--brand">Brand Personality</span>
        </div>
        <p class="tl-page-subtitle">
          Trilayer's personality is <strong>precise, calm, structured, and confident</strong>. We communicate technical decisions with clarity and zero marketing fluff.
        </p>
      </div>

      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 16px; margin-bottom: 32px;">
        <div class="card">
          <h2 style="font-size: 16px; color: var(--tl-sys-color-link); margin-bottom: 6px;">Precise</h2>
          <p style="font-size: 13px;">Say exactly what happens. Use specific nouns, concrete measurements, and explicit verbs.</p>
        </div>
        <div class="card">
          <h2 style="font-size: 16px; color: var(--tl-sys-color-link); margin-bottom: 6px;">Calm</h2>
          <p style="font-size: 13px;">Avoid artificial urgency, exclamation points, and hype words. Never panic the user during error states.</p>
        </div>
        <div class="card">
          <h2 style="font-size: 16px; color: var(--tl-sys-color-link); margin-bottom: 6px;">Structured</h2>
          <p style="font-size: 13px;">Lead with the outcome first, followed by supporting steps or requirements.</p>
        </div>
        <div class="card">
          <h2 style="font-size: 16px; color: var(--tl-sys-color-link); margin-bottom: 6px;">Confident</h2>
          <p style="font-size: 13px;">Be decisive and clear. Do not apologize for expected security verifications or system confirmations.</p>
        </div>
      </div>

      <div class="tl-page-pagination">
        <a href="#/patterns/data-tables" class="tl-page-pagination-link">
          <span class="tl-page-pagination-dir">&larr; Previous</span>
          <span class="tl-page-pagination-title">Data Tables</span>
        </a>
        <a href="#/content/ux-writing" class="tl-page-pagination-link tl-page-pagination-link--next">
          <span class="tl-page-pagination-dir">Next Page &rarr;</span>
          <span class="tl-page-pagination-title">UX Writing</span>
        </a>
      </div>
    `;
  },

  renderContentUXWriting() {
    return `
      <div class="tl-page-header">
        <div class="tl-page-title-row">
          <h1 class="tl-page-title">UX Writing Conventions</h1>
          <span class="tl-badge tl-badge--brand">Writing Standards</span>
        </div>
        <p class="tl-page-subtitle">
          Actionable button labels, clear validation copy, sentence casing, and technical precision.
        </p>
      </div>

      <div class="tl-dodont-grid">
        <div class="tl-dodont-card tl-dodont-card--do">
          <div class="tl-dodont-title">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
            Explicit Action Labels
          </div>
          <ul style="padding-left: 18px; margin: 0; font-size: 13px; line-height: 1.8;">
            <li>"Save Changes"</li>
            <li>"Publish Library v2.0"</li>
            <li>"Revoke Production Token"</li>
            <li>Use sentence case for headings and titles</li>
          </ul>
        </div>

        <div class="tl-dodont-card tl-dodont-card--dont">
          <div class="tl-dodont-title">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            Vague or Ambiguous Copy
          </div>
          <ul style="padding-left: 18px; margin: 0; font-size: 13px; line-height: 1.8;">
            <li>Never use "OK", "Yes", or "Submit"</li>
            <li>Avoid jargon like "Oops, something broke!"</li>
            <li>Never blame the user for validation errors</li>
          </ul>
        </div>
      </div>

      <div class="tl-page-pagination">
        <a href="#/content/voice-and-tone" class="tl-page-pagination-link">
          <span class="tl-page-pagination-dir">&larr; Previous</span>
          <span class="tl-page-pagination-title">Voice &amp; Tone</span>
        </a>
        <a href="#/resources/changelog" class="tl-page-pagination-link tl-page-pagination-link--next">
          <span class="tl-page-pagination-dir">Next Section &rarr;</span>
          <span class="tl-page-pagination-title">Changelog</span>
        </a>
      </div>
    `;
  },

  /* ==========================================================================
     5. RESOURCES: FIGMA KIT, CHANGELOG, ROADMAP, MIGRATION
     ========================================================================== */
  renderResourcesFigma() {
    return `
      <div class="tl-page-header">
        <div class="tl-page-title-row">
          <h1 class="tl-page-title">Figma UI Kit &amp; Tokens Sync</h1>
          <span class="tl-badge tl-badge--brand">Figma Community</span>
        </div>
        <p class="tl-page-subtitle">
          The official Trilayer Figma library featuring Figma Variables, Auto Layout V5, Component Properties, and automated GitHub Actions token sync.
        </p>
      </div>

      <div class="card" style="margin-bottom: 24px;">
        <h2 style="font-size: 18px; margin-bottom: 12px;">Figma Library Features</h2>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 16px; margin-bottom: 20px;">
          <div style="padding: 16px; background: var(--tl-sys-color-surface-container); border-radius: var(--tl-sys-shape-container); border: 1px solid var(--tl-sys-color-outline-variant);">
            <div style="font-weight: 700; margin-bottom: 4px; font-size: 14px;">1:1 Variable Mapping</div>
            <p style="font-size: 13px; margin: 0; color: var(--tl-sys-color-on-surface-variant);">Three distinct Variable Collections mirroring Primitives, Semantic roles, and Scoped Component tokens.</p>
          </div>
          <div style="padding: 16px; background: var(--tl-sys-color-surface-container); border-radius: var(--tl-sys-shape-container); border: 1px solid var(--tl-sys-color-outline-variant);">
            <div style="font-weight: 700; margin-bottom: 4px; font-size: 14px;">Modes: Light &amp; Dark</div>
            <p style="font-size: 13px; margin: 0; color: var(--tl-sys-color-on-surface-variant);">Switch frame modes between Light and Dark themes instantly with zero manual color overrides.</p>
          </div>
          <div style="padding: 16px; background: var(--tl-sys-color-surface-container); border-radius: var(--tl-sys-shape-container); border: 1px solid var(--tl-sys-color-outline-variant);">
            <div style="font-weight: 700; margin-bottom: 4px; font-size: 14px;">Token Studio Sync</div>
            <p style="font-size: 13px; margin: 0; color: var(--tl-sys-color-on-surface-variant);">Two-way synchronization pipeline with GitHub repository token JSON and CSS custom properties.</p>
          </div>
        </div>

        <div style="display: flex; gap: 12px; flex-wrap: wrap;">
          <button class="tl-btn tl-btn--primary" onclick="Toast.show({ message: 'Redirecting to Figma Community file...', type: 'success' })">
            Open Figma Community Kit &nearr;
          </button>
          <a href="#/get-started/designers" class="tl-btn tl-btn--outline" style="text-decoration: none;">
            Read Designer Integration Guide
          </a>
        </div>
      </div>

      <div class="tl-page-pagination">
        <a href="#/content/ux-writing" class="tl-page-pagination-link">
          <span class="tl-page-pagination-dir">&larr; Previous</span>
          <span class="tl-page-pagination-title">UX Writing</span>
        </a>
        <a href="#/resources/changelog" class="tl-page-pagination-link tl-page-pagination-link--next">
          <span class="tl-page-pagination-dir">Next Page &rarr;</span>
          <span class="tl-page-pagination-title">Changelog</span>
        </a>
      </div>
    `;
  },

  renderChangelog() {
    return `
      <div class="tl-page-header">
        <div class="tl-page-title-row">
          <h1 class="tl-page-title">Release Changelog</h1>
          <span class="tl-badge tl-badge--brand">Semantic Versioning</span>
        </div>
        <p class="tl-page-subtitle">
          Continuous release history, architectural enhancements, and breaking change notifications.
        </p>
      </div>

      <div class="card" style="margin-bottom: 24px;">
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px;">
          <h2 style="font-size: 20px; margin: 0;">v2.0.0 — Production Architecture</h2>
          <span class="tl-badge tl-badge--success">Latest Stable</span>
        </div>
        <span style="font-size: 12px; color: var(--tl-sys-color-on-surface-muted);">Released November 2026</span>
        <ul style="padding-left: 20px; margin: 16px 0 0; font-size: 13px; line-height: 1.8; color: var(--tl-sys-color-on-surface-variant);">
          <li><strong>Architecture:</strong> Fully decoupled 3-tier CSS token hierarchy (<code>--tl-ref-*</code> &rarr; <code>--tl-sys-*</code> &rarr; <code>--tl-comp-*</code>).</li>
          <li><strong>Theme Engine:</strong> Added dynamic perceptual tonal palette generator (0-100 tones) from seed colors.</li>
          <li><strong>WCAG 2.2 AA Audit:</strong> Automated contrast ratio calculator flagging role pairs &lt; 4.5:1.</li>
          <li><strong>Command Palette:</strong> Implemented <kbd>Cmd+K</kbd> weighted fuzzy search with developer alias synonyms.</li>
          <li><strong>Scroll-Spy TOC:</strong> Added responsive heading observer rail with smooth viewport scrolling.</li>
        </ul>
      </div>

      <div class="card" style="margin-bottom: 32px;">
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px;">
          <h2 style="font-size: 18px; margin: 0;">v1.1.0 — Component Foundations</h2>
          <span class="tl-badge tl-badge--neutral">Previous</span>
        </div>
        <span style="font-size: 12px; color: var(--tl-sys-color-on-surface-muted);">Released October 2026</span>
        <ul style="padding-left: 20px; margin: 16px 0 0; font-size: 13px; line-height: 1.8; color: var(--tl-sys-color-on-surface-variant);">
          <li>Added initial button, text field, dialog, and selection control component sets.</li>
          <li>Introduced light/dark theme switching and density scaling.</li>
        </ul>
      </div>

      <div class="tl-page-pagination">
        <a href="#/content/ux-writing" class="tl-page-pagination-link">
          <span class="tl-page-pagination-dir">&larr; Previous</span>
          <span class="tl-page-pagination-title">UX Writing</span>
        </a>
        <a href="#/resources/roadmap" class="tl-page-pagination-link tl-page-pagination-link--next">
          <span class="tl-page-pagination-dir">Next Page &rarr;</span>
          <span class="tl-page-pagination-title">Roadmap</span>
        </a>
      </div>
    `;
  },

  renderRoadmap() {
    return `
      <div class="tl-page-header">
        <div class="tl-page-title-row">
          <h1 class="tl-page-title">Product Roadmap</h1>
          <span class="tl-badge tl-badge--brand">2026 - 2027</span>
        </div>
        <p class="tl-page-subtitle">
          Upcoming component expansions, tooling synchronizers, and governance milestones.
        </p>
      </div>

      <div style="display: flex; flex-direction: column; gap: 20px; margin-bottom: 32px;">
        <div class="card" style="border-left: 4px solid var(--tl-sys-color-success);">
          <span class="tl-badge tl-badge--success" style="margin-bottom: 8px;">Q4 2026 — Complete</span>
          <h2 style="font-size: 18px; margin-bottom: 6px;">Phase 1-8 Token Architecture &amp; Core Components</h2>
          <p style="font-size: 13px; margin: 0;">Decoupled 3-layer tokens, Command Palette ⌘K, Theme Engine, Layer Inspector, and initial 10 components.</p>
        </div>

        <div class="card" style="border-left: 4px solid var(--tl-sys-color-primary);">
          <span class="tl-badge tl-badge--brand" style="margin-bottom: 8px;">Q1 2027 — In Progress</span>
          <h2 style="font-size: 18px; margin-bottom: 6px;">Advanced Navigation &amp; Wave 2 Components</h2>
          <p style="font-size: 13px; margin: 0;">Accordion, Dropdown Menu, Progress Indicators, Snackbars, and Figma REST API bi-directional synchronizer.</p>
        </div>

        <div class="card" style="border-left: 4px solid var(--tl-sys-color-warning);">
          <span class="tl-badge tl-badge--warning" style="margin-bottom: 8px;">Q2 2027 — Planned</span>
          <h2 style="font-size: 18px; margin-bottom: 6px;">Enterprise Framework Wrappers</h2>
          <p style="font-size: 13px; margin: 0;">First-class React and Web Components wrappers generating typed prop definitions directly from <code>/data/components/*.js</code>.</p>
        </div>
      </div>

      <div class="tl-page-pagination">
        <a href="#/resources/changelog" class="tl-page-pagination-link">
          <span class="tl-page-pagination-dir">&larr; Previous</span>
          <span class="tl-page-pagination-title">Changelog</span>
        </a>
        <a href="#/resources/migration" class="tl-page-pagination-link tl-page-pagination-link--next">
          <span class="tl-page-pagination-dir">Next Page &rarr;</span>
          <span class="tl-page-pagination-title">Migration Guide</span>
        </a>
      </div>
    `;
  },

  renderMigration() {
    return `
      <div class="tl-page-header">
        <div class="tl-page-title-row">
          <h1 class="tl-page-title">Migration Guide (v1 &rarr; v2)</h1>
          <span class="tl-badge tl-badge--brand">Breaking Redesign</span>
        </div>
        <p class="tl-page-subtitle">
          How to migrate existing front-end code from legacy flat tokens or hardcoded hex colors to the Trilayer 3-tier architecture.
        </p>
      </div>

      <div class="card" style="margin-bottom: 32px;">
        <h2 style="font-size: 18px; margin-bottom: 12px;">Three-Step Migration Workflow</h2>
        <div style="display: flex; flex-direction: column; gap: 16px;">
          <div style="padding: 16px; background: var(--tl-sys-color-surface-container); border-radius: var(--tl-sys-shape-control);">
            <strong>Step 1: Replace Hardcoded Hex in CSS</strong><br>
            <span style="font-size: 13px; color: var(--tl-sys-color-on-surface-variant);">Search for <code>#</code> in your component files and replace with appropriate <code>--tl-comp-*</code> component tokens.</span>
          </div>
          <div style="padding: 16px; background: var(--tl-sys-color-surface-container); border-radius: var(--tl-sys-shape-control);">
            <strong>Step 2: Remove Direct Primitive Dependencies</strong><br>
            <span style="font-size: 13px; color: var(--tl-sys-color-on-surface-variant);">Ensure components never bind to <code>--tl-ref-*</code> directly. Route them through <code>--tl-sys-*</code> semantic roles.</span>
          </div>
          <div style="padding: 16px; background: var(--tl-sys-color-surface-container); border-radius: var(--tl-sys-shape-control);">
            <strong>Step 3: Test Dark Theme Inversion</strong><br>
            <span style="font-size: 13px; color: var(--tl-sys-color-on-surface-variant);">Add <code>data-theme="dark"</code> to your application root to confirm background surfaces elevate to dark tones without broken contrast.</span>
          </div>
        </div>
      </div>

      <div class="tl-page-pagination">
        <a href="#/resources/roadmap" class="tl-page-pagination-link">
          <span class="tl-page-pagination-dir">&larr; Previous</span>
          <span class="tl-page-pagination-title">Roadmap</span>
        </a>
        <a href="#/contribute" class="tl-page-pagination-link tl-page-pagination-link--next">
          <span class="tl-page-pagination-dir">Next Section &rarr;</span>
          <span class="tl-page-pagination-title">Contribute</span>
        </a>
      </div>
    `;
  },

  /* ==========================================================================
     6. CONTRIBUTE
     ========================================================================== */
  renderContribute() {
    return `
      <div class="tl-page-header">
        <div class="tl-page-title-row">
          <h1 class="tl-page-title">Contribution Guidelines</h1>
          <span class="tl-badge tl-badge--brand">Governance Standards</span>
        </div>
        <p class="tl-page-subtitle">
          How to propose new tokens, submit components, and verify strict 3-layer architecture compliance.
        </p>
      </div>

      <div class="card" style="margin-bottom: 24px;">
        <h2 style="font-size: 18px; margin-bottom: 12px;">Definition of Done Checklist</h2>
        <ul style="padding-left: 20px; font-size: 13px; line-height: 1.8; color: var(--tl-sys-color-on-surface-variant);">
          <li><strong>Layer 3 Check:</strong> Search <code>/css/components/</code> for <code>#</code> and <code>--tl-ref-</code>. Must return zero matches.</li>
          <li><strong>Single Data File:</strong> New component is defined in <code>data/components/[name].js</code> and exports Layer Inspector chains.</li>
          <li><strong>Accessibility Review:</strong> Focus rings visible, keyboard tab traversal verified, ARIA attributes documented.</li>
          <li><strong>Theme &amp; Density Tested:</strong> Verified in Light, Dark, Compact, Default, and Comfortable modes.</li>
        </ul>
      </div>

      <div class="tl-page-pagination">
        <a href="#/resources/migration" class="tl-page-pagination-link">
          <span class="tl-page-pagination-dir">&larr; Previous</span>
          <span class="tl-page-pagination-title">Migration Guide</span>
        </a>
        <a href="#/" class="tl-page-pagination-link tl-page-pagination-link--next">
          <span class="tl-page-pagination-dir">Return Home &uarr;</span>
          <span class="tl-page-pagination-title">Three layers. One source of truth.</span>
        </a>
      </div>
    `;
  }
};
