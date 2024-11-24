import {Logger} from 'log4js';
import {Response, Request} from 'express';
import {getLogger} from '@src/logger/MyLogger';

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class HttpProxyService {
  private static logger: Logger = getLogger('HttpProxyService');

  public static ReqAndResBodyLogger() {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    return async (responseBuffer: Buffer, proxyRes: any, request: Request, response: Response) => {
      const exchange = `[DEBUG] ${request.method} ${request.path}` +
        `-> ${proxyRes.req.protocol}//${proxyRes.req.host}${proxyRes.req.path} [${proxyRes.statusCode}]`;
      HttpProxyService.logger.info(
        exchange +
        `\nreq body: ${JSON.stringify(request.body)}\n` +
        `response body: ${responseBuffer.toString()}`);
      return responseBuffer;
    };
  }
}