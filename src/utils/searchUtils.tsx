import React from 'react';

// Maximum bounds for query parsing to prevent ReDoS & CPU exhaustion
const MAX_QUERY_LENGTH = 100;
const MAX_SEARCH_TERMS = 8;

/**
 * Normalizes string for fuzzy/case-insensitive comparison with safe bounding
 */
export function normalize(str: string): string {
  if (!str) return '';
  return str.slice(0, MAX_QUERY_LENGTH).toLowerCase().trim();
}

/**
 * Check if target text or array of strings matches the search query.
 * Splits multi-word queries so all terms must match somewhere in the combined target text.
 */
export function matchesSearch(
  target: (string | undefined | null | string[])[],
  query: string
): boolean {
  const cleanQuery = normalize(query);
  if (!cleanQuery) return true;

  const terms = cleanQuery.split(/\s+/).filter(Boolean).slice(0, MAX_SEARCH_TERMS);
  if (terms.length === 0) return true;

  // Flatten and join all target text
  const combinedText = target
    .filter(Boolean)
    .map(item => Array.isArray(item) ? item.join(' ') : String(item))
    .join(' ')
    .toLowerCase();

  return terms.every(term => combinedText.includes(term));
}

/**
 * Highlights matches within a string using clean, accessible span tags
 */
export function highlightText(text: string, query: string): React.ReactNode {
  if (!query || !query.trim() || !text) {
    return text;
  }

  const boundedQuery = query.slice(0, MAX_QUERY_LENGTH).trim();
  const terms = boundedQuery
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, MAX_SEARCH_TERMS)
    .map(t => t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));

  if (terms.length === 0) return text;

  const regex = new RegExp(`(${terms.join('|')})`, 'gi');
  const parts = text.split(regex);

  return (
    <>
      {parts.map((part, index) => {
        const isMatch = terms.some(t => part.toLowerCase() === t.toLowerCase());
        return isMatch ? (
          <mark
            key={index}
            className="bg-amber-400/30 text-amber-900 dark:text-amber-200 px-0.5 rounded font-semibold transition-colors"
          >
            {part}
          </mark>
        ) : (
          <React.Fragment key={index}>{part}</React.Fragment>
        );
      })}
    </>
  );
}
