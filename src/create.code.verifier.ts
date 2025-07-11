'use strict';

const CHARACTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~';
const CHARACTERS_LENGTH = CHARACTERS.length;

const createCodeVerifier = (): string => {
	const length: number = Math.floor(Math.random() * (128 - 43 + 1)) + 43;

	let codeVerifier: string = '';
	for (let i: number = 0; i < length; i++) {
		codeVerifier += CHARACTERS.charAt(Math.floor(Math.random() * CHARACTERS_LENGTH));
	}
	return codeVerifier;
};
export default createCodeVerifier;
