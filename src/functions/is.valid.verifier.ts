'use strict';

import {PKCE_CONSTANTS} from '../pkce.constants';

/**
 * Checks if a string is a valid PKCE code verifier according to RFC 7636
 * @param str - The value to validate
 * @returns True if the value is a valid code verifier, false otherwise
 */
const isValidVerifier = (str: unknown): boolean => {
	// Check basic type and existence
	if (!str || typeof str !== 'string') return false;

	// Check length compliance with RFC 7636
	const minLength: number = PKCE_CONSTANTS.CODE_VERIFIER.MIN_LENGTH;
	const maxLength: number = PKCE_CONSTANTS.CODE_VERIFIER.MAX_LENGTH;

	if (str.length < minLength || str.length > maxLength) return false;

	// Check character compliance with RFC 7636
	const allowedChars: string = PKCE_CONSTANTS.CODE_VERIFIER.ALLOWED_CHARS;
	for (let i: number = 0; i < str.length; i++) {
		const char: string = str.charAt(i);
		if (!allowedChars.includes(char)) return false;
	}

	return true;
};

export default isValidVerifier;
