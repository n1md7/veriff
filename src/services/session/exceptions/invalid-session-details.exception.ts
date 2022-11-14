export class InvalidSessionDetailsException extends Error {
  readonly name = 'InvalidSessionDetailsException';

  constructor(message: string) {
    super(message);
  }
}
