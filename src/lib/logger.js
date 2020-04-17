const { createLogger, format, transports } = require('winston');

const initLogger = ({ config }) => {
  const logConfig = config.get('log');
  const { level, label, silent } = logConfig;

  let customFormat = format.combine(
    format.colorize(),
    format.timestamp(),
    format.splat(),
    // eslint-disable-next-line max-len
    format.printf((info) => `${info.timestamp} [${label}${info.label ? `/${info.label}` : ''}] ${info.level}: ${info.message}`)
  );
  const logger = createLogger({
    level,
    format: customFormat,
    transports: [
      new transports.Console({
        handleExceptions: false,
        stderrLevels: ['error'],
        consoleWarnLevels: ['warn'],
        silent,
      }),
    ],
    exitOnError: false,
  });

  return logger;
};

module.exports = initLogger;
