export abstract class CustomError extends Error {
  abstract statusCode: number;

  constructor(message: string) {
    // Adding message for logging purposes.
    super(message);

    Object.setPrototypeOf(this, CustomError.prototype);
  }

  abstract serializeErrors(): { message: string; field?: string }[];
}
