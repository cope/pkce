import {expect} from 'chai';

import sha256 from '../src/sha256';

describe('sha256 tests', () => {
	it('sha256 should be a function', () => {
		expect(sha256).to.exist;
		expect(sha256).to.be.a('function');
	});
});
