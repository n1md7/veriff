import { SessionDetailsType, Status, UUID } from '../../../types/response.type';
import { sessionDetailResponseSchema } from '../schemas/session-detail-response.schema';
import { InvalidSessionDetailsException } from '../exceptions/invalid-session-details.exception';

export class SessionDetailResponse {
  constructor(public readonly id: UUID, public readonly status: Status) {}

  static from(payload: SessionDetailsType) {
    return new SessionDetailResponse(payload.id, payload.status);
  }

  static validate(payload: SessionDetailsType) {
    const { error } = sessionDetailResponseSchema.validate(payload);

    if (error) throw new InvalidSessionDetailsException(error.message);
  }
}
