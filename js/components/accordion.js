/**
 * TRILAYER DESIGN SYSTEM — ACCESSIBLE ACCORDION CONTROLLER
 * WAI-ARIA compliant accordion: Enter/Space toggles, aria-expanded state, panel disclosure.
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

    triggerBtn.setAttribute("aria-expanded", String(!isExpanded));
    if (panel) {
      panel.hidden = isExpanded;
      panel.classList.toggle("is-open", !isExpanded);
    }
  }

  static autoInit() {
    if (typeof document === "undefined") return;
    document.querySelectorAll(".tl-accordion").forEach(el => new Accordion(el));
  }
}
