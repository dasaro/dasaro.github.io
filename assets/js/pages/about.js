/**
 * About Page Module
 * Handles all About section logic and rendering
 * Clear separation of concerns for easy debugging
 */

class AboutPage {
    constructor() {
        this.isInitialized = false;
        this.data = null;
        this.debugMode = true;
    }

    /**
     * Render the About page with provided data
     * @param {Object} data - Personal information data
     */
    render(data) {
        this.log('Rendering About page with data:', data);

        if (!data || !data.personalInfo) {
            this.log('ERROR: No personal info data provided for About page');
            return;
        }

        this.data = data;

        // Get the about container
        const aboutContainer = document.querySelector('#about .section-content');
        if (aboutContainer) {
            // Clear existing content
            aboutContainer.innerHTML = '';

            // Create enhanced section header
            const sectionHeader = this.createSectionHeader();
            aboutContainer.appendChild(sectionHeader);

            // Create about content container
            const contentContainer = document.createElement('div');
            contentContainer.className = 'about-content-enhanced';

            // Render personal information section
            this.renderEnhancedPersonalInfo(data.personalInfo, contentContainer);

            // Render contact information in About section
            this.renderEnhancedContactInfo(data.personalInfo, contentContainer);

            aboutContainer.appendChild(contentContainer);
        } else {
            // Fallback to legacy rendering
            this.renderPersonalInfo(data.personalInfo);
            this.renderContactInfo(data.personalInfo);
        }

        this.log('About page rendered successfully');
    }

    /**
     * Initialize About page - called when navigating to this page
     */
    init() {
        this.log('Initializing About page');

        if (!this.isInitialized) {
            this.setupEventListeners();
            this.isInitialized = true;
        }

        // Any page-specific initialization logic here
        this.log('About page initialized');
    }

    /**
     * Cleanup when leaving About page
     */
    cleanup() {
        this.log('Cleaning up About page');
        // Remove any page-specific event listeners or cleanup
    }

    /**
     * Check if About page should be visible
     * @returns {boolean} Whether page should be visible
     */
    isVisible() {
        return true; // About page is always visible
    }

    /**
     * Create enhanced section header
     */
    createSectionHeader() {
        const header = document.createElement('div');
        header.className = 'section-header-enhanced';

        const icon = document.createElement('div');
        icon.className = 'academic-icon academic-icon-primary';
        icon.innerHTML = '<i class="fas fa-user"></i>';

        const title = document.createElement('h2');
        title.textContent = 'About Me';

        header.appendChild(icon);
        header.appendChild(title);

        return header;
    }

    /**
     * Render enhanced personal information section
     */
    renderEnhancedPersonalInfo(personalInfo, container) {
        this.log('Rendering enhanced personal info:', personalInfo);

        // Create bio card
        const bioCard = document.createElement('div');
        bioCard.className = 'academic-card animate-fade-in';

        // Card header with name and title
        const cardHeader = document.createElement('div');
        cardHeader.className = 'academic-card-header';

        const profileInfo = document.createElement('div');
        profileInfo.className = 'profile-info-enhanced';

        const name = document.createElement('h3');
        name.className = 'academic-card-title profile-name-enhanced';
        name.textContent = personalInfo.name || 'Academic Profile';

        const title = document.createElement('p');
        title.className = 'list-item-subtitle profile-title-enhanced';
        title.textContent = personalInfo.title || 'Your Title';

        profileInfo.appendChild(name);
        profileInfo.appendChild(title);
        cardHeader.appendChild(profileInfo);

        // Card body with bio content
        const cardBody = document.createElement('div');
        cardBody.className = 'academic-card-body';

        // Main bio
        if (personalInfo.bio) {
            const bioText = document.createElement('p');
            bioText.className = 'list-item-description bio-text-enhanced';
            bioText.textContent = personalInfo.bio;
            cardBody.appendChild(bioText);
        }

        // Research interests
        if (personalInfo.researchInterests && personalInfo.researchInterests.length > 0) {
            const interestsTitle = document.createElement('h4');
            interestsTitle.className = 'list-item-title';
            interestsTitle.innerHTML = '<i class="fas fa-lightbulb"></i> Research Interests';

            const focusAreas = document.createElement('div');
            focusAreas.className = 'focus-areas';

            personalInfo.researchInterests.forEach(interest => {
                const interestTag = document.createElement('span');
                interestTag.className = 'focus-tag';
                interestTag.textContent = interest;
                focusAreas.appendChild(interestTag);
            });

            cardBody.appendChild(interestsTitle);
            cardBody.appendChild(focusAreas);
        }

        // Background information
        if (personalInfo.background) {
            const backgroundTitle = document.createElement('h4');
            backgroundTitle.className = 'list-item-title';
            backgroundTitle.innerHTML = '<i class="fas fa-info-circle"></i> Background';

            const backgroundText = document.createElement('p');
            backgroundText.className = 'list-item-description';
            backgroundText.textContent = personalInfo.background;

            cardBody.appendChild(backgroundTitle);
            cardBody.appendChild(backgroundText);
        }

        bioCard.appendChild(cardHeader);
        bioCard.appendChild(cardBody);
        container.appendChild(bioCard);
    }

    /**
     * Render enhanced contact information
     */
    renderEnhancedContactInfo(personalInfo, container) {
        this.log('Rendering enhanced contact info');

        const contactCard = document.createElement('div');
        contactCard.className = 'academic-card animate-fade-in';

        const cardHeader = document.createElement('div');
        cardHeader.className = 'academic-card-header';

        const cardTitle = document.createElement('h3');
        cardTitle.className = 'academic-card-title';
        cardTitle.innerHTML = '<i class="fas fa-envelope"></i> Contact Information';

        cardHeader.appendChild(cardTitle);

        const cardBody = document.createElement('div');
        cardBody.className = 'academic-card-body';

        const contactGrid = document.createElement('div');
        contactGrid.className = 'contact-grid-enhanced';

        // Essential contact fields
        const contactFields = [
            { key: 'email', icon: 'fas fa-envelope', type: 'email', label: 'Email (Institutional)' },
            { key: 'emailSecondary', icon: 'fas fa-envelope', type: 'email', label: 'Email (Personal)' },
            { key: 'location', icon: 'fas fa-map-marker-alt', type: 'text', label: 'Location' },
            { key: 'website', icon: 'fas fa-globe', type: 'url', label: 'Website' }
        ];

        contactFields.forEach(field => {
            if (personalInfo[field.key]) {
                const contactItem = this.createEnhancedContactItem(
                    field.key,
                    personalInfo[field.key],
                    field.icon,
                    field.type,
                    field.label
                );
                contactGrid.appendChild(contactItem);
            }
        });

        cardBody.appendChild(contactGrid);
        contactCard.appendChild(cardHeader);
        contactCard.appendChild(cardBody);
        container.appendChild(contactCard);
    }

    /**
     * Create enhanced contact item
     */
    createEnhancedContactItem(type, value, icon, linkType, label) {
        const item = document.createElement('div');
        item.className = 'list-item-enhanced contact-item-enhanced';

        const iconElement = document.createElement('div');
        iconElement.className = 'academic-icon academic-icon-info';
        iconElement.innerHTML = `<i class="${icon}"></i>`;

        const content = document.createElement('div');
        content.className = 'list-item-content';

        const labelElement = document.createElement('div');
        labelElement.className = 'list-item-title';
        labelElement.textContent = label;

        const valueElement = document.createElement('div');
        valueElement.className = 'list-item-description';

        if (linkType === 'email') {
            valueElement.innerHTML = `<a href="mailto:${value}" class="contact-link">${value}</a>`;
        } else if (linkType === 'tel') {
            valueElement.innerHTML = `<a href="tel:${value}" class="contact-link">${value}</a>`;
        } else if (linkType === 'url') {
            valueElement.innerHTML = `<a href="${value}" target="_blank" rel="noopener" class="contact-link">${value}</a>`;
        } else {
            valueElement.textContent = value;
        }

        content.appendChild(labelElement);
        content.appendChild(valueElement);

        item.appendChild(iconElement);
        item.appendChild(content);

        return item;
    }

    /**
     * Render personal information section (legacy method - keeping for compatibility)
     * @param {Object} personalInfo - Personal information data
     */
    renderPersonalInfo(personalInfo) {
        this.log('Rendering personal info:', personalInfo);

        // Update profile name and title
        const profileName = document.querySelector('.profile-name');
        const profileTitle = document.querySelector('.profile-title');
        const mobileTitle = document.querySelector('.mobile-title');

        if (profileName && personalInfo.name) {
            profileName.textContent = personalInfo.name;
            profileName.removeAttribute('data-i18n');
            this.log('Updated profile name');
        }

        if (profileTitle && personalInfo.title) {
            profileTitle.textContent = personalInfo.title;
            profileTitle.removeAttribute('data-i18n');
            this.log('Updated profile title');
        }

        if (mobileTitle && personalInfo.name) {
            mobileTitle.textContent = personalInfo.name;
            mobileTitle.removeAttribute('data-i18n');
            this.log('Updated mobile title');
        }

        // Update bio content
        this.renderBioContent(personalInfo);
    }

    /**
     * Render bio content with enhanced formatting
     * @param {Object} personalInfo - Personal information data
     */
    renderBioContent(personalInfo) {
        const bioContent = document.querySelector('.bio-content');
        if (!bioContent || !personalInfo.bio) {
            this.log('No bio content or element found');
            return;
        }

        this.log('Rendering bio content');

        // Main bio
        const bioText = document.createElement('p');
        bioText.textContent = personalInfo.bio;
        bioText.className = 'bio-main';

        // Research interests if available
        let interestsSection = '';
        if (personalInfo.researchInterests && personalInfo.researchInterests.length > 0) {
            const interestsList = personalInfo.researchInterests
                .map(interest => `<li>${interest}</li>`)
                .join('');
            interestsSection = `
                <div class="research-interests">
                    <h4>Research Interests</h4>
                    <ul>${interestsList}</ul>
                </div>
            `;
        }

        // Background information if available
        let backgroundSection = '';
        if (personalInfo.background) {
            backgroundSection = `
                <div class="background-info">
                    <h4>Background</h4>
                    <p>${personalInfo.background}</p>
                </div>
            `;
        }

        bioContent.innerHTML = `
            ${bioText.outerHTML}
            ${interestsSection}
            ${backgroundSection}
        `;

        this.log('Bio content rendered successfully');
    }

    /**
     * Render contact information in About section
     * @param {Object} personalInfo - Personal information data
     */
    renderContactInfo(personalInfo) {
        const aboutContactGrid = document.querySelector('#about .contact-grid');
        if (!aboutContactGrid) {
            this.log('About contact grid not found');
            return;
        }

        this.log('Rendering About section contact info');

        aboutContactGrid.innerHTML = '';

        // Essential contact fields for About section
        const essentialFields = [
            { key: 'email', icon: 'fas fa-envelope', type: 'email' },
            { key: 'emailSecondary', icon: 'fas fa-envelope', type: 'email' },
            { key: 'location', icon: 'fas fa-map-marker-alt', type: 'text' },
            { key: 'website', icon: 'fas fa-globe', type: 'url' }
        ];

        essentialFields.forEach(field => {
            if (personalInfo[field.key]) {
                const contactItem = this.createContactItem(
                    field.key,
                    personalInfo[field.key],
                    field.icon,
                    field.type
                );
                aboutContactGrid.appendChild(contactItem);
                this.log(`Added contact item: ${field.key}`);
            }
        });

        this.log('About section contact info rendered');
    }

    /**
     * Create a contact item element
     * @param {string} type - Contact type (email, phone, etc.)
     * @param {string} value - Contact value
     * @param {string} icon - Icon class
     * @param {string} linkType - Link type (email, tel, url, text)
     * @returns {HTMLElement} Contact item element
     */
    createContactItem(type, value, icon, linkType) {
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

        if (linkType === 'email') {
            valueElement.innerHTML = `<a href="mailto:${value}">${value}</a>`;
        } else if (linkType === 'tel') {
            valueElement.innerHTML = `<a href="tel:${value}">${value}</a>`;
        } else if (linkType === 'url') {
            valueElement.innerHTML = `<a href="${value}" target="_blank" rel="noopener">${value}</a>`;
        } else {
            valueElement.textContent = value;
        }

        content.appendChild(label);
        content.appendChild(valueElement);

        item.appendChild(iconElement);
        item.appendChild(content);

        return item;
    }

    /**
     * Set up event listeners for About page
     */
    setupEventListeners() {
        this.log('Setting up About page event listeners');

        // Add any About page specific event listeners here
        // For example: profile image interactions, expandable bio sections, etc.

        this.log('About page event listeners set up');
    }

    /**
     * Debug logging
     * @param {string} message - Log message
     * @param {any} data - Optional data to log
     */
    log(message, data = null) {
        if (this.debugMode) {
            const prefix = '[AboutPage]';
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
const aboutPage = new AboutPage();

// Route registration handled by app.js

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = AboutPage;
}

// Make available globally for debugging
if (typeof window !== 'undefined') {
    window.aboutPage = aboutPage;
}