/**
 * Academic Affiliations Page Module
 * Handles display and management of academic affiliations and memberships
 */

class AcademicAffiliationsPage {
    constructor() {
        this.debugMode = true;
        this.data = null;
    }

    /**
     * Initialize the academic affiliations page
     */
    init() {
        this.log('Initializing Academic Affiliations page...');
        this.loadData();
        this.render();
        this.log('Academic Affiliations page initialized successfully');
    }

    /**
     * Load academic affiliations data
     */
    loadData() {
        this.log('Loading academic affiliations data...');
        if (window.dataManager && window.dataManager.isLoaded) {
            this.data = window.dataManager.getData('academicAffiliations') || [];
            this.log('Academic affiliations data loaded:', this.data);
        } else {
            this.log('WARNING: DataManager not available, using empty data');
            this.data = [];
        }
    }

    /**
     * Render the academic affiliations section
     */
    render() {
        this.log('Rendering academic affiliations section...');

        const container = document.querySelector('#academic-affiliations .section-content');
        if (!container) {
            this.log('ERROR: Academic affiliations container not found');
            return;
        }

        container.innerHTML = '';

        if (!this.data || this.data.length === 0) {
            container.innerHTML = '<p class="no-data">No academic affiliations available.</p>';
            return;
        }

        // Create affiliations grid
        const grid = document.createElement('div');
        grid.className = 'academic-affiliations-grid';

        this.data.forEach(affiliation => {
            const affiliationCard = this.createAffiliationCard(affiliation);
            grid.appendChild(affiliationCard);
        });

        container.appendChild(grid);
        this.log('Academic affiliations section rendered successfully');
    }

    /**
     * Create individual affiliation card
     */
    createAffiliationCard(affiliation) {
        const card = document.createElement('div');
        card.className = 'academic-affiliation-card';

        // Card header
        const header = document.createElement('div');
        header.className = 'academic-affiliation-header';

        // Name and acronym
        const nameSection = document.createElement('div');
        nameSection.className = 'academic-affiliation-name-section';

        const name = document.createElement('h3');
        name.className = 'academic-affiliation-name';
        name.textContent = affiliation.name || 'Organization';

        const nameEnglish = document.createElement('div');
        nameEnglish.className = 'academic-affiliation-name-english';
        nameEnglish.textContent = affiliation.nameEnglish || '';

        nameSection.appendChild(name);
        if (affiliation.nameEnglish && affiliation.nameEnglish !== affiliation.name) {
            nameSection.appendChild(nameEnglish);
        }

        const badges = document.createElement('div');
        badges.className = 'academic-affiliation-badges';

        if (affiliation.badges) {
            affiliation.badges.forEach(badge => {
                const badgeElement = window.SharedUtils ?
                    window.SharedUtils.createSimpleBadge(badge) :
                    this.createBadge(badge);
                badges.appendChild(badgeElement);
            });
        }

        header.appendChild(nameSection);
        header.appendChild(badges);

        // Card content
        const content = document.createElement('div');
        content.className = 'academic-affiliation-content';

        // Meta information
        const meta = document.createElement('div');
        meta.className = 'academic-affiliation-meta';

        if (affiliation.type) {
            const typeElement = document.createElement('div');
            typeElement.className = 'academic-affiliation-type';
            typeElement.innerHTML = `<strong>Type:</strong> ${affiliation.type}`;
            meta.appendChild(typeElement);
        }

        if (affiliation.role) {
            const roleElement = document.createElement('div');
            roleElement.className = 'academic-affiliation-role';
            roleElement.innerHTML = `<strong>Role:</strong> ${affiliation.role}`;
            meta.appendChild(roleElement);
        }

        if (affiliation.country) {
            const countryElement = document.createElement('div');
            countryElement.className = 'academic-affiliation-country';
            countryElement.innerHTML = `<strong>Country:</strong> ${affiliation.country}`;
            meta.appendChild(countryElement);
        }

        // Duration
        const duration = this.formatDuration(affiliation.startDate, affiliation.endDate);
        if (duration) {
            const durationElement = document.createElement('div');
            durationElement.className = 'academic-affiliation-duration';
            durationElement.innerHTML = `<strong>Member Since:</strong> ${duration}`;
            meta.appendChild(durationElement);
        }

        // Status
        if (affiliation.status) {
            const statusElement = document.createElement('div');
            statusElement.className = 'academic-affiliation-status';
            statusElement.innerHTML = `<strong>Status:</strong> ${affiliation.status}`;
            meta.appendChild(statusElement);
        }

        content.appendChild(meta);

        // Description
        if (affiliation.description) {
            const description = document.createElement('p');
            description.className = 'academic-affiliation-description';
            description.textContent = affiliation.description;
            content.appendChild(description);
        }

        // Focus areas
        if (affiliation.focus && affiliation.focus.length > 0) {
            const focusSection = document.createElement('div');
            focusSection.className = 'academic-affiliation-focus';

            const focusTitle = document.createElement('h4');
            focusTitle.className = 'academic-affiliation-focus-title';
            focusTitle.textContent = 'Focus Areas:';
            focusSection.appendChild(focusTitle);

            const focusList = document.createElement('div');
            focusList.className = 'academic-affiliation-focus-list';

            affiliation.focus.forEach(area => {
                const focusItem = document.createElement('span');
                focusItem.className = 'academic-affiliation-focus-item';
                focusItem.textContent = area;
                focusList.appendChild(focusItem);
            });

            focusSection.appendChild(focusList);
            content.appendChild(focusSection);
        }

        // Website link
        if (affiliation.website) {
            const linkElement = document.createElement('div');
            linkElement.className = 'academic-affiliation-link';

            const link = document.createElement('a');
            link.href = affiliation.website;
            link.target = '_blank';
            link.rel = 'noopener';
            link.innerHTML = '<i class="fas fa-external-link-alt"></i> Visit Website';

            linkElement.appendChild(link);
            content.appendChild(linkElement);
        }

        card.appendChild(header);
        card.appendChild(content);

        return card;
    }

    /**
     * Format duration from start and end dates
     */
    formatDuration(startDate, endDate) {
        if (!startDate) return null;

        const start = window.SharedUtils ?
            window.SharedUtils.formatDate(startDate) :
            this.formatDate(startDate);

        if (!endDate) {
            return `${start} - Present`;
        }

        const end = window.SharedUtils ?
            window.SharedUtils.formatDate(endDate) :
            this.formatDate(endDate);

        return `${start} - ${end}`;
    }

    /**
     * Format date for display (fallback)
     */
    formatDate(dateString) {
        try {
            const date = new Date(dateString);
            return date.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long'
            });
        } catch (error) {
            return dateString;
        }
    }

    /**
     * Create simple badge (fallback)
     */
    createBadge(badgeName) {
        const badge = document.createElement('span');
        badge.className = `badge ${badgeName}`;
        badge.textContent = badgeName;
        return badge;
    }

    /**
     * Cleanup method
     */
    cleanup() {
        this.log('Cleaning up Academic Affiliations page...');
        // Add any cleanup logic here if needed
    }

    /**
     * Debug logging
     */
    log(message, data = null) {
        if (this.debugMode) {
            const prefix = '[AcademicAffiliationsPage]';
            if (data) {
                console.log(prefix, message, data);
            } else {
                console.log(prefix, message);
            }
        }
    }

    /**
     * Enable/disable debug mode
     */
    setDebugMode(enabled) {
        this.debugMode = enabled;
        this.log(`Debug mode ${enabled ? 'enabled' : 'disabled'}`);
    }
}

// Create page instance
window.academicAffiliationsPage = new AcademicAffiliationsPage();

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = AcademicAffiliationsPage;
}