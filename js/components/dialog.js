/**
 * TRILAYER DESIGN SYSTEM — DIALOG CONTROLLER
 * Full WCAG 2.2 AA compliant modal behavior: focus trapping, Escape key dismiss,
 * restore trigger focus, and background scroll locking.
 */

export class Dialog {
  constructor(overlayId) {
    this.overlay = document.getElementById(overlayId);
    if (!this.overlay) return;

    this.dialog = this.overlay.querySelector(".tl-dialog");
    this.previouslyFocused = null;
    this.init();
  }

  init() {
    // Backdrop click dismiss
    this.overlay.addEventListener("click", (e) => {
      if (e.target === this.overlay) {
        this.close();
      }
    });

    // Close buttons inside dialog
    this.overlay.querySelectorAll("[data-dialog-close]").forEach(btn => {
      btn.addEventListener("click", () => this.close());
    });

    // Keyboard accessibility: ESC key and Tab focus trapping
    document.addEventListener("keydown", (e) => {
      if (!this.isOpen()) return;

      if (e.key === "Escape") {
        this.close();
      } else if (e.key === "Tab") {
        this.trapFocus(e);
      }
    });
  }

  isOpen() {
    return this.overlay.classList.contains("is-open");
  }

  open(triggerElement = null) {
    this.previouslyFocused = triggerElement || document.activeElement;
    this.overlay.classList.add("is-open");
    this.overlay.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";

    // Focus first interactive element inside dialog
    const focusable = this.getFocusableElements();
    if (focusable.length > 0) {
      setTimeout(() => focusable[0].focus(), 50);
    }
  }

  close() {
    this.overlay.classList.remove("is-open");
    this.overlay.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";

    // Restore focus to original trigger
    if (this.previouslyFocused && typeof this.previouslyFocused.focus === "function") {
      this.previouslyFocused.focus();
    }
  }

  getFocusableElements() {
    return Array.from(
      this.dialog.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      )
    ).filter(el => !el.disabled && el.offsetParent !== null);
  }

  trapFocus(e) {
    const focusable = this.getFocusableElements();
    if (focusable.length === 0) return;

    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (e.shiftKey) {
      if (document.activeElement === first) {
        e.preventDefault();
        last.focus();
      }
    } else {
      if (document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  }
}

