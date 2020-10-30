# aws-lambda-functions

* inline-new-relic-browser.js - Upon a Cloudfront origin response trigger from an AWS S3 bucket, this Lambda@Edge function would fetch the index.html for an SPA. Additionally, the latest New Relic Browser generic loader script is fetched, and inlined into the content body of the parsed index.html before being returned to the requestor.
