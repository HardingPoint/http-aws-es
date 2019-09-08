"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AWS = require("aws-sdk");
class NodeHttpClient {
    constructor() {
        // @ts-ignore
        this.client = new AWS.HttpClient();
    }
    handleRequest(request, httpOptions, cb) {
        return this.client.handleRequest(request, httpOptions, (response) => {
            const { headers } = response;
            let body = '';
            /*
            let encoding = (headers['content-encoding'] || '').toLowerCase();
            if (encoding === 'gzip' || encoding === 'deflate') {
              response = response.pipe(zlib.createUnzip());
            }
            */
            response.setEncoding('utf8');
            response.on('data', function (data) {
                body += data;
            });
            response.on('end', () => {
                cb(null, response);
            });
        }, (err) => { cb(err, null); });
    }
}
exports.NodeHttpClient = NodeHttpClient;
