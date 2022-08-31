function handler(event) {
    // NOTE: This function is for a viewer request event trigger on the Default behavior (fetching SPA static assets from an S3 bucket).
    var request = event.request;
    var terms = ["/index.html/", "/index.html#"];
    var hasDeepLinkSignature = terms.some(term => request.uri.includes(term));
 
    if (hasDeepLinkSignature) {
        request.uri = '/index.html';
        console.log('rewrite request uri: ' + JSON.stringify(request.uri));
    }
    return request;
}
