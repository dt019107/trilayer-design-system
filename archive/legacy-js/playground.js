/**
 * FIGMA COMPONENT INSPECTOR & INTERACTIVE CANVAS
 * Built specifically for Product Designers: displays Figma Component Properties,
 * Auto Layout dimensions, and bound Variable chains. Zero raw JSON code.
 */

const Playground = {
  state: {
    component: "button",
    variant: "primary",
    size: "md",
    label: "Publish Token Library",
    iconLeft: true,
    iconRight: false,
    disabled: false,
    loading: false
  },

  init() {
    this.renderControls();
    this.updatePreview();
    this.setupListeners();
  },

  renderControls() {
    const controlsContainer = document.getElementById("playground-controls");
    if (!controlsContainer) return;

    controlsContainer.innerHTML = `
      <div style="font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; color: var(--sem-color-text-muted); margin-bottom: 4px;">
        Figma Properties Panel
      </div>

      <div class="playground-control-row">
        <label class="ds-label">❖ Component Set</label>
        <select id="pg-comp-select" class="ds-input ds-select ds-input--sm">
          <option value="button" ${this.state.component === 'button' ? 'selected' : ''}>❖ Button</option>
          <option value="input" ${this.state.component === 'input' ? 'selected' : ''}>❖ Input Field</option>
          <option value="badge" ${this.state.component === 'badge' ? 'selected' : ''}>❖ Badge / Status</option>
          <option value="card" ${this.state.component === 'card' ? 'selected' : ''}>❖ Card Container</option>
        </select>
      </div>

      <div class="playground-control-row">
        <label class="ds-label">Variant: Type</label>
        <select id="pg-variant-select" class="ds-input ds-select ds-input--sm">
          ${this.getVariantOptions()}
        </select>
      </div>

      <div class="playground-control-row">
        <label class="ds-label">Variant: Size</label>
        <select id="pg-size-select" class="ds-input ds-select ds-input--sm">
          <option value="sm" ${this.state.size === 'sm' ? 'selected' : ''}>Small (32px)</option>
          <option value="md" ${this.state.size === 'md' ? 'selected' : ''}>Medium (40px)</option>
          <option value="lg" ${this.state.size === 'lg' ? 'selected' : ''}>Large (48px)</option>
        </select>
      </div>

      <div class="playground-control-row">
        <label class="ds-label">Text Property: label</label>
        <input type="text" id="pg-label-input" class="ds-input ds-input--sm" value="${this.state.label}">
      </div>

      <div style="display: flex; flex-direction: column; gap: 10px; margin-top: 10px; padding-top: 10px; border-top: 1px solid var(--sem-color-border-subtle);">
        <label class="ds-checkbox-wrapper">
          <input type="checkbox" id="pg-icon-toggle" class="ds-checkbox" ${this.state.iconLeft ? 'checked' : ''}>
          <span style="font-size: 13px;">Boolean: hasLeadingIcon</span>
        </label>

        <label class="ds-checkbox-wrapper">
          <input type="checkbox" id="pg-icon-right-toggle" class="ds-checkbox" ${this.state.iconRight ? 'checked' : ''}>
          <span style="font-size: 13px;">Boolean: hasTrailingIcon</span>
        </label>

        <label class="ds-checkbox-wrapper">
          <input type="checkbox" id="pg-disabled-toggle" class="ds-checkbox" ${this.state.disabled ? 'checked' : ''}>
          <span style="font-size: 13px;">State: Disabled</span>
        </label>

        <label class="ds-checkbox-wrapper">
          <input type="checkbox" id="pg-loading-toggle" class="ds-checkbox" ${this.state.loading ? 'checked' : ''}>
          <span style="font-size: 13px;">State: Loading</span>
        </label>
      </div>
    `;
  },

  getVariantOptions() {
    if (this.state.component === "button") {
      return `
        <option value="primary" ${this.state.variant === 'primary' ? 'selected' : ''}>Primary (Filled)</option>
        <option value="tonal" ${this.state.variant === 'tonal' ? 'selected' : ''}>Filled Tonal (M3)</option>
        <option value="secondary" ${this.state.variant === 'secondary' ? 'selected' : ''}>Secondary</option>
        <option value="outline" ${this.state.variant === 'outline' ? 'selected' : ''}>Outline</option>
        <option value="ghost" ${this.state.variant === 'ghost' ? 'selected' : ''}>Ghost</option>
        <option value="danger" ${this.state.variant === 'danger' ? 'selected' : ''}>Destructive</option>
      `;
    }
    if (this.state.component === "badge") {
      return `
        <option value="brand" ${this.state.variant === 'brand' ? 'selected' : ''}>Brand Accent</option>
        <option value="tonal" ${this.state.variant === 'tonal' ? 'selected' : ''}>Tonal Container (M3)</option>
        <option value="tertiary" ${this.state.variant === 'tertiary' ? 'selected' : ''}>Tertiary Accent (M3)</option>
        <option value="neutral" ${this.state.variant === 'neutral' ? 'selected' : ''}>Neutral Muted</option>
        <option value="success" ${this.state.variant === 'success' ? 'selected' : ''}>Success State</option>
        <option value="warning" ${this.state.variant === 'warning' ? 'selected' : ''}>Warning State</option>
        <option value="danger" ${this.state.variant === 'danger' ? 'selected' : ''}>Danger State</option>
        <option value="info" ${this.state.variant === 'info' ? 'selected' : ''}>Informational</option>
      `;
    }
    if (this.state.component === "input") {
      return `
        <option value="default" ${this.state.variant === 'default' ? 'selected' : ''}>Default State</option>
        <option value="error" ${this.state.variant === 'error' ? 'selected' : ''}>Error Validation State</option>
      `;
    }
    return `
      <option value="default" ${this.state.variant === 'default' ? 'selected' : ''}>Default Surface</option>
      <option value="interactive" ${this.state.variant === 'interactive' ? 'selected' : ''}>Interactive Lift</option>
    `;
  },

  updatePreview() {
    const previewArea = document.getElementById("playground-preview-render");
    const traceArea = document.getElementById("playground-trace-render");
    const specArea = document.getElementById("playground-code-render");
    if (!previewArea) return;

    let html = "";
    let autoLayoutInfo = {};
    let variableBindings = [];
    let tokenChain = [];

    const iconLeftSvg = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>`;
    const iconRightSvg = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"/></svg>`;

    if (this.state.component === "button") {
      const cls = [
        "ds-btn",
        `ds-btn--${this.state.variant}`,
        `ds-btn--${this.state.size}`,
        this.state.loading ? "ds-btn--loading" : ""
      ].filter(Boolean).join(" ");

      const sizeHeights = { sm: "32px", md: "40px", lg: "48px" };
      const sizePaddings = { sm: "8px", md: "16px", lg: "24px" };

      html = `
        <button class="${cls}" ${this.state.disabled ? 'disabled' : ''}>
          ${this.state.iconLeft && !this.state.loading ? iconLeftSvg : ""}
          <span>${this.state.label}</span>
          ${this.state.iconRight && !this.state.loading ? iconRightSvg : ""}
        </button>
      `;

      autoLayoutInfo = {
        direction: "Horizontal (Auto Layout)",
        resizing: `Hug contents (${sizeHeights[this.state.size]})`,
        paddingX: `${sizePaddings[this.state.size]} (space/${this.state.size === 'sm' ? '8' : (this.state.size === 'lg' ? '24' : '16')})`,
        gap: "8px (space/8)"
      };

      variableBindings = [
        { prop: "Fill", variable: `button/${this.state.variant}/bg`, semantic: this.state.variant === 'tonal' ? 'color/primary-container' : 'color/bg/brand-default', value: this.state.variant === 'tonal' ? 'Tonal Container' : '#1e5ee6' },
        { prop: "Text Fill", variable: `button/${this.state.variant}/text`, semantic: this.state.variant === 'tonal' ? 'color/on-primary-container' : 'color/text/inverse', value: this.state.variant === 'tonal' ? '#1e5ee6' : '#ffffff' },
        { prop: "Corner Radius", variable: "button/radius", semantic: "radius/control", value: "6px" },
        { prop: "Padding X", variable: `button/padding/x/${this.state.size}`, semantic: `space/inset/${this.state.size}`, value: sizePaddings[this.state.size] }
      ];

      tokenChain = [
        {
          layer3: `button/${this.state.variant}/bg`,
          layer2: this.state.variant === 'primary' ? 'color/bg/brand-default' : (this.state.variant === 'tonal' ? 'color/primary-container' : (this.state.variant === 'danger' ? 'color/status/danger-solid' : 'color/bg/subtle')),
          layer1: this.state.variant === 'primary' ? 'color/blue/600 (#1e5ee6)' : (this.state.variant === 'tonal' ? 'color-mix(brand-500, 14%)' : (this.state.variant === 'danger' ? 'color/red/600 (#dc2626)' : 'color/neutral/100 (#edf2f7)'))
        },
        {
          layer3: `button/radius`,
          layer2: `radius/control`,
          layer1: `radius/6 (6px)`
        },
        {
          layer3: `button/padding/x/${this.state.size}`,
          layer2: `space/inset/${this.state.size}`,
          layer1: `space/${this.state.size === 'sm' ? '8 (8px)' : (this.state.size === 'lg' ? '24 (24px)' : '16 (16px)')}`
        }
      ];
    } else if (this.state.component === "input") {
      const isError = this.state.variant === "error";
      html = `
        <div class="ds-form-group" style="max-width: 320px; width: 100%;">
          <label class="ds-label ds-label--required">Figma Input Field</label>
          <div class="ds-input-wrapper">
            ${this.state.iconLeft ? `<span class="ds-input-icon-left">${iconLeftSvg}</span>` : ""}
            <input
              type="text"
              class="ds-input ds-input--${this.state.size} ${this.state.iconLeft ? 'ds-input--has-icon-left' : ''}"
              placeholder="${this.state.label}"
              ${isError ? 'aria-invalid="true"' : ''}
              ${this.state.disabled ? 'disabled' : ''}
            >
          </div>
          <span class="ds-helper-text ${isError ? 'ds-helper-text--error' : ''}">
            ${isError ? 'Invalid field input value' : 'Helper instruction text'}
          </span>
        </div>
      `;

      autoLayoutInfo = {
        direction: "Vertical (Stack)",
        resizing: "Fill container (Width: 100%)",
        paddingX: "16px (space/16)",
        gap: "4px (space/4)"
      };

      variableBindings = [
        { prop: "Container Fill", variable: "input/bg", semantic: "color/bg/surface", value: "#ffffff" },
        { prop: "Border Stroke", variable: isError ? "input/border/error" : "input/border/default", semantic: isError ? "color/status/danger-solid" : "color/border/default", value: isError ? "#dc2626" : "#c6d2df" },
        { prop: "Corner Radius", variable: "input/radius", semantic: "radius/control", value: "6px" }
      ];

      tokenChain = [
        {
          layer3: `input/bg`,
          layer2: `color/bg/surface`,
          layer1: `color/neutral/0 (#ffffff)`
        },
        {
          layer3: isError ? `input/border/error` : `input/border/default`,
          layer2: isError ? `color/status/danger-solid` : `color/border/default`,
          layer1: isError ? `color/red/600 (#dc2626)` : `color/neutral/300 (#c6d2df)`
        }
      ];
    } else if (this.state.component === "badge") {
      html = `
        <span class="ds-badge ds-badge--${this.state.variant}">
          ${this.state.iconLeft ? '<span class="ds-badge__dot"></span>' : ""}
          <span>${this.state.label}</span>
        </span>
      `;

      autoLayoutInfo = {
        direction: "Horizontal",
        resizing: "Hug contents (22px)",
        paddingX: "8px (space/8)",
        gap: "6px"
      };

      variableBindings = [
        { prop: "Badge Fill", variable: `badge/${this.state.variant}/bg`, semantic: `color/status/${this.state.variant}-bg`, value: "var(--sem-color)" },
        { prop: "Text Fill", variable: `badge/${this.state.variant}/text`, semantic: `color/status/${this.state.variant}-text`, value: "var(--sem-color)" },
        { prop: "Corner Radius", variable: "badge/radius", semantic: "radius/badge", value: "9999px (Pill)" }
      ];

      tokenChain = [
        {
          layer3: `badge/${this.state.variant}/bg`,
          layer2: `color/status/${this.state.variant}-bg`,
          layer1: `color/${this.state.variant === 'brand' ? 'blue' : this.state.variant}/50`
        }
      ];
    } else if (this.state.component === "card") {
      html = `
        <div class="ds-card ${this.state.variant === 'interactive' ? 'ds-card--interactive' : ''}" style="max-width: 320px; width: 100%;">
          <div class="ds-card__header">
            <h4 class="ds-card__title" style="font-size: 15px;">${this.state.label}</h4>
            <span class="ds-badge ds-badge--brand"><span class="ds-badge__dot"></span>Live</span>
          </div>
          <div class="ds-card__body" style="font-size: 13px;">
            Figma Card component bound to semantic surface tokens for instant theme switching.
          </div>
          <div class="ds-card__footer">
            <button class="ds-btn ds-btn--outline ds-btn--sm">Dismiss</button>
            <button class="ds-btn ds-btn--primary ds-btn--sm">Save Settings</button>
          </div>
        </div>
      `;

      autoLayoutInfo = {
        direction: "Vertical",
        resizing: "Fixed (320px)",
        paddingX: "16px (space/16)",
        gap: "12px (space/12)"
      };

      variableBindings = [
        { prop: "Card Surface", variable: "card/bg", semantic: "color/bg/surface", value: "#ffffff" },
        { prop: "Border Stroke", variable: "card/border", semantic: "color/border/subtle", value: "#dce4ed" },
        { prop: "Corner Radius", variable: "card/radius", semantic: "radius/card", value: "12px" }
      ];

      tokenChain = [
        {
          layer3: `card/bg`,
          layer2: `color/bg/surface`,
          layer1: `color/neutral/0 (#ffffff)`
        }
      ];
    }

    previewArea.innerHTML = html;

    // Render 3-Layer Trace diagram
    traceArea.innerHTML = tokenChain.map(t => `
      <div class="trace-row">
        <div class="trace-pill trace-pill--l3">
          <span class="trace-pill__layer">L3 Component Token</span>
          <code>❖ ${t.layer3}</code>
        </div>
        <div class="trace-arrow">➔</div>
        <div class="trace-pill trace-pill--l2">
          <span class="trace-pill__layer">L2 Semantic Token</span>
          <code>${t.layer2}</code>
        </div>
        <div class="trace-arrow">➔</div>
        <div class="trace-pill trace-pill--l1">
          <span class="trace-pill__layer">L1 Primitive</span>
          <code>${t.layer1}</code>
        </div>
      </div>
    `).join("");

    // Render Designer-Centric Specs Card (No raw JSON!)
    if (specArea) {
      specArea.innerHTML = `
        <div class="figma-inspector-card">
          <div class="figma-inspector-header">
            <span>❖ Figma Auto Layout Specifications</span>
            <span class="figma-canvas-badge">Auto Layout V5</span>
          </div>
          <div class="figma-prop-row">
            <span class="figma-prop-name">Layout Flow</span>
            <span class="figma-prop-value">${autoLayoutInfo.direction}</span>
          </div>
          <div class="figma-prop-row">
            <span class="figma-prop-name">Horizontal Padding</span>
            <span class="figma-prop-value">${autoLayoutInfo.paddingX}</span>
          </div>
          <div class="figma-prop-row">
            <span class="figma-prop-name">Item Gap</span>
            <span class="figma-prop-value">${autoLayoutInfo.gap}</span>
          </div>
          <div class="figma-prop-row">
            <span class="figma-prop-name">Resizing Rule</span>
            <span class="figma-prop-value">${autoLayoutInfo.resizing}</span>
          </div>

          <div class="figma-inspector-header" style="border-top: 1px solid var(--sem-color-border-subtle); margin-top: 6px;">
            <span>❖ Bound Figma Variables</span>
            <span style="font-size: 10px; color: var(--sem-color-text-muted);">Scoped in Collections</span>
          </div>
          ${variableBindings.map(b => `
            <div class="figma-prop-row">
              <span class="figma-prop-name">
                <span class="figma-swatch-dot" style="background-color: ${b.value};"></span>
                ${b.prop}
              </span>
              <span class="figma-variable-pill">
                ${b.variable}
              </span>
            </div>
          `).join("")}
        </div>
      `;
    }
  },

  setupListeners() {
    document.addEventListener("change", (e) => {
      if (e.target.id === "pg-comp-select") {
        this.state.component = e.target.value;
        if (this.state.component === "button") {
          this.state.variant = "primary";
          this.state.label = "Publish Token Library";
          this.state.iconLeft = true;
          this.state.iconRight = false;
        } else if (this.state.component === "input") {
          this.state.variant = "default";
          this.state.label = "Enter corporate email...";
          this.state.iconLeft = true;
          this.state.iconRight = false;
        } else if (this.state.component === "badge") {
          this.state.variant = "brand";
          this.state.label = "Published";
          this.state.iconLeft = true;
          this.state.iconRight = false;
        } else if (this.state.component === "card") {
          this.state.variant = "default";
          this.state.label = "API Authentication Key";
          this.state.iconLeft = false;
          this.state.iconRight = false;
        }
        this.renderControls();
        this.updatePreview();
      } else if (e.target.id === "pg-variant-select") {
        this.state.variant = e.target.value;
        this.updatePreview();
      } else if (e.target.id === "pg-size-select") {
        this.state.size = e.target.value;
        this.updatePreview();
      } else if (e.target.id === "pg-icon-toggle") {
        this.state.iconLeft = e.target.checked;
        this.updatePreview();
      } else if (e.target.id === "pg-icon-right-toggle") {
        this.state.iconRight = e.target.checked;
        this.updatePreview();
      } else if (e.target.id === "pg-disabled-toggle") {
        this.state.disabled = e.target.checked;
        this.updatePreview();
      } else if (e.target.id === "pg-loading-toggle") {
        this.state.loading = e.target.checked;
        this.updatePreview();
      }
    });

    document.addEventListener("input", (e) => {
      if (e.target.id === "pg-label-input") {
        this.state.label = e.target.value || "Button";
        this.updatePreview();
      }
    });

    window.addEventListener("theme-change", () => {
      this.updatePreview();
    });
  }
};

document.addEventListener("DOMContentLoaded", () => Playground.init());
