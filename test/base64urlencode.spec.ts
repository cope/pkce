import base64urlencode from '../src/base64urlencode';

describe('base64urlencode tests', () => {
	it('base64urlencode should be a function', () => {
		expect(base64urlencode).toBeDefined();
		expect(typeof base64urlencode).toBe('function');
	});
});
