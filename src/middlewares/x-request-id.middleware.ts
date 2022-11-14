import { NextFunction, Request, Response } from 'express';
import { Logger } from '../utils/logger';

export const REQUEST_ID_HEADER_NAME = 'x-request-id';
export const xRequestId = () => (req: Request, res: Response, next: NextFunction) => {
  const request = { id: req.get(REQUEST_ID_HEADER_NAME) };
  if (!request.id) request.id = 'my-random-id-' + Math.random().toString(32);
  req.headers[REQUEST_ID_HEADER_NAME] = request.id;
  res.set(REQUEST_ID_HEADER_NAME, request.id);
  Logger.log(`${req.method} ${req.url} Request started`, request.id);

  next();
};
