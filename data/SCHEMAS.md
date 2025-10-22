# Data Schemas Documentation

**Version:** 1.0
**Last Updated:** October 2025
**Maintainer:** Fabio Aurelio D'Asaro

This document defines the expected structure for all JSON data files in the `/data` directory.

---

## Table of Contents

1. [personal.json](#personaljson)
2. [publications.json](#publicationsjson)
3. [teaching.json](#teachingjson)
4. [supervision.json](#supervisionjson)
5. [projects.json](#projectsjson)
6. [service.json](#servicejson)
7. [Validation](#validation)

---

## personal.json

**Purpose:** Personal information, contact details, research interests, and scholar metrics.

**Used By:** `index.html`, `about.html`, `contact.html`

```json
{
  "name": "string (required)",
  "title": "string (required)",
  "current_position": "string (optional)",

  "affiliations": [
    "string (required, 1+ items)"
  ],

  "bio_short": "string (required, 2-3 sentences)",
  "bio_long": "string (optional, full biography)",

  "research_interests": [
    {
      "title": "string (required)",
      "symbol": "string (required, single char logic symbol)",
      "description": "string (required)"
    }
  ],

  "research_interests_simple": [
    "string (optional, plain text list)"
  ],

  "current_work": [
    {
      "topic": "string (required)",
      "collaborators": ["string (required)"]
    }
  ],

  "contact": {
    "emails": [
      {
        "type": "string (institutional-main|institutional|personal)",
        "address": "string (valid email)",
        "label": "string (display name)"
      }
    ],
    "phone": "string (optional)",
    "website": "string (optional, URL)",
    "github": "string (optional, username)",
    "scholar": "string (optional, URL or ID)",
    "orcid": "string (optional, ORCID ID)"
  },

  "birthplace": "string (optional)",
  "location": "string (optional)",

  "scholar_metrics": {
    "citations": "number (required)",
    "h_index": "number (required)",
    "i10_index": "number (required)",
    "last_updated": "string (required, ISO date YYYY-MM-DD)"
  },

  "news": [
    {
      "date": "string (required, ISO date)",
      "text": "string (required)",
      "link": "string (optional, URL)"
    }
  ]
}
```

**Validation Rules:**
- `name`, `title`, `bio_short`: Required, non-empty strings
- `affiliations`: At least 1 item
- `research_interests`: At least 3 items recommended
- `emails`: At least 1 email with type "institutional-main"
- `scholar_metrics.last_updated`: ISO 8601 date format

---

## publications.json

**Purpose:** Complete list of publications with metadata for filtering and display.

**Used By:** `index.html`, `publications.html`

```json
{
  "selected": [
    {
      "id": "string (required, unique)",
      "title": "string (required)",
      "authors": ["string (required, formatted names)"],
      "year": "number (required, 4-digit)",
      "venue": "string (required)",
      "type": "string (journal|conference|workshop|book-chapter|preprint)",
      "doi": "string (optional, DOI without https://doi.org/)",
      "url": "string (optional, full URL)",
      "pdf": "string (optional, PDF URL)",
      "bibtex": "string (optional, complete BibTeX entry)",
      "tags": ["string (optional)"],
      "open_access": "boolean (optional, default false)",
      "status": "string (optional, 'accepted' for accepted but not published)",
      "volume": "string (optional)",
      "pages": "string (optional, e.g., '123-145')"
    }
  ],

  "all": [
    "Same structure as 'selected' array"
  ]
}
```

**Validation Rules:**
- `id`: Must be unique across all publications
- `authors`: At least 1 author
- `year`: Between 1900 and current year + 2
- `type`: One of the allowed values
- `doi`: If present, validate format
- `selected`: Should be subset of `all` (same IDs)

**Tag Guidelines:**
- Use lowercase, hyphenated tags
- Common tags: `logic`, `reasoning`, `argumentation`, `explainable-ai`, `answer-set-programming`

---

## teaching.json

**Purpose:** Teaching experience, courses, guest lectures, and TA positions.

**Used By:** `teaching.html`

```json
{
  "teaching_philosophy": "string (optional, 1-2 paragraphs)",

  "current_courses": [
    {
      "title": "string (required)",
      "code": "string (optional, course code)",
      "institution": "string (required)",
      "level": "string (BA|BSc|MSc|PhD)",
      "program": "string (required)",
      "year_start": "number (required)",
      "year_end": "number|'present' (required)",
      "description": "string (optional)"
    }
  ],

  "guest_lectures": [
    {
      "title": "string (required)",
      "event": "string (required)",
      "institution": "string (required)",
      "date": "string (required, YYYY-MM or YYYY)",
      "hours": "number (optional)",
      "description": "string (optional)"
    }
  ],

  "teaching_assistant_positions": [
    {
      "period": "string (required, e.g., '2015-2023')",
      "institution": "string (required)",
      "department": "string (optional)",
      "courses": [
        {
          "code": "string (optional)",
          "title": "string (required)",
          "years": "string (optional)",
          "note": "string (optional)",
          "role": "string (optional)"
        }
      ]
    }
  ],

  "teaching_statistics": {
    "years_experience": "number (required)",
    "average_hours_per_year": "string (e.g., '100+')",
    "note": "string (optional)"
  }
}
```

**Validation Rules:**
- `year_end`: Either number >= year_start or string "present"
- `level`: One of the allowed values
- `date`: ISO format YYYY-MM or YYYY

---

## supervision.json

**Purpose:** Student supervision records and outcomes.

**Used By:** `teaching.html`

```json
{
  "students": [
    {
      "name": "string (required)",
      "institution": "string (required)",
      "level": "string (BSc|MSc|PhD)",
      "year": "number|string (required)",
      "topic": "string (required)",
      "outcomes": ["string (optional)"],
      "publications": ["string (optional)"],
      "links": {
        "thesis": "string (optional, URL)",
        "showcase": "string (optional, URL)"
      }
    }
  ]
}
```

**Validation Rules:**
- `level`: One of BSc, MSc, PhD
- `outcomes`: Awards, achievements, notable results

---

## projects.json

**Purpose:** Research projects (current and completed).

**Used By:** `projects.html`

```json
{
  "current": [
    {
      "name": "string (required)",
      "acronym": "string (optional)",
      "funding": "string (required, funding source)",
      "id": "string (optional, project ID)",
      "role": "string (required)",
      "year_start": "number (required)",
      "year_end": "number|'present' (required)",
      "institution": "string (required)",
      "spoke": "string (optional, for multi-spoke projects)",
      "pi": "string (optional, principal investigator)",
      "description": "string (required)",
      "cup": "string (optional, CUP code)",
      "website": "string (optional, URL)",
      "outputs": ["string (optional)"]
    }
  ],

  "past": [
    "Same structure as 'current', but year_end must be a number"
  ]
}
```

**Validation Rules:**
- `year_end`: For current projects, can be "present"
- `year_end`: For past projects, must be number >= year_start

---

## service.json

**Purpose:** Professional service activities.

**Used By:** `service.html`

```json
{
  "organizing": [
    {
      "role": "string (required, e.g., 'Co-organizer')",
      "event": "string (required)",
      "location": "string (optional)",
      "year": "number (optional, for single year)",
      "year_start": "number (optional, for ongoing)",
      "year_end": "number|'present' (optional)",
      "institution": "string (optional)",
      "colocated_with": "string (optional)",
      "website": "string (optional, URL)"
    }
  ],

  "program_committees": [
    {
      "event": "string (required, conference name)",
      "years": ["number (required, 1+ items)"],
      "role": "string (required, e.g., 'PC Member')"
    }
  ],

  "editorial": [
    {
      "role": "string (required)",
      "journal": "string (required)",
      "section": "string (optional)",
      "year": "number (optional, for single year)",
      "year_start": "number (optional, for ongoing)",
      "year_end": "number|'present' (optional)",
      "description": "string (optional)"
    }
  ],

  "reviewing": [
    "string (venue name and year, e.g., 'IJCAI 2025')"
  ]
}
```

**Validation Rules:**
- `years`: For program_committees, must be sorted ascending
- `reviewing`: Simple string array, include year in each entry

---

## Validation

### JSON Syntax Validation

Use Python's built-in JSON tool to validate syntax:

```bash
cat data/personal.json | python3 -m json.tool > /dev/null
echo $?  # Should output 0 if valid
```

### Schema Validation Script

Create a validation script to check required fields:

```javascript
// validate-data.js
import fs from 'fs';

function validatePersonal(data) {
  const required = ['name', 'title', 'affiliations', 'bio_short'];
  const missing = required.filter(field => !data[field]);

  if (missing.length > 0) {
    console.error('❌ personal.json missing required fields:', missing);
    return false;
  }

  console.log('✓ personal.json valid');
  return true;
}

// Run validation
const personal = JSON.parse(fs.readFileSync('./data/personal.json', 'utf8'));
validatePersonal(personal);
```

### Manual Checklist

Before committing changes to data files:

- [ ] Valid JSON syntax (no trailing commas, proper quotes)
- [ ] All required fields present
- [ ] Field types match schema (string, number, boolean, array)
- [ ] Dates in ISO format (YYYY-MM-DD)
- [ ] URLs are valid and accessible
- [ ] Email addresses are valid format
- [ ] Arrays have at least 1 item where specified
- [ ] No duplicate IDs in publications
- [ ] Year ranges are logical (end >= start)

---

## Common Patterns

### Year Ranges

```json
{
  "year_start": 2020,
  "year_end": 2023       // Completed
}

{
  "year_start": 2022,
  "year_end": "present"  // Ongoing
}
```

### Dates

```json
{
  "date": "2025-10-22"   // Full date: YYYY-MM-DD
}

{
  "date": "2025-10"      // Month precision: YYYY-MM
}

{
  "year": 2025           // Year only: number
}
```

### URLs

```json
{
  "url": "https://example.com/path",  // Full URL
  "doi": "10.1234/example",           // DOI without domain
  "pdf": "./papers/paper.pdf"         // Relative path OK
}
```

### Arrays

```json
{
  "tags": ["tag1", "tag2"],           // String array
  "years": [2020, 2021, 2022],        // Number array
  "authors": ["A. Smith", "B. Jones"] // Formatted names
}
```

---

## Adding New Data

### 1. Add New Publication

Edit `data/publications.json`:

1. Add entry to `all` array
2. If it's a featured publication, add to `selected` array (use same object)
3. Ensure unique `id`
4. Add relevant `tags` for filtering
5. Include `bibtex` for export functionality

### 2. Add New Course

Edit `data/teaching.json`:

1. Add to `current_courses` if ongoing
2. Move to `teaching_assistant_positions` when complete
3. Update `teaching_statistics` if needed

### 3. Update Scholar Metrics

Edit `data/personal.json`:

1. Update `scholar_metrics` object
2. Update `last_updated` to current date
3. Verify numbers are correct

---

## Troubleshooting

### JSON Syntax Errors

**Common Issues:**
- Trailing comma in last array item
- Missing quotes around strings
- Using single quotes instead of double quotes
- Unclosed brackets

**Fix:**
Use a JSON validator or linter before committing.

### Data Not Displaying

**Checklist:**
1. Validate JSON syntax
2. Check required fields are present
3. Verify field names match schema exactly
4. Check for typos in property names
5. Ensure arrays are not empty where required

### Type Mismatches

**Common Errors:**
```json
// ❌ Wrong
{
  "year": "2025",  // Should be number
  "tags": "logic"  // Should be array
}

// ✅ Correct
{
  "year": 2025,
  "tags": ["logic"]
}
```

---

## Best Practices

1. **Keep arrays sorted** - Newest items first (reverse chronological)
2. **Use consistent naming** - Follow existing patterns
3. **Validate before committing** - Run JSON validator
4. **Include all optional fields if data exists** - Don't omit fields with null
5. **Use semantic tags** - Lowercase, hyphenated, descriptive
6. **Keep descriptions concise** - 1-2 sentences
7. **Include metadata** - DOI, URLs, publication links
8. **Update regularly** - Keep data current

---

**Questions?** Contact: fabioaurelio.dasaro@unisalento.it
