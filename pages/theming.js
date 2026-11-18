/**
 * TRILAYER DESIGN SYSTEM — THEMING & COLOR PLAYGROUND PAGE
 * Interactive live theme engine: pick any seed color to regenerate a 12-step tonal palette,
 * update the entire site live in real-time, and audit WCAG 2.2 AA contrast ratios.
 */

import { ColorEngine } from "../js/color-engine.js";

export function renderThemingPlayground(initialSeed = "#5B5BD6") {
  let currentSeed = initialSeed;
  try {
    if (typeof localStorage !== "undefined") {
      currentSeed = localStorage.getItem("trilayer_custom_seed") || initialSeed;
    }
  } catch (e) {}
  const palette = ColorEngine.generateTonalPalette(currentSeed);
  const audit = ColorEngine.runContrastAudit(palette);

  return `
    <div class="tl-page-header">
      <div class="tl-page-title-row">
        <h1 class="tl-page-title">Dynamic Theme Engine &amp; Playground</h1>
        <span class="tl-badge tl-badge--brand">Live Tonal Engine</span>
      </div>
      <p class="tl-page-subtitle">
        Pick any seed color to generate a 12-step tonal palette. The engine updates the entire documentation portal in real time and audits semantic role pairs for WCAG 2.2 AA contrast compliance.
      </p>
    </div>

    <!-- Main Playground Card -->
    <div class="card" style="margin-bottom: 32px;">
      <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 16px; margin-bottom: 24px;">
        <div>
          <h2 style="font-size: 18px; margin-bottom: 4px;">Seed Color Selector</h2>
          <p style="font-size: 13px; color: var(--tl-sys-color-on-surface-variant); margin: 0;">
            Choose a preset enterprise brand or enter a custom hex code.
          </p>
        </div>

        <div style="display: flex; align-items: center; gap: 12px; flex-wrap: wrap;">
          <!-- Color Picker Input -->
          <div style="display: flex; align-items: center; gap: 8px; padding: 4px 8px; border-radius: var(--tl-sys-shape-control); border: 1px solid var(--tl-sys-color-outline); background: var(--tl-sys-color-surface-container);">
            <input type="color" id="pg-color-input" value="${currentSeed}" style="width: 32px; height: 32px; border: none; border-radius: var(--tl-sys-shape-xs); cursor: pointer; background: transparent;" oninput="window.__onSeedChange(this.value)">
            <input type="text" id="pg-hex-input" value="${currentSeed}" maxlength="7" style="width: 80px; font-family: var(--tl-sys-font-family-code); font-size: 13px; font-weight: 600; border: none; background: transparent; color: var(--tl-sys-color-on-surface); outline: none;" onchange="window.__onSeedChange(this.value)">
          </div>

          <button class="tl-btn tl-btn--outline tl-btn--sm" onclick="window.__onResetTheme()">
            Reset to Default
          </button>
        </div>
      </div>

      <!-- Presets -->
      <div style="display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 24px;">
        ${ColorEngine.PRESETS.map(p => `
          <button class="tl-chip ${p.hex.toUpperCase() === currentSeed.toUpperCase() ? 'is-active' : ''}" onclick="window.__onSeedChange('${p.hex}')">
            <span style="display: inline-block; width: 10px; height: 10px; border-radius: var(--tl-sys-shape-full); background-color: ${p.hex};"></span>
            <span>${p.name}</span>
          </button>
        `).join("")}
      </div>

      <!-- Generated 12-Step Tonal Palette -->
      <h3 style="font-size: 15px; margin-bottom: 12px;">Generated 12-Step Tonal Ramp</h3>
      <div id="pg-tonal-ramp" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(80px, 1fr)); gap: 8px; margin-bottom: 32px;">
        ${palette.map(t => `
          <div style="border-radius: var(--tl-sys-shape-control); overflow: hidden; border: 1px solid var(--tl-sys-color-outline-variant); background: var(--tl-sys-color-surface);">
            <div style="height: 48px; background-color: ${t.hex};"></div>
            <div style="padding: 6px; font-size: 10px; font-family: var(--tl-sys-font-family-code); text-align: center;">
              <strong>${t.step}</strong><br>
              <span style="color: var(--tl-sys-color-on-surface-muted);">${t.hex}</span>
            </div>
          </div>
        `).join("")}
      </div>

      <!-- Live WCAG 2.2 AA Contrast Audit Table -->
      <h3 style="font-size: 15px; margin-bottom: 12px; display: flex; align-items: center; gap: 8px;">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
        Automated WCAG 2.2 AA Contrast Audit
      </h3>
      <div id="pg-contrast-audit" style="overflow-x: auto; margin-bottom: 32px;">
        <table style="width: 100%; border-collapse: collapse; font-size: 13px;">
          <thead>
            <tr style="border-bottom: 2px solid var(--tl-sys-color-outline-variant); text-align: left;">
              <th style="padding: 10px 12px;">Semantic Role Pair</th>
              <th style="padding: 10px 12px;">Foreground</th>
              <th style="padding: 10px 12px;">Background</th>
              <th style="padding: 10px 12px;">Contrast Ratio</th>
              <th style="padding: 10px 12px;">WCAG AA Status</th>
            </tr>
          </thead>
          <tbody>
            ${audit.map(a => `
              <tr style="border-bottom: 1px solid var(--tl-sys-color-outline-variant);">
                <td style="padding: 10px 12px; font-weight: 600; color: var(--tl-sys-color-on-surface);">${a.pair}</td>
                <td style="padding: 10px 12px;"><code style="font-size: 11px;">${a.fg}</code></td>
                <td style="padding: 10px 12px;"><code style="font-size: 11px;">${a.bg}</code></td>
                <td style="padding: 10px 12px; font-weight: 700;">${a.ratio}:1</td>
                <td style="padding: 10px 12px;">
                  ${a.passesAA 
                    ? `<span class="tl-badge tl-badge--success"><span class="tl-badge__dot"></span>Pass (${a.passesAAA ? 'AAA' : 'AA'})</span>`
                    : `<span class="tl-badge tl-badge--danger"><span class="tl-badge__dot"></span>Flagged &lt; 4.5:1</span>`
                  }
                </td>
              </tr>
            `).join("")}
          </tbody>
        </table>
      </div>

      <!-- Live Component Preview Card -->
      <h3 style="font-size: 15px; margin-bottom: 12px;">Live UI Component Preview</h3>
      <div class="component-specimen-box" style="margin-bottom: 0;">
        <div style="display: flex; gap: 12px; align-items: center; flex-wrap: wrap;">
          <button class="tl-btn tl-btn--primary tl-btn--md">Primary Action</button>
          <button class="tl-btn tl-btn--secondary tl-btn--md">Secondary Action</button>
          <button class="tl-btn tl-btn--outline tl-btn--md">Outline Action</button>
          <span class="tl-badge tl-badge--brand"><span class="tl-badge__dot"></span>Active Theme</span>
          <label class="tl-switch-label" style="margin-left: auto;">
            <input type="checkbox" class="tl-switch-input" checked>
            <span>Live Sync</span>
          </label>
        </div>
      </div>
    </div>

    <!-- Pagination -->
    <div class="tl-page-pagination">
      <a href="#/tokens/reference" class="tl-page-pagination-link">
        <span class="tl-page-pagination-dir">&larr; Previous</span>
        <span class="tl-page-pagination-title">Token Reference</span>
      </a>
      <a href="#/tokens/naming" class="tl-page-pagination-link tl-page-pagination-link--next">
        <span class="tl-page-pagination-dir">Next Page &rarr;</span>
        <span class="tl-page-pagination-title">Naming Conventions</span>
      </a>
    </div>
  `;
}

// Global browser listeners for Theme Playground
if (typeof window !== "undefined") {
  window.__onSeedChange = function(seedHex) {
    if (!seedHex) return;
    let formatted = seedHex.trim();
    if (!formatted.startsWith("#")) {
      formatted = "#" + formatted;
    }
    if (!ColorEngine.isValidHex(formatted)) return;

    const normalized = ColorEngine.normalizeHex(formatted);

    // Apply via ColorEngine
    const result = ColorEngine.applyThemeFromSeed(normalized);
    if (!result || result.error) return;

    // Sync input controls
    const colorInput = document.getElementById("pg-color-input");
    const hexInput = document.getElementById("pg-hex-input");
    const heroPicker = document.getElementById("hero-color-picker");
    if (colorInput) colorInput.value = normalized;
    if (hexInput) hexInput.value = normalized;
    if (heroPicker) heroPicker.value = normalized;

    // Re-render tonal ramp
    const rampEl = document.getElementById("pg-tonal-ramp");
    if (rampEl && result.palette) {
      rampEl.innerHTML = result.palette.map(t => `
        <div style="border-radius: var(--tl-sys-shape-control); overflow: hidden; border: 1px solid var(--tl-sys-color-outline-variant); background: var(--tl-sys-color-surface);">
          <div style="height: 48px; background-color: ${t.hex};"></div>
          <div style="padding: 6px; font-size: 10px; font-family: var(--tl-sys-font-family-code); text-align: center;">
            <strong>${t.step}</strong><br>
            <span style="color: var(--tl-sys-color-on-surface-muted);">${t.hex}</span>
          </div>
        </div>
      `).join("");
    }

    // Re-render contrast audit
    const auditEl = document.getElementById("pg-contrast-audit");
    if (auditEl && result.audit) {
      auditEl.innerHTML = `
        <table style="width: 100%; border-collapse: collapse; font-size: 13px;">
          <thead>
            <tr style="border-bottom: 2px solid var(--tl-sys-color-outline-variant); text-align: left;">
              <th style="padding: 10px 12px;">Semantic Role Pair</th>
              <th style="padding: 10px 12px;">Foreground</th>
              <th style="padding: 10px 12px;">Background</th>
              <th style="padding: 10px 12px;">Contrast Ratio</th>
              <th style="padding: 10px 12px;">WCAG AA Status</th>
            </tr>
          </thead>
          <tbody>
            ${result.audit.map(a => `
              <tr style="border-bottom: 1px solid var(--tl-sys-color-outline-variant);">
                <td style="padding: 10px 12px; font-weight: 600; color: var(--tl-sys-color-on-surface);">${a.pair}</td>
                <td style="padding: 10px 12px;"><code style="font-size: 11px;">${a.fg}</code></td>
                <td style="padding: 10px 12px;"><code style="font-size: 11px;">${a.bg}</code></td>
                <td style="padding: 10px 12px; font-weight: 700;">${a.ratio}:1</td>
                <td style="padding: 10px 12px;">
                  ${a.passesAA 
                    ? `<span class="tl-badge tl-badge--success"><span class="tl-badge__dot"></span>Pass (${a.passesAAA ? 'AAA' : 'AA'})</span>`
                    : `<span class="tl-badge tl-badge--danger"><span class="tl-badge__dot"></span>Flagged &lt; 4.5:1</span>`
                  }
                </td>
              </tr>
            `).join("")}
          </tbody>
        </table>
      `;
    }

    if (window.Toast) {
      window.Toast.show({ message: `Generated theme from ${seedHex.toUpperCase()}`, type: "success" });
    }
  };

  window.__onResetTheme = function() {
    ColorEngine.resetToDefault();
    const colorInput = document.getElementById("pg-color-input");
    const hexInput = document.getElementById("pg-hex-input");
    const heroPicker = document.getElementById("hero-color-picker");
    if (colorInput) colorInput.value = "#5B5BD6";
    if (hexInput) hexInput.value = "#5B5BD6";
    if (heroPicker) heroPicker.value = "#5B5BD6";

    window.__onSeedChange("#5B5BD6");
    if (window.Toast) {
      window.Toast.show({ message: "Reset to Trilayer Indigo default (#5B5BD6)", type: "info" });
    }
  };
}

