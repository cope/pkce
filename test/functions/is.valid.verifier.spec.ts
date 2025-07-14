'use strict';

import isValidVerifier from '../../src/functions/is.valid.verifier';
import createCodeVerifier from '../../src/functions/create.code.verifier';
import {PKCE_CONSTANTS} from '../../src/pkce.constants';

describe('isValidVerifier', () => {
	it('should return true for valid verifier', () => {
		const validVerifier: string = 'dBjftJeZ4CVP-gOP-GDAHCBqeqAMNR8GvKMsVWo9ZNs';
		expect(isValidVerifier(validVerifier)).toBe(true);
	});

	it('should return true for minimum length verifier', () => {
		const minLengthVerifier: string = 'A'.repeat(PKCE_CONSTANTS.CODE_VERIFIER.MIN_LENGTH);
		expect(isValidVerifier(minLengthVerifier)).toBe(true);
	});

	it('should return true for maximum length verifier', () => {
		const maxLengthVerifier: string = 'A'.repeat(PKCE_CONSTANTS.CODE_VERIFIER.MAX_LENGTH);
		expect(isValidVerifier(maxLengthVerifier)).toBe(true);
	});

	it('should return true for all allowed characters', () => {
		const allCharsVerifier: string = PKCE_CONSTANTS.CODE_VERIFIER.ALLOWED_CHARS;
		expect(isValidVerifier(allCharsVerifier)).toBe(true);
	});

	it('should return false for too short verifier', () => {
		const shortVerifier: string = 'A'.repeat(PKCE_CONSTANTS.CODE_VERIFIER.MIN_LENGTH - 1);
		expect(isValidVerifier(shortVerifier)).toBe(false);
	});

	it('should return false for too long verifier', () => {
		const longVerifier: string = 'A'.repeat(PKCE_CONSTANTS.CODE_VERIFIER.MAX_LENGTH + 1);
		expect(isValidVerifier(longVerifier)).toBe(false);
	});

	it('should return false for invalid characters', () => {
		const invalidChars: string[] = ['!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '+', '=', ' '];

		invalidChars.forEach((char: string) => {
			const invalidVerifier: string = 'A'.repeat(PKCE_CONSTANTS.CODE_VERIFIER.MIN_LENGTH - 1) + char;
			expect(isValidVerifier(invalidVerifier)).toBe(false);
		});
	});

	it('should return false for empty string', () => {
		expect(isValidVerifier('')).toBe(false);
	});

	it('should return false for null/undefined', () => {
		expect(isValidVerifier(null as any)).toBe(false);
		expect(isValidVerifier(undefined as any)).toBe(false);
	});

	it('should return false for non-string types', () => {
		expect(isValidVerifier(123 as any)).toBe(false);
		expect(isValidVerifier({} as any)).toBe(false);
		expect(isValidVerifier([] as any)).toBe(false);
		expect(isValidVerifier(true as any)).toBe(false);
	});

	it('should work with generated verifiers', () => {
		const generatedVerifier: string = createCodeVerifier();
		expect(isValidVerifier(generatedVerifier)).toBe(true);
	});

	it('should return false for unicode characters', () => {
		const unicodeVerifier: string = 'A'.repeat(PKCE_CONSTANTS.CODE_VERIFIER.MIN_LENGTH - 1) + 'é';
		expect(isValidVerifier(unicodeVerifier)).toBe(false);
	});

	it('should handle mixed valid characters', () => {
		const mixedVerifier: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~';
		expect(isValidVerifier(mixedVerifier)).toBe(true);
	});

	it('should validate multiple generated verifiers', () => {
		const verifiers: string[] = [];
		const numTests: number = 20;

		for (let i: number = 0; i < numTests; i++) {
			const verifier: string = createCodeVerifier();
			verifiers.push(verifier);
		}

		verifiers.forEach((verifier: string) => {
			expect(isValidVerifier(verifier)).toBe(true);
		});
	});

	it('should handle edge cases at boundaries', () => {
		// Test exactly at boundaries
		const minBoundary: string = 'A'.repeat(PKCE_CONSTANTS.CODE_VERIFIER.MIN_LENGTH);
		const maxBoundary: string = 'A'.repeat(PKCE_CONSTANTS.CODE_VERIFIER.MAX_LENGTH);

		expect(isValidVerifier(minBoundary)).toBe(true);
		expect(isValidVerifier(maxBoundary)).toBe(true);

		// Test just outside boundaries
		const belowMin: string = 'A'.repeat(PKCE_CONSTANTS.CODE_VERIFIER.MIN_LENGTH - 1);
		const aboveMax: string = 'A'.repeat(PKCE_CONSTANTS.CODE_VERIFIER.MAX_LENGTH + 1);

		expect(isValidVerifier(belowMin)).toBe(false);
		expect(isValidVerifier(aboveMax)).toBe(false);
	});
});
