"use strict";
/**
 * A connection handler for Amazon ES.
 *
 * Uses the aws-sdk to make signed requests to an Amazon ES endpoint.
 *
 * @param client {Client} - The Client that this class belongs to
 * @param config {Object} - Configuration options
 * @param [config.protocol=http:] {String} - The HTTP protocol that this connection will use, can be set to https:
 * @class HttpConnector
 */
Object.defineProperty(exports, "__esModule", { value: true });
const AWS = require("aws-sdk");
const aws4 = require("aws4");
const elasticsearch_1 = require("@elastic/elasticsearch");
class AmazonESConnection extends elasticsearch_1.Connection {
    constructor(options) {
        super(options);
        this.awsConfig = AWS.config;
    }
    request(params, cb) {
        const originalMakeRequest = this.makeRequest;
        this.makeRequest = (reqParams) => {
            const options = {
                host: this.url.href,
                region: this.awsConfig.region,
            };
            aws4.sign(options, this.awsConfig.credentials);
            Object.assign(reqParams, options);
            return originalMakeRequest(reqParams);
        };
        return super.request(params, cb);
    }
}
exports.AmazonESConnection = AmazonESConnection;
