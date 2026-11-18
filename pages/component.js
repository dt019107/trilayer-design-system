/**
 * TRILAYER DESIGN SYSTEM — COMPONENT PAGE TEMPLATE
 * Reusable master template rendering any component definition from /data/components/*.js.
 * Includes the Signature Feature: "Layer Inspector" and live interactive controls.
 */

export function renderComponentPage(component) {
  if (!component) return `<div class="card">Component not found.</div>`;

  const statusClass = (component.status || "stable").toLowerCase();

  const isDark = (typeof document !== "undefined" && document.documentElement.getAttribute("data-theme") === "dark");

  return `
    <div class="tl-page-header">
      <div class="tl-page-title-row">
        <h1 class="tl-page-title">${component.title}</h1>
        <div style="display: flex; gap: 8px; align-items: center;">
          <span class="tl-nav-badge tl-nav-badge--${statusClass}">${component.status}</span>
          <span style="font-family: var(--tl-sys-font-family-code); font-size: 12px; color: var(--tl-sys-color-on-surface-muted);">v${component.version || "1.0.0"}</span>
        </div>
      </div>
      <p class="tl-page-subtitle">${component.description}</p>
    </div>

    <!-- 1. SIGNATURE FEATURE: LAYER INSPECTOR PANEL -->
    <div class="tl-layer-inspector">
      <div class="tl-layer-inspector-header">
        <div class="tl-layer-inspector-title">
          <svg class="tl-brand-logo-svg" viewBox="0 0 32 32" fill="none"><path d="M16 3L30 10L16 17L2 10L16 3Z" fill="var(--tl-sys-color-layer-component)"/><path d="M16 10L30 17L16 24L2 17L16 10Z" fill="var(--tl-sys-color-layer-semantic)"/><path d="M16 17L30 24L16 31L2 24L16 17Z" fill="var(--tl-sys-color-layer-primitives)"/></svg>
          Signature Feature: Layer Inspector
        </div>
        <span class="tl-layer-inspector-badge">3-Layer Token Chain</span>
      </div>
      <p style="font-size: 13px; color: var(--tl-sys-color-on-surface-variant); margin-bottom: 16px;">
        Every visual attribute resolves down an isolated one-way chain. Click any token in the chain to inspect its foundation.
      </p>

      <div style="display: flex; flex-direction: column; gap: 10px;">
        ${(component.layerInspectorChains || []).map(chain => {
          const primToken = isDark ? (chain.primitiveTokenDark || chain.primitiveTokenLight) : chain.primitiveTokenLight;
          const activeVal = isDark ? (chain.valueDark || chain.valueLight) : chain.valueLight;
          return `
          <div class="tl-token-chain-card">
            <strong style="min-width: 180px; font-size: 13px; color: var(--tl-sys-color-on-surface);">${chain.element}</strong>
            
            <div style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap;">
              <!-- Layer 3: Component Token -->
              <div class="tl-token-chain-node">
                <span class="tl-token-chain-tier" style="color: var(--tl-sys-color-layer-component);">Layer 3 (Component)</span>
                <a href="#/tokens/reference" class="tl-token-chain-pill" title="Jump to Component tokens reference" style="border-color: var(--tl-sys-color-layer-component);">${chain.componentToken}</a>
              </div>
              <span class="arrow">&rarr;</span>

              <!-- Layer 2: Semantic Token -->
              <div class="tl-token-chain-node">
                <span class="tl-token-chain-tier" style="color: var(--tl-sys-color-layer-semantic);">Layer 2 (Semantic)</span>
                <a href="#/tokens/reference" class="tl-token-chain-pill" title="Jump to Semantic tokens reference" style="border-color: var(--tl-sys-color-layer-semantic);">${chain.semanticToken}</a>
              </div>
              <span class="arrow">&rarr;</span>

              <!-- Layer 1: Primitive Token -->
              <div class="tl-token-chain-node">
                <span class="tl-token-chain-tier" style="color: var(--tl-sys-color-layer-primitives);">Layer 1 (Primitive)</span>
                <a href="#/tokens/reference" class="tl-token-chain-pill" title="Jump to Primitive tokens reference" style="border-color: var(--tl-sys-color-layer-primitives);">${primToken}</a>
              </div>
              <span class="arrow">&rarr;</span>

              <!-- Value -->
              <div class="tl-token-chain-node">
                <span class="tl-token-chain-tier" style="color: var(--tl-sys-color-on-surface-muted);">Active Value</span>
                <span style="font-family: var(--tl-sys-font-family-code); font-size: 12px; font-weight: 700; color: var(--tl-sys-color-on-surface); padding: 4px 6px;">${activeVal}</span>
              </div>
            </div>
          </div>
        `;}).join("")}
      </div>
    </div>

    <!-- 2. LIVE PLAYGROUND DEMO -->
    <div class="card" style="margin-bottom: 32px; padding: 0; overflow: hidden;">
      <div style="padding: 16px 24px; border-bottom: 1px solid var(--tl-sys-color-outline-variant); background-color: var(--tl-sys-color-surface-container-low); display: flex; align-items: center; justify-content: space-between;">
        <h2 style="font-size: 16px; margin: 0;">Interactive Demo</h2>
        <span style="font-size: 12px; color: var(--tl-sys-color-on-surface-muted);">Dynamic state testing</span>
      </div>

      <div class="tl-playground-stage" id="comp-demo-stage">
        <!-- Rendered component element -->
        ${renderLiveSpecimen(component.id)}
      </div>

      <div class="tl-playground-controls">
        <span class="tl-playground-control-label">Test Controls:</span>
        <button class="tl-btn tl-btn--outline tl-btn--sm" onclick="Toast.show({ message: 'Triggered ${component.title} action', type: 'info' })">Test Trigger</button>
        <button class="tl-btn tl-btn--secondary tl-btn--sm" onclick="Toast.show({ message: '${component.title} component verified in Dark Canvas', type: 'success' })">Verify Component</button>
      </div>
    </div>

    <!-- 3. CODE BLOCK TABS (HTML / CSS) WITH COPY BUTTON -->
    <div class="tl-code-block-wrapper">
      <div class="tl-code-header">
        <div class="tl-code-tabs" role="tablist">
          <button class="tl-code-tab-btn is-active" id="tab-html" onclick="window.__switchCodeTab('html')">HTML</button>
          <button class="tl-code-tab-btn" id="tab-css" onclick="window.__switchCodeTab('css')">CSS (Component Layer)</button>
        </div>
        <button class="tl-copy-code-btn" id="btn-copy-code" onclick="window.__copyActiveCode()">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
          <span>Copy Code</span>
        </button>
      </div>
      <div id="code-snippet-container">
        <pre class="tl-code-pre"><code id="code-snippet-html">${escapeHtml(component.codeSnippets?.html || "")}</code></pre>
        <pre class="tl-code-pre" style="display: none;"><code id="code-snippet-css">${escapeHtml(component.codeSnippets?.css || "")}</code></pre>
      </div>
    </div>

    <!-- 4. VARIANTS & STATES -->
    <div class="card" style="margin-bottom: 32px;">
      <h2 style="font-size: 18px; margin-bottom: 16px;">Variants &amp; States</h2>
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 16px; margin-bottom: 20px;">
        ${(component.variants || []).map(v => `
          <div style="padding: 14px; border-radius: var(--tl-sys-shape-control); background: var(--tl-sys-color-surface-container); border: 1px solid var(--tl-sys-color-outline-variant);">
            <strong style="font-size: 14px; display: block; margin-bottom: 4px; color: var(--tl-sys-color-on-surface);">${v.name}</strong>
            <p style="font-size: 12px; margin: 0; color: var(--tl-sys-color-on-surface-variant);">${v.desc}</p>
          </div>
        `).join("")}
      </div>

      <h3 style="font-size: 15px; margin-bottom: 8px;">Supported States</h3>
      <div style="display: flex; gap: 8px; flex-wrap: wrap;">
        ${(component.states || []).map(s => `
          <span class="tl-badge tl-badge--neutral">${s}</span>
        `).join("")}
      </div>
    </div>

    <!-- 5. ACCESSIBILITY SPECIFICATIONS -->
    <div class="card" style="margin-bottom: 32px;">
      <h2 style="font-size: 18px; margin-bottom: 16px;">Accessibility &amp; Keyboard Support</h2>
      
      <h3 style="font-size: 14px; margin-bottom: 8px; color: var(--tl-sys-color-link);">ARIA Attributes</h3>
      <div style="overflow-x: auto; margin-bottom: 20px;">
        <table style="width: 100%; border-collapse: collapse; font-size: 13px;">
          <thead>
            <tr style="border-bottom: 1px solid var(--tl-sys-color-outline-variant); text-align: left;">
              <th style="padding: 8px 10px;">Attribute</th>
              <th style="padding: 8px 10px;">Description</th>
            </tr>
          </thead>
          <tbody>
            ${(component.accessibility?.aria || []).map(a => `
              <tr style="border-bottom: 1px solid var(--tl-sys-color-outline-variant);">
                <td style="padding: 8px 10px;"><code style="color: var(--tl-sys-color-link);">${a.attribute}</code></td>
                <td style="padding: 8px 10px; color: var(--tl-sys-color-on-surface-variant);">${a.description}</td>
              </tr>
            `).join("")}
          </tbody>
        </table>
      </div>

      <h3 style="font-size: 14px; margin-bottom: 8px; color: var(--tl-sys-color-link);">Keyboard Interactions</h3>
      <div style="overflow-x: auto;">
        <table style="width: 100%; border-collapse: collapse; font-size: 13px;">
          <thead>
            <tr style="border-bottom: 1px solid var(--tl-sys-color-outline-variant); text-align: left;">
              <th style="padding: 8px 10px;">Key</th>
              <th style="padding: 8px 10px;">Interaction</th>
            </tr>
          </thead>
          <tbody>
            ${(component.accessibility?.keyboard || []).map(k => `
              <tr style="border-bottom: 1px solid var(--tl-sys-color-outline-variant);">
                <td style="padding: 8px 10px;"><kbd class="tl-kbd">${k.key}</kbd></td>
                <td style="padding: 8px 10px; color: var(--tl-sys-color-on-surface-variant);">${k.description}</td>
              </tr>
            `).join("")}
          </tbody>
        </table>
      </div>
    </div>

    <!-- 6. DO / DON'T GUIDELINES -->
    <div class="tl-dodont-grid">
      <div class="tl-dodont-card tl-dodont-card--do">
        <div class="tl-dodont-title">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
          Do
        </div>
        <ul style="padding-left: 18px; margin: 0; font-size: 13px; line-height: 1.6; color: var(--tl-sys-color-on-surface-variant);">
          ${(component.guidelines?.dos || []).map(d => `<li>${d}</li>`).join("")}
        </ul>
      </div>

      <div class="tl-dodont-card tl-dodont-card--dont">
        <div class="tl-dodont-title">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          Don't
        </div>
        <ul style="padding-left: 18px; margin: 0; font-size: 13px; line-height: 1.6; color: var(--tl-sys-color-on-surface-variant);">
          ${(component.guidelines?.donts || []).map(d => `<li>${d}</li>`).join("")}
        </ul>
      </div>
    </div>

    <!-- 7. RELATED COMPONENTS -->
    <div class="card" style="margin-bottom: 32px;">
      <h2 style="font-size: 16px; margin-bottom: 12px;">Related Components</h2>
      <div style="display: flex; gap: 10px; flex-wrap: wrap;">
        ${(component.related || []).map(r => `
          <a href="#/components/${r}" class="tl-chip" style="text-decoration: none;">
            <span>${r.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}</span>
            <span class="arrow">&rarr;</span>
          </a>
        `).join("")}
      </div>
    </div>

    <!-- 8. BOTTOM PAGINATION -->
    <div class="tl-page-pagination">
      <a href="#/components" class="tl-page-pagination-link">
        <span class="tl-page-pagination-dir">&larr; Return to Components</span>
        <span class="tl-page-pagination-title">Component Registry</span>
      </a>
      <a href="#/patterns" class="tl-page-pagination-link tl-page-pagination-link--next">
        <span class="tl-page-pagination-dir">Next Section &rarr;</span>
        <span class="tl-page-pagination-title">Patterns &amp; Templates</span>
      </a>
    </div>
  `;
}

function renderLiveSpecimen(id) {
  switch (id) {
    case "button":
      return `
        <div style="display: flex; gap: 12px; flex-wrap: wrap; align-items: center;">
          <button class="tl-btn tl-btn--primary tl-btn--md">Primary Action</button>
          <button class="tl-btn tl-btn--secondary tl-btn--md">Secondary Action</button>
          <button class="tl-btn tl-btn--outline tl-btn--md">Outline</button>
        </div>
      `;
    case "text-field":
      return `
        <div style="width: 100%; max-width: 320px;" class="tl-form-group">
          <label class="tl-label">Workspace Vanity URL</label>
          <input type="text" class="tl-input" value="trilayer-design" placeholder="Enter subdomain...">
          <span class="tl-helper-text">Accessible by all organization members.</span>
        </div>
      `;
    case "dialog":
      return `
        <div class="tl-card" style="width: 100%; max-width: 380px;">
          <div class="tl-card-header">
            <h3 class="tl-card-title">Revoke API Key?</h3>
          </div>
          <div class="tl-card-body">Any automated sync actions will fail immediately.</div>
          <div class="tl-card-footer">
            <button class="tl-btn tl-btn--outline tl-btn--sm">Keep</button>
            <button class="tl-btn tl-btn--danger tl-btn--sm">Revoke Key</button>
          </div>
        </div>
      `;
    case "checkbox":
      return `
        <div style="display: flex; flex-direction: column; gap: 10px;">
          <label class="tl-checkbox-label">
            <input type="checkbox" class="tl-checkbox-input" checked>
            <span>Auto-sync design tokens</span>
          </label>
          <label class="tl-checkbox-label">
            <input type="checkbox" class="tl-checkbox-input">
            <span>Enforce strict token linting</span>
          </label>
        </div>
      `;
    case "radio":
      return `
        <div style="display: flex; flex-direction: column; gap: 10px;">
          <label class="tl-radio-label">
            <input type="radio" name="r-specimen" class="tl-radio-input" checked>
            <span>Indigo Velvet Palette (Default)</span>
          </label>
          <label class="tl-radio-label">
            <input type="radio" name="r-specimen" class="tl-radio-input">
            <span>Emerald Forest Palette</span>
          </label>
        </div>
      `;
    case "switch":
      return `
        <label class="tl-switch-label">
          <input type="checkbox" class="tl-switch-input" checked>
          <span>Dark Mode Synchronizer</span>
        </label>
      `;
    case "card":
      return `
        <div class="tl-card" style="width: 100%; max-width: 340px;">
          <div class="tl-card-header">
            <h3 class="tl-card-title">Token Package</h3>
            <span class="tl-badge tl-badge--brand">v2.0</span>
          </div>
          <div class="tl-card-body">Primitives, semantic aliases, and component definitions.</div>
          <div class="tl-card-footer">
            <button class="tl-btn tl-btn--primary tl-btn--sm">Install</button>
          </div>
        </div>
      `;
    case "badge":
      return `
        <div style="display: flex; gap: 8px; flex-wrap: wrap;">
          <span class="tl-badge tl-badge--neutral">Metadata</span>
          <span class="tl-badge tl-badge--brand"><span class="tl-badge__dot"></span>Primary</span>
          <span class="tl-badge tl-badge--success"><span class="tl-badge__dot"></span>Passing</span>
          <span class="tl-badge tl-badge--warning"><span class="tl-badge__dot"></span>Review</span>
        </div>
      `;
    case "chip":
      return `
        <div style="display: flex; gap: 8px; flex-wrap: wrap;">
          <button class="tl-chip is-active" aria-pressed="true">All Layers</button>
          <button class="tl-chip">Components</button>
          <button class="tl-chip">Foundations</button>
        </div>
      `;
    case "tooltip":
      return `
        <div class="tl-tooltip-wrapper">
          <button class="tl-btn tl-btn--secondary tl-btn--md">Hover Me for Tooltip</button>
          <div class="tl-tooltip" role="tooltip">Explains button purpose on focus</div>
        </div>
      `;
    default:
      return `<button class="tl-btn tl-btn--primary tl-btn--md">${id}</button>`;
  }
}

function escapeHtml(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

// Global Tab & Copy Helpers (browser-safe)
if (typeof window !== "undefined") {
  window.__activeCodeTab = "html";

  window.__switchCodeTab = function(tab) {
    window.__activeCodeTab = tab;
    const htmlPre = document.getElementById("code-snippet-html")?.parentElement;
    const cssPre = document.getElementById("code-snippet-css")?.parentElement;
    const tabHtml = document.getElementById("tab-html");
    const tabCss = document.getElementById("tab-css");

    if (tab === "html") {
      if (htmlPre) htmlPre.style.display = "block";
      if (cssPre) cssPre.style.display = "none";
      if (tabHtml) tabHtml.classList.add("is-active");
      if (tabCss) tabCss.classList.remove("is-active");
    } else {
      if (htmlPre) htmlPre.style.display = "none";
      if (cssPre) cssPre.style.display = "block";
      if (tabHtml) tabHtml.classList.remove("is-active");
      if (tabCss) tabCss.classList.add("is-active");
    }
  };

  window.__copyActiveCode = function() {
    const tab = window.__activeCodeTab || "html";
    const el = document.getElementById(`code-snippet-${tab}`);
    if (el) {
      if (typeof window.copyToClipboard === "function") {
        window.copyToClipboard(el.textContent, `${tab.toUpperCase()} code`);
      } else if (navigator.clipboard) {
        navigator.clipboard.writeText(el.textContent);
        if (window.Toast) {
          window.Toast.show({ message: `Copied ${tab.toUpperCase()} code to clipboard!`, type: "success" });
        }
      }
    }
  };
}

