'use strict';

import {enc, SHA256} from 'crypto-js';

const createCodeChallenge = (codeVerifier: string): string => {
	return SHA256(codeVerifier).toString(enc.Base64url);
};

export default createCodeChallenge;
