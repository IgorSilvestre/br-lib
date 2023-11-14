import { parseISODateToBrazilSTD } from "../functions/parseISODateToBrazilSTD"; 

describe('parseISODateToBrazilSTD', () => {

  test('returns formatted date for valid ISO string', () => {
    const result = parseISODateToBrazilSTD('2023-03-01T12:00:00Z');
    expect(result).toBe('01/03/2023 09:00:00'); // Adjust expected result based on the function logic
  });

  test('returns error for invalid date string', () => {
    const result = parseISODateToBrazilSTD('invalid-date');
    expect(result).toEqual(new Error('Data inválida'));
  });

  test('returns message for empty input', () => {
    const result = parseISODateToBrazilSTD('');
    expect(result).toBe('Registro sem data');
  });

  test('handles edge case dates correctly', () => {
    const leapYearDate = parseISODateToBrazilSTD('2024-02-29T00:00:00Z');
    expect(leapYearDate).toBe('28/02/2024 21:00:00'); // Example, adjust as needed

    const yearTurnDate = parseISODateToBrazilSTD('2023-12-31T23:59:59Z');
    expect(yearTurnDate).toBe('31/12/2023 20:59:59'); // Example, adjust as needed
  });

});
