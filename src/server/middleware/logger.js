module.exports = async (ctx, next) => {
  const start = Date.now();

  await next();

  const ms = Date.now() - start;

  const { logger } = ctx.scope;

  const logLevel = ctx.status >= 500 ? 'error' : 'info';

  logger.log(logLevel, `${ctx.method} ${ctx.url} - HTTP ${ctx.status} - ${ms}ms`);
};
