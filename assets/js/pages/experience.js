/**
 * Experience Page Module
 * Handles experience section logic and rendering
 * Uses timeline component for consistent display with education
 */

class ExperiencePage {
    constructor() {
        this.isInitialized = false;
        this.data = null;
        this.debugMode = true;
    }

    /**
     * Render the Experience page with provided data
     * @param {Object} data - Application data
     */
    render(data) {
        this.log('Rendering Experience page with data:', data);

        if (!data || !data.experience) {
            this.log('ERROR: No experience data provided');
            return;
        }

        this.data = data;

        // Get the experience container
        const experienceContainer = document.querySelector('#experience .section-content');
        if (experienceContainer) {
            // Clear existing content
            experienceContainer.innerHTML = '';

            // Create enhanced section header
            const sectionHeader = this.createSectionHeader();
            experienceContainer.appendChild(sectionHeader);

            // Render enhanced timeline
            this.renderEnhancedExperienceTimeline(data.experience, experienceContainer);
        } else {
            // Fallback to legacy rendering
            this.renderExperienceTimeline(data.experience);
        }

        this.log('Experience page rendered successfully');
    }

    /**
     * Initialize Experience page
     */
    init() {
        this.log('Initializing Experience page');

        if (!this.isInitialized) {
            this.setupEventListeners();
            this.isInitialized = true;
        }

        this.log('Experience page initialized');
    }

    /**
     * Cleanup when leaving Experience page
     */
    cleanup() {
        this.log('Cleaning up Experience page');
    }

    /**
     * Check if Experience page should be visible
     * @returns {boolean} Whether page should be visible
     */
    isVisible() {
        return true;
    }

    /**
     * Create enhanced section header
     */
    createSectionHeader() {
        const header = document.createElement('div');
        header.className = 'section-header-enhanced';

        const icon = document.createElement('div');
        icon.className = 'academic-icon academic-icon-secondary';
        icon.innerHTML = '<i class="fas fa-briefcase"></i>';

        header.appendChild(icon);

        return header;
    }

    /**
     * Render enhanced experience timeline
     */
    renderEnhancedExperienceTimeline(experienceData, container) {
        this.log('Rendering enhanced experience timeline');

        // Create overall stats
        const statsSection = this.createExperienceStats(experienceData);
        container.appendChild(statsSection);

        // Create timeline container
        const timelineContainer = document.createElement('div');
        timelineContainer.className = 'experience-timeline-enhanced';

        // Sort experience data by start date (most recent first)
        const sortedExperience = [...experienceData].sort((a, b) => {
            const dateA = new Date(a.startDate || '1900-01-01');
            const dateB = new Date(b.startDate || '1900-01-01');
            return dateB.getTime() - dateA.getTime();
        });

        sortedExperience.forEach(exp => {
            const experienceCard = this.createEnhancedExperienceCard(exp);
            timelineContainer.appendChild(experienceCard);
        });

        container.appendChild(timelineContainer);
    }

    /**
     * Create experience statistics
     */
    createExperienceStats(experienceData) {
        const statsContainer = document.createElement('div');
        statsContainer.className = 'stats-grid';

        // Calculate stats
        const totalPositions = experienceData.length;
        const companies = [...new Set(experienceData.map(exp => exp.company))].length;
        const currentPositions = experienceData.filter(exp => exp.current || !exp.endDate).length;

        const positionsStat = this.createStatItem(totalPositions, 'Positions');
        const companiesStat = this.createStatItem(companies, 'Organizations');
        const currentStat = this.createStatItem(currentPositions, 'Current');

        statsContainer.appendChild(positionsStat);
        statsContainer.appendChild(companiesStat);
        statsContainer.appendChild(currentStat);

        return statsContainer;
    }

    /**
     * Create stat item
     */
    createStatItem(number, label) {
        const statItem = document.createElement('div');
        statItem.className = 'stat-item';

        const statNumber = document.createElement('span');
        statNumber.className = 'stat-number';
        statNumber.textContent = number;

        const statLabel = document.createElement('span');
        statLabel.className = 'stat-label';
        statLabel.textContent = label;

        statItem.appendChild(statNumber);
        statItem.appendChild(statLabel);

        return statItem;
    }

    /**
     * Create enhanced experience card
     */
    createEnhancedExperienceCard(exp) {
        const card = document.createElement('div');
        card.className = 'academic-card animate-fade-in';

        // Card header
        const cardHeader = document.createElement('div');
        cardHeader.className = 'academic-card-header';

        const cardTitle = document.createElement('h3');
        cardTitle.className = 'academic-card-title';
        cardTitle.textContent = exp.position || exp.role || exp.title || 'Position';

        const cardMeta = document.createElement('div');
        cardMeta.className = 'academic-card-meta';

        // Add date range badge
        const formattedDateRange = window.SharedUtils ?
            window.SharedUtils.formatDateRange(exp.startDate, exp.endDate, exp.current) :
            this.formatDateRange(exp.startDate, exp.endDate, exp.current);

        if (formattedDateRange) {
            const dateBadge = document.createElement('span');
            dateBadge.className = 'badge-enhanced badge-info';
            dateBadge.innerHTML = `<i class="fas fa-calendar-alt"></i> ${formattedDateRange}`;
            cardMeta.appendChild(dateBadge);
        }

        // Add current position badge
        if (exp.current) {
            const currentBadge = document.createElement('span');
            currentBadge.className = 'badge-enhanced badge-success';
            currentBadge.innerHTML = `<i class="fas fa-check-circle"></i> Current`;
            cardMeta.appendChild(currentBadge);
        }

        // Add other badges
        if (exp.badges) {
            exp.badges.forEach(badge => {
                const badgeElement = this.createEnhancedBadge(badge);
                cardMeta.appendChild(badgeElement);
            });
        }

        cardHeader.appendChild(cardTitle);
        cardHeader.appendChild(cardMeta);

        // Card body
        const cardBody = document.createElement('div');
        cardBody.className = 'academic-card-body';

        // Company
        if (exp.company) {
            const company = document.createElement('div');
            company.className = 'list-item-subtitle';
            company.innerHTML = `<i class="fas fa-building"></i> ${exp.company}`;
            cardBody.appendChild(company);
        }

        // Location
        if (exp.location) {
            const location = document.createElement('div');
            location.className = 'list-item-description';
            location.innerHTML = `<i class="fas fa-map-marker-alt"></i> ${exp.location}`;
            cardBody.appendChild(location);
        }

        // Description
        if (exp.description) {
            const description = document.createElement('div');
            description.className = 'list-item-description';
            description.textContent = exp.description;
            cardBody.appendChild(description);
        }

        // Responsibilities
        if (exp.responsibilities && exp.responsibilities.length > 0) {
            const respTitle = document.createElement('h4');
            respTitle.className = 'list-item-title';
            respTitle.innerHTML = '<i class="fas fa-tasks"></i> Responsibilities';

            const respList = document.createElement('ul');
            respList.className = 'experience-details-list';
            exp.responsibilities.forEach(resp => {
                const respItem = document.createElement('li');
                respItem.textContent = resp;
                respList.appendChild(respItem);
            });

            cardBody.appendChild(respTitle);
            cardBody.appendChild(respList);
        }

        // Achievements
        if (exp.achievements && exp.achievements.length > 0) {
            const achTitle = document.createElement('h4');
            achTitle.className = 'list-item-title';
            achTitle.innerHTML = '<i class="fas fa-trophy"></i> Achievements';

            const achList = document.createElement('ul');
            achList.className = 'experience-details-list';
            exp.achievements.forEach(ach => {
                const achItem = document.createElement('li');
                achItem.textContent = ach;
                achList.appendChild(achItem);
            });

            cardBody.appendChild(achTitle);
            cardBody.appendChild(achList);
        }

        card.appendChild(cardHeader);
        card.appendChild(cardBody);

        return card;
    }

    /**
     * Format date range
     */
    formatDateRange(startDate, endDate, current) {
        if (!startDate && !endDate) return null;

        const formatDate = (dateStr) => {
            if (!dateStr) return '';
            const date = new Date(dateStr);
            return date.getFullYear().toString();
        };

        const start = formatDate(startDate);
        const end = current || !endDate ? 'Present' : formatDate(endDate);

        if (start && end) {
            return start === end ? start : `${start} - ${end}`;
        }
        return start || end;
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
            'leadership': 'badge-primary',
            'remote': 'badge-secondary'
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
            'leadership': 'fas fa-crown',
            'remote': 'fas fa-home'
        };
        return badgeIcons[badgeName] || 'fas fa-tag';
    }

    /**
     * Render experience timeline
     * @param {Array} experience - Experience data array
     */
    renderExperienceTimeline(experience) {
        this.log('Rendering experience timeline with', experience.length, 'items');

        const timeline = document.querySelector('#experience .timeline');
        if (!timeline) {
            this.log('ERROR: Experience timeline container not found');
            return;
        }

        timeline.innerHTML = '';

        if (!experience || experience.length === 0) {
            this.renderEmptyState(timeline);
            return;
        }

        // Sort experience items by start date (most recent first)
        const sortedExperience = [...experience].sort((a, b) => {
            const dateA = new Date(a.startDate || '1900-01-01');
            const dateB = new Date(b.startDate || '1900-01-01');
            return dateB.getTime() - dateA.getTime();
        });

        sortedExperience.forEach(exp => {
            const timelineItem = this.createExperienceItem(exp);
            timeline.appendChild(timelineItem);
        });

        this.log('Experience timeline rendered with', sortedExperience.length, 'items');
    }

    /**
     * Create an experience timeline item
     * @param {Object} exp - Experience item data
     * @returns {HTMLElement} Timeline item element
     */
    createExperienceItem(exp) {
        this.log('Creating experience item:', exp);

        // Use timeline component with experience-specific options
        const timelineItem = window.timelineComponent?.createTimelineItem(exp, {
            showSupervisor: false,
            showGrade: false,
            showThesis: false
        });

        if (!timelineItem) {
            this.log('WARNING: Timeline component not available, creating fallback');
            return this.createFallbackExperienceItem(exp);
        }

        return timelineItem;
    }

    /**
     * Create fallback experience item if timeline component is not available
     * @param {Object} exp - Experience item data
     * @returns {HTMLElement} Timeline item element
     */
    createFallbackExperienceItem(exp) {
        this.log('Creating fallback experience item:', exp);

        const item = document.createElement('div');
        item.className = 'timeline-item';

        // Header
        const header = document.createElement('div');
        header.className = 'timeline-header';

        const title = document.createElement('h3');
        title.className = 'timeline-title';
        title.textContent = exp.position || exp.role || exp.title || 'Position';
        header.appendChild(title);

        if (exp.company) {
            const company = document.createElement('div');
            company.className = 'timeline-institution';
            company.textContent = exp.company;
            header.appendChild(company);
        }

        item.appendChild(header);

        // Meta information
        const meta = document.createElement('div');
        meta.className = 'timeline-meta';

        // Date range
        const formattedDateRange = window.SharedUtils.formatDateRange(
            exp.startDate,
            exp.endDate,
            exp.current
        );

        const dateRange = document.createElement('div');
        dateRange.className = 'timeline-date';
        dateRange.innerHTML = `<i class="fas fa-calendar-alt"></i> ${formattedDateRange}`;
        meta.appendChild(dateRange);

        // Location
        if (exp.location) {
            const location = document.createElement('div');
            location.className = 'timeline-location';
            location.innerHTML = `<i class="fas fa-map-marker-alt"></i> ${exp.location}`;
            meta.appendChild(location);
        }

        item.appendChild(meta);

        // Description
        if (exp.description) {
            const description = document.createElement('div');
            description.className = 'timeline-description';
            description.textContent = exp.description;
            item.appendChild(description);
        }

        // Additional details (responsibilities, achievements, etc.)
        const details = this.createExperienceDetails(exp);
        if (details.children.length > 0) {
            item.appendChild(details);
        }

        // Badges
        if (exp.badges && exp.badges.length > 0) {
            const badgesContainer = document.createElement('div');
            badgesContainer.className = 'badges-container';

            exp.badges.forEach(badgeName => {
                const badge = window.badgeComponent?.createBadge(badgeName) || window.SharedUtils.createSimpleBadge(badgeName);
                badgesContainer.appendChild(badge);
            });

            item.appendChild(badgesContainer);
        }

        return item;
    }

    /**
     * Create experience details section
     * @param {Object} exp - Experience item data
     * @returns {HTMLElement} Details element
     */
    createExperienceDetails(exp) {
        const details = document.createElement('div');
        details.className = 'timeline-details';

        if (exp.responsibilities && exp.responsibilities.length > 0) {
            const respSection = document.createElement('div');
            respSection.className = 'timeline-responsibilities';
            respSection.innerHTML = `
                <h4 data-i18n="common.responsibilities">Responsibilities</h4>
                <ul>${exp.responsibilities.map(resp => `<li>${resp}</li>`).join('')}</ul>
            `;
            details.appendChild(respSection);
        }

        if (exp.achievements && exp.achievements.length > 0) {
            const achSection = document.createElement('div');
            achSection.className = 'timeline-achievements';
            achSection.innerHTML = `
                <h4 data-i18n="common.achievements">Achievements</h4>
                <ul>${exp.achievements.map(ach => `<li>${ach}</li>`).join('')}</ul>
            `;
            details.appendChild(achSection);
        }

        if (exp.projects && exp.projects.length > 0) {
            const projSection = document.createElement('div');
            projSection.className = 'timeline-projects';
            projSection.innerHTML = `
                <h4 data-i18n="common.projects">Projects</h4>
                <ul>${exp.projects.map(proj => `<li>${proj}</li>`).join('')}</ul>
            `;
            details.appendChild(projSection);
        }

        if (exp.tools && exp.tools.length > 0) {
            const toolsSection = document.createElement('div');
            toolsSection.className = 'timeline-tools';
            toolsSection.innerHTML = `
                <h4 data-i18n="common.tools">Tools</h4>
                <ul>${exp.tools.map(tool => `<li>${tool}</li>`).join('')}</ul>
            `;
            details.appendChild(toolsSection);
        }

        return details;
    }

    // Duplicate methods removed - using SharedUtils instead

    /**
     * Render empty state
     * @param {HTMLElement} container - Container element
     */
    renderEmptyState(container) {
        this.log('Rendering empty state for experience');

        const emptyState = document.createElement('div');
        emptyState.className = 'empty-state';
        emptyState.innerHTML = `
            <p>No experience information available.</p>
        `;

        container.appendChild(emptyState);
    }


    /**
     * Set up event listeners for Experience page
     */
    setupEventListeners() {
        this.log('Setting up Experience page event listeners');
    }

    /**
     * Debug logging
     * @param {string} message - Log message
     * @param {any} data - Optional data to log
     */
    log(message, data = null) {
        if (this.debugMode) {
            const prefix = '[ExperiencePage]';
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
const experiencePage = new ExperiencePage();

// Route registration handled by app.js

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ExperiencePage;
}

// Make available globally for debugging
if (typeof window !== 'undefined') {
    window.experiencePage = experiencePage;
}