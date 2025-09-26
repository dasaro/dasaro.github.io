/**
 * Main Website JavaScript
 * Coordinates all functionality and manages the user interface
 * Integrates i18n, data management, and UI interactions
 */

class AcademicWebsite {
    constructor() {
        this.isLoaded = false;
        this.currentSection = 'about';
        this.sidebarOpen = false;
        this.sidebarMinimized = false; // New: track minimized state

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

            // Note: Publications now handled by publications.js page module

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
     * Wait for all dependencies to be ready with graceful degradation
     */
    async waitForDependencies() {
        const maxAttempts = 50;
        let attempts = 0;
        const dependencyStatus = {
            dataManager: false,
            i18n: false
        };

        // Set up event listeners for dependency ready events
        const dependencyPromises = [];

        // DataManager dependency
        if (window.dataManager) {
            if (window.dataManager.isLoaded) {
                dependencyStatus.dataManager = true;
            } else {
                dependencyPromises.push(new Promise((resolve) => {
                    window.dataManager.on('dataLoaded', () => {
                        dependencyStatus.dataManager = true;
                        resolve();
                    });
                    window.dataManager.on('fallbackMode', () => {
                        console.warn('DataManager in fallback mode - continuing with limited functionality');
                        dependencyStatus.dataManager = true;
                        resolve();
                    });
                    // Fallback timeout for this dependency
                    setTimeout(() => {
                        if (!dependencyStatus.dataManager) {
                            console.warn('DataManager timeout - continuing without data');
                            dependencyStatus.dataManager = true;
                            resolve();
                        }
                    }, 5000);
                }));
            }
        }

        // i18n dependency
        if (window.i18n) {
            dependencyStatus.i18n = true;
        } else {
            dependencyPromises.push(new Promise((resolve) => {
                const checkI18n = () => {
                    if (window.i18n) {
                        dependencyStatus.i18n = true;
                        resolve();
                    }
                };
                // Check periodically
                const interval = setInterval(() => {
                    checkI18n();
                    if (dependencyStatus.i18n) {
                        clearInterval(interval);
                    }
                }, 100);
                // Fallback timeout
                setTimeout(() => {
                    clearInterval(interval);
                    if (!dependencyStatus.i18n) {
                        console.warn('i18n timeout - continuing with limited translations');
                        dependencyStatus.i18n = true;
                        resolve();
                    }
                }, 3000);
            }));
        }

        // Wait for all dependencies or timeout (with polling backup)
        try {
            await Promise.race([
                Promise.all(dependencyPromises),
                this.pollForDependencies(dependencyStatus, maxAttempts)
            ]);
        } catch (error) {
            console.warn('Dependency loading failed, continuing with available components:', error.message);
        }

        // Log final dependency status
        console.log('Dependency status:', dependencyStatus);
    }

    /**
     * Backup polling method for dependency checking
     */
    async pollForDependencies(status, maxAttempts) {
        let attempts = 0;
        while (attempts < maxAttempts) {
            if (window.dataManager?.isLoaded || window.dataManager?.fallbackMode) {
                status.dataManager = true;
            }
            if (window.i18n) {
                status.i18n = true;
            }

            if (status.dataManager && status.i18n) {
                return;
            }

            await this.sleep(100);
            attempts++;
        }

        // If we reach here, continue anyway with partial functionality
        console.warn('Some dependencies failed to load within timeout, continuing with graceful degradation');
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
        if (window.dataManager) {
            window.dataManager.on('dataUpdated', (data) => {
                this.handleDataUpdate(data);
            });

            // Listen for fallback mode
            window.dataManager.on('fallbackMode', (data) => {
                this.showFallbackModeIndicator(data);
            });
        }

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
        const sidebarToggle = document.getElementById('sidebar-toggle'); // Sidebar toggle inside sidebar
        const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
        const mainContent = document.getElementById('main-content');

        // Sidebar toggle (inside sidebar) - now handles minimize/maximize
        if (sidebarToggle) {
            console.log('Sidebar toggle found and event listener added');
            sidebarToggle.addEventListener('click', (e) => {
                console.log('Sidebar toggle clicked!');
                e.preventDefault();

                // On desktop: toggle between full and minimized
                // On mobile: close completely
                if (window.innerWidth >= 1024) {
                    this.toggleSidebarMinimize();
                } else {
                    this.toggleSidebar();
                }
            });
        }

        // Mobile menu toggle
        if (mobileMenuToggle) {
            console.log('Mobile menu toggle found and event listener added');
            mobileMenuToggle.addEventListener('click', (e) => {
                console.log('Mobile menu clicked!');
                e.preventDefault();
                this.toggleSidebar();
            });
        } else {
            console.warn('Mobile menu toggle not found!');
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
        console.log('toggleSidebar called, current state:', this.sidebarOpen);
        const sidebar = document.getElementById('sidebar');
        if (!sidebar) {
            console.error('Sidebar element not found!');
            return;
        }

        if (this.sidebarOpen) {
            console.log('Closing sidebar...');
            this.closeSidebar();
        } else {
            console.log('Opening sidebar...');
            this.openSidebar();
        }
    }

    /**
     * Toggle between full and minimized sidebar (desktop only)
     */
    toggleSidebarMinimize() {
        const sidebar = document.getElementById('sidebar');
        const mainContent = document.getElementById('main-content');

        if (this.sidebarMinimized) {
            // Expand to full sidebar
            sidebar?.classList.remove('minimized');
            sidebar?.classList.add('open');
            mainContent?.classList.remove('sidebar-minimized');
            mainContent?.classList.add('sidebar-open');
            this.sidebarMinimized = false;
            this.sidebarOpen = true;
            console.log('Sidebar expanded to full');
        } else {
            // Minimize to icons only
            sidebar?.classList.remove('open');
            sidebar?.classList.add('minimized');
            mainContent?.classList.remove('sidebar-open');
            mainContent?.classList.add('sidebar-minimized');
            this.sidebarMinimized = true;
            this.sidebarOpen = false;
            console.log('Sidebar minimized to icons');
        }
    }

    /**
     * Open sidebar
     */
    openSidebar() {
        const sidebar = document.getElementById('sidebar');
        const mainContent = document.getElementById('main-content');

        sidebar?.classList.add('open');
        sidebar?.classList.remove('minimized');
        mainContent?.classList.add('sidebar-open');
        mainContent?.classList.remove('sidebar-minimized');
        this.sidebarOpen = true;
        this.sidebarMinimized = false;

        // Set focus to first navigation item for accessibility
        const firstNavLink = sidebar?.querySelector('.nav-link');
        firstNavLink?.focus();
    }

    /**
     * Close sidebar
     */
    closeSidebar() {
        const sidebar = document.getElementById('sidebar');
        const mainContent = document.getElementById('main-content');

        sidebar?.classList.remove('open', 'minimized');
        mainContent?.classList.remove('sidebar-open', 'sidebar-minimized');
        this.sidebarOpen = false;
        this.sidebarMinimized = false;
    }

    /**
     * Populate content from data manager
     */
    async populateContent() {
        const data = window.dataManager.getData();

        // Essential UI coordination - keep these as they handle profile/navigation
        this.populatePersonalInfo(data.personalInfo);
        this.populateNavigation(data.navigation);
        this.populateContact(data.personalInfo);
        this.populateAboutContact(data.personalInfo);

        // Apply theme if specified
        if (data.theme) {
            this.applyTheme(data.theme);
        }

        // Note: Section content now handled by enhanced page modules
        // (about.js, education.js, experience.js, publications.js, etc.)
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
            profileName.removeAttribute('data-i18n'); // Remove i18n attribute
        }

        if (profileTitle && personalInfo.title) {
            profileTitle.textContent = personalInfo.title;
            profileTitle.removeAttribute('data-i18n'); // Remove i18n attribute
        }

        if (mobileTitle && personalInfo.name) {
            mobileTitle.textContent = personalInfo.name;
            mobileTitle.removeAttribute('data-i18n'); // Remove i18n attribute
        }

        // Update bio with enhanced content
        const bioContent = document.querySelector('.bio-content');
        if (bioContent && personalInfo.bio) {
            bioContent.innerHTML = `
                <p class="bio-text">${personalInfo.bio}</p>
                ${personalInfo.researchInterests ? `
                    <div class="research-interests">
                        <h4>Research Interests</h4>
                        <ul class="interests-list">
                            ${personalInfo.researchInterests.map(interest => `<li>${interest}</li>`).join('')}
                        </ul>
                    </div>
                ` : ''}
                ${personalInfo.background ? `
                    <div class="background-info">
                        <h4>Background</h4>
                        <p>${personalInfo.background}</p>
                    </div>
                ` : ''}
            `;
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

        console.log('Populating navigation with sections:', navigation.sections);

        navMenu.innerHTML = '';

        // Sort sections by order
        const sortedSections = [...navigation.sections].sort((a, b) => a.order - b.order);

        sortedSections.forEach(section => {
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
     * Populate contact information
     */
    populateContact(personalInfo) {
        const contactGrid = document.querySelector('#contact .contact-grid');
        if (!contactGrid) return;

        contactGrid.innerHTML = '';

        const contactFields = [
            { key: 'email', icon: 'fas fa-envelope', type: 'email' },
            { key: 'emailSecondary', icon: 'fas fa-envelope', type: 'email' },
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
     * Populate About section's contact information
     */
    populateAboutContact(personalInfo) {
        const aboutContactGrid = document.querySelector('#about .contact-grid');
        if (!aboutContactGrid) return;

        aboutContactGrid.innerHTML = '';

        // Show only essential contact info in About section
        const essentialFields = [
            { key: 'email', icon: 'fas fa-envelope', type: 'email' },
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
        let activeSection = 'about'; // Default to about

        // Find which section is currently in view
        sections.forEach(section => {
            const rect = section.getBoundingClientRect();
            // Check if section is in viewport (more tolerant check)
            if (rect.top <= window.innerHeight / 2 && rect.bottom >= 0) {
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
            // Ensure link is visible
            const navItem = link.closest('.nav-item');
            if (navItem) {
                navItem.style.display = 'block'; // Ensure it's always visible
            }

            if (sectionId === this.currentSection) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
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
                    // Handled by education.js module
                    break;
                case 'experience':
                    // Handled by experience.js module
                    break;
                case 'supervisedStudents':
                    // Handled by supervised-students.js module
                    break;
                case 'projects':
                    // Handled by projects.js module
                    break;
                case 'citationMetrics':
                    // Handled by citation-metrics.js module
                    break;
                case 'publications':
                    // Handled by publications.js module
                    break;
                case 'skills':
                    // Handled by skills.js module
                    break;
            }
        }
    }

    /**
     * Handle window resize
     */
    handleWindowResize() {
        // Close sidebar on mobile when resizing from desktop
        if (window.innerWidth < 1024) {
            if (this.sidebarOpen || this.sidebarMinimized) {
                this.closeSidebar();
            }
        } else {
            // Desktop: ensure sidebar is visible (either open or minimized)
            if (!this.sidebarOpen && !this.sidebarMinimized) {
                this.openSidebar();
            }
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
        // On mobile, ensure sidebar is closed
        // On desktop, open sidebar by default (but allow minimizing)
        if (window.innerWidth < 1024) {
            this.closeSidebar();
        } else {
            // Desktop: Open sidebar by default
            this.openSidebar();
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

    /**
     * Show fallback mode indicator to inform users of limited functionality
     */
    showFallbackModeIndicator(data) {
        // Create or update fallback mode banner
        let banner = document.getElementById('fallback-mode-banner');
        if (!banner) {
            banner = document.createElement('div');
            banner.id = 'fallback-mode-banner';
            banner.className = 'fallback-mode-banner';
            banner.innerHTML = `
                <div class="banner-content">
                    <i class="fas fa-exclamation-triangle"></i>
                    <span>Limited functionality: Some content may not be available due to data loading issues.</span>
                    <button class="banner-close" onclick="this.parentElement.parentElement.style.display='none'">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
            `;

            // Add banner CSS if not exists
            if (!document.getElementById('fallback-mode-styles')) {
                const style = document.createElement('style');
                style.id = 'fallback-mode-styles';
                style.textContent = `
                    .fallback-mode-banner {
                        position: fixed;
                        top: 0;
                        left: 0;
                        right: 0;
                        background: #f39c12;
                        color: white;
                        padding: 0.75rem;
                        z-index: var(--z-fixed);
                        box-shadow: var(--shadow-md);
                    }
                    .fallback-mode-banner .banner-content {
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        gap: 0.5rem;
                        max-width: 1200px;
                        margin: 0 auto;
                    }
                    .fallback-mode-banner .banner-close {
                        background: none;
                        border: none;
                        color: white;
                        cursor: pointer;
                        padding: 0.25rem;
                        margin-left: auto;
                    }
                    .fallback-mode-banner + .sidebar,
                    .fallback-mode-banner + .main-content {
                        margin-top: 50px;
                    }
                `;
                document.head.appendChild(style);
            }

            document.body.insertBefore(banner, document.body.firstChild);
        }

        console.log('Fallback mode activated:', data);
    }
}

// Initialize website when script loads
window.academicWebsite = new AcademicWebsite();