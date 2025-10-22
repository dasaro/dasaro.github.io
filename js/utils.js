/**
 * Shared Utilities for D'Asaro Academic Website
 *
 * Common functions used across multiple pages
 * @author Fabio Aurelio D'Asaro
 * @version 1.0
 */

/**
 * Safely load JSON from a URL with comprehensive error handling
 * @param {string} path - Path to JSON file (relative or absolute)
 * @param {string} context - Context for error logging (e.g., 'HomePage', 'Publications')
 * @returns {Promise<Object|null>} Parsed JSON data or null on error
 *
 * @example
 * const data = await loadJSON('./data/personal.json', 'HomePage');
 * if (data) {
 *   // Use data
 * }
 */
export async function loadJSON(path, context = 'Unknown') {
  try {
    console.log(`[loadJSON:${context}] Loading: ${path}`);

    const response = await fetch(path);

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();

    console.log(`[loadJSON:${context}] ✓ Successfully loaded ${path}`);
    return data;

  } catch (error) {
    console.error(`[loadJSON:${context}] ❌ Error loading ${path}:`, error);
    return null;
  }
}

/**
 * Safely get element by ID with error logging
 * @param {string} id - Element ID to find
 * @param {string} context - Context for error message
 * @returns {HTMLElement|null} Element or null if not found
 *
 * @example
 * const container = getElement('publications-container', 'Publications');
 * if (container) {
 *   container.innerHTML = '...';
 * }
 */
export function getElement(id, context = 'Unknown') {
  const element = document.getElementById(id);

  if (!element) {
    console.error(`[${context}] ❌ Element not found: #${id}`);
  }

  return element;
}

/**
 * Create HTML element with classes and optional attributes
 * @param {string} tag - HTML tag name (e.g., 'div', 'span', 'p')
 * @param {string|string[]} classes - Class name(s) to apply
 * @param {Object} attributes - Optional attributes to set
 * @returns {HTMLElement} Created element
 *
 * @example
 * const card = createElement('div', ['card', 'publication-card'], {
 *   'data-id': 'pub-123',
 *   'role': 'article'
 * });
 */
export function createElement(tag, classes = '', attributes = {}) {
  const element = document.createElement(tag);

  // Add classes
  if (Array.isArray(classes)) {
    element.classList.add(...classes);
  } else if (classes) {
    element.className = classes;
  }

  // Add attributes
  Object.entries(attributes).forEach(([key, value]) => {
    element.setAttribute(key, value);
  });

  return element;
}

/**
 * Format year range for display
 * @param {number} start - Start year
 * @param {number|string} end - End year or 'present'
 * @returns {string} Formatted range (e.g., '2020–2023' or '2020–present')
 *
 * @example
 * formatYearRange(2020, 2023)    // '2020–2023'
 * formatYearRange(2020, 'present') // '2020–present'
 */
export function formatYearRange(start, end) {
  if (!start) return '';
  if (!end) return String(start);

  const endStr = end === 'present' ? 'present' : String(end);
  return `${start}–${endStr}`;
}

/**
 * Escape HTML to prevent XSS attacks
 * @param {string} text - Text to escape
 * @returns {string} HTML-safe text
 *
 * @example
 * const safe = escapeHtml(userInput);
 * element.innerHTML = `<p>${safe}</p>`; // Safe from XSS
 */
export function escapeHtml(text) {
  if (typeof text !== 'string') return '';

  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

/**
 * Debounce function to limit call frequency
 * @param {Function} func - Function to debounce
 * @param {number} wait - Milliseconds to wait
 * @returns {Function} Debounced function
 *
 * @example
 * const search = debounce((query) => {
 *   performSearch(query);
 * }, 300);
 *
 * searchInput.addEventListener('input', (e) => search(e.target.value));
 */
export function debounce(func, wait) {
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
 * Safe async operation wrapper with error handling
 * @param {Function} operation - Async function to execute
 * @param {string} context - Context for error logging
 * @param {*} fallback - Value to return on error (default: null)
 * @returns {Promise<*>} Result of operation or fallback on error
 *
 * @example
 * const data = await safeAsync(
 *   async () => await loadJSON('./data/personal.json'),
 *   'HomePage',
 *   {} // fallback to empty object
 * );
 */
export async function safeAsync(operation, context = 'Unknown', fallback = null) {
  try {
    return await operation();
  } catch (error) {
    console.error(`[${context}] ❌ Error:`, error);
    return fallback;
  }
}

/**
 * Format author names, highlighting a specific author
 * @param {string[]} authors - Array of author names
 * @param {string} highlightName - Name to highlight (e.g., 'F. A. D\'Asaro')
 * @returns {string} HTML string with highlighted author
 *
 * @example
 * formatAuthors(['A. Smith', 'F. A. D\'Asaro', 'B. Jones'], 'F. A. D\'Asaro')
 * // Returns: 'A. Smith, <strong>F. A. D\'Asaro</strong>, B. Jones'
 */
export function formatAuthors(authors, highlightName = "F. A. D'Asaro") {
  if (!Array.isArray(authors)) return authors || '';

  const authorsStr = authors.join(', ');
  const escapedName = highlightName.replace(/'/g, "\\'");
  const regex = new RegExp(highlightName, 'g');

  return authorsStr.replace(regex, `<strong>${highlightName}</strong>`);
}

/**
 * Validate email address format
 * @param {string} email - Email address to validate
 * @returns {boolean} True if valid email format
 *
 * @example
 * if (isValidEmail(userInput)) {
 *   // Process email
 * }
 */
export function isValidEmail(email) {
  if (typeof email !== 'string') return false;

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Truncate text to specified length with ellipsis
 * @param {string} text - Text to truncate
 * @param {number} maxLength - Maximum length
 * @param {string} suffix - Suffix to add (default: '...')
 * @returns {string} Truncated text
 *
 * @example
 * truncate('This is a long text', 10) // 'This is a...'
 */
export function truncate(text, maxLength, suffix = '...') {
  if (typeof text !== 'string') return '';
  if (text.length <= maxLength) return text;

  return text.substring(0, maxLength - suffix.length) + suffix;
}

/**
 * Group array of objects by a property
 * @param {Object[]} array - Array to group
 * @param {string} key - Property key to group by
 * @returns {Object} Object with grouped arrays
 *
 * @example
 * const pubs = [{year: 2023, title: 'A'}, {year: 2023, title: 'B'}, {year: 2024, title: 'C'}];
 * groupBy(pubs, 'year') // {2023: [{...}, {...}], 2024: [{...}]}
 */
export function groupBy(array, key) {
  if (!Array.isArray(array)) return {};

  return array.reduce((result, item) => {
    const groupKey = item[key];
    if (!result[groupKey]) {
      result[groupKey] = [];
    }
    result[groupKey].push(item);
    return result;
  }, {});
}

/**
 * Sort array by multiple keys
 * @param {Object[]} array - Array to sort
 * @param {string[]} keys - Property keys to sort by (prefix with '-' for descending)
 * @returns {Object[]} Sorted array
 *
 * @example
 * sortBy(publications, ['-year', 'title']) // Sort by year desc, then title asc
 */
export function sortBy(array, keys) {
  if (!Array.isArray(array) || !Array.isArray(keys)) return array;

  return [...array].sort((a, b) => {
    for (const key of keys) {
      const desc = key.startsWith('-');
      const prop = desc ? key.slice(1) : key;

      const aVal = a[prop];
      const bVal = b[prop];

      if (aVal < bVal) return desc ? 1 : -1;
      if (aVal > bVal) return desc ? -1 : 1;
    }
    return 0;
  });
}

/**
 * Show user-facing error message
 * @param {HTMLElement} container - Container to show error in
 * @param {string} message - Error message to display
 * @param {string} details - Optional technical details
 *
 * @example
 * const container = getElement('data-container', 'Page');
 * showError(container, 'Failed to load data', 'Network error');
 */
export function showError(container, message, details = '') {
  if (!container) return;

  container.innerHTML = `
    <div class="error-message" role="alert">
      <p><strong>⚠️ Error:</strong> ${escapeHtml(message)}</p>
      ${details ? `<p class="error-details">${escapeHtml(details)}</p>` : ''}
      <p class="error-action">Please try refreshing the page. If the problem persists, contact support.</p>
    </div>
  `;
}

/**
 * Show loading indicator
 * @param {HTMLElement} container - Container to show loading in
 * @param {string} message - Loading message (default: 'Loading...')
 *
 * @example
 * showLoading(container, 'Loading publications...');
 */
export function showLoading(container, message = 'Loading...') {
  if (!container) return;

  container.innerHTML = `
    <div class="loading-indicator" role="status" aria-live="polite">
      <div class="loading-spinner"></div>
      <p>${escapeHtml(message)}</p>
    </div>
  `;
}

/**
 * Copy text to clipboard
 * @param {string} text - Text to copy
 * @param {string} context - Context for logging
 * @returns {Promise<boolean>} True if successful
 *
 * @example
 * if (await copyToClipboard(bibtex, 'BibTeX')) {
 *   alert('Copied to clipboard!');
 * }
 */
export async function copyToClipboard(text, context = 'Clipboard') {
  try {
    await navigator.clipboard.writeText(text);
    console.log(`[${context}] ✓ Copied to clipboard`);
    return true;
  } catch (error) {
    console.error(`[${context}] ❌ Failed to copy:`, error);
    return false;
  }
}

/**
 * Download text as file
 * @param {string} content - File content
 * @param {string} filename - Filename with extension
 * @param {string} mimeType - MIME type (default: 'text/plain')
 *
 * @example
 * downloadFile(bibtexContent, 'publications.bib', 'text/plain');
 */
export function downloadFile(content, filename, mimeType = 'text/plain') {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');

  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);

  console.log(`[Download] ✓ Downloaded: ${filename}`);
}

// Export all utilities as a single object for convenience
export default {
  loadJSON,
  getElement,
  createElement,
  formatYearRange,
  escapeHtml,
  debounce,
  safeAsync,
  formatAuthors,
  isValidEmail,
  truncate,
  groupBy,
  sortBy,
  showError,
  showLoading,
  copyToClipboard,
  downloadFile
};
