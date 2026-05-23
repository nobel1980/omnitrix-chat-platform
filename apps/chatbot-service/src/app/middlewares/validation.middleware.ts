import { Request, Response, NextFunction } from 'express';
import { AnyZodObject } from 'zod';
import { ValidationError } from '../errors/ValidationError';

export const validationMiddleware = (schema: AnyZodObject) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      next();
    } catch (error: any) {
      if (error.errors) {
        const details = error.errors.map((err: any) => ({
          path: err.path.join('.'),
          message: err.message,
        }));
        next(new ValidationError('Input validation failed', details));
      } else {
        next(error);
      }
    }
  };
};
