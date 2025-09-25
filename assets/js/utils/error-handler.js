/**
 * Centralized Error Handling System
 * Provides consistent error handling and user feedback across the application
 */

class ErrorHandler {
    constructor() {
        this.setupGlobalErrorHandling();
        this.errorLog = [];
        this.maxLogSize = 50;
    }

    /**
     * Set up global error handlers
     */
    setupGlobalErrorHandling() {
        // Handle uncaught JavaScript errors
        window.addEventListener('error', (event) => {
            this.handleError(new Error(`${event.message} at ${event.filename}:${event.lineno}`), 'Global Error');
        });

        // Handle unhandled Promise rejections
        window.addEventListener('unhandledrejection', (event) => {
            this.handleError(event.reason, 'Unhandled Promise Rejection');
            event.preventDefault(); // Prevent console spam
        });
    }

    /**
     * Handle errors with consistent logging and user feedback
     * @param {Error} error - The error object
     * @param {string} context - Context where the error occurred
     * @param {boolean} showUser - Whether to show error to user
     */
    handleError(error, context = 'Unknown', showUser = false) {
        const errorInfo = {
            message: error.message,
            stack: error.stack,
            context,
            timestamp: new Date().toISOString(),
            url: window.location.href,
            userAgent: navigator.userAgent
        };

        // Add to error log (with size limit)
        this.errorLog.push(errorInfo);
        if (this.errorLog.length > this.maxLogSize) {
            this.errorLog.shift();
        }

        // Console logging with better formatting
        console.group(`🚨 ${context}`);
        console.error('Message:', error.message);
        console.error('Stack:', error.stack);
        console.error('Context:', context);
        console.groupEnd();

        // User notification for critical errors
        if (showUser) {
            this.showUserError(error.message, context);
        }
    }

    /**
     * Show user-friendly error message
     * @param {string} message - Error message
     * @param {string} context - Error context
     */
    showUserError(message, context) {
        const errorToast = document.createElement('div');
        errorToast.className = 'error-toast';
        errorToast.innerHTML = `
            <div class="error-toast-content">
                <i class="fas fa-exclamation-triangle"></i>
                <div>
                    <strong>Something went wrong</strong>
                    <p>We're working to fix this issue. Please refresh the page.</p>
                </div>
                <button class="error-toast-close" onclick="this.parentElement.parentElement.remove()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `;

        // Add CSS if not already present
        if (!document.querySelector('#error-handler-styles')) {
            const styles = document.createElement('style');
            styles.id = 'error-handler-styles';
            styles.textContent = `
                .error-toast {
                    position: fixed;
                    top: 20px;
                    right: 20px;
                    background: #f44336;
                    color: white;
                    padding: 1rem;
                    border-radius: 8px;
                    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
                    z-index: 10000;
                    max-width: 400px;
                    animation: slideIn 0.3s ease-out;
                }
                .error-toast-content {
                    display: flex;
                    align-items: flex-start;
                    gap: 12px;
                }
                .error-toast-close {
                    background: none;
                    border: none;
                    color: white;
                    cursor: pointer;
                    font-size: 18px;
                    padding: 4px;
                }
                @keyframes slideIn {
                    from { transform: translateX(100%); opacity: 0; }
                    to { transform: translateX(0); opacity: 1; }
                }
            `;
            document.head.appendChild(styles);
        }

        document.body.appendChild(errorToast);

        // Auto-remove after 8 seconds
        setTimeout(() => {
            if (errorToast.parentNode) {
                errorToast.style.animation = 'slideIn 0.3s ease-out reverse';
                setTimeout(() => errorToast.remove(), 300);
            }
        }, 8000);
    }

    /**
     * Async wrapper with automatic error handling
     * @param {Function} asyncFn - Async function to wrap
     * @param {string} context - Context for error reporting
     * @returns {Function} Wrapped function
     */
    wrapAsync(asyncFn, context) {
        return async (...args) => {
            try {
                return await asyncFn(...args);
            } catch (error) {
                this.handleError(error, context, true);
                throw error; // Re-throw for caller handling
            }
        };
    }

    /**
     * Safe DOM operation wrapper
     * @param {Function} domFn - DOM manipulation function
     * @param {string} context - Context for error reporting
     * @returns {any} Function result or null on error
     */
    safeDOMOperation(domFn, context) {
        try {
            return domFn();
        } catch (error) {
            this.handleError(error, `DOM: ${context}`);
            return null;
        }
    }

    /**
     * Get error log for debugging
     * @returns {Array} Recent error log
     */
    getErrorLog() {
        return [...this.errorLog];
    }

    /**
     * Clear error log
     */
    clearErrorLog() {
        this.errorLog = [];
    }
}

// Create global error handler instance
const errorHandler = new ErrorHandler();

// Make available globally
window.ErrorHandler = errorHandler;

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ErrorHandler;
}