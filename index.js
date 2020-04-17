require('dotenv').config();
const { promisify } = require('util');
const config = require('config');

const initWeb = require('./src/server');
const initLogger = require('./src/lib/logger');

const start = async () => {
  const logger = initLogger({ config });
  const scope = {
    config,
    logger,
  };

  const server = await initWeb(scope);
  server.listen(config.get('port'), config.get('host'), () => {
    const port = server.address().port;

    logger.info('Server listening at localhost:%s', port);
  });

  const shutdownServer = promisify(server.stop).bind(server);

  const processShutdown = async () => {
    logger.info('Shutdown signal received.');

    await shutdownServer();

    process.exit(0);
  };

  process.on('SIGTERM', processShutdown);
  process.on('SIGINT', processShutdown);
};

start();
