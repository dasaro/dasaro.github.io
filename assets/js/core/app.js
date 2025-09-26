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
                    // Let each page load its own data from DataManager
                    if (typeof page.loadData === 'function') {
                        page.loadData();
                    }
                    // Then render with the loaded data
                    page.render();
                    this.log(`${pageName} page populated successfully`);
                }, `${pageName} Page Rendering`) :
                () => {
                    this.log(`Populating ${pageName} page...`);
                    // Let each page load its own data from DataManager
                    if (typeof page.loadData === 'function') {
                        page.loadData();
                    }
                    // Then render with the loaded data
                    page.render();
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