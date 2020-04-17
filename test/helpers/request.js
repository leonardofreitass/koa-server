require('dotenv').config();
const { promisify } = require('util');
const config = require('config');
const supertest = require('supertest');

const initWeb = require('../../src/server');
const initLogger = require('../../src/lib/logger');

const createServer = async () => {
  const logger = initLogger({ config });
  const scope = {
    config,
    logger,
  };

  const server = await initWeb(scope);

  server.listen(config.get('port'), config.get('host'));

  const shutdownServer = promisify(server.stop).bind(server);

  const shutdown = async () => {
    await shutdownServer();
  };

  return { server, request: supertest(server), shutdown };
};

module.exports = createServer;
