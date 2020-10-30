'use strict';

const aws = require('aws-sdk');
const s3 = new aws.S3({ apiVersion: '2006-03-01' });
const http = require('http');
const url = "http://js-agent.newrelic.com/nr-loader-spa-current.min.js";

exports.handler = async (event, context, callback) => {

    const params = {
        Bucket: 'itpro-poc-plugins-us-east-1',
        Key: 'index.html',
    };

    try {
        const data = await s3.getObject(params).promise();
        const html = data.Body.toString();
        const inlineIndex = html.indexOf('NREUM.info');
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

        var bodyContent = '';
        if (inlineIndex > -1) {
            bodyContent = html.substring(0, inlineIndex) + NRscript + html.substring(inlineIndex);
            bodyContent = bodyContent.replace(/\r?\n|\r/g, " ");
        }

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
