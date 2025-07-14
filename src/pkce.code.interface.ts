'use strict';

import {PKCE_CONSTANTS} from './pkce.constants';

interface IPkceCode {
	code_verifier: string;
	code_challenge: string;
	code_challenge_method: typeof PKCE_CONSTANTS.CODE_CHALLENGE.METHOD;
}

export default IPkceCode;
