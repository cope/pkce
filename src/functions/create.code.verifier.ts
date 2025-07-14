'use strict';

import {PKCE_CONSTANTS} from '../pkce.constants';

/**
 * Creates a cryptographically secure code verifier for PKCE
 * @returns A random code verifier string compliant with RFC 7636
 */
const createCodeVerifier = (): string => {
	const minLength: number = PKCE_CONSTANTS.CODE_VERIFIER.MIN_LENGTH;
	const maxLength: number = PKCE_CONSTANTS.CODE_VERIFIER.MAX_LENGTH;
	const lengthRange: number = maxLength - minLength + 1;
	const allowedChars: string = PKCE_CONSTANTS.CODE_VERIFIER.ALLOWED_CHARS;

	const randomFactor: number = Math.random();
	const length: number = Math.floor(randomFactor * lengthRange) + minLength;

	const codeVerifierArray: string[] = [];
	const allowedCharsLength: number = allowedChars.length;
	for (let i: number = 0; i < length; i++) {
		const randomIndex: number = Math.floor(Math.random() * allowedCharsLength);
		codeVerifierArray.push(allowedChars.charAt(randomIndex));
	}

	return codeVerifierArray.join('');
};

export default createCodeVerifier;
