/**
 * Publications Management System
 * Handles filtering, searching, and BibTeX export for publications
 * Integrated with the main academic website
 */

class PublicationsManager {
    constructor(publications = []) {
        this.allPublications = publications;
        this.filteredPublications = [...publications];
        this.currentFilters = {
            search: '',
            year: '',
            type: ''
        };

        this.init();
    }

    /**
     * Initialize the publications manager
     */
    init() {
        this.setupEventListeners();
        this.renderPublications();
        this.setupFilters();
        console.log('Publications manager initialized');
    }

    /**
     * Set up event listeners for filters and controls
     */
    setupEventListeners() {
        // Search input
        const searchInput = document.getElementById('pub-search');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                this.currentFilters.search = e.target.value.trim();
                this.applyFilters();
            });
        }

        // Year filter
        const yearFilter = document.getElementById('year-filter');
        if (yearFilter) {
            yearFilter.addEventListener('change', (e) => {
                this.currentFilters.year = e.target.value;
                this.applyFilters();
            });
        }

        // Type filter
        const typeFilter = document.getElementById('type-filter');
        if (typeFilter) {
            typeFilter.addEventListener('change', (e) => {
                this.currentFilters.type = e.target.value;
                this.applyFilters();
            });
        }

        // BibTeX export button
        const exportBtn = document.getElementById('export-bibtex');
        if (exportBtn) {
            exportBtn.addEventListener('click', () => {
                this.exportBibTeX();
            });
        }

        // Listen for data updates
        if (window.dataManager) {
            window.dataManager.on('dataUpdated', (data) => {
                if (data.section === 'publications') {
                    this.updatePublications(data.data);
                }
            });
        }

        // Listen for language changes
        document.addEventListener('languageChanged', () => {
            this.updateFilterLabels();
        });
    }

    /**
     * Set up filter options based on available data
     */
    setupFilters() {
        this.setupYearFilter();
        this.setupTypeFilter();
        this.updateFilterLabels();
    }

    /**
     * Set up year filter options
     */
    setupYearFilter() {
        const yearFilter = document.getElementById('year-filter');
        if (!yearFilter) return;

        // Get unique years from publications
        const years = [...new Set(
            this.allPublications
                .map(pub => pub.year)
                .filter(year => year)
                .map(year => parseInt(year))
        )].sort((a, b) => b - a);

        // Clear existing options
        yearFilter.innerHTML = '<option value="">All Years</option>';

        // Add year options
        years.forEach(year => {
            const option = document.createElement('option');
            option.value = year;
            option.textContent = year;
            yearFilter.appendChild(option);
        });
    }

    /**
     * Set up type filter options
     */
    setupTypeFilter() {
        const typeFilter = document.getElementById('type-filter');
        if (!typeFilter) return;

        // Get unique publication types
        const types = [...new Set(
            this.allPublications
                .map(pub => pub.type || this.inferPublicationType(pub))
                .filter(type => type)
        )].sort();

        // Clear existing options (keep default ones)
        const defaultOptions = Array.from(typeFilter.children);

        // Add inferred types that aren't already present
        types.forEach(type => {
            const exists = Array.from(typeFilter.options).some(option =>
                option.value === type
            );

            if (!exists && type !== 'journal' && type !== 'conference' && type !== 'book' && type !== 'thesis') {
                const option = document.createElement('option');
                option.value = type;
                option.textContent = type.charAt(0).toUpperCase() + type.slice(1);
                typeFilter.appendChild(option);
            }
        });
    }

    /**
     * Infer publication type from publication data
     */
    inferPublicationType(publication) {
        if (publication.journal) return 'journal';
        if (publication.conference || publication.booktitle) return 'conference';
        if (publication.thesis || publication.degree) return 'thesis';
        if (publication.book || publication.publisher) return 'book';
        if (publication.chapter) return 'chapter';
        if (publication.preprint || publication.arxiv) return 'preprint';
        return 'article'; // default
    }

    /**
     * Apply current filters to publications
     */
    applyFilters() {
        this.filteredPublications = this.allPublications.filter(pub => {
            // Search filter
            if (this.currentFilters.search) {
                const searchTerm = this.currentFilters.search.toLowerCase();
                const searchableText = [
                    pub.title,
                    pub.authors,
                    pub.journal,
                    pub.conference,
                    pub.abstract,
                    pub.keywords
                ].filter(field => field).join(' ').toLowerCase();

                if (!searchableText.includes(searchTerm)) {
                    return false;
                }
            }

            // Year filter
            if (this.currentFilters.year) {
                if (pub.year !== this.currentFilters.year) {
                    return false;
                }
            }

            // Type filter
            if (this.currentFilters.type) {
                const pubType = pub.type || this.inferPublicationType(pub);
                if (pubType !== this.currentFilters.type) {
                    return false;
                }
            }

            return true;
        });

        this.renderPublications();
        this.updateFilterSummary();
    }

    /**
     * Render filtered publications
     */
    renderPublications() {
        const publicationsList = document.querySelector('#publications .publications-list');
        if (!publicationsList) return;

        publicationsList.innerHTML = '';

        if (this.filteredPublications.length === 0) {
            this.renderEmptyState(publicationsList);
            return;
        }

        // Sort publications by year (most recent first) then by title
        const sortedPubs = [...this.filteredPublications].sort((a, b) => {
            const yearA = parseInt(a.year) || 0;
            const yearB = parseInt(b.year) || 0;

            if (yearA !== yearB) {
                return yearB - yearA; // Most recent first
            }

            return (a.title || '').localeCompare(b.title || '');
        });

        sortedPubs.forEach(pub => {
            const pubElement = this.createPublicationElement(pub);
            publicationsList.appendChild(pubElement);
        });

        // Add fade-in animation
        publicationsList.classList.add('fade-in');
    }

    /**
     * Create publication element
     */
    createPublicationElement(publication) {
        const article = document.createElement('article');
        article.className = 'publication-item';

        // Header with title and badges
        const header = document.createElement('div');
        header.className = 'publication-header';

        const title = document.createElement('h3');
        title.className = 'publication-title';
        title.textContent = publication.title || 'Untitled';

        const badgesContainer = document.createElement('div');
        badgesContainer.className = 'publication-badges';

        // Apply automatic badges
        const badges = window.dataManager?.applyAutomaticBadges(publication, 'publications') || [];
        if (publication.badges) {
            badges.push(...publication.badges);
        }

        if (window.dataManager && badges.length > 0) {
            window.dataManager.renderBadges(badges, badgesContainer);
        }

        header.appendChild(title);
        header.appendChild(badgesContainer);

        // Authors
        const authors = document.createElement('div');
        authors.className = 'publication-authors';
        authors.textContent = publication.authors || '';

        // Venue
        const venue = document.createElement('div');
        venue.className = 'publication-venue';

        let venueText = '';
        if (publication.journal) {
            venueText = publication.journal;
            if (publication.volume) {
                venueText += `, ${publication.volume}`;
                if (publication.number) {
                    venueText += `(${publication.number})`;
                }
            }
            if (publication.pages) {
                venueText += `, pp. ${publication.pages}`;
            }
        } else if (publication.conference) {
            venueText = publication.conference;
            if (publication.year) {
                venueText += ` ${publication.year}`;
            }
        } else if (publication.book) {
            venueText = publication.book;
            if (publication.publisher) {
                venueText += `, ${publication.publisher}`;
            }
        }

        venue.textContent = venueText;

        // Meta information (year and links)
        const meta = document.createElement('div');
        meta.className = 'publication-meta';

        const year = document.createElement('span');
        year.className = 'publication-year';
        year.textContent = publication.year || '';

        const linksContainer = document.createElement('div');
        linksContainer.className = 'publication-links';

        // Add links
        this.addPublicationLinks(publication, linksContainer);

        meta.appendChild(year);
        meta.appendChild(linksContainer);

        // Assemble the publication item
        article.appendChild(header);
        article.appendChild(authors);
        article.appendChild(venue);
        article.appendChild(meta);

        // Add abstract if available (collapsible)
        if (publication.abstract) {
            this.addAbstractSection(article, publication.abstract);
        }

        return article;
    }

    /**
     * Add publication links (DOI, PDF, etc.)
     */
    addPublicationLinks(publication, container) {
        const links = [
            { key: 'doi', label: 'DOI', url: publication.doi ? `https://doi.org/${publication.doi}` : null },
            { key: 'url', label: 'URL', url: publication.url },
            { key: 'pdf', label: 'PDF', url: publication.pdf },
            { key: 'arxiv', label: 'arXiv', url: publication.arxiv ? `https://arxiv.org/abs/${publication.arxiv}` : null },
            { key: 'code', label: 'Code', url: publication.code },
            { key: 'data', label: 'Data', url: publication.data }
        ];

        links.forEach(link => {
            if (link.url) {
                const linkElement = document.createElement('a');
                linkElement.href = link.url;
                linkElement.className = 'publication-link';
                linkElement.target = '_blank';
                linkElement.rel = 'noopener';
                linkElement.textContent = link.label;
                container.appendChild(linkElement);
            }
        });

        // Add BibTeX link
        const bibtexLink = document.createElement('button');
        bibtexLink.className = 'publication-link';
        bibtexLink.textContent = 'BibTeX';
        bibtexLink.addEventListener('click', (e) => {
            e.preventDefault();
            this.showBibTeXModal(publication);
        });
        container.appendChild(bibtexLink);
    }

    /**
     * Add collapsible abstract section
     */
    addAbstractSection(article, abstract) {
        const abstractContainer = document.createElement('div');
        abstractContainer.className = 'publication-abstract';
        abstractContainer.style.display = 'none';

        const abstractText = document.createElement('p');
        abstractText.textContent = abstract;
        abstractContainer.appendChild(abstractText);

        const toggleButton = document.createElement('button');
        toggleButton.className = 'abstract-toggle';
        toggleButton.textContent = 'Show Abstract';
        toggleButton.addEventListener('click', () => {
            const isHidden = abstractContainer.style.display === 'none';
            abstractContainer.style.display = isHidden ? 'block' : 'none';
            toggleButton.textContent = isHidden ? 'Hide Abstract' : 'Show Abstract';
        });

        article.appendChild(toggleButton);
        article.appendChild(abstractContainer);
    }

    /**
     * Render empty state when no publications match filters
     */
    renderEmptyState(container) {
        const emptyState = document.createElement('div');
        emptyState.className = 'empty-state';
        emptyState.innerHTML = `
            <div style="text-align: center; padding: 2rem; color: var(--text-secondary);">
                <i class="fas fa-search" style="font-size: 3rem; margin-bottom: 1rem; opacity: 0.5;"></i>
                <h3>No publications found</h3>
                <p>Try adjusting your search criteria or filters.</p>
            </div>
        `;
        container.appendChild(emptyState);
    }

    /**
     * Update filter summary
     */
    updateFilterSummary() {
        const total = this.allPublications.length;
        const filtered = this.filteredPublications.length;

        // You can add a summary display here if desired
        console.log(`Showing ${filtered} of ${total} publications`);
    }

    /**
     * Export filtered publications as BibTeX
     */
    exportBibTeX() {
        if (this.filteredPublications.length === 0) {
            alert('No publications to export.');
            return;
        }

        const bibtex = this.generateBibTeX(this.filteredPublications);
        this.downloadBibTeX(bibtex);
    }

    /**
     * Generate BibTeX string from publications
     */
    generateBibTeX(publications) {
        let bibtex = '';

        publications.forEach((pub, index) => {
            const key = pub.key || this.generateBibTeXKey(pub, index);
            const type = pub.type || this.inferPublicationType(pub);

            bibtex += `@${type}{${key},\n`;

            // Required and optional fields
            const fields = [
                { key: 'title', value: pub.title, required: true },
                { key: 'author', value: pub.authors, required: true },
                { key: 'year', value: pub.year, required: true },
                { key: 'journal', value: pub.journal },
                { key: 'booktitle', value: pub.conference || pub.booktitle },
                { key: 'volume', value: pub.volume },
                { key: 'number', value: pub.number },
                { key: 'pages', value: pub.pages },
                { key: 'publisher', value: pub.publisher },
                { key: 'doi', value: pub.doi },
                { key: 'url', value: pub.url },
                { key: 'note', value: pub.note },
                { key: 'abstract', value: pub.abstract }
            ];

            fields.forEach(field => {
                if (field.value) {
                    const cleanValue = field.value.toString().replace(/[{}]/g, '');
                    bibtex += `  ${field.key}={${cleanValue}},\n`;
                }
            });

            bibtex += '}\n\n';
        });

        return bibtex.trim();
    }

    /**
     * Generate BibTeX key for publication
     */
    generateBibTeXKey(publication, index) {
        if (publication.key) return publication.key;

        let key = 'publication' + (index + 1);

        // Try to create a more meaningful key
        if (publication.authors && publication.year) {
            const firstAuthor = publication.authors.split(',')[0].trim().split(' ').pop();
            key = `${firstAuthor}${publication.year}`;

            // Add title word if available
            if (publication.title) {
                const firstWord = publication.title.split(' ')[0].replace(/[^a-zA-Z0-9]/g, '');
                if (firstWord.length > 2) {
                    key += firstWord;
                }
            }
        }

        return key.toLowerCase();
    }

    /**
     * Download BibTeX as file
     */
    downloadBibTeX(bibtexContent) {
        const blob = new Blob([bibtexContent], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);

        const link = document.createElement('a');
        link.href = url;
        link.download = `publications_${new Date().toISOString().split('T')[0]}.bib`;

        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        URL.revokeObjectURL(url);
    }

    /**
     * Show BibTeX modal for single publication
     */
    showBibTeXModal(publication) {
        const bibtex = this.generateBibTeX([publication]);

        // Create modal
        const modal = document.createElement('div');
        modal.className = 'bibtex-modal';
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.8);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: var(--z-modal);
            padding: 1rem;
        `;

        const content = document.createElement('div');
        content.style.cssText = `
            background: var(--bg-primary);
            border-radius: var(--border-radius);
            padding: 1.5rem;
            max-width: 600px;
            width: 100%;
            max-height: 80vh;
            overflow-y: auto;
        `;

        const title = document.createElement('h3');
        title.textContent = 'BibTeX Citation';
        title.style.marginBottom = '1rem';

        const textarea = document.createElement('textarea');
        textarea.value = bibtex;
        textarea.style.cssText = `
            width: 100%;
            height: 200px;
            font-family: 'Courier New', monospace;
            font-size: 0.875rem;
            border: 1px solid var(--color-medium-gray);
            border-radius: var(--border-radius-sm);
            padding: 0.75rem;
            resize: vertical;
        `;

        const buttons = document.createElement('div');
        buttons.style.cssText = `
            display: flex;
            gap: 1rem;
            justify-content: flex-end;
            margin-top: 1rem;
        `;

        const copyButton = document.createElement('button');
        copyButton.textContent = 'Copy';
        copyButton.className = 'export-btn';
        copyButton.addEventListener('click', () => {
            textarea.select();
            document.execCommand('copy');
            copyButton.textContent = 'Copied!';
            setTimeout(() => copyButton.textContent = 'Copy', 2000);
        });

        const closeButton = document.createElement('button');
        closeButton.textContent = 'Close';
        closeButton.className = 'export-btn';
        closeButton.style.background = 'var(--color-medium-gray)';
        closeButton.addEventListener('click', () => {
            document.body.removeChild(modal);
        });

        buttons.appendChild(copyButton);
        buttons.appendChild(closeButton);

        content.appendChild(title);
        content.appendChild(textarea);
        content.appendChild(buttons);

        modal.appendChild(content);

        // Close on background click
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                document.body.removeChild(modal);
            }
        });

        // Close on Escape key
        const escapeHandler = (e) => {
            if (e.key === 'Escape') {
                document.body.removeChild(modal);
                document.removeEventListener('keydown', escapeHandler);
            }
        };
        document.addEventListener('keydown', escapeHandler);

        document.body.appendChild(modal);
        textarea.focus();
    }

    /**
     * Update publications data
     */
    updatePublications(newPublications) {
        this.allPublications = newPublications || [];
        this.setupFilters();
        this.applyFilters();
    }

    /**
     * Update filter labels when language changes
     */
    updateFilterLabels() {
        // Update placeholder text
        const searchInput = document.getElementById('pub-search');
        if (searchInput && window.i18n) {
            searchInput.placeholder = window.i18n.t('publications.searchPlaceholder') || 'Search publications...';
        }

        // Update filter labels
        const yearFilter = document.getElementById('year-filter');
        if (yearFilter && window.i18n) {
            const allYearsOption = yearFilter.querySelector('option[value=""]');
            if (allYearsOption) {
                allYearsOption.textContent = window.i18n.t('publications.allYears') || 'All Years';
            }
        }

        const typeFilter = document.getElementById('type-filter');
        if (typeFilter && window.i18n) {
            const allTypesOption = typeFilter.querySelector('option[value=""]');
            if (allTypesOption) {
                allTypesOption.textContent = window.i18n.t('publications.allTypes') || 'All Types';
            }
        }

        // Update export button
        const exportBtn = document.getElementById('export-bibtex');
        if (exportBtn && window.i18n) {
            const text = exportBtn.querySelector('span') || exportBtn;
            text.textContent = window.i18n.t('publications.exportBibTeX') || 'Export BibTeX';
        }
    }

    /**
     * Get filtered publications count
     */
    getFilteredCount() {
        return this.filteredPublications.length;
    }

    /**
     * Get total publications count
     */
    getTotalCount() {
        return this.allPublications.length;
    }

    /**
     * Clear all filters
     */
    clearFilters() {
        this.currentFilters = { search: '', year: '', type: '' };

        // Reset form inputs
        const searchInput = document.getElementById('pub-search');
        const yearFilter = document.getElementById('year-filter');
        const typeFilter = document.getElementById('type-filter');

        if (searchInput) searchInput.value = '';
        if (yearFilter) yearFilter.value = '';
        if (typeFilter) typeFilter.value = '';

        this.applyFilters();
    }
}

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = PublicationsManager;
}