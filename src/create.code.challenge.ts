'use strict';

import sha256 from './sha256';
import base64urlencode from './base64urlencode';

const createCodeChallenge = async (codeVerfier: string): Promise<string> => {
	const codeSha: ArrayBuffer = await sha256(codeVerfier);
	return base64urlencode(codeSha);
};
export default createCodeChallenge;
