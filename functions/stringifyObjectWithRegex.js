/**
 * Converts an object to a JSON string, with support for regular expressions.
 *
 * @param {Object} obj - The object to be converted to a JSON string.
 * @returns {string} - The JSON string representation of the object, with regular expressions converted to strings.
 */
export function stringifyObjectWithRegex(obj) {
  function replacer(key, value) {
      if (value instanceof RegExp) {
          // Convert RegExp to a string
          return `__REGEXP ${value.toString()}`;
      }
      return value;
  }

  return JSON.stringify(obj, replacer);
}