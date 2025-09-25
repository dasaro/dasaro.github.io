/**
 * Performance Optimization Utilities
 * Leverages modern Web APIs for better performance and user experience
 */

class PerformanceUtils {
    constructor() {
        this.observer = null;
        this.resizeObserver = null;
        this.intersectionObserver = null;
    }

    /**
     * Lazy load images with Intersection Observer
     * @param {string} selector - Selector for images to lazy load
     */
    setupLazyLoading(selector = 'img[data-src]') {
        if (!('IntersectionObserver' in window)) {
            // Fallback: load all images immediately
            document.querySelectorAll(selector).forEach(img => {
                img.src = img.dataset.src;
            });
            return;
        }

        this.intersectionObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    this.intersectionObserver.unobserve(img);
                }
            });
        }, {
            rootMargin: '50px 0px', // Start loading 50px before visible
            threshold: 0.1
        });

        document.querySelectorAll(selector).forEach(img => {
            this.intersectionObserver.observe(img);
        });
    }

    /**
     * Efficient DOM updates using DocumentFragment
     * @param {HTMLElement} container - Container to update
     * @param {Array} items - Items to render
     * @param {Function} renderItem - Function to render each item
     */
    batchDOMUpdates(container, items, renderItem) {
        const fragment = document.createDocumentFragment();

        items.forEach(item => {
            const element = renderItem(item);
            if (element) {
                fragment.appendChild(element);
            }
        });

        // Single DOM update
        container.innerHTML = '';
        container.appendChild(fragment);
    }

    /**
     * Throttle function using requestAnimationFrame
     * @param {Function} func - Function to throttle
     * @returns {Function} Throttled function
     */
    throttleRAF(func) {
        let ticking = false;

        return function(...args) {
            if (!ticking) {
                requestAnimationFrame(() => {
                    func.apply(this, args);
                    ticking = false;
                });
                ticking = true;
            }
        };
    }

    /**
     * Debounce with AbortController for cancellation
     * @param {Function} func - Function to debounce
     * @param {number} wait - Wait time in ms
     * @returns {Function} Debounced function with cancel method
     */
    debounceCancellable(func, wait) {
        let timeoutId;
        let controller = new AbortController();

        const debounced = function(...args) {
            clearTimeout(timeoutId);
            controller.abort();
            controller = new AbortController();

            timeoutId = setTimeout(() => {
                if (!controller.signal.aborted) {
                    func.apply(this, args);
                }
            }, wait);
        };

        debounced.cancel = () => {
            clearTimeout(timeoutId);
            controller.abort();
        };

        return debounced;
    }

    /**
     * Preload critical resources
     * @param {Array} resources - Array of resource objects {href, as, type}
     */
    preloadResources(resources) {
        resources.forEach(resource => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.href = resource.href;
            link.as = resource.as;
            if (resource.type) link.type = resource.type;
            document.head.appendChild(link);
        });
    }

    /**
     * Monitor Core Web Vitals
     */
    async monitorWebVitals() {
        try {
            // Dynamic import for web vitals (if available)
            if ('PerformanceObserver' in window) {
                const observer = new PerformanceObserver((list) => {
                    list.getEntries().forEach((entry) => {
                        if (entry.entryType === 'measure') {
                            console.log(`Performance: ${entry.name} took ${entry.duration.toFixed(2)}ms`);
                        }
                    });
                });
                observer.observe({ entryTypes: ['measure'] });
            }

            // Basic performance measurements
            window.addEventListener('load', () => {
                const perfData = performance.getEntriesByType('navigation')[0];
                console.group('🚀 Performance Metrics');
                console.log('DOM Content Loaded:', perfData.domContentLoadedEventEnd - perfData.domContentLoadedEventStart + 'ms');
                console.log('Page Load:', perfData.loadEventEnd - perfData.loadEventStart + 'ms');
                console.log('Time to Interactive:', perfData.domInteractive - perfData.navigationStart + 'ms');
                console.groupEnd();
            });

        } catch (error) {
            console.warn('Performance monitoring not available:', error);
        }
    }

    /**
     * Optimize scroll performance
     * @param {Function} callback - Scroll callback
     * @returns {Function} Optimized scroll handler
     */
    optimizeScroll(callback) {
        let isScrolling = false;

        return this.throttleRAF(() => {
            if (!isScrolling) {
                isScrolling = true;
                callback();
                requestAnimationFrame(() => {
                    isScrolling = false;
                });
            }
        });
    }

    /**
     * Memory usage monitoring (if available)
     */
    monitorMemory() {
        if ('memory' in performance) {
            const logMemory = () => {
                const memory = performance.memory;
                console.log(`Memory: ${(memory.usedJSHeapSize / 1048576).toFixed(2)}MB used / ${(memory.totalJSHeapSize / 1048576).toFixed(2)}MB total`);
            };

            // Log memory usage every 30 seconds in development
            if (window.location.hostname === 'localhost') {
                setInterval(logMemory, 30000);
            }
        }
    }

    /**
     * Clean up observers
     */
    cleanup() {
        if (this.intersectionObserver) {
            this.intersectionObserver.disconnect();
        }
        if (this.resizeObserver) {
            this.resizeObserver.disconnect();
        }
    }
}

// Create global performance utils instance
const performanceUtils = new PerformanceUtils();

// Auto-initialize monitoring in development
if (window.location.hostname === 'localhost') {
    performanceUtils.monitorWebVitals();
    performanceUtils.monitorMemory();
}

// Make available globally
window.PerformanceUtils = performanceUtils;

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = PerformanceUtils;
}