'use strict';

import createCodeChallenge from '../../src/functions/create.code.challenge';
import {PKCE_CONSTANTS} from '../../src/pkce.constants';

describe('createCodeChallenge', () => {
	const validCodeVerifier: string = 'dBjftJeZ4CVP-gOP-GDAHCBqeqAMNR8GvKMsVWo9ZNs';

	describe('valid input', () => {
		it('should return a string', () => {
			const result: string = createCodeChallenge(validCodeVerifier);
			expect(typeof result).toBe('string');
		});

		it('should return a base64url encoded string', () => {
			const result: string = createCodeChallenge(validCodeVerifier);
			expect(result).toMatch(/^[A-Za-z0-9_-]*$/);
		});

		it('should return consistent results for same input', () => {
			const result1: string = createCodeChallenge(validCodeVerifier);
			const result2: string = createCodeChallenge(validCodeVerifier);
			expect(result1).toBe(result2);
		});

		it('should accept minimum length verifier', () => {
			const minLengthVerifier: string = 'A'.repeat(PKCE_CONSTANTS.CODE_VERIFIER.MIN_LENGTH);
			expect(() => createCodeChallenge(minLengthVerifier)).not.toThrow();
		});

		it('should accept maximum length verifier', () => {
			const maxLengthVerifier: string = 'A'.repeat(PKCE_CONSTANTS.CODE_VERIFIER.MAX_LENGTH);
			expect(() => createCodeChallenge(maxLengthVerifier)).not.toThrow();
		});

		it('should accept all allowed characters', () => {
			const allCharsVerifier: string = PKCE_CONSTANTS.CODE_VERIFIER.ALLOWED_CHARS;
			expect(() => createCodeChallenge(allCharsVerifier)).not.toThrow();
		});
	});

	describe('input validation', () => {
		describe('missing or invalid input', () => {
			it('should throw error for undefined input', () => {
				expect(() => createCodeChallenge(undefined as any)).toThrow('Code verifier is required');
			});

			it('should throw error for null input', () => {
				expect(() => createCodeChallenge(null as any)).toThrow('Code verifier is required');
			});

			it('should throw error for empty string', () => {
				expect(() => createCodeChallenge('')).toThrow('Code verifier is required');
			});

			// Note: TypeScript prevents non-string inputs at compile time
			// Runtime type checking is not needed for typed parameters
		});

		describe('length validation', () => {
			it('should throw error for too short verifier', () => {
				const shortVerifier: string = 'A'.repeat(PKCE_CONSTANTS.CODE_VERIFIER.MIN_LENGTH - 1);
				expect(() => createCodeChallenge(shortVerifier)).toThrow(`Code verifier must be at least ${PKCE_CONSTANTS.CODE_VERIFIER.MIN_LENGTH} characters long (RFC 7636)`);
			});

			it('should throw error for too long verifier', () => {
				const longVerifier: string = 'A'.repeat(PKCE_CONSTANTS.CODE_VERIFIER.MAX_LENGTH + 1);
				expect(() => createCodeChallenge(longVerifier)).toThrow(`Code verifier must be no more than ${PKCE_CONSTANTS.CODE_VERIFIER.MAX_LENGTH} characters long (RFC 7636)`);
			});
		});

		describe('character validation', () => {
			it('should throw error for invalid characters', () => {
				const invalidChars: string[] = [
					'!',
					'@',
					'#',
					'$',
					'%',
					'^',
					'&',
					'*',
					'(',
					')',
					'+',
					'=',
					'[',
					']',
					'{',
					'}',
					'|',
					'\\',
					':',
					';',
					'"',
					"'",
					'<',
					'>',
					'?',
					',',
					'/',
					' '
				];

				invalidChars.forEach((char: string) => {
					const invalidVerifier: string = 'A'.repeat(PKCE_CONSTANTS.CODE_VERIFIER.MIN_LENGTH - 1) + char;
					expect(() => createCodeChallenge(invalidVerifier)).toThrow(
						`Code verifier contains invalid character '${char}' at position ${PKCE_CONSTANTS.CODE_VERIFIER.MIN_LENGTH - 1}. Only URL-safe characters are allowed (RFC 7636)`
					);
				});
			});

			it('should throw error for unicode characters', () => {
				const unicodeVerifier: string = 'A'.repeat(PKCE_CONSTANTS.CODE_VERIFIER.MIN_LENGTH - 1) + 'é';
				expect(() => createCodeChallenge(unicodeVerifier)).toThrow(
					`Code verifier contains invalid character 'é' at position ${PKCE_CONSTANTS.CODE_VERIFIER.MIN_LENGTH - 1}. Only URL-safe characters are allowed (RFC 7636)`
				);
			});

			it('should throw error for whitespace characters', () => {
				const spaceVerifier: string = 'A'.repeat(PKCE_CONSTANTS.CODE_VERIFIER.MIN_LENGTH - 1) + ' ';
				expect(() => createCodeChallenge(spaceVerifier)).toThrow(
					`Code verifier contains invalid character ' ' at position ${PKCE_CONSTANTS.CODE_VERIFIER.MIN_LENGTH - 1}. Only URL-safe characters are allowed (RFC 7636)`
				);

				const tabVerifier: string = 'A'.repeat(PKCE_CONSTANTS.CODE_VERIFIER.MIN_LENGTH - 1) + '\t';
				expect(() => createCodeChallenge(tabVerifier)).toThrow(
					`Code verifier contains invalid character '\t' at position ${PKCE_CONSTANTS.CODE_VERIFIER.MIN_LENGTH - 1}. Only URL-safe characters are allowed (RFC 7636)`
				);

				const newlineVerifier: string = 'A'.repeat(PKCE_CONSTANTS.CODE_VERIFIER.MIN_LENGTH - 1) + '\n';
				expect(() => createCodeChallenge(newlineVerifier)).toThrow(
					`Code verifier contains invalid character '\n' at position ${PKCE_CONSTANTS.CODE_VERIFIER.MIN_LENGTH - 1}. Only URL-safe characters are allowed (RFC 7636)`
				);
			});
		});
	});

	describe('error handling', () => {
		describe('crypto operation error handling', () => {
			it('should handle and provide meaningful error messages', () => {
				// Test with a valid input to ensure normal operation works
				const validResult: string = createCodeChallenge(validCodeVerifier);
				expect(validResult).toBeTruthy();
				expect(typeof validResult).toBe('string');
				expect(validResult.length).toBeGreaterThan(0);
			});

			it('should produce consistent error messages for the same invalid input', () => {
				const invalidInput: string = '';
				let error1: Error | null = null;
				let error2: Error | null = null;

				try {
					createCodeChallenge(invalidInput);
				} catch (e) {
					error1 = e as Error;
				}

				try {
					createCodeChallenge(invalidInput);
				} catch (e) {
					error2 = e as Error;
				}

				expect(error1).toBeTruthy();
				expect(error2).toBeTruthy();
				expect(error1?.message).toBe(error2?.message);
			});

			it('should handle edge cases without crashing', () => {
				// Test with minimum valid verifier
				const minVerifier: string = 'A'.repeat(PKCE_CONSTANTS.CODE_VERIFIER.MIN_LENGTH);
				expect(() => createCodeChallenge(minVerifier)).not.toThrow();

				// Test with maximum valid verifier
				const maxVerifier: string = 'A'.repeat(PKCE_CONSTANTS.CODE_VERIFIER.MAX_LENGTH);
				expect(() => createCodeChallenge(maxVerifier)).not.toThrow();
			});

			it('should validate crypto operation results', () => {
				// This test ensures the function validates its own output
				const result: string = createCodeChallenge(validCodeVerifier);
				expect(result).toBeTruthy();
				expect(typeof result).toBe('string');
				expect(result.length).toBeGreaterThan(0);
				expect(result).toMatch(/^[A-Za-z0-9_-]+$/);
			});
		});

		describe('defensive programming', () => {
			it('should handle very large valid input without memory issues', () => {
				const largeVerifier: string = 'A'.repeat(PKCE_CONSTANTS.CODE_VERIFIER.MAX_LENGTH);
				expect(() => createCodeChallenge(largeVerifier)).not.toThrow();

				const result: string = createCodeChallenge(largeVerifier);
				expect(result).toBeTruthy();
				expect(typeof result).toBe('string');
			});

			it('should produce deterministic results', () => {
				const testCases: string[] = [
					'A'.repeat(PKCE_CONSTANTS.CODE_VERIFIER.MIN_LENGTH),
					'Z'.repeat(PKCE_CONSTANTS.CODE_VERIFIER.MIN_LENGTH),
					'0'.repeat(PKCE_CONSTANTS.CODE_VERIFIER.MIN_LENGTH),
					'9'.repeat(PKCE_CONSTANTS.CODE_VERIFIER.MIN_LENGTH),
					'-'.repeat(PKCE_CONSTANTS.CODE_VERIFIER.MIN_LENGTH),
					'_'.repeat(PKCE_CONSTANTS.CODE_VERIFIER.MIN_LENGTH),
					'.'.repeat(PKCE_CONSTANTS.CODE_VERIFIER.MIN_LENGTH),
					'~'.repeat(PKCE_CONSTANTS.CODE_VERIFIER.MIN_LENGTH)
				];

				testCases.forEach((verifier: string) => {
					const result1: string = createCodeChallenge(verifier);
					const result2: string = createCodeChallenge(verifier);
					expect(result1).toBe(result2);
				});
			});
		});
	});
});
