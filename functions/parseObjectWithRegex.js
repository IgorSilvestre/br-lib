/**
 * Parses a string containing JSON with regular expressions.
 * @param {string} str - The string to parse.
 * @returns {any} - The parsed JSON object.
 */
export function parseObjectWithRegex(str) {
  function reviver(key, value) {
      if (typeof value === 'string' && value.startsWith('__REGEXP ')) {
          const match = value.split('__REGEXP ')[1].match(/\/(.*)\/(.*)?/);
          return new RegExp(match[1], match[2] || '');
      }
      return value;
  }

  return JSON.parse(str, reviver);
}