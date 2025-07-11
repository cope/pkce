import sha256 from '../src/sha256';

describe('sha256 tests', () => {
	it('sha256 should be a function', () => {
		expect(sha256).toBeDefined();
		expect(typeof sha256).toBe('function');
	});
});
