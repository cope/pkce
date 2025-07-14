'use strict';

/**
 * PKCE (Proof Key for Code Exchange) constants based on RFC 7636
 * @see https://tools.ietf.org/html/rfc7636
 */
export const PKCE_CONSTANTS: {
	readonly CODE_VERIFIER: {
		readonly MIN_LENGTH: number;
		readonly MAX_LENGTH: number;
		readonly ALLOWED_CHARS: string;
	};
	readonly CODE_CHALLENGE: {
		readonly METHOD: 'S256';
		readonly EXPECTED_LENGTH: number;
		readonly MIN_LENGTH: number;
		readonly MAX_LENGTH: number;
	};
} = {
	CODE_VERIFIER: {
		/** Minimum length for code verifier (RFC 7636) */
		MIN_LENGTH: 43,
		/** Maximum length for code verifier (RFC 7636) */
		MAX_LENGTH: 128,
		/** Allowed characters for code verifier (RFC 7636) */
		ALLOWED_CHARS: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~'
	},
	CODE_CHALLENGE: {
		/** Code challenge method (RFC 7636) */
		METHOD: 'S256' as const,
		/** Expected length for SHA256 base64url encoding */
		EXPECTED_LENGTH: 43,
		/** Minimum length for validation */
		MIN_LENGTH: 20,
		/** Maximum length for validation */
		MAX_LENGTH: 100
	}
} as const;
