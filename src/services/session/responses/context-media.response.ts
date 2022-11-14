import { MediaContext, MediaContextType, Probability, UUID } from '../../../types/response.type';
import { contextMediaResponseSchema } from '../schemas/context-media-response.schema';
import { InvalidMediaContextException } from '../exceptions/invalid-media-context.exception';

export class ContextMediaResponse {
  constructor(
    public readonly id: UUID,
    public readonly mediaId: UUID,
    public readonly context: MediaContext,
    public readonly probability: Probability,
  ) {}

  static from(payload: MediaContextType) {
    return new ContextMediaResponse(payload.id, payload.mediaId, payload.context, payload.probability);
  }

  static validate(payload: MediaContextType[]) {
    const { error } = contextMediaResponseSchema.validate(payload);

    if (error) throw new InvalidMediaContextException(error.message);
  }

  isValidContext(context: MediaContext): context is Extract<MediaContext, 'front' | 'back'> {
    return ['back', 'front'].includes(context);
  }
}
