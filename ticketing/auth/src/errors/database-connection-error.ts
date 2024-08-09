import { CustomError } from './custom-error';

export class DatabaseConnectionError extends CustomError {
  statusCode = 500;
  reason = 'Error connecting to database.';

  constructor() {
    super('Error connecting to database.');

    // Only because we are extending a built in class
    // Some behind the scene stuff that gets our class to work correctly
    Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
  }

  serializeErrors() {
    return [{ message: this.reason }];
  }
}
