# simple-tokens
🗝 A simple package for signing and verifying simple-tokens.

## Token
The token contains two parts: a) the payload b) the signature.

- payload: base64encode(JSON.stringify(object))
- signature: SHA256(payload + '.' + secret)
- token: payload + '.' + signature

## Install

Install as NPM package:
```
$ npm install simple-tokens
```

## Use simple-tokens


Require simpletokens
```javascript
const simpletokens = require('simple-tokens');
```

Set secret:
```javascript
simpletokens.configure('YOUR_SECRET_FRO_ENV');
```

Sign token:
```javascript
const payload = { id: 1 }
const token = simpletokens.sign(payload);
```

Verify token:
```javascript
const verified = simpletokens.verify(token);
```

Get payload from token:
```javascript
const payloadObject = simpletokens.getPayload(token);
```