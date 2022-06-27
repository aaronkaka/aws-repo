exports.handler = async (event, context, callback) => {
    const response = event.Records[0].cf.response;
    console.log('Origin response headers: ', JSON.stringify(response.headers));
      
  /**
   * Updates the HTTP status code in the response to 302, to redirect to another
   * path (cache behavior) that has a different origin configured. Note the following:
   * 1. The function is triggered in an origin response
   * 2. The response status from the origin server is an error status code (4xx or 5xx)
   */

      if (response.status >= 400) {
        const redirect_path = `/error.html`;
    
        response.status = 302;
        response.statusDescription = 'Found';
    
        /* Drop the body, as it is not required for redirects */
        response.body = '';
        response.headers['location'] = [{ key: 'Location', value: redirect_path }];
        console.log('Modified response headers: ', JSON.stringify(response.headers));
      }
    
    callback(null, response);
};
