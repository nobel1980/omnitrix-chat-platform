import { Request, Response, NextFunction } from 'express';
import { AppError } from '../errors/AppError';
import { ValidationError } from '../errors/ValidationError';
import { ErrorCodes } from '../errors/ErrorCodes';
import { logger } from '../../infrastructure/logger/logger';
import { appConfig } from '../../config/app.config';

export const errorMiddleware = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // If headers already sent, delegate to default express handler
  if (res.headersSent) {
    return next(err);
  }

  logger.error(`Error occurred: ${err.message}`, { error: err });

  if (err instanceof ValidationError) {
    return res.status(err.statusCode).json({
      success: false,
      code: err.errorCode,
      message: err.message,
      details: err.details,
    });
  }

  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      success: false,
      code: err.errorCode,
      message: err.message,
    });
  }

  // Handle default internal exceptions
  const response: { success: boolean; code: string; message: string; stack?: string } = {
    success: false,
    code: ErrorCodes.INTERNAL_SERVER_ERROR,
    message: 'An unexpected internal server error occurred.',
  };

  if (appConfig.isDev) {
    response.stack = err.stack;
  }

  return res.status(500).json(response);
};
