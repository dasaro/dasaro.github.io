/**
 * Accessibility Enhancement Module
 * Provides better accessibility features and compliance checking
 */

class AccessibilityManager {
    constructor() {
        this.focusableElements = 'a, button, input, textarea, select, details, [tabindex]:not([tabindex="-1"])';
        this.setupKeyboardNavigation();
        this.setupFocusManagement();
        this.setupScreenReaderSupport();
    }

    /**
     * Enhanced keyboard navigation
     */
    setupKeyboardNavigation() {
        document.addEventListener('keydown', (e) => {
            // Skip navigation - Alt + S
            if (e.altKey && e.key === 's') {
                e.preventDefault();
                const mainContent = document.querySelector('main');
                if (mainContent) {
                    mainContent.focus();
                    this.announceToScreenReader('Skipped to main content');
                }
            }

            // Focus trap for modals
            if (e.key === 'Tab') {
                const modal = document.querySelector('.modal[aria-hidden="false"]');
                if (modal) {
                    this.trapFocusInModal(e, modal);
                }
            }

            // Escape key handling
            if (e.key === 'Escape') {
                const modal = document.querySelector('.modal[aria-hidden="false"]');
                if (modal) {
                    this.closeModal(modal);
                }
            }
        });
    }

    /**
     * Focus management for dynamic content
     */
    setupFocusManagement() {
        // Restore focus after route changes
        let lastActiveElement = null;

        document.addEventListener('focusout', (e) => {
            lastActiveElement = e.target;
        });

        // Custom event for route changes
        window.addEventListener('routechange', () => {
            // Focus the new page heading
            const newHeading = document.querySelector('h1, h2');
            if (newHeading) {
                newHeading.tabIndex = -1;
                newHeading.focus();
                setTimeout(() => {
                    newHeading.removeAttribute('tabindex');
                }, 100);
            }
        });
    }

    /**
     * Screen reader support enhancements
     */
    setupScreenReaderSupport() {
        // Create live region for announcements
        this.createLiveRegion();

        // Enhanced loading states
        this.enhanceLoadingStates();

        // Better form validation messages
        this.enhanceFormValidation();
    }

    /**
     * Create ARIA live region for announcements
     */
    createLiveRegion() {
        const liveRegion = document.createElement('div');
        liveRegion.setAttribute('aria-live', 'polite');
        liveRegion.setAttribute('aria-atomic', 'true');
        liveRegion.style.cssText = `
            position: absolute;
            left: -10000px;
            width: 1px;
            height: 1px;
            overflow: hidden;
        `;
        liveRegion.id = 'live-region';
        document.body.appendChild(liveRegion);
    }

    /**
     * Announce message to screen readers
     * @param {string} message - Message to announce
     * @param {string} priority - 'polite' or 'assertive'
     */
    announceToScreenReader(message, priority = 'polite') {
        const liveRegion = document.querySelector('#live-region');
        if (liveRegion) {
            liveRegion.setAttribute('aria-live', priority);
            liveRegion.textContent = message;

            // Clear after announcement
            setTimeout(() => {
                liveRegion.textContent = '';
            }, 1000);
        }
    }

    /**
     * Trap focus within a modal
     * @param {KeyboardEvent} e - Keyboard event
     * @param {HTMLElement} modal - Modal element
     */
    trapFocusInModal(e, modal) {
        const focusableElements = modal.querySelectorAll(this.focusableElements);
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey && document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
        } else if (!e.shiftKey && document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
        }
    }

    /**
     * Close modal with proper focus management
     * @param {HTMLElement} modal - Modal element
     */
    closeModal(modal) {
        modal.setAttribute('aria-hidden', 'true');
        const trigger = document.querySelector(`[aria-controls="${modal.id}"]`);
        if (trigger) {
            trigger.focus();
        }
        this.announceToScreenReader('Modal closed');
    }

    /**
     * Enhanced loading states with ARIA
     */
    enhanceLoadingStates() {
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.type === 'childList') {
                    mutation.addedNodes.forEach((node) => {
                        if (node.nodeType === 1 && node.classList.contains('loading')) {
                            node.setAttribute('aria-live', 'polite');
                            node.setAttribute('aria-label', 'Loading content...');
                            this.announceToScreenReader('Loading content, please wait');
                        }
                    });
                }
            });
        });

        observer.observe(document.body, { childList: true, subtree: true });
    }

    /**
     * Enhanced form validation
     */
    enhanceFormValidation() {
        document.addEventListener('invalid', (e) => {
            const field = e.target;
            const message = field.validationMessage;

            // Create or update error message
            let errorId = field.getAttribute('aria-describedby');
            let errorElement = errorId ? document.getElementById(errorId) : null;

            if (!errorElement) {
                errorId = `error-${field.name || field.id || Date.now()}`;
                errorElement = document.createElement('div');
                errorElement.id = errorId;
                errorElement.className = 'error-message';
                errorElement.setAttribute('role', 'alert');
                field.parentNode.insertBefore(errorElement, field.nextSibling);
                field.setAttribute('aria-describedby', errorId);
            }

            errorElement.textContent = message;
            this.announceToScreenReader(`Validation error: ${message}`, 'assertive');
        }, true);

        // Clear errors on valid input
        document.addEventListener('input', (e) => {
            const field = e.target;
            if (field.checkValidity()) {
                const errorId = field.getAttribute('aria-describedby');
                const errorElement = errorId ? document.getElementById(errorId) : null;
                if (errorElement) {
                    errorElement.remove();
                    field.removeAttribute('aria-describedby');
                }
            }
        });
    }

    /**
     * Add skip links programmatically
     */
    addSkipLinks() {
        const skipLinks = document.createElement('div');
        skipLinks.className = 'skip-links';
        skipLinks.innerHTML = `
            <a href="#main-content" class="skip-link">Skip to main content</a>
            <a href="#sidebar" class="skip-link">Skip to navigation</a>
        `;

        // Add CSS for skip links
        if (!document.querySelector('#accessibility-styles')) {
            const styles = document.createElement('style');
            styles.id = 'accessibility-styles';
            styles.textContent = `
                .skip-links {
                    position: fixed;
                    top: -40px;
                    left: 6px;
                    z-index: 10000;
                }
                .skip-link {
                    position: absolute;
                    top: -40px;
                    left: -10000px;
                    background: #000;
                    color: white;
                    padding: 8px;
                    border-radius: 0 0 4px 4px;
                    text-decoration: underline;
                    z-index: 10000;
                }
                .skip-link:focus {
                    position: absolute;
                    top: 0;
                    left: 0;
                    display: block;
                    outline: 2px solid white;
                    outline-offset: 2px;
                }
                .skip-links:focus-within {
                    top: 0;
                }
            `;
            document.head.appendChild(styles);
        }

        document.body.insertBefore(skipLinks, document.body.firstChild);
    }

    /**
     * Check for common accessibility issues
     */
    auditAccessibility() {
        const issues = [];

        // Check for missing alt text
        document.querySelectorAll('img:not([alt])').forEach(img => {
            issues.push(`Missing alt text: ${img.src}`);
        });

        // Check for empty links
        document.querySelectorAll('a:empty').forEach(link => {
            issues.push(`Empty link: ${link.href}`);
        });

        // Check for low contrast (basic check)
        document.querySelectorAll('*').forEach(element => {
            const style = getComputedStyle(element);
            if (style.color === style.backgroundColor) {
                issues.push(`Possible contrast issue: ${element.tagName}`);
            }
        });

        // Check for missing form labels
        document.querySelectorAll('input, select, textarea').forEach(field => {
            const hasLabel = document.querySelector(`label[for="${field.id}"]`) ||
                            field.closest('label') ||
                            field.getAttribute('aria-label') ||
                            field.getAttribute('aria-labelledby');
            if (!hasLabel && field.type !== 'hidden') {
                issues.push(`Missing label: ${field.name || field.id || 'unnamed field'}`);
            }
        });

        if (issues.length > 0) {
            console.group('♿ Accessibility Issues Found');
            issues.forEach(issue => console.warn(issue));
            console.groupEnd();
        } else {
            console.log('♿ No obvious accessibility issues found');
        }

        return issues;
    }

    /**
     * Initialize all accessibility features
     */
    init() {
        this.addSkipLinks();

        // Run audit in development
        if (window.location.hostname === 'localhost') {
            setTimeout(() => this.auditAccessibility(), 2000);
        }
    }
}

// Create global accessibility manager
const accessibilityManager = new AccessibilityManager();

// Auto-initialize
accessibilityManager.init();

// Make available globally
window.AccessibilityManager = accessibilityManager;

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = AccessibilityManager;
}