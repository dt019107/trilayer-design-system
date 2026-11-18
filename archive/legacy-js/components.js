/**
 * INTERACTIVE COMPONENT BEHAVIORS
 * Handles Modals, Dropdowns, Tabs, and Toast notifications.
 */

// Toast System
const Toast = {
  container: null,

  getContainer() {
    if (!this.container) {
      let el = document.querySelector(".ds-toast-container");
      if (!el) {
        el = document.createElement("div");
        el.className = "ds-toast-container";
        document.body.appendChild(el);
      }
      this.container = el;
    }
    return this.container;
  },

  show({ title = "Notification", message = "", type = "info", duration = 3500 }) {
    const container = this.getContainer();
    const toast = document.createElement("div");
    toast.className = `ds-toast ds-toast--${type}`;

    const icons = {
      success: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>`,
      danger: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>`,
      warning: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>`,
      info: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>`
    };

    const colors = {
      success: "var(--sem-color-status-success-solid)",
      danger: "var(--sem-color-status-danger-solid)",
      warning: "var(--sem-color-status-warning-solid)",
      info: "var(--sem-color-status-info-solid)"
    };

    toast.innerHTML = `
      <div class="ds-toast__icon" style="color: ${colors[type] || colors.info}">
        ${icons[type] || icons.info}
      </div>
      <div class="ds-toast__content">
        <div class="ds-toast__title">${title}</div>
        ${message ? `<div class="ds-toast__message">${message}</div>` : ""}
      </div>
      <button class="ds-toast__close" aria-label="Close toast">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6 6 18M6 6l12 12"/></svg>
      </button>
    `;

    const closeBtn = toast.querySelector(".ds-toast__close");
    const removeToast = () => {
      toast.classList.add("is-hiding");
      setTimeout(() => toast.remove(), 200);
    };

    closeBtn.addEventListener("click", removeToast);
    container.appendChild(toast);

    if (duration > 0) {
      setTimeout(removeToast, duration);
    }
  }
};

window.Toast = Toast;

// Modal Manager
const Modal = {
  open(id) {
    const modal = document.getElementById(id);
    if (!modal) return;
    modal.classList.add("is-open");
    document.body.style.overflow = "hidden";
  },

  close(id) {
    const modal = typeof id === "string" ? document.getElementById(id) : id;
    if (!modal) return;
    modal.classList.remove("is-open");
    document.body.style.overflow = "";
  },

  init() {
    document.addEventListener("click", (e) => {
      const openTrigger = e.target.closest("[data-modal-open]");
      if (openTrigger) {
        this.open(openTrigger.dataset.modalOpen);
        return;
      }

      const closeTrigger = e.target.closest("[data-modal-close]");
      if (closeTrigger) {
        const overlay = closeTrigger.closest(".ds-modal-overlay");
        if (overlay) this.close(overlay);
        return;
      }

      // Backdrop click
      if (e.target.classList.contains("ds-modal-overlay")) {
        this.close(e.target);
      }
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        const openModal = document.querySelector(".ds-modal-overlay.is-open");
        if (openModal) this.close(openModal);
      }
    });
  }
};

// Dropdown Manager
const Dropdown = {
  init() {
    document.addEventListener("click", (e) => {
      const trigger = e.target.closest("[data-dropdown-toggle]");
      const openDropdowns = document.querySelectorAll(".ds-dropdown.is-open");

      if (trigger) {
        const parent = trigger.closest(".ds-dropdown");
        const isOpen = parent.classList.contains("is-open");
        openDropdowns.forEach(d => d.classList.remove("is-open"));
        if (!isOpen) parent.classList.add("is-open");
        return;
      }

      // Click outside closes all
      if (!e.target.closest(".ds-dropdown")) {
        openDropdowns.forEach(d => d.classList.remove("is-open"));
      }
    });
  }
};

// Tabs Manager
const Tabs = {
  init() {
    document.addEventListener("click", (e) => {
      const tabBtn = e.target.closest(".ds-tabs__tab");
      if (!tabBtn) return;

      const container = tabBtn.closest(".ds-tabs");
      if (!container) return;

      const targetId = tabBtn.dataset.tab;
      if (!targetId) return;

      container.querySelectorAll(".ds-tabs__tab").forEach(t => t.classList.remove("is-active"));
      container.querySelectorAll(".ds-tabs__panel").forEach(p => p.classList.remove("is-active"));

      tabBtn.classList.add("is-active");
      const targetPanel = container.querySelector(`#${targetId}`);
      if (targetPanel) {
        targetPanel.classList.add("is-active");
      }
    });
  }
};

// Copy Utility
window.copyToClipboard = (text, message = "Copied to clipboard!") => {
  navigator.clipboard.writeText(text).then(() => {
    Toast.show({ title: "Success", message, type: "success", duration: 2500 });
  }).catch(() => {
    // Fallback
    const textarea = document.createElement("textarea");
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    textarea.remove();
    Toast.show({ title: "Success", message, type: "success", duration: 2500 });
  });
};

document.addEventListener("DOMContentLoaded", () => {
  Modal.init();
  Dropdown.init();
  Tabs.init();
});

