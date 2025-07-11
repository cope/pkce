import createCodeChallenge from '../src/create.code.challenge';

describe('createCodeChallenge tests', () => {
	it('createCodeChallenge should be a function', () => {
		expect(createCodeChallenge).toBeDefined();
		expect(typeof createCodeChallenge).toBe('function');
	});
});
