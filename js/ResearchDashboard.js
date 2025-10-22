/**
 * Research Dashboard - Data Visualization for Homepage
 *
 * Displays research metrics, publication timeline, and topic cloud
 * @author Fabio Aurelio D'Asaro
 * @version 3.0 - Phase 3: Interactivity, Polish & Enhancements
 */

import { loadJSON, getElement, createElement, showError, showLoading } from './utils.js';

/**
 * ResearchDashboard class - Manages dashboard data and visualization
 */
class ResearchDashboard {
  constructor() {
    this.personalData = null;
    this.publicationsData = null;
    this.stats = null;
    this.chartBars = []; // Store bar positions for interactivity
    this.tooltip = null;
    this.isLoading = true;
  }

  /**
   * Initialize dashboard - load data and render all components
   */
  async init() {
    console.log('[ResearchDashboard] Initializing...');

    try {
      // Show loading states
      this.showLoadingStates();

      // Load data
      await this.loadData();

      if (!this.personalData || !this.publicationsData) {
        console.error('[ResearchDashboard] Failed to load required data');
        this.showErrorState();
        return;
      }

      // Calculate statistics
      this.calculateStats();

      // Render components
      this.renderQuickStats();
      this.renderTimeline();
      this.renderMetrics();
      this.renderTopicsCloud();

      // Set up interactivity
      this.setupTooltip();
      this.setupChartInteractivity();
      this.setupScrollAnimations();

      this.isLoading = false;
      console.log('[ResearchDashboard] ✓ Initialization complete');
    } catch (error) {
      console.error('[ResearchDashboard] Initialization error:', error);
      this.showErrorState();
    }
  }

  /**
   * Show loading skeleton states
   */
  showLoadingStates() {
    // Quick stats loading
    const statsContainer = getElement('quick-stats-container', 'ResearchDashboard');
    if (statsContainer) {
      statsContainer.innerHTML = `
        <div class="stat-card skeleton"></div>
        <div class="stat-card skeleton"></div>
        <div class="stat-card skeleton"></div>
        <div class="stat-card skeleton"></div>
      `;
    }

    // Timeline loading
    const timelineCard = document.querySelector('.timeline-card');
    if (timelineCard) {
      timelineCard.classList.add('loading');
    }

    console.log('[ResearchDashboard] ✓ Loading states displayed');
  }

  /**
   * Show error state
   */
  showErrorState() {
    const container = getElement('research-overview', 'ResearchDashboard');
    if (!container) return;

    const errorHTML = `
      <div class="dashboard-error">
        <p><strong>⚠️ Unable to load research data</strong></p>
        <p>Please refresh the page or check back later.</p>
      </div>
    `;

    container.innerHTML = errorHTML;
    console.log('[ResearchDashboard] ✓ Error state displayed');
  }

  /**
   * Load data from JSON files
   */
  async loadData() {
    try {
      console.log('[ResearchDashboard] Loading data...');

      // Load personal data
      this.personalData = await loadJSON('./data/personal.json', 'ResearchDashboard');

      // Load publications data
      this.publicationsData = await loadJSON('./data/publications.json', 'ResearchDashboard');

      console.log('[ResearchDashboard] ✓ Data loaded successfully');
    } catch (error) {
      console.error('[ResearchDashboard] Error loading data:', error);
      throw error;
    }
  }

  /**
   * Calculate statistics from publications data
   */
  calculateStats() {
    console.log('[ResearchDashboard] Calculating statistics...');

    const pubs = this.publicationsData.all || [];

    // Count by type
    const byType = {
      journal: 0,
      conference: 0,
      workshop: 0,
      'book-chapter': 0,
      preprint: 0
    };

    // Count by year
    const byYear = {};

    // Collect all tags
    const allTags = new Set();

    pubs.forEach(pub => {
      // Count by type
      if (pub.type && byType.hasOwnProperty(pub.type)) {
        byType[pub.type]++;
      }

      // Count by year
      const year = pub.year;
      if (year) {
        byYear[year] = (byYear[year] || 0) + 1;
      }

      // Collect tags
      if (pub.tags && Array.isArray(pub.tags)) {
        pub.tags.forEach(tag => allTags.add(tag));
      }
    });

    // Sort years
    const yearsSorted = Object.keys(byYear)
      .map(y => parseInt(y))
      .sort((a, b) => a - b);

    this.stats = {
      total: pubs.length,
      byType,
      byYear,
      yearsSorted,
      tags: Array.from(allTags).sort(),
      yearRange: yearsSorted.length > 0
        ? `${yearsSorted[0]}–${yearsSorted[yearsSorted.length - 1]}`
        : 'N/A'
    };

    console.log('[ResearchDashboard] ✓ Statistics calculated:', this.stats);
  }

  /**
   * Render quick statistics cards
   */
  renderQuickStats() {
    const container = getElement('quick-stats-container', 'ResearchDashboard');
    if (!container || !this.stats) return;

    const stats = [
      {
        value: this.stats.total,
        label: 'Publications',
        icon: '📚'
      },
      {
        value: this.stats.byType.journal,
        label: 'Journal Articles',
        icon: '📄'
      },
      {
        value: this.stats.byType.conference,
        label: 'Conference Papers',
        icon: '🎤'
      },
      {
        value: this.stats.yearRange,
        label: 'Years Active',
        icon: '📅'
      }
    ];

    const html = stats.map((stat, index) => `
      <div class="stat-card scroll-animate visible" style="animation-delay: ${index * 0.1}s">
        <div class="stat-icon">${stat.icon}</div>
        <div class="stat-value">${stat.value}</div>
        <div class="stat-label">${stat.label}</div>
      </div>
    `).join('');

    container.innerHTML = html;
    console.log('[ResearchDashboard] ✓ Quick stats rendered');
  }

  /**
   * Render publications timeline chart
   */
  renderTimeline() {
    const canvas = getElement('publications-timeline', 'ResearchDashboard');
    if (!canvas || !this.stats) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) {
      console.error('[ResearchDashboard] Failed to get canvas context');
      return;
    }

    // Set canvas dimensions
    const container = canvas.parentElement;
    const width = container.clientWidth - 48; // Account for padding
    const height = canvas.height || 300;

    canvas.width = width;
    canvas.height = height;

    // Clear canvas and bar positions
    ctx.clearRect(0, 0, width, height);
    this.chartBars = [];

    // Chart parameters
    const padding = 40;
    const chartWidth = width - padding * 2;
    const chartHeight = height - padding * 2;

    const years = this.stats.yearsSorted;
    const counts = years.map(year => this.stats.byYear[year]);
    const maxCount = Math.max(...counts, 1);

    // Draw axes
    ctx.strokeStyle = '#5C2C2C';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(padding, padding);
    ctx.lineTo(padding, height - padding);
    ctx.lineTo(width - padding, height - padding);
    ctx.stroke();

    // Draw bars
    const barWidth = chartWidth / years.length * 0.7;
    const barGap = chartWidth / years.length * 0.3;

    years.forEach((year, i) => {
      const count = counts[i];
      const barHeight = (count / maxCount) * chartHeight;
      const x = padding + (chartWidth / years.length) * i + barGap / 2;
      const y = height - padding - barHeight;

      // Store bar position for interactivity
      this.chartBars.push({
        year,
        count,
        x,
        y,
        width: barWidth,
        height: barHeight
      });

      // Draw bar with gradient
      const gradient = ctx.createLinearGradient(x, y, x, height - padding);
      gradient.addColorStop(0, '#8B0000');
      gradient.addColorStop(1, '#CD5C5C');

      ctx.fillStyle = gradient;
      ctx.fillRect(x, y, barWidth, barHeight);

      // Draw year label
      ctx.fillStyle = '#5C2C2C';
      ctx.font = '12px "Fira Code", monospace';
      ctx.textAlign = 'center';
      ctx.fillText(year, x + barWidth / 2, height - padding + 20);

      // Draw count label
      if (barHeight > 20) {
        ctx.fillStyle = '#FFFFFF';
        ctx.font = 'bold 14px "Fira Code", monospace';
        ctx.fillText(count, x + barWidth / 2, y + 15);
      }
    });

    // Y-axis labels
    ctx.fillStyle = '#5C2C2C';
    ctx.font = '12px "Fira Code", monospace';
    ctx.textAlign = 'right';
    for (let i = 0; i <= 5; i++) {
      const value = Math.round((maxCount / 5) * i);
      const y = height - padding - (chartHeight / 5) * i;
      ctx.fillText(value, padding - 10, y + 4);
    }

    // Remove loading state
    const timelineCard = document.querySelector('.timeline-card');
    if (timelineCard) {
      timelineCard.classList.remove('loading');
    }

    console.log('[ResearchDashboard] ✓ Timeline chart rendered');
  }

  /**
   * Set up tooltip for chart
   */
  setupTooltip() {
    // Create tooltip element if it doesn't exist
    if (!this.tooltip) {
      this.tooltip = document.createElement('div');
      this.tooltip.className = 'chart-tooltip';
      this.tooltip.style.display = 'none';
      document.body.appendChild(this.tooltip);
    }

    console.log('[ResearchDashboard] ✓ Tooltip initialized');
  }

  /**
   * Set up chart interactivity (hover, click)
   */
  setupChartInteractivity() {
    const canvas = getElement('publications-timeline', 'ResearchDashboard');
    if (!canvas) return;

    // Mouse move for tooltips
    canvas.addEventListener('mousemove', (e) => this.handleChartHover(e));

    // Mouse leave to hide tooltip
    canvas.addEventListener('mouseleave', () => this.hideTooltip());

    // Click to navigate to publications
    canvas.addEventListener('click', (e) => this.handleChartClick(e));

    // Change cursor on hover
    canvas.style.cursor = 'pointer';

    console.log('[ResearchDashboard] ✓ Chart interactivity enabled');
  }

  /**
   * Handle chart hover - show tooltip
   */
  handleChartHover(e) {
    if (!this.tooltip || this.chartBars.length === 0) return;

    const canvas = e.target;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Find hovered bar
    const hoveredBar = this.chartBars.find(bar =>
      x >= bar.x &&
      x <= bar.x + bar.width &&
      y >= bar.y &&
      y <= bar.y + bar.height
    );

    if (hoveredBar) {
      // Show tooltip
      const publicationType = this.getPublicationBreakdown(hoveredBar.year);
      this.tooltip.innerHTML = `
        <strong>${hoveredBar.year}</strong><br>
        ${hoveredBar.count} publication${hoveredBar.count !== 1 ? 's' : ''}<br>
        <small style="opacity: 0.8;">${publicationType}</small><br>
        <em style="font-size: 0.85em; opacity: 0.7;">Click to view</em>
      `;
      this.tooltip.style.display = 'block';
      this.tooltip.style.left = (e.clientX + 10) + 'px';
      this.tooltip.style.top = (e.clientY - 10) + 'px';
    } else {
      this.hideTooltip();
    }
  }

  /**
   * Get publication breakdown for a year
   */
  getPublicationBreakdown(year) {
    const pubs = this.publicationsData.all.filter(p => p.year === year);
    const types = {};

    pubs.forEach(pub => {
      if (pub.type) {
        types[pub.type] = (types[pub.type] || 0) + 1;
      }
    });

    const breakdown = Object.entries(types)
      .map(([type, count]) => {
        const label = type === 'book-chapter' ? 'book ch.' : type;
        return `${count} ${label}`;
      })
      .join(', ');

    return breakdown || 'Various types';
  }

  /**
   * Hide tooltip
   */
  hideTooltip() {
    if (this.tooltip) {
      this.tooltip.style.display = 'none';
    }
  }

  /**
   * Handle chart click - navigate to filtered publications
   */
  handleChartClick(e) {
    if (this.chartBars.length === 0) return;

    const canvas = e.target;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Find clicked bar
    const clickedBar = this.chartBars.find(bar =>
      x >= bar.x &&
      x <= bar.x + bar.width &&
      y >= bar.y &&
      y <= bar.y + bar.height
    );

    if (clickedBar) {
      // Navigate to publications page with year filter
      window.location.href = `publications.html?year=${clickedBar.year}`;
      console.log(`[ResearchDashboard] Navigating to publications for ${clickedBar.year}`);
    }
  }

  /**
   * Set up scroll animations for dashboard
   */
  setupScrollAnimations() {
    const dashboardSection = document.getElementById('research-overview');
    if (!dashboardSection) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    observer.observe(dashboardSection);
    console.log('[ResearchDashboard] ✓ Scroll animations enabled');
  }

  /**
   * Render citation metrics with progress bars
   */
  renderMetrics() {
    if (!this.personalData || !this.personalData.scholar_metrics) {
      console.warn('[ResearchDashboard] No scholar metrics available');
      return;
    }

    const metrics = this.personalData.scholar_metrics;

    // Update metric values
    const citationsEl = document.querySelector('[data-metric="citations"]');
    const hIndexEl = document.querySelector('[data-metric="h_index"]');
    const i10IndexEl = document.querySelector('[data-metric="i10_index"]');
    const dateEl = getElement('metrics-date', 'ResearchDashboard');

    if (citationsEl) citationsEl.textContent = metrics.citations;
    if (hIndexEl) hIndexEl.textContent = metrics.h_index;
    if (i10IndexEl) i10IndexEl.textContent = metrics.i10_index;

    // Update date
    if (dateEl && metrics.last_updated) {
      const date = new Date(metrics.last_updated);
      dateEl.textContent = date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long'
      });
    }

    // Animate progress bars with delay
    setTimeout(() => {
      this.animateProgressBars(metrics);
    }, 300);

    console.log('[ResearchDashboard] ✓ Metrics rendered');
  }

  /**
   * Animate metric progress bars
   */
  animateProgressBars(metrics) {
    // Calculate percentages (relative to max values)
    const maxCitations = 500; // Adjust based on field
    const maxHIndex = 20;
    const maxI10Index = 20;

    const percentages = {
      citations: Math.min((metrics.citations / maxCitations) * 100, 100),
      h_index: Math.min((metrics.h_index / maxHIndex) * 100, 100),
      i10_index: Math.min((metrics.i10_index / maxI10Index) * 100, 100)
    };

    // Find all metric bars and animate
    const metricItems = document.querySelectorAll('.metric-item');
    metricItems.forEach((item, index) => {
      const bar = item.querySelector('.metric-bar-fill');
      if (bar) {
        const metric = ['citations', 'h_index', 'i10_index'][index];
        // Animate with slight delay between bars
        setTimeout(() => {
          bar.style.width = percentages[metric] + '%';
        }, index * 100);
      }
    });

    console.log('[ResearchDashboard] ✓ Progress bars animated');
  }

  /**
   * Render research topics cloud
   */
  renderTopicsCloud() {
    const container = getElement('topics-cloud', 'ResearchDashboard');
    if (!container || !this.stats) return;

    const tags = this.stats.tags;

    if (tags.length === 0) {
      container.innerHTML = '<p class="text-muted">No topics available</p>';
      return;
    }

    // Count publications per tag
    const tagCounts = {};
    const pubs = this.publicationsData.all || [];

    pubs.forEach(pub => {
      if (pub.tags && Array.isArray(pub.tags)) {
        pub.tags.forEach(tag => {
          tagCounts[tag] = (tagCounts[tag] || 0) + 1;
        });
      }
    });

    // Sort by count (most popular first) and take top 12
    const topTags = tags
      .map(tag => ({ tag, count: tagCounts[tag] || 0 }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 12);

    const html = topTags.map(({ tag, count }) => `
      <a href="publications.html?tag=${encodeURIComponent(tag)}" class="topic-tag" title="${count} publication${count !== 1 ? 's' : ''}">
        ${tag} <span style="font-size: 0.8em; opacity: 0.7;">(${count})</span>
      </a>
    `).join('');

    container.innerHTML = html;
    console.log('[ResearchDashboard] ✓ Topics cloud rendered with', topTags.length, 'tags');
  }

  /**
   * Resize handler for responsive charts
   */
  handleResize() {
    console.log('[ResearchDashboard] Handling resize...');

    // Debounce resize events
    if (this.resizeTimeout) {
      clearTimeout(this.resizeTimeout);
    }

    this.resizeTimeout = setTimeout(() => {
      if (this.stats) {
        this.renderTimeline();
        this.setupChartInteractivity(); // Re-setup after redraw
      }
    }, 250);
  }
}

// Create singleton instance
const dashboardInstance = new ResearchDashboard();

// Initialize on DOM load
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    dashboardInstance.init();
  });
} else {
  dashboardInstance.init();
}

// Handle window resize for responsive charts
window.addEventListener('resize', () => {
  dashboardInstance.handleResize();
});

// Export for testing/debugging
export default dashboardInstance;
