/**
 * TRILAYER DESIGN SYSTEM — COLOR & THEME ENGINE
 * Generates perceptual tonal ramps from any seed color using HSL / sRGB color space,
 * dynamically injects CSS variables to re-theme the entire website live,
 * and runs automated WCAG 2.2 AA contrast audits.
 */

export class ColorEngine {
  /**
   * Predefined enterprise palettes
   */
  static PRESETS = [
    { name: "Indigo Velvet (Default)", hex: "#5B5BD6", isDefault: true },
    { name: "Royal Violet", hex: "#7C3AED" },
    { name: "Ocean Cyan", hex: "#0284C7" },
    { name: "Emerald Forest", hex: "#059669" },
    { name: "Velvet Crimson", hex: "#E11D48" },
    { name: "Amber Gold", hex: "#D97706" }
  ];

  /**
   * Validates whether an input is a valid 3- or 6-character hex color
   */
  static isValidHex(hex) {
    if (typeof hex !== "string") return false;
    const clean = hex.startsWith("#") ? hex.slice(1).trim() : hex.trim();
    return /^[0-9a-fA-F]{3}$|^[0-9a-fA-F]{6}$/.test(clean);
  }

  /**
   * Normalizes any valid hex to #RRGGBB uppercase, or returns fallback
   */
  static normalizeHex(hex, fallback = "#5B5BD6") {
    if (!this.isValidHex(hex)) return fallback;
    let clean = hex.startsWith("#") ? hex.slice(1).trim() : hex.trim();
    if (clean.length === 3) {
      clean = clean.split("").map(c => c + c).join("");
    }
    return `#${clean.toUpperCase()}`;
  }

  /**
   * Converts hex string to RGB object {r, g, b}
   */
  static hexToRgb(hex) {
    const valid = this.normalizeHex(hex);
    const clean = valid.slice(1);
    const num = parseInt(clean, 16);
    return {
      r: (num >> 16) & 255,
      g: (num >> 8) & 255,
      b: num & 255
    };
  }

  /**
   * Converts RGB numbers to 6-digit uppercase hex string
   */
  static rgbToHex(r, g, b) {
    const toHex = c => Math.max(0, Math.min(255, Math.round(c))).toString(16).padStart(2, "0");
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`.toUpperCase();
  }

  /**
   * Converts RGB to HSL {h, s, l}
   */
  static rgbToHsl(r, g, b) {
    r /= 255; g /= 255; b /= 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;

    if (max === min) {
      h = s = 0;
    } else {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
      }
      h /= 6;
    }
    return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) };
  }

  /**
   * Converts HSL to RGB {r, g, b}
   */
  static hslToRgb(h, s, l) {
    h /= 360; s /= 100; l /= 100;
    let r, g, b;

    if (s === 0) {
      r = g = b = l;
    } else {
      const hue2rgb = (p, q, t) => {
        if (t < 0) t += 1;
        if (t > 1) t -= 1;
        if (t < 1/6) return p + (q - p) * 6 * t;
        if (t < 1/2) return q;
        if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
        return p;
      };
      const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      const p = 2 * l - q;
      r = hue2rgb(p, q, h + 1/3);
      g = hue2rgb(p, q, h);
      b = hue2rgb(p, q, h - 1/3);
    }
    return { r: Math.round(r * 255), g: Math.round(g * 255), b: Math.round(b * 255) };
  }

  /**
   * Generates a 12-step perceptual tonal palette from any seed color
   */
  static generateTonalPalette(seedHex) {
    const normalizedSeed = this.normalizeHex(seedHex);
    const rgb = this.hexToRgb(normalizedSeed);
    const hsl = this.rgbToHsl(rgb.r, rgb.g, rgb.b);

    // Tonal lightness anchors
    const toneSteps = [
      { step: "25",  l: 98, sFactor: 0.35 },
      { step: "50",  l: 96, sFactor: 0.55 },
      { step: "100", l: 92, sFactor: 0.70 },
      { step: "200", l: 84, sFactor: 0.85 },
      { step: "300", l: 74, sFactor: 0.95 },
      { step: "400", l: 67, sFactor: 1.00 },
      { step: "500", l: hsl.l, isSeed: true }, // exact seed
      { step: "600", l: Math.max(15, Math.round(hsl.l * 0.82)) },
      { step: "700", l: Math.max(12, Math.round(hsl.l * 0.68)) },
      { step: "800", l: Math.max(9,  Math.round(hsl.l * 0.54)) },
      { step: "900", l: Math.max(7,  Math.round(hsl.l * 0.42)) },
      { step: "950", l: Math.max(4, Math.round(hsl.l * 0.14)) }
    ];

    return toneSteps.map(t => {
      let stepHex;
      if (t.isSeed) {
        stepHex = normalizedSeed;
      } else {
        const adjustedSat = Math.min(100, Math.round(hsl.s * (t.sFactor || 1)));
        const stepRgb = this.hslToRgb(hsl.h, adjustedSat, t.l);
        stepHex = this.rgbToHex(stepRgb.r, stepRgb.g, stepRgb.b);
      }
      return {
        step: t.step,
        token: `--tl-ref-indigo-${t.step}`,
        hex: stepHex,
        isSeed: !!t.isSeed
      };
    });
  }

  /**
   * Calculates WCAG 2.1 relative luminance
   */
  static getRelativeLuminance(hex) {
    const { r, g, b } = this.hexToRgb(hex);
    const sRGB = [r, g, b].map(v => {
      const c = v / 255;
      return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
    });
    return 0.2126 * sRGB[0] + 0.7152 * sRGB[1] + 0.0722 * sRGB[2];
  }

  /**
   * Calculates WCAG contrast ratio between two colors
   */
  static getContrastRatio(hex1, hex2) {
    const l1 = this.getRelativeLuminance(hex1);
    const l2 = this.getRelativeLuminance(hex2);
    const lighter = Math.max(l1, l2);
    const darker = Math.min(l1, l2);
    const ratio = (lighter + 0.05) / (darker + 0.05);
    return Math.round(ratio * 100) / 100;
  }

  /**
   * Runs an accessibility check between foreground and background
   */
  static checkContrast(fgHex, bgHex) {
    const ratio = this.getContrastRatio(fgHex, bgHex);
    return {
      ratio,
      passesAA: ratio >= 4.5,
      passesAAA: ratio >= 7.0,
      passesLarge: ratio >= 3.0
    };
  }

  /**
   * Dynamically applies a generated tonal palette across the site via CSS custom properties
   */
  static applyThemeFromSeed(seedHex) {
    if (!this.isValidHex(seedHex)) {
      return { palette: null, audit: null, error: "Invalid hex color format" };
    }
    const normalizedSeed = this.normalizeHex(seedHex);
    const palette = this.generateTonalPalette(normalizedSeed);
    const root = document.documentElement;

    // 1. Inject Primitive overrides
    palette.forEach(item => {
      root.style.setProperty(item.token, item.hex);
    });

    // 2. Compute dynamic semantic roles for light theme
    const p500 = palette.find(p => p.step === "500").hex;
    const p600 = palette.find(p => p.step === "600").hex;
    const p700 = palette.find(p => p.step === "700").hex;
    const p100 = palette.find(p => p.step === "100").hex;
    const p50  = palette.find(p => p.step === "50").hex;
    const p900 = palette.find(p => p.step === "900").hex;
    const p950 = palette.find(p => p.step === "950").hex;
    const p400 = palette.find(p => p.step === "400").hex;

    // Set brand seed property
    root.style.setProperty("--tl-brand-seed", normalizedSeed);

    // Compute accessible on-primary text (white for dark primaries, deep tint for light primaries like amber)
    const onPrimary = this.getContrastRatio("#FFFFFF", p500) >= 4.5 ? "#FFFFFF" : p950;

    // Dynamic semantic injection
    root.style.setProperty("--tl-sys-color-primary", p500);
    root.style.setProperty("--tl-sys-color-on-primary", onPrimary);
    root.style.setProperty("--tl-sys-color-primary-hover", p600);
    root.style.setProperty("--tl-sys-color-primary-active", p700);
    root.style.setProperty("--tl-sys-color-primary-container", p50);
    root.style.setProperty("--tl-sys-color-on-primary-container", p900);
    root.style.setProperty("--tl-sys-color-secondary-container", p100);
    root.style.setProperty("--tl-sys-color-layer-semantic", p500);

    // Save to localStorage
    try {
      localStorage.setItem("trilayer_custom_seed", seedHex);
    } catch (e) {}

    // Dispatch event for UI reactivity
    const audit = this.runContrastAudit(palette);
    window.dispatchEvent(new CustomEvent("tl:palette-change", {
      detail: { seedHex, palette, audit }
    }));

    return { palette, audit };
  }

  /**
   * Audits all critical UI role pairs for WCAG AA compliance
   */
  static runContrastAudit(palette) {
    const p500 = palette.find(p => p.step === "500")?.hex || "#5B5BD6";
    const p400 = palette.find(p => p.step === "400")?.hex || "#787FE3";
    const p50  = palette.find(p => p.step === "50")?.hex  || "#EFF0FC";
    const p900 = palette.find(p => p.step === "900")?.hex || "#262272";
    const p950 = palette.find(p => p.step === "950")?.hex || "#0D0C30";
    const white = "#FFFFFF";
    const darkSurface = "#0A0C0E";

    // Adaptive on-primary foreground: white for deep tones, dark ink for high-luminance tones (amber/emerald)
    const onPrimary = this.getContrastRatio(white, p500) >= 4.5 ? white : p950;

    return [
      {
        pair: "On Primary vs Primary Button (Light)",
        fg: onPrimary,
        bg: p500,
        ...this.checkContrast(onPrimary, p500)
      },
      {
        pair: "Primary Container Text vs Fill (Light)",
        fg: p900,
        bg: p50,
        ...this.checkContrast(p900, p50)
      },
      {
        pair: "Primary Accent on Dark Surface",
        fg: p400,
        bg: darkSurface,
        ...this.checkContrast(p400, darkSurface)
      },
      {
        pair: "High-contrast Text on Canvas",
        fg: "#121417",
        bg: white,
        ...this.checkContrast("#121417", white)
      }
    ];
  }

  /**
   * Resets the site to the default Trilayer indigo palette (#5B5BD6)
   */
  static resetToDefault() {
    try {
      localStorage.removeItem("trilayer_custom_seed");
    } catch (e) {}

    const defaultSeed = "#5B5BD6";
    const palette = this.generateTonalPalette(defaultSeed);
    const root = document.documentElement;

    palette.forEach(item => {
      root.style.removeProperty(item.token);
    });

    root.style.removeProperty("--tl-brand-seed");
    root.style.removeProperty("--tl-sys-color-primary");
    root.style.removeProperty("--tl-sys-color-on-primary");
    root.style.removeProperty("--tl-sys-color-primary-hover");
    root.style.removeProperty("--tl-sys-color-primary-active");
    root.style.removeProperty("--tl-sys-color-primary-container");
    root.style.removeProperty("--tl-sys-color-on-primary-container");
    root.style.removeProperty("--tl-sys-color-secondary-container");
    root.style.removeProperty("--tl-sys-color-layer-semantic");

    const audit = this.runContrastAudit(palette);
    window.dispatchEvent(new CustomEvent("tl:palette-change", {
      detail: { seedHex: defaultSeed, palette, audit }
    }));

    return { palette, audit };
  }
}

