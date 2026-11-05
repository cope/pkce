'use strict';

const toBase64Url = (bytes: Uint8Array): string =>
	btoa(String.fromCharCode(...Array.from(bytes)))
		.replace(/\+/g, '-')
		.replace(/\//g, '_')
		.replace(/=+$/, '');

export default toBase64Url;
