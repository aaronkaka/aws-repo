function handler(event) {
    // NOTE: This function is for a viewer request event trigger on a CF distribution's /graphql behavior.
    var request = event.request;
    var headers = request.headers;
    
    if (!headers.authorization || !headers.authorization.value) {
        console.log('Error: No authorization JWT found');
        var errorResponse = {
            statusCode: 401,
            statusDescription: 'Unauthorized',
            headers: {
                'cloudfront-functions': { value: 'generated-by-CloudFront-Functions' }
            }
        };
        return errorResponse;
    }
    
    // else return unmodified request
    return request;
}
