/**
 * Supervised Students Page Module
 * Handles supervised students section logic and rendering
 * Displays current and past students with their projects and status
 */

class SupervisedStudentsPage {
    constructor() {
        this.isInitialized = false;
        this.data = null;
        this.debugMode = true;
    }

    /**
     * Render the Supervised Students page with provided data
     * @param {Object} data - Application data
     */
    render(data) {
        this.log('Rendering Supervised Students page with data:', data);

        if (!data || !data.supervisedStudents) {
            this.log('ERROR: No supervised students data provided');
            return;
        }

        this.data = data;
        this.renderStudentsGrid(data.supervisedStudents);

        this.log('Supervised Students page rendered successfully');
    }

    /**
     * Initialize Supervised Students page
     */
    init() {
        this.log('Initializing Supervised Students page');

        if (!this.isInitialized) {
            this.setupEventListeners();
            this.isInitialized = true;
        }

        this.log('Supervised Students page initialized');
    }

    /**
     * Cleanup when leaving Supervised Students page
     */
    cleanup() {
        this.log('Cleaning up Supervised Students page');
    }

    /**
     * Check if Supervised Students page should be visible
     * @returns {boolean} Whether page should be visible
     */
    isVisible() {
        return true;
    }

    /**
     * Render students grid
     * @param {Array} students - Supervised students data array
     */
    renderStudentsGrid(students) {
        this.log('Rendering students grid with', students.length, 'items');

        const container = document.querySelector('#supervised-students .section-content');
        if (!container) {
            this.log('ERROR: Supervised students container not found');
            return;
        }

        container.innerHTML = '';

        if (!students || students.length === 0) {
            container.innerHTML = '<p class="no-data">No supervised students data available.</p>';
            return;
        }

        // Create enhanced section header
        const sectionHeader = document.createElement('div');
        sectionHeader.className = 'section-header-enhanced';

        const icon = document.createElement('div');
        icon.className = 'academic-icon academic-icon-primary';
        icon.innerHTML = '<i class="fas fa-user-graduate"></i>';

        sectionHeader.appendChild(icon);
        container.appendChild(sectionHeader);

        // Create stats section
        const statsSection = this.createStudentStats(students);
        container.appendChild(statsSection);

        // Sort students by start date (most recent first)
        const sortedStudents = [...students].sort((a, b) => {
            const dateA = new Date(a.startDate || '1900-01-01');
            const dateB = new Date(b.startDate || '1900-01-01');
            return dateB.getTime() - dateA.getTime();
        });

        // Create enhanced students grid (no grouping)
        const grid = document.createElement('div');
        grid.className = 'supervised-students-grid activity-grid';

        sortedStudents.forEach(student => {
            const studentCard = this.createEnhancedStudentCard(student);
            grid.appendChild(studentCard);
        });

        container.appendChild(grid);
        this.log('Students grid rendered successfully');
    }

    /**
     * Create student statistics
     */
    createStudentStats(students) {
        const statsContainer = document.createElement('div');
        statsContainer.className = 'stats-grid';

        // Calculate stats
        const totalStudents = students.length;
        const currentStudents = students.filter(s => s.status?.toLowerCase() === 'current' || s.current).length;
        const graduatedStudents = students.filter(s => s.status?.toLowerCase() === 'completed' || s.status?.toLowerCase() === 'graduated').length;

        const totalStat = this.createStatItem(totalStudents, 'Students');
        const currentStat = this.createStatItem(currentStudents, 'Current');
        const graduatedStat = this.createStatItem(graduatedStudents, 'Graduated');

        statsContainer.appendChild(totalStat);
        statsContainer.appendChild(currentStat);
        statsContainer.appendChild(graduatedStat);

        return statsContainer;
    }

    /**
     * Create stat item
     */
    createStatItem(number, label) {
        const statItem = document.createElement('div');
        statItem.className = 'stat-item';

        const statNumber = document.createElement('span');
        statNumber.className = 'stat-number';
        statNumber.textContent = number;

        const statLabel = document.createElement('span');
        statLabel.className = 'stat-label';
        statLabel.textContent = label;

        statItem.appendChild(statNumber);
        statItem.appendChild(statLabel);

        return statItem;
    }

    /**
     * Create enhanced student card
     */
    createEnhancedStudentCard(student) {
        const card = document.createElement('div');
        card.className = 'academic-card animate-fade-in';

        // Card header
        const cardHeader = document.createElement('div');
        cardHeader.className = 'academic-card-header';

        const cardTitle = document.createElement('h3');
        cardTitle.className = 'academic-card-title';
        cardTitle.textContent = student.name || 'Student Name';

        const cardMeta = document.createElement('div');
        cardMeta.className = 'academic-card-meta';

        // Add level badge
        if (student.level) {
            const levelBadge = document.createElement('span');
            levelBadge.className = 'badge-enhanced badge-primary';
            levelBadge.innerHTML = `<i class="fas fa-graduation-cap"></i> ${student.level}`;
            cardMeta.appendChild(levelBadge);
        }

        // Add status badge
        if (student.status) {
            const statusBadge = document.createElement('span');
            statusBadge.className = `badge-enhanced ${this.getStatusBadgeClass(student.status)}`;
            statusBadge.innerHTML = `<i class="${this.getStatusIcon(student.status)}"></i> ${student.status}`;
            cardMeta.appendChild(statusBadge);
        }

        // Add other badges
        if (student.badges && student.badges.length > 0) {
            student.badges.forEach(badge => {
                const badgeElement = this.createEnhancedBadge(badge);
                cardMeta.appendChild(badgeElement);
            });
        }

        cardHeader.appendChild(cardTitle);
        cardHeader.appendChild(cardMeta);

        // Card body
        const cardBody = document.createElement('div');
        cardBody.className = 'academic-card-body';

        // Period
        const startDate = window.SharedUtils?.formatDate(student.startDate) || student.startDate;
        const endDate = student.current || student.status?.toLowerCase() === 'current' ?
            'Present' : (window.SharedUtils?.formatDate(student.endDate) || student.endDate);

        if (startDate || endDate) {
            const period = document.createElement('div');
            period.className = 'list-item-description';
            period.innerHTML = `<i class="fas fa-calendar-alt"></i> ${startDate}${endDate ? ` - ${endDate}` : ''}`;
            cardBody.appendChild(period);
        }

        // Institution/Affiliation
        if (student.institution || student.affiliation) {
            const institution = document.createElement('div');
            institution.className = 'list-item-description';
            institution.innerHTML = `<i class="fas fa-university"></i> ${student.institution || student.affiliation}`;
            cardBody.appendChild(institution);
        }

        // Thesis/Project title
        const thesisTitle = student.thesis?.title || student.project?.title;
        if (thesisTitle) {
            const thesisDiv = document.createElement('div');
            thesisDiv.className = 'list-item-title';
            thesisDiv.innerHTML = `<i class="fas fa-book"></i> ${thesisTitle}`;
            cardBody.appendChild(thesisDiv);
        }

        // Description
        const description = student.thesis?.description || student.project?.description || student.description;
        if (description) {
            const descriptionDiv = document.createElement('div');
            descriptionDiv.className = 'list-item-description';
            descriptionDiv.textContent = description;
            cardBody.appendChild(descriptionDiv);
        }

        // Current position (for graduated students)
        if (student.currentPosition && (student.status?.toLowerCase() === 'completed' || student.status?.toLowerCase() === 'graduated')) {
            const currentPos = document.createElement('div');
            currentPos.className = 'list-item-description';
            let positionText = `<i class="fas fa-briefcase"></i> Current: ${student.currentPosition}`;
            if (student.currentInstitution) {
                positionText += ` at ${student.currentInstitution}`;
            }
            currentPos.innerHTML = positionText;
            cardBody.appendChild(currentPos);
        }

        // Achievements
        if (student.achievements && student.achievements.length > 0) {
            const achievementsTitle = document.createElement('h4');
            achievementsTitle.className = 'list-item-title';
            achievementsTitle.innerHTML = '<i class="fas fa-trophy"></i> Achievements';

            const achievementsList = document.createElement('ul');
            achievementsList.className = 'student-achievements-list';
            student.achievements.forEach(achievement => {
                const achItem = document.createElement('li');
                achItem.textContent = achievement;
                achievementsList.appendChild(achItem);
            });

            cardBody.appendChild(achievementsTitle);
            cardBody.appendChild(achievementsList);
        }

        // Publications
        if (student.publications && student.publications.length > 0) {
            const publicationsTitle = document.createElement('h4');
            publicationsTitle.className = 'list-item-title';
            publicationsTitle.innerHTML = '<i class="fas fa-file-alt"></i> Publications';

            const publicationsList = document.createElement('ul');
            publicationsList.className = 'student-publications-list';
            student.publications.forEach(publication => {
                const pubItem = document.createElement('li');
                pubItem.textContent = publication;
                publicationsList.appendChild(pubItem);
            });

            cardBody.appendChild(publicationsTitle);
            cardBody.appendChild(publicationsList);
        }

        card.appendChild(cardHeader);
        card.appendChild(cardBody);

        return card;
    }

    /**
     * Get status badge class
     */
    getStatusBadgeClass(status) {
        const statusClasses = {
            'current': 'badge-success',
            'ongoing': 'badge-success',
            'completed': 'badge-info',
            'graduated': 'badge-info',
            'paused': 'badge-warning',
            'dropped': 'badge-secondary'
        };
        return statusClasses[status?.toLowerCase()] || 'badge-light';
    }

    /**
     * Get status icon
     */
    getStatusIcon(status) {
        const statusIcons = {
            'current': 'fas fa-play',
            'ongoing': 'fas fa-play',
            'completed': 'fas fa-check',
            'graduated': 'fas fa-check',
            'paused': 'fas fa-pause',
            'dropped': 'fas fa-times'
        };
        return statusIcons[status?.toLowerCase()] || 'fas fa-info-circle';
    }

    /**
     * Create enhanced badge
     */
    createEnhancedBadge(badgeName) {
        const badge = document.createElement('span');
        badge.className = `badge-enhanced ${this.getBadgeClass(badgeName)}`;

        const icon = document.createElement('i');
        icon.className = this.getBadgeIcon(badgeName);

        badge.appendChild(icon);
        badge.appendChild(document.createTextNode(badgeName));

        return badge;
    }

    /**
     * Get badge class for styling
     */
    getBadgeClass(badgeName) {
        const badgeClasses = {
            'award': 'badge-warning',
            'published': 'badge-success',
            'excellence': 'badge-primary',
            'scholarship': 'badge-info',
            'honor': 'badge-warning',
            'distinction': 'badge-primary'
        };
        return badgeClasses[badgeName?.toLowerCase()] || 'badge-light';
    }

    /**
     * Get badge icon
     */
    getBadgeIcon(badgeName) {
        const badgeIcons = {
            'award': 'fas fa-trophy',
            'published': 'fas fa-file-alt',
            'excellence': 'fas fa-star',
            'scholarship': 'fas fa-graduation-cap',
            'honor': 'fas fa-medal',
            'distinction': 'fas fa-award'
        };
        return badgeIcons[badgeName?.toLowerCase()] || 'fas fa-tag';
    }

    /**
     * Group and sort students (legacy method - keeping for compatibility)
     * @param {Array} students - Students array
     * @returns {Object} Grouped students
     */
    groupAndSortStudents(students) {
        const groups = {
            'current': [],
            'completed': [],
            'other': []
        };

        students.forEach(student => {
            const status = student.status?.toLowerCase() || 'other';
            if (groups[status]) {
                groups[status].push(student);
            } else {
                groups['other'].push(student);
            }
        });

        // Sort each group
        Object.keys(groups).forEach(status => {
            groups[status].sort((a, b) => {
                // Sort by start date (most recent first)
                const dateA = new Date(a.startDate || '1900-01-01');
                const dateB = new Date(b.startDate || '1900-01-01');
                return dateB.getTime() - dateA.getTime();
            });
        });

        return groups;
    }

    /**
     * Create student section
     * @param {string} status - Section status
     * @param {Array} students - Students in this section
     * @returns {HTMLElement} Section element
     */
    createStudentSection(status, students) {
        const section = document.createElement('div');
        section.className = `students-section students-${status}`;

        const sectionTitle = document.createElement('h3');
        sectionTitle.className = 'students-section-title';
        sectionTitle.textContent = this.getSectionTitle(status);
        section.appendChild(sectionTitle);

        const sectionGrid = document.createElement('div');
        sectionGrid.className = 'students-section-grid';

        students.forEach(student => {
            const studentItem = this.createStudentItem(student);
            sectionGrid.appendChild(studentItem);
        });

        section.appendChild(sectionGrid);
        return section;
    }

    /**
     * Get section title based on status
     * @param {string} status - Status key
     * @returns {string} Section title
     */
    getSectionTitle(status) {
        const titles = {
            'current': 'Current Students',
            'completed': 'Graduated Students',
            'other': 'Other Students'
        };

        return titles[status] || status.charAt(0).toUpperCase() + status.slice(1);
    }

    /**
     * Create a student item
     * @param {Object} student - Student data
     * @returns {HTMLElement} Student item element
     */
    createStudentItem(student) {
        this.log('Creating student item:', student);

        const item = document.createElement('div');
        item.className = 'student-item';

        // Header with name and badges
        const header = document.createElement('div');
        header.className = 'student-header';

        const name = document.createElement('h4');
        name.className = 'student-name';
        name.textContent = student.name || 'Student Name';
        header.appendChild(name);

        // Badges
        if (student.badges && student.badges.length > 0) {
            const badgesContainer = document.createElement('div');
            badgesContainer.className = 'student-badges';

            student.badges.forEach(badgeName => {
                const badge = window.badgeComponent?.createBadge(badgeName) || window.SharedUtils.createSimpleBadge(badgeName);
                badgesContainer.appendChild(badge);
            });

            header.appendChild(badgesContainer);
        }

        item.appendChild(header);

        // Meta information
        const meta = document.createElement('div');
        meta.className = 'student-meta';

        // Level (PhD, Master's, etc.)
        if (student.level) {
            const level = document.createElement('span');
            level.className = 'student-level';
            level.innerHTML = `<i class="fas fa-graduation-cap"></i> ${student.level}`;
            meta.appendChild(level);
        }

        // Period
        const startDate = window.SharedUtils.formatDate(student.startDate);
        const endDate = student.current ?
            (window.i18n?.t('common.present') || 'Present') :
            window.SharedUtils.formatDate(student.endDate);

        if (startDate || endDate) {
            const period = document.createElement('span');
            period.className = 'student-period';
            period.innerHTML = `<i class="fas fa-calendar-alt"></i> ${startDate}${endDate ? ` - ${endDate}` : ''}`;
            meta.appendChild(period);
        }

        // Status
        if (student.status) {
            const status = document.createElement('span');
            status.className = `student-status status-${student.status.toLowerCase()}`;
            status.innerHTML = `<i class="fas fa-info-circle"></i> ${student.status}`;
            meta.appendChild(status);
        }

        item.appendChild(meta);

        // Thesis or project information
        if (student.thesis || student.project) {
            const thesisInfo = document.createElement('div');
            thesisInfo.className = 'student-thesis';

            const title = student.thesis?.title || student.project?.title;
            if (title) {
                const thesisTitle = document.createElement('h5');
                thesisTitle.textContent = title;
                thesisInfo.appendChild(thesisTitle);
            }

            const description = student.thesis?.description || student.project?.description || student.description;
            if (description) {
                const thesisDescription = document.createElement('p');
                thesisDescription.textContent = description;
                thesisInfo.appendChild(thesisDescription);
            }

            if (thesisInfo.children.length > 0) {
                item.appendChild(thesisInfo);
            }
        }

        // Current position (for graduated students)
        if (student.currentPosition && student.status?.toLowerCase() === 'completed') {
            const currentPos = document.createElement('div');
            currentPos.className = 'student-current-position';
            currentPos.innerHTML = `<strong>Current Position:</strong> ${student.currentPosition}`;

            if (student.currentInstitution) {
                currentPos.innerHTML += ` at ${student.currentInstitution}`;
            }

            item.appendChild(currentPos);
        }

        // Achievements
        if (student.achievements && student.achievements.length > 0) {
            const achievements = document.createElement('div');
            achievements.className = 'student-achievements';
            achievements.innerHTML = `
                <strong>Achievements:</strong>
                <ul>${student.achievements.map(achievement => `<li>${achievement}</li>`).join('')}</ul>
            `;
            item.appendChild(achievements);
        }

        // Publications or outputs
        if (student.publications && student.publications.length > 0) {
            const publications = document.createElement('div');
            publications.className = 'student-publications';
            publications.innerHTML = `
                <strong>Publications:</strong>
                <ul>${student.publications.map(pub => `<li>${pub}</li>`).join('')}</ul>
            `;
            item.appendChild(publications);
        }

        // Links (LinkedIn, personal website, etc.)
        if (student.links && Object.keys(student.links).length > 0) {
            const linksContainer = document.createElement('div');
            linksContainer.className = 'student-links';

            Object.entries(student.links).forEach(([type, url]) => {
                const link = this.createStudentLink(type, url);
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
     * Create student link
     * @param {string} type - Link type
     * @param {string} url - URL
     * @returns {HTMLElement|null} Link element
     */
    createStudentLink(type, url) {
        const linkConfigs = {
            'linkedin': { icon: 'fab fa-linkedin', label: 'LinkedIn' },
            'website': { icon: 'fas fa-globe', label: 'Website' },
            'github': { icon: 'fab fa-github', label: 'GitHub' },
            'researchgate': { icon: 'fab fa-researchgate', label: 'ResearchGate' },
            'orcid': { icon: 'fab fa-orcid', label: 'ORCID' },
            'email': { icon: 'fas fa-envelope', label: 'Email' }
        };

        const config = linkConfigs[type.toLowerCase()];
        if (!config) return null;

        const link = document.createElement('a');
        link.className = 'student-link';
        link.href = type === 'email' ? `mailto:${url}` : url;
        link.target = type === 'email' ? '_self' : '_blank';
        if (type !== 'email') link.rel = 'noopener';
        link.innerHTML = `<i class="${config.icon}"></i> ${config.label}`;

        return link;
    }

    // Duplicate methods removed - using SharedUtils instead

    /**
     * Render empty state
     * @param {HTMLElement} container - Container element
     */
    renderEmptyState(container) {
        this.log('Rendering empty state for supervised students');

        const emptyState = document.createElement('div');
        emptyState.className = 'empty-state';
        emptyState.innerHTML = `
            <p>No supervised students information available.</p>
        `;

        container.appendChild(emptyState);
    }

    /**
     * Set up event listeners for Supervised Students page
     */
    setupEventListeners() {
        this.log('Setting up Supervised Students page event listeners');

        // Add any supervised students specific interactions here
        // For example: student detail modals, filter controls, etc.
    }

    /**
     * Debug logging
     * @param {string} message - Log message
     * @param {any} data - Optional data to log
     */
    log(message, data = null) {
        if (this.debugMode) {
            const prefix = '[SupervisedStudentsPage]';
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
const supervisedStudentsPage = new SupervisedStudentsPage();

// Route registration handled by app.js

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = SupervisedStudentsPage;
}

// Make available globally for debugging
if (typeof window !== 'undefined') {
    window.supervisedStudentsPage = supervisedStudentsPage;
}