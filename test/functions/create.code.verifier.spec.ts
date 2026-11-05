'use strict';

import createCodeVerifier from '../../src/functions/create.code.verifier';

describe('createCodeVerifier tests', () => {
	it('createCodeVerifier should be a function', () => {
		expect(createCodeVerifier).toBeDefined();
		expect(typeof createCodeVerifier).toBe('function');
	});

	it('should generate code verifier with correct length range', () => {
		const verifier = createCodeVerifier();
		expect(verifier.length).toBeGreaterThanOrEqual(43);
		expect(verifier.length).toBeLessThanOrEqual(128);
	});

	it('should generate code verifier with valid characters only', () => {
		const verifier = createCodeVerifier();
		const allowedChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~';

		for (let i = 0; i < verifier.length; i++) {
			const char = verifier.charAt(i);
			expect(allowedChars.includes(char)).toBe(true);
		}
	});

	it('should not use Math.random', () => {
		const random = jest.spyOn(Math, 'random');
		createCodeVerifier();
		expect(random).not.toHaveBeenCalled();
		random.mockRestore();
	});

	it('should encode 32 random bytes as 43 base64url characters', () => {
		expect(createCodeVerifier()).toMatch(/^[A-Za-z0-9_-]{43}$/);
	});

	it('should request 32 bytes from crypto.getRandomValues', () => {
		const spy = jest.spyOn(crypto, 'getRandomValues');
		createCodeVerifier();
		expect(spy).toHaveBeenCalledTimes(1);
		expect(spy.mock.calls[0][0] as Uint8Array).toHaveLength(32);
		spy.mockRestore();
	});

	it('should encode the random bytes it receives', () => {
		const spy = jest.spyOn(crypto, 'getRandomValues').mockImplementation(<T extends ArrayBufferView | null>(array: T): T => {
			(array as unknown as Uint8Array).fill(0xfb);
			return array;
		});
		expect(createCodeVerifier()).toBe('-_v7-_v7-_v7-_v7-_v7-_v7-_v7-_v7-_v7-_v7-_s');
		spy.mockRestore();
	});

	it('should work without Buffer', () => {
		const original = global.Buffer;
		Object.defineProperty(global, 'Buffer', {value: undefined, configurable: true});
		try {
			expect(createCodeVerifier()).toMatch(/^[A-Za-z0-9_-]{43}$/);
		} finally {
			Object.defineProperty(global, 'Buffer', {value: original, configurable: true});
		}
	});

	it('should generate different verifiers on subsequent calls', () => {
		const verifier1 = createCodeVerifier();
		const verifier2 = createCodeVerifier();
		expect(verifier1).not.toBe(verifier2);
	});

	it('should generate non-empty string', () => {
		const verifier = createCodeVerifier();
		expect(verifier).toBeTruthy();
		expect(typeof verifier).toBe('string');
		expect(verifier.length).toBeGreaterThan(0);
	});
});
