import * as Joi from 'joi';
import { MediaContextType } from '../../../types/response.type';

export const contextMediaResponseSchema = Joi.array().items(
  Joi.object<MediaContextType>({
    id: Joi.string()
      .guid({ version: ['uuidv4'] })
      .required(),
    mediaId: Joi.string()
      .guid({ version: ['uuidv4'] })
      .required(),
    context: Joi.string().allow('front', 'back', 'none').required(),
    probability: Joi.number().required(),
  }),
);
