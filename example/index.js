const st = require('../src/simpletokens');

/** move the .env file into the root directory (!) */
require('dotenv').config();

st.configure(process.env.SIMPLETOKENS_SECRET);

/** generate a new token with payload */
const payload = {
    sub: 2,
    iss: 'simple-tokens-authority',
    exp: '2d',
}
const token = st.sign(payload);

/** verify token */
const verified = st.verify(token);

/** get payload */
const payload_read = st.getPayload(token);