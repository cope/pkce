'use strict';

import validateCodeVerifier from '../../src/functions/validate.code.verifier';
import {PKCE_CONSTANTS} from '../../src/pkce.constants';

describe('validateCodeVerifier', () => {
	const validCodeVerifier: string = 'dBjftJeZ4CVP-gOP-GDAHCBqeqAMNR8GvKMsVWo9ZNs';

	describe('valid input', () => {
		it('should not throw for valid code verifier', () => {
			expect(() => validateCodeVerifier(validCodeVerifier)).not.toThrow();
		});

		it('should accept minimum length verifier', () => {
			const minLengthVerifier: string = 'A'.repeat(PKCE_CONSTANTS.CODE_VERIFIER.MIN_LENGTH);
			expect(() => validateCodeVerifier(minLengthVerifier)).not.toThrow();
		});

		it('should accept maximum length verifier', () => {
			const maxLengthVerifier: string = 'A'.repeat(PKCE_CONSTANTS.CODE_VERIFIER.MAX_LENGTH);
			expect(() => validateCodeVerifier(maxLengthVerifier)).not.toThrow();
		});

		it('should accept all allowed characters', () => {
			const allCharsVerifier: string = PKCE_CONSTANTS.CODE_VERIFIER.ALLOWED_CHARS;
			expect(() => validateCodeVerifier(allCharsVerifier)).not.toThrow();
		});
	});

	describe('input validation', () => {
		describe('missing or invalid input', () => {
			it('should throw error for undefined input', () => {
				expect(() => validateCodeVerifier(undefined as any)).toThrow('Code verifier is required');
			});

			it('should throw error for null input', () => {
				expect(() => validateCodeVerifier(null as any)).toThrow('Code verifier is required');
			});

			it('should throw error for empty string', () => {
				expect(() => validateCodeVerifier('')).toThrow('Code verifier is required');
			});

			// Note: TypeScript prevents non-string inputs at compile time
			// Runtime type checking is not needed for typed parameters
		});

		describe('length validation', () => {
			it('should throw error for too short verifier', () => {
				const shortVerifier: string = 'A'.repeat(PKCE_CONSTANTS.CODE_VERIFIER.MIN_LENGTH - 1);
				expect(() => validateCodeVerifier(shortVerifier)).toThrow(`Code verifier must be at least ${PKCE_CONSTANTS.CODE_VERIFIER.MIN_LENGTH} characters long (RFC 7636)`);
			});

			it('should throw error for too long verifier', () => {
				const longVerifier: string = 'A'.repeat(PKCE_CONSTANTS.CODE_VERIFIER.MAX_LENGTH + 1);
				expect(() => validateCodeVerifier(longVerifier)).toThrow(`Code verifier must be no more than ${PKCE_CONSTANTS.CODE_VERIFIER.MAX_LENGTH} characters long (RFC 7636)`);
			});
		});

		describe('character validation', () => {
			it('should throw error for invalid characters', () => {
				const invalidChars: string[] = ['!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '+', '=', ' '];

				invalidChars.forEach((char: string) => {
					const invalidVerifier: string = 'A'.repeat(PKCE_CONSTANTS.CODE_VERIFIER.MIN_LENGTH - 1) + char;
					expect(() => validateCodeVerifier(invalidVerifier)).toThrow(
						`Code verifier contains invalid character '${char}' at position ${PKCE_CONSTANTS.CODE_VERIFIER.MIN_LENGTH - 1}. Only URL-safe characters are allowed (RFC 7636)`
					);
				});
			});

			it('should throw error for unicode characters', () => {
				const unicodeVerifier: string = 'A'.repeat(PKCE_CONSTANTS.CODE_VERIFIER.MIN_LENGTH - 1) + 'é';
				expect(() => validateCodeVerifier(unicodeVerifier)).toThrow(
					`Code verifier contains invalid character 'é' at position ${PKCE_CONSTANTS.CODE_VERIFIER.MIN_LENGTH - 1}. Only URL-safe characters are allowed (RFC 7636)`
				);
			});
		});
	});

	describe('edge cases', () => {
		it('should handle verifier with mixed allowed characters', () => {
			const mixedVerifier: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~';
			expect(() => validateCodeVerifier(mixedVerifier)).not.toThrow();
		});

		it('should handle verifier at exact boundaries', () => {
			const minBoundaryVerifier: string = 'A'.repeat(PKCE_CONSTANTS.CODE_VERIFIER.MIN_LENGTH);
			const maxBoundaryVerifier: string = 'A'.repeat(PKCE_CONSTANTS.CODE_VERIFIER.MAX_LENGTH);

			expect(() => validateCodeVerifier(minBoundaryVerifier)).not.toThrow();
			expect(() => validateCodeVerifier(maxBoundaryVerifier)).not.toThrow();
		});
	});
});
