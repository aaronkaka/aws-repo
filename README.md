# aws-lambda-functions

* inline-new-relic-browser.js - For when your application's architecture backends do not serve up or create any pages, and therefore the New Relic browser agent is not being automatically installed by the APM. This AWS Lambda function can replicate this capability for static assets stored in AWS S3.

Upon an AWS CloudFront origin response trigger from an S3 bucket, this Lambda@Edge function asynchronously fetches the index.html for an SPA. In parallel, the latest New Relic Browser generic loader script is fetched, and inlined into the content body of the returned index.html.
