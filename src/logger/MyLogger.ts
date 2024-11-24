import log4js, {Logger} from 'log4js';


export function getLogger(category?: string) {
  const logger: Logger = log4js.getLogger(category);
  logger.level = 'info';
  return logger;
}