/**
 * Projects Page Module
 * Handles projects section logic and rendering
 * Displays research projects with details, collaborators, and links
 */

class ProjectsPage {
    constructor() {
        this.isInitialized = false;
        this.data = null;
        this.debugMode = true;
    }

    /**
     * Render the Projects page with provided data
     * @param {Object} data - Application data
     */
    render(data) {
        this.log('Rendering Projects page with data:', data);

        if (!data || !data.projects) {
            this.log('ERROR: No projects data provided');
            return;
        }

        this.data = data;
        this.renderProjectsGrid(data.projects);

        this.log('Projects page rendered successfully');
    }

    /**
     * Initialize Projects page
     */
    init() {
        this.log('Initializing Projects page');

        if (!this.isInitialized) {
            this.setupEventListeners();
            this.isInitialized = true;
        }

        this.log('Projects page initialized');
    }

    /**
     * Cleanup when leaving Projects page
     */
    cleanup() {
        this.log('Cleaning up Projects page');
    }

    /**
     * Check if Projects page should be visible
     * @returns {boolean} Whether page should be visible
     */
    isVisible() {
        return true;
    }

    /**
     * Render projects grid
     * @param {Array} projects - Projects data array
     */
    renderProjectsGrid(projects) {
        this.log('Rendering projects grid with', projects.length, 'items');

        const projectsGrid = document.querySelector('#projects .projects-grid');
        if (!projectsGrid) {
            this.log('ERROR: Projects grid container not found');
            return;
        }

        projectsGrid.innerHTML = '';

        if (!projects || projects.length === 0) {
            this.renderEmptyState(projectsGrid);
            return;
        }

        // Sort projects by start date (most recent first)
        const sortedProjects = [...projects].sort((a, b) => {
            const dateA = new Date(a.startDate || '1900-01-01');
            const dateB = new Date(b.startDate || '1900-01-01');
            return dateB.getTime() - dateA.getTime();
        });

        sortedProjects.forEach(project => {
            const projectItem = this.createProjectItem(project);
            projectsGrid.appendChild(projectItem);
        });

        this.log('Projects grid rendered successfully');
    }

    /**
     * Create a project item
     * @param {Object} project - Project data
     * @returns {HTMLElement} Project item element
     */
    createProjectItem(project) {
        this.log('Creating project item:', project);

        const item = document.createElement('div');
        item.className = 'project-item';

        // Header with title and badges
        const header = document.createElement('div');
        header.className = 'project-header';

        const title = document.createElement('h4');
        title.className = 'project-title';
        title.textContent = project.title || 'Project Title';
        header.appendChild(title);

        // Badges
        if (project.badges && project.badges.length > 0) {
            const badgesContainer = document.createElement('div');
            badgesContainer.className = 'project-badges';

            project.badges.forEach(badgeName => {
                const badge = window.badgeComponent?.createBadge(badgeName) || this.createSimpleBadge(badgeName);
                badgesContainer.appendChild(badge);
            });

            header.appendChild(badgesContainer);
        }

        item.appendChild(header);

        // Meta information
        const meta = document.createElement('div');
        meta.className = 'project-meta';

        // Period
        const startDate = this.formatDate(project.startDate);
        const endDate = project.ongoing ?
            (window.i18n?.t('common.ongoing') || 'Ongoing') :
            this.formatDate(project.endDate);

        if (startDate || endDate) {
            const period = document.createElement('span');
            period.className = 'project-period';
            period.innerHTML = `<i class="fas fa-calendar-alt"></i> ${startDate}${endDate ? ` - ${endDate}` : ''}`;
            meta.appendChild(period);
        }

        // Funding
        if (project.funding) {
            const funding = document.createElement('span');
            funding.className = 'project-funding';
            funding.innerHTML = `<i class="fas fa-money-bill-wave"></i> ${project.funding}`;
            meta.appendChild(funding);
        }

        // Status
        if (project.status) {
            const status = document.createElement('span');
            status.className = `project-status status-${project.status.toLowerCase()}`;
            status.innerHTML = `<i class="fas fa-info-circle"></i> ${project.status}`;
            meta.appendChild(status);
        }

        item.appendChild(meta);

        // Description
        if (project.description) {
            const description = document.createElement('div');
            description.className = 'project-description';
            description.textContent = project.description;
            item.appendChild(description);
        }

        // Project details
        const details = this.createProjectDetails(project);
        if (details.children.length > 0) {
            item.appendChild(details);
        }

        // Links
        if (project.links && Object.keys(project.links).length > 0) {
            const linksContainer = document.createElement('div');
            linksContainer.className = 'project-links';

            Object.entries(project.links).forEach(([type, url]) => {
                const link = this.createProjectLink(type, url);
                if (link) {
                    linksContainer.appendChild(link);
                }
            });

            if (linksContainer.children.length > 0) {
                item.appendChild(linksContainer);
            }
        }

        return item;
    }

    /**
     * Create project details section
     * @param {Object} project - Project data
     * @returns {HTMLElement} Details element
     */
    createProjectDetails(project) {
        const details = document.createElement('div');
        details.className = 'project-details';

        // Collaborators
        if (project.collaborators && project.collaborators.length > 0) {
            const collaboratorsSection = document.createElement('div');
            collaboratorsSection.className = 'project-collaborators';

            const collaboratorsTitle = document.createElement('h5');
            collaboratorsTitle.innerHTML = '<i class="fas fa-users"></i> Collaborators';
            collaboratorsSection.appendChild(collaboratorsTitle);

            const collaboratorsList = document.createElement('div');
            collaboratorsList.className = 'collaborators-list';

            project.collaborators.forEach(collaborator => {
                const collaboratorItem = document.createElement('div');
                collaboratorItem.className = 'collaborator-item';

                if (typeof collaborator === 'string') {
                    collaboratorItem.textContent = collaborator;
                } else {
                    collaboratorItem.textContent = collaborator.name;
                    if (collaborator.institution) {
                        const institution = document.createElement('small');
                        institution.textContent = ` (${collaborator.institution})`;
                        collaboratorItem.appendChild(institution);
                    }
                }

                collaboratorsList.appendChild(collaboratorItem);
            });

            collaboratorsSection.appendChild(collaboratorsList);
            details.appendChild(collaboratorsSection);
        }

        // Technologies
        if (project.technologies && project.technologies.length > 0) {
            const technologiesSection = document.createElement('div');
            technologiesSection.className = 'project-technologies';

            const technologiesTitle = document.createElement('h5');
            technologiesTitle.innerHTML = '<i class="fas fa-code"></i> Technologies';
            technologiesSection.appendChild(technologiesTitle);

            const technologiesList = document.createElement('div');
            technologiesList.className = 'technologies-list';

            project.technologies.forEach(tech => {
                const techItem = document.createElement('span');
                techItem.className = 'technology-item';
                techItem.textContent = tech;
                technologiesList.appendChild(techItem);
            });

            technologiesSection.appendChild(technologiesList);
            details.appendChild(technologiesSection);
        }

        // Objectives
        if (project.objectives && project.objectives.length > 0) {
            const objectivesSection = document.createElement('div');
            objectivesSection.className = 'project-objectives';

            const objectivesTitle = document.createElement('h5');
            objectivesTitle.innerHTML = '<i class="fas fa-bullseye"></i> Objectives';
            objectivesSection.appendChild(objectivesTitle);

            const objectivesList = document.createElement('ul');
            project.objectives.forEach(objective => {
                const objectiveItem = document.createElement('li');
                objectiveItem.textContent = objective;
                objectivesList.appendChild(objectiveItem);
            });

            objectivesSection.appendChild(objectivesList);
            details.appendChild(objectivesSection);
        }

        // Outcomes
        if (project.outcomes && project.outcomes.length > 0) {
            const outcomesSection = document.createElement('div');
            outcomesSection.className = 'project-outcomes';

            const outcomesTitle = document.createElement('h5');
            outcomesTitle.innerHTML = '<i class="fas fa-trophy"></i> Outcomes';
            outcomesSection.appendChild(outcomesTitle);

            const outcomesList = document.createElement('ul');
            project.outcomes.forEach(outcome => {
                const outcomeItem = document.createElement('li');
                outcomeItem.textContent = outcome;
                outcomesList.appendChild(outcomeItem);
            });

            outcomesSection.appendChild(outcomesList);
            details.appendChild(outcomesSection);
        }

        // Publications from this project
        if (project.publications && project.publications.length > 0) {
            const publicationsSection = document.createElement('div');
            publicationsSection.className = 'project-publications';

            const publicationsTitle = document.createElement('h5');
            publicationsTitle.innerHTML = '<i class="fas fa-book"></i> Related Publications';
            publicationsSection.appendChild(publicationsTitle);

            const publicationsList = document.createElement('ul');
            project.publications.forEach(publication => {
                const publicationItem = document.createElement('li');
                publicationItem.textContent = publication;
                publicationsList.appendChild(publicationItem);
            });

            publicationsSection.appendChild(publicationsList);
            details.appendChild(publicationsSection);
        }

        return details;
    }

    /**
     * Create project link
     * @param {string} type - Link type
     * @param {string} url - URL
     * @returns {HTMLElement|null} Link element
     */
    createProjectLink(type, url) {
        const linkConfigs = {
            'website': { icon: 'fas fa-globe', label: 'Website' },
            'github': { icon: 'fab fa-github', label: 'GitHub' },
            'demo': { icon: 'fas fa-play', label: 'Demo' },
            'documentation': { icon: 'fas fa-book', label: 'Documentation' },
            'paper': { icon: 'fas fa-file-alt', label: 'Paper' },
            'slides': { icon: 'fas fa-presentation', label: 'Slides' },
            'video': { icon: 'fas fa-video', label: 'Video' },
            'dataset': { icon: 'fas fa-database', label: 'Dataset' }
        };

        const config = linkConfigs[type.toLowerCase()];
        if (!config) {
            // Generic link for unknown types
            const link = document.createElement('a');
            link.className = 'project-link';
            link.href = url;
            link.target = '_blank';
            link.rel = 'noopener';
            link.innerHTML = `<i class="fas fa-external-link-alt"></i> ${type}`;
            return link;
        }

        const link = document.createElement('a');
        link.className = 'project-link';
        link.href = url;
        link.target = '_blank';
        link.rel = 'noopener';
        link.innerHTML = `<i class="${config.icon}"></i> ${config.label}`;

        return link;
    }

    /**
     * Create simple badge fallback
     * @param {string} badgeName - Badge name
     * @returns {HTMLElement} Badge element
     */
    createSimpleBadge(badgeName) {
        const badge = document.createElement('span');
        badge.className = `badge badge-${badgeName}`;
        badge.setAttribute('data-i18n', `badges.${badgeName}`);
        badge.textContent = window.i18n?.t(`badges.${badgeName}`) || badgeName;
        return badge;
    }

    /**
     * Format date string for display
     * @param {string} dateStr - Date string
     * @returns {string} Formatted date
     */
    formatDate(dateStr) {
        if (!dateStr) return '';

        // If it's already a year, return as is
        if (/^\d{4}$/.test(dateStr)) return dateStr;

        // Handle "Present" or "Ongoing" case
        if (dateStr.toLowerCase() === 'present' || dateStr.toLowerCase() === 'ongoing') {
            return window.i18n?.t('common.ongoing') || 'Ongoing';
        }

        // Try to parse and format the date
        try {
            const date = new Date(dateStr);
            return date.getFullYear().toString();
        } catch (error) {
            return dateStr;
        }
    }

    /**
     * Render empty state
     * @param {HTMLElement} container - Container element
     */
    renderEmptyState(container) {
        this.log('Rendering empty state for projects');

        const emptyState = document.createElement('div');
        emptyState.className = 'empty-state';
        emptyState.innerHTML = `
            <p>No projects information available.</p>
        `;

        container.appendChild(emptyState);
    }

    /**
     * Set up event listeners for Projects page
     */
    setupEventListeners() {
        this.log('Setting up Projects page event listeners');

        // Add any projects specific interactions here
        // For example: project detail modals, filter controls, etc.
    }

    /**
     * Debug logging
     * @param {string} message - Log message
     * @param {any} data - Optional data to log
     */
    log(message, data = null) {
        if (this.debugMode) {
            const prefix = '[ProjectsPage]';
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
const projectsPage = new ProjectsPage();

// Route registration handled by app.js

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ProjectsPage;
}

// Make available globally for debugging
if (typeof window !== 'undefined') {
    window.projectsPage = projectsPage;
}