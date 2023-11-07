/**
 * Generate a regular expression for searching text with accent-insensitive matching.
 *
 * @param {string} query - The search query, which may contain accented and non-accented characters.
 * @param {boolean} [isFullMatch=false] - If true, the generated regex will match the full text; otherwise, it will perform a partial match.
 * @returns {RegExp} - A regular expression for accent-insensitive text matching.
 *
 * @example
 * const query = regexForSearch("cafe");
 * const text = "café";
 * if (text.match(query)) {
 *   console.log("Match found!");
 * }
 */
export function regexForSearch(query, isFullMatch = false) {
    query = query
      .replace(/a/gi, '[AÁÀÂÃ]')
      .replace(/e/gi, '[EÉÈÊ]')
      .replace(/i/gi, '[IÍÌÎ]')
      .replace(/o/gi, '[OÓÒÔÕ]')
      .replace(/u/gi, '[UÚÙÛ]')
      .replace(/c/gi, '[CÇ]')
      .replace(/s\((?=\|)/gi, '(s|)');
  
    return isFullMatch
      ? new RegExp(`^${query}$`, 'gmi')
      : new RegExp(query, 'gmi');
  }
  