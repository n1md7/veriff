export class InvalidMediaContextException extends Error {
  readonly name = 'InvalidMediaContextException';

  constructor(message: string) {
    super(message);
  }
}
