/**
 * Research Groups Page Module
 * Handles display and management of research group memberships
 */

class ResearchGroupsPage {
    constructor() {
        this.debugMode = true;
        this.data = null;
    }

    /**
     * Initialize the research groups page
     */
    init() {
        this.log('Initializing Research Groups page...');
        this.loadData();
        this.render();
        this.log('Research Groups page initialized successfully');
    }

    /**
     * Load research groups data
     */
    loadData() {
        this.log('Loading research groups data...');
        if (window.dataManager && window.dataManager.isLoaded) {
            this.data = window.dataManager.getData('researchGroups') || [];
            this.log('Research groups data loaded:', this.data);
        } else {
            this.log('WARNING: DataManager not available, using empty data');
            this.data = [];
        }
    }

    /**
     * Render the research groups section
     */
    render() {
        this.log('Rendering research groups section...');

        const container = document.querySelector('#research-groups .section-content');
        if (!container) {
            this.log('ERROR: Research groups container not found');
            return;
        }

        container.innerHTML = '';

        if (!this.data || this.data.length === 0) {
            container.innerHTML = '<p class="no-data">No research group memberships available.</p>';
            return;
        }

        // Create groups grid
        const grid = document.createElement('div');
        grid.className = 'research-groups-grid';

        this.data.forEach(group => {
            const groupCard = this.createGroupCard(group);
            grid.appendChild(groupCard);
        });

        container.appendChild(grid);
        this.log('Research groups section rendered successfully');
    }

    /**
     * Create individual group card
     */
    createGroupCard(group) {
        const card = document.createElement('div');
        card.className = 'research-group-card';

        // Card header
        const header = document.createElement('div');
        header.className = 'research-group-header';

        const name = document.createElement('h3');
        name.className = 'research-group-name';
        name.textContent = group.name || 'Research Group';

        const badges = document.createElement('div');
        badges.className = 'research-group-badges';

        if (group.badges) {
            group.badges.forEach(badge => {
                const badgeElement = window.SharedUtils ?
                    window.SharedUtils.createSimpleBadge(badge) :
                    this.createBadge(badge);
                badges.appendChild(badgeElement);
            });
        }

        header.appendChild(name);
        header.appendChild(badges);

        // Card content
        const content = document.createElement('div');
        content.className = 'research-group-content';

        // Institution and role
        const meta = document.createElement('div');
        meta.className = 'research-group-meta';

        if (group.institution) {
            const institutionElement = document.createElement('div');
            institutionElement.className = 'research-group-institution';
            institutionElement.innerHTML = `<strong>${group.institution}</strong>`;
            if (group.department) {
                institutionElement.innerHTML += ` - ${group.department}`;
            }
            meta.appendChild(institutionElement);
        }

        if (group.role) {
            const roleElement = document.createElement('div');
            roleElement.className = 'research-group-role';
            roleElement.innerHTML = `<strong>Role:</strong> ${group.role}`;
            meta.appendChild(roleElement);
        }

        // Duration
        const duration = this.formatDuration(group.startDate, group.endDate);
        if (duration) {
            const durationElement = document.createElement('div');
            durationElement.className = 'research-group-duration';
            durationElement.innerHTML = `<strong>Duration:</strong> ${duration}`;
            meta.appendChild(durationElement);
        }

        // Status
        if (group.status) {
            const statusElement = document.createElement('div');
            statusElement.className = 'research-group-status';
            statusElement.innerHTML = `<strong>Status:</strong> ${group.status}`;
            meta.appendChild(statusElement);
        }

        content.appendChild(meta);

        // Description
        if (group.description) {
            const description = document.createElement('p');
            description.className = 'research-group-description';
            description.textContent = group.description;
            content.appendChild(description);
        }

        // Focus areas
        if (group.focus && group.focus.length > 0) {
            const focusSection = document.createElement('div');
            focusSection.className = 'research-group-focus';

            const focusTitle = document.createElement('h4');
            focusTitle.className = 'research-group-focus-title';
            focusTitle.textContent = 'Research Focus:';
            focusSection.appendChild(focusTitle);

            const focusList = document.createElement('div');
            focusList.className = 'research-group-focus-list';

            group.focus.forEach(area => {
                const focusItem = document.createElement('span');
                focusItem.className = 'research-group-focus-item';
                focusItem.textContent = area;
                focusList.appendChild(focusItem);
            });

            focusSection.appendChild(focusList);
            content.appendChild(focusSection);
        }

        // Website link
        if (group.website) {
            const linkElement = document.createElement('div');
            linkElement.className = 'research-group-link';

            const link = document.createElement('a');
            link.href = group.website;
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
        this.log('Cleaning up Research Groups page...');
        // Add any cleanup logic here if needed
    }

    /**
     * Debug logging
     */
    log(message, data = null) {
        if (this.debugMode) {
            const prefix = '[ResearchGroupsPage]';
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
window.researchGroupsPage = new ResearchGroupsPage();

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ResearchGroupsPage;
}