/**
* Remove accents from a string
* @param {string} str - The string to remove accents from
* @returns {string} - The string without accents
*/
export function removeAccents (str) {
  return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
}

