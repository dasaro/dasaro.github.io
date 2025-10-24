/**
 * Main JavaScript file for Academic Website
 * Handles JSON loading, navigation, and core functionality
 */

// ============================================
// JSON Loading Utility
// ============================================

/**
 * Loads JSON data from a specified path
 * @param {string} path - Path to the JSON file
 * @returns {Promise<Object|null>} - Parsed JSON data or null on error
 */
async function loadJSON(path) {
  console.log(`[loadJSON] Attempting to load: ${path}`);
  try {
    const response = await fetch(path);
    console.log(`[loadJSON] Response status for ${path}:`, response.status, response.statusText);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log(`[loadJSON] Successfully loaded ${path}. Data keys:`, Object.keys(data));
    console.log(`[loadJSON] Data preview:`, data);
    return data;
  } catch (error) {
    console.error(`[loadJSON] Error loading ${path}:`, error);
    console.error(`[loadJSON] Error details:`, error.message, error.stack);
    return null;
  }
}

// ============================================
// Navigation Functionality
// ============================================
// NOTE: Navigation is now handled by js/navigation.js
// This section kept for backward compatibility but delegates to NavigationManager

/**
 * Initializes navigation menu including mobile hamburger menu
 * @deprecated Use NavigationManager.init() from navigation.js instead
 */
function initNavigation() {
  console.log('[main.js] initNavigation() called - delegating to NavigationManager');
  // Navigation is now handled by navigation.js
  // This function kept for backward compatibility
}

/**
 * Sets the active class on the current page's navigation link
 * @deprecated Use NavigationManager.setActivePage() instead
 */
function setActivePage() {
  console.log('[main.js] setActivePage() called - delegating to NavigationManager');
  // Navigation is now handled by navigation.js
  // This function kept for backward compatibility
}

// ============================================
// Scroll Animations
// ============================================

/**
 * Initializes scroll-triggered animations
 */
function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, observerOptions);

  // Observe all elements with scroll-animate class
  const animatedElements = document.querySelectorAll('.scroll-animate');
  animatedElements.forEach(el => observer.observe(el));
}

// ============================================
// Smooth Scrolling for Anchor Links
// ============================================

/**
 * Enables smooth scrolling for internal anchor links
 */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');

      // Skip if it's just "#"
      if (href === '#') return;

      e.preventDefault();
      const target = document.querySelector(href);

      if (target) {
        const navHeight = document.querySelector('.nav-wrapper')?.offsetHeight || 0;
        const targetPosition = target.offsetTop - navHeight - 20;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

// ============================================
// Update Footer Year
// ============================================

/**
 * Updates the copyright year in the footer
 */
function updateFooterYear() {
  const yearElement = document.querySelector('.footer-year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
}

// ============================================
// Back to Top Button
// ============================================

/**
 * Creates and manages a "back to top" button
 */
function initBackToTop() {
  // Create button if it doesn't exist
  let backToTopBtn = document.querySelector('.back-to-top');

  if (!backToTopBtn) {
    backToTopBtn = document.createElement('button');
    backToTopBtn.className = 'back-to-top';
    backToTopBtn.innerHTML = '↑';
    backToTopBtn.setAttribute('aria-label', 'Back to top');
    document.body.appendChild(backToTopBtn);
  }

  // Show/hide button based on scroll position
  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }
  });

  // Scroll to top when clicked
  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

// ============================================
// Utility Functions
// ============================================

/**
 * Formats a date string to a readable format
 * @param {string} dateString - Date in YYYY-MM-DD format
 * @returns {string} - Formatted date
 */
function formatDate(dateString) {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('en-US', options);
}

/**
 * Debounce function to limit the rate at which a function can fire
 * @param {Function} func - Function to debounce
 * @param {number} wait - Time to wait in milliseconds
 * @returns {Function} - Debounced function
 */
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

/**
 * Show loading spinner
 * @param {HTMLElement} container - Container element
 */
function showLoading(container) {
  if (container) {
    container.innerHTML = '<div class="spinner"></div>';
  }
}

/**
 * Show error message
 * @param {HTMLElement} container - Container element
 * @param {string} message - Error message
 */
function showError(container, message = 'Error loading data') {
  if (container) {
    container.innerHTML = `<p class="error-message">${message}</p>`;
  }
}

// ============================================
// Initialize on DOM Content Loaded
// ============================================

/**
 * Load and populate footer with personal data
 */
async function loadFooterData() {
  try {
    const personalData = await loadJSON('./data/personal.json');
    if (personalData) {
      // Update footer name
      const footerName = document.getElementById('footer-name');
      if (footerName) {
        footerName.textContent = personalData.name;
      }

      // Update footer GitHub link
      const footerGithub = document.getElementById('footer-github');
      if (footerGithub && personalData.contact && personalData.contact.github) {
        footerGithub.href = `https://github.com/${personalData.contact.github}`;
        console.log('[Footer] ✓ Updated GitHub link');
      }

      // Update footer Google Scholar link
      const footerScholar = document.getElementById('footer-scholar');
      if (footerScholar && personalData.contact && personalData.contact.scholar) {
        footerScholar.href = `https://scholar.google.com/citations?user=${personalData.contact.scholar}`;
        console.log('[Footer] ✓ Updated Google Scholar link');
      }

      // Update footer ORCID link
      const footerOrcid = document.getElementById('footer-orcid');
      if (footerOrcid && personalData.contact && personalData.contact.orcid) {
        footerOrcid.href = `https://orcid.org/${personalData.contact.orcid}`;
        console.log('[Footer] ✓ Updated ORCID link');
      }

      console.log('[Footer] ✓ Footer data loaded from personal.json');
    }
  } catch (error) {
    console.error('[Footer] Error loading footer data:', error);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  // Core initialization
  // NOTE: Navigation handled by navigation.js (auto-initializes)
  initSmoothScroll();
  initScrollAnimations();
  updateFooterYear();
  loadFooterData(); // Load footer data on all pages

  // Optional features
  if (document.body.classList.contains('enable-back-to-top')) {
    initBackToTop();
  }

  // Log that the site is loaded
  console.log('Academic Website Loaded | Fabio Aurelio D\'Asaro');
  console.log('∀x (Logic(x) → Elegant(x))');

  // Initialize fancy navigation scroll effect
  initFancyNavigation();
});

// ============================================
// Fancy Navigation Scroll Effects ✨
// ============================================

/**
 * Adds fancy scroll effects to navigation bar
 */
function initFancyNavigation() {
  const navWrapper = document.querySelector('.nav-wrapper');
  if (!navWrapper) return;

  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    // Add enhanced shadow effect when scrolled
    if (currentScroll > 50) {
      navWrapper.classList.add('scrolled');
    } else {
      navWrapper.classList.remove('scrolled');
    }

    lastScroll = currentScroll;
  });

  console.log('[main.js] ✨ Fancy navigation effects initialized');
}

// ============================================
// Export functions for use in other modules
// ============================================

// Make functions available globally
window.loadJSON = loadJSON;
window.formatDate = formatDate;
window.debounce = debounce;
window.showLoading = showLoading;
window.showError = showError;
