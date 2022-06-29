const jwt = require('jsonwebtoken');
const jwksClient = require('jwks-rsa');

const client = jwksClient({
    cache: true, // Default Value
    cacheMaxEntries: 32,
    jwksUri: process.env.JWKS_URI + 'jwks.json',
    requestHeaders: {}, // Optional
    timeout: 30000 // Defaults to 30s
});

const verificationOptions = {
    "algorithms": "RS512"
}

exports.handler = async (event) => {
    const userToken = event.authorizationToken || '';
    const header = userToken.split(".");
    // the secret will be decoded using base64 and the token verification will use the original random bytes
    const jwtHead = Buffer.from(header[0], "base64").toString();
    const kid = JSON.parse(jwtHead).kid;

    const key = await client.getSigningKey(kid);
    const signingKey = key.getPublicKey();
    const response = {
        isAuthorized: false,
        resolverContext: JSON.parse(Buffer.from(header[1], "base64").toString())
    };
    
    try {
        let decoded = jwt.verify(userToken, signingKey, verificationOptions);
        response.isAuthorized = true;
    } catch(err) {
        console.log(err);
    }
    
    return response
};
