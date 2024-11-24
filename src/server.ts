import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import helmet from 'helmet';
import express, {Request, Response} from 'express';

import 'express-async-errors';
import {createProxyMiddleware, fixRequestBody, responseInterceptor} from 'http-proxy-middleware';

import BaseRouter from '@src/routes';

import Paths from '@src/common/Paths';
import EnvVars from '@src/common/EnvVars';
import {NodeEnvs} from '@src/common/misc';
import {HttpProxyService} from '@src/services/HttpProxyService';

// **** Variables **** //
const app = express();


// **** Setup **** //
// Basic middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser(EnvVars.CookieProps.Secret));

// Show routes called in console during development
if (EnvVars.NodeEnv === NodeEnvs.Dev.valueOf()) {
  app.use(morgan('dev'));
}

// Security
if (EnvVars.NodeEnv === NodeEnvs.Production.valueOf()) {
  app.use(helmet());
}

// Add APIs, must be after middleware
app.use(Paths.Base, BaseRouter);

const proxyMiddleware = createProxyMiddleware<Request, Response>({
  changeOrigin: true,
  selfHandleResponse: true,
  on: {
    proxyReq: fixRequestBody,
    proxyRes: responseInterceptor<Request, Response>(HttpProxyService.ReqAndResBodyLogger()),
  },
  target: EnvVars.ProxyTarget,
});

app.use(proxyMiddleware);

// **** Export default **** //
export default app;
