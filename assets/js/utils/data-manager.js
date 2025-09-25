/**
 * Modern Data Management System
 * Handles multiple JSON files for different data types
 * Provides improved performance and better organization
 */

class DataManager {
    constructor() {
        this.data = {};
        this.originalData = {};
        this.isLoaded = false;
        this.fallbackMode = false;
        this.callbacks = {
            dataLoaded: [],
            dataUpdated: [],
            error: [],
            fallbackMode: []
        };

        // Define all JSON data files to load
        this.dataFiles = {
            personalInfo: 'data/personal-info.json',
            education: 'data/education.json',
            experience: 'data/experience.json',
            supervisedStudents: 'data/supervised-students.json',
            projects: 'data/projects.json',
            publications: 'data/publications.json',
            citationMetrics: 'data/citation-metrics.json',
            skills: 'data/skills.json',
            contact: 'data/contact.json',
            config: 'data/config.json'
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
            ongoing: {
                icon: 'fas fa-play',
                class: 'ongoing',
                priority: 7
            },
            archived: {
                icon: 'fas fa-archive',
                class: 'archived',
                priority: 8
            }
        };

        console.log('DataManager initialized with modular JSON architecture');
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
     * Load all data from separate JSON files
     */
    async loadData() {
        const startTime = performance.now();

        try {
            console.log('DataManager: Loading data from multiple JSON files...');

            // Load all files in parallel
            const loadPromises = Object.entries(this.dataFiles).map(async ([key, url]) => {
                try {
                    const response = await fetch(url);
                    if (!response.ok) {
                        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
                    }
                    const data = await response.json();
                    return { key, data, success: true };
                } catch (error) {
                    console.warn(`DataManager: Failed to load ${url}:`, error.message);
                    return { key, data: null, success: false, error: error.message };
                }
            });

            // Wait for all files to load (or fail)
            const results = await Promise.all(loadPromises);

            // Process results
            const loadedData = {};
            const failures = [];

            results.forEach(({ key, data, success, error }) => {
                if (success) {
                    loadedData[key] = data;
                } else {
                    failures.push({ key, error });
                    // Provide fallback for failed data
                    loadedData[key] = this.getEmptySection(key);
                }
            });

            // Merge config data into the main structure for backward compatibility
            if (loadedData.config) {
                Object.assign(loadedData, loadedData.config);
            }

            this.data = this.validateAndCleanData(loadedData);
            this.originalData = JSON.parse(JSON.stringify(this.data));

            const loadTime = performance.now() - startTime;
            console.log(`DataManager: Data loaded in ${loadTime.toFixed(2)}ms`);

            if (failures.length > 0) {
                console.warn(`DataManager: ${failures.length} files failed to load:`, failures);
                this.fallbackMode = true;
                this.triggerCallbacks('fallbackMode', { failures });
            }

            return this.data;

        } catch (error) {
            console.error('DataManager: Critical failure during data loading:', error);

            // Complete fallback mode
            this.data = this.getEmptyDataStructure();
            this.originalData = JSON.parse(JSON.stringify(this.data));
            this.fallbackMode = true;

            console.warn('DataManager: Operating in complete fallback mode');
            this.triggerCallbacks('fallbackMode', {
                error: error.message,
                fallbackData: this.data
            });

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
        const arraySections = ['education', 'experience', 'publications', 'skills', 'badges', 'languages', 'awards', 'projects', 'supervisedStudents'];
        arraySections.forEach(section => {
            if (cleanData[section] && !Array.isArray(cleanData[section])) {
                cleanData[section] = [];
            }
        });

        // Validate personal info
        if (cleanData.personalInfo && typeof cleanData.personalInfo !== 'object') {
            cleanData.personalInfo = this.getEmptySection('personalInfo');
        }

        return cleanData;
    }

    /**
     * Get empty section structure
     */
    getEmptySection(sectionName) {
        const emptySections = {
            personalInfo: {
                name: '',
                title: '',
                email: '',
                bio: '',
                researchInterests: [],
                background: ''
            },
            education: [],
            experience: [],
            publications: [],
            supervisedStudents: [],
            projects: [],
            citationMetrics: {
                totalCitations: 0,
                hIndex: 0,
                i10Index: 0,
                totalPublications: 0
            },
            skills: [],
            contact: {
                email: '',
                phone: '',
                location: '',
                website: ''
            },
            navigation: [
                { id: 'about', title: 'About', icon: 'fas fa-user', visible: true, order: 1 },
                { id: 'education', title: 'Education', icon: 'fas fa-graduation-cap', visible: true, order: 2 },
                { id: 'experience', title: 'Experience', icon: 'fas fa-briefcase', visible: true, order: 3 },
                { id: 'publications', title: 'Publications', icon: 'fas fa-book', visible: true, order: 4 },
                { id: 'skills', title: 'Skills', icon: 'fas fa-cogs', visible: true, order: 5 }
            ],
            theme: {
                primaryColor: '#2c3e50',
                accentColor: '#3498db',
                fontFamily: 'Inter, sans-serif'
            },
            settings: {
                language: 'en',
                dateFormat: 'YYYY-MM-DD'
            },
            badges: [],
            languages: [],
            awards: []
        };

        return emptySections[sectionName] || {};
    }

    /**
     * Get complete empty data structure
     */
    getEmptyDataStructure() {
        const sections = ['personalInfo', 'education', 'experience', 'publications', 'supervisedStudents', 'projects', 'citationMetrics', 'skills', 'contact', 'navigation', 'theme', 'settings', 'badges', 'languages', 'awards'];
        const emptyData = {};

        sections.forEach(section => {
            emptyData[section] = this.getEmptySection(section);
        });

        return emptyData;
    }

    /**
     * Get data for specific section
     */
    getData(section) {
        if (!section) return this.data;
        return this.data[section] || this.getEmptySection(section);
    }

    /**
     * Check if data manager is in fallback mode
     */
    isFallbackMode() {
        return this.fallbackMode;
    }

    /**
     * Get badge configuration
     */
    getBadgeConfig(badgeName) {
        return this.badgeConfig[badgeName] || {
            icon: 'fas fa-tag',
            class: 'default',
            priority: 99
        };
    }

    /**
     * Register callback for data events
     */
    on(event, callback) {
        if (this.callbacks[event]) {
            this.callbacks[event].push(callback);
        }
    }

    /**
     * Trigger callbacks for an event
     */
    triggerCallbacks(event, data) {
        if (this.callbacks[event]) {
            this.callbacks[event].forEach(callback => {
                try {
                    callback(data);
                } catch (error) {
                    console.error(`Error in ${event} callback:`, error);
                }
            });
        }
    }

    /**
     * Save data back to JSON files (for admin panel)
     */
    async saveData(sectionName, sectionData) {
        // This would be implemented for admin panel functionality
        // For now, just update in memory
        this.data[sectionName] = sectionData;
        this.triggerCallbacks('dataUpdated', { section: sectionName, data: sectionData });
        console.log(`Data updated for section: ${sectionName}`);
    }
}

// Create global instance
window.DataManager = DataManager;

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = DataManager;
}