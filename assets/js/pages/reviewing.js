/**
 * Reviewing Page Module
 * Handles display and management of reviewing activities
 */

class ReviewingPage {
    constructor() {
        this.debugMode = true;
        this.data = null;
    }

    /**
     * Initialize the reviewing page
     */
    init() {
        this.log('Initializing Reviewing page...');
        this.loadData();
        this.render();
        this.log('Reviewing page initialized successfully');
    }

    /**
     * Load reviewing data
     */
    loadData() {
        this.log('Loading reviewing data...');
        if (window.dataManager && window.dataManager.isLoaded) {
            this.data = window.dataManager.getData('reviewing') || [];
            this.log('Reviewing data loaded:', this.data);
        } else {
            this.log('WARNING: DataManager not available, using empty data');
            this.data = [];
        }
    }

    /**
     * Render the reviewing section
     */
    render() {
        this.log('Rendering reviewing section...');

        const container = document.querySelector('#reviewing .section-content');
        if (!container) {
            this.log('ERROR: Reviewing container not found');
            return;
        }

        container.innerHTML = '';

        if (!this.data || this.data.length === 0) {
            container.innerHTML = '<p class="no-data">No reviewing activities available.</p>';
            return;
        }

        // Enhance existing section header
        this.enhanceExistingSectionHeader();

        // Create overall stats
        const statsSection = this.createOverallStats();
        container.appendChild(statsSection);

        // Create enhanced reviewing grid
        const grid = document.createElement('div');
        grid.className = 'reviewing-grid activity-grid';

        this.data.forEach(reviewType => {
            const typeCard = this.createEnhancedReviewTypeCard(reviewType);
            grid.appendChild(typeCard);
        });

        container.appendChild(grid);
        this.log('Reviewing section rendered successfully');
    }

    /**
     * Enhance existing section header by adding icon
     */
    enhanceExistingSectionHeader() {
        const sectionHeader = document.querySelector('#reviewing .section-header h2');
        if (sectionHeader && !sectionHeader.querySelector('i')) {
            sectionHeader.innerHTML = '<i class="fas fa-search"></i> ' + sectionHeader.textContent;
        }
    }

    /**
     * Create overall statistics
     */
    createOverallStats() {
        const statsContainer = document.createElement('div');
        statsContainer.className = 'stats-grid';

        // Calculate totals
        let totalReviews = 0;
        let totalVenues = 0;

        this.data.forEach(reviewType => {
            if (reviewType.count) totalReviews += reviewType.count;
            if (reviewType.venues) totalVenues += reviewType.venues.length;
        });

        const reviewsStat = this.createStatItem(totalReviews, 'Total Reviews');
        const venuesStat = this.createStatItem(totalVenues, 'Venues');
        const typesStat = this.createStatItem(this.data.length, 'Review Types');

        statsContainer.appendChild(reviewsStat);
        statsContainer.appendChild(venuesStat);
        statsContainer.appendChild(typesStat);

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
        statNumber.textContent = number || 0;

        const statLabel = document.createElement('span');
        statLabel.className = 'stat-label';
        statLabel.textContent = label;

        statItem.appendChild(statNumber);
        statItem.appendChild(statLabel);

        return statItem;
    }

    /**
     * Create enhanced review type card
     */
    createEnhancedReviewTypeCard(reviewType) {
        const card = document.createElement('div');
        card.className = 'academic-card animate-fade-in';

        // Card header
        const cardHeader = document.createElement('div');
        cardHeader.className = 'academic-card-header';

        const cardTitle = document.createElement('h3');
        cardTitle.className = 'academic-card-title';
        cardTitle.textContent = reviewType.title || 'Review Type';

        const cardMeta = document.createElement('div');
        cardMeta.className = 'academic-card-meta';

        // Add count badge if available
        if (reviewType.count) {
            const countBadge = document.createElement('span');
            countBadge.className = 'badge-enhanced badge-primary';
            countBadge.innerHTML = `<i class="fas fa-clipboard-list"></i> ${reviewType.count} reviews`;
            cardMeta.appendChild(countBadge);
        }

        // Add other badges
        if (reviewType.badges) {
            reviewType.badges.forEach(badge => {
                const badgeElement = this.createEnhancedBadge(badge);
                cardMeta.appendChild(badgeElement);
            });
        }

        cardHeader.appendChild(cardTitle);
        cardHeader.appendChild(cardMeta);

        // Card body with venues
        const cardBody = document.createElement('div');
        cardBody.className = 'academic-card-body';

        if (reviewType.venues && reviewType.venues.length > 0) {
            const venuesTitle = document.createElement('h4');
            venuesTitle.className = 'list-item-title';
            venuesTitle.innerHTML = '<i class="fas fa-university"></i> Reviewed for:';

            const focusAreas = document.createElement('div');
            focusAreas.className = 'focus-areas';

            reviewType.venues.forEach(venue => {
                const venueTag = document.createElement('span');
                venueTag.className = 'focus-tag';
                venueTag.textContent = venue;
                focusAreas.appendChild(venueTag);
            });

            cardBody.appendChild(venuesTitle);
            cardBody.appendChild(focusAreas);
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
            'active': 'badge-primary',
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
            'active': 'fas fa-check-circle',
            'ongoing': 'fas fa-play'
        };
        return badgeIcons[badgeName] || 'fas fa-tag';
    }

    /**
     * Create review type card (legacy method - keeping for compatibility)
     */
    createReviewTypeCard(reviewType) {
        const card = document.createElement('div');
        card.className = 'reviewing-card';

        // Card header
        const header = document.createElement('div');
        header.className = 'reviewing-card-header';

        const title = document.createElement('h3');
        title.className = 'reviewing-card-title';
        title.textContent = reviewType.title || 'Review Type';

        const badges = document.createElement('div');
        badges.className = 'reviewing-card-badges';

        if (reviewType.badges) {
            reviewType.badges.forEach(badge => {
                const badgeElement = window.SharedUtils ?
                    window.SharedUtils.createSimpleBadge(badge) :
                    this.createBadge(badge);
                badges.appendChild(badgeElement);
            });
        }

        header.appendChild(title);
        header.appendChild(badges);

        // Card content
        const content = document.createElement('div');
        content.className = 'reviewing-card-content';

        // Statistics
        const stats = document.createElement('div');
        stats.className = 'reviewing-stats';

        if (reviewType.totalReviews) {
            const totalElement = document.createElement('div');
            totalElement.className = 'reviewing-stat';
            totalElement.innerHTML = `<strong>Total Reviews:</strong> ${reviewType.totalReviews}`;
            stats.appendChild(totalElement);
        }

        if (reviewType.yearRange) {
            const yearElement = document.createElement('div');
            yearElement.className = 'reviewing-stat';
            yearElement.innerHTML = `<strong>Years Active:</strong> ${reviewType.yearRange}`;
            stats.appendChild(yearElement);
        }

        content.appendChild(stats);

        // Venues list
        if (reviewType.venues && reviewType.venues.length > 0) {
            const venuesSection = document.createElement('div');
            venuesSection.className = 'reviewing-venues';

            const venuesTitle = document.createElement('h4');
            venuesTitle.className = 'reviewing-venues-title';
            venuesTitle.textContent = 'Venues:';
            venuesSection.appendChild(venuesTitle);

            const venuesList = document.createElement('ul');
            venuesList.className = 'reviewing-venues-list';

            reviewType.venues.forEach(venue => {
                const venueItem = document.createElement('li');
                venueItem.className = 'reviewing-venue-item';
                venueItem.textContent = venue;
                venuesList.appendChild(venueItem);
            });

            venuesSection.appendChild(venuesList);
            content.appendChild(venuesSection);
        }

        card.appendChild(header);
        card.appendChild(content);

        return card;
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
        this.log('Cleaning up Reviewing page...');
        // Add any cleanup logic here if needed
    }

    /**
     * Debug logging
     */
    log(message, data = null) {
        if (this.debugMode) {
            const prefix = '[ReviewingPage]';
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
window.reviewingPage = new ReviewingPage();

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ReviewingPage;
}