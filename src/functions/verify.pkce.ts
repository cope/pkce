'use strict';

import createCodeChallenge from './create.code.challenge';

/**
 * Verifies that a code verifier produces the expected code challenge
 * @param verifier - The code verifier to verify
 * @param challenge - The expected code challenge
 * @returns True if the verifier produces the expected challenge, false otherwise
 */
const verifyPkce = (verifier: unknown, challenge: unknown): boolean => {
	// Type guard to ensure verifier is a string
	if (typeof verifier !== 'string') return false;

	try {
		const generatedChallenge: string = createCodeChallenge(verifier);
		return generatedChallenge === challenge;
	} catch {
		return false;
	}
};

export default verifyPkce;
