'use strict';

import pkce from '../src/pkce';

describe('pkce tests', () => {
	it('pkce should have a generate method', () => {
		expect(pkce.generate).toBeDefined();
		expect(typeof pkce.generate).toBe('function');
	});

	it('should generate valid PKCE object', () => {
		const result = pkce.generate();
		expect(result).toBeDefined();
		expect(typeof result).toBe('object');
		expect(result.code_verifier).toBeDefined();
		expect(result.code_challenge).toBeDefined();
		expect(result.code_challenge_method).toBe('S256');
	});

	it('should generate different codes on each call', () => {
		const result1 = pkce.generate();
		const result2 = pkce.generate();
		expect(result1.code_verifier).not.toBe(result2.code_verifier);
		expect(result1.code_challenge).not.toBe(result2.code_challenge);
	});

	it('should generate verifier within valid length range', () => {
		const result = pkce.generate();
		expect(result.code_verifier.length).toBeGreaterThanOrEqual(43);
		expect(result.code_verifier.length).toBeLessThanOrEqual(128);
	});

	it('should generate challenge as non-empty string', () => {
		const result = pkce.generate();
		expect(result.code_challenge).toBeTruthy();
		expect(typeof result.code_challenge).toBe('string');
		expect(result.code_challenge.length).toBeGreaterThan(0);
	});
});
