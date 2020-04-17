const Router = require('koa-router');
const path = require('path');
const glob = require('glob');

const createAllRoutes = (router = new Router()) => {
  glob.sync(`${__dirname}/**/!(*.spec|index).js`).forEach((file) => {
    const setup = require(path.resolve(file));
    setup(router);
  });

  return router;
};

module.exports = createAllRoutes;
