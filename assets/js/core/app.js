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

            this.isInitialized = true;
            this.log('Application initialized successfully');

        } catch (error) {
            this.log('ERROR: Application initialization failed:', error);
            this.showErrorMessage('Application failed to initialize. Please refresh the page.');
        }
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

        this.log('Data manager initialized');
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

        // Register About page (our proof of concept)
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

        // TODO: Register other page modules as they are created
        // this.router.registerRoute('education', window.educationPage, { ... });
        // this.router.registerRoute('experience', window.experiencePage, { ... });
        // etc.

        this.log('Page modules registration completed');
    }

    /**
     * Load and populate data
     */
    async loadAndPopulateData() {
        this.log('Loading and populating data...');

        try {
            // Load data
            const data = await this.dataManager.loadData();
            this.log('Data loaded:', data);

            // Set navigation data for router
            if (data.navigation) {
                this.router.setNavigationData(data.navigation);
            }

            // Populate page modules with data
            this.populatePages(data);

            this.log('Data populated successfully');

        } catch (error) {
            this.log('ERROR: Data loading failed:', error);
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

        // Populate About page
        const aboutPage = this.pages.get('about');
        if (aboutPage) {
            aboutPage.render(data);
        }

        // TODO: Populate other pages as they are created
        // const educationPage = this.pages.get('education');
        // if (educationPage) {
        //     educationPage.render(data);
        // }

        this.log('Pages populated with data');
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

        // Set up responsive behavior
        this.setupResponsiveBehavior();

        this.log('UI interactions set up');
    }

    /**
     * Set up sidebar controls
     */
    setupSidebarControls() {
        // Toggle button
        const toggleBtn = document.querySelector('.sidebar-toggle');
        if (toggleBtn) {
            toggleBtn.addEventListener('click', () => {
                // TODO: Implement sidebar toggle
                this.log('Sidebar toggle clicked');
            });
        }

        // Close button
        const closeBtn = document.querySelector('.sidebar-close');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                // TODO: Implement sidebar close
                this.log('Sidebar close clicked');
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