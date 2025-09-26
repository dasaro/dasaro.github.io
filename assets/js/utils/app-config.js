/**
 * Centralized Configuration System
 * Single source of truth for routes, icons, and hardcoded values
 */

window.APP_CONFIG = {
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

    // Common text strings to reduce hardcoding
    text: {
        noData: {
            education: 'No education data available.',
            experience: 'No experience data available.',
            publications: 'No publications available.',
            projects: 'No projects available.',
            skills: 'No skills data available.',
            contact: 'No contact information available.'
        },
        loading: {
            general: 'Loading...',
            data: 'Loading data...',
            publications: 'Loading publications...'
        },
        labels: {
            supervisor: 'Supervisor',
            grade: 'Grade',
            thesis: 'Thesis',
            location: 'Location',
            duration: 'Duration',
            current: 'Current',
            responsibilities: 'Key Responsibilities',
            achievements: 'Achievements',
            technologies: 'Technologies',
            collaborators: 'Collaborators'
        }
    },

    // Theme configuration
    theme: {
        primaryColor: '#2c3e50',
        accentColor: '#3498db',
        fontFamily: 'Inter, sans-serif'
    }
};

// Helper functions to access configuration
window.getRouteConfig = function(routeId) {
    return window.APP_CONFIG.routes[routeId] || null;
};

window.getAllRoutes = function() {
    return Object.values(window.APP_CONFIG.routes).sort((a, b) => a.order - b.order);
};

window.getIcon = function(iconKey) {
    return window.APP_CONFIG.icons[iconKey] || 'fas fa-circle';
};

window.getText = function(category, key) {
    return window.APP_CONFIG.text[category]?.[key] || '';
};

window.getDefaultRoute = function() {
    return window.APP_CONFIG.defaultRoute;
};

window.getAllSections = function() {
    return [...window.APP_CONFIG.allSections];
};

// Common DOM helper functions to reduce innerHTML usage
window.createIconElement = function(iconClass, text = '') {
    const span = document.createElement('span');
    const icon = document.createElement('i');
    icon.className = iconClass;
    span.appendChild(icon);
    if (text) {
        span.appendChild(document.createTextNode(' ' + text));
    }
    return span;
};

window.createLinkElement = function(href, iconClass, text, target = '_blank') {
    const link = document.createElement('a');
    link.href = href;
    if (target) {
        link.target = target;
        if (target === '_blank') {
            link.rel = 'noopener';
        }
    }

    const icon = document.createElement('i');
    icon.className = iconClass;
    link.appendChild(icon);
    link.appendChild(document.createTextNode(' ' + text));

    return link;
};

console.log('App configuration system loaded');