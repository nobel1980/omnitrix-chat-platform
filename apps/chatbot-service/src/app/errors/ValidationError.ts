import { AppError } from './AppError';
import { ErrorCodes } from './ErrorCodes';

export interface ValidationErrorDetail {
  path: string;
  message: string;
}

export class ValidationError extends AppError {
  public readonly details: ValidationErrorDetail[];

  constructor(message: string, details: ValidationErrorDetail[]) {
    super(message, 400, ErrorCodes.VALIDATION_ERROR);
    this.details = details;
  }
}
