'use strict';

import isValidChallenge from '../../src/functions/is.valid.challenge';
import createCodeChallenge from '../../src/functions/create.code.challenge';
import createCodeVerifier from '../../src/functions/create.code.verifier';
import {PKCE_CONSTANTS} from '../../src/pkce.constants';

describe('isValidChallenge', () => {
	it('should return true for valid challenge', () => {
		const validVerifier: string = 'dBjftJeZ4CVP-gOP-GDAHCBqeqAMNR8GvKMsVWo9ZNs';
		const validChallenge: string = createCodeChallenge(validVerifier);
		expect(isValidChallenge(validChallenge)).toBe(true);
	});

	it('should return true for generated challenges', () => {
		const verifier: string = createCodeVerifier();
		const challenge: string = createCodeChallenge(verifier);
		expect(isValidChallenge(challenge)).toBe(true);
	});

	it('should return true for typical SHA256 base64url string', () => {
		const typicalChallenge: string = 'E9Melhoa2OwvFrEMTJguCHaoeK1t8URWbuGJSstw-cM';
		expect(isValidChallenge(typicalChallenge)).toBe(true);
	});

	it('should return true for challenge with valid base64url characters', () => {
		const validBase64url: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_';
		expect(isValidChallenge(validBase64url)).toBe(true);
	});

	it('should return false for empty string', () => {
		expect(isValidChallenge('')).toBe(false);
	});

	it('should return false for null/undefined', () => {
		expect(isValidChallenge(null as any)).toBe(false);
		expect(isValidChallenge(undefined as any)).toBe(false);
	});

	it('should return false for non-string types', () => {
		expect(isValidChallenge(123 as any)).toBe(false);
		expect(isValidChallenge({} as any)).toBe(false);
		expect(isValidChallenge([] as any)).toBe(false);
		expect(isValidChallenge(true as any)).toBe(false);
	});

	it('should return false for invalid base64url characters', () => {
		const invalidChars: string[] = ['!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '+', '=', ' ', '/', '\\'];

		invalidChars.forEach((char: string) => {
			const invalidChallenge: string = 'ValidBase64UrlStart' + char + 'End';
			expect(isValidChallenge(invalidChallenge)).toBe(false);
		});
	});

	it('should return false for too short challenge', () => {
		const shortChallenge: string = 'A'.repeat(PKCE_CONSTANTS.CODE_CHALLENGE.MIN_LENGTH - 1);
		expect(isValidChallenge(shortChallenge)).toBe(false);
	});

	it('should return false for too long challenge', () => {
		const longChallenge: string = 'A'.repeat(PKCE_CONSTANTS.CODE_CHALLENGE.MAX_LENGTH + 1);
		expect(isValidChallenge(longChallenge)).toBe(false);
	});

	it('should return true for minimum length challenge', () => {
		const minLengthChallenge: string = 'A'.repeat(PKCE_CONSTANTS.CODE_CHALLENGE.MIN_LENGTH);
		expect(isValidChallenge(minLengthChallenge)).toBe(true);
	});

	it('should return true for maximum length challenge', () => {
		const maxLengthChallenge: string = 'A'.repeat(PKCE_CONSTANTS.CODE_CHALLENGE.MAX_LENGTH);
		expect(isValidChallenge(maxLengthChallenge)).toBe(true);
	});

	it('should return true for expected length challenge', () => {
		const expectedLengthChallenge: string = 'A'.repeat(PKCE_CONSTANTS.CODE_CHALLENGE.EXPECTED_LENGTH);
		expect(isValidChallenge(expectedLengthChallenge)).toBe(true);
	});

	it('should validate multiple generated challenges', () => {
		const challenges: string[] = [];
		const numTests: number = 20;

		for (let i: number = 0; i < numTests; i++) {
			const verifier: string = createCodeVerifier();
			const challenge: string = createCodeChallenge(verifier);
			challenges.push(challenge);
		}

		challenges.forEach((challenge: string) => {
			expect(isValidChallenge(challenge)).toBe(true);
		});
	});

	it('should handle edge cases at boundaries', () => {
		// Test exactly at boundaries
		const minBoundary: string = 'A'.repeat(PKCE_CONSTANTS.CODE_CHALLENGE.MIN_LENGTH);
		const maxBoundary: string = 'A'.repeat(PKCE_CONSTANTS.CODE_CHALLENGE.MAX_LENGTH);

		expect(isValidChallenge(minBoundary)).toBe(true);
		expect(isValidChallenge(maxBoundary)).toBe(true);

		// Test just outside boundaries
		const belowMin: string = 'A'.repeat(PKCE_CONSTANTS.CODE_CHALLENGE.MIN_LENGTH - 1);
		const aboveMax: string = 'A'.repeat(PKCE_CONSTANTS.CODE_CHALLENGE.MAX_LENGTH + 1);

		expect(isValidChallenge(belowMin)).toBe(false);
		expect(isValidChallenge(aboveMax)).toBe(false);
	});

	it('should return false for standard base64 padding characters', () => {
		const withPadding: string = 'ValidBase64UrlStart=';
		expect(isValidChallenge(withPadding)).toBe(false);
	});

	it('should return false for standard base64 characters not allowed in base64url', () => {
		const withSlash: string = 'ValidBase64UrlStart/';
		const withPlus: string = 'ValidBase64UrlStart+';

		expect(isValidChallenge(withSlash)).toBe(false);
		expect(isValidChallenge(withPlus)).toBe(false);
	});

	it('should return true for valid base64url strings', () => {
		const validChallenges: string[] = [
			'E9Melhoa2OwvFrEMTJguCHaoeK1t8URWbuGJSstw-cM',
			'dBjftJeZ4CVP-gOP-GDAHCBqeqAMNR8GvKMsVWo9ZNs',
			'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_'
		];

		validChallenges.forEach((challenge: string) => {
			expect(isValidChallenge(challenge)).toBe(true);
		});
	});

	it('should return false for invalid base64url characters (additional cases)', () => {
		const invalidChallenges: string[] = ['invalid+character', 'invalid/character', 'invalid=character', 'invalid challenge with spaces', 'invalid@character', 'invalid#character'];

		invalidChallenges.forEach((challenge: string) => {
			expect(isValidChallenge(challenge)).toBe(false);
		});
	});

	it('should return false for too short challenges (specific cases)', () => {
		expect(isValidChallenge('short')).toBe(false);
		expect(isValidChallenge('a'.repeat(19))).toBe(false);
	});

	it('should return false for too long challenges (specific cases)', () => {
		expect(isValidChallenge('a'.repeat(101))).toBe(false);
		expect(isValidChallenge('a'.repeat(200))).toBe(false);
	});

	it('should handle edge cases for length boundaries (specific tests)', () => {
		expect(isValidChallenge('a'.repeat(20))).toBe(true); // Minimum valid length
		expect(isValidChallenge('a'.repeat(100))).toBe(true); // Maximum valid length
	});
});
