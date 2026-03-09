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
    { href: 'dissertation-info.html', label: 'Students', page: 'students' },
    { href: 'contact.html', label: 'Contact', page: 'contact' }
  ];

  /**
   * Initialize navigation system
   */
  static init() {
    // Inject navigation HTML
    this.injectNavigation();

    // Set active page
    this.setActivePage();

    // Setup mobile menu toggle
    this.setupMobileMenu();

  }

  /**
   * Inject navigation HTML into the page
   */
  static injectNavigation() {
    const navPlaceholder = document.getElementById('nav-placeholder');

    if (!navPlaceholder) {
      return;
    }

    const navHTML = this.generateHTML();
    navPlaceholder.outerHTML = navHTML;
  }

  /**
   * Set active class on current page's navigation link
   */
  static setActivePage() {
    // Get current page from multiple sources (most reliable)
    const pathname = window.location.pathname;
    const filename = pathname.split('/').pop() || 'index.html';
    const dataPage = document.body.getAttribute('data-page');

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
      return;
    }

    const setExpanded = (expanded) => {
      navToggle.setAttribute('aria-expanded', expanded ? 'true' : 'false');
    };

    // Toggle menu on button click
    navToggle.addEventListener('click', () => {
      const expanded = !navMenu.classList.contains('active');
      navToggle.classList.toggle('active', expanded);
      navMenu.classList.toggle('active', expanded);
      setExpanded(expanded);
    });

    // Close menu when clicking a link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
        setExpanded(false);
      });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
        setExpanded(false);
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
        setExpanded(false);
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
        <nav aria-label="Primary">
          <a href="index.html" class="nav-brand">
            <span class="logic-symbol">∀</span>
            F.A. D'Asaro
          </a>

          <button class="nav-toggle" aria-label="Toggle navigation" aria-controls="site-navigation" aria-expanded="false">
            <span></span>
            <span></span>
            <span></span>
          </button>

          <ul class="nav-menu" id="site-navigation">
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
