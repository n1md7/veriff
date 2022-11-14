export class RecordNotFoundException extends Error {
  readonly name = 'RecordNotFoundException';

  constructor(message: string) {
    super(message);
  }
}
