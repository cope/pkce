import {expect} from 'chai';

import pkce from '../src/pkce';

describe('pkce tests', () => {
	it('pkce should be a function', () => {
		expect(pkce).to.exist;
		expect(pkce).to.be.a('function');
	});
});
