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

import * as AWS from 'aws-sdk';
import * as aws4 from "aws4";
import * as http from 'http';
import { Connection } from '@elastic/elasticsearch'

interface RequestOptions extends http.ClientRequestArgs {
  asStream?: boolean;
}

export function createConnectionClass(awsConfig: AWS.Config): any {

  return class extends Connection {

    public request(params: RequestOptions, cb: (err: Error | null, response: http.IncomingMessage | null) => void): http.ClientRequest  {

      const originalMakeRequest = this.makeRequest

      this.makeRequest = (reqParams: http.ClientRequestArgs ) => {

        reqParams.host = this.url.host
        // @ts-ignore
        reqParams.region = awsConfig.region

        aws4.sign(reqParams, awsConfig.credentials)

        return originalMakeRequest(reqParams)
      }

      return super.request(params, cb)
    }
  }
}
