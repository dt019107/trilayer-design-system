/**
 * TRILAYER DESIGN SYSTEM — FOUNDATION PAGES RENDERER
 * Renders Color, Typography, Spacing, Shape, Elevation, Motion, and Accessibility
 * live specimens powered directly by /data/tokens.js.
 */

import {
  colorPrimitives,
  semanticColorRoles,
  spacingScale,
  shapeScale,
  typographyScale,
  elevationScale,
  motionScale
} from "../data/tokens.js";
import { ColorEngine } from "../js/color-engine.js";

export const FoundationPages = {
  /**
   * 1. COLOR FOUNDATIONS
   */
  renderColor() {
    const families = [
      { name: "Primary Brand (Indigo)", swatches: colorPrimitives.indigo },
      { name: "Neutral Slate (Surfaces & Text)", swatches: colorPrimitives.gray },
      { name: "Functional Success (Emerald)", swatches: colorPrimitives.emerald },
      { name: "Functional Warning (Amber)", swatches: colorPrimitives.amber },
      { name: "Functional Danger (Rose)", swatches: colorPrimitives.rose },
      { name: "Functional Information (Sky)", swatches: colorPrimitives.sky },
      { name: "Creative Accent (Violet)", swatches: colorPrimitives.violet },
      { name: "Tertiary Accent (Teal)", swatches: colorPrimitives.teal }
    ];

    return `
      <div class="tl-page-header">
        <div class="tl-page-title-row">
          <h1 class="tl-page-title">Color System</h1>
          <span class="tl-badge tl-badge--brand">8 Tonal Palettes</span>
        </div>
        <p class="tl-page-subtitle">
          Full-spectrum 11-step color swatches (50 to 950) generated for high-contrast digital interfaces. Click any swatch to copy its CSS token name and hex value.
        </p>
      </div>

      <!-- Color Swatch Palettes Artboard -->
      <div class="tl-artboard" style="margin-bottom: 32px;">
        <div class="tl-artboard-header">
          <h2 class="tl-artboard-title" style="font-size: 16px;">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 2a7 7 0 0 0 7 7c0 2-1 3-2 4s-1 2-1 3"/><path d="M9 18h6"/></svg>
            Tonal Swatch Ramps (Layer 1 Primitives)
          </h2>
          <span style="font-size: 12px; color: var(--tl-sys-color-on-surface-muted);">1-Click Copy Token Name</span>
        </div>

        <div class="tl-artboard-body">
          ${families.map(fam => `
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
        </div>
      </div>

      <!-- Section: Semantic Role Mapping Table -->
      <div class="card" style="margin-bottom: 32px;">
        <h2 style="font-size: 18px; margin-bottom: 8px;">Layer 2: Semantic Color Roles</h2>
        <p style="font-size: 14px; margin-bottom: 16px;">How primitive tones map into UI roles across the pure light theme architecture.</p>
        <div style="overflow-x: auto;">
          <table style="width: 100%; border-collapse: collapse; font-size: 13px; text-align: left;">
            <thead>
              <tr style="border-bottom: 2px solid var(--tl-sys-color-outline-variant); color: var(--tl-sys-color-on-surface);">
                <th style="padding: 10px 12px;">Role Name</th>
                <th style="padding: 10px 12px;">Semantic Token</th>
                <th style="padding: 10px 12px;">Primitive Reference</th>
                <th style="padding: 10px 12px;">Description</th>
              </tr>
            </thead>
            <tbody>
              ${semanticColorRoles.map(item => `
                <tr style="border-bottom: 1px solid var(--tl-sys-color-outline-variant);">
                  <td style="padding: 10px 12px; font-weight: 600; color: var(--tl-sys-color-on-surface);">${item.name}</td>
                  <td style="padding: 10px 12px;"><code style="font-family: var(--tl-sys-font-family-code); font-size: 11px; color: var(--tl-sys-color-link);">${item.role}</code></td>
                  <td style="padding: 10px 12px;"><code style="font-family: var(--tl-sys-font-family-code); font-size: 11px;">${item.lightRef}</code></td>
                  <td style="padding: 10px 12px; color: var(--tl-sys-color-on-surface-variant);">${item.desc}</td>
                </tr>
              `).join("")}
            </tbody>
          </table>
        </div>
      </div>

      <div class="tl-page-pagination">
        <a href="#/get-started" class="tl-page-pagination-link">
          <span class="tl-page-pagination-dir">&larr; Previous</span>
          <span class="tl-page-pagination-title">Get Started</span>
        </a>
        <a href="#/foundations/typography" class="tl-page-pagination-link tl-page-pagination-link--next">
          <span class="tl-page-pagination-dir">Next Page &rarr;</span>
          <span class="tl-page-pagination-title">Typography</span>
        </a>
      </div>
    `;
  },

  /**
   * 2. TYPOGRAPHY FOUNDATIONS
   */
  renderTypography() {
    return `
      <div class="tl-page-header">
        <div class="tl-page-title-row">
          <h1 class="tl-page-title">Typography System</h1>
          <span class="tl-badge tl-badge--success">WCAG AA Ratio</span>
        </div>
        <p class="tl-page-subtitle">
          Trilayer pairs <strong>Manrope</strong> for structural headings, <strong>Inter</strong> for reading ergonomics, and <strong>JetBrains Mono</strong> for code &amp; token references.
        </p>
      </div>

      <!-- Type Pairs Overview -->
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 16px; margin-bottom: 32px;">
        <div class="card">
          <span class="tl-badge tl-badge--brand" style="margin-bottom: 8px;">Headings</span>
          <h2 style="font-family: var(--tl-ref-font-heading); font-size: 28px; margin-bottom: 6px;">Manrope</h2>
          <p style="font-size: 13px;">Geometric sans-serif with modern semi-round curves for distinctive page structure.</p>
        </div>

        <div class="card">
          <span class="tl-badge tl-badge--neutral" style="margin-bottom: 8px;">Body &amp; UI</span>
          <h2 style="font-family: var(--tl-ref-font-body); font-size: 28px; margin-bottom: 6px;">Inter</h2>
          <p style="font-size: 13px;">High x-height and exceptional micro-legibility optimized for complex interfaces.</p>
        </div>

        <div class="card">
          <span class="tl-badge layer-badge--comp" style="margin-bottom: 8px;">Code &amp; Tokens</span>
          <h2 style="font-family: var(--tl-ref-font-code); font-size: 24px; margin-bottom: 6px;">JetBrains Mono</h2>
          <p style="font-size: 13px;">Monospace font engineered for token names, code blocks, and variable references.</p>
        </div>
      </div>

      <!-- Type Scale Specimen Artboard -->
      <div class="tl-artboard" style="margin-bottom: 32px;">
        <div class="tl-artboard-header">
          <h2 class="tl-artboard-title" style="font-size: 16px;">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="4 7 4 4 20 4 20 7"/><line x1="9" y1="20" x2="15" y2="20"/><line x1="12" y1="4" x2="12" y2="20"/></svg>
            Type Scale Specimen &amp; Figma Attributes
          </h2>
          <span style="font-size: 12px; color: var(--tl-sys-color-on-surface-muted);">11 Font Roles</span>
        </div>
        <div class="tl-artboard-body">
          <div style="display: flex; flex-direction: column; gap: 20px;">
            ${typographyScale.map(item => `
              <div style="padding-bottom: 16px; border-bottom: 1px solid var(--tl-sys-color-outline-variant);">
                <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 8px; margin-bottom: 8px;">
                  <div style="display: flex; align-items: center; gap: 8px;">
                    <strong style="font-size: 13px; color: var(--tl-sys-color-on-surface);">${item.role}</strong>
                    <code style="font-size: 11px; color: var(--tl-sys-color-link);">${item.token}</code>
                  </div>
                  <div style="display: flex; gap: 6px; flex-wrap: wrap;">
                    <span class="tl-type-badge">${item.font}</span>
                    <span class="tl-type-badge">${item.size} / ${item.line}</span>
                    <span class="tl-type-badge">Weight: ${item.weight}</span>
                  </div>
                </div>
                <div style="font-family: ${item.font === 'Manrope' ? 'var(--tl-ref-font-heading)' : (item.font === 'JetBrains Mono' ? 'var(--tl-sys-font-family-code)' : 'var(--tl-ref-font-body)')}; font-size: ${item.size}; line-height: ${item.line}; font-weight: ${item.weight}; color: var(--tl-sys-color-on-surface); overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">
                  The quick brown fox jumps over the lazy dog.
                </div>
              </div>
            `).join("")}
          </div>
        </div>
      </div>

      <div class="tl-page-pagination">
        <a href="#/foundations/color" class="tl-page-pagination-link">
          <span class="tl-page-pagination-dir">&larr; Previous</span>
          <span class="tl-page-pagination-title">Color</span>
        </a>
        <a href="#/foundations/spacing" class="tl-page-pagination-link tl-page-pagination-link--next">
          <span class="tl-page-pagination-dir">Next Page &rarr;</span>
          <span class="tl-page-pagination-title">Spacing &amp; Layout</span>
        </a>
      </div>
    `;
  },

  /**
   * 3. SPACING FOUNDATIONS
   */
  renderSpacing() {
    return `
      <div class="tl-page-header">
        <div class="tl-page-title-row">
          <h1 class="tl-page-title">Spacing &amp; Layout Rhythm</h1>
          <span class="tl-badge tl-badge--brand">4px / 8px Grid</span>
        </div>
        <p class="tl-page-subtitle">
          A predictable modular spacing rhythm ensuring consistent visual cadence across cards, containers, controls, and reading canvases.
        </p>
      </div>

      <!-- Spacing Ruler Specimen Artboard -->
      <div class="tl-artboard" style="margin-bottom: 32px;">
        <div class="tl-artboard-header">
          <h2 class="tl-artboard-title" style="font-size: 16px;">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="21" y1="10" x2="3" y2="10"/><line x1="21" y1="6" x2="3" y2="6"/><line x1="21" y1="14" x2="3" y2="14"/><line x1="21" y1="18" x2="3" y2="18"/></svg>
            Spacing Scale Visual Ruler (2px &ndash; 64px)
          </h2>
          <span style="font-size: 12px; color: var(--tl-sys-color-on-surface-muted);">Base 4px / 8px Grid</span>
        </div>
        <div class="tl-artboard-body">
          <div style="display: flex; flex-direction: column; gap: 12px;">
            ${spacingScale.map(item => `
              <div style="display: flex; align-items: center; gap: 16px; padding: 6px 0;">
                <code style="min-width: 140px; font-size: 12px; color: var(--tl-sys-color-link);">${item.token}</code>
                <span style="min-width: 60px; font-size: 12px; font-weight: 600; color: var(--tl-sys-color-on-surface);">${item.value}</span>
                <span style="min-width: 70px; font-size: 12px; color: var(--tl-sys-color-on-surface-muted);">${item.rem}</span>
                <div style="flex: 1; display: flex; align-items: center; gap: 12px;">
                  <div style="width: ${item.value}; height: 20px; background-color: var(--tl-sys-color-primary); border-radius: var(--tl-sys-shape-xs); min-width: 2px;"></div>
                  <span style="font-size: 12px; color: var(--tl-sys-color-on-surface-variant);">${item.role}</span>
                </div>
              </div>
            `).join("")}
          </div>
        </div>
      </div>

      <div class="tl-page-pagination">
        <a href="#/foundations/typography" class="tl-page-pagination-link">
          <span class="tl-page-pagination-dir">&larr; Previous</span>
          <span class="tl-page-pagination-title">Typography</span>
        </a>
        <a href="#/foundations/shape" class="tl-page-pagination-link tl-page-pagination-link--next">
          <span class="tl-page-pagination-dir">Next Page &rarr;</span>
          <span class="tl-page-pagination-title">Shape</span>
        </a>
      </div>
    `;
  },

  /**
   * 4. SHAPE FOUNDATIONS
   */
  renderShape() {
    return `
      <div class="tl-page-header">
        <div class="tl-page-title-row">
          <h1 class="tl-page-title">Shape Scale</h1>
          <span class="tl-badge tl-badge--brand">Soft Corner Scale</span>
        </div>
        <p class="tl-page-subtitle">
          Trilayer uses a soft corner scale (4 / 8 / 12 / 16 / 24 px) paired with a full-round value, distinct from harsh squares or pill-heavy conventions.
        </p>
      </div>

      <!-- Shape Scale Specimen Artboard -->
      <div class="tl-artboard" style="margin-bottom: 32px;">
        <div class="tl-artboard-header">
          <h2 class="tl-artboard-title" style="font-size: 16px;">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="4" ry="4"/></svg>
            Corner Radius Scale (0px &ndash; 9999px)
          </h2>
          <span style="font-size: 12px; color: var(--tl-sys-color-on-surface-muted);">7 Shape Steps</span>
        </div>
        <div class="tl-artboard-body">
          <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 16px;">
            ${shapeScale.map(item => `
              <div class="tl-card" style="padding: 16px; border-radius: ${item.value}; background: var(--tl-sys-color-surface-container);">
                <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 8px;">
                  <strong style="font-size: 15px;">${item.value}</strong>
                  <code style="font-size: 11px; color: var(--tl-sys-color-link);">${item.token}</code>
                </div>
                <div style="font-size: 12px; color: var(--tl-sys-color-on-surface-variant);">${item.desc}</div>
              </div>
            `).join("")}
          </div>
        </div>
      </div>

      <div class="tl-page-pagination">
        <a href="#/foundations/spacing" class="tl-page-pagination-link">
          <span class="tl-page-pagination-dir">&larr; Previous</span>
          <span class="tl-page-pagination-title">Spacing &amp; Layout</span>
        </a>
        <a href="#/foundations/elevation" class="tl-page-pagination-link tl-page-pagination-link--next">
          <span class="tl-page-pagination-dir">Next Page &rarr;</span>
          <span class="tl-page-pagination-title">Elevation</span>
        </a>
      </div>
    `;
  },

  /**
   * 5. ELEVATION FOUNDATIONS
   */
  renderElevation() {
    return `
      <div class="tl-page-header">
        <div class="tl-page-title-row">
          <h1 class="tl-page-title">Elevation &amp; Surfaces</h1>
          <span class="tl-badge tl-badge--brand">Tonal &amp; Ambient</span>
        </div>
        <p class="tl-page-subtitle">
          Six elevation levels conveying visual depth. In Light Mode, Trilayer uses layered ambient + key drop shadows; in Dark Mode, elevation is rendered via tonal luminance lifts.
        </p>
      </div>

      <!-- Elevation Grid Specimen Artboard -->
      <div class="tl-artboard" style="margin-bottom: 32px;">
        <div class="tl-artboard-header">
          <h2 class="tl-artboard-title" style="font-size: 16px;">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
            Elevation Depth &amp; Drop Shadows
          </h2>
          <span style="font-size: 12px; color: var(--tl-sys-color-on-surface-muted);">6 Depth Tiers</span>
        </div>
        <div class="tl-artboard-body">
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 20px;">
            ${elevationScale.map((item, idx) => `
              <div class="tl-card" style="box-shadow: var(${item.token}); padding: 24px; background: var(--tl-sys-color-surface);">
                <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px;">
                  <h3 style="font-size: 18px; margin: 0;">${item.level}</h3>
                  <code style="font-size: 11px; color: var(--tl-sys-color-link);">${item.token}</code>
                </div>
                <p style="font-size: 13px; color: var(--tl-sys-color-on-surface-variant); margin-bottom: 12px;">${item.role}</p>
                <div style="font-family: var(--tl-sys-font-family-code); font-size: 11px; color: var(--tl-sys-color-on-surface-muted); background: var(--tl-sys-color-surface-container); padding: 6px 8px; border-radius: var(--tl-sys-shape-xs);">
                  ${item.shadow}
                </div>
              </div>
            `).join("")}
          </div>
        </div>
      </div>

      <div class="tl-page-pagination">
        <a href="#/foundations/shape" class="tl-page-pagination-link">
          <span class="tl-page-pagination-dir">&larr; Previous</span>
          <span class="tl-page-pagination-title">Shape</span>
        </a>
        <a href="#/foundations/motion" class="tl-page-pagination-link tl-page-pagination-link--next">
          <span class="tl-page-pagination-dir">Next Page &rarr;</span>
          <span class="tl-page-pagination-title">Motion</span>
        </a>
      </div>
    `;
  },

  /**
   * 6. MOTION FOUNDATIONS
   */
  renderMotion() {
    return `
      <div class="tl-page-header">
        <div class="tl-page-title-row">
          <h1 class="tl-page-title">Motion &amp; Choreography</h1>
          <span class="tl-badge tl-badge--success">Reduced-Motion Honored</span>
        </div>
        <p class="tl-page-subtitle">
          Eased cubic-bezier physics creating natural, purposeful transitions. Click "Replay Animations" to see each curve in action.
        </p>
      </div>

      <div class="card" style="margin-bottom: 32px;">
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 20px;">
          <h2 style="font-size: 18px; margin: 0;">Motion Curves In Action</h2>
          <button class="tl-btn tl-btn--primary tl-btn--sm" onclick="window.__replayMotion()">Replay Animations</button>
        </div>

        <div style="display: flex; flex-direction: column; gap: 24px;">
          ${motionScale.map((item, idx) => `
            <div>
              <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 8px;">
                <div>
                  <strong style="font-size: 14px; color: var(--tl-sys-color-on-surface);">${item.name}</strong>
                  <span style="font-size: 12px; color: var(--tl-sys-color-on-surface-muted); margin-left: 8px;">${item.desc}</span>
                </div>
                <code style="font-size: 11px; color: var(--tl-sys-color-link);">${item.curve}</code>
              </div>
              <div style="position: relative; height: 36px; background: var(--tl-sys-color-surface-container); border-radius: var(--tl-sys-shape-control); border: 1px solid var(--tl-sys-color-outline-variant); overflow: hidden;">
                <div class="motion-box-${idx}" style="position: absolute; top: 4px; left: 4px; height: 28px; width: 64px; background: var(--tl-sys-color-primary); border-radius: var(--tl-sys-shape-xs); display: flex; align-items: center; justify-content: center; font-size: 10px; font-weight: 700; color: #fff; transition: transform 600ms ${item.curve};">
                  ${item.name.split(' ')[0]}
                </div>
              </div>
            </div>
          `).join("")}
        </div>
      </div>

      <div class="tl-page-pagination">
        <a href="#/foundations/elevation" class="tl-page-pagination-link">
          <span class="tl-page-pagination-dir">&larr; Previous</span>
          <span class="tl-page-pagination-title">Elevation</span>
        </a>
        <a href="#/foundations/accessibility" class="tl-page-pagination-link tl-page-pagination-link--next">
          <span class="tl-page-pagination-dir">Next Page &rarr;</span>
          <span class="tl-page-pagination-title">Accessibility</span>
        </a>
      </div>
    `;
  },

  /**
   * 7. ICONOGRAPHY FOUNDATION SPECIMEN
   */
  renderIconography() {
    return `
      <div class="tl-page-header">
        <div class="tl-page-title-row">
          <h1 class="tl-page-title">Iconography System</h1>
          <span class="tl-badge tl-badge--brand">24px Core Grid</span>
        </div>
        <p class="tl-page-subtitle">
          Clean, purposeful iconography built on a 24&times;24 pixel coordinate system with 2px consistent strokes, balanced optical keylines, and accessible ARIA markup.
        </p>
      </div>

      <div class="card" style="margin-bottom: 32px;">
        <h2 style="font-size: 18px; margin-bottom: 12px;">Optical Keyline Specs &amp; Guidelines</h2>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 16px; margin-bottom: 24px;">
          <div style="padding: 16px; background: var(--tl-sys-color-surface-container); border-radius: var(--tl-sys-shape-container); border: 1px solid var(--tl-sys-color-outline-variant);">
            <div style="font-weight: 700; margin-bottom: 4px; font-size: 14px;">24&times;24 Coordinate Grid</div>
            <p style="font-size: 13px; margin: 0; color: var(--tl-sys-color-on-surface-variant);">All glyphs are authored on a 24px viewBox with a 2px interior safety margin (20px active live zone).</p>
          </div>
          <div style="padding: 16px; background: var(--tl-sys-color-surface-container); border-radius: var(--tl-sys-shape-container); border: 1px solid var(--tl-sys-color-outline-variant);">
            <div style="font-weight: 700; margin-bottom: 4px; font-size: 14px;">2px Geometric Stroke</div>
            <p style="font-size: 13px; margin: 0; color: var(--tl-sys-color-on-surface-variant);">Constant 2px stroke width with round line caps and line joins (<code>stroke-linecap="round" stroke-linejoin="round"</code>).</p>
          </div>
          <div style="padding: 16px; background: var(--tl-sys-color-surface-container); border-radius: var(--tl-sys-shape-container); border: 1px solid var(--tl-sys-color-outline-variant);">
            <div style="font-weight: 700; margin-bottom: 4px; font-size: 14px;">Accessible SVG Markup</div>
            <p style="font-size: 13px; margin: 0; color: var(--tl-sys-color-on-surface-variant);">Inline icons next to text use <code>aria-hidden="true"</code>; standalone icon buttons declare <code>aria-label</code>.</p>
          </div>
        </div>

        <h3 style="font-size: 15px; margin-bottom: 16px;">Core UI Icon Set (Click to Copy SVG)</h3>
        <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(130px, 1fr)); gap: 12px;">
          ${[
            { name: "Search", svg: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>' },
            { name: "Settings", svg: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>' },
            { name: "Check", svg: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>' },
            { name: "Close", svg: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>' },
            { name: "Bell", svg: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>' },
            { name: "Copy", svg: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>' },
            { name: "Chevron Right", svg: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>' },
            { name: "External Link", svg: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>' },
            { name: "Sun (Light)", svg: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>' },
            { name: "Moon (Dark)", svg: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>' },
            { name: "User", svg: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>' },
            { name: "Code", svg: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>' }
          ].map(item => `
            <button class="tl-card tl-card--interactive" style="display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 16px 8px; text-align: center; gap: 8px; background: var(--tl-sys-color-surface); cursor: pointer;" onclick="copyToClipboard('${item.svg.replace(/"/g, '&quot;')}', '${item.name} SVG')">
              <div style="color: var(--tl-sys-color-primary);">${item.svg}</div>
              <span style="font-size: 12px; font-weight: 600; color: var(--tl-sys-color-on-surface);">${item.name}</span>
            </button>
          `).join("")}
        </div>
      </div>

      <div class="tl-page-pagination">
        <a href="#/foundations/motion" class="tl-page-pagination-link">
          <span class="tl-page-pagination-dir">&larr; Previous</span>
          <span class="tl-page-pagination-title">Motion &amp; Choreography</span>
        </a>
        <a href="#/foundations/accessibility" class="tl-page-pagination-link tl-page-pagination-link--next">
          <span class="tl-page-pagination-dir">Next Page &rarr;</span>
          <span class="tl-page-pagination-title">Accessibility Standards</span>
        </a>
      </div>
    `;
  },

  /**
   * 8. ACCESSIBILITY FOUNDATIONS
   */
  renderAccessibility() {
    return `
      <div class="tl-page-header">
        <div class="tl-page-title-row">
          <h1 class="tl-page-title">Accessibility Standards</h1>
          <span class="tl-badge tl-badge--success">WCAG 2.2 AA Certified</span>
        </div>
        <p class="tl-page-subtitle">
          Core accessibility guarantees baked directly into Trilayer tokens, focus indicators, keyboard controllers, and semantic markup.
        </p>
      </div>

      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 16px; margin-bottom: 32px;">
        <div class="card">
          <h2 style="font-size: 16px; margin-bottom: 8px;">1. Contrast Ratios &ge; 4.5:1</h2>
          <p style="font-size: 13px;">Every text and semantic role pair is calculated to pass WCAG AA (and AAA for large titles). Dark mode adjusts primary luminescence automatically.</p>
        </div>

        <div class="card">
          <h2 style="font-size: 16px; margin-bottom: 8px;">2. Explicit Visible Focus Rings</h2>
          <p style="font-size: 13px;">All interactive triggers feature high-contrast <code>:focus-visible</code> rings with 2px offset, ensuring clear keyboard focus traversal.</p>
        </div>

        <div class="card">
          <h2 style="font-size: 16px; margin-bottom: 8px;">3. Focus Trapping &amp; Keyboard</h2>
          <p style="font-size: 13px;">Overlays trap focus within dialogs, close on Escape key, and restore focus to trigger upon dismissal.</p>
        </div>

        <div class="card">
          <h2 style="font-size: 16px; margin-bottom: 8px;">4. Prefers-Reduced-Motion</h2>
          <p style="font-size: 13px;">Honors user OS motion settings by reducing all duration values to 0.01ms, preventing vestibular distress.</p>
        </div>
      </div>

      <div class="tl-page-pagination">
        <a href="#/foundations/motion" class="tl-page-pagination-link">
          <span class="tl-page-pagination-dir">&larr; Previous</span>
          <span class="tl-page-pagination-title">Motion</span>
        </a>
        <a href="#/tokens/layers" class="tl-page-pagination-link tl-page-pagination-link--next">
          <span class="tl-page-pagination-dir">Next Page &rarr;</span>
          <span class="tl-page-pagination-title">Tokens Architecture</span>
        </a>
      </div>
    `;
  }
};

// Global animation replay helper for Motion page (browser-safe)
if (typeof window !== "undefined") {
  window.__replayMotion = function() {
    for (let i = 0; i < 4; i++) {
      const el = document.querySelector(`.motion-box-${i}`);
      if (el) {
        el.style.transform = "translateX(0px)";
        setTimeout(() => {
          const track = el.parentElement;
          const maxDist = track.clientWidth - el.clientWidth - 8;
          el.style.transform = `translateX(${maxDist}px)`;
        }, 50);
      }
    }
  };
}
