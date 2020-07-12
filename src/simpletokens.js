const uuid = require('uuid');
const SHA256 = require('crypto-js/sha256');
const base64url = require('base64-url');

class SimpleTokens {

    constructor() {
        this.secret = this.generateSecret();
    }

    configure(secret) {
        if(!secret || secret.length < 10) throw new Error('secret not given or length smaller than 10');
        this.secret = secret;
    }

    generateSecret() {
        return new Array(20).fill(0).map(i => uuid.v4()).join('-');
    }

    sign(obj) {
        if(!obj || typeof obj != 'object') throw new Error('object not given')
        let payload = base64url.encode(JSON.stringify(obj));
        let signature = SHA256(`${payload}.${this.secret}`).toString();
        return `${payload}.${signature}`;
    }

    verify(token) {
        if(!token || typeof token != 'string') throw new Error('token not given or token is not a string');
        let split = token.split('.');
        return SHA256(`${split[0]}.${this.secret}`).toString() === split[1];
    }

    getPayload(token) {
        if(!token || typeof token != 'string') throw new Error('token not given or token is not a string');
        let obj;
        try {
            obj = JSON.parse(base64url.decode(token.split('.')[0]));
        } catch(e) {
            obj = null;
        }
        return obj;
    }

}

module.exports = new SimpleTokens();