var esclient = require('log4js-elasticsearch/lib/elasticsearch-client');
var log4jses = require('log4js-elasticsearch');
var AWS = require('aws-sdk');
var _exec = esclient.prototype.execRequest;
var aws = new AWS.Config();
var endpointmatch = /\.([^.]+)\.es\.amazonaws\.com\.?$/

esclient.prototype.execRequest = function(request, data, done) {
    if (typeof data !== 'string') {
      data = JSON.stringify(data);
    }
    var endpoint = request.getHeader('Host');
    var match = endpoint.match(endpointmatch);
    if (!match) return _exec(request, data, done);
    var region = match[1];
    aws.getCredentials(function(err) {
        // Handle error!
        var awsReq = new AWS.HttpRequest(new AWS.Endpoint(endpoint));
        awsReq.method = request.method;
        awsReq.path = request.path;
        awsReq.region = region;
        awsReq.body = data;
        awsReq.headers = {
            Host: endpoint,
            "presigned-expires": false
        };

        var signer = new AWS.Signers.V4(awsReq, 'es');
        signer.addAuthorization(aws.credentials, new Date());
        request.setHeader('X-Amz-Date', awsReq.headers['X-Amz-Date']);
        request.setHeader('Authorization', awsReq.headers['Authorization']);
        if (awsReq.headers['x-amz-security-token'])
            request.setHeader('x-amz-security-token', awsReq.headers['x-amz-security-token']);

        return _exec(request, data, done);
    });
};

module.exports = log4jses;