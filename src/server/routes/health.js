const Router = require('koa-router');

const createRoutes = (router = new Router()) => {
  router.get('/health', async (ctx) => {
    const { logger } = ctx.scope;
    logger.info('Health endpoint hit');
    ctx.body = {};
  });

  return router;
};

module.exports = createRoutes;
