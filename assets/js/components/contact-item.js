/**
 * Contact Item Component
 * Reusable contact information display component
 * Handles different contact types (email, phone, website, etc.)
 */

class ContactItemComponent {
    constructor() {
        this.debugMode = true;
        this.contactTypes = {
            email: { icon: 'fas fa-envelope', linkType: 'email' },
            emailSecondary: { icon: 'fas fa-envelope', linkType: 'email' },
            phone: { icon: 'fas fa-phone', linkType: 'tel' },
            website: { icon: 'fas fa-globe', linkType: 'url' },
            linkedin: { icon: 'fab fa-linkedin', linkType: 'url' },
            orcid: { icon: 'fab fa-orcid', linkType: 'url' },
            location: { icon: 'fas fa-map-marker-alt', linkType: 'text' }
        };
    }

    /**
     * Create a contact item element
     * @param {string} type - Contact type (email, phone, etc.)
     * @param {string} value - Contact value
     * @param {Object} options - Configuration options
     * @returns {HTMLElement} Contact item element
     */
    createContactItem(type, value, options = {}) {
        this.log('Creating contact item:', { type, value });

        if (!value) {
            this.log('No value provided for contact item:', type);
            return null;
        }

        const contactConfig = this.contactTypes[type] || this.contactTypes.website;
        const item = document.createElement('div');
        item.className = 'contact-item';

        // Icon
        const iconElement = document.createElement('div');
        iconElement.className = 'contact-icon';
        iconElement.innerHTML = `<i class="${options.icon || contactConfig.icon}"></i>`;

        // Content
        const content = document.createElement('div');
        content.className = 'contact-content';

        // Label
        const label = this.createLabel(type, options);
        content.appendChild(label);

        // Value
        const valueElement = this.createValueElement(value, contactConfig.linkType, options);
        content.appendChild(valueElement);

        item.appendChild(iconElement);
        item.appendChild(content);

        this.log('Contact item created successfully');
        return item;
    }

    /**
     * Create contact label element
     * @param {string} type - Contact type
     * @param {Object} options - Configuration options
     * @returns {HTMLElement} Label element
     */
    createLabel(type, options) {
        const label = document.createElement('div');
        label.className = 'contact-label';

        // Handle special cases for labels
        let labelKey = type;
        let labelText = type;

        if (type === 'emailSecondary') {
            labelKey = 'email';
            labelText = options.secondaryLabel || 'Email (Personal)';
        } else if (type === 'email') {
            labelText = options.primaryLabel || 'Email (Institutional)';
        }

        label.setAttribute('data-i18n', `common.${labelKey}`);
        label.textContent = window.i18n?.t(`common.${labelKey}`) || labelText;

        return label;
    }

    /**
     * Create contact value element with appropriate linking
     * @param {string} value - Contact value
     * @param {string} linkType - Type of link to create
     * @param {Object} options - Configuration options
     * @returns {HTMLElement} Value element
     */
    createValueElement(value, linkType, options) {
        const valueElement = document.createElement('div');
        valueElement.className = 'contact-value';

        switch (linkType) {
            case 'email':
                valueElement.innerHTML = `<a href="mailto:${value}">${value}</a>`;
                break;

            case 'tel':
                const cleanPhone = value.replace(/\s+/g, '').replace(/[^\d+]/g, '');
                valueElement.innerHTML = `<a href="tel:${cleanPhone}">${value}</a>`;
                break;

            case 'url':
                const displayUrl = value.replace(/^https?:\/\//, '');
                valueElement.innerHTML = `<a href="${value}" target="_blank" rel="noopener noreferrer">${displayUrl}</a>`;
                break;

            default:
                valueElement.textContent = value;
                break;
        }

        return valueElement;
    }

    /**
     * Create multiple contact items
     * @param {Object} contactData - Object with contact information
     * @param {Array} fields - Array of field configurations
     * @param {Object} options - Configuration options
     * @returns {DocumentFragment} Fragment containing all contact items
     */
    createContactItems(contactData, fields, options = {}) {
        this.log('Creating multiple contact items:', { contactData, fields });

        const fragment = document.createDocumentFragment();

        fields.forEach(field => {
            const value = contactData[field.key];
            if (value) {
                const contactItem = this.createContactItem(field.key, value, {
                    icon: field.icon,
                    primaryLabel: field.primaryLabel,
                    secondaryLabel: field.secondaryLabel,
                    ...options
                });

                if (contactItem) {
                    fragment.appendChild(contactItem);
                }
            }
        });

        return fragment;
    }

    /**
     * Create contact grid container
     * @param {Object} contactData - Object with contact information
     * @param {Array} fields - Array of field configurations
     * @param {Object} options - Configuration options
     * @returns {HTMLElement} Grid container element
     */
    createContactGrid(contactData, fields, options = {}) {
        this.log('Creating contact grid:', { contactData, fields });

        const grid = document.createElement('div');
        grid.className = 'contact-grid';

        fields.forEach(field => {
            const value = contactData[field.key];
            if (value) {
                const contactItem = this.createContactItem(field.key, value, {
                    icon: field.icon,
                    primaryLabel: field.primaryLabel,
                    secondaryLabel: field.secondaryLabel,
                    ...options
                });

                if (contactItem) {
                    grid.appendChild(contactItem);
                }
            }
        });

        return grid;
    }

    /**
     * Register a new contact type
     * @param {string} name - Contact type name
     * @param {Object} config - Contact type configuration
     */
    registerContactType(name, config) {
        this.log('Registering new contact type:', name);

        this.contactTypes[name] = {
            icon: config.icon || 'fas fa-circle',
            linkType: config.linkType || 'text'
        };
    }

    /**
     * Get all registered contact types
     * @returns {Object} All contact types
     */
    getContactTypes() {
        return this.contactTypes;
    }

    /**
     * Debug logging
     * @param {string} message - Log message
     * @param {any} data - Optional data to log
     */
    log(message, data = null) {
        if (this.debugMode) {
            const prefix = '[ContactItemComponent]';
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
window.contactItemComponent = new ContactItemComponent();

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ContactItemComponent;
}