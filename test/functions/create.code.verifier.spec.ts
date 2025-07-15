'use strict';

import createCodeVerifier from '../../src/functions/create.code.verifier';

describe('createCodeVerifier tests', () => {
	it('createCodeVerifier should be a function', () => {
		expect(createCodeVerifier).toBeDefined();
		expect(typeof createCodeVerifier).toBe('function');
	});

	it('should generate code verifier with correct length range', () => {
		const verifier = createCodeVerifier();
		expect(verifier.length).toBeGreaterThanOrEqual(43);
		expect(verifier.length).toBeLessThanOrEqual(128);
	});

	it('should generate code verifier with valid characters only', () => {
		const verifier = createCodeVerifier();
		const allowedChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~';

		for (let i = 0; i < verifier.length; i++) {
			const char = verifier.charAt(i);
			expect(allowedChars.includes(char)).toBe(true);
		}
	});

	it('should generate different verifiers on subsequent calls', () => {
		const verifier1 = createCodeVerifier();
		const verifier2 = createCodeVerifier();
		expect(verifier1).not.toBe(verifier2);
	});

	it('should generate non-empty string', () => {
		const verifier = createCodeVerifier();
		expect(verifier).toBeTruthy();
		expect(typeof verifier).toBe('string');
		expect(verifier.length).toBeGreaterThan(0);
	});
});
