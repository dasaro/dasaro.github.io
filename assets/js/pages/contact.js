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

        if (!data || !data.contact) {
            this.log('ERROR: No contact data provided for Contact page');
            return;
        }

        this.data = data;

        // Enhance existing section header with icon
        this.enhanceExistingSectionHeader();

        this.renderContactGrid(data.contact);

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
     * @param {Object} contactData - Contact information data
     */
    renderContactGrid(contactData) {
        this.log('Rendering contact grid');

        const contactGrid = document.querySelector('#contact .contact-details');
        if (!contactGrid) {
            this.log('ERROR: Contact grid container not found');
            return;
        }

        contactGrid.innerHTML = '';

        // Define contact fields with their configurations
        const contactFields = [
            { key: 'email', icon: 'fas fa-envelope', type: 'email', label: 'Email (Main - University of Salento)' },
            { key: 'emailInstitutional2', icon: 'fas fa-envelope', type: 'email', label: 'Email (University of Verona)' },
            { key: 'emailInstitutional3', icon: 'fas fa-envelope', type: 'email', label: 'Email (University College London)' },
            { key: 'emailPersonal', icon: 'fas fa-envelope', type: 'email', label: 'Email (Personal)' },
            { key: 'phone', icon: 'fas fa-phone', type: 'tel', label: 'Phone' },
            { key: 'website', icon: 'fas fa-globe', type: 'url', label: 'Website' },
            { key: 'location', icon: 'fas fa-map-marker-alt', type: 'text', label: 'Location' },
            { key: 'linkedin', icon: 'fab fa-linkedin', type: 'url', label: 'LinkedIn' },
            { key: 'orcid', icon: 'fab fa-orcid', type: 'url', label: 'ORCID' }
        ];

        // Use contact item component if available, otherwise create fallback
        if (window.contactItemComponent) {
            this.renderWithComponent(contactData, contactFields, contactGrid);
        } else {
            this.renderFallbackContactItems(contactData, contactFields, contactGrid);
        }

        this.log('Contact grid rendered successfully');
    }

    /**
     * Render contact items using the contact item component
     * @param {Object} contactData - Contact information data
     * @param {Array} contactFields - Contact field configurations
     * @param {HTMLElement} contactGrid - Container element
     */
    renderWithComponent(contactData, contactFields, contactGrid) {
        this.log('Rendering with contact item component');

        contactFields.forEach(field => {
            if (contactData[field.key]) {
                const contactItem = window.contactItemComponent.createContactItem(
                    field.key,
                    contactData[field.key],
                    { icon: field.icon, label: field.label }
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
    renderFallbackContactItems(contactData, contactFields, contactGrid) {
        this.log('WARNING: Contact item component not available, using fallback');

        contactFields.forEach(field => {
            if (contactData[field.key]) {
                const contactItem = this.createFallbackContactItem(
                    field.key,
                    contactData[field.key],
                    field.icon,
                    field.type,
                    field.label
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
    createFallbackContactItem(type, value, icon, linkType, label) {
        const item = document.createElement('div');
        item.className = 'contact-item';

        const iconElement = document.createElement('div');
        iconElement.className = 'contact-icon';
        iconElement.innerHTML = `<i class="${icon}"></i>`;

        const content = document.createElement('div');
        content.className = 'contact-content';

        const labelElement = document.createElement('div');
        labelElement.className = 'contact-label';
        labelElement.textContent = label || type;

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

        content.appendChild(labelElement);
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