'use strict';

import {PKCE_CONSTANTS} from '../pkce.constants';

/**
 * Validates a code verifier according to RFC 7636
 * @param codeVerifier - The code verifier to validate
 * @throws {Error} If the code verifier is invalid
 */
const validateCodeVerifier = (codeVerifier: string): void => {
	// Check if codeVerifier is provided
	if (!codeVerifier) throw new Error('Code verifier is required');

	// Check length compliance with RFC 7636
	const minLength: number = PKCE_CONSTANTS.CODE_VERIFIER.MIN_LENGTH;
	const maxLength: number = PKCE_CONSTANTS.CODE_VERIFIER.MAX_LENGTH;

	if (codeVerifier.length < minLength) throw new Error(`Code verifier must be at least ${minLength} characters long (RFC 7636)`);

	if (codeVerifier.length > maxLength) throw new Error(`Code verifier must be no more than ${maxLength} characters long (RFC 7636)`);

	// Check character compliance with RFC 7636
	const allowedChars: string = PKCE_CONSTANTS.CODE_VERIFIER.ALLOWED_CHARS;
	const codeVerifierLength: number = codeVerifier.length;
	for (let i: number = 0; i < codeVerifierLength; i++) {
		const char: string = codeVerifier.charAt(i);
		if (!allowedChars.includes(char)) throw new Error(`Code verifier contains invalid character '${char}' at position ${i}. Only URL-safe characters are allowed (RFC 7636)`);
	}
};

export default validateCodeVerifier;
