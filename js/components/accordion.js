/**
 * TRILAYER DESIGN SYSTEM — ACCESSIBLE ACCORDION & DROPDOWN CONTROLLERS
 * WAI-ARIA compliant disclosure components with smooth GPU-accelerated transitions
 * and strict prefers-reduced-motion safety.
 */

export class Accordion {
  constructor(container) {
    this.container = typeof container === "string" ? document.querySelector(container) : container;
    if (!this.container) return;
    this.init();
  }

  init() {
    const triggers = this.container.querySelectorAll(".tl-accordion-trigger, [data-accordion-trigger]");
    triggers.forEach(btn => {
      btn.addEventListener("click", () => this.toggle(btn));
      btn.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          this.toggle(btn);
        }
      });
    });
  }

  toggle(triggerBtn) {
    const isExpanded = triggerBtn.getAttribute("aria-expanded") === "true";
    const controlsId = triggerBtn.getAttribute("aria-controls");
    const panel = controlsId 
      ? document.getElementById(controlsId) 
      : (triggerBtn.nextElementSibling || triggerBtn.parentElement.querySelector(".tl-accordion-panel"));

    const nextState = !isExpanded;
    triggerBtn.setAttribute("aria-expanded", String(nextState));

    if (panel) {
      panel.removeAttribute("hidden");
      panel.classList.toggle("is-open", nextState);
    }
  }

  static autoInit() {
    if (typeof document === "undefined") return;
    document.querySelectorAll(".tl-accordion").forEach(el => new Accordion(el));
  }
}

export class Dropdown {
  constructor(container) {
    this.container = typeof container === "string" ? document.querySelector(container) : container;
    if (!this.container) return;
    this.trigger = this.container.querySelector(".tl-dropdown-trigger, [data-dropdown-trigger]");
    this.menu = this.container.querySelector(".tl-dropdown-menu");
    if (!this.trigger || !this.menu) return;
    this.init();
  }

  init() {
    this.trigger.addEventListener("click", (e) => {
      e.stopPropagation();
      this.toggle();
    });

    this.trigger.addEventListener("keydown", (e) => {
      if (e.key === "ArrowDown" || e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        this.open();
        this.focusFirstItem();
      }
    });

    // Menu keyboard navigation
    this.menu.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        e.preventDefault();
        this.close();
        this.trigger.focus();
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        this.moveFocus(1);
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        this.moveFocus(-1);
      }
    });

    // Close on click outside
    document.addEventListener("click", (e) => {
      if (!this.container.contains(e.target) && this.isOpen()) {
        this.close();
      }
    });
  }

  isOpen() {
    return this.menu.classList.contains("is-open");
  }

  open() {
    // Close other open dropdowns first
    document.querySelectorAll(".tl-dropdown-menu.is-open").forEach(m => {
      if (m !== this.menu) {
        m.classList.remove("is-open");
        const t = m.parentElement?.querySelector(".tl-dropdown-trigger");
        if (t) t.setAttribute("aria-expanded", "false");
      }
    });

    this.menu.classList.add("is-open");
    this.trigger.setAttribute("aria-expanded", "true");
  }

  close() {
    this.menu.classList.remove("is-open");
    this.trigger.setAttribute("aria-expanded", "false");
  }

  toggle() {
    if (this.isOpen()) {
      this.close();
    } else {
      this.open();
    }
  }

  getItems() {
    return Array.from(this.menu.querySelectorAll(".tl-menu-item, button, [href]"))
      .filter(el => !el.disabled && el.offsetParent !== null);
  }

  focusFirstItem() {
    const items = this.getItems();
    if (items.length > 0) items[0].focus();
  }

  moveFocus(delta) {
    const items = this.getItems();
    if (items.length === 0) return;
    const currentIndex = items.indexOf(document.activeElement);
    const nextIndex = (currentIndex + delta + items.length) % items.length;
    items[nextIndex].focus();
  }

  static autoInit() {
    if (typeof document === "undefined") return;
    document.querySelectorAll(".tl-dropdown").forEach(el => new Dropdown(el));
  }
}

// Global browser bootstrap
if (typeof window !== "undefined") {
  window.Accordion = Accordion;
  window.Dropdown = Dropdown;
  document.addEventListener("DOMContentLoaded", () => {
    Accordion.autoInit();
    Dropdown.autoInit();
  });
}
