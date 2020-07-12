const assert = require('assert');
const simpletokens = require('../src/simpletokens');

describe('Simple Token Test', () => {

    it('should set secret', () => {
        simpletokens.configure('1234567890');
        assert.equal(simpletokens.secret, '1234567890');
    });

    it('should generate token', () => {
        simpletokens.configure('1234567890');
        assert.equal(simpletokens.sign({ id: 1 }), 'eyJpZCI6MX0.1e28775d98c945d37741f3b6a673f819e70dc6d50d5d00802a1218d6a9ffb492');
    });

    it('should verify token (=> true)', () => {
        simpletokens.configure('1234567890');
        let token = simpletokens.sign({ id: 1 });
        assert.equal(simpletokens.verify(token), true);
    });

    it('should verify token (=> false)', () => {
        simpletokens.configure('1234567890');
        let token = simpletokens.sign({ id: 1 });
        token = token.split('.').map((v,i) => {
            if(i == 0) return 'eyJpZCI6MX1'
            return v;
        }).join('.')
        assert.equal(simpletokens.verify(token), false);
    });

    it('should return object', () => {
        simpletokens.configure('1234567890');
        let token = simpletokens.sign({ id: 1 });
        assert.deepEqual(simpletokens.getPayload(token), { id: 1 });
    });

});