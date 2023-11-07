import { isValidCNPJ } from "../functions/isValidCNPJ";

describe('isValidCNPJ', () => {
  test('valid CNPJ should return true', () => {
    const validCNPJ = '08.987.585/0001-97';
    expect(isValidCNPJ(validCNPJ)).toBe(true);
  });

  test('CNPJ with all same digits should return false', () => {
    const invalidCNPJ = '11.111.111/1111-11';
    expect(isValidCNPJ(invalidCNPJ)).toBe(false);
  });

  test('CNPJ with incorrect verification digits should return false', () => {
    const invalidCNPJ = '12.345.678/0001-91';
    expect(isValidCNPJ(invalidCNPJ)).toBe(false);
  });

  test('CNPJ with incorrect format should return false', () => {
    const invalidCNPJ = '12345678/0001-90';
    expect(isValidCNPJ(invalidCNPJ)).toBe(false);
  });
});
