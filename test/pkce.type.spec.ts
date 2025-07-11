import pkceType from '../src/pkce.type';

describe('pkce.type tests', () => {
	it('should export pkceType interface', () => {
		// Test that the type is properly exported
		// In TypeScript, if this compiles, the type is valid
		const mockPkce: pkceType = {
			code_verifier: 'test_verifier',
			code_challenge: 'test_challenge'
		};

		expect(mockPkce.code_verifier).toBe('test_verifier');
		expect(mockPkce.code_challenge).toBe('test_challenge');
	});
});
