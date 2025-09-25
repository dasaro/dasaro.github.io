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

        // Create reviewing grid
        const grid = document.createElement('div');
        grid.className = 'reviewing-grid';

        this.data.forEach(reviewType => {
            const typeCard = this.createReviewTypeCard(reviewType);
            grid.appendChild(typeCard);
        });

        container.appendChild(grid);
        this.log('Reviewing section rendered successfully');
    }

    /**
     * Create review type card
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