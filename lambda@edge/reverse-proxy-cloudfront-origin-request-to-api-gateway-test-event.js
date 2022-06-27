{
  "Records": [
    {
      "cf": {
        "config": {
          "distributionDomainName": "d1c7bd54cmo09r.cloudfront.net",
          "distributionId": "E1P9L7LK47LG1O",
          "eventType": "origin-request",
          "requestId": "CMwnwdwtcrEZ2LlTbxGJVCEr4eeJDNVjpY4IzT3i_7lgWmdDdqXdzw=="
        },
        "request": {
          "clientIp": "24.192.70.22",
          "headers": {
            "host": [
              {
                "key": "Host",
                "value": "3lo2kvn5bl.execute-api.us-east-2.amazonaws.com"
              }
            ],
            "x-forwarded-for": [
              {
                "key": "X-Forwarded-For",
                "value": "24.192.70.22"
              }
            ],
            "user-agent": [
              {
                "key": "User-Agent",
                "value": "Amazon CloudFront"
              }
            ],
            "via": [
              {
                "key": "Via",
                "value": "2.0 d06bda82632727848c168ab6b8704a7e.cloudfront.net (CloudFront)"
              }
            ]
          },
          "method": "GET",
          "origin": {
            "custom": {
              "customHeaders": {},
              "domainName": "3lo2kvn5bl.execute-api.us-east-2.amazonaws.com",
              "keepaliveTimeout": 5,
              "path": "/test",
              "port": 443,
              "protocol": "https",
              "readTimeout": 30,
              "sslProtocols": [
                "TLSv1.2"
              ]
            }
          },
          "querystring": "",
          "uri": "/api"
        }
      }
    }
  ]
}
