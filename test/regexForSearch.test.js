import { regexForSearch } from "../functions/regexForSearch";

describe('regexForSearch', () => {
    test('regexForSearch replaces characters correctly', () => {
        const query = 'aeiouc';
        const expected = '/[AÁÀÂÃ][EÉÈÊ][IÍÌÎ][OÓÒÔÕ][UÚÙÛ][CÇ]/gim';
        expect(regexForSearch(query).toString()).toBe(expected);
      });

      test('regexForSearch returns a full match RegExp when isFullMatch is true', () => {
        const query = 'test';
        const regex = regexForSearch(query, true);
        expect(regex.test(query)).toBe(true);
        expect(regex.test(`${query} extra`)).toBe(false);
      });

      test('regexForSearch returns a partial match RegExp when isFullMatch is false', () => {
        const query = 'test';
        const regex = regexForSearch(query);
        expect(regex.test(query)).toBe(true);
        expect(regex.test(`extra ${query} extra`)).toBe(true);
      });
});
