import pkce from '../src/pkce';

describe('pkce tests', () => {
	it('pkce should be a function', () => {
		expect(pkce).toBeDefined();
		expect(typeof pkce).toBe('function');

		console.log(pkce());
	});

	it('should generate valid PKCE pair', () => {
		const result = pkce();
		expect(result).toHaveProperty('code_verifier');
		expect(result).toHaveProperty('code_challenge');
		expect(typeof result.code_verifier).toBe('string');
		expect(typeof result.code_challenge).toBe('string');
	});

	it('should generate different pairs on multiple calls', () => {
		const result1 = pkce();
		const result2 = pkce();
		expect(result1.code_verifier).not.toBe(result2.code_verifier);
		expect(result1.code_challenge).not.toBe(result2.code_challenge);
	});

	it('should generate valid verifier and challenge lengths', () => {
		const result = pkce();
		expect(result.code_verifier.length).toBeGreaterThanOrEqual(43);
		expect(result.code_verifier.length).toBeLessThanOrEqual(128);
		expect(result.code_challenge.length).toBeGreaterThan(0);
	});
});
