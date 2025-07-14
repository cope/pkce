'use strict';

import IPkceCode from './pkce.code.interface';
import {PKCE_CONSTANTS} from './pkce.constants';

import verifyPkce from './functions/verify.pkce';
import isValidVerifier from './functions/is.valid.verifier';
import isValidChallenge from './functions/is.valid.challenge';
import createCodeVerifier from './functions/create.code.verifier';
import createCodeChallenge from './functions/create.code.challenge';

/**
 * Generates a complete PKCE (Proof Key for Code Exchange) code pair
 * @returns A PKCE code object containing verifier, challenge, and method
 */
const pkce = (): IPkceCode => {
	const codeVerifier: string = createCodeVerifier();
	const codeChallenge: string = createCodeChallenge(codeVerifier);

	return {
		code_verifier: codeVerifier,
		code_challenge: codeChallenge,
		code_challenge_method: PKCE_CONSTANTS.CODE_CHALLENGE.METHOD
	};
};

export default pkce;

// Export utility functions for common PKCE operations
export {verifyPkce, isValidVerifier, isValidChallenge};
