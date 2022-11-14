import { MediaContextType, SessionDetailsType, SessionMediaType } from '../../types/response.type';
import { REQUEST_ID_HEADER_NAME } from '../../middlewares/x-request-id.middleware';
import httpAdapter from 'axios/lib/adapters/http';
import { Logger } from '../../utils/logger';
import { EnvUtils } from '../../utils';
import axios from 'axios';
import './request.mock';

export const httpClient = axios.create({
  baseURL: EnvUtils.getVeriffBaseUrl(),
  adapter: httpAdapter,
});

export class VeriffAPI {
  constructor(private readonly sessionID: string) {}

  fetchSessionDetails(requestID: string) {
    Logger.log('Fetching session details', requestID);

    return httpClient
      .get<SessionDetailsType>(`/sessions/${this.sessionID}`, {
        headers: {
          [REQUEST_ID_HEADER_NAME]: requestID,
        },
      })
      .then(({ data }) => data);
  }

  fetchSessionMedia(requestID: string) {
    Logger.log('Fetching session media', requestID);

    return httpClient
      .get<SessionMediaType[]>(`/sessions/${this.sessionID}/media`, {
        headers: {
          [REQUEST_ID_HEADER_NAME]: requestID,
        },
      })
      .then(({ data }) => data);
  }

  fetchMediaContext(requestID: string) {
    Logger.log('Fetching media context', requestID);

    return httpClient
      .get<MediaContextType[]>(`/media-context/${this.sessionID}`, {
        headers: {
          [REQUEST_ID_HEADER_NAME]: requestID,
        },
      })
      .then(({ data }) => data);
  }
}
