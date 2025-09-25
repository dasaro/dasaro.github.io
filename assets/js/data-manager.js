/**
 * Data Management System
 * Handles JSON-based content storage and retrieval
 * Provides badge system and data validation
 */

class DataManager {
    constructor() {
        this.data = {};
        this.originalData = {};
        this.dataUrl = 'data/content.json';
        this.isLoaded = false;
        this.fallbackMode = false;
        this.callbacks = {
            dataLoaded: [],
            dataUpdated: [],
            error: [],
            fallbackMode: []
        };

        // Badge types and their configurations
        this.badgeConfig = {
            featured: {
                icon: 'fas fa-star',
                class: 'featured',
                priority: 1
            },
            recent: {
                icon: 'fas fa-clock',
                class: 'recent',
                priority: 2
            },
            highlight: {
                icon: 'fas fa-bookmark',
                class: 'highlight',
                priority: 3
            },
            published: {
                icon: 'fas fa-check-circle',
                class: 'published',
                priority: 4
            },
            inProgress: {
                icon: 'fas fa-spinner',
                class: 'in-progress',
                priority: 5
            },
            completed: {
                icon: 'fas fa-check',
                class: 'completed',
                priority: 6
            },
            certified: {
                icon: 'fas fa-certificate',
                class: 'certified',
                priority: 7
            },
            award: {
                icon: 'fas fa-trophy',
                class: 'award',
                priority: 8
            }
        };

        this.init();
    }

    /**
     * Initialize the data manager
     */
    async init() {
        try {
            await this.loadData();
            this.isLoaded = true;
            this.triggerCallbacks('dataLoaded', this.data);
            console.log('DataManager initialized successfully');
        } catch (error) {
            console.error('Failed to initialize DataManager:', error);
            this.triggerCallbacks('error', error);
        }
    }

    /**
     * Load data from JSON file
     */
    async loadData() {
        try {
            const response = await fetch(this.dataUrl);
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }

            const data = await response.json();
            this.data = this.validateAndCleanData(data);
            this.originalData = JSON.parse(JSON.stringify(this.data)); // Deep copy for comparison

            console.log('Data loaded successfully');
            return this.data;
        } catch (error) {
            console.error('Failed to load data:', error);
            // Provide fallback empty structure and enter fallback mode
            this.data = this.getEmptyDataStructure();
            this.originalData = JSON.parse(JSON.stringify(this.data));
            this.fallbackMode = true;

            // Notify components about fallback mode
            console.warn('DataManager: Operating in fallback mode due to data loading failure');
            this.triggerCallbacks('fallbackMode', {
                error: error.message,
                fallbackData: this.data
            });

            // Return success with fallback data instead of throwing
            return this.data;
        }
    }

    /**
     * Validate and clean loaded data
     */
    validateAndCleanData(data) {
        const cleanData = { ...data };

        // Ensure required sections exist
        const requiredSections = ['personalInfo', 'education', 'experience', 'publications', 'skills', 'navigation', 'theme', 'settings'];
        requiredSections.forEach(section => {
            if (!cleanData[section]) {
                cleanData[section] = this.getEmptySection(section);
            }
        });

        // Ensure arrays are arrays
        const arraySections = ['education', 'experience', 'publications', 'skills', 'badges', 'languages', 'awards', 'projects'];
        arraySections.forEach(section => {
            if (cleanData[section] && !Array.isArray(cleanData[section])) {
                cleanData[section] = [];
            }
        });

        // Sort arrays by date or order where applicable
        this.sortDataSections(cleanData);

        return cleanData;
    }

    /**
     * Get empty data structure
     */
    getEmptyDataStructure() {
        return {
            personalInfo: {
                name: '',
                title: '',
                email: '',
                phone: '',
                location: '',
                website: '',
                linkedin: '',
                orcid: '',
                bio: ''
            },
            education: [],
            experience: [],
            publications: [],
            skills: [],
            badges: [],
            languages: [],
            awards: [],
            projects: [],
            navigation: {
                sections: [
                    { key: 'about', icon: 'fas fa-user', order: 1 },
                    { key: 'education', icon: 'fas fa-graduation-cap', order: 2 },
                    { key: 'experience', icon: 'fas fa-briefcase', order: 3 },
                    { key: 'publications', icon: 'fas fa-file-text', order: 4 },
                    { key: 'skills', icon: 'fas fa-cog', order: 5 },
                    { key: 'contact', icon: 'fas fa-envelope', order: 6 }
                ]
            },
            theme: {
                primaryColor: '#2c3e50',
                secondaryColor: '#34495e',
                accentColor: '#3498db',
                backgroundColor: '#ffffff',
                textColor: '#2c3e50'
            },
            settings: {
                defaultLanguage: 'en',
                enableBadges: true,
                showCV: true,
                animationDuration: 300
            }
        };
    }

    /**
     * Get empty section structure
     */
    getEmptySection(sectionName) {
        const emptySections = {
            personalInfo: { name: '', title: '', email: '', bio: '' },
            education: [],
            experience: [],
            publications: [],
            skills: [],
            badges: [],
            navigation: { sections: [] },
            theme: { primaryColor: '#2c3e50', accentColor: '#3498db' },
            settings: { defaultLanguage: 'en', enableBadges: true }
        };

        return emptySections[sectionName] || {};
    }

    /**
     * Sort data sections by relevant criteria
     */
    sortDataSections(data) {
        // Sort education and experience by end date (most recent first)
        ['education', 'experience'].forEach(section => {
            if (data[section] && Array.isArray(data[section])) {
                data[section].sort((a, b) => {
                    const dateA = new Date(a.endDate || a.date || '1900-01-01');
                    const dateB = new Date(b.endDate || b.date || '1900-01-01');
                    return dateB - dateA;
                });
            }
        });

        // Sort publications by year (most recent first)
        if (data.publications && Array.isArray(data.publications)) {
            data.publications.sort((a, b) => {
                const yearA = parseInt(a.year || 0);
                const yearB = parseInt(b.year || 0);
                return yearB - yearA;
            });
        }

        // Sort navigation sections by order
        if (data.navigation && data.navigation.sections) {
            data.navigation.sections.sort((a, b) => (a.order || 0) - (b.order || 0));
        }
    }

    /**
     * Get all data
     */
    getData() {
        return this.data;
    }

    /**
     * Get specific section data
     */
    getSection(sectionName) {
        return this.data[sectionName] || null;
    }

    /**
     * Update section data
     */
    updateSection(sectionName, sectionData) {
        if (this.data[sectionName] !== undefined) {
            this.data[sectionName] = sectionData;
            this.triggerCallbacks('dataUpdated', { section: sectionName, data: sectionData });
            return true;
        }
        return false;
    }

    /**
     * Add item to array section
     */
    addItemToSection(sectionName, item) {
        if (this.data[sectionName] && Array.isArray(this.data[sectionName])) {
            // Add unique ID if not present
            if (!item.id) {
                item.id = this.generateId();
            }

            this.data[sectionName].push(item);
            this.sortDataSections(this.data); // Re-sort after adding
            this.triggerCallbacks('dataUpdated', { section: sectionName, action: 'add', item });
            return item.id;
        }
        return null;
    }

    /**
     * Update item in array section
     */
    updateItemInSection(sectionName, itemId, updatedItem) {
        if (this.data[sectionName] && Array.isArray(this.data[sectionName])) {
            const index = this.data[sectionName].findIndex(item => item.id === itemId);
            if (index !== -1) {
                this.data[sectionName][index] = { ...this.data[sectionName][index], ...updatedItem };
                this.sortDataSections(this.data); // Re-sort after updating
                this.triggerCallbacks('dataUpdated', { section: sectionName, action: 'update', item: this.data[sectionName][index] });
                return true;
            }
        }
        return false;
    }

    /**
     * Remove item from array section
     */
    removeItemFromSection(sectionName, itemId) {
        if (this.data[sectionName] && Array.isArray(this.data[sectionName])) {
            const index = this.data[sectionName].findIndex(item => item.id === itemId);
            if (index !== -1) {
                const removedItem = this.data[sectionName].splice(index, 1)[0];
                this.triggerCallbacks('dataUpdated', { section: sectionName, action: 'remove', item: removedItem });
                return true;
            }
        }
        return false;
    }

    /**
     * Generate unique ID
     */
    generateId() {
        return 'id_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    }

    /**
     * Badge Management System
     */

    /**
     * Create badge element
     */
    createBadge(badgeType, customText = null, customIcon = null) {
        const config = this.badgeConfig[badgeType];
        if (!config) {
            console.warn(`Unknown badge type: ${badgeType}`);
            return null;
        }

        const badge = document.createElement('span');
        badge.className = `badge ${config.class}`;
        badge.setAttribute('data-badge-type', badgeType);
        badge.setAttribute('data-priority', config.priority);

        // Create icon
        const icon = document.createElement('i');
        icon.className = customIcon || config.icon;
        badge.appendChild(icon);

        // Create text
        const text = document.createElement('span');
        text.className = 'badge-text';

        if (customText) {
            text.textContent = customText;
        } else if (window.i18n) {
            text.setAttribute('data-i18n', `badges.${badgeType}`);
            text.textContent = window.i18n.t(`badges.${badgeType}`);
        } else {
            text.textContent = badgeType.charAt(0).toUpperCase() + badgeType.slice(1);
        }

        badge.appendChild(text);

        return badge;
    }

    /**
     * Apply badges to item based on criteria
     */
    applyAutomaticBadges(item, itemType) {
        const badges = [];

        // Recent badge (items from last 2 years)
        if (item.date || item.year || item.endDate) {
            const itemDate = new Date(item.date || item.endDate || `${item.year || new Date().getFullYear()}-01-01`);
            const twoYearsAgo = new Date();
            twoYearsAgo.setFullYear(twoYearsAgo.getFullYear() - 2);

            if (itemDate > twoYearsAgo) {
                badges.push('recent');
            }
        }

        // Type-specific badges
        switch (itemType) {
            case 'education':
                if (item.honors || item.distinction) badges.push('highlight');
                if (item.grade && parseFloat(item.grade) > 100) badges.push('featured');
                break;

            case 'experience':
                if (item.current) badges.push('inProgress');
                if (item.leadership) badges.push('highlight');
                break;

            case 'publications':
                if (item.featured) badges.push('featured');
                if (item.journal && item.journal.toLowerCase().includes('nature|science|cell')) badges.push('highlight');
                badges.push('published');
                break;

            case 'skills':
                if (item.level && parseInt(item.level) >= 90) badges.push('highlight');
                if (item.certified) badges.push('certified');
                break;

            case 'awards':
                badges.push('award');
                if (item.international) badges.push('featured');
                break;
        }

        return badges;
    }

    /**
     * Render badges container
     */
    renderBadges(badges, container) {
        if (!container || !badges || badges.length === 0) return;

        // Clear existing badges
        container.innerHTML = '';

        // Sort badges by priority
        const sortedBadges = badges.sort((a, b) => {
            const priorityA = this.badgeConfig[a] ? this.badgeConfig[a].priority : 999;
            const priorityB = this.badgeConfig[b] ? this.badgeConfig[b].priority : 999;
            return priorityA - priorityB;
        });

        // Create badge elements
        sortedBadges.forEach(badgeType => {
            const badge = this.createBadge(badgeType);
            if (badge) {
                container.appendChild(badge);
            }
        });
    }

    /**
     * Data Export Functions
     */

    /**
     * Export data as JSON
     */
    exportAsJSON(beautify = true) {
        return beautify ? JSON.stringify(this.data, null, 2) : JSON.stringify(this.data);
    }

    /**
     * Export publications as BibTeX
     */
    exportPublicationsAsBibTeX(publications = null) {
        const pubs = publications || this.data.publications || [];
        let bibtex = '';

        pubs.forEach((pub, index) => {
            const key = pub.key || `publication${index + 1}`;
            const type = pub.type || 'article';

            bibtex += `@${type}{${key},\n`;

            if (pub.title) bibtex += `  title={${pub.title}},\n`;
            if (pub.authors) bibtex += `  author={${pub.authors}},\n`;
            if (pub.journal) bibtex += `  journal={${pub.journal}},\n`;
            if (pub.conference) bibtex += `  booktitle={${pub.conference}},\n`;
            if (pub.year) bibtex += `  year={${pub.year}},\n`;
            if (pub.volume) bibtex += `  volume={${pub.volume}},\n`;
            if (pub.number) bibtex += `  number={${pub.number}},\n`;
            if (pub.pages) bibtex += `  pages={${pub.pages}},\n`;
            if (pub.doi) bibtex += `  doi={${pub.doi}},\n`;
            if (pub.url) bibtex += `  url={${pub.url}},\n`;

            bibtex += '}\n\n';
        });

        return bibtex.trim();
    }

    /**
     * Save data (for admin use)
     */
    async saveData() {
        // In a real implementation, this would send data to server
        // For client-side, we'll use localStorage as backup and provide download
        try {
            const dataString = this.exportAsJSON();

            // Save to localStorage as backup
            localStorage.setItem('academic_website_backup', dataString);

            // Create download link
            const blob = new Blob([dataString], { type: 'application/json' });
            const url = URL.createObjectURL(blob);

            return {
                success: true,
                downloadUrl: url,
                filename: `academic_data_${new Date().toISOString().split('T')[0]}.json`
            };
        } catch (error) {
            console.error('Failed to save data:', error);
            return { success: false, error: error.message };
        }
    }

    /**
     * Event system for data changes
     */
    on(eventType, callback) {
        if (this.callbacks[eventType]) {
            this.callbacks[eventType].push(callback);
        }
    }

    off(eventType, callback) {
        if (this.callbacks[eventType]) {
            const index = this.callbacks[eventType].indexOf(callback);
            if (index > -1) {
                this.callbacks[eventType].splice(index, 1);
            }
        }
    }

    triggerCallbacks(eventType, data) {
        if (this.callbacks[eventType]) {
            this.callbacks[eventType].forEach(callback => {
                try {
                    callback(data);
                } catch (error) {
                    console.error(`Error in ${eventType} callback:`, error);
                }
            });
        }
    }

    /**
     * Check if data has been modified
     */
    hasUnsavedChanges() {
        return JSON.stringify(this.data) !== JSON.stringify(this.originalData);
    }

    /**
     * Check if operating in fallback mode
     */
    isFallbackMode() {
        return this.fallbackMode;
    }

    /**
     * Reset data to original state
     */
    resetData() {
        this.data = JSON.parse(JSON.stringify(this.originalData));
        this.triggerCallbacks('dataUpdated', this.data);
    }
}

// Create global instance
window.dataManager = new DataManager();

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = DataManager;
}