const jwt = require('jsonwebtoken');
const jwksClient = require('jwks-rsa');

const client = jwksClient({
    cache: true,
    cacheMaxEntries: 32,
    // Default cacheMaxAge value is 10h
    jwksUri: process.env.JWKS_URI + 'jwks.json',
    timeout: 15000 // 15s
});
const verificationOptions = {
    "algorithms": "RS512"
}

exports.handler = async (event) => {
    console.log('jwks client: ', JSON.stringify(client, null, 2));

    const userToken = event.authorizationToken || '';
    // begin parsing the authorization token
    const header = userToken.split(".");
    // the secret will be decoded using base64 and the token verification will use the original random bytes
    const jwtHead = Buffer.from(header[0], "base64").toString();
    // get reference to signing key
    const kid = JSON.parse(jwtHead).kid;
    // the following will attempt to pull from cache
    const key = await client.getSigningKey(kid);
    const signingKey = key.getPublicKey();
    const jwtPayload = Buffer.from(header[1], "base64").toString();
    // construct default response
    const response = {
        isAuthorized: false,
        resolverContext: JSON.parse(jwtPayload)
    };
    
    try {
        // verify() will evaluate if the token is expired
        let decoded = jwt.verify(userToken, signingKey, verificationOptions);
        response.isAuthorized = true;
    } catch(err) {
        console.log(err);
    }
    
    return response
};
