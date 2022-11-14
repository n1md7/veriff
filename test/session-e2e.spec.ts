import { httpClient } from '../src/http-clients/veriff/http.client';
import { EnvUtils, ResponseUtils } from '../src/utils';
import '../src/http-clients/veriff/request.mock';
import request from 'supertest';
import { app } from '../src';

describe('GET http://localhost:3000/api/sessions/:sessionId', () => {
  const sessionId = EnvUtils.getVeriffSessionUUID();

  beforeEach(() => {
    jest.spyOn(ResponseUtils, 'getResponse').mockImplementation((code, data) => [code, data]);
  });

  afterEach(() => jest.clearAllMocks());

  describe('Successful request', () => {
    it('should return session with media', async () => {
      const response = await request(app).get(`/api/sessions/${sessionId}`).send();
      expect(response.status).toEqual(200);
      expect(response.body).toMatchObject({
        session: {
          id: '90d61876-b99a-443e-994c-ba882c8558b6',
          status: 'internal_manual_review',
        },
        media: {
          front: [
            { mediaId: '40851916-3e86-45cd-b8ce-0e948a8a7751', mimeType: 'image/png', probability: 0.9264236 },
            { mediaId: '7f2dcbd8-5b5f-4f1a-bfa4-016ddf4dd662', mimeType: 'image/png', probability: 0.8734357 },
            { mediaId: '40f1e462-6db8-4313-ace3-83e4f5619c56', mimeType: 'image/png', probability: 0.2931033 },
          ],
          back: [{ mediaId: 'a6c90b4f-ddfc-49eb-89ad-05b7f1274f96', mimeType: 'image/png', probability: 0.9739324 }],
        },
      });
    });
  });

  describe('Unsuccessful request', () => {
    it('should fail with 404 when incorrect SessionID is used', async () => {
      const response = await request(app).get(`/api/sessions/${'wrong'}`).send();
      expect(response.status).toEqual(404);
      expect(response.body).toMatchObject({
        error: 'SessionID not found',
        code: 404,
      });
    });

    it('should fail with 422 when VeriffApi response validation fails', async () => {
      jest.spyOn(httpClient, 'get').mockResolvedValueOnce({
        status: 200,
        data: {
          invalid: 'me',
        },
      });
      const response = await request(app).get(`/api/sessions/${sessionId}`).send();
      expect(response.status).toEqual(422);
      expect(response.body).toMatchObject({
        error: 'Unprocessable Entity',
        code: 422,
      });
    });

    it('should fail with 422 when VeriffApi response fails', async () => {
      jest.spyOn(httpClient, 'get').mockRejectedValueOnce({
        isAxiosError: true,
        message: 'Request failed with the status code 501',
        response: {
          status: 501,
          data: 'Endpoint Not Implemented',
        },
      });
      const response = await request(app).get(`/api/sessions/${sessionId}`).send();
      expect(response.status).toEqual(422);
      expect(response.body).toMatchObject({
        error: 'Unprocessable Entity',
        code: 422,
      });
    });

    it('should fail with 500 when unexpected error happens', async () => {
      jest.spyOn(httpClient, 'get').mockRejectedValueOnce({
        status: 500,
        data: 'Unexpected error happened',
      });
      const response = await request(app).get(`/api/sessions/${sessionId}`).send();
      expect(response.status).toEqual(500);
      expect(response.body).toMatchObject({
        error: 'Internal Server Error',
        code: 500,
      });
    });
  });
});
