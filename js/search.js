/**
 * TRILAYER DESIGN SYSTEM — COMMAND PALETTE (Cmd+K / Ctrl+K) SEARCH
 * Fuzzy-matching search over navigation, components, foundations, and design tokens.
 * Full keyboard arrow navigation, focus trapping, and instant view routing.
 */

import { navigation } from "../data/navigation.js";
import { componentsList } from "../data/components/index.js";

export class CommandPalette {
  constructor() {
    this.modal = document.getElementById("tl-search-modal");
    this.input = document.getElementById("tl-search-input");
    this.resultsList = document.getElementById("tl-search-results");
    this.triggerBtn = document.getElementById("tl-search-trigger");

    this.selectedIndex = 0;
    this.currentResults = [];
    this.searchIndex = [];

    this.init();
  }

  init() {
    this.buildSearchIndex();
    this.bindEvents();
  }

  /**
   * Compiles search index from navigation and component data
   */
  buildSearchIndex() {
    this.searchIndex = [];

    // Common aliases for developer discoverability
    const aliases = {
      "dialog": "modal overlay popup sheet window confirmation alert",
      "text-field": "input form textbox textfield textarea",
      "switch": "toggle switch boolean option setting",
      "badge": "pill tag label status indicator",
      "chip": "tag filter pill removable token",
      "tooltip": "hint popover hover title",
      "card": "container surface panel tile sheet",
      "button": "btn action link trigger submit primary secondary outline ghost"
    };

    // 1. Index Components
    componentsList.forEach(comp => {
      const aliasTerms = aliases[comp.id] || "";
      this.searchIndex.push({
        title: comp.title,
        path: `#/components/${comp.id}`,
        category: "Components",
        desc: comp.description,
        tags: [comp.id, comp.status, aliasTerms, ...(comp.states || []), ...(comp.related || [])].join(" ").toLowerCase()
      });
    });

    // 2. Index Navigation Tree (Foundations, Tokens, Resources)
    navigation.forEach(sec => {
      if (sec.children && sec.children.length > 0) {
        sec.children.forEach(item => {
          // Avoid duplicate component entries
          if (!item.path.startsWith("/components/")) {
            this.searchIndex.push({
              title: item.title,
              path: `#${item.path}`,
              category: sec.title,
              desc: `${sec.title} documentation and technical specifications.`,
              tags: `${sec.title} ${item.title}`.toLowerCase()
            });
          }
        });
      } else {
        this.searchIndex.push({
          title: sec.title,
          path: `#${sec.path}`,
          category: "General",
          desc: `Navigate to ${sec.title}.`,
          tags: sec.title.toLowerCase()
        });
      }
    });

    // 3. Index Signature Features & Foundations
    this.searchIndex.push(
      {
        title: "The Three Layers Architecture",
        path: "#/tokens/layers",
        category: "Tokens",
        desc: "Interactive 3-layer token chain diagram: Primitives -> Semantic -> Component.",
        tags: "layers tokens inspector architecture decoupled primary semantic primitives"
      },
      {
        title: "Dynamic Theme Engine & Playground",
        path: "#/tokens/theming",
        category: "Tokens",
        desc: "Seed color picker, 12-step tonal palette generator, and WCAG contrast audit.",
        tags: "theme color seed dark mode light mode primary palette tonal contrast oklch"
      },
      {
        title: "Color System & Palettes",
        path: "#/foundations/color",
        category: "Foundations",
        desc: "Role-based color tokens, primary accents, surface containers, and dark mode palette.",
        tags: "color palette primary surface dark mode light mode tokens seed"
      },
      {
        title: "WCAG 2.2 AA Accessibility Standards",
        path: "#/foundations/accessibility",
        category: "Foundations",
        desc: "Color contrast ratios, visible focus indicators, and focus-trapped dialogs.",
        tags: "accessibility wcag a11y contrast focus aria"
      },
      {
        title: "Iconography System",
        path: "#/foundations/iconography",
        category: "Foundations",
        desc: "24px grid, 2px stroke, SVG symbol previews, and accessible labels.",
        tags: "iconography icons svg glyphs symbols grid"
      },
      {
        title: "Forms & Validation Patterns",
        path: "#/patterns/forms",
        category: "Patterns",
        desc: "Field layout, real-time error states, hint text, and submit actions.",
        tags: "forms validation inputs text field error states help text"
      },
      {
        title: "Data Tables Pattern",
        path: "#/patterns/data-tables",
        category: "Patterns",
        desc: "Tabular data layouts, status chips, and row-level action triggers.",
        tags: "table grid columns rows data list"
      },
      {
        title: "Empty States Pattern",
        path: "#/patterns/empty-states",
        category: "Patterns",
        desc: "First-time onboarding, zero search results, and clearing filters.",
        tags: "empty state zero state placeholder onboarding"
      },
      {
        title: "Voice & Tone Guidelines",
        path: "#/content/voice-and-tone",
        category: "Content",
        desc: "Precise, calm, structured brand personality and communication principles.",
        tags: "voice tone writing personality copy style guide"
      },
      {
        title: "UX Writing & Copy Rules",
        path: "#/content/ux-writing",
        category: "Content",
        desc: "Button labels, error messages, clear punctuation, and capitalization standards.",
        tags: "ux writing copy microcopy labels error messages do dont"
      },
      {
        title: "Release Changelog",
        path: "#/resources/changelog",
        category: "Resources",
        desc: "Semantic versioning release notes and breaking changes log.",
        tags: "changelog release version notes v2.0 updates"
      },
      {
        title: "Product Roadmap",
        path: "#/resources/roadmap",
        category: "Resources",
        desc: "Near-term and forward-looking system milestones.",
        tags: "roadmap milestones future planned features timeline"
      },
      {
        title: "Migration Guide (v1 to v2)",
        path: "#/resources/migration",
        category: "Resources",
        desc: "Step-by-step token rename mapping and codemod guide.",
        tags: "migration upgrade v1 v2 breaking changes codemod"
      },
      {
        title: "Contribution Guidelines",
        path: "#/contribute",
        category: "Contribute",
        desc: "Governance, Definition of Done checklist, and PR workflow.",
        tags: "contribute pull request governance definition of done workflow"
      }
    );
  }

  bindEvents() {
    // Open on button click
    if (this.triggerBtn) {
      this.triggerBtn.addEventListener("click", () => this.open());
    }

    // Backdrop click dismiss
    if (this.modal) {
      this.modal.addEventListener("click", (e) => {
        if (e.target === this.modal) this.close();
      });
    }

    // Input typing listener
    if (this.input) {
      this.input.addEventListener("input", (e) => this.search(e.target.value));
      this.input.addEventListener("keydown", (e) => this.handleKeyDown(e));
    }

    // Global shortcut listener (Cmd+K / Ctrl+K / Escape)
    window.addEventListener("keydown", (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        this.toggle();
      } else if (e.key === "Escape" && this.isOpen()) {
        e.preventDefault();
        this.close();
      }
    });
  }

  isOpen() {
    return this.modal && this.modal.classList.contains("is-open");
  }

  toggle() {
    if (this.isOpen()) {
      this.close();
    } else {
      this.open();
    }
  }

  open() {
    if (!this.modal) return;
    this.modal.classList.add("is-open");
    this.modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";

    if (this.input) {
      this.input.value = "";
      setTimeout(() => this.input.focus(), 60);
    }
    this.search("");
  }

  close() {
    if (!this.modal) return;
    this.modal.classList.remove("is-open");
    this.modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";

    if (this.triggerBtn) {
      this.triggerBtn.focus();
    }
  }

  levenshtein(a, b) {
    if (a.length === 0) return b.length;
    if (b.length === 0) return a.length;
    const matrix = [];
    for (let i = 0; i <= b.length; i++) matrix[i] = [i];
    for (let j = 0; j <= a.length; j++) matrix[0][j] = j;
    for (let i = 1; i <= b.length; i++) {
      for (let j = 1; j <= a.length; j++) {
        if (b.charAt(i - 1) === a.charAt(j - 1)) {
          matrix[i][j] = matrix[i - 1][j - 1];
        } else {
          matrix[i][j] = Math.min(
            matrix[i - 1][j - 1] + 1,
            matrix[i][j - 1] + 1,
            matrix[i - 1][j] + 1
          );
        }
      }
    }
    return matrix[b.length][a.length];
  }

  /**
   * Fuzzy / keyword search matcher with relevance scoring and typo tolerance
   */
  search(query) {
    const q = query.trim().toLowerCase();

    if (!q) {
      // Default: show quick suggested components & foundations
      this.currentResults = this.searchIndex.slice(0, 8);
    } else {
      this.currentResults = this.searchIndex
        .map(item => {
          let score = 0;
          const titleLower = item.title.toLowerCase();
          const descLower = item.desc.toLowerCase();

          if (titleLower === q) score += 100;
          else if (titleLower.startsWith(q)) score += 60;
          else if (titleLower.includes(q)) score += 40;

          if (item.category.toLowerCase().includes(q)) score += 20;
          if (item.tags.includes(q)) score += 15;
          if (descLower.includes(q)) score += 10;

          // Fuzzy typo tolerance for words >= 4 characters
          if (score === 0 && q.length >= 4) {
            const words = (titleLower + " " + item.tags).split(/\s+/);
            for (const word of words) {
              if (word.length >= 4 && Math.abs(word.length - q.length) <= 1) {
                if (this.levenshtein(q, word) <= 1) {
                  score += 30;
                  break;
                }
              }
            }
          }

          return { ...item, score };
        })
        .filter(item => item.score > 0)
        .sort((a, b) => b.score - a.score);
    }

    this.selectedIndex = 0;
    this.renderResults();
  }

  renderResults() {
    if (!this.resultsList) return;

    if (this.currentResults.length === 0) {
      this.resultsList.innerHTML = `
        <div class="tl-search-empty">
          <p>No documentation found matching your search.</p>
          <span style="font-size: 12px; color: var(--tl-sys-color-on-surface-muted);">Try searching for "button", "color", "tokens", or "dialog".</span>
        </div>
      `;
      return;
    }

    let html = "";
    this.currentResults.forEach((item, index) => {
      const isSelected = index === this.selectedIndex;
      html += `
        <div class="tl-search-item ${isSelected ? 'is-selected' : ''}" 
             role="option" 
             aria-selected="${isSelected}"
             data-index="${index}"
             onclick="window.__selectSearchResult(${index})">
          <div style="flex: 1; min-width: 0;">
            <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 2px;">
              <strong style="color: var(--tl-sys-color-on-surface); font-size: 14px;">${item.title}</strong>
              <span class="tl-search-item-cat">${item.category}</span>
            </div>
            <div style="font-size: 12px; color: var(--tl-sys-color-on-surface-variant); overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">
              ${item.desc}
            </div>
          </div>
          <span style="font-size: 12px; color: var(--tl-sys-color-primary); font-weight: 600;">&rarr;</span>
        </div>
      `;
    });

    this.resultsList.innerHTML = html;
  }

  handleKeyDown(e) {
    if (this.currentResults.length === 0) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      this.selectedIndex = (this.selectedIndex + 1) % this.currentResults.length;
      this.renderResults();
      this.scrollSelectedIntoView();
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      this.selectedIndex = (this.selectedIndex - 1 + this.currentResults.length) % this.currentResults.length;
      this.renderResults();
      this.scrollSelectedIntoView();
    } else if (e.key === "Enter") {
      e.preventDefault();
      this.selectResult(this.selectedIndex);
    }
  }

  scrollSelectedIntoView() {
    const selectedEl = this.resultsList.querySelector(".tl-search-item.is-selected");
    if (selectedEl) {
      selectedEl.scrollIntoView({ block: "nearest" });
    }
  }

  selectResult(index) {
    const item = this.currentResults[index];
    if (item && item.path) {
      window.location.hash = item.path;
      this.close();
    }
  }
}

// Global browser listener for search clicks
if (typeof window !== "undefined") {
  window.__selectSearchResult = function(index) {
    if (window.__commandPalette) {
      window.__commandPalette.selectResult(index);
    }
  };
}
