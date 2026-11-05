'use strict';

import toBase64Url from '../../src/functions/to.base64url';

describe('toBase64Url tests', () => {
	it('should use the url safe alphabet', () => {
		expect(toBase64Url(new Uint8Array([0xfb, 0xff, 0xfe]))).toBe('-__-');
	});

	it('should strip padding', () => {
		expect(toBase64Url(new Uint8Array([0x66]))).toBe('Zg');
		expect(toBase64Url(new Uint8Array([0x66, 0x6f]))).toBe('Zm8');
	});

	it('should return an empty string for no bytes', () => {
		expect(toBase64Url(new Uint8Array([]))).toBe('');
	});
});
