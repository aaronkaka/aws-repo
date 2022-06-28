const jwt = require('jsonwebtoken');
const jwksClient = require('jwks-rsa');

const client = jwksClient({
    cache: true, // Default Value
    cacheMaxEntries: 32,
    //jwksUri: process.env.JWKS_URI + 'jwks.json',
    jwksUri: 'https://int-piapi-internal.stg-openclass.com/tokens/jwks.json',
    requestHeaders: {}, // Optional
    timeout: 30000 // Defaults to 30s
});

const verificationOptions = {
    "algorithms": "RS512"
}

exports.handler = async (event) => {
    let token = event.authorizationToken || '';
    const header = token.split(".");
    const jwtHead = Buffer.from(header[0], "base64").toString();
    const kid = JSON.parse(jwtHead).kid;
    console.log('kid: ' + kid);
    
    const key = await client.getSigningKey(kid);
    const signingKey = key.getPublicKey();
    console.log('signing key: ' + signingKey);
    
    let response = jwt.verify(token, signingKey, verificationOptions);
    console.log(response);
};
