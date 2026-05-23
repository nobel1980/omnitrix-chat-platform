import { Response, NextFunction } from 'express';
import { TraceRequest } from './requestId.middleware';
import { logger } from '../../infrastructure/logger/logger';

export const loggerMiddleware = (req: TraceRequest, res: Response, next: NextFunction) => {
  const { method, originalUrl, ip } = req;
  const start = Date.now();

  res.on('finish', () => {
    const duration = Date.now() - start;
    const { statusCode } = res;
    
    logger.info(`${method} ${originalUrl} ${statusCode} - ${duration}ms | IP: ${ip} | RequestID: ${req.id}`);
  });

  next();
};
