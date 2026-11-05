'use strict';

import {sha256} from '@noble/hashes/sha2';
import {utf8ToBytes} from '@noble/hashes/utils';
import toBase64Url from './to.base64url';

const createCodeChallenge = (codeVerifier: string): string => toBase64Url(sha256(utf8ToBytes(codeVerifier)));

export default createCodeChallenge;
