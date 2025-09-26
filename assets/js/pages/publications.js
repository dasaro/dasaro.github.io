/**
 * Publications Page Module
 * Handles publications section logic and rendering
 * Includes search, filtering, and export functionality
 */

class PublicationsPage {
    constructor() {
        this.isInitialized = false;
        this.data = null;
        this.debugMode = true;
        this.filteredPublications = [];
        this.searchTerm = '';
        this.yearFilter = '';
        this.typeFilter = '';
    }

    /**
     * Render the Publications page with provided data
     * @param {Object} data - Application data
     */
    render(data) {
        this.log('Rendering Publications page with data:', data);

        if (!data || !data.publications) {
            this.log('ERROR: No publications data provided');
            return;
        }

        this.data = data;
        this.setupFilters(data.publications);
        this.renderPublications(data.publications);

        this.log('Publications page rendered successfully');
    }

    /**
     * Initialize Publications page
     */
    init() {
        this.log('Initializing Publications page');

        if (!this.isInitialized) {
            this.setupEventListeners();
            this.isInitialized = true;
        }

        this.log('Publications page initialized');
    }

    /**
     * Cleanup when leaving Publications page
     */
    cleanup() {
        this.log('Cleaning up Publications page');
    }

    /**
     * Check if Publications page should be visible
     * @returns {boolean} Whether page should be visible
     */
    isVisible() {
        return true;
    }

    /**
     * Set up publication filters
     * @param {Array} publications - Publications data array
     */
    setupFilters(publications) {
        this.log('Setting up publication filters');

        // Year filter options
        const years = [...new Set(publications.map(pub => pub.year).filter(Boolean))].sort((a, b) => b - a);
        const yearFilter = document.querySelector('#year-filter');
        if (yearFilter) {
            yearFilter.innerHTML = '<option value="" data-i18n="publications.allYears">All Years</option>';
            years.forEach(year => {
                const option = document.createElement('option');
                option.value = year;
                option.textContent = year;
                yearFilter.appendChild(option);
            });
        }

        this.filteredPublications = [...publications];
    }

    /**
     * Render publications list
     * @param {Array} publications - Publications data array
     */
    renderPublications(publications) {
        this.log('Rendering publications list with', publications.length, 'items');

        const publicationsList = document.querySelector('#publications .publications-list');
        if (!publicationsList) {
            this.log('ERROR: Publications list container not found');
            return;
        }

        publicationsList.innerHTML = '';

        if (!publications || publications.length === 0) {
            this.renderEmptyState(publicationsList);
            return;
        }

        // Sort publications by year (most recent first), then by title
        const sortedPublications = [...this.filteredPublications].sort((a, b) => {
            const yearA = a.year || 0;
            const yearB = b.year || 0;
            if (yearB !== yearA) return yearB - yearA;
            return (a.title || '').localeCompare(b.title || '');
        });

        sortedPublications.forEach(publication => {
            const publicationItem = this.createPublicationItem(publication);
            publicationsList.appendChild(publicationItem);
        });

        this.log('Publications list rendered with', sortedPublications.length, 'items');
    }

    /**
     * Create a publication item
     * @param {Object} publication - Publication data
     * @returns {HTMLElement} Publication item element
     */
    createPublicationItem(publication) {
        this.log('Creating publication item:', publication);

        const item = document.createElement('article');
        item.className = 'publication-item';

        // Header with title and badges
        const header = document.createElement('div');
        header.className = 'publication-header';

        const title = document.createElement('h3');
        title.className = 'publication-title';
        title.textContent = publication.title || 'Untitled';
        header.appendChild(title);

        // Publication type chip and badges
        const badgesContainer = document.createElement('div');
        badgesContainer.className = 'publication-badges';

        // Add publication type chip
        if (publication.type) {
            const typeChip = this.createTypeChip(publication.type, publication.status);
            badgesContainer.appendChild(typeChip);
        }

        // Add other badges
        if (publication.badges && publication.badges.length > 0) {
            publication.badges.forEach(badgeName => {
                const badge = window.badgeComponent?.createBadge(badgeName) || window.SharedUtils.createSimpleBadge(badgeName);
                badgesContainer.appendChild(badge);
            });
        }

        if (badgesContainer.children.length > 0) {
            header.appendChild(badgesContainer);
        }

        item.appendChild(header);

        // Authors
        if (publication.authors && publication.authors.length > 0) {
            const authors = document.createElement('div');
            authors.className = 'publication-authors';
            authors.textContent = publication.authors.join(', ');
            item.appendChild(authors);
        }

        // Venue (journal, conference, etc.)
        if (publication.venue) {
            const venue = document.createElement('div');
            venue.className = 'publication-venue';
            venue.innerHTML = `<em>${publication.venue}</em>`;
            item.appendChild(venue);
        }

        // Meta information
        const meta = document.createElement('div');
        meta.className = 'publication-meta';

        if (publication.year) {
            const year = document.createElement('span');
            year.className = 'publication-year';
            year.textContent = publication.year;
            meta.appendChild(year);
        }

        // Links
        const linksContainer = document.createElement('div');
        linksContainer.className = 'publication-links';

        if (publication.doi) {
            const doiLink = document.createElement('a');
            doiLink.href = `https://doi.org/${publication.doi}`;
            doiLink.target = '_blank';
            doiLink.rel = 'noopener';
            doiLink.innerHTML = '<i class="fas fa-external-link-alt"></i> DOI';
            linksContainer.appendChild(doiLink);
        }

        if (publication.pdf) {
            const pdfLink = document.createElement('a');
            pdfLink.href = publication.pdf;
            pdfLink.target = '_blank';
            pdfLink.rel = 'noopener';
            pdfLink.innerHTML = '<i class="fas fa-file-pdf"></i> PDF';
            linksContainer.appendChild(pdfLink);
        }

        if (publication.url) {
            const urlLink = document.createElement('a');
            urlLink.href = publication.url;
            urlLink.target = '_blank';
            urlLink.rel = 'noopener';
            urlLink.innerHTML = '<i class="fas fa-link"></i> Link';
            linksContainer.appendChild(urlLink);
        }

        // Add BibTeX link
        const bibtexLink = document.createElement('a');
        bibtexLink.href = '#';
        bibtexLink.className = 'bibtex-link';
        bibtexLink.innerHTML = '<i class="fas fa-quote-left"></i> BibTeX';
        bibtexLink.addEventListener('click', (e) => {
            e.preventDefault();
            this.showBibTeXModal(publication);
        });
        linksContainer.appendChild(bibtexLink);

        if (linksContainer.children.length > 0) {
            meta.appendChild(linksContainer);
        }

        item.appendChild(meta);

        // Abstract or description
        if (publication.abstract || publication.description) {
            const abstract = document.createElement('div');
            abstract.className = 'publication-abstract';
            abstract.textContent = publication.abstract || publication.description;
            item.appendChild(abstract);
        }

        return item;
    }

    /**
     * Create publication type chip
     */
    createTypeChip(type, status) {
        const chip = document.createElement('span');

        // Handle special cases
        const displayType = status === 'in press' || status === 'In Press' ? 'In Press' : type;
        const chipClass = this.getTypeChipClass(displayType.toLowerCase());

        chip.className = `publication-type-chip ${chipClass}`;
        chip.textContent = displayType.charAt(0).toUpperCase() + displayType.slice(1);

        return chip;
    }

    /**
     * Get CSS class for publication type chip
     */
    getTypeChipClass(type) {
        const typeClasses = {
            'journal': 'chip-journal',
            'conference': 'chip-conference',
            'book': 'chip-book',
            'chapter': 'chip-chapter',
            'thesis': 'chip-thesis',
            'preprint': 'chip-preprint',
            'in press': 'chip-in-press',
            'under review': 'chip-under-review',
            'report': 'chip-report'
        };
        return typeClasses[type] || 'chip-default';
    }

    /**
     * Show BibTeX modal for a publication
     */
    showBibTeXModal(publication) {
        this.log('Showing BibTeX modal for:', publication.title);

        // Generate BibTeX if not provided
        let bibtex = publication.bibtex;
        if (!bibtex) {
            const key = `${publication.authors?.[0]?.split(' ').pop()?.toLowerCase() || 'author'}${publication.year || 'year'}`;
            const type = publication.type === 'conference' ? 'inproceedings' : 'article';

            bibtex = `@${type}{${key},\n`;
            bibtex += `  title = {${publication.title || ''}},\n`;
            if (publication.authors) bibtex += `  author = {${publication.authors.join(' and ')}},\n`;
            if (publication.venue) {
                if (publication.type === 'conference') {
                    bibtex += `  booktitle = {${publication.venue}},\n`;
                } else {
                    bibtex += `  journal = {${publication.venue}},\n`;
                }
            }
            if (publication.year) bibtex += `  year = {${publication.year}},\n`;
            if (publication.doi) bibtex += `  doi = {${publication.doi}},\n`;
            if (publication.url) bibtex += `  url = {${publication.url}},\n`;
            bibtex += `}`;
        }

        // Create and show modal
        this.createBibTeXModal(publication.title, bibtex);
    }

    /**
     * Create BibTeX modal
     */
    createBibTeXModal(title, bibtex) {
        // Remove existing modal
        const existingModal = document.getElementById('bibtex-modal');
        if (existingModal) {
            existingModal.remove();
        }

        // Create modal
        const modal = document.createElement('div');
        modal.id = 'bibtex-modal';
        modal.className = 'bibtex-modal';
        modal.innerHTML = `
            <div class="bibtex-modal-content">
                <div class="bibtex-modal-header">
                    <h3>BibTeX Citation</h3>
                    <button class="bibtex-modal-close">&times;</button>
                </div>
                <div class="bibtex-modal-body">
                    <h4>${title}</h4>
                    <textarea readonly class="bibtex-content">${bibtex}</textarea>
                    <div class="bibtex-modal-actions">
                        <button class="btn btn-primary copy-bibtex">Copy to Clipboard</button>
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(modal);

        // Event listeners
        const closeBtn = modal.querySelector('.bibtex-modal-close');
        const copyBtn = modal.querySelector('.copy-bibtex');
        const textarea = modal.querySelector('.bibtex-content');

        closeBtn.addEventListener('click', () => modal.remove());
        modal.addEventListener('click', (e) => {
            if (e.target === modal) modal.remove();
        });

        copyBtn.addEventListener('click', () => {
            textarea.select();

            // Use modern Clipboard API with fallback
            if (navigator.clipboard && window.isSecureContext) {
                navigator.clipboard.writeText(bibtex).then(() => {
                    copyBtn.textContent = 'Copied!';
                    setTimeout(() => {
                        copyBtn.textContent = 'Copy to Clipboard';
                    }, 2000);
                }).catch(() => {
                    // Fallback for older browsers
                    document.execCommand('copy');
                    copyBtn.textContent = 'Copied!';
                    setTimeout(() => {
                        copyBtn.textContent = 'Copy to Clipboard';
                    }, 2000);
                });
            } else {
                // Fallback method
                try {
                    document.execCommand('copy');
                    copyBtn.textContent = 'Copied!';
                    setTimeout(() => {
                        copyBtn.textContent = 'Copy to Clipboard';
                    }, 2000);
                } catch (err) {
                    // Manual copy fallback
                    const textArea = document.createElement('textarea');
                    textArea.value = bibtex;
                    textArea.style.position = 'fixed';
                    textArea.style.opacity = '0';
                    document.body.appendChild(textArea);
                    textArea.select();
                    try {
                        document.execCommand('copy');
                        copyBtn.textContent = 'Copied!';
                        setTimeout(() => {
                            copyBtn.textContent = 'Copy to Clipboard';
                        }, 2000);
                    } catch (fallbackErr) {
                        copyBtn.textContent = 'Copy failed - select text manually';
                    }
                    document.body.removeChild(textArea);
                }
            }
        });

        // Show modal with animation
        setTimeout(() => modal.classList.add('show'), 10);
    }

    /**
     * Filter publications based on current filters
     */
    filterPublications() {
        this.log('Filtering publications');

        if (!this.data || !this.data.publications) return;

        let filtered = [...this.data.publications];

        // Search filter
        if (this.searchTerm) {
            const term = this.searchTerm.toLowerCase();
            filtered = filtered.filter(pub =>
                (pub.title && pub.title.toLowerCase().includes(term)) ||
                (pub.authors && pub.authors.some(author => author.toLowerCase().includes(term))) ||
                (pub.venue && pub.venue.toLowerCase().includes(term)) ||
                (pub.abstract && pub.abstract.toLowerCase().includes(term))
            );
        }

        // Year filter
        if (this.yearFilter) {
            filtered = filtered.filter(pub => pub.year && pub.year.toString() === this.yearFilter);
        }

        // Type filter
        if (this.typeFilter) {
            filtered = filtered.filter(pub => pub.type === this.typeFilter);
        }

        this.filteredPublications = filtered;
        this.renderPublications(this.data.publications);

        this.log('Publications filtered:', this.filteredPublications.length, 'results');
    }

    /**
     * Export publications as BibTeX
     */
    exportBibTeX() {
        this.log('Exporting publications as BibTeX');

        if (!this.filteredPublications || this.filteredPublications.length === 0) {
            this.log('No publications to export');
            return;
        }

        let bibtex = '';
        this.filteredPublications.forEach(pub => {
            if (pub.bibtex) {
                bibtex += pub.bibtex + '\n\n';
            } else {
                // Generate basic BibTeX entry if not provided
                const key = `${pub.authors?.[0]?.split(' ').pop() || 'author'}${pub.year || 'year'}`;
                bibtex += `@article{${key},\n`;
                bibtex += `  title = {${pub.title || ''}},\n`;
                if (pub.authors) bibtex += `  author = {${pub.authors.join(' and ')}},\n`;
                if (pub.venue) bibtex += `  journal = {${pub.venue}},\n`;
                if (pub.year) bibtex += `  year = {${pub.year}},\n`;
                if (pub.doi) bibtex += `  doi = {${pub.doi}},\n`;
                bibtex += `}\n\n`;
            }
        });

        // Download as file
        const blob = new Blob([bibtex], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'publications.bib';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);

        this.log('BibTeX export completed');
    }

    // Duplicate methods removed - using SharedUtils instead

    /**
     * Render empty state
     * @param {HTMLElement} container - Container element
     */
    renderEmptyState(container) {
        this.log('Rendering empty state for publications');

        const emptyState = document.createElement('div');
        emptyState.className = 'empty-state';
        emptyState.innerHTML = `
            <p>No publications found matching the current filters.</p>
        `;

        container.appendChild(emptyState);
    }

    /**
     * Set up event listeners for Publications page
     */
    setupEventListeners() {
        this.log('Setting up Publications page event listeners');

        // Search input
        const searchInput = document.querySelector('#pub-search');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                this.searchTerm = e.target.value;
                this.filterPublications();
            });
        }

        // Year filter
        const yearFilter = document.querySelector('#year-filter');
        if (yearFilter) {
            yearFilter.addEventListener('change', (e) => {
                this.yearFilter = e.target.value;
                this.filterPublications();
            });
        }

        // Type filter
        const typeFilter = document.querySelector('#type-filter');
        if (typeFilter) {
            typeFilter.addEventListener('change', (e) => {
                this.typeFilter = e.target.value;
                this.filterPublications();
            });
        }

        // Export button
        const exportBtn = document.querySelector('#export-bibtex');
        if (exportBtn) {
            exportBtn.addEventListener('click', () => {
                this.exportBibTeX();
            });
        }
    }

    /**
     * Debug logging
     * @param {string} message - Log message
     * @param {any} data - Optional data to log
     */
    log(message, data = null) {
        if (this.debugMode) {
            const prefix = '[PublicationsPage]';
            if (data) {
                console.log(prefix, message, data);
            } else {
                console.log(prefix, message);
            }
        }
    }

    /**
     * Enable/disable debug mode
     * @param {boolean} enabled - Whether to enable debug mode
     */
    setDebugMode(enabled) {
        this.debugMode = enabled;
    }
}

// Create and export page instance
const publicationsPage = new PublicationsPage();

// Route registration handled by app.js

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = PublicationsPage;
}

// Make available globally for debugging
if (typeof window !== 'undefined') {
    window.publicationsPage = publicationsPage;
}