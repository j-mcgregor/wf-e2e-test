import { validPasswordRegex } from '../regexes';
import { passwords } from '../../../__mocks__/passwords';

describe('Valid Password', () => {
  it('should successfully validate correct and incorrect passwords', () => {
    // Require at least 8 characters with at least 1 upper case, 1 lower case, 1 numeric and 1 symbol
    // symbols: !@£$%^&*()_=+[]{};:'"<>/?#
    passwords.forEach(val => {
      expect(validPasswordRegex.test(val.password)).toBe(val.valid);
    });
  });
});
