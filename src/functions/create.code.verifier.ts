'use strict';

import {randomBytes} from 'node:crypto';

const createCodeVerifier = (): string => randomBytes(32).toString('base64url');

export default createCodeVerifier;
