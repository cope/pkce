'use strict';

import {PKCE_CONSTANTS} from '../src/pkce.constants';

describe('PKCE constants tests', () => {
	it('should export PKCE_CONSTANTS', () => {
		expect(PKCE_CONSTANTS).toBeDefined();
		expect(typeof PKCE_CONSTANTS).toBe('object');
	});

	it('should have CODE_VERIFIER constants', () => {
		expect(PKCE_CONSTANTS.CODE_VERIFIER).toBeDefined();
		expect(PKCE_CONSTANTS.CODE_VERIFIER.MIN_LENGTH).toBe(43);
		expect(PKCE_CONSTANTS.CODE_VERIFIER.MAX_LENGTH).toBe(128);
		expect(PKCE_CONSTANTS.CODE_VERIFIER.ALLOWED_CHARS).toBe('ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~');
	});

	it('should have CODE_CHALLENGE constants', () => {
		expect(PKCE_CONSTANTS.CODE_CHALLENGE).toBeDefined();
		expect(PKCE_CONSTANTS.CODE_CHALLENGE.METHOD).toBe('S256');
	});

	it('should have correct types for constants', () => {
		expect(typeof PKCE_CONSTANTS.CODE_VERIFIER.MIN_LENGTH).toBe('number');
		expect(typeof PKCE_CONSTANTS.CODE_VERIFIER.MAX_LENGTH).toBe('number');
		expect(typeof PKCE_CONSTANTS.CODE_VERIFIER.ALLOWED_CHARS).toBe('string');
		expect(typeof PKCE_CONSTANTS.CODE_CHALLENGE.METHOD).toBe('string');
	});
});
