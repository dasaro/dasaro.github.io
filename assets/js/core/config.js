/**
 * Centralized Configuration System
 * Single source of truth for routes, icons, and hardcoded values
 */

export const APP_CONFIG = {
    // Route Configuration - Single source of truth
    routes: {
        about: {
            id: 'about',
            icon: 'fas fa-user',
            iconClass: 'academic-icon-primary',
            order: 1,
            title: 'About'
        },
        education: {
            id: 'education',
            icon: 'fas fa-graduation-cap',
            iconClass: 'academic-icon-success',
            order: 2,
            title: 'Education'
        },
        experience: {
            id: 'experience',
            icon: 'fas fa-briefcase',
            iconClass: 'academic-icon-secondary',
            order: 3,
            title: 'Experience'
        },
        publications: {
            id: 'publications',
            icon: 'fas fa-book',
            iconClass: 'academic-icon-info',
            order: 4,
            title: 'Publications'
        },
        projects: {
            id: 'projects',
            icon: 'fas fa-project-diagram',
            iconClass: 'academic-icon-success',
            order: 5,
            title: 'Projects'
        },
        skills: {
            id: 'skills',
            icon: 'fas fa-cogs',
            iconClass: 'academic-icon-secondary',
            order: 6,
            title: 'Skills'
        },
        contact: {
            id: 'contact',
            icon: 'fas fa-envelope',
            iconClass: 'academic-icon-info',
            order: 7,
            title: 'Contact'
        }
    },

    // Default route
    defaultRoute: 'about',

    // Complete section list for iteration
    allSections: ['about', 'education', 'experience', 'publications', 'citation-metrics', 'supervised-students', 'projects', 'skills', 'contact'],

    // Icon system - centralized icon classes
    icons: {
        // Navigation icons
        user: 'fas fa-user',
        education: 'fas fa-graduation-cap',
        briefcase: 'fas fa-briefcase',
        book: 'fas fa-book',
        project: 'fas fa-project-diagram',
        cogs: 'fas fa-cogs',
        envelope: 'fas fa-envelope',

        // Content icons
        calendar: 'fas fa-calendar-alt',
        location: 'fas fa-map-marker-alt',
        university: 'fas fa-university',
        building: 'fas fa-building',
        phone: 'fas fa-phone',
        email: 'fas fa-envelope',
        website: 'fas fa-globe',
        external: 'fas fa-external-link-alt',

        // Status icons
        check: 'fas fa-check-circle',
        current: 'fas fa-check-circle',
        star: 'fas fa-star',
        clock: 'fas fa-clock',
        info: 'fas fa-info-circle',
        trophy: 'fas fa-trophy',
        tasks: 'fas fa-tasks',

        // Badge icons
        featured: 'fas fa-star',
        recent: 'fas fa-clock',
        highlight: 'fas fa-bookmark',
        published: 'fas fa-check-circle',
        inProgress: 'fas fa-spinner',
        completed: 'fas fa-check',
        ongoing: 'fas fa-play',
        archived: 'fas fa-archive'
    },

    // Common HTML templates to reduce innerHTML hardcoding
    templates: {
        sectionHeader: (icon, text) => `<i class="${icon}"></i> ${text}`,
        badge: (icon, text) => `<i class="${icon}"></i> ${text}`,
        link: (url, icon, text) => `<a href="${url}" target="_blank" rel="noopener"><i class="${icon}"></i> ${text}</a>`,
        email: (email) => `<a href="mailto:${email}">${email}</a>`,
        phone: (phone) => `<a href="tel:${phone}">${phone}</a>`,
        dateRange: (icon, text) => `<i class="${icon}"></i> ${text}`,
        location: (icon, text) => `<i class="${icon}"></i> ${text}`,
        noData: (message) => `<p class="no-data">${message}</p>`
    },

    // Theme configuration
    theme: {
        primaryColor: '#2c3e50',
        accentColor: '#3498db',
        fontFamily: 'Inter, sans-serif'
    },

    // Settings
    settings: {
        language: 'en',
        dateFormat: 'YYYY-MM-DD'
    }
};

// Helper functions to access configuration
export const getRouteConfig = (routeId) => APP_CONFIG.routes[routeId] || null;
export const getAllRoutes = () => Object.values(APP_CONFIG.routes).sort((a, b) => a.order - b.order);
export const getIcon = (iconKey) => APP_CONFIG.icons[iconKey] || 'fas fa-circle';
export const getTemplate = (templateKey, ...args) => APP_CONFIG.templates[templateKey]?.(...args) || '';
export const getDefaultRoute = () => APP_CONFIG.defaultRoute;
export const getAllSections = () => [...APP_CONFIG.allSections];