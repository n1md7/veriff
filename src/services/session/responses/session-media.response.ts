import { MimeType, SessionContext, SessionMediaType, UUID } from '../../../types/response.type';
import { ValidationError } from 'joi';
import { sessionMediaResponseSchema } from '../schemas/session-media-response.schema';
import { InvalidSessionMediaException } from '../exceptions/invalid-session-media.exception';

export class SessionMediaResponse {
  constructor(public readonly id: UUID, public readonly mimeType: MimeType, public readonly context: SessionContext) {}

  static from(payload: SessionMediaType) {
    return new SessionMediaResponse(payload.id, payload.mimeType, payload.context);
  }

  static validate(payload: SessionMediaType[]) {
    const { error } = sessionMediaResponseSchema.validate(payload);

    if (error) throw new InvalidSessionMediaException(error.message);
  }
}
