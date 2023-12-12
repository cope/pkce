'use strict';

import pkceType from './pkce.type';
import createCodeChallenge from './create.code.challenge';
import createCodeVerifier from './create.code.verifier';

const pkce = (): pkceType => {
	const codeVerifier = createCodeVerifier();
	const codeChallenge = createCodeChallenge(codeVerifier);
	return {code_verifier: codeVerifier, code_challenge: codeChallenge};
};
export default pkce;
