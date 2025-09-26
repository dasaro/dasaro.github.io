/**
 * Education Page Module
 * Handles education section logic and rendering
 * Uses timeline component for consistent display
 */

class EducationPage {
    constructor() {
        this.isInitialized = false;
        this.data = null;
        this.debugMode = true;
    }

    /**
     * Render the Education page with provided data
     * @param {Object} data - Application data
     */
    render(data) {
        this.log('Rendering Education page with data:', data);

        if (!data || !data.education) {
            this.log('ERROR: No education data provided');
            return;
        }

        this.data = data;

        // Get the education container
        const educationContainer = document.querySelector('#education .section-content');
        if (educationContainer) {
            // Clear existing content
            educationContainer.innerHTML = '';

            // Enhance existing section header
            this.enhanceExistingSectionHeader();

            // Render enhanced timeline
            this.renderEnhancedEducationTimeline(data.education, educationContainer);
        } else {
            // Fallback to legacy rendering
            this.renderEducationTimeline(data.education);
        }

        this.log('Education page rendered successfully');
    }

    /**
     * Initialize Education page
     */
    init() {
        this.log('Initializing Education page');

        if (!this.isInitialized) {
            this.setupEventListeners();
            this.isInitialized = true;
        }

        this.log('Education page initialized');
    }

    /**
     * Cleanup when leaving Education page
     */
    cleanup() {
        this.log('Cleaning up Education page');
        // Remove any page-specific event listeners or cleanup
    }

    /**
     * Check if Education page should be visible
     * @returns {boolean} Whether page should be visible
     */
    isVisible() {
        return true; // Education page is always visible
    }

    /**
     * Enhance existing section header by adding icon
     */
    enhanceExistingSectionHeader() {
        const sectionHeader = document.querySelector('#education .section-header h2');
        if (sectionHeader && !sectionHeader.querySelector('i')) {
            sectionHeader.innerHTML = '<i class="fas fa-graduation-cap"></i> ' + sectionHeader.textContent;
        }
    }

    /**
     * Render enhanced education timeline
     */
    renderEnhancedEducationTimeline(educationData, container) {
        this.log('Rendering enhanced education timeline');

        // Create overall stats
        const statsSection = this.createEducationStats(educationData);
        container.appendChild(statsSection);

        // Create timeline container
        const timelineContainer = document.createElement('div');
        timelineContainer.className = 'education-timeline-enhanced';

        // Sort education data by year (most recent first)
        const sortedEducation = [...educationData].sort((a, b) => {
            const yearA = parseInt(a.endDate?.split('-')[0] || a.year || 0);
            const yearB = parseInt(b.endDate?.split('-')[0] || b.year || 0);
            return yearB - yearA;
        });

        sortedEducation.forEach(edu => {
            const educationCard = this.createEnhancedEducationCard(edu);
            timelineContainer.appendChild(educationCard);
        });

        container.appendChild(timelineContainer);
    }

    /**
     * Create education statistics
     */
    createEducationStats(educationData) {
        const statsContainer = document.createElement('div');
        statsContainer.className = 'stats-grid';

        // Calculate stats
        const totalDegrees = educationData.length;
        const institutions = [...new Set(educationData.map(edu => edu.institution))].length;
        const phdCount = educationData.filter(edu =>
            edu.degree?.toLowerCase().includes('phd') ||
            edu.degree?.toLowerCase().includes('doctorate')
        ).length;

        const degreesStat = this.createStatItem(totalDegrees, 'Degrees');
        const institutionsStat = this.createStatItem(institutions, 'Institutions');
        if (phdCount > 0) {
            const phdStat = this.createStatItem(phdCount, 'Doctorate');
            statsContainer.appendChild(degreesStat);
            statsContainer.appendChild(institutionsStat);
            statsContainer.appendChild(phdStat);
        } else {
            statsContainer.appendChild(degreesStat);
            statsContainer.appendChild(institutionsStat);
        }

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
     * Create enhanced education card
     */
    createEnhancedEducationCard(edu) {
        const card = document.createElement('div');
        card.className = 'academic-card animate-fade-in';

        // Card header
        const cardHeader = document.createElement('div');
        cardHeader.className = 'academic-card-header';

        const cardTitle = document.createElement('h3');
        cardTitle.className = 'academic-card-title';
        cardTitle.textContent = edu.degree || edu.title || 'Education';

        const cardMeta = document.createElement('div');
        cardMeta.className = 'academic-card-meta';

        // Add date range badge
        const dateRange = this.formatDateRange(edu.startDate, edu.endDate);
        if (dateRange) {
            const dateBadge = document.createElement('span');
            dateBadge.className = 'badge-enhanced badge-info';
            dateBadge.innerHTML = `<i class="fas fa-calendar-alt"></i> ${dateRange}`;
            cardMeta.appendChild(dateBadge);
        }

        // Add other badges
        if (edu.badges) {
            edu.badges.forEach(badge => {
                const badgeElement = this.createEnhancedBadge(badge);
                cardMeta.appendChild(badgeElement);
            });
        }

        cardHeader.appendChild(cardTitle);
        cardHeader.appendChild(cardMeta);

        // Card body
        const cardBody = document.createElement('div');
        cardBody.className = 'academic-card-body';

        // Institution
        if (edu.institution) {
            const institution = document.createElement('div');
            institution.className = 'list-item-subtitle';
            institution.innerHTML = `<i class="fas fa-university"></i> ${edu.institution}`;
            cardBody.appendChild(institution);
        }

        // Additional details
        const details = [];
        if (edu.supervisor) details.push(`<i class="fas fa-user-tie"></i> Supervisor: ${edu.supervisor}`);
        if (edu.grade) details.push(`<i class="fas fa-award"></i> Grade: ${edu.grade}`);
        if (edu.thesis) details.push(`<i class="fas fa-book"></i> Thesis: ${edu.thesis}`);

        details.forEach(detail => {
            const detailElement = document.createElement('div');
            detailElement.className = 'list-item-description';
            detailElement.innerHTML = detail;
            cardBody.appendChild(detailElement);
        });

        // Description
        if (edu.description) {
            const description = document.createElement('div');
            description.className = 'list-item-description';
            description.textContent = edu.description;
            cardBody.appendChild(description);
        }

        card.appendChild(cardHeader);
        card.appendChild(cardBody);

        return card;
    }

    /**
     * Format date range
     */
    formatDateRange(startDate, endDate) {
        if (!startDate && !endDate) return null;

        const formatDate = (dateStr) => {
            if (!dateStr) return '';
            const date = new Date(dateStr);
            return date.getFullYear().toString();
        };

        const start = formatDate(startDate);
        const end = endDate ? formatDate(endDate) : 'Present';

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
            'completed': 'badge-primary',
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
            'completed': 'fas fa-check-circle',
            'ongoing': 'fas fa-play'
        };
        return badgeIcons[badgeName] || 'fas fa-tag';
    }

    /**
     * Render education timeline (legacy method - keeping for compatibility)
     * @param {Array} education - Education data array
     */
    renderEducationTimeline(education) {
        this.log('Rendering education timeline with', education.length, 'items');

        const timeline = document.querySelector('#education .timeline');
        if (!timeline) {
            this.log('ERROR: Education timeline container not found');
            return;
        }

        timeline.innerHTML = '';

        if (!education || education.length === 0) {
            this.renderEmptyState(timeline);
            return;
        }

        // Sort education items by start date (most recent first)
        const sortedEducation = [...education].sort((a, b) => {
            const dateA = new Date(a.startDate || '1900-01-01');
            const dateB = new Date(b.startDate || '1900-01-01');
            return dateB.getTime() - dateA.getTime();
        });

        sortedEducation.forEach(edu => {
            const timelineItem = this.createEducationItem(edu);
            timeline.appendChild(timelineItem);
        });

        this.log('Education timeline rendered with', sortedEducation.length, 'items');
    }

    /**
     * Create an education timeline item
     * @param {Object} edu - Education item data
     * @returns {HTMLElement} Timeline item element
     */
    createEducationItem(edu) {
        this.log('Creating education item:', edu);

        // Use timeline component with education-specific options
        const timelineItem = window.timelineComponent?.createTimelineItem(edu, {
            showSupervisor: true,
            showGrade: true,
            showThesis: true
        });

        if (!timelineItem) {
            this.log('WARNING: Timeline component not available, creating fallback');
            return this.createFallbackEducationItem(edu);
        }

        return timelineItem;
    }

    /**
     * Create fallback education item if timeline component is not available
     * @param {Object} edu - Education item data
     * @returns {HTMLElement} Timeline item element
     */
    createFallbackEducationItem(edu) {
        this.log('Creating fallback education item:', edu);

        const item = document.createElement('div');
        item.className = 'timeline-item';

        // Header
        const header = document.createElement('div');
        header.className = 'timeline-header';

        const title = document.createElement('h3');
        title.className = 'timeline-title';
        title.textContent = edu.degree || edu.title || 'Education';
        header.appendChild(title);

        if (edu.institution) {
            const institution = document.createElement('div');
            institution.className = 'timeline-institution';
            institution.textContent = edu.institution;
            header.appendChild(institution);
        }

        item.appendChild(header);

        // Meta information
        const meta = document.createElement('div');
        meta.className = 'timeline-meta';

        // Date range
        const formattedDateRange = window.SharedUtils.formatDateRange(edu.startDate, edu.endDate);
        const dateRange = document.createElement('div');
        dateRange.className = 'timeline-date';
        dateRange.innerHTML = `<i class="fas fa-calendar-alt"></i> ${formattedDateRange}`;
        meta.appendChild(dateRange);

        // Location
        if (edu.location) {
            const location = document.createElement('div');
            location.className = 'timeline-location';
            location.innerHTML = `<i class="fas fa-map-marker-alt"></i> ${edu.location}`;
            meta.appendChild(location);
        }

        item.appendChild(meta);

        // Additional details
        if (edu.supervisor || edu.grade || edu.thesis) {
            const details = document.createElement('div');
            details.className = 'timeline-details';

            if (edu.supervisor) {
                const supervisor = document.createElement('div');
                supervisor.innerHTML = `<strong data-i18n="common.supervisor">Supervisor</strong>: ${edu.supervisor}`;
                details.appendChild(supervisor);
            }

            if (edu.grade) {
                const grade = document.createElement('div');
                grade.innerHTML = `<strong data-i18n="common.grade">Grade</strong>: ${edu.grade}`;
                details.appendChild(grade);
            }

            if (edu.thesis) {
                const thesis = document.createElement('div');
                thesis.innerHTML = `<strong data-i18n="common.thesis">Thesis</strong>: ${edu.thesis}`;
                details.appendChild(thesis);
            }

            item.appendChild(details);
        }

        // Description
        if (edu.description) {
            const description = document.createElement('div');
            description.className = 'timeline-description';
            description.textContent = edu.description;
            item.appendChild(description);
        }

        // Badges
        if (edu.badges && edu.badges.length > 0) {
            const badgesContainer = document.createElement('div');
            badgesContainer.className = 'badges-container';

            edu.badges.forEach(badgeName => {
                const badge = window.badgeComponent?.createBadge(badgeName) || window.SharedUtils.createSimpleBadge(badgeName);
                badgesContainer.appendChild(badge);
            });

            item.appendChild(badgesContainer);
        }

        return item;
    }

    // Duplicate methods removed - using SharedUtils instead

    /**
     * Render empty state
     * @param {HTMLElement} container - Container element
     */
    renderEmptyState(container) {
        this.log('Rendering empty state for education');

        const emptyState = document.createElement('div');
        emptyState.className = 'empty-state';
        emptyState.innerHTML = `
            <p>No education information available.</p>
        `;

        container.appendChild(emptyState);
    }


    /**
     * Set up event listeners for Education page
     */
    setupEventListeners() {
        this.log('Setting up Education page event listeners');

        // Add any Education page specific event listeners here
        // For example: expandable timeline items, filter controls, etc.

        this.log('Education page event listeners set up');
    }

    /**
     * Debug logging
     * @param {string} message - Log message
     * @param {any} data - Optional data to log
     */
    log(message, data = null) {
        if (this.debugMode) {
            const prefix = '[EducationPage]';
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
const educationPage = new EducationPage();

// Route registration handled by app.js

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = EducationPage;
}

// Make available globally for debugging
if (typeof window !== 'undefined') {
    window.educationPage = educationPage;
}