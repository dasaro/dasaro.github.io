/**
 * Search Functionality for Academic Website
 * Provides search capabilities across publications and other content
 */

// ============================================
// Search Utilities
// ============================================

/**
 * Highlights search terms in text
 * @param {string} text - Original text
 * @param {string} query - Search query
 * @returns {string} - HTML with highlighted terms
 */
function highlightSearchTerms(text, query) {
  if (!query || !text) return text;

  const regex = new RegExp(`(${escapeRegex(query)})`, 'gi');
  return text.replace(regex, '<mark>$1</mark>');
}

/**
 * Escapes special regex characters
 * @param {string} string - String to escape
 * @returns {string} - Escaped string
 */
function escapeRegex(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/**
 * Extracts unique years from publications
 * @param {Array} publications - Array of publication objects
 * @returns {Array} - Sorted array of unique years
 */
function extractYears(publications) {
  const years = [...new Set(publications.map(pub => pub.year))];
  return years.sort((a, b) => b - a);
}

/**
 * Extracts unique types from publications
 * @param {Array} publications - Array of publication objects
 * @returns {Array} - Array of unique types
 */
function extractTypes(publications) {
  return [...new Set(publications.map(pub => pub.type))];
}

/**
 * Extracts unique tags from publications
 * @param {Array} publications - Array of publication objects
 * @returns {Array} - Array of unique tags
 */
function extractTags(publications) {
  const tags = new Set();
  publications.forEach(pub => {
    if (pub.tags && Array.isArray(pub.tags)) {
      pub.tags.forEach(tag => tags.add(tag));
    }
  });
  return Array.from(tags).sort();
}

// ============================================
// Search UI Components
// ============================================

/**
 * Creates a search bar element
 * @param {Function} onSearch - Callback function for search
 * @returns {HTMLElement} - Search bar element
 */
function createSearchBar(onSearch) {
  const container = document.createElement('div');
  container.className = 'search-bar';

  const input = document.createElement('input');
  input.type = 'search';
  input.placeholder = 'Search publications...';
  input.className = 'search-input';

  input.addEventListener('input', debounce((e) => {
    onSearch(e.target.value);
  }, 300));

  container.appendChild(input);
  return container;
}

/**
 * Creates filter dropdowns
 * @param {Object} options - Filter options
 * @param {Function} onFilter - Callback function for filtering
 * @returns {HTMLElement} - Filter container
 */
function createFilters(options, onFilter) {
  const container = document.createElement('div');
  container.className = 'filters';

  // Year filter
  if (options.years) {
    const yearSelect = createSelect('year-filter', 'Filter by year', [
      { value: 'all', label: 'All Years' },
      ...options.years.map(year => ({ value: year, label: year }))
    ]);
    yearSelect.addEventListener('change', (e) => {
      onFilter('year', e.target.value);
    });
    container.appendChild(yearSelect);
  }

  // Type filter
  if (options.types) {
    const typeSelect = createSelect('type-filter', 'Filter by type', [
      { value: 'all', label: 'All Types' },
      ...options.types.map(type => ({
        value: type,
        label: type.charAt(0).toUpperCase() + type.slice(1)
      }))
    ]);
    typeSelect.addEventListener('change', (e) => {
      onFilter('type', e.target.value);
    });
    container.appendChild(typeSelect);
  }

  return container;
}

/**
 * Creates a select element
 * @param {string} id - Element ID
 * @param {string} label - Label text
 * @param {Array} options - Array of option objects
 * @returns {HTMLElement} - Select element with label
 */
function createSelect(id, label, options) {
  const container = document.createElement('div');
  container.className = 'select-container';

  const labelEl = document.createElement('label');
  labelEl.htmlFor = id;
  labelEl.textContent = label;

  const select = document.createElement('select');
  select.id = id;
  select.className = 'filter-select';

  options.forEach(opt => {
    const option = document.createElement('option');
    option.value = opt.value;
    option.textContent = opt.label;
    select.appendChild(option);
  });

  container.appendChild(labelEl);
  container.appendChild(select);

  return container;
}

/**
 * Creates sort controls
 * @param {Function} onSort - Callback function for sorting
 * @returns {HTMLElement} - Sort controls container
 */
function createSortControls(onSort) {
  const container = document.createElement('div');
  container.className = 'sort-controls';

  const select = createSelect('sort-by', 'Sort by', [
    { value: 'year-desc', label: 'Year (newest first)' },
    { value: 'year-asc', label: 'Year (oldest first)' },
    { value: 'title-asc', label: 'Title (A-Z)' },
    { value: 'title-desc', label: 'Title (Z-A)' }
  ]);

  const sortSelect = select.querySelector('select');
  sortSelect.addEventListener('change', (e) => {
    const [field, order] = e.target.value.split('-');
    onSort(field, order);
  });

  container.appendChild(select);
  return container;
}

// ============================================
// Search Results Display
// ============================================

/**
 * Shows search result count
 * @param {number} count - Number of results
 * @param {HTMLElement} container - Container element
 */
function showResultCount(count, container) {
  if (!container) return;

  let countEl = container.querySelector('.result-count');
  if (!countEl) {
    countEl = document.createElement('p');
    countEl.className = 'result-count';
    container.prepend(countEl);
  }

  countEl.textContent = `${count} publication${count !== 1 ? 's' : ''} found`;
}

/**
 * Shows "no results" message
 * @param {HTMLElement} container - Container element
 */
function showNoResults(container) {
  if (!container) return;

  container.innerHTML = `
    <div class="no-results">
      <p>No publications match your search criteria.</p>
      <p>Try adjusting your search terms or filters.</p>
    </div>
  `;
}

// ============================================
// Export for global use
// ============================================

window.highlightSearchTerms = highlightSearchTerms;
window.extractYears = extractYears;
window.extractTypes = extractTypes;
window.extractTags = extractTags;
window.createSearchBar = createSearchBar;
window.createFilters = createFilters;
window.createSortControls = createSortControls;
window.showResultCount = showResultCount;
window.showNoResults = showNoResults;

console.log('search.js loaded - ready for Phase 3');
