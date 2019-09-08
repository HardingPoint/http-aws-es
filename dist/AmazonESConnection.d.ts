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
/// <reference types="node" />
import { URL } from 'url';
import * as http from 'http';
import { Connection } from '@elastic/elasticsearch';
interface ConnectionOptions {
    url: URL;
    ssl?: any;
    id?: string;
    headers?: any;
    agent?: any;
    status?: string;
    roles?: any;
    auth?: any;
}
interface RequestOptions extends http.ClientRequestArgs {
    body?: any;
    asStream?: boolean;
}
export declare class AmazonESConnection extends Connection {
    private awsConfig;
    constructor(options: ConnectionOptions);
    request(params: RequestOptions, cb: (err: Error | null, response: http.IncomingMessage | null) => void): http.ClientRequest;
}
export {};
