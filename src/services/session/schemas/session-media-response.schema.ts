import * as Joi from 'joi';
import { SessionMediaType } from '../../../types/response.type';

export const sessionMediaResponseSchema = Joi.array().items(
  Joi.object<SessionMediaType>({
    id: Joi.string()
      .guid({ version: ['uuidv4'] })
      .required(),
    mimeType: Joi.string().allow('image/png', 'image/jpg', 'image/jpeg').required(),
    context: Joi.string().allow('document-front', 'document-back').required(),
  }),
);
