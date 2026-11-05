'use strict';

import createCodeChallenge from '../../src/functions/create.code.challenge';
import createCodeVerifier from '../../src/functions/create.code.verifier';

describe('createCodeChallenge tests', () => {
	it('createCodeChallenge should be a function', () => {
		expect(createCodeChallenge).toBeDefined();
		expect(typeof createCodeChallenge).toBe('function');
	});

	it('should match the RFC 7636 appendix B example', () => {
		expect(createCodeChallenge('dBjftJeZ4CVP-mB92K27uhbUJU1p1r_wW1gFWFOEjXk')).toBe('E9Melhoa2OwvFrEMTJguCHaoeK1t8URWbuGJSstw-cM');
	});

	it('should match the SHA-256 of abc, base64url encoded without padding', () => {
		expect(createCodeChallenge('abc')).toBe('ungWv48Bz-pBQUDeXa4iI7ADYaOWF3qctBD_YfIAFa0');
	});

	it('should hash non-ascii verifiers as utf-8', () => {
		expect(createCodeChallenge('é')).toBe('SplVfkAzw1Od4utlRyAXytX5VX96BiWgnxw_biumnEw');
	});

	it('should work without Buffer', () => {
		const original = global.Buffer;
		Object.defineProperty(global, 'Buffer', {value: undefined, configurable: true});
		try {
			expect(createCodeChallenge('dBjftJeZ4CVP-mB92K27uhbUJU1p1r_wW1gFWFOEjXk')).toBe('E9Melhoa2OwvFrEMTJguCHaoeK1t8URWbuGJSstw-cM');
		} finally {
			Object.defineProperty(global, 'Buffer', {value: original, configurable: true});
		}
	});

	it('should generate consistent challenge for same verifier', () => {
		const verifier = createCodeVerifier();
		const challenge1 = createCodeChallenge(verifier);
		const challenge2 = createCodeChallenge(verifier);
		expect(challenge1).toBe(challenge2);
	});

	it('should generate different challenges for different verifiers', () => {
		const verifier1 = createCodeVerifier();
		const verifier2 = createCodeVerifier();
		const challenge1 = createCodeChallenge(verifier1);
		const challenge2 = createCodeChallenge(verifier2);
		expect(challenge1).not.toBe(challenge2);
	});

	it('should generate non-empty string', () => {
		const verifier = createCodeVerifier();
		const challenge = createCodeChallenge(verifier);
		expect(challenge).toBeTruthy();
		expect(typeof challenge).toBe('string');
		expect(challenge.length).toBeGreaterThan(0);
	});
});
