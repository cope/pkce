import {expect} from 'chai';

import createCodeVerifier from '../src/create.code.verifier';

describe('createCodeVerifier tests', () => {
	it('createCodeVerifier should be a function', () => {
		expect(createCodeVerifier).to.exist;
		expect(createCodeVerifier).to.be.a('function');
	});
});
