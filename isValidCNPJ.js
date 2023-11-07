/**
 * Validates a Brazilian CNPJ (Cadastro Nacional da Pessoa Jurídica) tax identification number.
 *
 * @param {string} cnpj - The CNPJ to be validated.
 * @returns {boolean} - True if the CNPJ is valid, false otherwise.
 */
export function isValidCNPJ(cnpj) {
  /**
   * Remove non-digit characters from the CNPJ.
   * @type {string}
   */
  const cleanCNPJ = cnpj.replace(/[^\d]+/g, '');

  // Check if the cleaned CNPJ has the correct length
  if (cleanCNPJ.length !== 14) return false;

  // Check for known invalid CNPJs with all digits being the same
  if (/^(\d)\1{13}$/.test(cleanCNPJ)) return false;

  /**
   * Convert the CNPJ digits to an array of numbers.
   * @type {number[]}
   */
  const digits = cleanCNPJ.split('').map(Number);

  /**
   * Calculate the first verification digit of the CNPJ.
   *
   * @param {number[]} arr - Array of digits for the calculation.
   * @returns {number} - The calculated verification digit.
   */
  const calcFirstDigit = (arr) => {
    let sum = 0;
    let weight = 5;
    for (let i = 0; i < 12; i++) {
      sum += arr[i] * weight;
      weight = weight === 2 ? 9 : weight - 1;
    }
    const remainder = sum % 11;
    return remainder < 2 ? 0 : 11 - remainder;
  };

  /**
   * Calculate the second verification digit of the CNPJ.
   *
   * @param {number[]} arr - Array of digits for the calculation.
   * @returns {number} - The calculated verification digit.
   */
  const calcSecondDigit = (arr) => {
    let sum = 0;
    let weight = 6;
    for (let i = 0; i < 13; i++) {
      sum += arr[i] * weight;
      weight = weight === 2 ? 9 : weight - 1;
    }
    const remainder = sum % 11;
    return remainder < 2 ? 0 : 11 - remainder;
  };

  /**
   * Calculate the first verification digit.
   * @type {number}
   */
  const firstDigit = calcFirstDigit(digits.slice(0, 12));

  // Check if the calculated first digit matches the given first digit
  if (firstDigit !== digits[12]) return false;

  /**
   * Calculate the second verification digit.
   * @type {number}
   */
  const secondDigit = calcSecondDigit(digits.slice(0, 13));

  // Check if the calculated second digit matches the given second digit
  return secondDigit === digits[13];
}

