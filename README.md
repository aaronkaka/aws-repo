# aws-repo

Runtime: Node.js 14.x or higher

If relevant, a test event is provided in a separate file.


| Lambda Function | Context | Description |
| --- | --- | --- |
| inline-new-relic-browser.js | Lambda@Edge origin response - Your application's architecture back end does not serve up or create any pages, and therefore the New Relic browser agent is not being automatically installed by the APM. The SPA's index.html is stored in AWS S3. | Asynchronously fetches the index.html. In parallel, the latest New Relic Browser generic loader script is fetched, and inlined into the content body of the returned index.html. |
| reverse-proxy-cloudfront-origin-request-to-api-gateway.js | Lambda@Edge origin request | Strip the 'api' path pattern prepended by API Gateway to the origin request's url, and inject the x-api-key request header for the secured API. |
| reverse-proxy-cloudfront-origin-response-redirect.js | Lambda@Edge origin response | Because custom error pages would inappropriately apply to error responses from the API, create a Lambda function to redirect the response if the S3 content is not found. This can be to an error page or index.html for the app to handle. |

