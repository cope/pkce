import createCodeVerifier from '../src/create.code.verifier';

describe('createCodeVerifier tests', () => {
	it('createCodeVerifier should be a function', () => {
		expect(createCodeVerifier).toBeDefined();
		expect(typeof createCodeVerifier).toBe('function');
	});

	it('should generate code verifier with correct length range', () => {
		const result = createCodeVerifier();
		expect(result.length).toBeGreaterThanOrEqual(43);
		expect(result.length).toBeLessThanOrEqual(128);
		expect(typeof result).toBe('string');
	});

	it('should only use allowed characters', () => {
		const result = createCodeVerifier();
		expect(result).toMatch(/^[A-Za-z0-9\-._~]+$/);
	});

	it('should generate different values on multiple calls', () => {
		const result1 = createCodeVerifier();
		const result2 = createCodeVerifier();
		expect(result1).not.toBe(result2);
	});
});
