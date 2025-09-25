/**
 * Editorial Boards Page Module
 * Handles display and management of editorial board positions
 */

class EditorialBoardsPage {
    constructor() {
        this.debugMode = true;
        this.data = null;
    }

    /**
     * Initialize the editorial boards page
     */
    init() {
        this.log('Initializing Editorial Boards page...');
        this.loadData();
        this.render();
        this.log('Editorial Boards page initialized successfully');
    }

    /**
     * Load editorial boards data
     */
    loadData() {
        this.log('Loading editorial boards data...');
        if (window.dataManager && window.dataManager.isLoaded) {
            this.data = window.dataManager.getData('editorialBoards') || [];
            this.log('Editorial boards data loaded:', this.data);
        } else {
            this.log('WARNING: DataManager not available, using empty data');
            this.data = [];
        }
    }

    /**
     * Render the editorial boards section
     */
    render() {
        this.log('Rendering editorial boards section...');

        const container = document.querySelector('#editorial-boards .section-content');
        if (!container) {
            this.log('ERROR: Editorial boards container not found');
            return;
        }

        container.innerHTML = '';

        if (!this.data || this.data.length === 0) {
            container.innerHTML = '<p class="no-data">No editorial board positions available.</p>';
            return;
        }

        // Sort by start date (newest first)
        const sortedBoards = [...this.data].sort((a, b) => {
            const dateA = new Date(a.startDate || '1900');
            const dateB = new Date(b.startDate || '1900');
            return dateB - dateA;
        });

        // Create boards grid
        const grid = document.createElement('div');
        grid.className = 'editorial-boards-grid';

        sortedBoards.forEach(board => {
            const boardCard = this.createBoardCard(board);
            grid.appendChild(boardCard);
        });

        container.appendChild(grid);
        this.log('Editorial boards section rendered successfully');
    }

    /**
     * Create individual board card
     */
    createBoardCard(board) {
        const card = document.createElement('div');
        card.className = 'editorial-board-card';

        // Card header
        const header = document.createElement('div');
        header.className = 'editorial-board-header';

        const journal = document.createElement('h3');
        journal.className = 'editorial-board-journal';
        journal.textContent = board.journal || 'Journal';

        const badges = document.createElement('div');
        badges.className = 'editorial-board-badges';

        if (board.badges) {
            board.badges.forEach(badge => {
                const badgeElement = window.SharedUtils ?
                    window.SharedUtils.createSimpleBadge(badge) :
                    this.createBadge(badge);
                badges.appendChild(badgeElement);
            });
        }

        header.appendChild(journal);
        header.appendChild(badges);

        // Card content
        const content = document.createElement('div');
        content.className = 'editorial-board-content';

        // Section and role
        const meta = document.createElement('div');
        meta.className = 'editorial-board-meta';

        if (board.section) {
            const sectionElement = document.createElement('div');
            sectionElement.className = 'editorial-board-section';
            sectionElement.innerHTML = `<strong>Section:</strong> ${board.section}`;
            meta.appendChild(sectionElement);
        }

        if (board.role) {
            const roleElement = document.createElement('div');
            roleElement.className = 'editorial-board-role';
            roleElement.innerHTML = `<strong>Role:</strong> ${board.role}`;
            meta.appendChild(roleElement);
        }

        if (board.publisher) {
            const publisherElement = document.createElement('div');
            publisherElement.className = 'editorial-board-publisher';
            publisherElement.innerHTML = `<strong>Publisher:</strong> ${board.publisher}`;
            meta.appendChild(publisherElement);
        }

        // Duration
        const duration = this.formatDuration(board.startDate, board.endDate);
        if (duration) {
            const durationElement = document.createElement('div');
            durationElement.className = 'editorial-board-duration';
            durationElement.innerHTML = `<strong>Duration:</strong> ${duration}`;
            meta.appendChild(durationElement);
        }

        // Status
        if (board.status) {
            const statusElement = document.createElement('div');
            statusElement.className = 'editorial-board-status';
            statusElement.innerHTML = `<strong>Status:</strong> ${board.status}`;
            meta.appendChild(statusElement);
        }

        // Impact Factor
        if (board.impactFactor) {
            const impactElement = document.createElement('div');
            impactElement.className = 'editorial-board-impact';
            impactElement.innerHTML = `<strong>Impact Factor:</strong> ${board.impactFactor}`;
            meta.appendChild(impactElement);
        }

        content.appendChild(meta);

        // Description
        if (board.description) {
            const description = document.createElement('p');
            description.className = 'editorial-board-description';
            description.textContent = board.description;
            content.appendChild(description);
        }

        // Focus areas
        if (board.focus && board.focus.length > 0) {
            const focusSection = document.createElement('div');
            focusSection.className = 'editorial-board-focus';

            const focusTitle = document.createElement('h4');
            focusTitle.className = 'editorial-board-focus-title';
            focusTitle.textContent = 'Focus Areas:';
            focusSection.appendChild(focusTitle);

            const focusList = document.createElement('div');
            focusList.className = 'editorial-board-focus-list';

            board.focus.forEach(area => {
                const focusItem = document.createElement('span');
                focusItem.className = 'editorial-board-focus-item';
                focusItem.textContent = area;
                focusList.appendChild(focusItem);
            });

            focusSection.appendChild(focusList);
            content.appendChild(focusSection);
        }

        // Website link
        if (board.website) {
            const linkElement = document.createElement('div');
            linkElement.className = 'editorial-board-link';

            const link = document.createElement('a');
            link.href = board.website;
            link.target = '_blank';
            link.rel = 'noopener';
            link.innerHTML = '<i class="fas fa-external-link-alt"></i> Visit Journal';

            linkElement.appendChild(link);
            content.appendChild(linkElement);
        }

        card.appendChild(header);
        card.appendChild(content);

        return card;
    }

    /**
     * Format duration from start and end dates
     */
    formatDuration(startDate, endDate) {
        if (!startDate) return null;

        const start = window.SharedUtils ?
            window.SharedUtils.formatDate(startDate) :
            this.formatDate(startDate);

        if (!endDate) {
            return `${start} - Present`;
        }

        const end = window.SharedUtils ?
            window.SharedUtils.formatDate(endDate) :
            this.formatDate(endDate);

        return `${start} - ${end}`;
    }

    /**
     * Format date for display (fallback)
     */
    formatDate(dateString) {
        try {
            const date = new Date(dateString);
            return date.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long'
            });
        } catch (error) {
            return dateString;
        }
    }

    /**
     * Create simple badge (fallback)
     */
    createBadge(badgeName) {
        const badge = document.createElement('span');
        badge.className = `badge ${badgeName}`;
        badge.textContent = badgeName;
        return badge;
    }

    /**
     * Cleanup method
     */
    cleanup() {
        this.log('Cleaning up Editorial Boards page...');
        // Add any cleanup logic here if needed
    }

    /**
     * Debug logging
     */
    log(message, data = null) {
        if (this.debugMode) {
            const prefix = '[EditorialBoardsPage]';
            if (data) {
                console.log(prefix, message, data);
            } else {
                console.log(prefix, message);
            }
        }
    }

    /**
     * Enable/disable debug mode
     */
    setDebugMode(enabled) {
        this.debugMode = enabled;
        this.log(`Debug mode ${enabled ? 'enabled' : 'disabled'}`);
    }
}

// Create page instance
window.editorialBoardsPage = new EditorialBoardsPage();

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = EditorialBoardsPage;
}