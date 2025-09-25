/**
 * Timeline Component
 * Reusable timeline element for education and experience sections
 * Handles badges, dates, and content formatting consistently
 */

class TimelineComponent {
    constructor() {
        this.debugMode = true;
    }

    /**
     * Create a timeline item element
     * @param {Object} item - Timeline item data
     * @param {Object} options - Configuration options
     * @returns {HTMLElement} Timeline item element
     */
    createTimelineItem(item, options = {}) {
        this.log('Creating timeline item:', item);

        const timelineItem = document.createElement('div');
        timelineItem.className = 'timeline-item';

        // Header section
        const header = this.createHeader(item, options);
        timelineItem.appendChild(header);

        // Meta information
        const meta = this.createMeta(item, options);
        timelineItem.appendChild(meta);

        // Description
        if (item.description) {
            const description = this.createDescription(item.description);
            timelineItem.appendChild(description);
        }

        // Additional details (responsibilities, achievements, etc.)
        if (item.responsibilities || item.achievements || item.projects) {
            const details = this.createDetails(item);
            timelineItem.appendChild(details);
        }

        this.log('Timeline item created successfully');
        return timelineItem;
    }

    /**
     * Create timeline header with title, institution, and badges
     * @param {Object} item - Timeline item data
     * @param {Object} options - Configuration options
     * @returns {HTMLElement} Header element
     */
    createHeader(item, options) {
        const header = document.createElement('div');
        header.className = 'timeline-header';

        // Title
        const title = document.createElement('h3');
        title.className = 'timeline-title';
        title.textContent = item.title || item.degree || item.position || 'Untitled';
        header.appendChild(title);

        // Institution/Company
        if (item.institution || item.company) {
            const institution = document.createElement('div');
            institution.className = 'timeline-institution';
            institution.textContent = item.institution || item.company;
            header.appendChild(institution);
        }

        // Badges
        if (item.badges && item.badges.length > 0) {
            const badgesContainer = this.createBadgesContainer(item.badges);
            header.appendChild(badgesContainer);
        }

        return header;
    }

    /**
     * Create meta information (dates, location, supervisor, etc.)
     * @param {Object} item - Timeline item data
     * @param {Object} options - Configuration options
     * @returns {HTMLElement} Meta element
     */
    createMeta(item, options) {
        const meta = document.createElement('div');
        meta.className = 'timeline-meta';

        // Date range
        const dateRange = this.createDateRange(item);
        meta.appendChild(dateRange);

        // Location
        if (item.location) {
            const location = document.createElement('div');
            location.className = 'timeline-location';
            location.innerHTML = `<i class="fas fa-map-marker-alt"></i> ${item.location}`;
            meta.appendChild(location);
        }

        // Additional meta fields based on context
        if (options.showSupervisor && item.supervisor) {
            const supervisor = document.createElement('div');
            supervisor.className = 'timeline-supervisor';
            supervisor.innerHTML = `
                <span data-i18n="common.supervisor">Supervisor</span>: ${item.supervisor}
            `;
            meta.appendChild(supervisor);
        }

        if (options.showGrade && item.grade) {
            const grade = document.createElement('div');
            grade.className = 'timeline-grade';
            grade.innerHTML = `
                <span data-i18n="common.grade">Grade</span>: ${item.grade}
            `;
            meta.appendChild(grade);
        }

        if (options.showThesis && item.thesis) {
            const thesis = document.createElement('div');
            thesis.className = 'timeline-thesis';
            thesis.innerHTML = `
                <strong data-i18n="common.thesis">Thesis</strong>: ${item.thesis}
            `;
            meta.appendChild(thesis);
        }

        return meta;
    }

    /**
     * Create date range display
     * @param {Object} item - Timeline item data
     * @returns {HTMLElement} Date range element
     */
    createDateRange(item) {
        const dateRange = document.createElement('div');
        dateRange.className = 'timeline-date';

        const formattedDateRange = window.SharedUtils.formatDateRange(
            item.startDate,
            item.endDate,
            item.current || item.endDate === 'Present'
        );

        dateRange.innerHTML = `
            <i class="fas fa-calendar-alt"></i>
            ${formattedDateRange}
        `;

        return dateRange;
    }

    /**
     * Create description element
     * @param {string} description - Description text
     * @returns {HTMLElement} Description element
     */
    createDescription(description) {
        const desc = document.createElement('div');
        desc.className = 'timeline-description';
        desc.textContent = description;
        return desc;
    }

    /**
     * Create additional details section
     * @param {Object} item - Timeline item data
     * @returns {HTMLElement} Details element
     */
    createDetails(item) {
        const details = document.createElement('div');
        details.className = 'timeline-details';

        if (item.responsibilities && item.responsibilities.length > 0) {
            const respSection = document.createElement('div');
            respSection.className = 'timeline-responsibilities';
            respSection.innerHTML = `
                <h4 data-i18n="common.responsibilities">Responsibilities</h4>
                <ul>${item.responsibilities.map(resp => `<li>${resp}</li>`).join('')}</ul>
            `;
            details.appendChild(respSection);
        }

        if (item.achievements && item.achievements.length > 0) {
            const achSection = document.createElement('div');
            achSection.className = 'timeline-achievements';
            achSection.innerHTML = `
                <h4 data-i18n="common.achievements">Achievements</h4>
                <ul>${item.achievements.map(ach => `<li>${ach}</li>`).join('')}</ul>
            `;
            details.appendChild(achSection);
        }

        if (item.projects && item.projects.length > 0) {
            const projSection = document.createElement('div');
            projSection.className = 'timeline-projects';
            projSection.innerHTML = `
                <h4 data-i18n="common.projects">Projects</h4>
                <ul>${item.projects.map(proj => `<li>${proj}</li>`).join('')}</ul>
            `;
            details.appendChild(projSection);
        }

        return details;
    }

    /**
     * Create badges container
     * @param {Array} badges - Array of badge names
     * @returns {HTMLElement} Badges container element
     */
    createBadgesContainer(badges) {
        const container = document.createElement('div');
        container.className = 'badges-container';

        badges.forEach(badgeName => {
            const badge = window.badgeComponent?.createBadge(badgeName) || window.SharedUtils.createSimpleBadge(badgeName);
            container.appendChild(badge);
        });

        return container;
    }

    // Duplicate methods removed - using SharedUtils instead

    /**
     * Debug logging using SharedUtils
     * @param {string} message - Log message
     * @param {any} data - Optional data to log
     */
    log(message, data = null) {
        window.SharedUtils.log('TimelineComponent', message, data, this.debugMode);
    }

    /**
     * Enable/disable debug mode
     * @param {boolean} enabled - Whether to enable debug mode
     */
    setDebugMode(enabled) {
        this.debugMode = enabled;
    }
}

// Create global instance
window.timelineComponent = new TimelineComponent();

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = TimelineComponent;
}