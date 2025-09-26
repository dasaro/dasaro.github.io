/**
 * Main Application Controller
 * Orchestrates the modular architecture
 * Handles initialization and coordination between modules
 */

class App {
    constructor() {
        this.dataManager = null;
        this.router = null;
        this.pages = new Map();
        this.isInitialized = false;
        this.debugMode = true;

        this.log('App constructor called');
    }

    /**
     * Initialize the application
     */
    async init() {
        this.log('Initializing application...');

        try {
            // Initialize core utilities first
            await this.initializeCoreUtils();

            // Initialize data manager
            await this.initializeDataManager();

            // Initialize router
            this.initializeRouter();

            // Register page modules
            this.registerPageModules();

            // Load and populate data
            await this.loadAndPopulateData();

            // Initialize i18n system
            await this.initializeI18n();

            // Set up theme
            this.initializeTheme();

            // Set up UI interactions
            this.setupUIInteractions();

            // Add hidden icons for sticky header system (invisible but needed for sticky header)
            this.enhanceSectionHeaders();

            // Set up sticky headers
            this.setupStickyHeaders();

            // Initialize sidebar visibility
            this.initializeSidebar();

            // Make all sections visible
            this.showAllSections();

            // Navigate to initial route
            this.showInitialPage();

            // Hide loading spinner
            this.hideLoading();

            this.isInitialized = true;
            this.log('Application initialized successfully');

        } catch (error) {
            this.log('ERROR: Application initialization failed:', error);

            // Hide loading spinner on error
            this.hideLoading();

            if (window.errorHandler) {
                window.errorHandler.handleError(error, 'App Initialization', true);
            }
            this.showErrorMessage('Application failed to initialize. Please refresh the page.');
        }
    }

    /**
     * Initialize core utility systems
     */
    async initializeCoreUtils() {
        this.log('Initializing core utilities...');

        // Initialize performance utilities
        if (window.PerformanceUtils) {
            await window.PerformanceUtils.setupLazyLoading();

            // Preload critical resources (only above-the-fold content)
            const criticalResources = [
                { href: 'assets/css/main.css', as: 'style' }
                // Note: Profile image removed from preload as it's in sidebar (not immediately visible)
                // Note: PDF preloading removed as 'document' is not a valid 'as' value
            ];

            window.PerformanceUtils.preloadResources(criticalResources);
            this.log('Performance utilities initialized with resource preloading');
        }

        // Initialize accessibility manager
        if (window.AccessibilityManager) {
            // Already auto-initialized, but we can configure it
            this.log('Accessibility manager initialized');
        }

        // Error handler is already auto-initialized
        if (window.ErrorHandler) {
            this.log('Error handler initialized');
        }

        this.log('Core utilities initialized');
    }

    /**
     * Initialize data manager
     */
    async initializeDataManager() {
        this.log('Initializing data manager...');

        if (typeof DataManager === 'undefined') {
            throw new Error('DataManager not loaded');
        }

        this.dataManager = new DataManager();
        await this.dataManager.init();

        // Make data manager globally accessible
        window.dataManager = this.dataManager;

        this.log('Data manager initialized');
        this.log('Global dataManager assigned:', !!window.dataManager);
        this.log('Global dataManager isLoaded:', window.dataManager.isLoaded);
        this.log('Global dataManager data keys:', Object.keys(window.dataManager.data || {}));
    }

    /**
     * Initialize router
     */
    initializeRouter() {
        this.log('Initializing router...');

        if (typeof window.router === 'undefined') {
            throw new Error('Router not available');
        }

        this.router = window.router;

        // Enable debug mode
        this.router.setDebugMode(this.debugMode);

        this.log('Router initialized');
    }

    /**
     * Register page modules
     */
    registerPageModules() {
        this.log('Registering page modules...');

        // About page
        if (typeof window.aboutPage !== 'undefined') {
            this.router.registerRoute('about', window.aboutPage, {
                icon: 'fas fa-user',
                order: 1,
                visible: true
            });
            this.pages.set('about', window.aboutPage);
            this.log('About page registered');
        } else {
            this.log('WARNING: About page module not found');
        }

        // Education page
        if (typeof window.educationPage !== 'undefined') {
            this.router.registerRoute('education', window.educationPage, {
                icon: 'fas fa-graduation-cap',
                order: 2,
                visible: true
            });
            this.pages.set('education', window.educationPage);
            this.log('Education page registered');
        } else {
            this.log('WARNING: Education page module not found');
        }

        // Experience page
        if (typeof window.experiencePage !== 'undefined') {
            this.router.registerRoute('experience', window.experiencePage, {
                icon: 'fas fa-briefcase',
                order: 3,
                visible: true
            });
            this.pages.set('experience', window.experiencePage);
            this.log('Experience page registered');
        } else {
            this.log('WARNING: Experience page module not found');
        }

        // Contact page
        if (typeof window.contactPage !== 'undefined') {
            this.router.registerRoute('contact', window.contactPage, {
                icon: 'fas fa-envelope',
                order: 9,
                visible: true
            });
            this.pages.set('contact', window.contactPage);
            this.log('Contact page registered');
        } else {
            this.log('WARNING: Contact page module not found');
        }

        // Publications page
        if (typeof window.publicationsPage !== 'undefined') {
            this.router.registerRoute('publications', window.publicationsPage, {
                icon: 'fas fa-book',
                order: 4,
                visible: true
            });
            this.pages.set('publications', window.publicationsPage);
            this.log('Publications page registered');
        } else {
            this.log('WARNING: Publications page module not found');
        }

        // Citation Metrics page
        if (typeof window.citationMetricsPage !== 'undefined') {
            this.router.registerRoute('citation-metrics', window.citationMetricsPage, {
                icon: 'fas fa-chart-line',
                order: 5,
                visible: true
            });
            this.pages.set('citation-metrics', window.citationMetricsPage);
            this.log('Citation Metrics page registered');
        } else {
            this.log('WARNING: Citation Metrics page module not found');
        }

        // Supervised Students page
        if (typeof window.supervisedStudentsPage !== 'undefined') {
            this.router.registerRoute('supervised-students', window.supervisedStudentsPage, {
                icon: 'fas fa-user-graduate',
                order: 6,
                visible: true
            });
            this.pages.set('supervised-students', window.supervisedStudentsPage);
            this.log('Supervised Students page registered');
        } else {
            this.log('WARNING: Supervised Students page module not found');
        }

        // Projects page
        if (typeof window.projectsPage !== 'undefined') {
            this.router.registerRoute('projects', window.projectsPage, {
                icon: 'fas fa-project-diagram',
                order: 7,
                visible: true
            });
            this.pages.set('projects', window.projectsPage);
            this.log('Projects page registered');
        } else {
            this.log('WARNING: Projects page module not found');
        }

        // Skills page
        if (typeof window.skillsPage !== 'undefined') {
            this.router.registerRoute('skills', window.skillsPage, {
                icon: 'fas fa-cogs',
                order: 8,
                visible: true
            });
            this.pages.set('skills', window.skillsPage);
            this.log('Skills page registered');
        } else {
            this.log('WARNING: Skills page module not found');
        }

        // Professional Service page
        if (typeof window.professionalServicePage !== 'undefined') {
            this.router.registerRoute('professional-service', window.professionalServicePage, {
                icon: 'fas fa-hands-helping',
                order: 9,
                visible: true
            });
            this.pages.set('professional-service', window.professionalServicePage);
            this.log('Professional Service page registered');
        } else {
            this.log('WARNING: Professional Service page module not found');
        }

        // Reviewing page
        if (typeof window.reviewingPage !== 'undefined') {
            this.router.registerRoute('reviewing', window.reviewingPage, {
                icon: 'fas fa-search',
                order: 10,
                visible: true
            });
            this.pages.set('reviewing', window.reviewingPage);
            this.log('Reviewing page registered');
        } else {
            this.log('WARNING: Reviewing page module not found');
        }

        // Invited Talks page
        if (typeof window.invitedTalksPage !== 'undefined') {
            this.router.registerRoute('invited-talks', window.invitedTalksPage, {
                icon: 'fas fa-microphone',
                order: 11,
                visible: true
            });
            this.pages.set('invited-talks', window.invitedTalksPage);
            this.log('Invited Talks page registered');
        } else {
            this.log('WARNING: Invited Talks page module not found');
        }

        // Research Groups page
        if (typeof window.researchGroupsPage !== 'undefined') {
            this.router.registerRoute('research-groups', window.researchGroupsPage, {
                icon: 'fas fa-users',
                order: 12,
                visible: true
            });
            this.pages.set('research-groups', window.researchGroupsPage);
            this.log('Research Groups page registered');
        } else {
            this.log('WARNING: Research Groups page module not found');
        }

        // Academic Affiliations page
        if (typeof window.academicAffiliationsPage !== 'undefined') {
            this.router.registerRoute('academic-affiliations', window.academicAffiliationsPage, {
                icon: 'fas fa-university',
                order: 13,
                visible: true
            });
            this.pages.set('academic-affiliations', window.academicAffiliationsPage);
            this.log('Academic Affiliations page registered');
        } else {
            this.log('WARNING: Academic Affiliations page module not found');
        }

        // Editorial Boards page
        if (typeof window.editorialBoardsPage !== 'undefined') {
            this.router.registerRoute('editorial-boards', window.editorialBoardsPage, {
                icon: 'fas fa-edit',
                order: 14,
                visible: true
            });
            this.pages.set('editorial-boards', window.editorialBoardsPage);
            this.log('Editorial Boards page registered');
        } else {
            this.log('WARNING: Editorial Boards page module not found');
        }

        this.log(`Page modules registration completed. Registered ${this.pages.size} pages.`);
    }

    /**
     * Load and populate data
     */
    async loadAndPopulateData() {
        this.log('Loading and populating data...');

        // Wrap in error handler
        const safeLoadData = window.errorHandler ?
            window.errorHandler.wrapAsync(async () => {
                // Load data with performance measurement
                const startTime = performance.now();
                const data = await this.dataManager.loadData();
                const loadTime = performance.now() - startTime;

                if (window.PerformanceUtils) {
                    console.log(`Data loading took ${loadTime.toFixed(2)}ms`);
                }

                this.log('Data loaded:', data);
                return data;
            }, 'Data Loading') :
            async () => await this.dataManager.loadData();

        try {
            const data = await safeLoadData();

            // Set navigation data for router
            if (data.navigation) {
                this.router.setNavigationData(data.navigation);
            }

            // Populate page modules with data using batched DOM updates
            this.populatePages(data);

            this.log('Data populated successfully');

        } catch (error) {
            this.log('ERROR: Data loading failed:', error);
            if (window.errorHandler) {
                window.errorHandler.handleError(error, 'Data Loading', false);
            }
            this.log('Attempting to use fallback data...');

            // Try to use fallback data
            const fallbackData = this.dataManager.getEmptyDataStructure();
            this.populatePages(fallbackData);
        }
    }

    /**
     * Populate pages with data
     * @param {Object} data - Application data
     */
    populatePages(data) {
        this.log('Populating pages with data...');

        // Use performance measurement
        const startTime = performance.now();

        // Populate all registered pages with error boundaries
        this.pages.forEach((page, pageName) => {
            const safeRender = window.errorHandler ?
                () => window.errorHandler.safeDOMOperation(() => {
                    this.log(`Populating ${pageName} page...`);
                    // Check if page has loadData method (new modular pattern)
                    if (typeof page.loadData === 'function') {
                        // New pattern: Let page load its own data from DataManager
                        page.loadData();
                        page.render();
                    } else {
                        // Legacy pattern: Pass full data object to render method
                        page.render(data);
                    }
                    this.log(`${pageName} page populated successfully`);
                }, `${pageName} Page Rendering`) :
                () => {
                    this.log(`Populating ${pageName} page...`);
                    // Check if page has loadData method (new modular pattern)
                    if (typeof page.loadData === 'function') {
                        // New pattern: Let page load its own data from DataManager
                        page.loadData();
                        page.render();
                    } else {
                        // Legacy pattern: Pass full data object to render method
                        page.render(data);
                    }
                    this.log(`${pageName} page populated successfully`);
                };

            safeRender();
        });

        // Performance logging
        const populationTime = performance.now() - startTime;
        if (window.PerformanceUtils) {
            console.log(`Page population took ${populationTime.toFixed(2)}ms`);
        }

        this.log(`Pages populated with data. Populated ${this.pages.size} pages.`);
    }

    /**
     * Initialize i18n system
     */
    async initializeI18n() {
        this.log('Initializing i18n system...');

        if (typeof window.i18n !== 'undefined') {
            // i18n is already initialized globally
            this.log('i18n system already available');
        } else {
            this.log('WARNING: i18n system not found');
        }
    }

    /**
     * Initialize theme system
     */
    initializeTheme() {
        this.log('Initializing theme system...');

        // Basic theme initialization
        // This can be expanded later with a dedicated theme manager

        this.log('Theme system initialized');
    }

    /**
     * Set up UI interactions
     */
    setupUIInteractions() {
        this.log('Setting up UI interactions...');

        // Set up sidebar controls
        this.setupSidebarControls();

        // Set up keyboard navigation
        this.setupKeyboardNavigation();

        // Set up responsive behavior with performance optimization
        this.setupResponsiveBehavior();

        // Set up optimized scroll handling
        this.setupOptimizedScrolling();

        this.log('UI interactions set up');
    }

    /**
     * Set up optimized scrolling with performance utilities
     */
    setupOptimizedScrolling() {
        if (window.PerformanceUtils) {
            const optimizedScrollHandler = window.PerformanceUtils.optimizeScroll(() => {
                // Handle scroll events efficiently
                const scrollTop = window.scrollY;

                // Update navigation active state
                if (this.router && this.router.updateActiveNavigation) {
                    this.router.updateActiveNavigation(scrollTop);
                }

                // Handle scroll-dependent UI changes
                document.body.classList.toggle('scrolled', scrollTop > 50);
            });

            window.addEventListener('scroll', optimizedScrollHandler, { passive: true });
            this.log('Optimized scrolling set up');
        }
    }

    /**
     * Set up sidebar controls
     */
    setupSidebarControls() {
        // Initialize sidebar state
        this.sidebarMinimized = false;

        // Toggle button (hamburger)
        const toggleBtn = document.querySelector('.sidebar-toggle, #sidebar-toggle');
        if (toggleBtn) {
            toggleBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.log('Sidebar toggle clicked');

                // On desktop: toggle between full and minimized
                // On mobile: toggle between open and closed
                if (window.innerWidth >= 1024) {
                    this.toggleSidebarMinimize();
                } else {
                    this.toggleSidebar();
                }
            });
        }

        // Close button (if exists)
        const closeBtn = document.querySelector('.sidebar-close');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                this.closeSidebar();
            });
        }

        // Mobile menu toggle
        const mobileToggle = document.querySelector('#mobile-menu-toggle');
        if (mobileToggle) {
            mobileToggle.addEventListener('click', (e) => {
                e.preventDefault();
                this.toggleSidebar();
            });
        }
    }

    /**
     * Set up keyboard navigation
     */
    setupKeyboardNavigation() {
        document.addEventListener('keydown', (e) => {
            // Alt + number keys for quick section navigation
            if (e.altKey && e.key >= '1' && e.key <= '9') {
                e.preventDefault();
                const sectionIndex = parseInt(e.key) - 1;
                const sections = ['about', 'education', 'experience', 'publications', 'citation-metrics', 'supervised-students', 'projects', 'skills', 'contact'];

                if (sections[sectionIndex]) {
                    this.router.navigateToRoute(sections[sectionIndex]);
                    this.log(`Keyboard navigation to: ${sections[sectionIndex]}`);
                }
            }
        });
    }

    /**
     * Set up responsive behavior
     */
    setupResponsiveBehavior() {
        window.addEventListener('resize', () => {
            // Handle responsive behavior
            this.log('Window resized');
        });
    }

    /**
     * Show error message to user
     * @param {string} message - Error message
     */
    showErrorMessage(message) {
        // Create or update error message display
        let errorDiv = document.getElementById('app-error');

        if (!errorDiv) {
            errorDiv = document.createElement('div');
            errorDiv.id = 'app-error';
            errorDiv.style.cssText = `
                position: fixed;
                top: 20px;
                right: 20px;
                background: #e74c3c;
                color: white;
                padding: 1rem;
                border-radius: 4px;
                z-index: 10000;
                max-width: 300px;
            `;
            document.body.appendChild(errorDiv);
        }

        errorDiv.textContent = message;

        // Auto-hide after 10 seconds
        setTimeout(() => {
            if (errorDiv.parentNode) {
                errorDiv.parentNode.removeChild(errorDiv);
            }
        }, 10000);
    }

    /**
     * Toggle sidebar open/closed (mobile)
     */
    toggleSidebar() {
        const sidebar = document.getElementById('sidebar');
        const mainContent = document.querySelector('.main-content');

        if (!sidebar) return;

        if (sidebar.classList.contains('open')) {
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
        const mainContent = document.querySelector('.main-content');

        if (sidebar) {
            sidebar.classList.add('open');
            sidebar.classList.remove('minimized');
        }

        if (mainContent) {
            mainContent.classList.add('sidebar-open');
            mainContent.classList.remove('sidebar-minimized');
        }

        this.log('Sidebar opened');
    }

    /**
     * Close sidebar
     */
    closeSidebar() {
        const sidebar = document.getElementById('sidebar');
        const mainContent = document.querySelector('.main-content');

        if (sidebar) {
            sidebar.classList.remove('open', 'minimized');
        }

        if (mainContent) {
            mainContent.classList.remove('sidebar-open', 'sidebar-minimized');
        }

        this.log('Sidebar closed');
    }

    /**
     * Toggle between full and minimized sidebar (desktop)
     */
    toggleSidebarMinimize() {
        const sidebar = document.getElementById('sidebar');
        const mainContent = document.querySelector('.main-content');

        if (!sidebar) return;

        if (this.sidebarMinimized) {
            // Expand to full sidebar
            sidebar.classList.remove('minimized');
            sidebar.classList.add('open');

            if (mainContent) {
                mainContent.classList.remove('sidebar-minimized');
                mainContent.classList.add('sidebar-open');
            }

            this.sidebarMinimized = false;
            this.log('Sidebar expanded');
        } else {
            // Minimize sidebar
            sidebar.classList.add('minimized', 'open');

            if (mainContent) {
                mainContent.classList.add('sidebar-minimized');
                mainContent.classList.remove('sidebar-open');
            }

            this.sidebarMinimized = true;
            this.log('Sidebar minimized');
        }
    }

    /**
     * Initialize sidebar visibility and behavior
     */
    initializeSidebar() {
        this.log('Initializing sidebar...');

        const sidebar = document.getElementById('sidebar');
        const mainContent = document.querySelector('.main-content');

        if (!sidebar) {
            this.log('WARNING: Sidebar element not found');
            return;
        }

        // On desktop (>= 1024px), show sidebar by default
        if (window.innerWidth >= 1024) {
            sidebar.classList.add('open');
            if (mainContent) {
                mainContent.classList.add('sidebar-open');
            }
            this.log('Sidebar opened for desktop view');
        }

        this.log('Sidebar initialized');
    }

    /**
     * Make all content sections visible by adding 'visible' class
     */
    showAllSections() {
        this.log('Making all sections visible...');

        const sections = document.querySelectorAll('.content-section');
        sections.forEach(section => {
            section.classList.add('visible');
        });

        this.log(`Made ${sections.length} sections visible`);
    }

    /**
     * Navigate to initial page after app is fully initialized
     */
    showInitialPage() {
        this.log('Showing initial page...');

        // Get initial route from URL hash or default to about
        const hash = window.location.hash.slice(1);
        const initialRoute = (hash && this.router.routes.has(hash)) ? hash : 'about';

        this.log(`Navigating to initial route: ${initialRoute}`);
        this.router.navigateToRoute(initialRoute);
    }

    /**
     * Show loading spinner
     */
    showLoading() {
        const loading = document.getElementById('loading');
        if (loading) {
            loading.classList.remove('hidden');
            loading.style.display = 'flex';
        }
    }

    /**
     * Hide loading spinner
     */
    hideLoading() {
        const loading = document.getElementById('loading');
        if (loading) {
            loading.classList.add('hidden');
            loading.style.display = 'none';
        }
    }

    /**
     * Debug logging
     * @param {string} message - Log message
     * @param {any} data - Optional data to log
     */
    log(message, data = null) {
        if (this.debugMode) {
            const prefix = '[App]';
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

        if (this.router) {
            this.router.setDebugMode(enabled);
        }

        this.pages.forEach(page => {
            if (page.setDebugMode) {
                page.setDebugMode(enabled);
            }
        });

        this.log(`Debug mode ${enabled ? 'enabled' : 'disabled'}`);
    }

    /**
     * Enhance section headers with hidden icons (for sticky header system)
     */
    enhanceSectionHeaders() {
        this.log('Enhancing section headers with icons...');

        // Icon mapping for each section
        const sectionIcons = {
            'about': 'fas fa-user',
            'education': 'fas fa-graduation-cap',
            'experience': 'fas fa-briefcase',
            'publications': 'fas fa-book',
            'citation-metrics': 'fas fa-chart-line',
            'supervised-students': 'fas fa-user-graduate',
            'projects': 'fas fa-project-diagram',
            'skills': 'fas fa-cogs',
            'professional-service': 'fas fa-hands-helping',
            'reviewing': 'fas fa-clipboard-check',
            'invited-talks': 'fas fa-microphone-alt',
            'research-groups': 'fas fa-users',
            'academic-affiliations': 'fas fa-university',
            'editorial-boards': 'fas fa-edit',
            'contact': 'fas fa-envelope'
        };

        // Icon colors for each section
        const sectionColors = {
            'about': 'academic-icon-primary',
            'education': 'academic-icon-success',
            'experience': 'academic-icon-secondary',
            'publications': 'academic-icon-info',
            'citation-metrics': 'academic-icon-warning',
            'supervised-students': 'academic-icon-primary',
            'projects': 'academic-icon-success',
            'skills': 'academic-icon-secondary',
            'professional-service': 'academic-icon-info',
            'reviewing': 'academic-icon-warning',
            'invited-talks': 'academic-icon-warning',
            'research-groups': 'academic-icon-primary',
            'academic-affiliations': 'academic-icon-success',
            'editorial-boards': 'academic-icon-primary',
            'contact': 'academic-icon-info'
        };

        // Add icons to all section headers
        Object.keys(sectionIcons).forEach(sectionId => {
            const section = document.getElementById(sectionId);
            if (section) {
                const header = section.querySelector('.section-header');
                if (header && !header.querySelector('.section-icon')) {
                    // Create icon element (hidden for sticky header use only)
                    const iconWrapper = document.createElement('div');
                    iconWrapper.className = `section-icon academic-icon ${sectionColors[sectionId] || 'academic-icon-primary'}`;
                    iconWrapper.style.display = 'none'; // Hide the circular icon, keep for sticky header

                    const icon = document.createElement('i');
                    icon.className = sectionIcons[sectionId];

                    iconWrapper.appendChild(icon);

                    // Insert hidden icon at the beginning of the header
                    header.insertBefore(iconWrapper, header.firstChild);

                    this.log(`Added icon to ${sectionId} section`);
                }
            }
        });
    }

    /**
     * Set up sticky headers for sections
     */
    setupStickyHeaders() {
        this.log('Setting up sticky headers...');

        // Create the sticky header container
        const stickyContainer = document.createElement('div');
        stickyContainer.id = 'sticky-section-header';
        stickyContainer.className = 'sticky-section-header';
        stickyContainer.style.display = 'none';
        document.body.appendChild(stickyContainer);

        let currentSection = null;

        // Create intersection observer for section headers
        const headerObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                const section = entry.target.closest('.content-section');
                const sectionId = section?.getAttribute('id');

                if (!entry.isIntersecting && entry.boundingClientRect.top < 0) {
                    // Header scrolled above viewport - show sticky header
                    // But only if we're not at the top of the page
                    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
                    if (section && sectionId !== currentSection && scrollTop > 100) {
                        currentSection = sectionId;
                        const header = section.querySelector('.section-header');

                        if (header) {
                            // Get section title and icon
                            const title = header.querySelector('h2')?.textContent || '';
                            const icon = header.querySelector('.section-icon i');
                            const iconClass = icon ? icon.className : 'fas fa-circle';
                            const iconWrapperClass = header.querySelector('.section-icon')?.className || 'section-icon academic-icon';

                            // Add transition class for smooth animation
                            stickyContainer.classList.add('transitioning');

                            // Small delay for transition effect
                            setTimeout(() => {
                                // Update sticky header content
                                stickyContainer.innerHTML = `
                                    <div class="sticky-header-content">
                                        <div class="${iconWrapperClass} sticky-icon">
                                            <i class="${iconClass}"></i>
                                        </div>
                                        <h3 class="sticky-title">${title}</h3>
                                    </div>
                                `;

                                // Remove transition class after content update
                                setTimeout(() => {
                                    stickyContainer.classList.remove('transitioning');
                                }, 50);
                            }, 150);

                            stickyContainer.style.display = 'block';
                            stickyContainer.classList.add('visible');
                        }
                    }
                } else if (entry.isIntersecting) {
                    // Header is visible - hide sticky header
                    if (sectionId === currentSection) {
                        stickyContainer.classList.remove('visible');
                        setTimeout(() => {
                            if (!stickyContainer.classList.contains('visible')) {
                                stickyContainer.style.display = 'none';
                            }
                        }, 300);
                        currentSection = null;
                    }
                }
            });
        }, {
            rootMargin: '0px',
            threshold: [0, 1]
        });

        // Observe all section headers
        document.querySelectorAll('.content-section .section-header').forEach(header => {
            headerObserver.observe(header);
        });

        // Watch for sidebar toggle to adjust sticky header position
        const sidebarToggle = document.getElementById('sidebar-toggle');
        if (sidebarToggle) {
            sidebarToggle.addEventListener('click', () => {
                // Small delay to sync with sidebar animation
                setTimeout(() => {
                    const isHidden = document.body.classList.contains('sidebar-hidden');
                    if (isHidden) {
                        stickyContainer.style.left = '0';
                    } else {
                        stickyContainer.style.left = window.innerWidth > 1024 ? '300px' : '0';
                    }
                }, 50);
            });
        }

        // Adjust on window resize
        window.addEventListener('resize', () => {
            const isHidden = document.body.classList.contains('sidebar-hidden');
            if (!isHidden && window.innerWidth > 1024) {
                stickyContainer.style.left = '300px';
            } else {
                stickyContainer.style.left = '0';
            }
        });

        // Hide sticky header when at the very top of the page
        window.addEventListener('scroll', () => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            if (scrollTop <= 50) {
                stickyContainer.classList.remove('visible');
                setTimeout(() => {
                    if (!stickyContainer.classList.contains('visible')) {
                        stickyContainer.style.display = 'none';
                    }
                }, 300);
                currentSection = null;
            }
        });

        this.log('Sticky headers set up successfully');
    }
}

// Create global app instance
const app = new App();

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        app.init();
    });
} else {
    // DOM already loaded
    app.init();
}

// Make available globally for debugging
window.app = app;

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = App;
}