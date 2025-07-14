'use strict';

import {createHash} from 'crypto';
import validateCodeVerifier from './validate.code.verifier';

/**
 * Creates a code challenge from a code verifier using SHA256 and Base64url encoding
 * @param codeVerifier - The code verifier to create a challenge for
 * @returns The code challenge string
 * @throws {Error} If validation fails
 */
const createCodeChallenge = (codeVerifier: string): string => {
	validateCodeVerifier(codeVerifier);
	return createHash('sha256').update(codeVerifier).digest('base64url');
};

export default createCodeChallenge;
