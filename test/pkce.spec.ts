'use strict';

import pkce from '../src/pkce';
import {verifyPkce, isValidVerifier, isValidChallenge} from '../src/pkce';
import {PKCE_CONSTANTS} from '../src/pkce.constants';
import IPkceCode from '../src/pkce.code.interface';
import createCodeVerifier from '../src/functions/create.code.verifier';
import createCodeChallenge from '../src/functions/create.code.challenge';

describe('pkce tests', () => {
	it('pkce should be a function', () => {
		expect(pkce).toBeDefined();
		expect(typeof pkce).toBe('function');
	});

	console.log(pkce());

	it('should generate valid PKCE object', () => {
		const result: IPkceCode = pkce();
		expect(result).toBeDefined();
		expect(typeof result).toBe('object');
		expect(result.code_verifier).toBeDefined();
		expect(result.code_challenge).toBeDefined();
		expect(result.code_challenge_method).toBe(PKCE_CONSTANTS.CODE_CHALLENGE.METHOD);
	});

	it('should generate different codes on each call', () => {
		const result1: IPkceCode = pkce();
		const result2: IPkceCode = pkce();
		expect(result1.code_verifier).not.toBe(result2.code_verifier);
		expect(result1.code_challenge).not.toBe(result2.code_challenge);
	});

	it('should generate verifier within valid length range', () => {
		const result: IPkceCode = pkce();
		expect(result.code_verifier.length).toBeGreaterThanOrEqual(PKCE_CONSTANTS.CODE_VERIFIER.MIN_LENGTH);
		expect(result.code_verifier.length).toBeLessThanOrEqual(PKCE_CONSTANTS.CODE_VERIFIER.MAX_LENGTH);
	});

	it('should generate challenge as non-empty string', () => {
		const result: IPkceCode = pkce();
		expect(result.code_challenge).toBeTruthy();
		expect(typeof result.code_challenge).toBe('string');
		expect(result.code_challenge.length).toBeGreaterThan(0);
	});

	describe('exported utility functions', () => {
		it('should export verifyPkce function', () => {
			expect(verifyPkce).toBeDefined();
			expect(typeof verifyPkce).toBe('function');
		});

		it('should export isValidVerifier function', () => {
			expect(isValidVerifier).toBeDefined();
			expect(typeof isValidVerifier).toBe('function');
		});

		it('should export isValidChallenge function', () => {
			expect(isValidChallenge).toBeDefined();
			expect(typeof isValidChallenge).toBe('function');
		});

		it('should verify PKCE pairs using exported verifyPkce', () => {
			const result: IPkceCode = pkce();
			const isValid: boolean = verifyPkce(result.code_verifier, result.code_challenge);
			expect(isValid).toBe(true);
		});

		it('should validate verifiers using exported isValidVerifier', () => {
			const result: IPkceCode = pkce();
			const isValid: boolean = isValidVerifier(result.code_verifier);
			expect(isValid).toBe(true);
		});

		it('should validate challenges using exported isValidChallenge', () => {
			const result: IPkceCode = pkce();
			const isValid: boolean = isValidChallenge(result.code_challenge);
			expect(isValid).toBe(true);
		});

		it('should work together for complete workflow', () => {
			const result: IPkceCode = pkce();

			// All validations should pass
			const isVerifierValid: boolean = isValidVerifier(result.code_verifier);
			const isChallengeValid: boolean = isValidChallenge(result.code_challenge);
			const isVerificationValid: boolean = verifyPkce(result.code_verifier, result.code_challenge);

			expect(isVerifierValid).toBe(true);
			expect(isChallengeValid).toBe(true);
			expect(isVerificationValid).toBe(true);
		});
	});

	describe('integration tests', () => {
		it('should work together for complete PKCE workflow', () => {
			// Generate a verifier
			const verifier: string = createCodeVerifier();
			expect(isValidVerifier(verifier)).toBe(true);

			// Generate challenge from verifier
			const challenge: string = createCodeChallenge(verifier);
			expect(isValidChallenge(challenge)).toBe(true);

			// Verify they match
			expect(verifyPkce(verifier, challenge)).toBe(true);
		});

		it('should handle multiple PKCE pairs', () => {
			const pairs: Array<{verifier: string; challenge: string}> = [];

			// Generate multiple pairs
			for (let i: number = 0; i < 5; i++) {
				const verifier: string = createCodeVerifier();
				const challenge: string = createCodeChallenge(verifier);
				pairs.push({verifier, challenge});
			}

			// Verify each pair
			pairs.forEach((pair, index) => {
				expect(isValidVerifier(pair.verifier)).toBe(true);
				expect(isValidChallenge(pair.challenge)).toBe(true);
				expect(verifyPkce(pair.verifier, pair.challenge)).toBe(true);

				// Verify they don't match with other pairs
				pairs
					.filter((_, otherIndex) => index !== otherIndex)
					.forEach((otherPair) => {
						expect(verifyPkce(pair.verifier, otherPair.challenge)).toBe(false);
					});
			});
		});

		it('should be performant for multiple validations', () => {
			const verifier: string = createCodeVerifier();
			const challenge: string = createCodeChallenge(verifier);

			// Run multiple validations
			for (let i: number = 0; i < 100; i++) {
				expect(isValidVerifier(verifier)).toBe(true);
				expect(isValidChallenge(challenge)).toBe(true);
				expect(verifyPkce(verifier, challenge)).toBe(true);
			}
		});
	});
});
