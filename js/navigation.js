/**
 * Navigation Component
 *
 * Centralized navigation system for the website.
 * Dynamically generates navigation HTML and handles active page highlighting.
 *
 * Usage: Include this file in all HTML pages before other scripts.
 * Navigation HTML is automatically injected on page load.
 */

class NavigationManager {
  /**
   * Navigation structure - single source of truth
   * Add/remove/reorder pages here - changes propagate to ALL pages automatically
   */
  static pages = [
    { href: 'index.html', label: 'Home', page: 'home' },
    { href: 'about.html', label: 'About', page: 'about' },
    { href: 'publications.html', label: 'Publications', page: 'publications' },
    { href: 'teaching.html', label: 'Teaching', page: 'teaching' },
    { href: 'projects.html', label: 'Projects', page: 'projects' },
    { href: 'service.html', label: 'Service', page: 'service' },
    { href: 'backgrounds.html', label: 'Backgrounds', page: 'backgrounds' },
    { href: 'contact.html', label: 'Contact', page: 'contact' }
  ];

  /**
   * Initialize navigation system
   */
  static init() {
    console.log('[NavigationManager] Initializing...');

    // Inject navigation HTML
    this.injectNavigation();

    // Set active page
    this.setActivePage();

    // Setup mobile menu toggle
    this.setupMobileMenu();

    console.log('[NavigationManager] ✓ Initialized');
  }

  /**
   * Inject navigation HTML into the page
   */
  static injectNavigation() {
    const navPlaceholder = document.getElementById('nav-placeholder');

    if (!navPlaceholder) {
      console.warn('[NavigationManager] No nav-placeholder found, skipping injection');
      return;
    }

    const navHTML = this.generateHTML();
    navPlaceholder.outerHTML = navHTML;
    console.log('[NavigationManager] ✓ Navigation HTML injected');
  }

  /**
   * Set active class on current page's navigation link
   */
  static setActivePage() {
    // Get current page from multiple sources (most reliable)
    const pathname = window.location.pathname;
    const filename = pathname.split('/').pop() || 'index.html';
    const dataPage = document.body.getAttribute('data-page');

    console.log('[NavigationManager] Current page:', { pathname, filename, dataPage });

    const navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach(link => {
      const linkHref = link.getAttribute('href');
      let isActive = false;

      // Match by filename
      if (linkHref === filename) {
        isActive = true;
      }
      // Match by data-page attribute
      else if (dataPage) {
        const pageConfig = this.pages.find(p => p.page === dataPage);
        if (pageConfig && linkHref === pageConfig.href) {
          isActive = true;
        }
      }
      // Handle root/index edge case
      else if (filename === '' && linkHref === 'index.html') {
        isActive = true;
      }

      if (isActive) {
        link.classList.add('active');
        console.log('[NavigationManager] Active page:', linkHref);
      } else {
        link.classList.remove('active');
      }
    });
  }

  /**
   * Setup mobile menu toggle functionality
   */
  static setupMobileMenu() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (!navToggle || !navMenu) {
      console.warn('[NavigationManager] Mobile menu elements not found');
      return;
    }

    // Toggle menu on button click
    navToggle.addEventListener('click', () => {
      navToggle.classList.toggle('active');
      navMenu.classList.toggle('active');
    });

    // Close menu when clicking a link
    const navLinks = document.querySelectorAll('.nav-link');
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

  /**
   * Generate complete navigation HTML
   * This is injected into every page automatically
   */
  static generateHTML() {
    const navLinks = this.pages.map(page => `
      <li><a href="${page.href}" class="nav-link">${page.label}</a></li>
    `).join('');

    return `
      <div class="nav-wrapper">
        <nav>
          <a href="index.html" class="nav-brand">
            <span class="logic-symbol">∀</span>
            F.A. D'Asaro
          </a>

          <button class="nav-toggle" aria-label="Toggle navigation">
            <span></span>
            <span></span>
            <span></span>
          </button>

          <ul class="nav-menu">
            ${navLinks}
          </ul>
        </nav>
      </div>
    `;
  }
}

// Auto-initialize on DOM ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    NavigationManager.init();
  });
} else {
  // DOM already loaded
  NavigationManager.init();
}

// Export for global access
window.NavigationManager = NavigationManager;
