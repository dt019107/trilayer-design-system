/**
 * TRILAYER DESIGN SYSTEM — TOAST & SNACKBAR SYSTEM
 * Lightweight, accessible notification dispatcher with auto-dismiss.
 */

export class Toast {
  static container = null;

  static init() {
    if (!this.container) {
      let el = document.getElementById("tl-toast-container");
      if (!el) {
        el = document.createElement("div");
        el.id = "tl-toast-container";
        el.className = "tl-toast-container";
        el.setAttribute("aria-live", "polite");
        document.body.appendChild(el);
      }
      this.container = el;
    }
  }

  static show({ message, type = "info", duration = 4000 }) {
    this.init();

    const toast = document.createElement("div");
    toast.className = `tl-toast tl-toast--${type}`;
    toast.setAttribute("role", "status");

    let iconSvg = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>`;
    if (type === "success") {
      iconSvg = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>`;
    } else if (type === "error") {
      iconSvg = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>`;
    }

    toast.innerHTML = `
      <span class="tl-toast__icon">${iconSvg}</span>
      <div class="tl-toast__content">${message}</div>
      <button class="tl-toast__close" aria-label="Dismiss notification">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
      </button>
    `;

    const closeBtn = toast.querySelector(".tl-toast__close");
    closeBtn.addEventListener("click", () => this.dismiss(toast));

    this.container.appendChild(toast);

    if (duration > 0) {
      let timer = null;
      let remaining = duration;
      let startTime = Date.now();

      const startTimer = () => {
        startTime = Date.now();
        timer = setTimeout(() => this.dismiss(toast), remaining);
      };

      const pauseTimer = () => {
        if (timer) {
          clearTimeout(timer);
          timer = null;
          remaining -= (Date.now() - startTime);
          if (remaining < 500) remaining = 500;
        }
      };

      toast.addEventListener("mouseenter", pauseTimer);
      toast.addEventListener("mouseleave", startTimer);
      toast.addEventListener("focusin", pauseTimer);
      toast.addEventListener("focusout", startTimer);

      startTimer();
    }
  }

  static dismiss(toast) {
    if (!toast || !toast.parentNode) return;
    toast.style.opacity = "0";
    toast.style.transform = "translateY(8px)";
    setTimeout(() => {
      if (toast.parentNode) toast.parentNode.removeChild(toast);
    }, 200);
  }
}

// Global keyboard listener: Escape dismisses active focused tooltip
if (typeof document !== "undefined") {
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
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

