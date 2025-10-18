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

/**
 * Initializes navigation menu including mobile hamburger menu
 */
function initNavigation() {
  const navToggle = document.querySelector('.nav-toggle');
  const navMenu = document.querySelector('.nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  // Mobile menu toggle
  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      navToggle.classList.toggle('active');
      navMenu.classList.toggle('active');
    });

    // Close menu when clicking on a link
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
      });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
      }
    });
  }

  // Set active page in navigation
  setActivePage();
}

/**
 * Sets the active class on the current page's navigation link
 */
function setActivePage() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-link');

  navLinks.forEach(link => {
    const linkPage = link.getAttribute('href');
    if (linkPage === currentPage || (currentPage === '' && linkPage === 'index.html')) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
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
      }

      // Update footer Scholar link
      const footerScholar = document.getElementById('footer-scholar');
      if (footerScholar && personalData.contact && personalData.contact.scholar) {
        footerScholar.href = personalData.contact.scholar;
      }
    }
  } catch (error) {
    console.error('Error loading footer data:', error);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  // Core initialization
  initNavigation();
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
});

// ============================================
// Export functions for use in other modules
// ============================================

// Make functions available globally
window.loadJSON = loadJSON;
window.formatDate = formatDate;
window.debounce = debounce;
window.showLoading = showLoading;
window.showError = showError;
