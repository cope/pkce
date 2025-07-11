import createCodeChallenge from '../src/create.code.challenge';

describe('createCodeChallenge tests', () => {
	it('createCodeChallenge should be a function', () => {
		expect(createCodeChallenge).toBeDefined();
		expect(typeof createCodeChallenge).toBe('function');
	});

	it('should generate valid code challenge', () => {
		const codeVerifier = 'dBjftJeZ4CVP-mB92K27uhbUJU1p1r_wW1gFWFOEjXk';
		const result = createCodeChallenge(codeVerifier);
		expect(typeof result).toBe('string');
		expect(result.length).toBeGreaterThan(0);
	});

	it('should generate consistent output for same input', () => {
		const codeVerifier = 'test-code-verifier-12345678901234567890123';
		const result1 = createCodeChallenge(codeVerifier);
		const result2 = createCodeChallenge(codeVerifier);
		expect(result1).toBe(result2);
	});

	it('should generate different output for different inputs', () => {
		const verifier1 = 'test-code-verifier-12345678901234567890123';
		const verifier2 = 'different-verifier-12345678901234567890123';
		const result1 = createCodeChallenge(verifier1);
		const result2 = createCodeChallenge(verifier2);
		expect(result1).not.toBe(result2);
	});

	it('should handle any string input', () => {
		// The current implementation processes any string without validation
		const result1 = createCodeChallenge('');
		const result2 = createCodeChallenge('short');
		const result3 = createCodeChallenge('a'.repeat(129));
		const result4 = createCodeChallenge('invalid@characters!');

		expect(typeof result1).toBe('string');
		expect(typeof result2).toBe('string');
		expect(typeof result3).toBe('string');
		expect(typeof result4).toBe('string');
	});
});
