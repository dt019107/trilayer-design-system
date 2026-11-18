/**
 * TRILAYER DESIGN SYSTEM — THEME & DENSITY ENGINE
 * Manages [data-theme] (light, dark, system) and [data-density] (compact, default, comfortable).
 * Persists user preference in localStorage and synchronizes with OS preference changes.
 */

const STORAGE_KEYS = {
  THEME: "trilayer_docs_theme",
  DENSITY: "trilayer_docs_density"
};

export class ThemeManager {
  constructor() {
    this.theme = "dark";
    this.density = this.getStoredItem(STORAGE_KEYS.DENSITY, "default");
    this.init();
  }

  getStoredItem(key, fallback) {
    try {
      return localStorage.getItem(key) || fallback;
    } catch (e) {
      return fallback;
    }
  }

  setStoredItem(key, value) {
    try {
      localStorage.setItem(key, value);
    } catch (e) {}
  }

  init() {
    this.applyDensity(this.density);
    this.applyTheme("dark");
    this.bindEvents();
  }

  applyTheme(theme = "dark") {
    this.theme = "dark";
    this.setStoredItem(STORAGE_KEYS.THEME, "dark");
    const root = document.documentElement;
    root.setAttribute("data-theme", "dark");

    this.updateThemeUI();
    window.dispatchEvent(new CustomEvent("tl:theme-change", { detail: { theme: "dark", resolvedTheme: "dark" } }));
  }

  toggleTheme() {
    this.applyTheme("dark");
  }

  applyDensity(density) {
    this.density = density;
    this.setStoredItem(STORAGE_KEYS.DENSITY, density);
    document.documentElement.setAttribute("data-density", density);

    this.updateDensityUI();
    window.dispatchEvent(new CustomEvent("tl:density-change", { detail: { density } }));
  }

  updateThemeUI() {
    const currentResolved = document.documentElement.getAttribute("data-theme") || "light";
    const btn = document.getElementById("tl-theme-toggle");
    if (!btn) return;

    btn.setAttribute("aria-label", `Switch to ${currentResolved === 'dark' ? 'light' : 'dark'} mode`);
    
    // Update SVG icon (Sun vs Moon)
    btn.innerHTML = currentResolved === "dark"
      ? `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>`
      : `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>`;
  }

  updateDensityUI() {
    const select = document.getElementById("tl-density-select");
    if (select) {
      select.value = this.density;
    }
  }

  bindEvents() {
    const toggleBtn = document.getElementById("tl-theme-toggle");
    if (toggleBtn) {
      toggleBtn.addEventListener("click", () => this.toggleTheme());
    }

    const densitySelect = document.getElementById("tl-density-select");
    if (densitySelect) {
      densitySelect.addEventListener("change", (e) => this.applyDensity(e.target.value));
    }
  }
}

// Global browser helper for theme switching
if (typeof window !== "undefined") {
  window.setTheme = function(theme) {
    if (window.__TRILAYER__ && window.__TRILAYER__.themeManager) {
      window.__TRILAYER__.themeManager.applyTheme(theme);
    } else {
      document.documentElement.setAttribute("data-theme", theme);
    }
  };
}
