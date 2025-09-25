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
        this.renderExperienceTimeline(data.experience);

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
        const startDate = this.formatDate(exp.startDate);
        const endDate = exp.current ?
            (window.i18n?.t('common.present') || 'Present') :
            this.formatDate(exp.endDate);

        const dateRange = document.createElement('div');
        dateRange.className = 'timeline-date';
        dateRange.innerHTML = `<i class="fas fa-calendar-alt"></i> ${startDate} - ${endDate}`;
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
                const badge = window.badgeComponent?.createBadge(badgeName) || this.createSimpleBadge(badgeName);
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
        this.log('Rendering empty state for experience');

        const emptyState = document.createElement('div');
        emptyState.className = 'empty-state';
        emptyState.innerHTML = `
            <p>No experience information available.</p>
        `;

        container.appendChild(emptyState);
    }

    /**
     * Format date string for display
     * @param {string} dateStr - Date string
     * @returns {string} Formatted date
     */
    formatDate(dateStr) {
        if (!dateStr) return '';

        // If it's already a year, return as is
        if (/^\d{4}$/.test(dateStr)) return dateStr;

        // Handle "Present" case
        if (dateStr.toLowerCase() === 'present') {
            return window.i18n?.t('common.present') || 'Present';
        }

        // Try to parse and format the date
        try {
            const date = new Date(dateStr);
            return date.getFullYear().toString();
        } catch (error) {
            return dateStr;
        }
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