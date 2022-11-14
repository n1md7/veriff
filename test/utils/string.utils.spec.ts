import { findMatch } from '../../src/utils';

describe.each([
  ['a', 'aa', false],
  ['b', 'aa', false],
  ['abc', 'cba', false],
  ['abc', 'a', true],
  ['abc', 'b', true],
  ['abc', 'c', true],
  ['abc', 'd', false],
  ['abc', undefined, false],
  ['abc-2277b909-f74e-4dc0-b152-328713948ec5-bca', '2277b909-f74e-4dc0-b152-328713948ec5', true],
  ['2277b909-f74e-4dc0-b152-328713948ec5', '2277b909-f74e-4dc0-b152-328713948ec5', true],
])('findMatch %o', (haystack, needle, expected) => {
  it('should verify', () => {
    expect(findMatch(haystack, needle)).toBe(expected);
  });
});
