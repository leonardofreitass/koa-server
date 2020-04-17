const { get, snakeCase } = require('lodash');

module.exports = async (ctx, next) => {
  const { logger } = ctx.scope;
  try {
    await next();
  } catch (error) {
    if (error.isBoom) {
      const status = get(error, 'output.statusCode', 500);

      ctx.status = status;
      ctx.body = {
        error: get(error, 'data.code', snakeCase(get(error, 'typeof.name', 'internal_server_error'))),
        message: error.message,
        data: get(error, 'data.data'),
      };

      if (status >= 500) {
        logger.error(error.stack);
      }
    } else {
      ctx.status = 500;
      ctx.body = {
        error: 'internal_server_error',
        message: 'Internal Server Error',
      };
      logger.error(error.stack);
    }
  }
};
