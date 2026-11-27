/**
 * TRILAYER DESIGN SYSTEM — NAVIGATION CONTROLLER
 * Builds sidebar navigation from /data/navigation.js, manages mobile drawer
 * accessibility, active item highlighting, and breadcrumb updates.
 */

import { navigation } from "../data/navigation.js";

const sectionIcons = {
  "Get started": `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/></svg>`,
  "Foundations": `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>`,
  "Tokens": `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>`,
  "Components": `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg>`,
  "Patterns": `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/></svg>`,
  "Content": `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>`,
  "Resources": `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>`,
  "Contribute": `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="18" cy="18" r="3"/><circle cx="6" cy="6" r="3"/><path d="M13 6h3a2 2 0 0 1 2 2v7"/><line x1="6" y1="9" x2="6" y2="21"/></svg>`
};

export class NavigationController {
  constructor() {
    this.sidebar = document.getElementById("tl-sidebar");
    this.navContent = document.getElementById("tl-sidebar-nav");
    this.scrim = document.getElementById("tl-scrim");
    this.toggleBtn = document.getElementById("tl-nav-toggle");
    this.closeBtn = document.getElementById("tl-sidebar-close");
    this.breadcrumbsContainer = document.getElementById("tl-breadcrumbs");

    this.isOpen = false;
    this.init();
  }

  init() {
    this.renderSidebar();
    this.bindDrawerEvents();
  }

  /**
   * Generates sidebar navigation tree with search filter, groups, icons, and links
   */
  renderSidebar() {
    if (!this.navContent) return;

    let html = `
      <div class="tl-sidebar-filter-wrapper">
        <div class="tl-sidebar-filter-box">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="tl-sidebar-filter-icon" aria-hidden="true"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          <input type="text" id="tl-sidebar-filter" class="tl-sidebar-filter-input" placeholder="Filter menu items..." aria-label="Filter navigation items">
          <button id="tl-sidebar-filter-clear" class="tl-sidebar-filter-clear" aria-label="Clear filter" style="display: none;">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
        </div>
      </div>
      <div id="tl-sidebar-no-results" style="display: none; padding: 16px 8px; font-size: 13px; color: var(--tl-sys-color-on-surface-muted); text-align: center;">
        No items matching filter
      </div>
    `;

    navigation.forEach((section, index) => {
      const icon = sectionIcons[section.title] || "";
      const hasChildren = section.children && section.children.length > 0;
      const count = hasChildren ? section.children.length : "";
      const groupId = `nav-group-${index}`;

      html += `
        <div class="tl-nav-group" id="${groupId}" data-section-title="${section.title.toLowerCase()}">
          <button class="tl-nav-group-header" aria-expanded="true" aria-controls="${groupId}-list" onclick="window.__toggleNavGroup('${groupId}')">
            <div class="tl-nav-group-title-content">
              ${icon ? `<span class="tl-nav-group-icon">${icon}</span>` : ""}
              <span>${section.title}</span>
            </div>
            <div class="tl-nav-group-meta">
              ${count ? `<span class="tl-nav-count-badge">${count}</span>` : ""}
              ${hasChildren ? `
                <svg class="tl-nav-group-chevron" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              ` : ""}
            </div>
          </button>
      `;

      if (hasChildren) {
        html += `<ul class="tl-nav-list" id="${groupId}-list">`;
        section.children.forEach(item => {
          const badgeHtml = item.status 
            ? `<span class="tl-nav-badge tl-nav-badge--${item.status.toLowerCase()}">${item.status}</span>` 
            : "";
          html += `
            <li class="tl-nav-item" data-title="${item.title.toLowerCase()}">
              <a href="#${item.path}" class="tl-nav-link" data-path="${item.path}">
                <span>${item.title}</span>
                ${badgeHtml}
              </a>
            </li>
          `;
        });
        html += `</ul>`;
      } else {
        html += `
          <ul class="tl-nav-list" id="${groupId}-list">
            <li class="tl-nav-item" data-title="${section.title.toLowerCase()}">
              <a href="#${section.path}" class="tl-nav-link" data-path="${section.path}">
                <span>${section.title}</span>
              </a>
            </li>
          </ul>
        `;
      }

      html += `</div>`;
    });

    this.navContent.innerHTML = html;
    this.bindFilterEvents();
  }

  /**
   * Filter sidebar items live on keystroke
   */
  bindFilterEvents() {
    const input = document.getElementById("tl-sidebar-filter");
    const clearBtn = document.getElementById("tl-sidebar-filter-clear");
    const noResults = document.getElementById("tl-sidebar-no-results");
    if (!input) return;

    input.addEventListener("input", (e) => {
      const q = e.target.value.trim().toLowerCase();
      if (clearBtn) clearBtn.style.display = q ? "flex" : "none";

      let totalVisible = 0;
      document.querySelectorAll(".tl-nav-group").forEach(group => {
        let groupHasMatch = false;
        group.querySelectorAll(".tl-nav-item").forEach(item => {
          const title = item.getAttribute("data-title") || "";
          const match = title.includes(q);
          item.style.display = match ? "block" : "none";
          if (match) groupHasMatch = true;
        });

        group.style.display = groupHasMatch ? "flex" : "none";
        if (groupHasMatch) {
          totalVisible++;
          if (q) group.classList.remove("is-collapsed");
        }
      });

      if (noResults) noResults.style.display = (totalVisible === 0 && q) ? "block" : "none";
    });

    if (clearBtn) {
      clearBtn.addEventListener("click", () => {
        input.value = "";
        input.dispatchEvent(new Event("input"));
        input.focus();
      });
    }

    input.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        input.value = "";
        input.dispatchEvent(new Event("input"));
        input.blur();
      }
    });
  }

  /**
   * Sets active navigation link and updates breadcrumbs
   */
  setActivePath(path) {
    if (!this.navContent) return;

    const normalized = path.startsWith("/") ? path : `/${path}`;

    // Update active class on nav links
    this.navContent.querySelectorAll(".tl-nav-link").forEach(link => {
      const linkPath = link.getAttribute("data-path");
      const isActive = linkPath === normalized || (normalized === "/" && linkPath === "/");
      link.classList.toggle("is-active", isActive);
      if (isActive) {
        link.setAttribute("aria-current", "page");
        const parentGroup = link.closest(".tl-nav-group");
        if (parentGroup) {
          parentGroup.classList.remove("is-collapsed");
          const headerBtn = parentGroup.querySelector(".tl-nav-group-header");
          if (headerBtn) headerBtn.setAttribute("aria-expanded", "true");
        }
      } else {
        link.removeAttribute("aria-current");
      }
    });

    // Update active class on top-level header navbar links
    document.querySelectorAll(".tl-header-nav-link").forEach(link => {
      const href = link.getAttribute("href") || "";
      const linkHash = href.replace(/^#/, "");
      const isHome = (normalized === "/" || normalized === "") && linkHash === "/";
      const isSection = linkHash !== "/" && normalized.startsWith(linkHash);
      const isActive = isHome || isSection;
      link.classList.toggle("is-active", isActive);
      if (isActive) {
        link.setAttribute("aria-current", "page");
      } else {
        link.removeAttribute("aria-current");
      }
    });

    // Update breadcrumbs
    this.updateBreadcrumbs(normalized);

    // Auto-close mobile drawer on link navigation
    if (this.isOpen && window.innerWidth < 1280) {
      this.closeDrawer();
    }
  }

  /**
   * Builds accessible breadcrumbs trail from navigation data
   */
  updateBreadcrumbs(path) {
    if (!this.breadcrumbsContainer) return;

    if (path === "/" || path === "") {
      this.breadcrumbsContainer.innerHTML = `
        <li><span class="tl-breadcrumbs-current">Home</span></li>
      `;
      return;
    }

    let sectionTitle = "";
    let itemTitle = "";

    for (const sec of navigation) {
      if (sec.path === path) {
        sectionTitle = sec.title;
        break;
      }
      if (sec.children) {
        const found = sec.children.find(c => c.path === path);
        if (found) {
          sectionTitle = sec.title;
          itemTitle = found.title;
          break;
        }
      }
    }

    let breadcrumbsHtml = `
      <li><a href="#/">Trilayer</a></li>
      <li class="tl-breadcrumbs-separator" aria-hidden="true">/</li>
    `;

    if (itemTitle) {
      breadcrumbsHtml += `
        <li><a href="#${path.split('/').slice(0, 2).join('/')}">${sectionTitle}</a></li>
        <li class="tl-breadcrumbs-separator" aria-hidden="true">/</li>
        <li><span class="tl-breadcrumbs-current" aria-current="page">${itemTitle}</span></li>
      `;
    } else {
      breadcrumbsHtml += `
        <li><span class="tl-breadcrumbs-current" aria-current="page">${sectionTitle || path}</span></li>
      `;
    }

    this.breadcrumbsContainer.innerHTML = breadcrumbsHtml;
  }

  /**
   * Wire drawer open, close, backdrop click and Escape key listeners
   */
  bindDrawerEvents() {
    if (this.toggleBtn) {
      this.toggleBtn.addEventListener("click", () => this.toggleDrawer());
    }

    if (this.closeBtn) {
      this.closeBtn.addEventListener("click", () => this.closeDrawer());
    }

    if (this.scrim) {
      this.scrim.addEventListener("click", () => this.closeDrawer());
    }

    // Keyboard accessibility: Escape key closes off-canvas drawer
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && this.isOpen) {
        this.closeDrawer();
      }
    });

    // Trap Tab focus inside sidebar drawer while open (accessibility-engineer)
    if (this.sidebar) {
      this.sidebar.addEventListener("keydown", (e) => {
        if (!this.isOpen || e.key !== "Tab") return;
        const focusables = Array.from(this.sidebar.querySelectorAll('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'));
        if (focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
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
      });
    }
  }

  toggleDrawer() {
    if (this.isOpen) {
      this.closeDrawer();
    } else {
      this.openDrawer();
    }
  }

  openDrawer() {
    this.isOpen = true;
    if (this.sidebar) {
      this.sidebar.classList.add("is-open");
      this.sidebar.setAttribute("aria-hidden", "false");
    }
    if (this.scrim) {
      this.scrim.classList.add("is-active");
    }
    if (this.toggleBtn) {
      this.toggleBtn.setAttribute("aria-expanded", "true");
    }
    document.body.style.overflow = "hidden";

    // Focus destination on open (accessibility-engineer)
    setTimeout(() => {
      if (this.closeBtn && window.getComputedStyle(this.closeBtn).display !== "none") {
        this.closeBtn.focus();
      } else {
        const firstLink = this.sidebar?.querySelector(".tl-nav-link, a, button");
        if (firstLink) firstLink.focus();
      }
    }, 60);
  }

  closeDrawer() {
    this.isOpen = false;
    if (this.sidebar) {
      this.sidebar.classList.remove("is-open");
      this.sidebar.setAttribute("aria-hidden", "true");
    }
    if (this.scrim) {
      this.scrim.classList.remove("is-active");
    }
    if (this.toggleBtn) {
      this.toggleBtn.setAttribute("aria-expanded", "false");
      this.toggleBtn.focus();
    }
    document.body.style.overflow = "";
  }
}

// Global Nav Group Toggle Helper (browser-safe)
if (typeof window !== "undefined") {
  window.__toggleNavGroup = function(groupId) {
    const group = document.getElementById(groupId);
    if (group) {
      group.classList.toggle("is-collapsed");
      const isCollapsed = group.classList.contains("is-collapsed");
      const btn = group.querySelector(".tl-nav-group-header");
      if (btn) btn.setAttribute("aria-expanded", !isCollapsed);
    }
  };
}

