/**
 * Professional Service Page Module
 * Handles display and management of professional service activities
 */

class ProfessionalServicePage {
    constructor() {
        this.debugMode = true;
        this.data = null;
    }

    /**
     * Initialize the professional service page
     */
    init() {
        this.log('Initializing Professional Service page...');
        this.loadData();
        this.render();
        this.log('Professional Service page initialized successfully');
    }

    /**
     * Load professional service data
     */
    loadData() {
        this.log('Loading professional service data...');
        this.log('window.dataManager exists:', !!window.dataManager);
        this.log('dataManager.isLoaded:', window.dataManager?.isLoaded);

        if (window.dataManager && window.dataManager.isLoaded) {
            this.data = window.dataManager.getData('professionalService') || [];
            this.log('Professional service data loaded:', this.data);
            this.log('Data length:', this.data.length);
        } else {
            this.log('WARNING: DataManager not available or not loaded');
            this.log('DataManager state:', {
                exists: !!window.dataManager,
                isLoaded: window.dataManager?.isLoaded,
                dataKeys: window.dataManager ? Object.keys(window.dataManager.data || {}) : 'N/A'
            });
            this.data = [];
        }
    }

    /**
     * Render the professional service section
     */
    render() {
        this.log('Rendering professional service section...');
        this.log('Data to render:', this.data);
        this.log('Data is array:', Array.isArray(this.data));
        this.log('Data length:', this.data?.length);

        const container = document.querySelector('#professional-service .section-content');
        if (!container) {
            this.log('ERROR: Professional service container not found');
            return;
        }

        container.innerHTML = '';

        if (!this.data || this.data.length === 0) {
            this.log('No data available, showing empty state');
            container.innerHTML = '<p class="no-data">No professional service activities available.</p>';
            return;
        }

        // Group activities by type and year
        const groupedData = this.groupActivitiesByTypeAndYear(this.data);

        // Enhance existing section header
        this.enhanceExistingSectionHeader();

        // Create timeline container with modern styling
        const timeline = document.createElement('div');
        timeline.className = 'service-timeline';

        Object.keys(groupedData).forEach(type => {
            const typeSection = this.createEnhancedTypeSection(type, groupedData[type]);
            timeline.appendChild(typeSection);
        });

        container.appendChild(timeline);
        this.log('Professional service section rendered successfully');
    }

    /**
     * Group activities by type and year
     */
    groupActivitiesByTypeAndYear(data) {
        const grouped = {};

        data.forEach(activity => {
            const type = activity.type || 'other';
            if (!grouped[type]) {
                grouped[type] = {};
            }

            const year = activity.year || 'unknown';
            if (!grouped[type][year]) {
                grouped[type][year] = [];
            }

            grouped[type][year].push(activity);
        });

        // Sort years within each type (newest first)
        Object.keys(grouped).forEach(type => {
            const sortedYears = {};
            Object.keys(grouped[type])
                .sort((a, b) => parseInt(b) - parseInt(a))
                .forEach(year => {
                    sortedYears[year] = grouped[type][year];
                });
            grouped[type] = sortedYears;
        });

        return grouped;
    }

    /**
     * Enhance existing section header by adding icon
     */
    enhanceExistingSectionHeader() {
        const sectionHeader = document.querySelector('#professional-service .section-header h2');
        if (sectionHeader && !sectionHeader.querySelector('i')) {
            sectionHeader.innerHTML = '<i class="fas fa-hands-helping"></i> ' + sectionHeader.textContent;
        }
    }

    /**
     * Create enhanced type section with modern UI
     */
    createEnhancedTypeSection(type, yearData) {
        const section = document.createElement('div');
        section.className = 'type-section';

        // Enhanced type header
        const header = document.createElement('div');
        header.className = 'type-section-header';

        const icon = document.createElement('i');
        icon.className = this.getTypeIcon(type);

        const title = document.createElement('h3');
        title.textContent = this.getTypeTitle(type);

        // Stats section removed as requested

        header.appendChild(icon);
        header.appendChild(title);

        section.appendChild(header);

        // Activities by year
        Object.keys(yearData).forEach(year => {
            const yearSection = this.createEnhancedYearSection(year, yearData[year]);
            section.appendChild(yearSection);
        });

        return section;
    }


    /**
     * Create enhanced year section
     */
    createEnhancedYearSection(year, activities) {
        const yearSection = document.createElement('div');
        yearSection.className = 'year-section';

        // Enhanced year header
        const yearHeader = document.createElement('div');
        yearHeader.className = 'year-header';
        yearHeader.textContent = year;
        yearSection.appendChild(yearHeader);

        // Activities grid
        const activitiesGrid = document.createElement('div');
        activitiesGrid.className = 'activity-grid';

        activities.forEach(activity => {
            const activityCard = this.createEnhancedActivityCard(activity);
            activitiesGrid.appendChild(activityCard);
        });

        yearSection.appendChild(activitiesGrid);
        return yearSection;
    }

    /**
     * Create enhanced activity card
     */
    createEnhancedActivityCard(activity) {
        const card = document.createElement('div');
        card.className = 'academic-card animate-fade-in';

        // Card header
        const cardHeader = document.createElement('div');
        cardHeader.className = 'academic-card-header';

        const cardTitle = document.createElement('h4');
        cardTitle.className = 'academic-card-title';
        cardTitle.textContent = activity.role || 'Role not specified';

        const badgesContainer = document.createElement('div');
        badgesContainer.className = 'academic-card-meta';

        if (activity.badges) {
            activity.badges.forEach(badge => {
                const badgeElement = this.createEnhancedBadge(badge);
                badgesContainer.appendChild(badgeElement);
            });
        }

        cardHeader.appendChild(cardTitle);
        cardHeader.appendChild(badgesContainer);

        // Card body
        const cardBody = document.createElement('div');
        cardBody.className = 'academic-card-body';

        const event = document.createElement('div');
        event.className = 'list-item-subtitle';
        event.innerHTML = `<i class="fas fa-calendar-alt"></i> ${activity.event || 'Event not specified'}`;

        const organization = document.createElement('div');
        organization.className = 'list-item-description';
        if (activity.organization) {
            organization.innerHTML = `<i class="fas fa-building"></i> ${activity.organization}`;
        }

        cardBody.appendChild(event);
        if (activity.organization) {
            cardBody.appendChild(organization);
        }

        card.appendChild(cardHeader);
        card.appendChild(cardBody);

        return card;
    }

    /**
     * Create enhanced badge
     */
    createEnhancedBadge(badgeName) {
        const badge = document.createElement('span');
        badge.className = `badge-enhanced ${this.getBadgeClass(badgeName)}`;

        const icon = document.createElement('i');
        icon.className = this.getBadgeIcon(badgeName);

        badge.appendChild(icon);
        badge.appendChild(document.createTextNode(badgeName));

        return badge;
    }

    /**
     * Get badge class for styling
     */
    getBadgeClass(badgeName) {
        const badgeClasses = {
            'featured': 'badge-warning',
            'recent': 'badge-success',
            'highlight': 'badge-info',
            'published': 'badge-primary',
            'ongoing': 'badge-secondary'
        };
        return badgeClasses[badgeName] || 'badge-light';
    }

    /**
     * Get badge icon
     */
    getBadgeIcon(badgeName) {
        const badgeIcons = {
            'featured': 'fas fa-star',
            'recent': 'fas fa-clock',
            'highlight': 'fas fa-bookmark',
            'published': 'fas fa-check-circle',
            'ongoing': 'fas fa-play'
        };
        return badgeIcons[badgeName] || 'fas fa-tag';
    }

    /**
     * Create type section (legacy method - keeping for compatibility)
     */
    createTypeSection(type, yearData) {
        const section = document.createElement('div');
        section.className = 'service-type-section';

        // Type header
        const header = document.createElement('div');
        header.className = 'service-type-header';

        const title = document.createElement('h3');
        title.className = 'service-type-title';
        title.textContent = this.getTypeTitle(type);

        const icon = document.createElement('i');
        icon.className = this.getTypeIcon(type);

        header.appendChild(icon);
        header.appendChild(title);
        section.appendChild(header);

        // Activities by year
        Object.keys(yearData).forEach(year => {
            const yearSection = this.createYearSection(year, yearData[year]);
            section.appendChild(yearSection);
        });

        return section;
    }

    /**
     * Create year section
     */
    createYearSection(year, activities) {
        const yearSection = document.createElement('div');
        yearSection.className = 'service-year-section';

        // Year header
        const yearHeader = document.createElement('div');
        yearHeader.className = 'service-year-header';
        yearHeader.textContent = year;
        yearSection.appendChild(yearHeader);

        // Activities list
        const activitiesList = document.createElement('div');
        activitiesList.className = 'service-activities-list';

        activities.forEach(activity => {
            const activityElement = this.createActivityElement(activity);
            activitiesList.appendChild(activityElement);
        });

        yearSection.appendChild(activitiesList);
        return yearSection;
    }

    /**
     * Create individual activity element
     */
    createActivityElement(activity) {
        const element = document.createElement('div');
        element.className = 'service-activity-item';

        // Activity header
        const header = document.createElement('div');
        header.className = 'service-activity-header';

        const role = document.createElement('h4');
        role.className = 'service-activity-role';
        role.textContent = activity.role || 'Role not specified';

        const badges = document.createElement('div');
        badges.className = 'service-activity-badges';

        if (activity.badges) {
            activity.badges.forEach(badge => {
                const badgeElement = window.SharedUtils ?
                    window.SharedUtils.createSimpleBadge(badge) :
                    this.createBadge(badge);
                badges.appendChild(badgeElement);
            });
        }

        header.appendChild(role);
        header.appendChild(badges);

        // Activity details
        const details = document.createElement('div');
        details.className = 'service-activity-details';

        const event = document.createElement('div');
        event.className = 'service-activity-event';
        event.textContent = activity.event || 'Event not specified';

        const organization = document.createElement('div');
        organization.className = 'service-activity-organization';
        organization.textContent = activity.organization || '';

        details.appendChild(event);
        if (activity.organization) {
            details.appendChild(organization);
        }

        element.appendChild(header);
        element.appendChild(details);

        return element;
    }

    /**
     * Get type title for display
     */
    getTypeTitle(type) {
        const titles = {
            'conference': 'Conferences',
            'workshop': 'Workshops',
            'journal': 'Journals',
            'other': 'Other Activities'
        };

        return titles[type] || type.charAt(0).toUpperCase() + type.slice(1);
    }

    /**
     * Get type icon
     */
    getTypeIcon(type) {
        const icons = {
            'conference': 'fas fa-users',
            'workshop': 'fas fa-tools',
            'journal': 'fas fa-journal-whills',
            'other': 'fas fa-star'
        };

        return icons[type] || 'fas fa-circle';
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
        this.log('Cleaning up Professional Service page...');
        // Add any cleanup logic here if needed
    }

    /**
     * Debug logging
     */
    log(message, data = null) {
        if (this.debugMode) {
            const prefix = '[ProfessionalServicePage]';
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
window.professionalServicePage = new ProfessionalServicePage();

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ProfessionalServicePage;
}