'use strict';

import {enc, SHA256} from "crypto-js";

const createCodeChallenge = (codeVerfier: string): string => SHA256(codeVerfier).toString(enc.Base64url);
export default createCodeChallenge;
