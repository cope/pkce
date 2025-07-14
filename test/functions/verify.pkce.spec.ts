'use strict';

import verifyPkce from '../../src/functions/verify.pkce';
import createCodeChallenge from '../../src/functions/create.code.challenge';
import createCodeVerifier from '../../src/functions/create.code.verifier';

describe('verifyPkce', () => {
	it('should return true for valid verifier-challenge pairs', () => {
		const verifier: string = 'dBjftJeZ4CVP-gOP-GDAHCBqeqAMNR8GvKMsVWo9ZNs';
		const challenge: string = createCodeChallenge(verifier);

		expect(verifyPkce(verifier, challenge)).toBe(true);
	});

	it('should return false for invalid verifier-challenge pairs', () => {
		const verifier: string = 'dBjftJeZ4CVP-gOP-GDAHCBqeqAMNR8GvKMsVWo9ZNs';
		const wrongChallenge: string = 'wrong-challenge-value';

		expect(verifyPkce(verifier, wrongChallenge)).toBe(false);
	});

	it('should return false for invalid verifier', () => {
		const invalidVerifier: string = 'too-short';
		const challenge: string = 'any-challenge';

		expect(verifyPkce(invalidVerifier, challenge)).toBe(false);
	});

	it('should return false for empty inputs', () => {
		expect(verifyPkce('', 'challenge')).toBe(false);
		expect(verifyPkce('verifier', '')).toBe(false);
		expect(verifyPkce('', '')).toBe(false);
	});

	it('should return false for null/undefined inputs', () => {
		expect(verifyPkce(null as any, 'challenge')).toBe(false);
		expect(verifyPkce('verifier', null as any)).toBe(false);
		expect(verifyPkce(undefined as any, 'challenge')).toBe(false);
		expect(verifyPkce('verifier', undefined as any)).toBe(false);
	});

	it('should return false for non-string verifier types', () => {
		expect(verifyPkce(123 as any, 'challenge')).toBe(false);
		expect(verifyPkce({} as any, 'challenge')).toBe(false);
		expect(verifyPkce([] as any, 'challenge')).toBe(false);
		expect(verifyPkce(true as any, 'challenge')).toBe(false);
	});

	it('should work with generated PKCE pairs', () => {
		const generatedVerifier: string = createCodeVerifier();
		const generatedChallenge: string = createCodeChallenge(generatedVerifier);

		expect(verifyPkce(generatedVerifier, generatedChallenge)).toBe(true);
	});

	it('should handle multiple valid pairs', () => {
		const pairs: Array<{verifier: string; challenge: string}> = [];

		for (let i: number = 0; i < 10; i++) {
			const verifier: string = createCodeVerifier();
			const challenge: string = createCodeChallenge(verifier);
			pairs.push({verifier, challenge});
		}

		pairs.forEach(({verifier, challenge}) => {
			expect(verifyPkce(verifier, challenge)).toBe(true);
		});
	});

	it('should return false when verifier generates different challenge', () => {
		const verifier1: string = createCodeVerifier();
		const verifier2: string = createCodeVerifier();
		const challenge1: string = createCodeChallenge(verifier1);

		expect(verifyPkce(verifier2, challenge1)).toBe(false);
	});

	it('should handle edge cases gracefully', () => {
		// Test with malformed challenge
		const validVerifier: string = 'dBjftJeZ4CVP-gOP-GDAHCBqeqAMNR8GvKMsVWo9ZNs';
		const malformedChallenge: string = 'not-a-valid-base64url-string!@#$%';

		expect(verifyPkce(validVerifier, malformedChallenge)).toBe(false);
	});

	it('should be case sensitive', () => {
		const verifier: string = 'dBjftJeZ4CVP-gOP-GDAHCBqeqAMNR8GvKMsVWo9ZNs';
		const challenge: string = createCodeChallenge(verifier);
		const uppercaseChallenge: string = challenge.toUpperCase();

		expect(verifyPkce(verifier, uppercaseChallenge)).toBe(false);
	});

	it('should handle multiple verifications consistently', () => {
		const verifier: string = 'dBjftJeZ4CVP-gOP-GDAHCBqeqAMNR8GvKMsVWo9ZNs';
		const challenge: string = createCodeChallenge(verifier);

		expect(verifyPkce(verifier, challenge)).toBe(true);
		expect(verifyPkce(verifier, challenge)).toBe(true);
		expect(verifyPkce(verifier, challenge)).toBe(true);
	});
});
