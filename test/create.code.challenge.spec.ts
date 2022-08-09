import {expect} from 'chai';

import createCodeChallenge from '../src/create.code.challenge';

describe('createCodeChallenge tests', () => {
	it('createCodeChallenge should be a function', () => {
		expect(createCodeChallenge).to.exist;
		expect(createCodeChallenge).to.be.a('function');
	});
});
