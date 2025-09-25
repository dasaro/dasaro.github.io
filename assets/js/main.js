/**
 * Main Website JavaScript
 * Coordinates all functionality and manages the user interface
 * Integrates i18n, data management, and UI interactions
 */

class AcademicWebsite {
    constructor() {
        this.isLoaded = false;
        this.currentSection = 'about';
        this.publicationsManager = null;
        this.sidebarOpen = false;

        // Initialize after DOM is loaded
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.init());
        } else {
            this.init();
        }
    }

    /**
     * Initialize the website
     */
    async init() {
        try {
            this.showLoading();

            // Wait for dependencies to be ready
            await this.waitForDependencies();

            // Set up event listeners
            this.setupEventListeners();

            // Populate content
            await this.populateContent();

            // Initialize sections
            this.initializeSections();

            // Set up navigation
            this.setupNavigation();

            // Initialize publications manager
            this.initializePublications();

            // Apply initial view state
            this.updateView();

            this.hideLoading();
            this.isLoaded = true;

            console.log('Academic website initialized successfully');
        } catch (error) {
            console.error('Failed to initialize website:', error);
            this.handleInitializationError(error);
        }
    }

    /**
     * Wait for all dependencies to be ready
     */
    async waitForDependencies() {
        const maxAttempts = 50;
        let attempts = 0;

        while ((!window.dataManager?.isLoaded || !window.i18n) && attempts < maxAttempts) {
            await this.sleep(100);
            attempts++;
        }

        if (attempts >= maxAttempts) {
            throw new Error('Dependencies failed to load within timeout');
        }
    }

    /**
     * Sleep utility function
     */
    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    /**
     * Set up all event listeners
     */
    setupEventListeners() {
        // Sidebar toggle
        this.setupSidebarControls();

        // Language change events
        document.addEventListener('languageChanged', (event) => {
            this.handleLanguageChange(event.detail);
        });

        // Data update events
        window.dataManager.on('dataUpdated', (data) => {
            this.handleDataUpdate(data);
        });

        // Window resize
        window.addEventListener('resize', () => {
            this.handleWindowResize();
        });

        // Scroll events for section visibility
        window.addEventListener('scroll', this.throttle(() => {
            this.updateActiveSection();
        }, 100));

        // Smooth scrolling for anchor links
        this.setupSmoothScrolling();

        // Keyboard navigation
        this.setupKeyboardNavigation();
    }

    /**
     * Set up sidebar controls
     */
    setupSidebarControls() {
        const sidebar = document.getElementById('sidebar');
        const sidebarToggle = document.getElementById('sidebar-toggle');
        const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
        const mainContent = document.getElementById('main-content');

        // Desktop sidebar toggle
        if (sidebarToggle) {
            sidebarToggle.addEventListener('click', () => {
                this.toggleSidebar();
            });
        }

        // Mobile menu toggle
        if (mobileMenuToggle) {
            mobileMenuToggle.addEventListener('click', () => {
                this.toggleSidebar();
            });
        }

        // Close sidebar when clicking outside (mobile)
        document.addEventListener('click', (event) => {
            if (window.innerWidth < 1024 && this.sidebarOpen) {
                if (!sidebar.contains(event.target) &&
                    !mobileMenuToggle?.contains(event.target)) {
                    this.closeSidebar();
                }
            }
        });

        // Handle escape key to close sidebar
        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape' && this.sidebarOpen) {
                this.closeSidebar();
            }
        });
    }

    /**
     * Toggle sidebar visibility
     */
    toggleSidebar() {
        const sidebar = document.getElementById('sidebar');

        if (this.sidebarOpen) {
            this.closeSidebar();
        } else {
            this.openSidebar();
        }
    }

    /**
     * Open sidebar
     */
    openSidebar() {
        const sidebar = document.getElementById('sidebar');
        sidebar?.classList.add('open');
        this.sidebarOpen = true;

        // Set focus to first navigation item for accessibility
        const firstNavLink = sidebar?.querySelector('.nav-link');
        firstNavLink?.focus();
    }

    /**
     * Close sidebar
     */
    closeSidebar() {
        const sidebar = document.getElementById('sidebar');
        sidebar?.classList.remove('open');
        this.sidebarOpen = false;
    }

    /**
     * Populate content from data manager
     */
    async populateContent() {
        const data = window.dataManager.getData();

        // Populate personal info
        this.populatePersonalInfo(data.personalInfo);

        // Populate navigation
        this.populateNavigation(data.navigation);

        // Populate sections
        this.populateEducation(data.education);
        this.populateExperience(data.experience);
        this.populatePublications(data.publications);
        this.populateSkills(data.skills);
        this.populateContact(data.personalInfo);

        // Apply theme if specified
        if (data.theme) {
            this.applyTheme(data.theme);
        }
    }

    /**
     * Populate personal information
     */
    populatePersonalInfo(personalInfo) {
        // Update profile name and title
        const profileName = document.querySelector('.profile-name');
        const profileTitle = document.querySelector('.profile-title');
        const mobileTitle = document.querySelector('.mobile-title');

        if (profileName && personalInfo.name) {
            profileName.textContent = personalInfo.name;
            profileName.setAttribute('data-i18n', ''); // Remove i18n attribute
        }

        if (profileTitle && personalInfo.title) {
            profileTitle.textContent = personalInfo.title;
            profileTitle.setAttribute('data-i18n', ''); // Remove i18n attribute
        }

        if (mobileTitle && personalInfo.name) {
            mobileTitle.textContent = personalInfo.name;
            mobileTitle.setAttribute('data-i18n', ''); // Remove i18n attribute
        }

        // Update bio
        const bioText = document.querySelector('.bio-text');
        if (bioText && personalInfo.bio) {
            bioText.textContent = personalInfo.bio;
            bioText.setAttribute('data-i18n', ''); // Remove i18n attribute
        }

        // Update document title
        if (personalInfo.name) {
            document.title = personalInfo.name + ' - Academic Profile';
        }
    }

    /**
     * Populate navigation menu
     */
    populateNavigation(navigation) {
        const navMenu = document.querySelector('.nav-menu');
        if (!navMenu || !navigation?.sections) return;

        navMenu.innerHTML = '';

        navigation.sections.forEach(section => {
            const navItem = document.createElement('li');
            navItem.className = 'nav-item';

            const navLink = document.createElement('a');
            navLink.href = `#${section.key}`;
            navLink.className = 'nav-link';
            navLink.setAttribute('data-section', section.key);

            // Icon
            const icon = document.createElement('i');
            icon.className = section.icon || 'fas fa-circle';
            navLink.appendChild(icon);

            // Text
            const text = document.createElement('span');
            text.setAttribute('data-i18n', `navigation.${section.key}`);
            text.textContent = window.i18n?.t(`navigation.${section.key}`) || section.key;
            navLink.appendChild(text);

            navItem.appendChild(navLink);
            navMenu.appendChild(navItem);

            // Add click event
            navLink.addEventListener('click', (e) => {
                e.preventDefault();
                this.navigateToSection(section.key);
                if (window.innerWidth < 1024) {
                    this.closeSidebar();
                }
            });
        });
    }

    /**
     * Populate education section
     */
    populateEducation(education) {
        const timeline = document.querySelector('#education .timeline');
        if (!timeline || !education) return;

        timeline.innerHTML = '';

        education.forEach(edu => {
            const timelineItem = this.createTimelineItem({
                title: edu.degree || edu.title,
                institution: edu.institution,
                location: edu.location,
                startDate: edu.startDate,
                endDate: edu.endDate,
                description: edu.description,
                details: [
                    edu.supervisor && `${window.i18n?.t('common.supervisor') || 'Supervisor'}: ${edu.supervisor}`,
                    edu.thesis && `${window.i18n?.t('common.thesis') || 'Thesis'}: ${edu.thesis}`,
                    edu.grade && `${window.i18n?.t('common.grade') || 'Grade'}: ${edu.grade}`
                ].filter(Boolean),
                badges: window.dataManager.applyAutomaticBadges(edu, 'education')
            });

            timeline.appendChild(timelineItem);
        });
    }

    /**
     * Populate experience section
     */
    populateExperience(experience) {
        const timeline = document.querySelector('#experience .timeline');
        if (!timeline || !experience) return;

        timeline.innerHTML = '';

        experience.forEach(exp => {
            const timelineItem = this.createTimelineItem({
                title: exp.position || exp.title,
                institution: exp.company || exp.institution,
                location: exp.location,
                startDate: exp.startDate,
                endDate: exp.endDate || (exp.current ? window.i18n?.t('common.present') || 'Present' : ''),
                description: exp.description,
                details: exp.responsibilities || [],
                badges: window.dataManager.applyAutomaticBadges(exp, 'experience')
            });

            timeline.appendChild(timelineItem);
        });
    }

    /**
     * Create timeline item element
     */
    createTimelineItem(data) {
        const template = document.getElementById('timeline-item-template');
        const item = template.content.cloneNode(true);

        // Title
        const title = item.querySelector('.timeline-title');
        if (title) title.textContent = data.title || '';

        // Institution
        const institution = item.querySelector('.timeline-institution');
        if (institution) institution.textContent = data.institution || '';

        // Period
        const period = item.querySelector('.timeline-period');
        if (period) {
            const periodText = this.formatDateRange(data.startDate, data.endDate);
            period.textContent = periodText;
        }

        // Location
        const location = item.querySelector('.timeline-location');
        if (location && data.location) {
            location.textContent = data.location;
        } else if (location) {
            location.style.display = 'none';
        }

        // Description
        const description = item.querySelector('.timeline-description');
        if (description && data.description) {
            description.textContent = data.description;

            // Add details if provided
            if (data.details && data.details.length > 0) {
                const detailsList = document.createElement('ul');
                detailsList.style.marginTop = '0.5rem';

                data.details.forEach(detail => {
                    const listItem = document.createElement('li');
                    listItem.textContent = detail;
                    detailsList.appendChild(listItem);
                });

                description.appendChild(detailsList);
            }
        }

        // Badges
        const badgesContainer = item.querySelector('.timeline-badges');
        if (badgesContainer && data.badges) {
            window.dataManager.renderBadges(data.badges, badgesContainer);
        }

        return item;
    }

    /**
     * Populate publications section
     */
    populatePublications(publications) {
        // This will be handled by the publications manager
        // Store reference for later initialization
        this.publicationsData = publications || [];
    }

    /**
     * Populate skills section
     */
    populateSkills(skills) {
        const skillsGrid = document.querySelector('#skills .skills-grid');
        if (!skillsGrid || !skills) return;

        skillsGrid.innerHTML = '';

        skills.forEach(skill => {
            const skillItem = this.createSkillItem(skill);
            skillsGrid.appendChild(skillItem);
        });
    }

    /**
     * Create skill item element
     */
    createSkillItem(skill) {
        const template = document.getElementById('skill-template');
        const item = template.content.cloneNode(true);

        // Name
        const name = item.querySelector('.skill-name');
        if (name) name.textContent = skill.name || '';

        // Level/Percentage
        const percentage = item.querySelector('.skill-percentage');
        const fill = item.querySelector('.skill-fill');

        if (skill.level !== undefined) {
            const levelValue = parseInt(skill.level) || 0;
            if (percentage) percentage.textContent = `${levelValue}%`;
            if (fill) {
                fill.style.width = `${levelValue}%`;
                // Add animation delay
                setTimeout(() => {
                    fill.style.width = `${levelValue}%`;
                }, 100);
            }
        }

        // Description
        const description = item.querySelector('.skill-description');
        if (description && skill.description) {
            description.textContent = skill.description;
        }

        // Badges
        const badgesContainer = item.querySelector('.skill-badges');
        if (badgesContainer) {
            const badges = window.dataManager.applyAutomaticBadges(skill, 'skills');
            if (skill.badges) {
                badges.push(...skill.badges);
            }
            window.dataManager.renderBadges(badges, badgesContainer);
        }

        return item;
    }

    /**
     * Populate contact information
     */
    populateContact(personalInfo) {
        const contactGrid = document.querySelector('#contact .contact-grid');
        if (!contactGrid) return;

        contactGrid.innerHTML = '';

        const contactFields = [
            { key: 'email', icon: 'fas fa-envelope', type: 'email' },
            { key: 'phone', icon: 'fas fa-phone', type: 'tel' },
            { key: 'website', icon: 'fas fa-globe', type: 'url' },
            { key: 'linkedin', icon: 'fab fa-linkedin', type: 'url' },
            { key: 'orcid', icon: 'fab fa-orcid', type: 'url' },
            { key: 'location', icon: 'fas fa-map-marker-alt', type: 'text' }
        ];

        contactFields.forEach(field => {
            if (personalInfo[field.key]) {
                const contactItem = this.createContactItem(
                    field.key,
                    personalInfo[field.key],
                    field.icon,
                    field.type
                );
                contactGrid.appendChild(contactItem);
            }
        });
    }

    /**
     * Create contact item element
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
        label.setAttribute('data-i18n', `common.${type}`);
        label.textContent = window.i18n?.t(`common.${type}`) || type;

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
     * Initialize sections visibility
     */
    initializeSections() {
        const sections = document.querySelectorAll('.content-section');

        // Set up intersection observer for fade-in animations
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, { threshold: 0.1 });

        sections.forEach(section => {
            observer.observe(section);
        });
    }

    /**
     * Set up navigation behavior
     */
    setupNavigation() {
        // Handle browser back/forward buttons
        window.addEventListener('popstate', () => {
            const hash = window.location.hash.substring(1);
            if (hash) {
                this.currentSection = hash;
                this.updateActiveNavigation();
            }
        });

        // Set initial active section
        const hash = window.location.hash.substring(1);
        if (hash) {
            this.currentSection = hash;
        }
        this.updateActiveNavigation();
    }

    /**
     * Navigate to specific section
     */
    navigateToSection(sectionId) {
        const section = document.getElementById(sectionId);
        if (section) {
            this.currentSection = sectionId;

            // Smooth scroll to section
            section.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });

            // Update URL
            history.pushState(null, '', `#${sectionId}`);

            // Update active navigation
            this.updateActiveNavigation();
        }
    }

    /**
     * Update active section based on scroll position
     */
    updateActiveSection() {
        const sections = document.querySelectorAll('.content-section');
        let activeSection = this.currentSection;

        sections.forEach(section => {
            const rect = section.getBoundingClientRect();
            if (rect.top <= 100 && rect.bottom > 100) {
                activeSection = section.id;
            }
        });

        if (activeSection !== this.currentSection) {
            this.currentSection = activeSection;
            this.updateActiveNavigation();
        }
    }

    /**
     * Update active navigation styling
     */
    updateActiveNavigation() {
        const navLinks = document.querySelectorAll('.nav-link');

        navLinks.forEach(link => {
            const sectionId = link.getAttribute('data-section');
            if (sectionId === this.currentSection) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }

    /**
     * Initialize publications manager
     */
    initializePublications() {
        // Initialize the publications manager
        if (window.PublicationsManager && this.publicationsData) {
            this.publicationsManager = new PublicationsManager(this.publicationsData);
        }
    }

    /**
     * Render publications list
     */
    renderPublications(publications) {
        const publicationsList = document.querySelector('#publications .publications-list');
        if (!publicationsList) return;

        publicationsList.innerHTML = '';

        publications.forEach(pub => {
            const pubItem = this.createPublicationItem(pub);
            publicationsList.appendChild(pubItem);
        });

        // Initialize year filter options
        this.initializePublicationFilters(publications);
    }

    /**
     * Create publication item element
     */
    createPublicationItem(publication) {
        const template = document.getElementById('publication-template');
        const item = template.content.cloneNode(true);

        // Title
        const title = item.querySelector('.publication-title');
        if (title) title.textContent = publication.title || '';

        // Authors
        const authors = item.querySelector('.publication-authors');
        if (authors) authors.textContent = publication.authors || '';

        // Venue (journal or conference)
        const venue = item.querySelector('.publication-venue');
        if (venue) {
            const venueText = publication.journal || publication.conference || '';
            venue.textContent = venueText;
        }

        // Year
        const year = item.querySelector('.publication-year');
        if (year) year.textContent = publication.year || '';

        // Links
        const linksContainer = item.querySelector('.publication-links');
        if (linksContainer && (publication.doi || publication.url || publication.pdf)) {
            linksContainer.innerHTML = '';

            if (publication.doi) {
                const doiLink = document.createElement('a');
                doiLink.href = `https://doi.org/${publication.doi}`;
                doiLink.className = 'publication-link';
                doiLink.target = '_blank';
                doiLink.rel = 'noopener';
                doiLink.textContent = 'DOI';
                linksContainer.appendChild(doiLink);
            }

            if (publication.url) {
                const urlLink = document.createElement('a');
                urlLink.href = publication.url;
                urlLink.className = 'publication-link';
                urlLink.target = '_blank';
                urlLink.rel = 'noopener';
                urlLink.textContent = 'URL';
                linksContainer.appendChild(urlLink);
            }

            if (publication.pdf) {
                const pdfLink = document.createElement('a');
                pdfLink.href = publication.pdf;
                pdfLink.className = 'publication-link';
                pdfLink.target = '_blank';
                pdfLink.rel = 'noopener';
                pdfLink.textContent = 'PDF';
                linksContainer.appendChild(pdfLink);
            }
        }

        // Badges
        const badgesContainer = item.querySelector('.publication-badges');
        if (badgesContainer) {
            const badges = window.dataManager.applyAutomaticBadges(publication, 'publications');
            if (publication.badges) {
                badges.push(...publication.badges);
            }
            window.dataManager.renderBadges(badges, badgesContainer);
        }

        return item;
    }

    /**
     * Initialize publication filters
     */
    initializePublicationFilters(publications) {
        const yearFilter = document.getElementById('year-filter');

        if (yearFilter && publications) {
            // Get unique years
            const years = [...new Set(publications.map(pub => pub.year).filter(Boolean))].sort((a, b) => b - a);

            // Clear existing options except "All Years"
            yearFilter.innerHTML = '<option value="">All Years</option>';

            // Add year options
            years.forEach(year => {
                const option = document.createElement('option');
                option.value = year;
                option.textContent = year;
                yearFilter.appendChild(option);
            });
        }
    }

    /**
     * Apply theme colors
     */
    applyTheme(theme) {
        const root = document.documentElement;

        if (theme.primaryColor) root.style.setProperty('--color-primary', theme.primaryColor);
        if (theme.secondaryColor) root.style.setProperty('--color-secondary', theme.secondaryColor);
        if (theme.accentColor) root.style.setProperty('--color-accent', theme.accentColor);
        if (theme.backgroundColor) root.style.setProperty('--bg-primary', theme.backgroundColor);
        if (theme.textColor) root.style.setProperty('--text-primary', theme.textColor);
    }

    /**
     * Handle language change
     */
    handleLanguageChange(detail) {
        // Re-apply translations to dynamic content
        this.updateDynamicTranslations();
    }

    /**
     * Update translations for dynamically generated content
     */
    updateDynamicTranslations() {
        // Update contact labels
        const contactLabels = document.querySelectorAll('.contact-label[data-i18n]');
        contactLabels.forEach(label => {
            const key = label.getAttribute('data-i18n');
            label.textContent = window.i18n.t(key);
        });

        // Update navigation text
        const navTexts = document.querySelectorAll('.nav-link span[data-i18n]');
        navTexts.forEach(span => {
            const key = span.getAttribute('data-i18n');
            span.textContent = window.i18n.t(key);
        });

        // Update badge texts
        const badgeTexts = document.querySelectorAll('.badge-text[data-i18n]');
        badgeTexts.forEach(badge => {
            const key = badge.getAttribute('data-i18n');
            badge.textContent = window.i18n.t(key);
        });
    }

    /**
     * Handle data updates
     */
    handleDataUpdate(data) {
        // Re-populate affected sections
        if (data.section) {
            switch (data.section) {
                case 'personalInfo':
                    this.populatePersonalInfo(data.data);
                    break;
                case 'education':
                    this.populateEducation(data.data);
                    break;
                case 'experience':
                    this.populateExperience(data.data);
                    break;
                case 'publications':
                    this.populatePublications(data.data);
                    break;
                case 'skills':
                    this.populateSkills(data.data);
                    break;
            }
        }
    }

    /**
     * Handle window resize
     */
    handleWindowResize() {
        // Close sidebar on mobile if window is resized to desktop
        if (window.innerWidth >= 1024 && this.sidebarOpen) {
            this.openSidebar(); // Ensure desktop sidebar is properly displayed
        }
    }

    /**
     * Set up smooth scrolling for anchor links
     */
    setupSmoothScrolling() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                const href = anchor.getAttribute('href');
                const target = document.querySelector(href);

                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }

    /**
     * Set up keyboard navigation
     */
    setupKeyboardNavigation() {
        document.addEventListener('keydown', (e) => {
            // Alt + number keys for quick section navigation
            if (e.altKey && e.key >= '1' && e.key <= '6') {
                e.preventDefault();
                const sectionIndex = parseInt(e.key) - 1;
                const sections = ['about', 'education', 'experience', 'publications', 'skills', 'contact'];
                if (sections[sectionIndex]) {
                    this.navigateToSection(sections[sectionIndex]);
                }
            }

            // Alt + L for language toggle
            if (e.altKey && e.key.toLowerCase() === 'l') {
                e.preventDefault();
                window.i18n?.toggleLanguage();
            }
        });
    }

    /**
     * Utility: Throttle function calls
     */
    throttle(func, wait) {
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
     * Format date range for display
     */
    formatDateRange(startDate, endDate) {
        const formatDate = (dateStr) => {
            if (!dateStr) return '';
            const date = new Date(dateStr);
            return date.toLocaleDateString(window.i18n?.getCurrentLanguage() || 'en', {
                year: 'numeric',
                month: 'short'
            });
        };

        const start = formatDate(startDate);
        const end = endDate === 'Present' || endDate === 'Presente' ? endDate : formatDate(endDate);

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
     * Show loading indicator
     */
    showLoading() {
        const loading = document.getElementById('loading');
        loading?.classList.remove('hidden');
    }

    /**
     * Hide loading indicator
     */
    hideLoading() {
        const loading = document.getElementById('loading');
        loading?.classList.add('hidden');
    }

    /**
     * Update view based on current state
     */
    updateView() {
        // Ensure sidebar is properly configured for current screen size
        if (window.innerWidth >= 1024) {
            this.openSidebar();
        } else {
            this.closeSidebar();
        }

        // Update active section
        this.updateActiveNavigation();
    }

    /**
     * Handle initialization errors
     */
    handleInitializationError(error) {
        console.error('Website initialization failed:', error);

        const loading = document.getElementById('loading');
        if (loading) {
            loading.innerHTML = `
                <div class="loading-spinner">
                    <i class="fas fa-exclamation-triangle" style="color: var(--color-danger);"></i>
                    <p style="margin-top: 1rem;">Failed to load website. Please refresh the page.</p>
                </div>
            `;
        }
    }
}

// Initialize website when script loads
window.academicWebsite = new AcademicWebsite();