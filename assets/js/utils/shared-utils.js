/**
 * Shared Utilities Module
 * Common utility functions used across multiple modules
 * Prevents duplication of helper functions
 */

class SharedUtils {
    /**
     * Create simple badge fallback when BadgeComponent is not available
     * @param {string} badgeName - Badge name
     * @returns {HTMLElement} Badge element
     */
    static createSimpleBadge(badgeName) {
        const badge = document.createElement('span');
        badge.className = `badge badge-${badgeName}`;
        badge.setAttribute('data-i18n', `badges.${badgeName}`);
        badge.textContent = window.i18n?.t(`badges.${badgeName}`) || badgeName;
        return badge;
    }

    /**
     * Format date string for display
     * Handles various date formats and special cases
     * @param {string} dateStr - Date string
     * @returns {string} Formatted date
     */
    static formatDate(dateStr) {
        if (!dateStr) return '';

        // If it's already a year, return as is
        if (/^\d{4}$/.test(dateStr)) return dateStr;

        // Handle special cases
        const lowerDate = dateStr.toLowerCase();
        if (lowerDate === 'present') {
            return window.i18n?.t('common.present') || 'Present';
        }
        if (lowerDate === 'ongoing') {
            return window.i18n?.t('common.ongoing') || 'Ongoing';
        }

        // Try to parse and format the date
        try {
            const date = new Date(dateStr);
            return date.getFullYear().toString();
        } catch (error) {
            return dateStr; // Return original if parsing fails
        }
    }

    /**
     * Format date range for display
     * @param {string} startDate - Start date
     * @param {string} endDate - End date
     * @param {boolean} isCurrent - Whether this is a current/ongoing item
     * @returns {string} Formatted date range
     */
    static formatDateRange(startDate, endDate, isCurrent = false) {
        const start = this.formatDate(startDate);
        let end = endDate;

        if (isCurrent) {
            end = window.i18n?.t('common.present') || 'Present';
        } else {
            end = this.formatDate(endDate);
        }

        if (start && end) {
            return `${start} - ${end}`;
        } else if (start) {
            return start;
        } else if (end) {
            return end;
        }
        return '';
    }

    /**
     * Create a professional link element
     * @param {string} type - Link type (email, website, etc.)
     * @param {string} url - URL or value
     * @param {Object} options - Additional options
     * @returns {HTMLElement} Link element
     */
    static createLink(type, url, options = {}) {
        const link = document.createElement('a');
        link.className = options.className || 'standard-link';

        switch (type.toLowerCase()) {
            case 'email':
                link.href = `mailto:${url}`;
                link.target = '_self';
                break;
            case 'tel':
            case 'phone':
                link.href = `tel:${url}`;
                link.target = '_self';
                break;
            default:
                link.href = url;
                link.target = '_blank';
                link.rel = 'noopener';
                break;
        }

        if (options.icon) {
            link.innerHTML = `<i class="${options.icon}"></i> ${options.text || url}`;
        } else {
            link.textContent = options.text || url;
        }

        return link;
    }

    /**
     * Safely get nested object property
     * @param {Object} obj - Object to traverse
     * @param {string} path - Dot notation path (e.g., 'user.profile.name')
     * @param {any} defaultValue - Default value if property doesn't exist
     * @returns {any} Property value or default
     */
    static getNestedProperty(obj, path, defaultValue = null) {
        if (!obj || !path) return defaultValue;

        return path.split('.').reduce((current, key) => {
            return (current && current[key] !== undefined) ? current[key] : defaultValue;
        }, obj);
    }

    /**
     * Debounce function to limit rapid function calls
     * @param {Function} func - Function to debounce
     * @param {number} wait - Wait time in milliseconds
     * @returns {Function} Debounced function
     */
    static debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    /**
     * Generate a simple hash from a string
     * Useful for creating consistent IDs from content
     * @param {string} str - String to hash
     * @returns {string} Hash string
     */
    static simpleHash(str) {
        let hash = 0;
        if (!str || str.length === 0) return hash.toString();

        for (let i = 0; i < str.length; i++) {
            const char = str.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash; // Convert to 32-bit integer
        }
        return Math.abs(hash).toString();
    }

    /**
     * Escape HTML to prevent XSS
     * @param {string} text - Text to escape
     * @returns {string} Escaped text
     */
    static escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    /**
     * Log debug message with module prefix
     * @param {string} module - Module name
     * @param {string} message - Log message
     * @param {any} data - Optional data to log
     * @param {boolean} debugMode - Whether debug mode is enabled
     */
    static log(module, message, data = null, debugMode = true) {
        if (debugMode) {
            const prefix = `[${module}]`;
            if (data) {
                console.log(prefix, message, data);
            } else {
                console.log(prefix, message);
            }
        }
    }
}

// Make available globally
if (typeof window !== 'undefined') {
    window.SharedUtils = SharedUtils;
}

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = SharedUtils;
}