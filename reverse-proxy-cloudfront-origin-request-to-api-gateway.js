exports.handler = async (event, context, callback) => {
    const request = event.Records[0].cf.request;
    
    if (request.uri === '/api') {
        request.uri = '/';
        console.log('MODIFIED origin request uri:', JSON.stringify(request.uri));
    }

    callback(null, request);
};
