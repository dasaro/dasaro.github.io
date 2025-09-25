/**
 * Badge Component
 * Reusable badge system for status indicators, achievements, etc.
 * Provides consistent styling and i18n support
 */

class BadgeComponent {
    constructor() {
        this.debugMode = true;
        this.badgeTypes = {
            featured: { class: 'badge-featured', icon: 'fas fa-star' },
            recent: { class: 'badge-recent', icon: 'fas fa-clock' },
            highlight: { class: 'badge-highlight', icon: 'fas fa-exclamation-circle' },
            published: { class: 'badge-published', icon: 'fas fa-check-circle' },
            inProgress: { class: 'badge-in-progress', icon: 'fas fa-spinner' },
            completed: { class: 'badge-completed', icon: 'fas fa-check' },
            certified: { class: 'badge-certified', icon: 'fas fa-certificate' },
            award: { class: 'badge-award', icon: 'fas fa-trophy' }
        };
    }

    /**
     * Create a badge element
     * @param {string} badgeName - Badge type name
     * @param {Object} options - Configuration options
     * @returns {HTMLElement} Badge element
     */
    createBadge(badgeName, options = {}) {
        this.log('Creating badge:', badgeName);

        const badge = document.createElement('span');
        const badgeType = this.badgeTypes[badgeName] || this.badgeTypes.highlight;

        badge.className = `badge ${badgeType.class}`;
        badge.setAttribute('data-i18n', `badges.${badgeName}`);

        // Add icon if specified
        if (options.showIcon !== false && badgeType.icon) {
            const icon = document.createElement('i');
            icon.className = badgeType.icon;
            badge.appendChild(icon);
            badge.appendChild(document.createTextNode(' '));
        }

        // Add text
        const text = window.i18n?.t(`badges.${badgeName}`) || this.getDefaultBadgeText(badgeName);
        badge.appendChild(document.createTextNode(text));

        this.log('Badge created successfully');
        return badge;
    }

    /**
     * Create multiple badges
     * @param {Array} badgeNames - Array of badge names
     * @param {Object} options - Configuration options
     * @returns {DocumentFragment} Fragment containing all badges
     */
    createBadges(badgeNames, options = {}) {
        this.log('Creating multiple badges:', badgeNames);

        const fragment = document.createDocumentFragment();

        badgeNames.forEach(badgeName => {
            const badge = this.createBadge(badgeName, options);
            fragment.appendChild(badge);
        });

        return fragment;
    }

    /**
     * Create badges container with proper spacing
     * @param {Array} badgeNames - Array of badge names
     * @param {Object} options - Configuration options
     * @returns {HTMLElement} Container element with badges
     */
    createBadgesContainer(badgeNames, options = {}) {
        this.log('Creating badges container:', badgeNames);

        const container = document.createElement('div');
        container.className = 'badges-container';

        badgeNames.forEach(badgeName => {
            const badge = this.createBadge(badgeName, options);
            container.appendChild(badge);
        });

        return container;
    }

    /**
     * Get default badge text when i18n is not available
     * @param {string} badgeName - Badge name
     * @returns {string} Default text
     */
    getDefaultBadgeText(badgeName) {
        const defaults = {
            featured: 'Featured',
            recent: 'Recent',
            highlight: 'Highlight',
            published: 'Published',
            inProgress: 'In Progress',
            completed: 'Completed',
            certified: 'Certified',
            award: 'Award Winner'
        };

        return defaults[badgeName] || badgeName.charAt(0).toUpperCase() + badgeName.slice(1);
    }

    /**
     * Register a new badge type
     * @param {string} name - Badge name
     * @param {Object} config - Badge configuration
     */
    registerBadgeType(name, config) {
        this.log('Registering new badge type:', name);

        this.badgeTypes[name] = {
            class: config.class || `badge-${name}`,
            icon: config.icon || null
        };
    }

    /**
     * Get all registered badge types
     * @returns {Object} All badge types
     */
    getBadgeTypes() {
        return this.badgeTypes;
    }

    /**
     * Debug logging
     * @param {string} message - Log message
     * @param {any} data - Optional data to log
     */
    log(message, data = null) {
        if (this.debugMode) {
            const prefix = '[BadgeComponent]';
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

// Create global instance
window.badgeComponent = new BadgeComponent();

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = BadgeComponent;
}