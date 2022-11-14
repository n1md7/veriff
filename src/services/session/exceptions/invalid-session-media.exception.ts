export class InvalidSessionMediaException extends Error {
  readonly name = 'InvalidSessionMediaException';

  constructor(message: string) {
    super(message);
  }
}
