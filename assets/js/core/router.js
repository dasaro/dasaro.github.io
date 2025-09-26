/**
 * Centralized Router System
 * Handles all navigation, routing, and page management
 * Provides debugging capabilities for navigation issues
 */

class Router {
    constructor() {
        this.routes = new Map();
        this.currentRoute = null;
        this.navigationData = null;
        this.debugMode = true; // Enable for debugging navigation issues

        this.init();
    }

    /**
     * Initialize router system
     */
    init() {
        this.log('Router initializing...');

        // Set up browser navigation handling
        this.setupBrowserNavigation();

        // Set up intersection observer for section detection
        this.setupSectionObserver();

        this.log('Router initialized successfully');
    }

    /**
     * Register a route with its page module
     * @param {string} routeId - Route identifier (e.g., 'about', 'education')
     * @param {Object} pageModule - Page module with render, init, cleanup methods
     * @param {Object} config - Route configuration (icon, order, etc.)
     */
    registerRoute(routeId, pageModule, config = {}) {
        this.log(`Registering route: ${routeId}`, config);

        this.routes.set(routeId, {
            id: routeId,
            module: pageModule,
            config: {
                icon: config.icon || 'fas fa-circle',
                order: config.order || 999,
                visible: config.visible !== false,
                ...config
            }
        });

        this.log(`Route registered successfully: ${routeId}`);
    }

    /**
     * Set navigation data and build navigation menu
     * @param {Object} navigationData - Navigation configuration from data
     */
    setNavigationData(navigationData) {
        this.log('Setting navigation data:', navigationData);
        this.navigationData = navigationData;
        this.buildNavigationMenu();
    }

    /**
     * Build the navigation menu based on registered routes
     */
    buildNavigationMenu() {
        const navMenu = document.querySelector('.nav-menu');
        if (!navMenu) {
            this.log('ERROR: Nav menu element not found');
            return;
        }

        this.log('Building navigation menu...');
        navMenu.innerHTML = '';

        // Get sorted sections from navigation data
        const sections = this.navigationData?.sections || [];
        const sortedSections = [...sections].sort((a, b) => a.order - b.order);

        this.log('Sorted navigation sections:', sortedSections);

        sortedSections.forEach(section => {
            const route = this.routes.get(section.key);

            if (!route) {
                this.log(`WARNING: No route registered for section: ${section.key}`);
                return;
            }

            if (!route.config.visible) {
                this.log(`Skipping hidden section: ${section.key}`);
                return;
            }

            this.log(`Creating nav item for: ${section.key}`);
            this.createNavigationItem(section, route);
        });

        this.log('Navigation menu built successfully');
    }

    /**
     * Create a navigation menu item
     * @param {Object} section - Section configuration
     * @param {Object} route - Route configuration
     */
    createNavigationItem(section, route) {
        const navMenu = document.querySelector('.nav-menu');

        const navItem = document.createElement('li');
        navItem.className = 'nav-item';

        const navLink = document.createElement('a');
        navLink.href = `#${section.key}`;
        navLink.className = 'nav-link';
        navLink.setAttribute('data-section', section.key);

        // Icon
        const icon = document.createElement('i');
        icon.className = section.icon || route.config.icon;
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
            this.navigateToRoute(section.key);
        });

        this.log(`Navigation item created for: ${section.key}`);
    }

    /**
     * Navigate to a specific route
     * @param {string} routeId - Route to navigate to
     */
    navigateToRoute(routeId) {
        this.log(`Navigating to route: ${routeId}`);

        const route = this.routes.get(routeId);
        if (!route) {
            this.log(`ERROR: Route not found: ${routeId}`);
            return;
        }

        // Update current route
        const previousRoute = this.currentRoute;
        this.currentRoute = routeId;

        // Cleanup previous route
        if (previousRoute && previousRoute !== routeId) {
            const prevRoute = this.routes.get(previousRoute);
            if (prevRoute?.module?.cleanup) {
                this.log(`Cleaning up previous route: ${previousRoute}`);
                prevRoute.module.cleanup();
            }
        }

        // Scroll to section and make it visible
        const section = document.getElementById(routeId);
        if (section) {
            // Add visible class to show the section
            section.classList.add('visible');

            section.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });

            this.log(`Section made visible: ${routeId}`);
        } else {
            this.log(`WARNING: Section element not found: ${routeId}`);
        }

        // Initialize new route
        if (route.module?.init) {
            this.log(`Initializing route: ${routeId}`);
            route.module.init();
        }

        // Update navigation state
        this.updateActiveNavigation();

        // Update URL
        this.updateURL(routeId);

        // Close mobile sidebar if open
        if (window.innerWidth < 1024) {
            this.closeMobileSidebar();
        }

        this.log(`Navigation completed to: ${routeId}`);
    }

    /**
     * Update active navigation styling
     */
    updateActiveNavigation() {
        const navLinks = document.querySelectorAll('.nav-link');

        navLinks.forEach(link => {
            const sectionId = link.getAttribute('data-section');

            if (sectionId === this.currentRoute) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });

        this.log(`Active navigation updated: ${this.currentRoute}`);
    }

    /**
     * Update browser URL without page reload
     * @param {string} routeId - Route ID
     */
    updateURL(routeId) {
        const newURL = `${window.location.origin}${window.location.pathname}#${routeId}`;
        window.history.replaceState({ route: routeId }, '', newURL);
    }

    /**
     * Set up browser navigation handling
     */
    setupBrowserNavigation() {
        // Handle browser back/forward buttons
        window.addEventListener('popstate', (e) => {
            const hash = window.location.hash.slice(1);
            if (hash && this.routes.has(hash)) {
                this.log(`Browser navigation to: ${hash}`);
                this.navigateToRoute(hash);
            }
        });

        // Handle initial page load
        const initialHash = window.location.hash.slice(1);
        if (initialHash && this.routes.has(initialHash)) {
            this.currentRoute = initialHash;
        } else {
            this.currentRoute = getDefaultRoute(); // Default route
        }

        this.log(`Initial route set to: ${this.currentRoute}`);
    }

    /**
     * Set up intersection observer for automatic section detection
     */
    setupSectionObserver() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && entry.intersectionRatio > 0.3) {
                    const sectionId = entry.target.getAttribute('data-section');
                    if (sectionId && sectionId !== this.currentRoute) {
                        this.log(`Section intersection detected: ${sectionId}`);
                        this.currentRoute = sectionId;
                        this.updateActiveNavigation();
                        this.updateURL(sectionId);
                    }
                }
            });
        }, {
            threshold: 0.3,
            rootMargin: '-50px 0px -50px 0px'
        });

        // Observe all sections
        document.querySelectorAll('.content-section').forEach(section => {
            observer.observe(section);
        });

        this.log('Section observer set up');
    }

    /**
     * Close mobile sidebar
     */
    closeMobileSidebar() {
        // This will be implemented when we refactor the main sidebar logic
        this.log('Closing mobile sidebar');
    }

    /**
     * Get current route
     * @returns {string} Current route ID
     */
    getCurrentRoute() {
        return this.currentRoute;
    }

    /**
     * Get all registered routes
     * @returns {Map} Map of all routes
     */
    getAllRoutes() {
        return this.routes;
    }

    /**
     * Debug logging
     * @param {string} message - Log message
     * @param {any} data - Optional data to log
     */
    log(message, data = null) {
        if (this.debugMode) {
            const prefix = '[Router]';
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
        this.log(`Debug mode ${enabled ? 'enabled' : 'disabled'}`);
    }
}

// Create global router instance
window.router = new Router();

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Router;
}