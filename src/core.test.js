import { expect, test } from '@jest/globals';
const { isCamp, isHQ } = require('./core');

// test isCamp
test('[1, 2] should be a camp', () => expect(isCamp(1, 2)).toBe(true));
test('[3, 2] should be a camp', () => expect(isCamp(3, 2)).toBe(true));
test('[2, 3] should be a camp', () => expect(isCamp(2, 3)).toBe(true));
test('[1, 4] should be a camp', () => expect(isCamp(1, 4)).toBe(true));
test('[3, 4] should be a camp', () => expect(isCamp(3, 4)).toBe(true));
test('[1, 7] should be a camp', () => expect(isCamp(1, 7)).toBe(true));
test('[3, 7] should be a camp', () => expect(isCamp(3, 7)).toBe(true));
test('[2, 8] should be a camp', () => expect(isCamp(2, 8)).toBe(true));
test('[1, 9] should be a camp', () => expect(isCamp(1, 9)).toBe(true));
test('[3, 9] should be a camp', () => expect(isCamp(3, 9)).toBe(true));

// test isHQ
test('[1, 0] should be a HQ', () => expect(isHQ(1, 0)).toBe(true));
test('[3, 0] should be a HQ', () => expect(isHQ(3, 0)).toBe(true));
test('[1, 11] should be a HQ', () => expect(isHQ(1, 11)).toBe(true));
test('[3, 11] should be a HQ', () => expect(isHQ(3, 11)).toBe(true));
