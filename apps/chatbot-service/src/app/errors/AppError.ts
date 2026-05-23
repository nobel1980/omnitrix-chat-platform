import { ErrorCodes } from './ErrorCodes';

export class AppError extends Error {
  public readonly statusCode: number;
  public readonly errorCode: ErrorCodes;
  public readonly isOperational: boolean;

  constructor(
    message: string,
    statusCode: number = 500,
    errorCode: ErrorCodes = ErrorCodes.INTERNAL_SERVER_ERROR,
    isOperational: boolean = true
  ) {
    super(message);
    this.statusCode = statusCode;
    this.errorCode = errorCode;
    this.isOperational = isOperational;
    
    Error.captureStackTrace(this, this.constructor);
  }
}
