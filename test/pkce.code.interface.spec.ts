'use strict';

import IPkceCode from '../src/pkce.code.interface';
import {PKCE_CONSTANTS} from '../src/pkce.constants';

describe('pkce.code.interface tests', () => {
	it('should export IPkceCode interface', () => {
		// Test that the interface is properly exported
		// In TypeScript, if this compiles, the interface is valid
		const mockPkce: IPkceCode = {
			code_verifier: 'test_verifier',
			code_challenge: 'test_challenge',
			code_challenge_method: PKCE_CONSTANTS.CODE_CHALLENGE.METHOD
		};

		expect(mockPkce.code_verifier).toBe('test_verifier');
		expect(mockPkce.code_challenge).toBe('test_challenge');
		expect(mockPkce.code_challenge_method).toBe(PKCE_CONSTANTS.CODE_CHALLENGE.METHOD);
	});
});
