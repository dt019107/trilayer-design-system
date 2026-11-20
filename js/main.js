/**
 * TRILAYER DESIGN SYSTEM — APPLICATION BOOTSTRAP (ES MODULE)
 * Initializes Theme, Navigation Shell, and Hash Router.
 */

import { ThemeManager } from "./theme.js";
import { NavigationController } from "./nav.js";
import { Router } from "./router.js";
import { ColorEngine } from "./color-engine.js";
import { CommandPalette } from "./search.js";
import { TableOfContents } from "./toc.js";
import { Toast } from "./components/feedback.js";
import { copyToClipboard } from "./utils/copy-code.js";

// Make global utilities available
window.Toast = Toast;
window.copyToClipboard = copyToClipboard;

// Global Theme Seed Switcher for Hero & Playgrounds
window.__onSeedChange = function(seedHex) {
  try {
    const result = ColorEngine.applyThemeFromSeed(seedHex);
    localStorage.setItem("trilayer_custom_seed", seedHex);
    const picker = document.getElementById("hero-color-picker");
    if (picker && picker.value !== seedHex) picker.value = seedHex;
    
    // Update live badge indicator if present
    const contrastBadge = document.getElementById("hero-contrast-ratio");
    if (contrastBadge && result && result.contrastRatio) {
      contrastBadge.textContent = `${result.contrastRatio}:1 AAA`;
    }
    
    Toast.show({ 
      message: `Tonal palette regenerated from seed ${seedHex}`, 
      type: "info" 
    });
  } catch (err) {
    console.error("Failed to apply theme seed:", err);
  }
};

window.__onResetTheme = function() {
  try {
    localStorage.removeItem("trilayer_custom_seed");
    ColorEngine.resetToDefault();
    const picker = document.getElementById("hero-color-picker");
    if (picker) picker.value = "#5B5BD6";
    Toast.show({ message: "Reset to default Indigo brand theme", type: "info" });
  } catch (err) {
    console.error("Failed to reset theme:", err);
  }
};

document.addEventListener("DOMContentLoaded", () => {
  // 1. Check & apply custom theme seed if saved
  try {
    const savedSeed = localStorage.getItem("trilayer_custom_seed");
    if (savedSeed) {
      ColorEngine.applyThemeFromSeed(savedSeed);
    }
  } catch (e) {}

  // 2. Initialize Theme & Density Manager
  const themeManager = new ThemeManager();

  // 3. Initialize Navigation Shell Controller (builds dynamic sidebar & drawer)
  const navController = new NavigationController();

  // 4. Initialize Client-Side Hash Router
  const router = new Router(navController);

  // 5. Initialize Command Palette Search (Cmd+K)
  const commandPalette = new CommandPalette();
  window.__commandPalette = commandPalette;

  // 6. Initialize Table of Contents & Scroll-Spy
  const tableOfContents = new TableOfContents();
  window.__tableOfContents = tableOfContents;

  // Make available for debugging or console testing if needed
  window.__TRILAYER__ = {
    themeManager,
    navController,
    router,
    commandPalette,
    tableOfContents
  };
});

