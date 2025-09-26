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

        // Create enhanced section header (icon only)
        const sectionHeader = document.createElement('div');
        sectionHeader.className = 'section-header-enhanced';

        const icon = document.createElement('div');
        icon.className = 'academic-icon academic-icon-warning';
        icon.innerHTML = '<i class="fas fa-microphone-alt"></i>';

        sectionHeader.appendChild(icon);
        container.appendChild(sectionHeader);

        // Create stats section
        const statsSection = document.createElement('div');
        statsSection.className = 'stats-grid';

        const totalStat = document.createElement('div');
        totalStat.className = 'stat-item';
        totalStat.innerHTML = `<span class="stat-number">${this.data.length}</span><span class="stat-label">Talks</span>`;

        const institutions = [...new Set(this.data.map(talk => talk.institution))].length;
        const institutionsStat = document.createElement('div');
        institutionsStat.className = 'stat-item';
        institutionsStat.innerHTML = `<span class="stat-number">${institutions}</span><span class="stat-label">Institutions</span>`;

        const countries = [...new Set(this.data.map(talk => talk.location).filter(loc => loc))].length;
        const countriesStat = document.createElement('div');
        countriesStat.className = 'stat-item';
        countriesStat.innerHTML = `<span class="stat-number">${countries}</span><span class="stat-label">Locations</span>`;

        statsSection.appendChild(totalStat);
        statsSection.appendChild(institutionsStat);
        statsSection.appendChild(countriesStat);
        container.appendChild(statsSection);

        // Sort talks by date (newest first)
        const sortedTalks = [...this.data].sort((a, b) => {
            const dateA = new Date(a.date || a.year || '1900');
            const dateB = new Date(b.date || b.year || '1900');
            return dateB - dateA;
        });

        // Create enhanced talks grid
        const grid = document.createElement('div');
        grid.className = 'invited-talks-grid activity-grid';

        sortedTalks.forEach(talk => {
            const talkCard = this.createEnhancedTalkCard(talk);
            grid.appendChild(talkCard);
        });

        container.appendChild(grid);
        this.log('Invited talks section rendered successfully');
    }

    /**
     * Create enhanced talk card
     */
    createEnhancedTalkCard(talk) {
        const card = document.createElement('div');
        card.className = 'academic-card animate-fade-in';

        // Card header
        const cardHeader = document.createElement('div');
        cardHeader.className = 'academic-card-header';

        const cardTitle = document.createElement('h3');
        cardTitle.className = 'academic-card-title';
        cardTitle.textContent = talk.title || 'Talk Title';

        const cardMeta = document.createElement('div');
        cardMeta.className = 'academic-card-meta';

        // Add date badge
        if (talk.date) {
            const dateBadge = document.createElement('span');
            dateBadge.className = 'badge-enhanced badge-info';
            const formattedDate = window.SharedUtils ?
                window.SharedUtils.formatDate(talk.date) :
                this.formatDate(talk.date);
            dateBadge.innerHTML = `<i class="fas fa-calendar-alt"></i> ${formattedDate}`;
            cardMeta.appendChild(dateBadge);
        }

        // Add type badge
        if (talk.type) {
            const typeBadge = document.createElement('span');
            typeBadge.className = 'badge-enhanced badge-primary';
            typeBadge.innerHTML = `<i class="fas fa-tag"></i> ${talk.type}`;
            cardMeta.appendChild(typeBadge);
        }

        // Add other badges
        if (talk.badges) {
            talk.badges.forEach(badge => {
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
        if (talk.institution) {
            const institution = document.createElement('div');
            institution.className = 'list-item-subtitle';
            institution.innerHTML = `<i class="fas fa-university"></i> ${talk.institution}`;
            if (talk.department) {
                institution.innerHTML += ` - ${talk.department}`;
            }
            cardBody.appendChild(institution);
        }

        // Location
        if (talk.location) {
            const location = document.createElement('div');
            location.className = 'list-item-description';
            location.innerHTML = `<i class="fas fa-map-marker-alt"></i> ${talk.location}`;
            cardBody.appendChild(location);
        }

        // Audience
        if (talk.audience) {
            const audience = document.createElement('div');
            audience.className = 'list-item-description';
            audience.innerHTML = `<i class="fas fa-users"></i> Audience: ${talk.audience}`;
            cardBody.appendChild(audience);
        }

        // Abstract or description
        if (talk.abstract || talk.description) {
            const abstract = document.createElement('div');
            abstract.className = 'list-item-description';
            abstract.textContent = talk.abstract || talk.description;
            cardBody.appendChild(abstract);
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
        badge.className = `badge-enhanced badge-light`;
        badge.innerHTML = `<i class="fas fa-star"></i> ${badgeName}`;
        return badge;
    }

    /**
     * Create individual talk element (legacy method - keeping for compatibility)
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