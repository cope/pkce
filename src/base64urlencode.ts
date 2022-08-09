'use strict';

const base64urlencode = (array: ArrayBuffer): string => {
	let str: string = '';
	const bytes: Uint8Array = new Uint8Array(array);
	const length: number = bytes.byteLength;
	for (let i: number = 0; i < length; i++) str += String.fromCharCode(bytes[i]);

	return btoa(str).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
};
export default base64urlencode;
