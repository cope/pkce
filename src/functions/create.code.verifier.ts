'use strict';

const createCodeVerifier = (): string => {
	const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~';
	const length = Math.floor(Math.random() * (128 - 43 + 1)) + 43;
	const result = new Array(length);

	for (let i = 0; i < length; i++) {
		result[i] = chars.charAt(Math.floor(Math.random() * chars.length));
	}

	return result.join('');
};

export default createCodeVerifier;
