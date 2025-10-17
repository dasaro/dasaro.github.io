/**
 * Publications Page Functionality
 * Handles publication display, search, filtering, and BibTeX export
 */

// ============================================
// Render Publications
// ============================================

/**
 * Renders publications to a container
 * @param {Array} publications - Array of publication objects
 * @param {HTMLElement} container - Container element
 */
function renderPublications(publications, container) {
  if (!publications || publications.length === 0) {
    container.innerHTML = '<p>No publications found.</p>';
    return;
  }

  const html = publications.map(pub => createPublicationCard(pub)).join('');
  container.innerHTML = html;
}

/**
 * Creates HTML for a single publication card
 * @param {Object} pub - Publication object
 * @returns {string} - HTML string
 */
function createPublicationCard(pub) {
  const authors = Array.isArray(pub.authors) ? pub.authors.join(', ') : pub.authors;
  const highlightedAuthors = highlightAuthor(authors, "F. A. D'Asaro");

  return `
    <div class="card publication-card" data-year="${pub.year}" data-type="${pub.type}">
      <h3 class="publication-title">${pub.title}</h3>
      <p class="publication-authors">${highlightedAuthors}</p>
      <p class="publication-venue">
        <strong>${pub.venue}</strong> (${pub.year})
        ${pub.open_access ? '<span class="badge">Open Access</span>' : ''}
      </p>
      <div class="publication-links">
        ${pub.doi ? `<a href="https://doi.org/${pub.doi}" target="_blank" class="btn btn-sm">DOI</a>` : ''}
        ${pub.url ? `<a href="${pub.url}" target="_blank" class="btn btn-sm">Link</a>` : ''}
        ${pub.pdf ? `<a href="${pub.pdf}" target="_blank" class="btn btn-sm">PDF</a>` : ''}
        <button onclick="exportSingleBibTeX('${pub.id}')" class="btn btn-sm">BibTeX</button>
      </div>
    </div>
  `;
}

/**
 * Highlights the author's name in the author list
 * @param {string} authors - Author string
 * @param {string} name - Name to highlight
 * @returns {string} - HTML with highlighted name
 */
function highlightAuthor(authors, name) {
  return authors.replace(name, `<strong>${name}</strong>`);
}

// ============================================
// Search and Filter Functions
// ============================================

/**
 * Searches publications by query string
 * @param {string} query - Search query
 * @param {Array} publications - Array of publications
 * @returns {Array} - Filtered publications
 */
function searchPublications(query, publications) {
  if (!query) return publications;

  const lowerQuery = query.toLowerCase();
  return publications.filter(pub => {
    return (
      pub.title.toLowerCase().includes(lowerQuery) ||
      (Array.isArray(pub.authors) && pub.authors.some(a => a.toLowerCase().includes(lowerQuery))) ||
      pub.venue.toLowerCase().includes(lowerQuery) ||
      (pub.tags && pub.tags.some(t => t.toLowerCase().includes(lowerQuery)))
    );
  });
}

/**
 * Filters publications by year
 * @param {number|string} year - Year to filter by
 * @param {Array} publications - Array of publications
 * @returns {Array} - Filtered publications
 */
function filterByYear(year, publications) {
  if (!year || year === 'all') return publications;
  return publications.filter(pub => pub.year === parseInt(year));
}

/**
 * Filters publications by type
 * @param {string} type - Publication type
 * @param {Array} publications - Array of publications
 * @returns {Array} - Filtered publications
 */
function filterByType(type, publications) {
  if (!type || type === 'all') return publications;
  return publications.filter(pub => pub.type === type);
}

/**
 * Sorts publications
 * @param {Array} publications - Array of publications
 * @param {string} sortBy - Sort field (year, title, citations)
 * @param {string} order - Sort order (asc, desc)
 * @returns {Array} - Sorted publications
 */
function sortPublications(publications, sortBy = 'year', order = 'desc') {
  const sorted = [...publications].sort((a, b) => {
    let comparison = 0;

    switch (sortBy) {
      case 'year':
        comparison = a.year - b.year;
        break;
      case 'title':
        comparison = a.title.localeCompare(b.title);
        break;
      case 'citations':
        comparison = (a.citations || 0) - (b.citations || 0);
        break;
      default:
        comparison = 0;
    }

    return order === 'desc' ? -comparison : comparison;
  });

  return sorted;
}

// ============================================
// BibTeX Export
// ============================================

/**
 * Exports all publications as BibTeX
 * @param {Array} publications - Array of publications
 */
function exportAllBibTeX(publications) {
  const bibtexEntries = publications
    .filter(pub => pub.bibtex)
    .map(pub => pub.bibtex)
    .join('\n\n');

  downloadBibTeX(bibtexEntries, 'dasaro_publications.bib');
}

/**
 * Exports a single publication as BibTeX
 * @param {string} pubId - Publication ID
 */
function exportSingleBibTeX(pubId) {
  // This will need access to the publications data
  // Implementation will be completed in Phase 3
  console.log(`Export BibTeX for publication: ${pubId}`);
}

/**
 * Downloads BibTeX content as a file
 * @param {string} content - BibTeX content
 * @param {string} filename - Filename
 */
function downloadBibTeX(content, filename) {
  const blob = new Blob([content], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

// ============================================
// Placeholder for future implementation
// ============================================

console.log('publications.js loaded - ready for Phase 3');
