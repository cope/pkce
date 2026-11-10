'use strict';

import {sha256} from '@noble/hashes/sha2.js';
import {utf8ToBytes} from '@noble/hashes/utils.js';
import toBase64Url from './to.base64url.js';

const createCodeChallenge = (codeVerifier: string): string => toBase64Url(sha256(utf8ToBytes(codeVerifier)));

export default createCodeChallenge;
