'use strict';

import pkceType from './pkce.type';
import createCodeChallenge from './create.code.challenge';
import createCodeVerifier from './create.code.verifier';

const pkce = (): pkceType => {
	const codeVerfier = createCodeVerifier();
	const codeChallenge = createCodeChallenge(codeVerfier);
	return {code_verfier: codeVerfier, code_challenge: codeChallenge};
};
export default pkce;
