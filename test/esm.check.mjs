// Loads the built lib in real Node. Jest resolves extensionless paths, so it cannot catch a broken lib/esm.
import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
import {createRequire} from 'node:module';
import pkce, {generate} from '../lib/esm/pkce.js';

const cjs = createRequire(import.meta.url)('../lib/pkce.js');

for (const create of [pkce.generate, generate, cjs.generate, cjs.default.generate]) {
	const {code_verifier, code_challenge, code_challenge_method} = create();
	assert.match(code_verifier, /^[A-Za-z0-9_-]{43}$/);
	assert.equal(code_challenge, createHash('sha256').update(code_verifier).digest('base64url'));
	assert.equal(code_challenge_method, 'S256');
}

console.log('ESM and CJS checks passed on Node', process.version);
