'use strict';
// Import the AWS SDK built into the Lambda execution environment.
const aws = require('aws-sdk');
// Import the S3 API available in the AWS SDK.
const s3 = new aws.S3({ apiVersion: '2006-03-01' });
// Import the core Node.js module for HTTP data transfer - avoiding the need to package up and deploy a third party library for this purpose.
const http = require('http');
// Set the target for fetching the New Relic Browser script.
const url = 'http://js-agent.newrelic.com/nr-loader-spa-current.min.js';

exports.handler = async (event, context) => {

    console.log('Received event:', JSON.stringify(event, null, 2));
    // Set the params for fetching the index.html from the S3 bucket, which is dynamic based on environment.
    // We must fetch the object from S3 because the origin response does not expose the content body of the target object.
    const bucketDomainName = event.Records[0].cf.request.origin.s3.domainName || 'invalid.bucket';
    const s3Params = { Bucket: bucketDomainName.substring(0, bucketDomainName.indexOf('.')), Key: 'index.html' };

    try {
        // Fetch the index.html from the S3 bucket. We cannot use an S3 Select, as that only applies to objects of CSV, JSON, or Parquet format.
        const s3GetObjectPromise = s3.getObject(s3Params).promise();

        // GET the New Relic Browser script from the target CDN.
        const NRPromise = new Promise(function(resolve, reject) {

            http.get(url, (res) => {
                let NRData = '';

                // A chunk of data has been received.
                  res.on('data', (chunk) => {
                    NRData += chunk;
                  });

                // The whole response has been received. Resolve the promise.
                  res.on('end', () => {
                    resolve(NRData);
                  });

              }).on('error', (e) => {
                return Error(e);
              });
        });

        const bodyContent = await Promise.all([s3GetObjectPromise, NRPromise]).then((values) => {
            // Extract the html body from the retrieved object.
            const html = values[0].Body.toString();
            // Determine where to inline the script.
            const inlineIndex = html.indexOf('NREUM.info');
            const NRscript = values[1];

            // Inline the script into the proper position in the HTML.
            let aggregation = inlineIndex > -1 ? html.substring(0, inlineIndex) + NRscript + html.substring(inlineIndex) : '';
            aggregation = aggregation.replace(/\r?\n|\r/g, ' ');

            return aggregation;
        });

        const response = {
            status: '200',
            statusDescription: 'OK',
            headers: {
                'content-type': [{
                    key: 'Content-Type',
                    value: 'text/html'
                }]
            },
            body: bodyContent
        };

        return response;

    } catch (err) {
        console.log(err);
        const message = `Error getting object ${s3Params.Key} from bucket ${s3Params.Bucket}. Make sure they exist and your bucket is in the same region as this function.`;
        console.log(message);
        throw new Error(message);
    }
};
