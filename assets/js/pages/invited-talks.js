/**
 * Invited Talks Page Module
 * Handles display and management of invited talks and presentations
 */

class InvitedTalksPage {
    constructor() {
        this.debugMode = true;
        this.data = null;
    }

    /**
     * Initialize the invited talks page
     */
    init() {
        this.log('Initializing Invited Talks page...');
        this.loadData();
        this.render();
        this.log('Invited Talks page initialized successfully');
    }

    /**
     * Load invited talks data
     */
    loadData() {
        this.log('Loading invited talks data...');
        if (window.dataManager && window.dataManager.isLoaded) {
            this.data = window.dataManager.getData('invitedTalks') || [];
            this.log('Invited talks data loaded:', this.data);
        } else {
            this.log('WARNING: DataManager not available, using empty data');
            this.data = [];
        }
    }

    /**
     * Render the invited talks section
     */
    render() {
        this.log('Rendering invited talks section...');

        const container = document.querySelector('#invited-talks .section-content');
        if (!container) {
            this.log('ERROR: Invited talks container not found');
            return;
        }

        container.innerHTML = '';

        if (!this.data || this.data.length === 0) {
            container.innerHTML = '<p class="no-data">No invited talks available.</p>';
            return;
        }

        // Sort talks by date (newest first)
        const sortedTalks = [...this.data].sort((a, b) => {
            const dateA = new Date(a.date || a.year || '1900');
            const dateB = new Date(b.date || b.year || '1900');
            return dateB - dateA;
        });

        // Create timeline container
        const timeline = document.createElement('div');
        timeline.className = 'talks-timeline';

        sortedTalks.forEach((talk, index) => {
            const talkElement = this.createTalkElement(talk, index);
            timeline.appendChild(talkElement);
        });

        container.appendChild(timeline);
        this.log('Invited talks section rendered successfully');
    }

    /**
     * Create individual talk element
     */
    createTalkElement(talk, index) {
        const element = document.createElement('div');
        element.className = 'talk-timeline-item';

        // Timeline marker
        const marker = document.createElement('div');
        marker.className = 'talk-timeline-marker';
        element.appendChild(marker);

        // Talk content
        const content = document.createElement('div');
        content.className = 'talk-timeline-content';

        // Talk header
        const header = document.createElement('div');
        header.className = 'talk-header';

        const title = document.createElement('h3');
        title.className = 'talk-title';
        title.textContent = talk.title || 'Talk Title';

        const badges = document.createElement('div');
        badges.className = 'talk-badges';

        if (talk.badges) {
            talk.badges.forEach(badge => {
                const badgeElement = window.SharedUtils ?
                    window.SharedUtils.createSimpleBadge(badge) :
                    this.createBadge(badge);
                badges.appendChild(badgeElement);
            });
        }

        header.appendChild(title);
        header.appendChild(badges);

        // Talk details
        const details = document.createElement('div');
        details.className = 'talk-details';

        // Institution and department
        if (talk.institution) {
            const institutionElement = document.createElement('div');
            institutionElement.className = 'talk-institution';
            institutionElement.innerHTML = `<strong>${talk.institution}</strong>`;
            if (talk.department) {
                institutionElement.innerHTML += ` - ${talk.department}`;
            }
            details.appendChild(institutionElement);
        }

        // Location and date
        const meta = document.createElement('div');
        meta.className = 'talk-meta';

        if (talk.location) {
            const locationElement = document.createElement('span');
            locationElement.className = 'talk-location';
            locationElement.innerHTML = `<i class="fas fa-map-marker-alt"></i> ${talk.location}`;
            meta.appendChild(locationElement);
        }

        if (talk.date) {
            const dateElement = document.createElement('span');
            dateElement.className = 'talk-date';
            const formattedDate = window.SharedUtils ?
                window.SharedUtils.formatDate(talk.date) :
                this.formatDate(talk.date);
            dateElement.innerHTML = `<i class="fas fa-calendar"></i> ${formattedDate}`;
            meta.appendChild(dateElement);
        }

        if (talk.type) {
            const typeElement = document.createElement('span');
            typeElement.className = 'talk-type';
            typeElement.innerHTML = `<i class="fas fa-tag"></i> ${talk.type}`;
            meta.appendChild(typeElement);
        }

        details.appendChild(meta);

        // Audience information
        if (talk.audience) {
            const audienceElement = document.createElement('div');
            audienceElement.className = 'talk-audience';
            audienceElement.innerHTML = `<strong>Audience:</strong> ${talk.audience}`;
            details.appendChild(audienceElement);
        }

        content.appendChild(header);
        content.appendChild(details);
        element.appendChild(content);

        return element;
    }

    /**
     * Format date for display (fallback)
     */
    formatDate(dateString) {
        try {
            const date = new Date(dateString);
            return date.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
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
        this.log('Cleaning up Invited Talks page...');
        // Add any cleanup logic here if needed
    }

    /**
     * Debug logging
     */
    log(message, data = null) {
        if (this.debugMode) {
            const prefix = '[InvitedTalksPage]';
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
window.invitedTalksPage = new InvitedTalksPage();

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = InvitedTalksPage;
}