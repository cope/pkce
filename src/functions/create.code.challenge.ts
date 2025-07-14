'use strict';

import {enc, SHA256} from 'crypto-js';
import validateCodeVerifier from './validate.code.verifier';

/**
 * Creates a code challenge from a code verifier using SHA256 and Base64url encoding
 * @param codeVerifier - The code verifier to create a challenge for
 * @returns The code challenge string
 * @throws {Error} If validation fails
 */
const createCodeChallenge = (codeVerifier: string): string => {
	validateCodeVerifier(codeVerifier);
	return SHA256(codeVerifier).toString(enc.Base64url);
};

export default createCodeChallenge;
