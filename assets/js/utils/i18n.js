/**
 * Internationalization (i18n) System
 * Handles bilingual support for Italian/English content
 * Modular and easily extensible for additional languages
 */

class I18nManager {
    constructor() {
        this.currentLanguage = 'en';
        this.defaultLanguage = 'en';
        this.supportedLanguages = ['en', 'it'];
        this.translations = {};
        this.fallbackTranslations = {};
        this.hardcodedFallbacks = this.getHardcodedFallbacks();

        // Initialize the system
        this.init();
    }

    /**
     * Initialize the i18n system
     */
    async init() {
        try {
            // Load translations for all supported languages
            await this.loadTranslations();

            // Detect and set initial language
            this.detectLanguage();

            // Apply initial translations
            this.applyTranslations();

            // Set up event listeners
            this.setupEventListeners();

            console.log(`I18n initialized with language: ${this.currentLanguage}`);
        } catch (error) {
            console.error('Failed to initialize i18n system:', error);
            this.fallbackToDefault();
        }
    }

    /**
     * Load translation files for all supported languages
     */
    async loadTranslations() {
        const loadPromises = this.supportedLanguages.map(async (lang) => {
            try {
                const response = await fetch(`data/locales/${lang}.json`);
                if (!response.ok) {
                    throw new Error(`HTTP ${response.status}: ${response.statusText}`);
                }
                const translations = await response.json();
                this.translations[lang] = translations;

                // Set fallback to first successfully loaded language
                if (lang === this.defaultLanguage) {
                    this.fallbackTranslations = translations;
                }

                console.log(`Loaded translations for ${lang}`);
            } catch (error) {
                console.error(`Failed to load translations for ${lang}:`, error);

                // If it's the default language, use hardcoded fallback
                if (lang === this.defaultLanguage) {
                    this.fallbackTranslations = this.hardcodedFallbacks;
                }
            }
        });

        await Promise.all(loadPromises);
    }

    /**
     * Detect user's preferred language from various sources
     */
    detectLanguage() {
        let detectedLang = this.defaultLanguage;

        // Priority order: URL parameter > localStorage > browser language > default

        // 1. Check URL parameters
        const urlParams = new URLSearchParams(window.location.search);
        const urlLang = urlParams.get('lang');
        if (urlLang && this.supportedLanguages.includes(urlLang)) {
            detectedLang = urlLang;
        }
        // 2. Check localStorage
        else {
            const storedLang = localStorage.getItem('preferred-language');
            if (storedLang && this.supportedLanguages.includes(storedLang)) {
                detectedLang = storedLang;
            }
            // 3. Check browser language
            else {
                const browserLang = navigator.language.split('-')[0];
                if (this.supportedLanguages.includes(browserLang)) {
                    detectedLang = browserLang;
                }
            }
        }

        this.setLanguage(detectedLang);
    }

    /**
     * Set the current language
     * @param {string} language - Language code (e.g., 'en', 'it')
     */
    setLanguage(language) {
        if (!this.supportedLanguages.includes(language)) {
            console.warn(`Unsupported language: ${language}. Falling back to ${this.defaultLanguage}`);
            language = this.defaultLanguage;
        }

        const previousLanguage = this.currentLanguage;
        this.currentLanguage = language;

        // Update HTML lang attribute
        document.documentElement.lang = language;

        // Save to localStorage
        localStorage.setItem('preferred-language', language);

        // Update URL parameter without reloading
        this.updateUrlParameter('lang', language);

        // Apply translations if language changed
        if (previousLanguage !== language) {
            this.applyTranslations();
            this.updateLanguageToggle();

            // Dispatch language change event
            this.dispatchLanguageChangeEvent(language, previousLanguage);
        }

        console.log(`Language set to: ${language}`);
    }

    /**
     * Get translated text for a given key
     * @param {string} key - Translation key (e.g., 'navigation.about')
     * @param {Object} variables - Variables to interpolate into the translation
     * @returns {string} - Translated text
     */
    t(key, variables = {}) {
        // Defensive check for null, undefined, or empty keys
        if (!key || typeof key !== 'string' || key.trim() === '') {
            console.warn(`Invalid translation key provided: "${key}"`);
            return key || '[EMPTY_KEY]';
        }

        // Multi-layer fallback: current language → fallback translations → hardcoded → key itself
        const translation = this.getNestedValue(this.translations[this.currentLanguage], key) ||
                          this.getNestedValue(this.fallbackTranslations, key) ||
                          this.getNestedValue(this.hardcodedFallbacks, key) ||
                          key;

        // Log missing translations for debugging
        if (translation === key && key.trim() !== '') {
            console.warn(`Translation missing for key: ${key}`);
        }

        return this.interpolateVariables(translation, variables);
    }

    /**
     * Get nested value from object using dot notation
     * @param {Object} obj - Object to search in
     * @param {string} path - Dot-separated path (e.g., 'navigation.about')
     * @returns {*} - Value at path or undefined
     */
    getNestedValue(obj, path) {
        if (!obj || !path) return undefined;

        return path.split('.').reduce((current, key) => {
            return current && current[key] !== undefined ? current[key] : undefined;
        }, obj);
    }

    /**
     * Interpolate variables into translation string
     * @param {string} translation - Translation string with placeholders
     * @param {Object} variables - Variables to interpolate
     * @returns {string} - Interpolated string
     */
    interpolateVariables(translation, variables) {
        if (typeof translation !== 'string' || !variables) {
            return translation;
        }

        return translation.replace(/\{\{(\w+)\}\}/g, (match, key) => {
            return variables[key] !== undefined ? variables[key] : match;
        });
    }

    /**
     * Apply translations to all elements with data-i18n attributes
     */
    applyTranslations() {
        const elementsToTranslate = document.querySelectorAll('[data-i18n]');

        elementsToTranslate.forEach(element => {
            const key = element.getAttribute('data-i18n');

            // Skip elements with empty or null data-i18n attributes
            if (!key || key.trim() === '') {
                console.warn('Element with empty data-i18n attribute found:', element);
                return;
            }

            const translation = this.t(key);

            // Handle different content types
            if (element.tagName.toLowerCase() === 'input' && element.type === 'text') {
                element.placeholder = translation;
            } else if (element.tagName.toLowerCase() === 'img') {
                element.alt = translation;
            } else if (element.hasAttribute('title')) {
                element.title = translation;
            } else {
                element.textContent = translation;
            }
        });

        // Update document title if it has i18n attribute
        const titleElement = document.querySelector('title[data-i18n]');
        if (titleElement) {
            const titleKey = titleElement.getAttribute('data-i18n');
            document.title = this.t(titleKey);
        }

        // Update meta description if it has i18n attribute
        const metaDescription = document.querySelector('meta[name="description"][data-i18n]');
        if (metaDescription) {
            const descKey = metaDescription.getAttribute('data-i18n');
            metaDescription.content = this.t(descKey);
        }
    }

    /**
     * Set up event listeners for language switching
     */
    setupEventListeners() {
        // Language toggle button
        const langToggle = document.getElementById('lang-toggle');
        if (langToggle) {
            langToggle.addEventListener('click', () => {
                this.toggleLanguage();
            });
        }

        // Listen for custom language change events
        document.addEventListener('changeLanguage', (event) => {
            this.setLanguage(event.detail.language);
        });
    }

    /**
     * Toggle between supported languages
     */
    toggleLanguage() {
        const currentIndex = this.supportedLanguages.indexOf(this.currentLanguage);
        const nextIndex = (currentIndex + 1) % this.supportedLanguages.length;
        const nextLanguage = this.supportedLanguages[nextIndex];

        this.setLanguage(nextLanguage);
    }

    /**
     * Update the language toggle button text
     */
    updateLanguageToggle() {
        const langToggle = document.getElementById('lang-toggle');
        const langText = langToggle?.querySelector('[data-i18n="common.switchLanguage"]');

        if (langText) {
            langText.textContent = this.t('common.switchLanguage');
        }
    }

    /**
     * Update URL parameter without page reload
     * @param {string} param - Parameter name
     * @param {string} value - Parameter value
     */
    updateUrlParameter(param, value) {
        if (typeof window === 'undefined') return;

        const url = new URL(window.location);
        url.searchParams.set(param, value);

        // Update URL without triggering page reload
        window.history.replaceState({}, '', url);
    }

    /**
     * Dispatch language change event
     * @param {string} newLanguage - New language code
     * @param {string} previousLanguage - Previous language code
     */
    dispatchLanguageChangeEvent(newLanguage, previousLanguage) {
        const event = new CustomEvent('languageChanged', {
            detail: {
                language: newLanguage,
                previousLanguage: previousLanguage,
                translations: this.translations[newLanguage]
            }
        });

        document.dispatchEvent(event);
    }

    /**
     * Add new translations at runtime
     * @param {string} language - Language code
     * @param {Object} translations - Translation object
     * @param {boolean} merge - Whether to merge with existing translations
     */
    addTranslations(language, translations, merge = true) {
        if (!this.supportedLanguages.includes(language)) {
            console.warn(`Adding translations for unsupported language: ${language}`);
        }

        if (merge && this.translations[language]) {
            this.translations[language] = this.deepMerge(this.translations[language], translations);
        } else {
            this.translations[language] = translations;
        }

        // Re-apply translations if this is the current language
        if (language === this.currentLanguage) {
            this.applyTranslations();
        }

        console.log(`Added translations for ${language}`);
    }

    /**
     * Deep merge two objects
     * @param {Object} target - Target object
     * @param {Object} source - Source object
     * @returns {Object} - Merged object
     */
    deepMerge(target, source) {
        const result = Object.assign({}, target);

        for (const key in source) {
            if (source.hasOwnProperty(key)) {
                if (typeof source[key] === 'object' && source[key] !== null && !Array.isArray(source[key])) {
                    result[key] = this.deepMerge(target[key] || {}, source[key]);
                } else {
                    result[key] = source[key];
                }
            }
        }

        return result;
    }

    /**
     * Fallback to default language when initialization fails
     */
    fallbackToDefault() {
        console.log('Falling back to default language');
        this.currentLanguage = this.defaultLanguage;
        document.documentElement.lang = this.defaultLanguage;

        // Set hardcoded fallback translations if none loaded
        if (Object.keys(this.fallbackTranslations).length === 0) {
            this.fallbackTranslations = this.hardcodedFallbacks;
        }
    }

    /**
     * Get current language
     * @returns {string} - Current language code
     */
    getCurrentLanguage() {
        return this.currentLanguage;
    }

    /**
     * Get all supported languages
     * @returns {Array} - Array of supported language codes
     */
    getSupportedLanguages() {
        return [...this.supportedLanguages];
    }

    /**
     * Check if a language is supported
     * @param {string} language - Language code to check
     * @returns {boolean} - True if language is supported
     */
    isLanguageSupported(language) {
        return this.supportedLanguages.includes(language);
    }

    /**
     * Get all translations for current language
     * @returns {Object} - Current language translations
     */
    getCurrentTranslations() {
        return this.translations[this.currentLanguage] || this.fallbackTranslations;
    }

    /**
     * Get hardcoded fallback translations for essential UI elements
     * @returns {Object} - Essential translations that ensure the site remains functional
     */
    getHardcodedFallbacks() {
        return {
            personalInfo: {
                name: 'Academic Profile',
                title: 'Your Title',
                bio: 'Biography not available'
            },
            sections: {
                about: {
                    title: 'About Me',
                    subtitle: 'Academic Profile'
                },
                education: {
                    title: 'Education',
                    subtitle: 'Academic Background'
                },
                experience: {
                    title: 'Experience',
                    subtitle: 'Professional Background'
                },
                publications: {
                    title: 'Publications',
                    subtitle: 'Research Output'
                },
                skills: {
                    title: 'Skills',
                    subtitle: 'Technical Expertise'
                },
                contact: {
                    title: 'Contact',
                    subtitle: 'Get in Touch'
                },
                supervisedStudents: {
                    title: 'Supervised Students',
                    subtitle: 'Academic Supervision'
                },
                projects: {
                    title: 'Projects',
                    subtitle: 'Research Projects'
                },
                professionalService: {
                    title: 'Professional Service',
                    subtitle: 'Academic Service Activities'
                },
                reviewing: {
                    title: 'Reviewing',
                    subtitle: 'Peer Review Activities'
                },
                invitedTalks: {
                    title: 'Invited Talks',
                    subtitle: 'Presentations and Seminars'
                },
                researchGroups: {
                    title: 'Research Groups',
                    subtitle: 'Group Memberships'
                },
                academicAffiliations: {
                    title: 'Academic Affiliations',
                    subtitle: 'Professional Memberships'
                },
                editorialBoards: {
                    title: 'Editorial Boards',
                    subtitle: 'Editorial Positions'
                }
            },
            navigation: {
                about: 'About',
                education: 'Education',
                experience: 'Experience',
                publications: 'Publications',
                skills: 'Skills',
                'professional-service': 'Professional Service',
                reviewing: 'Reviewing',
                'invited-talks': 'Invited Talks',
                'research-groups': 'Research Groups',
                'academic-affiliations': 'Academic Affiliations',
                'editorial-boards': 'Editorial Boards',
                contact: 'Contact',
                downloadCV: 'Download CV'
            },
            publications: {
                searchPlaceholder: 'Search publications...',
                allYears: 'All Years',
                allTypes: 'All Types',
                exportBibTeX: 'Export BibTeX',
                noResults: 'No publications found',
                adjustFilters: 'Try adjusting your search criteria or filters.',
                showAbstract: 'Show Abstract',
                hideAbstract: 'Hide Abstract'
            },
            common: {
                journal: 'Journal',
                conference: 'Conference',
                book: 'Book',
                thesis: 'Thesis',
                switchLanguage: 'English',
                email: 'Email',
                location: 'Location',
                website: 'Website',
                present: 'Present',
                phone: 'Phone',
                linkedin: 'LinkedIn',
                orcid: 'ORCID',
                supervisor: 'Supervisor',
                grade: 'Grade'
            },
            badges: {
                featured: 'Featured',
                recent: 'Recent',
                highlight: 'Highlight',
                published: 'Published',
                inProgress: 'In Progress',
                completed: 'Completed',
                certified: 'Certified',
                award: 'Award Winner'
            },
            citationMetrics: {
                featuredResearch: 'Featured Recent Research',
                staticWarning: 'Static metrics last updated:',
                currentMetrics: 'For current metrics, visit:',
                googleScholar: 'Google Scholar Profile'
            },
            loading: 'Loading...',
            error: 'An error occurred'
        };
    }
}

// Create global instance
window.i18n = new I18nManager();

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = I18nManager;
}