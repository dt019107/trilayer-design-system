/**
 * TRILAYER DESIGN SYSTEM — NAVIGATION CONTROLLER
 * Builds sidebar navigation from /data/navigation.js, manages mobile drawer
 * accessibility, active item highlighting, and breadcrumb updates.
 */

import { navigation } from "../data/navigation.js";

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
   * Generates sidebar navigation tree with groups and links
   */
  renderSidebar() {
    if (!this.navContent) return;

    let html = "";

    navigation.forEach(section => {
      html += `
        <div class="tl-nav-group">
          <div class="tl-nav-group-title">
            <span>${section.title}</span>
          </div>
      `;

      if (section.children && section.children.length > 0) {
        html += `<ul class="tl-nav-list">`;
        section.children.forEach(item => {
          const badgeHtml = item.status 
            ? `<span class="tl-nav-badge tl-nav-badge--${item.status.toLowerCase()}">${item.status}</span>` 
            : "";
          html += `
            <li>
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
          <ul class="tl-nav-list">
            <li>
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
        if (this.toggleBtn) this.toggleBtn.focus();
      }
    });
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
    }
    document.body.style.overflow = "";
  }
}

