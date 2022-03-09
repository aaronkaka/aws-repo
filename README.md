# aws-lambda-functions

Following is a list of reference Lambda functions in this repository. If relevant, a test event is provided in a separate file.

| Lambda | Context | Description |
| --- | --- | --- |
| inline-new-relic-browser.js | Lambda@Edge origin response - Your application's architecture back end does not serve up or create any pages, and therefore the New Relic browser agent is not being automatically installed by the APM. The SPA's index.html is stored in AWS S3. | Asynchronously fetches the index.html. In parallel, the latest New Relic Browser generic loader script is fetched, and inlined into the content body of the returned index.html. |
| reverse-proxy-cloudfront-origin-request-to-api-gateway.js | Lambda@Edge origin request | . |
| reverse-proxy-cloudfront-origin-response-redirect.js | Lambda@Edge origin response | . |

