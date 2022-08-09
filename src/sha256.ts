'use strict';

const sha256 = (plain: string): Promise<ArrayBuffer> => {
	const encoder: TextEncoder = new TextEncoder();
	const data: Uint8Array = encoder.encode(plain);
	return window.crypto.subtle.digest('SHA-256', data);
};
export default sha256;
