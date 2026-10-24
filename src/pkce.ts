'use strict';

import createCodeVerifier from './functions/create.code.verifier.js';
import createCodeChallenge from './functions/create.code.challenge.js';

class pkce {
	static generate(): {code_verifier: string; code_challenge: string; code_challenge_method: string} {
		const codeVerifier = createCodeVerifier();
		const codeChallenge = createCodeChallenge(codeVerifier);

		return {
			code_verifier: codeVerifier,
			code_challenge: codeChallenge,
			code_challenge_method: 'S256'
		};
	}
}

export default pkce;
