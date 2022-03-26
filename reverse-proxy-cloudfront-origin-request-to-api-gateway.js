exports.handler = async (event, context, callback) => {
    const request = event.Records[0].cf.request;

    if (request.uri.includes('/api')) {
        request.uri = '/';
    }
    request.headers['x-api-key'] = [{key: 'X-Api-Key', value: 'Slava_Ukraini!'}];

    callback(null, request);
};
