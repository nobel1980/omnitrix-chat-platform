import { Request, Response, NextFunction } from 'express';
import { randomUUID } from 'crypto';

export interface TraceRequest extends Request {
  id?: string;
}

export const requestIdMiddleware = (req: TraceRequest, res: Response, next: NextFunction) => {
  const reqId = (req.headers['x-request-id'] as string) || randomUUID();
  req.id = reqId;
  res.setHeader('x-request-id', reqId);
  next();
};
