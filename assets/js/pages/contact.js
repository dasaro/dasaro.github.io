/**
 * Contact Page Module
 * Handles contact section logic and rendering
 * Uses contact-item component for consistent display
 */

class ContactPage {
    constructor() {
        this.isInitialized = false;
        this.data = null;
        this.debugMode = true;
    }

    /**
     * Render the Contact page with provided data
     * @param {Object} data - Application data
     */
    render(data) {
        this.log('Rendering Contact page with data:', data);

        if (!data || !data.personalInfo) {
            this.log('ERROR: No personal info data provided for Contact page');
            return;
        }

        this.data = data;

        // Enhance existing section header with icon
        this.enhanceExistingSectionHeader();

        this.renderContactGrid(data.personalInfo);

        this.log('Contact page rendered successfully');
    }

    /**
     * Initialize Contact page
     */
    init() {
        this.log('Initializing Contact page');

        if (!this.isInitialized) {
            this.setupEventListeners();
            this.isInitialized = true;
        }

        this.log('Contact page initialized');
    }

    /**
     * Cleanup when leaving Contact page
     */
    cleanup() {
        this.log('Cleaning up Contact page');
    }

    /**
     * Check if Contact page should be visible
     * @returns {boolean} Whether page should be visible
     */
    isVisible() {
        return true;
    }

    /**
     * Enhance existing section header with icon
     */
    enhanceExistingSectionHeader() {
        const sectionHeader = document.querySelector('#contact .section-header h2');
        if (sectionHeader && !sectionHeader.querySelector('i')) {
            // Add icon to the existing title
            sectionHeader.innerHTML = '<i class="fas fa-envelope"></i> ' + sectionHeader.textContent;
        }
    }

    /**
     * Render contact information grid
     * @param {Object} personalInfo - Personal information data
     */
    renderContactGrid(personalInfo) {
        this.log('Rendering contact grid');

        const contactGrid = document.querySelector('#contact .contact-grid');
        if (!contactGrid) {
            this.log('ERROR: Contact grid container not found');
            return;
        }

        contactGrid.innerHTML = '';

        // Define contact fields with their configurations
        const contactFields = [
            { key: 'email', icon: 'fas fa-envelope', type: 'email' },
            { key: 'emailSecondary', icon: 'fas fa-envelope', type: 'email' },
            { key: 'phone', icon: 'fas fa-phone', type: 'tel' },
            { key: 'website', icon: 'fas fa-globe', type: 'url' },
            { key: 'linkedin', icon: 'fab fa-linkedin', type: 'url' },
            { key: 'orcid', icon: 'fab fa-orcid', type: 'url' },
            { key: 'location', icon: 'fas fa-map-marker-alt', type: 'text' }
        ];

        // Use contact item component if available, otherwise create fallback
        if (window.contactItemComponent) {
            this.renderWithComponent(personalInfo, contactFields, contactGrid);
        } else {
            this.renderFallbackContactItems(personalInfo, contactFields, contactGrid);
        }

        this.log('Contact grid rendered successfully');
    }

    /**
     * Render contact items using the contact item component
     * @param {Object} personalInfo - Personal information data
     * @param {Array} contactFields - Contact field configurations
     * @param {HTMLElement} contactGrid - Container element
     */
    renderWithComponent(personalInfo, contactFields, contactGrid) {
        this.log('Rendering with contact item component');

        contactFields.forEach(field => {
            if (personalInfo[field.key]) {
                const contactItem = window.contactItemComponent.createContactItem(
                    field.key,
                    personalInfo[field.key],
                    { icon: field.icon }
                );

                if (contactItem) {
                    contactGrid.appendChild(contactItem);
                    this.log(`Added contact item: ${field.key}`);
                }
            }
        });
    }

    /**
     * Render fallback contact items if component is not available
     * @param {Object} personalInfo - Personal information data
     * @param {Array} contactFields - Contact field configurations
     * @param {HTMLElement} contactGrid - Container element
     */
    renderFallbackContactItems(personalInfo, contactFields, contactGrid) {
        this.log('WARNING: Contact item component not available, using fallback');

        contactFields.forEach(field => {
            if (personalInfo[field.key]) {
                const contactItem = this.createFallbackContactItem(
                    field.key,
                    personalInfo[field.key],
                    field.icon,
                    field.type
                );
                contactGrid.appendChild(contactItem);
                this.log(`Added fallback contact item: ${field.key}`);
            }
        });
    }

    /**
     * Create fallback contact item
     * @param {string} type - Contact type
     * @param {string} value - Contact value
     * @param {string} icon - Icon class
     * @param {string} linkType - Link type
     * @returns {HTMLElement} Contact item element
     */
    createFallbackContactItem(type, value, icon, linkType) {
        const item = document.createElement('div');
        item.className = 'contact-item';

        const iconElement = document.createElement('div');
        iconElement.className = 'contact-icon';
        iconElement.innerHTML = `<i class="${icon}"></i>`;

        const content = document.createElement('div');
        content.className = 'contact-content';

        const label = document.createElement('div');
        label.className = 'contact-label';

        // Handle special cases for labels
        let labelKey = type;
        let labelText = type;

        if (type === 'emailSecondary') {
            labelKey = 'email';
            labelText = 'Email (Personal)';
        } else if (type === 'email') {
            labelText = 'Email (Institutional)';
        }

        label.setAttribute('data-i18n', `common.${labelKey}`);
        label.textContent = window.i18n?.t(`common.${labelKey}`) || labelText;

        const valueElement = document.createElement('div');
        valueElement.className = 'contact-value';

        switch (linkType) {
            case 'email':
                valueElement.innerHTML = `<a href="mailto:${value}">${value}</a>`;
                break;
            case 'tel':
                valueElement.innerHTML = `<a href="tel:${value}">${value}</a>`;
                break;
            case 'url':
                valueElement.innerHTML = `<a href="${value}" target="_blank" rel="noopener">${value}</a>`;
                break;
            default:
                valueElement.textContent = value;
                break;
        }

        content.appendChild(label);
        content.appendChild(valueElement);
        item.appendChild(iconElement);
        item.appendChild(content);

        return item;
    }

    /**
     * Set up event listeners for Contact page
     */
    setupEventListeners() {
        this.log('Setting up Contact page event listeners');

        // Add any contact-specific interactions here
        // For example: copy to clipboard buttons, contact form validation, etc.
    }

    /**
     * Debug logging
     * @param {string} message - Log message
     * @param {any} data - Optional data to log
     */
    log(message, data = null) {
        if (this.debugMode) {
            const prefix = '[ContactPage]';
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
const contactPage = new ContactPage();

// Route registration handled by app.js

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ContactPage;
}

// Make available globally for debugging
if (typeof window !== 'undefined') {
    window.contactPage = contactPage;
}