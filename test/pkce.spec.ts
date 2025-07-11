import pkce from '../src/pkce';

describe('pkce tests', () => {
	it('pkce should be a function', () => {
		expect(pkce).toBeDefined();
		expect(typeof pkce).toBe('function');

		console.log(pkce());
	});
});
