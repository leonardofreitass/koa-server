const boom = require('boom');
const http = require('http');
const Koa = require('koa');
const bodyParser = require('koa-body');
const helmet = require('koa-helmet');
const Router = require('koa-router');
const stoppable = require('stoppable');

const loggerMiddleware = require('./middleware/logger');
const errorHandlerMiddleware = require('./middleware/error-handler');
const createScopeMiddleware = require('./middleware/create-scope');
const createAllRoutes = require('./routes');

module.exports = async function initWeb (scope) {
  const koa = new Koa();
  const baseRouter = new Router({ prefix: '/api' });

  koa.use(createScopeMiddleware(scope));
  koa.use(loggerMiddleware);
  koa.use(errorHandlerMiddleware);
  koa.use(helmet());
  koa.use(bodyParser({
    multipart: true,
  }));

  createAllRoutes(baseRouter);

  koa.use(baseRouter.routes());
  koa.use(baseRouter.allowedMethods({
    throw: true,
    notImplemented: () => boom.notImplemented(),
    methodNotAllowed: () => boom.methodNotAllowed(),
  }));

  return stoppable(http.createServer(koa.callback()));
};
