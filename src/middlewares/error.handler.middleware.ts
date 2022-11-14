import { InvalidMediaContextException } from '../services/session/exceptions/invalid-media-context.exception';
import { InvalidSessionMediaException } from '../services/session/exceptions/invalid-session-media.exception';
import { InvalidSessionDetailsException } from '../services/session/exceptions/invalid-session-details.exception';
import { REQUEST_ID_HEADER_NAME } from './x-request-id.middleware';
import { NextFunction, Request, Response } from 'express';
import { Logger } from '../utils/logger';
import { AxiosError } from 'axios';
import { RecordNotFoundException } from '../services/session/exceptions/record-not-found.exception';

export const errorHandler = () => (error: unknown, req: Request, res: Response, _next: NextFunction) => {
  const requestId = res.get(REQUEST_ID_HEADER_NAME) || 'ErrorMiddleware';

  switch (true) {
    case error instanceof RecordNotFoundException:
      return res.status(404).send({ error: (<Error>error).message, code: 404 });
    case error instanceof InvalidMediaContextException:
    case error instanceof InvalidSessionMediaException:
    case error instanceof InvalidSessionDetailsException:
      Logger.error((<Error>error).message, requestId);
      return res.status(422).send({ error: 'Unprocessable Entity', code: 422 });
    case (<AxiosError>error).isAxiosError:
      const axiosError = <AxiosError>error;
      Logger.error(
        `message="${axiosError.message}"; code="${axiosError.response?.status}"; apiResponse="${axiosError.response?.data}"`,
        requestId,
      );
      return res.status(422).send({ error: 'Unprocessable Entity', code: 422 });
    default:
      if (error instanceof Error) Logger.error((<Error>error).message, requestId);
      else Logger.error(<string>error, requestId);
      return res.status(500).send({ error: 'Internal Server Error', code: 500 });
  }
};
