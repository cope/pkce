'use strict';

import * as _ from 'lodash';

const CHARACTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~';
const CHARACTERS_LENGTH = CHARACTERS.length;

const createCodeVerifier = (): string => {
	const length: number = _.random(43, 128);

	let codeVerifier: string = '';
	for (let i: number = 0; i < length; i++) {
		codeVerifier += CHARACTERS.charAt(Math.floor(Math.random() * CHARACTERS_LENGTH));
	}
	return codeVerifier;
};
export default createCodeVerifier;
