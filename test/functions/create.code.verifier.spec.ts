'use strict';

import createCodeVerifier from '../../src/functions/create.code.verifier';
import {PKCE_CONSTANTS} from '../../src/pkce.constants';

describe('createCodeVerifier tests', () => {
	it('createCodeVerifier should be a function', () => {
		expect(createCodeVerifier).toBeDefined();
		expect(typeof createCodeVerifier).toBe('function');
	});

	it('should generate code verifier with correct length range', () => {
		const verifier: string = createCodeVerifier();
		expect(verifier.length).toBeGreaterThanOrEqual(PKCE_CONSTANTS.CODE_VERIFIER.MIN_LENGTH);
		expect(verifier.length).toBeLessThanOrEqual(PKCE_CONSTANTS.CODE_VERIFIER.MAX_LENGTH);
	});

	it('should generate code verifier with valid characters only', () => {
		const verifier: string = createCodeVerifier();
		const allowedChars: string = PKCE_CONSTANTS.CODE_VERIFIER.ALLOWED_CHARS;

		for (let i: number = 0; i < verifier.length; i++) {
			const char: string = verifier.charAt(i);
			expect(allowedChars.includes(char)).toBe(true);
		}
	});

	it('should generate different verifiers on subsequent calls', () => {
		const verifier1: string = createCodeVerifier();
		const verifier2: string = createCodeVerifier();
		expect(verifier1).not.toBe(verifier2);
	});

	it('should generate non-empty verifiers', () => {
		const verifier: string = createCodeVerifier();
		expect(verifier.length).toBeGreaterThan(0);
	});

	describe('error handling', () => {
		describe('random generation resilience', () => {
			it('should handle multiple generation attempts without failing', () => {
				const verifiers: string[] = [];
				const numAttempts: number = 100;

				for (let i: number = 0; i < numAttempts; i++) {
					expect(() => {
						const verifier: string = createCodeVerifier();
						verifiers.push(verifier);
					}).not.toThrow();
				}

				// Verify all verifiers are valid
				verifiers.forEach((verifier: string, _index: number) => {
					expect(verifier).toBeTruthy();
					expect(typeof verifier).toBe('string');
					expect(verifier.length).toBeGreaterThanOrEqual(PKCE_CONSTANTS.CODE_VERIFIER.MIN_LENGTH);
					expect(verifier.length).toBeLessThanOrEqual(PKCE_CONSTANTS.CODE_VERIFIER.MAX_LENGTH);
				});
			});

			it('should produce consistent results structure', () => {
				const verifier: string = createCodeVerifier();
				expect(verifier).toBeTruthy();
				expect(typeof verifier).toBe('string');
				expect(verifier.length).toBeGreaterThan(0);
			});

			it('should handle edge cases in length generation', () => {
				// Generate many verifiers to test edge cases
				const verifiers: string[] = [];
				const numTests: number = 50;

				for (let i: number = 0; i < numTests; i++) {
					const verifier: string = createCodeVerifier();
					verifiers.push(verifier);

					// Verify length is within bounds
					expect(verifier.length).toBeGreaterThanOrEqual(PKCE_CONSTANTS.CODE_VERIFIER.MIN_LENGTH);
					expect(verifier.length).toBeLessThanOrEqual(PKCE_CONSTANTS.CODE_VERIFIER.MAX_LENGTH);
				}

				// Verify we get different lengths (randomness check)
				const uniqueLengths: Set<number> = new Set(verifiers.map((v) => v.length));
				expect(uniqueLengths.size).toBeGreaterThan(1); // Should have some length variation
			});
		});

		describe('character validation', () => {
			it('should only use allowed characters', () => {
				const numTests: number = 50;
				const allowedChars: string = PKCE_CONSTANTS.CODE_VERIFIER.ALLOWED_CHARS;

				for (let i: number = 0; i < numTests; i++) {
					const verifier: string = createCodeVerifier();

					for (let j: number = 0; j < verifier.length; j++) {
						const char: string = verifier.charAt(j);
						expect(allowedChars.includes(char)).toBe(true);
					}
				}
			});

			it('should use all character types over multiple generations', () => {
				const usedChars: Set<string> = new Set();
				const numTests: number = 100;

				for (let i: number = 0; i < numTests; i++) {
					const verifier: string = createCodeVerifier();
					for (let j: number = 0; j < verifier.length; j++) {
						usedChars.add(verifier.charAt(j));
					}
				}

				// Should use a good variety of characters
				expect(usedChars.size).toBeGreaterThan(10);
			});
		});

		describe('defensive programming', () => {
			it('should validate final output', () => {
				const verifier: string = createCodeVerifier();

				// Basic validation
				expect(verifier).toBeTruthy();
				expect(typeof verifier).toBe('string');
				expect(verifier.length).toBeGreaterThan(0);

				// RFC compliance validation
				expect(verifier.length).toBeGreaterThanOrEqual(PKCE_CONSTANTS.CODE_VERIFIER.MIN_LENGTH);
				expect(verifier.length).toBeLessThanOrEqual(PKCE_CONSTANTS.CODE_VERIFIER.MAX_LENGTH);
			});

			it('should handle rapid successive calls', () => {
				const verifiers: string[] = [];
				const numCalls: number = 10;

				for (let i: number = 0; i < numCalls; i++) {
					const verifier: string = createCodeVerifier();
					verifiers.push(verifier);
				}

				// All should be valid and different
				verifiers.forEach((verifier: string, _index: number) => {
					expect(verifier).toBeTruthy();
					expect(typeof verifier).toBe('string');
					expect(verifier.length).toBeGreaterThanOrEqual(PKCE_CONSTANTS.CODE_VERIFIER.MIN_LENGTH);
					expect(verifier.length).toBeLessThanOrEqual(PKCE_CONSTANTS.CODE_VERIFIER.MAX_LENGTH);
				});

				// Should have some uniqueness
				const uniqueVerifiers: Set<string> = new Set(verifiers);
				expect(uniqueVerifiers.size).toBeGreaterThan(1);
			});

			it('should maintain consistency across environments', () => {
				// Test that the function doesn't throw errors in different call patterns
				expect(() => createCodeVerifier()).not.toThrow();
				expect(() => {
					const v1: string = createCodeVerifier();
					const v2: string = createCodeVerifier();
					return v1 + v2;
				}).not.toThrow();
			});
		});
	});
});
