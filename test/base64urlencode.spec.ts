import {expect} from 'chai';

import base64urlencode from '../src/base64urlencode';

describe('base64urlencode tests', () => {
	it('base64urlencode should be a function', () => {
		expect(base64urlencode).to.exist;
		expect(base64urlencode).to.be.a('function');
	});
});
