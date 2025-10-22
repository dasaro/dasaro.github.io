/**
 * PublicationsManager - Unified Publications Filtering System
 * Manages loading, filtering, and displaying publications
 */

class PublicationsManager {
  constructor() {
    this.allPublications = [];
    this.selectedPublicationIds = [];
    this.filters = {
      search: '',
      year: 'all',
      topic: 'selected', // Default to 'selected' publications
      type: 'all'
    };
    this.elements = {};
    this.currentBibtex = '';  // Store current BibTeX for modal
    this.currentFilename = '';  // Store filename for download
  }

  /**
   * Initialize the publications manager
   */
  async init() {
    console.log('[PublicationsManager] Initializing...');

    // Get DOM elements
    this.elements = {
      container: document.getElementById('publications-container'),
      countContainer: document.getElementById('publications-count'),
      searchInput: document.getElementById('search-input'),
      yearFilter: document.getElementById('year-filter'),
      topicFilter: document.getElementById('topic-filter'),
      typeFilter: document.getElementById('type-filter'),
      resetBtn: document.getElementById('reset-filters'),
      exportBtn: document.getElementById('export-bibtex'),
      // Modal elements
      modal: document.getElementById('bibtex-modal'),
      modalOverlay: document.querySelector('#bibtex-modal .modal-overlay'),
      modalClose: document.querySelector('#bibtex-modal .modal-close'),
      bibtexContent: document.getElementById('bibtex-content'),
      copyBtn: document.getElementById('copy-bibtex'),
      downloadBtn: document.getElementById('download-bibtex')
    };

    // Only run on publications page (check for required filter elements)
    if (!this.elements.searchInput || !this.elements.yearFilter) {
      console.log('[PublicationsManager] Not on publications page, skipping initialization');
      return;
    }

    try {
      // Load publications data
      await this.loadPublications();

      // Populate filter options
      this.populateFilterOptions();

      // Set up event listeners
      this.setupFilters();

      // Display initial publications (selected)
      this.applyFilters();

      console.log('[PublicationsManager] Initialization complete');
    } catch (error) {
      console.error('[PublicationsManager] Initialization error:', error);
      this.showError('Failed to load publications. Please try again later.');
    }
  }

  /**
   * Load publications from JSON file
   */
  async loadPublications() {
    console.log('[PublicationsManager] Loading publications data...');

    const data = await loadJSON('./data/publications.json');

    if (!data) {
      throw new Error('Failed to load publications.json');
    }

    this.allPublications = data.all || [];

    // Extract IDs of selected publications
    if (data.selected && Array.isArray(data.selected)) {
      this.selectedPublicationIds = data.selected.map(pub => pub.id);
    }

    console.log('[PublicationsManager] Loaded', this.allPublications.length, 'total publications');
    console.log('[PublicationsManager] Selected publications:', this.selectedPublicationIds.length);
  }

  /**
   * Topic groupings for the filter dropdown
   */
  getTopicGroups() {
    return {
      'logic-reasoning': {
        label: 'Logic & Reasoning',
        tags: ['logic', 'reasoning', 'formalisms', 'epistemic-logic', 'non-monotonic-logic',
               'bounded-reasoning', 'formal-methods', 'natural-deduction', 'type-theory',
               'foundations', 'philosophy', 'epistemology', 'carnap', 'analogy', 'history']
      },
      'logic-programming': {
        label: 'Logic Programming & AI',
        tags: ['answer-set-programming', 'inductive-logic-programming', 'event-calculus',
               'probabilistic-logic', 'probabilistic-reasoning', 'problog', 'depth-bounded',
               'inductive-logic']
      },
      'xai-ethics': {
        label: 'Explainable AI & Ethics',
        tags: ['explainable-ai', 'argumentation', 'aba', 'ethics', 'trustworthiness',
               'bias', 'bias-detection', 'proof-checking', 'preference-learning', 'labeling']
      },
      'applications': {
        label: 'Applications & Domains',
        tags: ['e-health', 'healthcare', 'robotics', 'hri', 'rehabilitation', 'smart-city',
               'finance', 'decision-support', 'decision-making', 'cognitive-tests', 'education',
               'elearning', 'nudging', 'human-sciences', 'agent-displacement', 'agents',
               'information-overload', 'book']
      },
      'ai-methods': {
        label: 'AI Methods & Tools',
        tags: ['reinforcement-learning', 'neural-networks', 'mdp', 'evolutionary-computation',
               'fuzzy-logic', 'multi-modal-fusion', 'intent-recognition', 'computational-intelligence',
               'tools', 'artificial-intelligence', 'technology']
      }
    };
  }

  /**
   * Map individual tag to its topic group
   */
  getTopicGroup(tag) {
    const groups = this.getTopicGroups();
    for (const [groupKey, groupData] of Object.entries(groups)) {
      if (groupData.tags.includes(tag)) {
        return groupKey;
      }
    }
    return null;
  }

  /**
   * Populate year and topic filter dropdowns
   */
  populateFilterOptions() {
    // Populate years
    const years = [...new Set(this.allPublications.map(pub => pub.year))]
      .sort((a, b) => b - a);

    years.forEach(year => {
      const option = document.createElement('option');
      option.value = year;
      option.textContent = year;
      this.elements.yearFilter.appendChild(option);
    });

    // Populate topic groups (after "All Publications" and "Selected Publications")
    const topicGroups = this.getTopicGroups();
    Object.entries(topicGroups).forEach(([groupKey, groupData]) => {
      const option = document.createElement('option');
      option.value = groupKey;
      option.textContent = groupData.label;
      this.elements.topicFilter.appendChild(option);
    });

    // Set default topic to "selected"
    this.elements.topicFilter.value = 'selected';

    console.log('[PublicationsManager] Filter options populated');
  }

  /**
   * Set up event listeners for all filters
   */
  setupFilters() {
    // Search input with debouncing
    this.elements.searchInput.addEventListener('input', this.debounce((e) => {
      this.filters.search = e.target.value.toLowerCase();
      this.applyFilters();
    }, 300));

    // Topic filter
    this.elements.topicFilter.addEventListener('change', (e) => {
      this.filters.topic = e.target.value;
      this.applyFilters();
    });

    // Year filter
    this.elements.yearFilter.addEventListener('change', (e) => {
      this.filters.year = e.target.value;
      this.applyFilters();
    });

    // Type filter
    this.elements.typeFilter.addEventListener('change', (e) => {
      this.filters.type = e.target.value;
      this.applyFilters();
    });

    // Reset filters button
    this.elements.resetBtn.addEventListener('click', () => {
      this.resetFilters();
    });

    // Export BibTeX button
    this.elements.exportBtn.addEventListener('click', () => {
      this.exportBibTeX();
    });

    // Modal event listeners
    this.elements.modalClose.addEventListener('click', () => {
      this.hideModal();
    });

    this.elements.modalOverlay.addEventListener('click', () => {
      this.hideModal();
    });

    this.elements.copyBtn.addEventListener('click', () => {
      this.copyBibtexToClipboard();
    });

    this.elements.downloadBtn.addEventListener('click', () => {
      this.downloadBibTeX(this.currentBibtex, this.currentFilename);
    });

    // Close modal on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.elements.modal.style.display !== 'none') {
        this.hideModal();
      }
    });

    console.log('[PublicationsManager] Event listeners configured');
  }

  /**
   * Apply all current filters and display results
   */
  applyFilters() {
    let filtered = [...this.allPublications];

    // Filter by topic (including "selected" as a special topic)
    if (this.filters.topic === 'selected') {
      // Show only selected publications
      filtered = filtered.filter(pub => this.selectedPublicationIds.includes(pub.id));
    } else if (this.filters.topic !== 'all') {
      // Show publications matching the topic group
      const topicGroups = this.getTopicGroups();
      const selectedGroup = topicGroups[this.filters.topic];

      if (selectedGroup) {
        filtered = filtered.filter(pub => {
          // Check if any of the publication's tags belong to the selected group
          return pub.tags && pub.tags.some(tag => selectedGroup.tags.includes(tag));
        });
      }
    }

    // Filter by search query
    if (this.filters.search) {
      filtered = filtered.filter(pub => {
        const searchText = this.filters.search;
        const title = pub.title.toLowerCase();
        const authors = Array.isArray(pub.authors)
          ? pub.authors.join(' ').toLowerCase()
          : pub.authors.toLowerCase();
        const venue = pub.venue.toLowerCase();

        return title.includes(searchText) ||
               authors.includes(searchText) ||
               venue.includes(searchText);
      });
    }

    // Filter by year
    if (this.filters.year !== 'all') {
      filtered = filtered.filter(pub => pub.year === parseInt(this.filters.year));
    }

    // Filter by type
    if (this.filters.type !== 'all') {
      filtered = filtered.filter(pub => pub.type === this.filters.type);
    }

    // Sort by year (newest first)
    filtered.sort((a, b) => b.year - a.year);

    // Display results
    this.displayPublications(filtered);
    this.updateCount(filtered.length);

    console.log('[PublicationsManager] Filtered to', filtered.length, 'publications');
  }

  /**
   * Display publications in the container
   */
  displayPublications(publications) {
    if (!publications || publications.length === 0) {
      this.elements.container.innerHTML = '<p class="no-results">No publications found matching your filters.</p>';
      return;
    }

    const html = publications.map(pub => this.createPublicationCard(pub)).join('');
    this.elements.container.innerHTML = html;

    // Attach BibTeX export handlers
    publications.forEach(pub => {
      const btn = document.querySelector(`[data-pub-id="${pub.id}"]`);
      if (btn) {
        btn.addEventListener('click', () => this.exportSingleBibTeX(pub.id));
      }
    });
  }

  /**
   * Create HTML for a single publication card
   */
  createPublicationCard(pub) {
    const authors = Array.isArray(pub.authors) ? pub.authors.join(', ') : pub.authors;
    const highlightedAuthors = authors.replace(/F\. A\. D'Asaro/g, '<strong>F. A. D\'Asaro</strong>');

    return `
      <div class="publication-card">
        <h3>${pub.title}</h3>
        <p class="publication-authors">${highlightedAuthors}</p>
        <p class="publication-venue">
          <strong>${pub.venue}</strong>
          ${pub.volume ? `Vol. ${pub.volume}` : ''}
          (${pub.year})
          ${pub.pages ? `pp. ${pub.pages}` : ''}
          ${pub.open_access ? '<span class="badge-oa">OPEN ACCESS</span>' : ''}
          ${pub.status === 'accepted' ? '<span class="badge-accepted">ACCEPTED</span>' : ''}
        </p>
        <div class="publication-links">
          ${pub.doi ? `<a href="https://doi.org/${pub.doi}" target="_blank" rel="noopener">DOI</a>` : ''}
          ${pub.url ? `<a href="${pub.url}" target="_blank" rel="noopener">Link</a>` : ''}
          ${pub.pdf ? `<a href="${pub.pdf}" target="_blank" rel="noopener">PDF</a>` : ''}
          ${pub.bibtex ? `<button data-pub-id="${pub.id}">BibTeX ⊢</button>` : ''}
        </div>
      </div>
    `;
  }

  /**
   * Update the publications count display
   */
  updateCount(filteredCount) {
    const totalCount = this.allPublications.length;
    const topicLabel = this.getTopicLabel();

    this.elements.countContainer.innerHTML = `
      <p>⊢ Showing ${filteredCount} of ${totalCount} publications${topicLabel}</p>
    `;
  }

  /**
   * Get a human-readable label for the current topic filter
   */
  getTopicLabel() {
    if (this.filters.topic === 'all') {
      return '';
    } else if (this.filters.topic === 'selected') {
      return ' (selected)';
    } else {
      const topicGroups = this.getTopicGroups();
      const group = topicGroups[this.filters.topic];
      return group ? ` (${group.label})` : '';
    }
  }

  /**
   * Reset all filters to default
   */
  resetFilters() {
    this.filters = {
      search: '',
      year: 'all',
      topic: 'selected', // Default to selected publications
      type: 'all'
    };

    // Reset UI
    this.elements.searchInput.value = '';
    this.elements.yearFilter.value = 'all';
    this.elements.topicFilter.value = 'selected';
    this.elements.typeFilter.value = 'all';

    this.applyFilters();

    console.log('[PublicationsManager] Filters reset');
  }

  /**
   * Export BibTeX for currently filtered publications
   */
  exportBibTeX() {
    let publications = [...this.allPublications];

    // Apply topic filter (including "selected")
    if (this.filters.topic === 'selected') {
      publications = publications.filter(pub => this.selectedPublicationIds.includes(pub.id));
    } else if (this.filters.topic !== 'all') {
      const topicGroups = this.getTopicGroups();
      const selectedGroup = topicGroups[this.filters.topic];

      if (selectedGroup) {
        publications = publications.filter(pub => {
          return pub.tags && pub.tags.some(tag => selectedGroup.tags.includes(tag));
        });
      }
    }

    // Apply search filter
    if (this.filters.search) {
      publications = publications.filter(pub => {
        const searchText = this.filters.search;
        const title = pub.title.toLowerCase();
        const authors = Array.isArray(pub.authors)
          ? pub.authors.join(' ').toLowerCase()
          : pub.authors.toLowerCase();
        const venue = pub.venue.toLowerCase();

        return title.includes(searchText) ||
               authors.includes(searchText) ||
               venue.includes(searchText);
      });
    }

    // Apply year filter
    if (this.filters.year !== 'all') {
      publications = publications.filter(pub => pub.year === parseInt(this.filters.year));
    }

    // Apply type filter
    if (this.filters.type !== 'all') {
      publications = publications.filter(pub => pub.type === this.filters.type);
    }

    const bibtexEntries = publications
      .filter(pub => pub.bibtex)
      .map(pub => pub.bibtex)
      .join('\n\n');

    if (bibtexEntries) {
      // Show modal instead of direct download
      this.showBibtexModal(bibtexEntries, 'dasaro_publications.bib');
      console.log('[PublicationsManager] Showing BibTeX modal for', publications.length, 'entries');
    } else {
      console.warn('[PublicationsManager] No BibTeX entries to export');
    }
  }

  /**
   * Export BibTeX for a single publication
   */
  exportSingleBibTeX(pubId) {
    const pub = this.allPublications.find(p => p.id === pubId);

    if (pub && pub.bibtex) {
      // Show modal instead of direct download
      this.showBibtexModal(pub.bibtex, `${pubId}.bib`);
      console.log('[PublicationsManager] Showing BibTeX modal for', pubId);
    } else {
      console.warn('[PublicationsManager] No BibTeX found for', pubId);
    }
  }

  /**
   * Download BibTeX content as a file
   */
  downloadBibTeX(content, filename) {
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  /**
   * Show BibTeX in modal
   */
  showBibtexModal(bibtexContent, filename) {
    this.currentBibtex = bibtexContent;
    this.currentFilename = filename;

    // Update modal content
    this.elements.bibtexContent.textContent = bibtexContent;

    // Show modal
    this.elements.modal.style.display = 'flex';
    document.body.style.overflow = 'hidden'; // Prevent background scroll

    console.log('[PublicationsManager] Modal displayed');
  }

  /**
   * Hide BibTeX modal
   */
  hideModal() {
    this.elements.modal.style.display = 'none';
    document.body.style.overflow = ''; // Restore scroll
    console.log('[PublicationsManager] Modal hidden');
  }

  /**
   * Copy BibTeX to clipboard
   */
  async copyBibtexToClipboard() {
    try {
      await navigator.clipboard.writeText(this.currentBibtex);

      // Visual feedback - change button text temporarily
      const originalText = this.elements.copyBtn.innerHTML;
      this.elements.copyBtn.innerHTML = '<span class="btn-icon">✓</span> Copied!';
      this.elements.copyBtn.style.background = 'var(--color-link)';

      setTimeout(() => {
        this.elements.copyBtn.innerHTML = originalText;
        this.elements.copyBtn.style.background = '';
      }, 2000);

      console.log('[PublicationsManager] BibTeX copied to clipboard');
    } catch (err) {
      console.error('[PublicationsManager] Failed to copy:', err);
      alert('Failed to copy to clipboard. Please try selecting and copying manually.');
    }
  }

  /**
   * Show error message in container
   */
  showError(message) {
    this.elements.container.innerHTML = `<p class="error-message">${message}</p>`;
    this.elements.countContainer.innerHTML = '';
  }

  /**
   * Debounce utility function
   */
  debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  const manager = new PublicationsManager();
  manager.init();
});
