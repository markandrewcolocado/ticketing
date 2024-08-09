// a type that comes back whenever we do a validation attempt using express-validator
import { ValidationError } from 'express-validator';
import { CustomError } from './custom-error';

export class RequestValidationError extends CustomError {
  statusCode = 400;

  constructor(public errors: ValidationError[]) {
    super('Invalid request parameters.');

    // Only because we are extending a built in class
    // Some behind the scene stuff that gets our class to work correctly
    Object.setPrototypeOf(this, RequestValidationError.prototype);
  }

  serializeErrors() {
    return this.errors.map((err) => {
      if (err.type === 'field') {
        return { message: err.msg, field: err.path };
      }

      return { message: err.msg };
    });
  }
}
