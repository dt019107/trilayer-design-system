/**
 * TRILAYER DESIGN SYSTEM — TABLE OF CONTENTS & SCROLL-SPY
 * Automatically scans active page headings (h2, h3), renders the right-hand TOC rail,
 * highlights the active heading while scrolling, and provides smooth offset navigation.
 */

export class TableOfContents {
  constructor() {
    this.tocContainer = document.getElementById("tl-toc");
    this.tocNav = document.getElementById("tl-toc-nav");
    this.contentContainer = document.getElementById("tl-view-container");
    this.activeId = null;
    this.observer = null;

    this.init();
  }

  init() {
    // Listen for custom route changes to refresh the TOC
    window.addEventListener("tl:route-change", () => this.refresh());
    window.addEventListener("hashchange", () => setTimeout(() => this.refresh(), 80));

    this.refresh();
  }

  /**
   * Re-scans the active reading canvas and builds the TOC
   */
  refresh() {
    if (!this.tocContainer || !this.tocNav || !this.contentContainer) return;

    if (this.observer) {
      this.observer.disconnect();
    }

    const headings = Array.from(this.contentContainer.querySelectorAll("h2, h3"));

    // If page is simple or has fewer than 2 headings, hide the TOC rail
    if (headings.length < 2) {
      this.tocContainer.style.display = "none";
      return;
    }

    this.tocContainer.style.display = "block";

    let navHtml = "";
    headings.forEach((heading, idx) => {
      // Ensure heading has an ID
      if (!heading.id) {
        const text = heading.textContent.trim().toLowerCase()
          .replace(/[^\w\s-]/g, "")
          .replace(/\s+/g, "-");
        heading.id = text || `section-${idx}`;
      }

      const isSub = heading.tagName.toLowerCase() === "h3";
      navHtml += `
        <a href="#${heading.id}" 
           class="tl-toc-link ${isSub ? 'tl-toc-link--sub' : ''} ${idx === 0 ? 'is-active' : ''}" 
           data-target="${heading.id}"
           onclick="window.__scrollToHeading('${heading.id}', event)">
          ${heading.textContent.trim()}
        </a>
      `;
    });

    this.tocNav.innerHTML = navHtml;
    this.setupScrollSpy(headings);
  }

  setupScrollSpy(headings) {
    const headerOffset = 80;

    const observerOptions = {
      root: null,
      rootMargin: `-${headerOffset}px 0px -70% 0px`,
      threshold: 0
    };

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.setActiveHeading(entry.target.id);
        }
      });
    }, observerOptions);

    headings.forEach(heading => {
      this.observer.observe(heading);
    });
  }

  setActiveHeading(id) {
    if (!id || this.activeId === id) return;
    this.activeId = id;

    const links = this.tocNav.querySelectorAll(".tl-toc-link");
    links.forEach(link => {
      const isTarget = link.getAttribute("data-target") === id;
      link.classList.toggle("is-active", isTarget);
      if (isTarget) {
        link.setAttribute("aria-current", "location");
      } else {
        link.removeAttribute("aria-current");
      }
    });
  }

  scrollToHeading(id, event) {
    if (event) event.preventDefault();
    const target = document.getElementById(id);
    if (!target) return;

    const headerHeight = 72;
    const targetTop = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;

    const prefersReducedMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({
      top: targetTop,
      behavior: prefersReducedMotion ? "auto" : "smooth"
    });

    this.setActiveHeading(id);
  }
}

// Global browser scroll helper
if (typeof window !== "undefined") {
  window.__scrollToHeading = function(id, event) {
    if (window.__tableOfContents) {
      window.__tableOfContents.scrollToHeading(id, event);
    }
  };
}

