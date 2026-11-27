/**
 * TRILAYER DESIGN SYSTEM — TOAST & SNACKBAR SYSTEM
 * Production-ready, accessible notification dispatcher with auto-dismiss,
 * keyboard dismissal, action triggers, and pause-on-hover/focus.
 */

export class Toast {
  static container = null;
  static activeToasts = [];

  static init(position = "bottom-right") {
    let el = document.getElementById("tl-toast-container");
    if (!el) {
      el = document.createElement("div");
      el.id = "tl-toast-container";
      el.className = `tl-toast-container tl-toast-container--${position}`;
      el.setAttribute("aria-live", "polite");
      el.setAttribute("aria-atomic", "false");
      document.body.appendChild(el);
    } else if (position) {
      el.className = `tl-toast-container tl-toast-container--${position}`;
    }
    this.container = el;
    return el;
  }

  /**
   * Dispatches a new Toast notification.
   * @param {Object} options
   * @param {string} [options.title] - Optional title for two-line toast
   * @param {string} options.message - Notification message content
   * @param {string} [options.type="info"] - "info" | "success" | "warning" | "error" | "neutral"
   * @param {number} [options.duration=4000] - Duration in ms (0 for persistent)
   * @param {Object} [options.action] - Optional action { label: string, onClick: Function }
   * @param {string} [options.position="bottom-right"] - Container viewport position
   */
  static show({
    title = null,
    message = "",
    type = "info",
    duration = 4000,
    action = null,
    position = "bottom-right"
  }) {
    if (typeof document === "undefined") return;
    this.init(position);

    const toast = document.createElement("div");
    toast.className = `tl-toast tl-toast--${type}`;

    // WAI-ARIA role according to severity
    const isAssertive = type === "error" || type === "warning";
    toast.setAttribute("role", isAssertive ? "alert" : "status");
    toast.setAttribute("aria-live", isAssertive ? "assertive" : "polite");
    toast.tabIndex = 0; // Allows focus for keyboard users

    // Semantic SVG icons
    let iconSvg = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>`;
    if (type === "success") {
      iconSvg = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>`;
    } else if (type === "warning") {
      iconSvg = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>`;
    } else if (type === "error") {
      iconSvg = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>`;
    } else if (type === "neutral") {
      iconSvg = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>`;
    }

    const titleHtml = title ? `<span class="tl-toast__title">${title}</span>` : "";
    const actionHtml = action ? `<button type="button" class="tl-toast__action">${action.label}</button>` : "";

    toast.innerHTML = `
      <span class="tl-toast__icon">${iconSvg}</span>
      <div class="tl-toast__content">
        ${titleHtml}
        <span class="tl-toast__message">${message}</span>
        ${actionHtml}
      </div>
      <button type="button" class="tl-toast__close" aria-label="Dismiss notification">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
      </button>
      ${duration > 0 ? `<div class="tl-toast__progress" aria-hidden="true"></div>` : ""}
    `;

    // Action button listener
    if (action && typeof action.onClick === "function") {
      const actionBtn = toast.querySelector(".tl-toast__action");
      if (actionBtn) {
        actionBtn.addEventListener("click", (e) => {
          e.stopPropagation();
          action.onClick(toast);
          this.dismiss(toast);
        });
      }
    }

    // Close button listener
    const closeBtn = toast.querySelector(".tl-toast__close");
    if (closeBtn) {
      closeBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        this.dismiss(toast);
      });
    }

    this.container.appendChild(toast);
    this.activeToasts.push(toast);

    // Auto-dismiss countdown with pause-on-hover and pause-on-focus
    if (duration > 0) {
      let timer = null;
      let remaining = duration;
      let startTime = Date.now();
      const progressBar = toast.querySelector(".tl-toast__progress");

      const updateProgress = () => {
        if (progressBar) {
          progressBar.style.transition = `transform ${remaining}ms linear`;
          progressBar.style.transform = "scaleX(0)";
        }
      };

      const startTimer = () => {
        startTime = Date.now();
        updateProgress();
        timer = setTimeout(() => this.dismiss(toast), remaining);
      };

      const pauseTimer = () => {
        if (timer) {
          clearTimeout(timer);
          timer = null;
          remaining -= (Date.now() - startTime);
          if (remaining < 400) remaining = 400;
          if (progressBar) {
            const computedWidth = progressBar.getBoundingClientRect().width;
            const parentWidth = toast.getBoundingClientRect().width || 1;
            const currentScale = Math.max(0, computedWidth / parentWidth);
            progressBar.style.transition = "none";
            progressBar.style.transform = `scaleX(${currentScale})`;
          }
        }
      };

      toast.addEventListener("mouseenter", pauseTimer);
      toast.addEventListener("mouseleave", startTimer);
      toast.addEventListener("focusin", pauseTimer);
      toast.addEventListener("focusout", startTimer);

      // Initial start
      requestAnimationFrame(() => {
        startTimer();
      });
    }

    return toast;
  }

  static dismiss(toast) {
    if (!toast || !toast.parentNode) return;
    toast.style.opacity = "0";
    toast.style.transform = "translateY(8px) scale(0.96)";
    toast.style.transition = "all var(--tl-sys-motion-duration-quick) ease";
    
    setTimeout(() => {
      if (toast.parentNode) {
        toast.parentNode.removeChild(toast);
      }
      this.activeToasts = this.activeToasts.filter(t => t !== toast);
    }, 180);
  }

  static dismissAll() {
    [...this.activeToasts].forEach(toast => this.dismiss(toast));
  }
}

// Attach to window for global convenience
if (typeof window !== "undefined") {
  window.Toast = Toast;
}

// Global keyboard listener: Escape dismisses focused toast or active tooltip
if (typeof document !== "undefined") {
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      // 1. Check if active toast is focused or present
      if (Toast.activeToasts && Toast.activeToasts.length > 0) {
        const focusedToast = document.activeElement ? document.activeElement.closest(".tl-toast") : null;
        if (focusedToast) {
          Toast.dismiss(focusedToast);
          return;
        }
      }

      // 2. Check tooltip
      const activeTooltipWrapper = document.activeElement ? document.activeElement.closest(".tl-tooltip-wrapper") : null;
      if (activeTooltipWrapper) {
        const tip = activeTooltipWrapper.querySelector(".tl-tooltip");
        if (tip) {
          tip.style.opacity = "0";
          tip.style.visibility = "hidden";
          const restore = () => {
            tip.style.opacity = "";
            tip.style.visibility = "";
          };
          activeTooltipWrapper.addEventListener("blur", restore, { once: true });
        }
      }
    }
  });
}

