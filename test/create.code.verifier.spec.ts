import createCodeVerifier from '../src/create.code.verifier';

describe('createCodeVerifier tests', () => {
	it('createCodeVerifier should be a function', () => {
		expect(createCodeVerifier).toBeDefined();
		expect(typeof createCodeVerifier).toBe('function');
	});
});
