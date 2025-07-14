'use strict';

import {PKCE_CONSTANTS} from '../pkce.constants';

/**
 * Checks if a string is a valid PKCE code challenge
 * @param str - The value to validate
 * @returns True if the value appears to be a valid code challenge, false otherwise
 */
const isValidChallenge = (str: unknown): boolean => {
	// Check basic type and existence
	if (!str || typeof str !== 'string') return false;

	// Check if it's a valid base64url string (typical SHA256 hash is EXPECTED_LENGTH chars in base64url)
	const base64urlPattern: RegExp = /^[A-Za-z0-9_-]+$/;
	if (!base64urlPattern.test(str)) return false;

	// Reasonable length check (SHA256 base64url is typically EXPECTED_LENGTH chars, but allow some variance)
	const minLength: number = PKCE_CONSTANTS.CODE_CHALLENGE.MIN_LENGTH;
	const maxLength: number = PKCE_CONSTANTS.CODE_CHALLENGE.MAX_LENGTH;

	return !(str.length < minLength || str.length > maxLength);
};

export default isValidChallenge;
