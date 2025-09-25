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

        // Badges
        if (publication.badges && publication.badges.length > 0) {
            const badgesContainer = document.createElement('div');
            badgesContainer.className = 'publication-badges';

            publication.badges.forEach(badgeName => {
                const badge = window.badgeComponent?.createBadge(badgeName) || this.createSimpleBadge(badgeName);
                badgesContainer.appendChild(badge);
            });

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

    /**
     * Create simple badge fallback
     * @param {string} badgeName - Badge name
     * @returns {HTMLElement} Badge element
     */
    createSimpleBadge(badgeName) {
        const badge = document.createElement('span');
        badge.className = `badge badge-${badgeName}`;
        badge.setAttribute('data-i18n', `badges.${badgeName}`);
        badge.textContent = window.i18n?.t(`badges.${badgeName}`) || badgeName;
        return badge;
    }

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