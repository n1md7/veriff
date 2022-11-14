import * as Joi from 'joi';
import { SessionDetailsType } from '../../../types/response.type';

export const sessionDetailResponseSchema = Joi.object<SessionDetailsType>({
  id: Joi.string()
    .guid({ version: ['uuidv4'] })
    .required(),
  status: Joi.string().allow('internal_manual_review', 'something_else').required(),
});
