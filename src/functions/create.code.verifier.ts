'use strict';

import toBase64Url from './to.base64url.js';

const createCodeVerifier = (): string => toBase64Url(crypto.getRandomValues(new Uint8Array(32)));

export default createCodeVerifier;
