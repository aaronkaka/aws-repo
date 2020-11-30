'use strict';
// Reference the AWS SDK built into the Lambda execution environment.
const aws = require('aws-sdk');
// Reference the S3 API available in the AWS SDK.
const s3 = new aws.S3({ apiVersion: '2006-03-01' });
// Reference the built-in module of Node.js for HTTP data transfer - avoiding the need to package up and deploy a third party library for this purpose.
const http = require('http');
// Set the target for fetching the New Relic Browser script.
const url = "http://js-agent.newrelic.com/nr-loader-spa-current.min.js";

exports.handler = async (event, context, callback) => {

    // Set the params for fetching the index.html from the S3 bucket. This will be dynamic based on environment, and logic will be used for target selection.
    const params = {
        Bucket: 'itpro-poc-plugins-us-east-1',
        Key: 'index.html',
    };

    try {
        // Fetch the index.html from the S3 bucket.
        const data = await s3.getObject(params).promise();
        const html = data.Body.toString();
        // Determine where to inline the New Relic Brwoser script.
        const inlineIndex = html.indexOf('NREUM.info');
        // GET the New Relic Browser script from the target CDN.
        const NRPromise = new Promise(function(resolve, reject) {
            http.get(url, (res) => {
                let NRData = '';

                // A chunk of data has been received.
                  res.on('data', (chunk) => {
                    NRData += chunk;
                  });

                // The whole response has been received. Print out the result.
                  res.on('end', () => {
                    resolve(NRData);
                  });

              }).on('error', (e) => {
                callback(Error(e))
              });
        });
        const NRscript = await NRPromise;

        // Inline the script into the proper position in the HTML.
        var bodyContent = '';
        if (inlineIndex > -1) {
            bodyContent = html.substring(0, inlineIndex) + NRscript + html.substring(inlineIndex);
            bodyContent = bodyContent.replace(/\r?\n|\r/g, " ");
        }

        // Set up the response object.
        const response = {
            status: '200',
            statusDescription: 'OK',
            headers: {
            'content-type': [{
                key: 'Content-Type',
                value: 'text/html'
            }]
            },
            body: bodyContent,
        };

        console.log(response);
        callback(null, response);

    } catch (err) {
        console.log(err);
        const message = `Error getting object ${key} from bucket ${bucket}. Make sure they exist and your bucket is in the same region as this function.`;
        console.log(message);
        throw new Error(message);
    }
};
