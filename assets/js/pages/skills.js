/**
 * Skills Page Module
 * Handles skills section logic and rendering
 * Displays technical skills with proficiency levels and categories
 */

class SkillsPage {
    constructor() {
        this.isInitialized = false;
        this.data = null;
        this.debugMode = true;
    }

    /**
     * Render the Skills page with provided data
     * @param {Object} data - Application data
     */
    render(data) {
        this.log('Rendering Skills page with data:', data);

        if (!data || !data.skills) {
            this.log('ERROR: No skills data provided');
            return;
        }

        this.data = data;
        this.renderSkillsGrid(data.skills);

        this.log('Skills page rendered successfully');
    }

    /**
     * Initialize Skills page
     */
    init() {
        this.log('Initializing Skills page');

        if (!this.isInitialized) {
            this.setupEventListeners();
            this.isInitialized = true;
        }

        this.log('Skills page initialized');
    }

    /**
     * Cleanup when leaving Skills page
     */
    cleanup() {
        this.log('Cleaning up Skills page');
    }

    /**
     * Check if Skills page should be visible
     * @returns {boolean} Whether page should be visible
     */
    isVisible() {
        return true;
    }

    /**
     * Render skills grid
     * @param {Array} skills - Skills data array
     */
    renderSkillsGrid(skills) {
        this.log('Rendering skills grid with', skills.length, 'items');

        const skillsGrid = document.querySelector('#skills .skills-grid');
        if (!skillsGrid) {
            this.log('ERROR: Skills grid container not found');
            return;
        }

        skillsGrid.innerHTML = '';

        if (!skills || skills.length === 0) {
            this.renderEmptyState(skillsGrid);
            return;
        }

        // Group skills by category
        const groupedSkills = this.groupSkillsByCategory(skills);

        // Render each category
        Object.entries(groupedSkills).forEach(([category, skillsList]) => {
            if (skillsList.length > 0) {
                const section = this.createSkillsSection(category, skillsList);
                skillsGrid.appendChild(section);
            }
        });

        this.log('Skills grid rendered successfully');
    }

    /**
     * Group skills by category
     * @param {Array} skills - Skills array
     * @returns {Object} Grouped skills
     */
    groupSkillsByCategory(skills) {
        const groups = {};

        skills.forEach(skill => {
            const category = skill.category || 'Other';
            if (!groups[category]) {
                groups[category] = [];
            }
            groups[category].push(skill);
        });

        // Sort skills within each category by proficiency (highest first)
        Object.keys(groups).forEach(category => {
            groups[category].sort((a, b) => {
                const proficiencyA = this.getProficiencyValue(a.proficiency);
                const proficiencyB = this.getProficiencyValue(b.proficiency);
                return proficiencyB - proficiencyA;
            });
        });

        return groups;
    }

    /**
     * Get numeric proficiency value
     * @param {string|number} proficiency - Proficiency level
     * @returns {number} Numeric value
     */
    getProficiencyValue(proficiency) {
        if (typeof proficiency === 'number') {
            return proficiency;
        }

        const proficiencyMap = {
            'expert': 95,
            'advanced': 80,
            'intermediate': 65,
            'beginner': 40,
            'basic': 25
        };

        return proficiencyMap[proficiency?.toLowerCase()] || 50;
    }

    /**
     * Create skills section
     * @param {string} category - Category name
     * @param {Array} skills - Skills in this category
     * @returns {HTMLElement} Section element
     */
    createSkillsSection(category, skills) {
        const section = document.createElement('div');
        section.className = 'skills-section';

        const sectionTitle = document.createElement('h3');
        sectionTitle.className = 'skills-section-title';
        sectionTitle.textContent = category;
        section.appendChild(sectionTitle);

        const sectionGrid = document.createElement('div');
        sectionGrid.className = 'skills-section-grid';

        skills.forEach(skill => {
            const skillItem = this.createSkillItem(skill);
            sectionGrid.appendChild(skillItem);
        });

        section.appendChild(sectionGrid);
        return section;
    }

    /**
     * Create a skill item
     * @param {Object} skill - Skill data
     * @returns {HTMLElement} Skill item element
     */
    createSkillItem(skill) {
        this.log('Creating skill item:', skill);

        const item = document.createElement('div');
        item.className = 'skill-item';

        // Header with name and badges
        const header = document.createElement('div');
        header.className = 'skill-header';

        const name = document.createElement('h4');
        name.className = 'skill-name';
        name.textContent = skill.name || 'Skill Name';
        header.appendChild(name);

        // Badges
        if (skill.badges && skill.badges.length > 0) {
            const badgesContainer = document.createElement('div');
            badgesContainer.className = 'skill-badges';

            skill.badges.forEach(badgeName => {
                const badge = window.badgeComponent?.createBadge(badgeName) || this.createSimpleBadge(badgeName);
                badgesContainer.appendChild(badge);
            });

            header.appendChild(badgesContainer);
        }

        item.appendChild(header);

        // Proficiency level
        if (skill.proficiency !== undefined && skill.proficiency !== null) {
            const levelContainer = document.createElement('div');
            levelContainer.className = 'skill-level';

            const skillBar = document.createElement('div');
            skillBar.className = 'skill-bar';

            const skillFill = document.createElement('div');
            skillFill.className = 'skill-fill';

            const proficiencyValue = this.getProficiencyValue(skill.proficiency);
            skillFill.style.width = `${proficiencyValue}%`;

            skillBar.appendChild(skillFill);
            levelContainer.appendChild(skillBar);

            const percentage = document.createElement('span');
            percentage.className = 'skill-percentage';
            percentage.textContent = `${proficiencyValue}%`;
            levelContainer.appendChild(percentage);

            item.appendChild(levelContainer);
        }

        // Description
        if (skill.description) {
            const description = document.createElement('div');
            description.className = 'skill-description';
            description.textContent = skill.description;
            item.appendChild(description);
        }

        // Years of experience
        if (skill.yearsOfExperience) {
            const experience = document.createElement('div');
            experience.className = 'skill-experience';
            experience.innerHTML = `<i class="fas fa-clock"></i> ${skill.yearsOfExperience} years`;
            item.appendChild(experience);
        }

        // Sub-skills or technologies
        if (skill.technologies && skill.technologies.length > 0) {
            const technologiesContainer = document.createElement('div');
            technologiesContainer.className = 'skill-technologies';

            const technologiesTitle = document.createElement('h5');
            technologiesTitle.textContent = 'Technologies:';
            technologiesContainer.appendChild(technologiesTitle);

            const technologiesList = document.createElement('div');
            technologiesList.className = 'technologies-list';

            skill.technologies.forEach(tech => {
                const techItem = document.createElement('span');
                techItem.className = 'technology-item';
                techItem.textContent = tech;
                technologiesList.appendChild(techItem);
            });

            technologiesContainer.appendChild(technologiesList);
            item.appendChild(technologiesContainer);
        }

        // Projects using this skill
        if (skill.projects && skill.projects.length > 0) {
            const projectsContainer = document.createElement('div');
            projectsContainer.className = 'skill-projects';

            const projectsTitle = document.createElement('h5');
            projectsTitle.textContent = 'Used in:';
            projectsContainer.appendChild(projectsTitle);

            const projectsList = document.createElement('ul');
            skill.projects.forEach(project => {
                const projectItem = document.createElement('li');
                projectItem.textContent = project;
                projectsList.appendChild(projectItem);
            });

            projectsContainer.appendChild(projectsList);
            item.appendChild(projectsContainer);
        }

        // Certifications
        if (skill.certifications && skill.certifications.length > 0) {
            const certificationsContainer = document.createElement('div');
            certificationsContainer.className = 'skill-certifications';

            const certificationsTitle = document.createElement('h5');
            certificationsTitle.innerHTML = '<i class="fas fa-certificate"></i> Certifications:';
            certificationsContainer.appendChild(certificationsTitle);

            const certificationsList = document.createElement('ul');
            skill.certifications.forEach(cert => {
                const certItem = document.createElement('li');

                if (typeof cert === 'string') {
                    certItem.textContent = cert;
                } else {
                    certItem.textContent = cert.name;
                    if (cert.issuer) {
                        const issuer = document.createElement('small');
                        issuer.textContent = ` - ${cert.issuer}`;
                        certItem.appendChild(issuer);
                    }
                    if (cert.year) {
                        const year = document.createElement('small');
                        year.textContent = ` (${cert.year})`;
                        certItem.appendChild(year);
                    }
                }

                certificationsList.appendChild(certItem);
            });

            certificationsContainer.appendChild(certificationsList);
            item.appendChild(certificationsContainer);
        }

        // Links (documentation, tutorials, etc.)
        if (skill.links && Object.keys(skill.links).length > 0) {
            const linksContainer = document.createElement('div');
            linksContainer.className = 'skill-links';

            Object.entries(skill.links).forEach(([type, url]) => {
                const link = this.createSkillLink(type, url);
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
     * Create skill link
     * @param {string} type - Link type
     * @param {string} url - URL
     * @returns {HTMLElement|null} Link element
     */
    createSkillLink(type, url) {
        const linkConfigs = {
            'documentation': { icon: 'fas fa-book', label: 'Documentation' },
            'tutorial': { icon: 'fas fa-graduation-cap', label: 'Tutorial' },
            'github': { icon: 'fab fa-github', label: 'GitHub' },
            'portfolio': { icon: 'fas fa-briefcase', label: 'Portfolio' },
            'certificate': { icon: 'fas fa-certificate', label: 'Certificate' },
            'course': { icon: 'fas fa-video', label: 'Course' }
        };

        const config = linkConfigs[type.toLowerCase()];
        if (!config) {
            // Generic link for unknown types
            const link = document.createElement('a');
            link.className = 'skill-link';
            link.href = url;
            link.target = '_blank';
            link.rel = 'noopener';
            link.innerHTML = `<i class="fas fa-external-link-alt"></i> ${type}`;
            return link;
        }

        const link = document.createElement('a');
        link.className = 'skill-link';
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
     * Render empty state
     * @param {HTMLElement} container - Container element
     */
    renderEmptyState(container) {
        this.log('Rendering empty state for skills');

        const emptyState = document.createElement('div');
        emptyState.className = 'empty-state';
        emptyState.innerHTML = `
            <p>No skills information available.</p>
        `;

        container.appendChild(emptyState);
    }

    /**
     * Set up event listeners for Skills page
     */
    setupEventListeners() {
        this.log('Setting up Skills page event listeners');

        // Add any skills specific interactions here
        // For example: skill detail modals, filter controls, proficiency tooltips, etc.
    }

    /**
     * Debug logging
     * @param {string} message - Log message
     * @param {any} data - Optional data to log
     */
    log(message, data = null) {
        if (this.debugMode) {
            const prefix = '[SkillsPage]';
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
const skillsPage = new SkillsPage();

// Route registration handled by app.js

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = SkillsPage;
}

// Make available globally for debugging
if (typeof window !== 'undefined') {
    window.skillsPage = skillsPage;
}