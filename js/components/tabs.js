/**
 * TRILAYER DESIGN SYSTEM — ACCESSIBLE TABS CONTROLLER
 * Full ARIA tablist/tab/tabpanel support with keyboard arrow navigation.
 */

export class Tabs {
  constructor(containerElement) {
    this.container = typeof containerElement === "string" 
      ? document.querySelector(containerElement) 
      : containerElement;
    if (!this.container) return;

    this.tabList = this.container.querySelector('[role="tablist"]');
    this.tabs = Array.from(this.container.querySelectorAll('[role="tab"]'));
    this.panels = Array.from(this.container.querySelectorAll('[role="tabpanel"]'));

    this.init();
  }

  init() {
    this.tabs.forEach((tab, index) => {
      tab.addEventListener("click", () => this.selectTab(index));

      // Arrow & Home/End navigation
      tab.addEventListener("keydown", (e) => {
        let targetIndex = index;
        if (e.key === "ArrowRight") {
          targetIndex = (index + 1) % this.tabs.length;
          e.preventDefault();
        } else if (e.key === "ArrowLeft") {
          targetIndex = (index - 1 + this.tabs.length) % this.tabs.length;
          e.preventDefault();
        } else if (e.key === "Home") {
          targetIndex = 0;
          e.preventDefault();
        } else if (e.key === "End") {
          targetIndex = this.tabs.length - 1;
          e.preventDefault();
        }

        if (targetIndex !== index) {
          this.selectTab(targetIndex);
          this.tabs[targetIndex].focus();
        }
      });
    });
  }

  selectTab(index) {
    this.tabs.forEach((tab, i) => {
      const isSelected = i === index;
      tab.setAttribute("aria-selected", isSelected ? "true" : "false");
      tab.classList.toggle("is-active", isSelected);
      tab.tabIndex = isSelected ? 0 : -1;
    });

    this.panels.forEach((panel, i) => {
      const isSelected = i === index;
      panel.classList.toggle("is-active", isSelected);
      panel.hidden = !isSelected;
    });
  }
}

