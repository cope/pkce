'use strict';

import fc from 'fast-check';

import pkce from '../../src/pkce';
import {PKCE_CONSTANTS} from '../../src/pkce.constants';
import createCodeVerifier from '../../src/functions/create.code.verifier';
import createCodeChallenge from '../../src/functions/create.code.challenge';

describe('PKCE Property-Based Tests', () => {
	// Helper to generate valid code verifiers efficiently
	const validCodeVerifierArbitrary = () => {
		const minLength: number = PKCE_CONSTANTS.CODE_VERIFIER.MIN_LENGTH;
		const maxLength: number = PKCE_CONSTANTS.CODE_VERIFIER.MAX_LENGTH;
		const allowedChars: string = PKCE_CONSTANTS.CODE_VERIFIER.ALLOWED_CHARS;

		return fc.array(fc.integer({min: 0, max: allowedChars.length - 1}), {minLength, maxLength}).map((indices) => indices.map((i) => allowedChars[i]).join(''));
	};

	describe('createCodeVerifier properties', () => {
		it('should always generate verifiers within valid length range', () => {
			const minLength: number = PKCE_CONSTANTS.CODE_VERIFIER.MIN_LENGTH;
			const maxLength: number = PKCE_CONSTANTS.CODE_VERIFIER.MAX_LENGTH;

			fc.assert(
				fc.property(fc.integer({min: 1, max: 100}), () => {
					const verifier: string = createCodeVerifier();
					return verifier.length >= minLength && verifier.length <= maxLength;
				}),
				{numRuns: 50}
			);
		});

		it('should always generate verifiers with valid characters', () => {
			const allowedChars: string = PKCE_CONSTANTS.CODE_VERIFIER.ALLOWED_CHARS;

			fc.assert(
				fc.property(fc.integer({min: 1, max: 100}), () => {
					const verifier: string = createCodeVerifier();
					return verifier.split('').every((char) => allowedChars.includes(char));
				}),
				{numRuns: 50}
			);
		});

		it('should generate different verifiers on multiple calls', () => {
			const verifiers: Set<string> = new Set();

			fc.assert(
				fc.property(fc.integer({min: 1, max: 20}), () => {
					const verifier: string = createCodeVerifier();
					const wasUnique: boolean = !verifiers.has(verifier);
					verifiers.add(verifier);
					return wasUnique;
				}),
				{numRuns: 20}
			);
		});
	});

	describe('createCodeChallenge properties', () => {
		it('should always produce same challenge for same verifier', () => {
			fc.assert(
				fc.property(validCodeVerifierArbitrary(), (codeVerifier: string) => {
					const challenge1: string = createCodeChallenge(codeVerifier);
					const challenge2: string = createCodeChallenge(codeVerifier);
					return challenge1 === challenge2;
				}),
				{numRuns: 25}
			);
		});

		it('should always produce non-empty challenge for valid verifier', () => {
			fc.assert(
				fc.property(validCodeVerifierArbitrary(), (codeVerifier: string) => {
					const challenge: string = createCodeChallenge(codeVerifier);
					return challenge.length > 0;
				}),
				{numRuns: 25}
			);
		});

		it('should properly reject invalid inputs', () => {
			fc.assert(
				fc.property(
					fc.oneof(
						fc.string({maxLength: PKCE_CONSTANTS.CODE_VERIFIER.MIN_LENGTH - 1}), // Too short
						fc.string({minLength: PKCE_CONSTANTS.CODE_VERIFIER.MAX_LENGTH + 1, maxLength: 200}), // Too long
						fc.constant('invalid!@#$%^&*()'), // Invalid characters
						fc.constant(''), // Empty string
						fc.constant(null), // Null
						fc.constant(undefined) // Undefined
					),
					(invalidInput: any) => {
						try {
							createCodeChallenge(invalidInput);
							return false; // Should have thrown an error
						} catch (error) {
							return error instanceof Error && error.message.includes('Code verifier');
						}
					}
				),
				{numRuns: 25}
			);
		});

		it('should produce different challenges for different valid verifiers', () => {
			fc.assert(
				fc.property(validCodeVerifierArbitrary(), validCodeVerifierArbitrary(), (verifier1: string, verifier2: string) => {
					if (verifier1 === verifier2) {
						return true; // Same input should produce same output
					}

					const challenge1: string = createCodeChallenge(verifier1);
					const challenge2: string = createCodeChallenge(verifier2);
					return challenge1 !== challenge2;
				}),
				{numRuns: 25}
			);
		});
	});

	describe('pkce function properties', () => {
		it('should always return valid PKCE object structure', () => {
			fc.assert(
				fc.property(fc.integer({min: 1, max: 100}), () => {
					const result = pkce();
					return (
						typeof result === 'object' &&
						typeof result.code_verifier === 'string' &&
						typeof result.code_challenge === 'string' &&
						result.code_challenge_method === PKCE_CONSTANTS.CODE_CHALLENGE.METHOD &&
						result.code_verifier.length >= PKCE_CONSTANTS.CODE_VERIFIER.MIN_LENGTH &&
						result.code_verifier.length <= PKCE_CONSTANTS.CODE_VERIFIER.MAX_LENGTH
					);
				}),
				{numRuns: 50}
			);
		});

		it('should produce consistent challenge from generated verifier', () => {
			fc.assert(
				fc.property(fc.integer({min: 1, max: 100}), () => {
					const result = pkce();
					const manualChallenge: string = createCodeChallenge(result.code_verifier);
					return result.code_challenge === manualChallenge;
				}),
				{numRuns: 50}
			);
		});
	});
});
