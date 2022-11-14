import { RecordNotFoundException } from '../services/session/exceptions/record-not-found.exception';
import express, { NextFunction, Request, Response } from 'express';
import { REQUEST_ID_HEADER_NAME } from '../middlewares/x-request-id.middleware';
import { SessionService } from '../services/session/session.service';
import { SessionResponseType } from '../types/response.type';
import { VeriffAPI } from '../http-clients/veriff/http.client';
import { EnvUtils } from '../utils';

export const session = express.Router();

session.get('/:sessionId', async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Instead of param sessionId using hardcoded value
    const sessionID = EnvUtils.getVeriffSessionUUID();
    if (req.params['sessionId'] !== sessionID) throw new RecordNotFoundException('SessionID not found');

    const requestId = req.get(REQUEST_ID_HEADER_NAME)!;
    const veriffApi = new VeriffAPI(sessionID);
    const sessionService = new SessionService(veriffApi, requestId);

    await sessionService.run();

    const { front, back } = sessionService.getProcessedMedia();

    return res.status(200).json(<SessionResponseType>{
      session: sessionService.getSessionDetails(), // O(1)
      media: {
        front: front.getSortedMedia(), // O(nLogN)
        back: back.getSortedMedia(), // O(nLogN)
      },
    });
  } catch (error: unknown) {
    next(error);
  }
});
