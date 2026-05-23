import winston from 'winston';
import { loggerConfig } from '../../config/logger.config';

const formats = [
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  winston.format.errors({ stack: true }),
];

if (loggerConfig.format === 'text') {
  formats.push(winston.format.colorize());
  formats.push(
    winston.format.printf(({ timestamp, level, message, stack, ...meta }) => {
      const metaString = Object.keys(meta).length ? ` | meta: ${JSON.stringify(meta)}` : '';
      const stackString = stack ? `\n${stack}` : '';
      return `[${timestamp}] [${level}]: ${message}${metaString}${stackString}`;
    })
  );
} else {
  formats.push(winston.format.json());
}

export const logger = winston.createLogger({
  level: loggerConfig.level,
  silent: loggerConfig.silent,
  format: winston.format.combine(...formats),
  transports: [
    new winston.transports.Console()
  ],
});
