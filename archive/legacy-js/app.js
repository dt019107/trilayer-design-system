/**
 * MAIN DESIGN SYSTEM PORTAL APPLICATION
 * Manages 2-Column Responsive Layout, View Routing & Anchor Navigation,
 * Mobile Sidebar Drawer, and Global ⌘K Command Palette.
 */

document.addEventListener("DOMContentLoaded", () => {
  ViewRouter.init();
  MobileDrawer.init();
  CommandPalette.init();
  renderColorSwatches();
  renderTokenMatrix();
  setupTokenSearch();
  setupExportButtons();
});

// ==========================================================================
// VIEW ROUTER (Component-First Documentation Engine)
// ==========================================================================
const ViewRouter = {
  views: [
    "overview",
    "foundations",
    "comp-buttons",
    "comp-forms",
    "comp-cards-badges",
    "comp-overlays",
    "advanced-governance",
    "pattern-security"
  ],
  defaultView: "overview",

  init() {
    window.addEventListener("hashchange", () => this.handleRoute());
    this.handleRoute();
    this.setupNavLinks();
  },

  handleRoute() {
    let hash = window.location.hash.replace("#", "").trim();
    if (!hash) {
      this.navigate(this.defaultView, false, this.defaultView);
      return;
    }

    if (this.views.includes(hash)) {
      this.navigate(hash, false, hash);
      return;
    }

    const el = document.getElementById(hash);
    if (el) {
      const parentView = el.closest(".docs-view");
      if (parentView) {
        const parentViewId = parentView.id.replace("view-", "");
        this.navigate(parentViewId, false, hash);
        setTimeout(() => {
          const topOffset = el.getBoundingClientRect().top + window.scrollY - 84;
          window.scrollTo({ top: topOffset, behavior: "smooth" });
        }, 60);
        return;
      }
    }

    this.navigate(this.defaultView, false, this.defaultView);
  },

  navigate(viewId, updateHash = true, activeTarget = null) {
    if (updateHash) {
      window.location.hash = activeTarget ? `#${activeTarget}` : `#${viewId}`;
    }

    // Toggle active view container
    document.querySelectorAll(".docs-view").forEach(v => {
      v.classList.toggle("is-active", v.id === `view-${viewId}`);
    });

    // Toggle active sidebar links
    const targetToMatch = activeTarget || viewId;
    let foundMatch = false;

    // First, try exact sub-anchor match in sidebar
    document.querySelectorAll(".sidebar-nav a").forEach(link => {
      const linkTarget = (link.getAttribute("href") || "").replace("#", "");
      if (linkTarget === targetToMatch) {
        link.classList.add("is-active");
        foundMatch = true;
      } else {
        link.classList.remove("is-active");
      }
    });

    // If sub-anchor was not explicitly in the sidebar, fall back to matching the viewId
    if (!foundMatch) {
      document.querySelectorAll(".sidebar-nav a").forEach(link => {
        const linkTarget = (link.getAttribute("href") || "").replace("#", "");
        link.classList.toggle("is-active", linkTarget === viewId);
      });
    }

    // Scroll main window to top only if navigating to a main view root
    if (!activeTarget || this.views.includes(activeTarget)) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }

    // Close mobile drawer if open
    MobileDrawer.close();
  },

  setupNavLinks() {
    document.addEventListener("click", (e) => {
      const link = e.target.closest("a[href^='#']");
      if (!link) return;

      const target = link.getAttribute("href").replace("#", "");
      if (this.views.includes(target)) {
        e.preventDefault();
        this.navigate(target, true, target);
      } else {
        const el = document.getElementById(target);
        if (el) {
          const parentView = el.closest(".docs-view");
          if (parentView) {
            e.preventDefault();
            const parentViewId = parentView.id.replace("view-", "");
            this.navigate(parentViewId, true, target);
            setTimeout(() => {
              const topOffset = el.getBoundingClientRect().top + window.scrollY - 84;
              window.scrollTo({ top: topOffset, behavior: "smooth" });
            }, 60);
          }
        }
      }
    });
  }
};

window.ViewRouter = ViewRouter;

// ==========================================================================
// MOBILE SIDEBAR DRAWER CONTROLLER
// ==========================================================================
const MobileDrawer = {
  sidebar: null,
  backdrop: null,

  init() {
    this.sidebar = document.getElementById("docs-sidebar");
    this.backdrop = document.getElementById("docs-sidebar-backdrop");

    document.addEventListener("click", (e) => {
      if (e.target.closest("#btn-mobile-sidebar")) {
        this.toggle();
        return;
      }
      if (e.target === this.backdrop) {
        this.close();
      }
    });
  },

  open() {
    if (this.sidebar) this.sidebar.classList.add("is-open");
    if (this.backdrop) this.backdrop.classList.add("is-open");
    document.body.style.overflow = "hidden";
  },

  close() {
    if (this.sidebar) this.sidebar.classList.remove("is-open");
    if (this.backdrop) this.backdrop.classList.remove("is-open");
    document.body.style.overflow = "";
  },

  toggle() {
    if (this.sidebar && this.sidebar.classList.contains("is-open")) {
      this.close();
    } else {
      this.open();
    }
  }
};

// ==========================================================================
// GLOBAL COMMAND PALETTE (⌘K)
// ==========================================================================
const CommandPalette = {
  overlay: null,
  input: null,
  results: null,

  searchItems: [
    { title: "Cover & Architecture Overview", category: "Getting Started", view: "overview", desc: "3-layer linking rules and mental model" },
    { title: "Figma Variables Setup (3 Collections)", category: "Getting Started", view: "overview", desc: "Primitives, Semantics and Component variable collections" },
    { title: "Color Tokens & Contrast Matrix", category: "Foundations", view: "foundations", desc: "Palette ramps, contrast ratios & swatches" },
    { title: "Typography Scale & Figma Text Styles", category: "Foundations", view: "foundations", desc: "Public Sans and JetBrains Mono styles" },
    { title: "4px Grid & Spacing Scale", category: "Foundations", view: "foundations", desc: "Spatial hierarchy, padding & layout scale" },
    { title: "Elevation Levels & Corner Radii", category: "Foundations", view: "foundations", desc: "Figma Effect Styles and border radius tokens" },
    { title: "Button Component Set (5 Types)", category: "Components", view: "comp-buttons", desc: "Primary, secondary, outline, ghost & destructive variants" },
    { title: "Input Field & Form Controls", category: "Components", view: "comp-forms", desc: "Accessible inputs, validation states, helper text" },
    { title: "Cards & Surface Containers", category: "Components", view: "comp-cards-badges", desc: "Interactive cards, elevation lift and surface grouping" },
    { title: "Status Badges & Tags", category: "Components", view: "comp-cards-badges", desc: "Status pills, dot badges and tag chips" },
    { title: "Modal Dialog & Overlays", category: "Components", view: "comp-overlays", desc: "Accessible dialogs, focus trapping, backdrop dismiss" },
    { title: "Toast Notifications System", category: "Components", view: "comp-overlays", desc: "Dynamic alert dispatch system" },
    { title: "Component Properties Wiring", category: "Advanced", view: "advanced-governance", desc: "Boolean, text and instance swap properties" },
    { title: "Auto Layout Resizing Rules", category: "Advanced", view: "advanced-governance", desc: "Hug, Fill container and Fixed constraint specifications" },
    { title: "Library Governance & Versioning", category: "Advanced", view: "advanced-governance", desc: "Semantic versioning and deprecation lifecycle" },
    { title: "Team Security & API Console", category: "Patterns", view: "pattern-security", desc: "Two-factor auth and production API token management" }
  ],

  init() {
    this.overlay = document.getElementById("command-palette-modal");
    this.input = document.getElementById("command-palette-input");
    this.results = document.getElementById("command-palette-results");

    if (!this.overlay) return;

    // Trigger buttons
    document.querySelectorAll("[data-command-trigger]").forEach(btn => {
      btn.addEventListener("click", () => this.open());
    });

    // Global ⌘K / Ctrl+K
    document.addEventListener("keydown", (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        this.toggle();
      }
      if (e.key === "Escape" && this.isOpen()) {
        this.close();
      }
    });

    // Close on backdrop click
    this.overlay.addEventListener("click", (e) => {
      if (e.target === this.overlay) this.close();
    });

    // Search filter
    this.input.addEventListener("input", (e) => this.renderResults(e.target.value));
  },

  open() {
    this.overlay.classList.add("is-open");
    this.input.value = "";
    this.renderResults("");
    setTimeout(() => this.input.focus(), 50);
  },

  close() {
    this.overlay.classList.remove("is-open");
  },

  toggle() {
    if (this.isOpen()) this.close();
    else this.open();
  },

  isOpen() {
    return this.overlay.classList.contains("is-open");
  },

  renderResults(query) {
    const q = query.toLowerCase().trim();
    const matches = this.searchItems.filter(item => {
      if (!q) return true;
      return item.title.toLowerCase().includes(q) ||
             item.category.toLowerCase().includes(q) ||
             item.desc.toLowerCase().includes(q);
    });

    if (matches.length === 0) {
      this.results.innerHTML = `
        <div style="padding: 24px; text-align: center; color: var(--sem-color-text-muted); font-size: 13px;">
          No matching documentation or components found.
        </div>
      `;
      return;
    }

    this.results.innerHTML = matches.map(item => `
      <div class="command-palette__item" onclick="CommandPalette.select('${item.view}')">
        <div>
          <div style="font-weight: 600;">${item.title}</div>
          <div style="font-size: 11px; color: var(--sem-color-text-secondary);">${item.desc}</div>
        </div>
        <span class="command-palette__tag">${item.category}</span>
      </div>
    `).join("");
  },

  select(viewId) {
    this.close();
    ViewRouter.navigate(viewId, true);
  }
};

// ==========================================================================
// CONTRAST CALCULATION & SWATCH INSPECTOR
// ==========================================================================
function getLuminance(hex) {
  let rgb = hex.replace("#", "");
  if (rgb.length === 3) rgb = rgb.split("").map(c => c + c).join("");
  const r = parseInt(rgb.substring(0, 2), 16) / 255;
  const g = parseInt(rgb.substring(2, 4), 16) / 255;
  const b = parseInt(rgb.substring(4, 6), 16) / 255;

  const a = [r, g, b].map(v => {
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  });
  return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
}

function getContrastRatio(hex1, hex2) {
  try {
    const lum1 = getLuminance(hex1);
    const lum2 = getLuminance(hex2);
    const brightest = Math.max(lum1, lum2);
    const darkest = Math.min(lum1, lum2);
    return ((brightest + 0.05) / (darkest + 0.05)).toFixed(1);
  } catch (e) {
    return "4.5";
  }
}

function renderColorSwatches() {
  const container = document.getElementById("color-swatches-grid");
  if (!container || !window.DS_TOKENS) return;

  const colorPrimitives = window.DS_TOKENS.primitives.filter(p => p.category === "color");
  container.innerHTML = colorPrimitives.map(token => {
    const isDark = getLuminance(token.value) < 0.4;
    const contrastOnWhite = getContrastRatio(token.value, "#ffffff");

    return `
      <div class="swatch-card" onclick="copyToClipboard('${token.name}', 'Copied ${token.name}')">
        <div class="swatch-preview" style="background-color: ${token.value}; color: ${isDark ? '#fff' : '#0d1522'}">
          <span class="swatch-val">${token.value}</span>
        </div>
        <div class="swatch-info">
          <div class="swatch-name">${token.name.replace('--pr-color-', '')}</div>
          <div class="swatch-meta">
            <code>${token.name}</code>
            <span class="ds-badge ds-badge--neutral" style="font-size: 10px; padding: 1px 4px;">
              ${contrastOnWhite}:1
            </span>
          </div>
        </div>
      </div>
    `;
  }).join("");
}

// ==========================================================================
// TOKEN MATRIX & EXPORT
// ==========================================================================
function renderTokenMatrix(filterQuery = "") {
  const tbody = document.getElementById("token-matrix-body");
  if (!tbody || !window.DS_TOKENS) return;

  const q = filterQuery.toLowerCase().trim();
  const rows = window.DS_TOKENS.components.filter(item => {
    if (!q) return true;
    return item.component.toLowerCase().includes(q) ||
           item.token.toLowerCase().includes(q) ||
           item.aliasSemantic.toLowerCase().includes(q) ||
           item.resolvedPrimitive.toLowerCase().includes(q);
  });

  if (rows.length === 0) {
    tbody.innerHTML = `<tr><td colspan="4" style="text-align: center; color: var(--sem-color-text-muted); padding: 32px;">No tokens match your search filter.</td></tr>`;
    return;
  }

  tbody.innerHTML = rows.map(item => `
    <tr>
      <td>
        <span class="ds-badge ds-badge--brand">${item.component}</span>
      </td>
      <td>
        <strong style="cursor: pointer;" onclick="copyToClipboard('${item.token}', 'Copied ${item.token}')">
          <code>${item.token}</code>
        </strong>
      </td>
      <td>
        <code style="color: var(--sem-brand-600); cursor: pointer;" onclick="copyToClipboard('${item.aliasSemantic}', 'Copied ${item.aliasSemantic}')">
          ${item.aliasSemantic}
        </code>
      </td>
      <td>
        <code style="color: var(--sem-color-text-secondary);">${item.resolvedPrimitive}</code>
      </td>
    </tr>
  `).join("");
}

function setupTokenSearch() {
  const searchInput = document.getElementById("token-search-input");
  if (!searchInput) return;

  searchInput.addEventListener("input", (e) => {
    renderTokenMatrix(e.target.value);
  });
}

function setupExportButtons() {
  const copyBtn = document.getElementById("btn-copy-tokens-json");
  const downloadBtn = document.getElementById("btn-download-tokens-json");

  const getTokensJson = () => {
    return fetch("tokens/tokens.json")
      .then(r => r.text())
      .catch(() => JSON.stringify(window.DS_TOKENS, null, 2));
  };

  if (copyBtn) {
    copyBtn.addEventListener("click", async () => {
      const json = await getTokensJson();
      copyToClipboard(json, "Tokens JSON copied to clipboard!");
    });
  }

  if (downloadBtn) {
    downloadBtn.addEventListener("click", async () => {
      const json = await getTokensJson();
      const blob = new Blob([json], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "design-tokens-dtcg.json";
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
      Toast.show({ title: "Downloaded", message: "design-tokens-dtcg.json saved!", type: "success" });
    });
  }
}
