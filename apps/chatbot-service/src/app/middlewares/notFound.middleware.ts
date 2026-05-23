import { Request, Response, NextFunction } from 'express';
import { AppError } from '../errors/AppError';
import { ErrorCodes } from '../errors/ErrorCodes';

export const notFoundMiddleware = (req: Request, res: Response, next: NextFunction) => {
  next(new AppError(`API Route ${req.method} ${req.originalUrl} not found`, 404, ErrorCodes.NOT_FOUND));
};
