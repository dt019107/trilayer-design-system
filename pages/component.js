/**
 * TRILAYER DESIGN SYSTEM — COMPONENT PAGE TEMPLATE
 * Reusable master template rendering any component definition from /data/components/*.js.
 * Includes the Token Resolution Inspector and live interactive controls.
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

    <!-- 1. TOKEN RESOLUTION INSPECTOR PANEL -->
    <div class="tl-layer-inspector">
      <div class="tl-layer-inspector-header">
        <div class="tl-layer-inspector-title">
          <svg class="tl-brand-logo-svg" viewBox="0 0 32 32" fill="none"><path d="M16 3L30 10L16 17L2 10L16 3Z" fill="var(--tl-sys-color-layer-component)"/><path d="M16 10L30 17L16 24L2 17L16 10Z" fill="var(--tl-sys-color-layer-semantic)"/><path d="M16 17L30 24L16 31L2 24L16 17Z" fill="var(--tl-sys-color-layer-primitives)"/></svg>
          Token Resolution Inspector
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
            <strong style="font-size: 13px; color: var(--tl-sys-color-on-surface);">${chain.element}</strong>
            
            <div class="tl-token-chain-flow">
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
        <button class="tl-btn tl-btn--outline tl-btn--sm" id="btn-toggle-anatomy" onclick="window.__toggleAnatomy()" aria-label="Toggle Figma Anatomy Overlay">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18"/><path d="M9 21V9"/></svg>
          Figma Anatomy
        </button>
        <button class="tl-btn tl-btn--outline tl-btn--sm" onclick="Toast.show({ message: 'Triggered ${component.title} action', type: 'info' })">Test Trigger</button>
        <button class="tl-btn tl-btn--secondary tl-btn--sm" onclick="Toast.show({ message: '${component.title} component verified', type: 'success' })">Verify Component</button>
      </div>
    </div>

    <!-- 2B. VARIANT MATRIX (Biings Design System Pattern) -->
    <div class="card" style="margin-bottom: 32px; padding: 0; overflow: hidden;">
      <div style="padding: 16px 24px; border-bottom: 1px solid var(--tl-sys-color-outline-variant); background-color: var(--tl-sys-color-surface-container-low); display: flex; align-items: center; justify-content: space-between;">
        <h2 style="font-size: 16px; margin: 0;">Variant Matrix</h2>
        <span style="font-size: 12px; color: var(--tl-sys-color-on-surface-muted);">Visual Live Previews &amp; Usage Rules</span>
      </div>
      <div style="overflow-x: auto;">
        ${renderVariantMatrix(component.id, component.variants)}
      </div>
    </div>

    <!-- 3. CODE BLOCK TABS (HTML / CSS / FIGMA CODE CONNECT) WITH COPY BUTTON -->
    <div class="tl-code-block-wrapper">
      <div class="tl-code-header">
        <div class="tl-code-tabs" role="tablist">
          <button class="tl-code-tab-btn is-active" id="tab-html" onclick="window.__switchCodeTab('html')">HTML</button>
          <button class="tl-code-tab-btn" id="tab-css" onclick="window.__switchCodeTab('css')">CSS (Component Layer)</button>
          <button class="tl-code-tab-btn" id="tab-figma" onclick="window.__switchCodeTab('figma')">Figma Code Connect (.figma.tsx)</button>
        </div>
        <button class="tl-copy-code-btn" id="btn-copy-code" onclick="window.__copyActiveCode()">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
          <span>Copy Code</span>
        </button>
      </div>
      <div id="code-snippet-container">
        <pre class="tl-code-pre"><code id="code-snippet-html">${escapeHtml(component.codeSnippets?.html || "")}</code></pre>
        <pre class="tl-code-pre" style="display: none;"><code id="code-snippet-css">${escapeHtml(component.codeSnippets?.css || "")}</code></pre>
        <pre class="tl-code-pre" style="display: none;"><code id="code-snippet-figma">${escapeHtml(generateFigmaCodeConnect(component))}</code></pre>
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
    case "avatar":
      return `
        <div style="display: flex; gap: 16px; align-items: center; flex-wrap: wrap;">
          <div class="tl-avatar tl-avatar--sm"><span>SM</span></div>
          <div class="tl-avatar tl-avatar--md"><span>MD</span><span class="tl-avatar__status tl-avatar__status--online"></span></div>
          <div class="tl-avatar tl-avatar--lg"><span>LG</span><span class="tl-avatar__status tl-avatar__status--busy"></span></div>
          <div class="tl-avatar tl-avatar--xl"><span>XL</span><span class="tl-avatar__status tl-avatar__status--away"></span></div>
          <div class="tl-avatar-group" style="margin-left: 12px;">
            <div class="tl-avatar tl-avatar--md"><span>AB</span></div>
            <div class="tl-avatar tl-avatar--md"><span>CD</span></div>
            <div class="tl-avatar tl-avatar--md"><span>EF</span></div>
            <div class="tl-avatar tl-avatar--md tl-avatar--more">+4</div>
          </div>
        </div>
      `;
    case "skeleton":
      return `
        <div style="display: flex; flex-direction: column; gap: 14px; width: 100%; max-width: 360px;">
          <div style="display: flex; gap: 12px; align-items: center;">
            <div class="tl-skeleton tl-skeleton--avatar"></div>
            <div style="flex: 1;">
              <div class="tl-skeleton tl-skeleton--title" style="margin-bottom: 6px; width: 50%;"></div>
              <div class="tl-skeleton tl-skeleton--text" style="margin-bottom: 0px; width: 80%;"></div>
            </div>
          </div>
          <div class="tl-skeleton tl-skeleton--text"></div>
          <div class="tl-skeleton tl-skeleton--text" style="width: 70%;"></div>
        </div>
      `;
    case "callout":
      return `
        <div style="display: flex; flex-direction: column; gap: 12px; width: 100%; max-width: 500px;">
          <div class="tl-callout tl-callout--info">
            <div class="tl-callout__icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
            </div>
            <div class="tl-callout__content">
              <div class="tl-callout__title">Design Token Recommendation</div>
              <p class="tl-callout__body">Reference semantic tokens in application code to automatically inherit theme changes.</p>
            </div>
          </div>
          <div class="tl-callout tl-callout--success">
            <div class="tl-callout__icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
            </div>
            <div class="tl-callout__content">
              <div class="tl-callout__title">WCAG 2.2 AA Contrast Verified</div>
              <p class="tl-callout__body">All tonal combinations satisfy minimum 4.5:1 text-to-background contrast requirements.</p>
            </div>
          </div>
        </div>
      `;
    case "spinner":
      return `
        <div style="display: flex; gap: 24px; align-items: center; flex-wrap: wrap;">
          <div style="display: flex; flex-direction: column; align-items: center; gap: 8px;">
            <div class="tl-spinner tl-spinner--sm"></div>
            <span style="font-size: 11px; color: var(--tl-sys-color-on-surface-muted);">Small (16px)</span>
          </div>
          <div style="display: flex; flex-direction: column; align-items: center; gap: 8px;">
            <div class="tl-spinner tl-spinner--md"></div>
            <span style="font-size: 11px; color: var(--tl-sys-color-on-surface-muted);">Medium (24px)</span>
          </div>
          <div style="display: flex; flex-direction: column; align-items: center; gap: 8px;">
            <div class="tl-spinner tl-spinner--lg"></div>
            <span style="font-size: 11px; color: var(--tl-sys-color-on-surface-muted);">Large (32px)</span>
          </div>
        </div>
      `;
    case "icon-button":
      return `
        <div style="display: flex; gap: 12px; align-items: center;">
          <button class="tl-btn-icon tl-btn-icon--sm" aria-label="Search"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg></button>
          <button class="tl-btn-icon tl-btn-icon--md" aria-label="Settings"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg></button>
          <button class="tl-btn-icon tl-btn-icon--lg" aria-label="Notifications"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg></button>
        </div>
      `;
    case "select":
      return `
        <div style="width: 100%; max-width: 320px;" class="tl-form-group">
          <label class="tl-label" for="demo-select">Deployment Environment</label>
          <select id="demo-select" class="tl-select">
            <option>Production (Edge CDN)</option>
            <option>Staging (Preview Branch)</option>
            <option>Development (Local Host)</option>
          </select>
          <span class="tl-helper-text">Select your target cluster for variable propagation.</span>
        </div>
      `;
    case "tabs":
      return `
        <div style="width: 100%; max-width: 480px;">
          <div class="tl-tabs-list" role="tablist">
            <button class="tl-tab-btn is-active" role="tab" aria-selected="true">Overview</button>
            <button class="tl-tab-btn" role="tab" aria-selected="false">API Reference</button>
            <button class="tl-tab-btn" role="tab" aria-selected="false">Usage Examples</button>
          </div>
          <div class="tl-tab-panel is-active" style="padding: 12px 0; color: var(--tl-sys-color-on-surface-variant); font-size: 13px;">
            Content area for the active Design Tokens panel.
          </div>
        </div>
      `;
    case "accordion":
      return `
        <div class="tl-accordion" style="width: 100%; max-width: 500px;">
          <div class="tl-accordion-item">
            <button class="tl-accordion-trigger" style="width: 100%; display: flex; justify-content: space-between; align-items: center; padding: 14px 16px; background: transparent; border: none; color: var(--tl-sys-color-on-surface); font-size: 14px; font-weight: 600; cursor: pointer;">
              <span>How are token tiers isolated?</span>
              <span>&minus;</span>
            </button>
            <div style="padding: 0 16px 14px 16px; color: var(--tl-sys-color-on-surface-variant); font-size: 13px; line-height: 1.5;">
              Components only reference Semantic tokens, ensuring zero accidental coupling with raw primitives.
            </div>
          </div>
        </div>
      `;
    case "divider":
      return `
        <div style="width: 100%; max-width: 480px; display: flex; flex-direction: column; gap: 14px;">
          <span style="font-size: 13px; color: var(--tl-sys-color-on-surface-variant);">Horizontal Divider:</span>
          <hr class="tl-divider" style="margin: 0;">
          <div style="display: flex; align-items: center; gap: 12px; font-size: 13px; color: var(--tl-sys-color-on-surface-muted);">
            <span>Item Left</span>
            <div class="tl-divider--vertical" style="height: 18px;" aria-hidden="true"></div>
            <span>Item Middle</span>
            <div class="tl-divider--vertical" style="height: 18px;" aria-hidden="true"></div>
            <span>Item Right</span>
          </div>
        </div>
      `;
    case "menu":
      return `
        <div class="tl-card" style="width: 100%; max-width: 240px; padding: 6px; box-shadow: var(--tl-sys-elevation-3);">
          <button class="tl-btn tl-btn--ghost tl-btn--sm" style="width: 100%; justify-content: flex-start;">Rename Symbol</button>
          <button class="tl-btn tl-btn--ghost tl-btn--sm" style="width: 100%; justify-content: flex-start;">Export Tokens</button>
          <hr class="tl-divider" style="margin: 4px 0;">
          <button class="tl-btn tl-btn--danger tl-btn--sm" style="width: 100%; justify-content: flex-start;">Delete Branch</button>
        </div>
      `;
    case "progress":
      return `
        <div style="width: 100%; max-width: 400px; display: flex; flex-direction: column; gap: 8px;">
          <div style="display: flex; justify-content: space-between; font-size: 12px; color: var(--tl-sys-color-on-surface-muted);">
            <span>Uploading tokens bundle...</span>
            <strong>75%</strong>
          </div>
          <div style="width: 100%; background: var(--tl-comp-spinner-track); border-radius: 9999px; height: 8px; overflow: hidden;">
            <div style="background: var(--tl-sys-color-primary); height: 100%; width: 75%;"></div>
          </div>
        </div>
      `;
    case "snackbar":
      return `
        <div class="tl-toast tl-toast--info" style="position: static; max-width: 380px;">
          <div class="tl-toast__icon"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg></div>
          <div class="tl-toast__content">
            <span class="tl-toast__title">Changes published</span>
            <span class="tl-toast__message">Design tokens updated in production.</span>
          </div>
          <button class="tl-toast__close" aria-label="Dismiss">&times;</button>
        </div>
      `;
    case "whiteboard-mockup":
      return `
        <div class="tl-whiteboard-frame" style="width: 100%; border-radius: var(--tl-comp-card-feature-radius); background: var(--tl-sys-color-miro-surface); border: 1px solid var(--tl-sys-color-miro-hairline); box-shadow: var(--tl-comp-whiteboard-shadow); padding: 24px; position: relative; overflow: hidden; min-height: 380px;">
          <!-- Top Floating Canvas Toolbar -->
          <div style="position: absolute; top: 16px; left: 50%; transform: translateX(-50%); display: flex; align-items: center; gap: 4px; background: var(--tl-sys-color-miro-canvas); padding: 4px 8px; border-radius: var(--tl-comp-button-pill-radius); box-shadow: var(--tl-sys-elevation-2); border: 1px solid var(--tl-sys-color-miro-hairline); z-index: 5;">
            <button class="tl-btn tl-btn--ghost tl-btn--sm" style="padding: 4px 8px; height: 32px;" title="Select tool">↖ Select</button>
            <button class="tl-btn tl-btn--miro-yellow tl-btn--sm" style="padding: 4px 10px; height: 32px;" title="Sticky note tool">📝 Sticky Note</button>
            <button class="tl-btn tl-btn--ghost tl-btn--sm" style="padding: 4px 8px; height: 32px;" title="Connector line">➔ Arrow</button>
            <button class="tl-btn tl-btn--ghost tl-btn--sm" style="padding: 4px 8px; height: 32px;" title="Shapes">▢ Shape</button>
            <div style="width: 1px; height: 18px; background: var(--tl-sys-color-miro-hairline); margin: 0 4px;"></div>
            <span style="font-size: 11px; font-weight: 700; color: var(--tl-sys-color-miro-slate); padding: 0 6px;">100%</span>
          </div>

          <!-- Canvas Interactive Elements Grid -->
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; padding-top: 56px; position: relative;">
            <!-- Sticky 1: Canary Yellow -->
            <div class="tl-card tl-card--feature tl-card--feature-yellow" style="padding: 18px; border-radius: var(--tl-sys-shape-md); box-shadow: var(--tl-sys-elevation-2); transform: rotate(-1deg); cursor: pointer;">
              <div style="font-size: 11px; font-weight: 800; letter-spacing: 0.05em; color: var(--tl-sys-color-miro-ink); margin-bottom: 6px;">DESIGN SYSTEM ARCHITECTURE</div>
              <p style="font-size: 13px; font-weight: 600; line-height: 1.4; color: var(--tl-sys-color-miro-ink); margin: 0 0 12px 0;">⚡ Synchronize Roobert PRO type scale &amp; 3-tier token engine.</p>
              <div style="display: flex; align-items: center; justify-content: space-between; font-size: 11px; color: var(--tl-sys-color-miro-slate);">
                <span>Deepak T.</span>
                <span>✔ Ready</span>
              </div>
            </div>

            <!-- Sticky 2: Coral Pastel -->
            <div class="tl-card tl-card--feature tl-card--feature-coral" style="padding: 18px; border-radius: var(--tl-sys-shape-md); box-shadow: var(--tl-sys-elevation-2); transform: rotate(1.5deg); cursor: pointer;">
              <div style="font-size: 11px; font-weight: 800; letter-spacing: 0.05em; color: var(--tl-sys-color-miro-coral-dark); margin-bottom: 6px;">COMPONENT FOUNDATIONS</div>
              <p style="font-size: 13px; font-weight: 600; line-height: 1.4; color: var(--tl-sys-color-miro-coral-dark); margin: 0 0 12px 0;">🎨 28px soft corner cards with yellow, coral, and teal pastel fills.</p>
              <div style="display: flex; align-items: center; justify-content: space-between; font-size: 11px; color: var(--tl-sys-color-miro-coral-dark);">
                <span>Sarah K.</span>
                <span>In review</span>
              </div>
            </div>

            <!-- Sticky 3: Teal Pastel -->
            <div class="tl-card tl-card--feature tl-card--feature-teal" style="padding: 18px; border-radius: var(--tl-sys-shape-md); box-shadow: var(--tl-sys-elevation-2); transform: rotate(-0.8deg); cursor: pointer;">
              <div style="font-size: 11px; font-weight: 800; letter-spacing: 0.05em; color: var(--tl-sys-color-miro-moss-dark); margin-bottom: 6px;">ZERO-BUILD PIPELINE</div>
              <p style="font-size: 13px; font-weight: 600; line-height: 1.4; color: var(--tl-sys-color-miro-moss-dark); margin: 0 0 12px 0;">🚀 Vanilla ES modules with 100% automated QA regression guards.</p>
              <div style="display: flex; align-items: center; justify-content: space-between; font-size: 11px; color: var(--tl-sys-color-miro-moss-dark);">
                <span>Alex M.</span>
                <span>Active</span>
              </div>
            </div>

            <!-- Sticky 4: Rose Pastel -->
            <div class="tl-card tl-card--feature tl-card--feature-rose" style="padding: 18px; border-radius: var(--tl-sys-shape-md); box-shadow: var(--tl-sys-elevation-2); transform: rotate(1.2deg); cursor: pointer;">
              <div style="font-size: 11px; font-weight: 800; letter-spacing: 0.05em; color: var(--tl-sys-color-miro-ink); margin-bottom: 6px;">WCAG 2.2 AA CONTRAST</div>
              <p style="font-size: 13px; font-weight: 600; line-height: 1.4; color: var(--tl-sys-color-miro-ink); margin: 0 0 12px 0;">🔒 Contrast ratios verified across all light &amp; dark canvases.</p>
              <div style="display: flex; align-items: center; justify-content: space-between; font-size: 11px; color: var(--tl-sys-color-miro-slate);">
                <span>Elena R.</span>
                <span>100% Pass</span>
              </div>
            </div>
          </div>

          <!-- Live Multiplayer Cursors -->
          <div style="position: absolute; bottom: 24px; left: 40px; display: flex; align-items: center; gap: 4px; pointer-events: none;">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="var(--tl-sys-color-miro-blue)"><polygon points="0,0 24,10 12,12 10,24"/></svg>
            <span style="background: var(--tl-sys-color-miro-blue); color: var(--tl-sys-color-miro-canvas); font-size: 10px; font-weight: 700; padding: 2px 8px; border-radius: 9999px;">Deepak T.</span>
          </div>

          <div style="position: absolute; bottom: 32px; right: 80px; display: flex; align-items: center; gap: 4px; pointer-events: none;">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="var(--tl-sys-color-miro-coral)"><polygon points="0,0 24,10 12,12 10,24"/></svg>
            <span style="background: var(--tl-sys-color-miro-coral); color: var(--tl-sys-color-miro-coral-dark); font-size: 10px; font-weight: 700; padding: 2px 8px; border-radius: 9999px;">Sarah K.</span>
          </div>
        </div>
      `;
    default:
      return `<button class="tl-btn tl-btn--primary tl-btn--md">${id}</button>`;
  }
}

function renderVariantMatrix(id, variants = []) {
  const customMatrices = {
    button: [
      {
        preview: `<button class="tl-btn tl-btn--primary tl-btn--sm">Primary</button>`,
        token: `.tl-btn--primary`,
        intent: `High-emphasis main action in a given container. Use only once per view.`
      },
      {
        preview: `<button class="tl-btn tl-btn--secondary tl-btn--sm">Secondary</button>`,
        token: `.tl-btn--secondary`,
        intent: `Medium-emphasis actions such as filters, pagination, or secondary choices.`
      },
      {
        preview: `<button class="tl-btn tl-btn--outline tl-btn--sm">Outline</button>`,
        token: `.tl-btn--outline`,
        intent: `Subtle, neutral actions with a bordered boundary. Commonly paired with primary actions.`
      },
      {
        preview: `<button class="tl-btn tl-btn--danger tl-btn--sm">Danger</button>`,
        token: `.tl-btn--danger`,
        intent: `Destructive, permanent, or high-risk actions like deletion and access revocation.`
      }
    ],
    avatar: [
      {
        preview: `<div class="tl-avatar tl-avatar--md"><span>DT</span><span class="tl-avatar__status tl-avatar__status--online"></span></div>`,
        token: `.tl-avatar--md + .tl-avatar__status--online`,
        intent: `Standard 32px profile avatar with live presence status indicator.`
      },
      {
        preview: `<div class="tl-avatar tl-avatar--sm"><span>JD</span><span class="tl-avatar__status tl-avatar__status--busy"></span></div>`,
        token: `.tl-avatar--sm + .tl-avatar__status--busy`,
        intent: `Compact 24px avatar optimized for dense data tables and comments.`
      },
      {
        preview: `<div class="tl-avatar-group"><div class="tl-avatar tl-avatar--sm"><span>A</span></div><div class="tl-avatar tl-avatar--sm"><span>B</span></div><div class="tl-avatar tl-avatar--sm tl-avatar--more">+3</div></div>`,
        token: `.tl-avatar-group`,
        intent: `Clustered overlapping avatars with +N counter for teams and reviewers.`
      }
    ],
    skeleton: [
      {
        preview: `<div class="tl-skeleton tl-skeleton--title" style="width: 140px; margin: 0;"></div>`,
        token: `.tl-skeleton--title`,
        intent: `Thick heading wireframe placeholder while title data loads.`
      },
      {
        preview: `<div class="tl-skeleton tl-skeleton--text" style="width: 180px; margin: 0;"></div>`,
        token: `.tl-skeleton--text`,
        intent: `Standard body line placeholder with animated shimmer.`
      },
      {
        preview: `<div class="tl-skeleton tl-skeleton--avatar" style="width: 32px; height: 32px;"></div>`,
        token: `.tl-skeleton--avatar`,
        intent: `Circular avatar placeholder for user profile elements.`
      }
    ],
    callout: [
      {
        preview: `<div class="tl-callout tl-callout--info" style="padding: 6px 10px;"><strong style="font-size: 12px;">Info</strong></div>`,
        token: `.tl-callout--info`,
        intent: `Informational notices, tips, and general system guidance.`
      },
      {
        preview: `<div class="tl-callout tl-callout--success" style="padding: 6px 10px;"><strong style="font-size: 12px;">Success</strong></div>`,
        token: `.tl-callout--success`,
        intent: `Confirmed events, verified states, and completed workflows.`
      },
      {
        preview: `<div class="tl-callout tl-callout--warning" style="padding: 6px 10px;"><strong style="font-size: 12px;">Warning</strong></div>`,
        token: `.tl-callout--warning`,
        intent: `Attention-requiring items, deprecations, or non-blocking warnings.`
      },
      {
        preview: `<div class="tl-callout tl-callout--danger" style="padding: 6px 10px;"><strong style="font-size: 12px;">Danger</strong></div>`,
        token: `.tl-callout--danger`,
        intent: `Critical errors, security notices, and destructive consequences.`
      }
    ],
    spinner: [
      {
        preview: `<div class="tl-spinner tl-spinner--sm"></div>`,
        token: `.tl-spinner--sm`,
        intent: `Compact 16px spinner for inline button and text field loading.`
      },
      {
        preview: `<div class="tl-spinner tl-spinner--md"></div>`,
        token: `.tl-spinner--md`,
        intent: `Standard 24px spinner for cards, tables, and content sections.`
      },
      {
        preview: `<div class="tl-spinner tl-spinner--lg"></div>`,
        token: `.tl-spinner--lg`,
        intent: `Large 32px spinner for modals and full-viewport loading states.`
      }
    ],
    badge: [
      {
        preview: `<span class="tl-badge tl-badge--neutral">Neutral</span>`,
        token: `.tl-badge--neutral`,
        intent: `General metadata, versions, and non-status categorizations.`
      },
      {
        preview: `<span class="tl-badge tl-badge--brand"><span class="tl-badge__dot"></span>Brand</span>`,
        token: `.tl-badge--brand`,
        intent: `Primary feature tag, system-level property, or active state.`
      },
      {
        preview: `<span class="tl-badge tl-badge--success"><span class="tl-badge__dot"></span>Passing</span>`,
        token: `.tl-badge--success`,
        intent: `Passing tests, verified status, and healthy operational states.`
      },
      {
        preview: `<span class="tl-badge tl-badge--danger"><span class="tl-badge__dot"></span>Failed</span>`,
        token: `.tl-badge--danger`,
        intent: `Failed builds, critical issues, and high-priority alerts.`
      }
    ]
  };

  const rows = customMatrices[id] || variants.map(v => ({
    preview: `<span class="tl-badge tl-badge--neutral">${v.name}</span>`,
    token: `.tl-${id}--${v.name.toLowerCase().replace(/\\s+/g, '-')}`,
    intent: v.desc || `Applies ${v.name} styling and behavior.`
  }));

  return `
    <table class="tl-variant-matrix-table">
      <thead>
        <tr>
          <th style="width: 220px;">Live Preview</th>
          <th style="width: 260px;">Token / Class Hook</th>
          <th>Design Guideline &amp; Intent</th>
        </tr>
      </thead>
      <tbody>
        ${rows.map(r => `
          <tr>
            <td class="tl-variant-matrix-preview">${r.preview}</td>
            <td class="tl-variant-matrix-token"><code>${r.token}</code></td>
            <td class="tl-variant-matrix-intent">${r.intent}</td>
          </tr>
        `).join("")}
      </tbody>
    </table>
  `;
}

function generateFigmaCodeConnect(component) {
  if (component.codeSnippets?.figma) return component.codeSnippets.figma;
  const compPascal = (component.title || "Component").replace(/[^a-zA-Z0-9]/g, "");
  const variants = component.variants || [];
  const variantEnumLines = variants.length > 0
    ? variants.slice(0, 4).map(v => `      ${v.name.replace(/[^a-zA-Z0-9]/g, '') || 'Default'}: '${v.name.toLowerCase().replace(/[^a-z0-9]/g, '-')}'`).join(',\n')
    : `      Default: 'default'`;

  return `import figma from '@figma/code-connect';
import { ${compPascal} } from './${compPascal}';

/**
 * Figma Code Connect definition for ${component.title}
 * Maps Figma component variants to production props.
 */
figma.connect(${compPascal}, 'https://www.figma.com/design/:file_key/:name?node-id=${component.id}', {
  props: {
    variant: figma.enum('Variant', {
${variantEnumLines}
    }),
    disabled: figma.boolean('Disabled'),
    children: figma.string('Label')
  },
  example: (props) => (
    <${compPascal}
      variant={props.variant}
      disabled={props.disabled}
    >
      {props.children}
    </${compPascal}>
  )
});`;
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
    const figmaPre = document.getElementById("code-snippet-figma")?.parentElement;
    const tabHtml = document.getElementById("tab-html");
    const tabCss = document.getElementById("tab-css");
    const tabFigma = document.getElementById("tab-figma");

    if (htmlPre) htmlPre.style.display = (tab === "html") ? "block" : "none";
    if (cssPre) cssPre.style.display = (tab === "css") ? "block" : "none";
    if (figmaPre) figmaPre.style.display = (tab === "figma") ? "block" : "none";

    if (tabHtml) tabHtml.classList.toggle("is-active", tab === "html");
    if (tabCss) tabCss.classList.toggle("is-active", tab === "css");
    if (tabFigma) tabFigma.classList.toggle("is-active", tab === "figma");
  };

  window.__toggleAnatomy = function() {
    const stage = document.getElementById("comp-demo-stage");
    if (stage) {
      stage.classList.toggle("has-anatomy-overlay");
      const isActive = stage.classList.contains("has-anatomy-overlay");
      if (window.Toast) {
        window.Toast.show({
          message: isActive ? "Figma Anatomy & Bounding Box Overlay Enabled" : "Figma Anatomy Overlay Hidden",
          type: "info"
        });
      }
    }
  };

  window.__copyActiveCode = function() {
    const tab = window.__activeCodeTab || "html";
    const el = document.getElementById(`code-snippet-${tab}`);
    if (el) {
      const label = tab === "figma" ? "Figma Code Connect" : tab.toUpperCase();
      if (typeof window.copyToClipboard === "function") {
        window.copyToClipboard(el.textContent, `${label} code`);
      } else if (navigator.clipboard) {
        navigator.clipboard.writeText(el.textContent);
        if (window.Toast) {
          window.Toast.show({ message: `Copied ${label} snippet to clipboard!`, type: "success" });
        }
      }
    }
  };
}

