/**
 * Citation Metrics Page Module
 * Handles citation metrics section logic and rendering
 * Displays research impact metrics and featured publications
 */

class CitationMetricsPage {
    constructor() {
        this.isInitialized = false;
        this.data = null;
        this.debugMode = true;
    }

    /**
     * Render the Citation Metrics page with provided data
     * @param {Object} data - Application data
     */
    render(data) {
        this.log('Rendering Citation Metrics page with data:', data);

        if (!data || !data.citationMetrics) {
            this.log('ERROR: No citation metrics data provided');
            return;
        }

        this.data = data;

        // Enhance existing section header with icon
        this.enhanceExistingSectionHeader();

        this.renderMetrics(data.citationMetrics);
        this.renderFeaturedPublications(data.citationMetrics.featuredPublications || []);

        this.log('Citation Metrics page rendered successfully');
    }

    /**
     * Initialize Citation Metrics page
     */
    init() {
        this.log('Initializing Citation Metrics page');

        if (!this.isInitialized) {
            this.setupEventListeners();
            this.isInitialized = true;
        }

        this.log('Citation Metrics page initialized');
    }

    /**
     * Cleanup when leaving Citation Metrics page
     */
    cleanup() {
        this.log('Cleaning up Citation Metrics page');
    }

    /**
     * Check if Citation Metrics page should be visible
     * @returns {boolean} Whether page should be visible
     */
    isVisible() {
        return true;
    }

    /**
     * Enhance existing section header with icon
     */
    enhanceExistingSectionHeader() {
        const sectionHeader = document.querySelector('#citation-metrics .section-header h2');
        if (sectionHeader && !sectionHeader.querySelector('i')) {
            // Add icon to the existing title
            sectionHeader.innerHTML = '<i class="fas fa-chart-line"></i> ' + sectionHeader.textContent;
        }
    }

    /**
     * Render citation metrics
     * @param {Object} citationMetrics - Citation metrics data
     */
    renderMetrics(citationMetrics) {
        this.log('Rendering citation metrics');

        const metricsContainer = document.querySelector('#citation-metrics .citation-metrics-container');
        if (!metricsContainer) {
            this.log('ERROR: Citation metrics container not found');
            return;
        }

        metricsContainer.innerHTML = '';

        // Create stats grid (using stats-grid for proper single-row layout)
        const statsGrid = document.createElement('div');
        statsGrid.className = 'stats-grid';

        // Define the 4 key metrics in order
        const keyMetrics = [
            {
                value: citationMetrics.overview?.publications || citationMetrics.publications || 0,
                label: 'Publications'
            },
            {
                value: citationMetrics.overview?.hIndex || citationMetrics.hIndex || 0,
                label: 'h-index'
            },
            {
                value: citationMetrics.overview?.i10Index || citationMetrics.i10Index || 0,
                label: 'i10-index'
            },
            {
                value: citationMetrics.overview?.totalCitations || citationMetrics.totalCitations || 0,
                label: 'Citations'
            }
        ];

        // Create stat items for the 4 key metrics
        keyMetrics.forEach(metric => {
            const statItem = document.createElement('div');
            statItem.className = 'stat-item';

            const statNumber = document.createElement('span');
            statNumber.className = 'stat-number';
            statNumber.textContent = metric.value;

            const statLabel = document.createElement('span');
            statLabel.className = 'stat-label';
            statLabel.textContent = metric.label;

            statItem.appendChild(statNumber);
            statItem.appendChild(statLabel);
            statsGrid.appendChild(statItem);
        });

        metricsContainer.appendChild(statsGrid);

        // Add Google Scholar link
        if (citationMetrics.googleScholarProfile) {
            const scholarLink = document.createElement('div');
            scholarLink.className = 'scholar-link-container';
            scholarLink.style.textAlign = 'center';
            scholarLink.style.marginTop = '1.5rem';

            const link = document.createElement('a');
            link.href = citationMetrics.googleScholarProfile;
            link.target = '_blank';
            link.rel = 'noopener noreferrer';
            link.className = 'scholar-link';
            link.innerHTML = '<i class="fas fa-graduation-cap"></i> View Google Scholar Profile for Current Metrics';

            scholarLink.appendChild(link);
            metricsContainer.appendChild(scholarLink);
        }

        // Add additional metrics if they exist
        this.renderAdditionalMetrics(citationMetrics, metricsContainer);

        this.log('Citation metrics rendered successfully');
    }

    /**
     * Create a metric item
     * @param {Object} metric - Metric configuration
     * @param {number|string} value - Metric value
     * @returns {HTMLElement} Metric item element
     */
    createMetricItem(metric, value) {
        const item = document.createElement('div');
        item.className = 'metric-item';

        const icon = document.createElement('div');
        icon.className = 'metric-icon';
        icon.innerHTML = `<i class="${metric.icon}"></i>`;

        const content = document.createElement('div');
        content.className = 'metric-content';

        const valueElement = document.createElement('div');
        valueElement.className = 'metric-value';
        valueElement.textContent = this.formatMetricValue(value);

        const label = document.createElement('div');
        label.className = 'metric-label';
        label.textContent = metric.label;

        content.appendChild(valueElement);
        content.appendChild(label);
        item.appendChild(icon);
        item.appendChild(content);

        return item;
    }

    /**
     * Render additional metrics (custom metrics)
     * @param {Object} citationMetrics - Citation metrics data
     * @param {HTMLElement} container - Container element
     */
    renderAdditionalMetrics(citationMetrics, container) {
        // Profile links
        if (citationMetrics.profiles) {
            const profilesSection = document.createElement('div');
            profilesSection.className = 'metrics-profiles';

            const profilesTitle = document.createElement('h3');
            profilesTitle.textContent = 'Academic Profiles';
            profilesSection.appendChild(profilesTitle);

            const profilesGrid = document.createElement('div');
            profilesGrid.className = 'profiles-grid';

            Object.entries(citationMetrics.profiles).forEach(([platform, url]) => {
                const profileLink = this.createProfileLink(platform, url);
                if (profileLink) {
                    profilesGrid.appendChild(profileLink);
                }
            });

            if (profilesGrid.children.length > 0) {
                profilesSection.appendChild(profilesGrid);
                container.appendChild(profilesSection);
            }
        }

        // Recent metrics update
        if (citationMetrics.lastUpdated) {
            const lastUpdated = document.createElement('div');
            lastUpdated.className = 'metrics-last-updated';
            lastUpdated.innerHTML = `
                <i class="fas fa-clock"></i>
                Last updated: ${window.SharedUtils.formatDate(citationMetrics.lastUpdated)}
            `;
            container.appendChild(lastUpdated);
        }
    }

    /**
     * Create profile link
     * @param {string} platform - Platform name
     * @param {string} url - Profile URL
     * @returns {HTMLElement|null} Profile link element
     */
    createProfileLink(platform, url) {
        const platformConfigs = {
            'googleScholar': { icon: 'fas fa-graduation-cap', label: 'Google Scholar' },
            'researchGate': { icon: 'fab fa-researchgate', label: 'ResearchGate' },
            'orcid': { icon: 'fab fa-orcid', label: 'ORCID' },
            'scopus': { icon: 'fas fa-database', label: 'Scopus' },
            'webOfScience': { icon: 'fas fa-flask', label: 'Web of Science' },
            'semanticScholar': { icon: 'fas fa-brain', label: 'Semantic Scholar' }
        };

        const config = platformConfigs[platform];
        if (!config) return null;

        const link = document.createElement('a');
        link.className = 'profile-link';
        link.href = url;
        link.target = '_blank';
        link.rel = 'noopener';
        link.innerHTML = `
            <i class="${config.icon}"></i>
            <span>${config.label}</span>
        `;

        return link;
    }

    /**
     * Render featured publications
     * @param {Array} featuredPublications - Featured publications array
     */
    renderFeaturedPublications(featuredPublications) {
        this.log('Rendering featured publications with', featuredPublications.length, 'items');

        if (!featuredPublications || featuredPublications.length === 0) {
            this.log('No featured publications to display');
            return;
        }

        const container = document.querySelector('#citation-metrics .citation-metrics-container');
        if (!container) return;

        // Create featured publications section
        const featuredSection = document.createElement('div');
        featuredSection.className = 'featured-publications-section';

        const title = document.createElement('h3');
        title.textContent = 'Most Cited Publications';
        featuredSection.appendChild(title);

        const featuredList = document.createElement('div');
        featuredList.className = 'featured-publications-list';

        featuredPublications.forEach(publication => {
            const item = this.createFeaturedPublicationItem(publication);
            featuredList.appendChild(item);
        });

        featuredSection.appendChild(featuredList);
        container.appendChild(featuredSection);

        this.log('Featured publications rendered successfully');
    }

    /**
     * Create featured publication item
     * @param {Object} publication - Publication data
     * @returns {HTMLElement} Featured publication element
     */
    createFeaturedPublicationItem(publication) {
        const item = document.createElement('div');
        item.className = 'featured-publication-item';

        const header = document.createElement('div');
        header.className = 'featured-publication-header';

        const title = document.createElement('h4');
        title.className = 'featured-publication-title';
        title.textContent = publication.title || 'Untitled';
        header.appendChild(title);

        if (publication.citations) {
            const citations = document.createElement('div');
            citations.className = 'featured-publication-citations';
            citations.innerHTML = `<i class="fas fa-quote-right"></i> ${publication.citations} citations`;
            header.appendChild(citations);
        }

        item.appendChild(header);

        if (publication.authors && publication.authors.length > 0) {
            const authors = document.createElement('div');
            authors.className = 'featured-publication-authors';
            authors.textContent = publication.authors.join(', ');
            item.appendChild(authors);
        }

        if (publication.venue) {
            const venue = document.createElement('div');
            venue.className = 'featured-publication-venue';
            venue.innerHTML = `<em>${publication.venue}</em> (${publication.year || 'N/A'})`;
            item.appendChild(venue);
        }

        if (publication.relevance) {
            const relevance = document.createElement('div');
            relevance.className = 'featured-publication-relevance';
            relevance.textContent = publication.relevance;
            item.appendChild(relevance);
        }

        // Links
        if (publication.doi || publication.url) {
            const links = document.createElement('div');
            links.className = 'featured-publication-links';

            if (publication.doi) {
                const doiLink = document.createElement('a');
                doiLink.href = `https://doi.org/${publication.doi}`;
                doiLink.target = '_blank';
                doiLink.rel = 'noopener';
                doiLink.innerHTML = '<i class="fas fa-external-link-alt"></i> DOI';
                links.appendChild(doiLink);
            }

            if (publication.url) {
                const urlLink = document.createElement('a');
                urlLink.href = publication.url;
                urlLink.target = '_blank';
                urlLink.rel = 'noopener';
                urlLink.innerHTML = '<i class="fas fa-link"></i> View';
                links.appendChild(urlLink);
            }

            item.appendChild(links);
        }

        return item;
    }

    /**
     * Format metric value for display
     * @param {number|string} value - Metric value
     * @returns {string} Formatted value
     */
    formatMetricValue(value) {
        if (typeof value === 'number' && value >= 1000) {
            return (value / 1000).toFixed(1) + 'K';
        }
        return value.toString();
    }

    // Duplicate methods removed - using SharedUtils instead

    /**
     * Render empty state
     * @param {HTMLElement} container - Container element
     */
    renderEmptyState(container) {
        this.log('Rendering empty state for citation metrics');

        const emptyState = document.createElement('div');
        emptyState.className = 'empty-state';
        emptyState.innerHTML = `
            <p>No citation metrics available.</p>
        `;

        container.appendChild(emptyState);
    }

    /**
     * Set up event listeners for Citation Metrics page
     */
    setupEventListeners() {
        this.log('Setting up Citation Metrics page event listeners');

        // Add any citation metrics specific interactions here
        // For example: metric tooltips, chart interactions, etc.
    }

    /**
     * Debug logging
     * @param {string} message - Log message
     * @param {any} data - Optional data to log
     */
    log(message, data = null) {
        if (this.debugMode) {
            const prefix = '[CitationMetricsPage]';
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
const citationMetricsPage = new CitationMetricsPage();

// Route registration handled by app.js

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CitationMetricsPage;
}

// Make available globally for debugging
if (typeof window !== 'undefined') {
    window.citationMetricsPage = citationMetricsPage;
}