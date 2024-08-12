import { CustomError } from './custom-error';

export class BadRequestError extends CustomError {
  statusCode = 400;

  constructor(message: string) {
    super(message);

    // Only because we are extending a built in class
    // Some behind the scene stuff that gets our class to work correctly
    Object.setPrototypeOf(this, BadRequestError.prototype);
  }

  serializeErrors() {
    return [
      {
        message: this.message,
      },
    ];
  }
}
