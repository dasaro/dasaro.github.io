/**
 * Logical Symbols Manager
 * Provides randomized mathematical logic symbols for page decorations
 * Symbols are dimmed to 40% opacity for subtle visual interest
 */

class LogicalSymbols {
  constructor() {
    // Symbol categories with extensive collections
    this.symbols = {
      propositional: ['∧', '∨', '¬', '→', '↔', '⊤', '⊥', '⊕', '⊼', '⊽'],
      predicate: ['∀', '∃', '∃!', '=', '≠', '≈', '≡', '≢'],
      setTheory: ['∈', '∉', '⊆', '⊂', '⊇', '⊃', '∪', '∩', '∅', '℘', '⊎'],
      categoryTheory: ['→', '⇒', '↦', '∘', '≅', '⊗', '⊕', '⊤', '⊥', '∇'],
      proofTheory: ['⊢', '⊨', '⊬', '⊭', '├', '⊣', '⊳', '⊲', '▷', '◁'],
      modalLogic: ['□', '◇', '⬚', '⟡', '▫', '⬩', '◊', '⋄']
    };

    // All symbols flattened for easy random selection
    this.allSymbols = Object.values(this.symbols).flat();
  }

  /**
   * Get a random symbol from a specific category
   * @param {string} category - One of: propositional, predicate, setTheory, categoryTheory, proofTheory, modalLogic
   * @returns {string} A random symbol from that category
   */
  getRandomFromCategory(category) {
    const categorySymbols = this.symbols[category];
    if (!categorySymbols) {
      console.warn(`[LogicalSymbols] Unknown category: ${category}`);
      return this.getRandom();
    }
    return categorySymbols[Math.floor(Math.random() * categorySymbols.length)];
  }

  /**
   * Get a completely random symbol from all categories
   * @returns {string} A random logical symbol
   */
  getRandom() {
    return this.allSymbols[Math.floor(Math.random() * this.allSymbols.length)];
  }

  /**
   * Get multiple random symbols (non-repeating within the set)
   * @param {number} count - How many symbols to get
   * @param {string} category - Optional category to draw from
   * @returns {string[]} Array of random symbols
   */
  getMultiple(count, category = null) {
    const source = category ? this.symbols[category] : this.allSymbols;
    const shuffled = [...source].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, Math.min(count, shuffled.length));
  }

  /**
   * Populate a DOM element with random symbols
   * @param {HTMLElement} element - The element to populate
   * @param {Object} options - Configuration options
   */
  populate(element, options = {}) {
    const {
      count = 1,
      category = null,
      separator = ' ',
      dimmed = true
    } = options;

    const symbols = this.getMultiple(count, category);
    element.textContent = symbols.join(separator);

    if (dimmed && !element.classList.contains('symbols-dimmed')) {
      element.classList.add('symbols-dimmed');
    }
  }

  /**
   * Initialize all elements with class 'logical-symbols' on the page
   * Can be called on DOMContentLoaded or after dynamic content loads
   */
  initializeAll() {
    const elements = document.querySelectorAll('.logical-symbols');

    elements.forEach(element => {
      // Check for data attributes to customize behavior
      const count = parseInt(element.dataset.count) || 1;
      const category = element.dataset.category || null;
      const separator = element.dataset.separator || ' ';
      const dimmed = element.dataset.dimmed !== 'false'; // Default true

      this.populate(element, { count, category, separator, dimmed });
    });

    console.log(`[LogicalSymbols] Initialized ${elements.length} symbol elements`);
  }
}

/**
 * Export for use in other scripts
 * Create a global instance for convenience
 */
if (typeof window !== 'undefined') {
  window.LogicalSymbols = LogicalSymbols;
  window.logicalSymbols = new LogicalSymbols();

  // Auto-initialize on DOMContentLoaded if elements exist
  document.addEventListener('DOMContentLoaded', () => {
    if (document.querySelectorAll('.logical-symbols').length > 0) {
      window.logicalSymbols.initializeAll();
    }
  });
}

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
  module.exports = LogicalSymbols;
}
