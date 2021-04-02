# aws-lambda-functions

Following is a list of reference Lambda functions in this repository. If relevant, a test event is provided as well in a separate file.

| Lambda | Context | Description |
| --- | --- | --- |
| inline-new-relic-browser.js | Your application's architecture backend does not serve up or create any pages, and therefore the New Relic browser agent is not being automatically installed by the APM. This AWS Lambda function can replicate this capability for an SPA's index.html stored in AWS S3. | Upon an AWS CloudFront origin response trigger from an S3 bucket, this Lambda@Edge function asynchronously fetches the index.html. In parallel, the latest New Relic Browser generic loader script is fetched, and inlined into the content body of the returned index.html. |
