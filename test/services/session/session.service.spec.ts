import { VeriffAPI } from '../../../src/http-clients/veriff/http.client';
import { SessionService } from '../../../src/services/session/session.service';
import { EnvUtils, ResponseUtils } from '../../../src/utils';

describe('SessionService', () => {
  const sessionId = EnvUtils.getVeriffSessionUUID();
  beforeAll(() => {
    jest.spyOn(ResponseUtils, 'getResponse').mockImplementation((code, data) => [code, data]);
  });
  afterAll(() => jest.clearAllMocks());
  afterEach(() => jest.clearAllMocks());
  it('should accumulate and sort request data by context', async () => {
    const api = new VeriffAPI(sessionId);
    const service = new SessionService(api, 'req-id');
    await service.run();

    const { front, back } = service.getProcessedMedia();
    expect(service.getSessionDetails()).toMatchSnapshot();
    expect(front.getSortedMedia()).toMatchSnapshot();
    expect(back.getSortedMedia()).toMatchSnapshot();
  });
  describe('throw on fetch', () => {
    it('should throw on fetchSessionDetails', () => {
      const api = new VeriffAPI(sessionId);
      jest.spyOn(api, 'fetchSessionDetails').mockRejectedValueOnce([{ error: 'fetchSessionDetails rejected' }] as any);
      const service = new SessionService(api, 'req-id');
      return expect(service.run()).rejects.toMatchSnapshot();
    });
    it('should throw on fetchSessionMedia', () => {
      const api = new VeriffAPI(sessionId);
      jest.spyOn(api, 'fetchSessionMedia').mockRejectedValueOnce([{ error: 'fetchSessionMedia rejected' }] as any);
      const service = new SessionService(api, 'req-id');
      return expect(service.run()).rejects.toMatchSnapshot();
    });
    it('should throw on fetchMediaContext', () => {
      const api = new VeriffAPI(sessionId);
      jest.spyOn(api, 'fetchMediaContext').mockRejectedValueOnce([{ error: 'fetchMediaContext rejected' }] as any);
      const service = new SessionService(api, 'req-id');
      return expect(service.run()).rejects.toMatchSnapshot();
    });
  });
  describe('throw on validation', () => {
    it('should throw on fetchSessionDetails validation', () => {
      const api = new VeriffAPI(sessionId);
      jest.spyOn(api, 'fetchSessionDetails').mockReturnValueOnce([{ invalid: 'fetchSessionDetails data' }] as any);
      const service = new SessionService(api, 'req-id');
      return expect(service.run()).rejects.toMatchSnapshot();
    });
    it('should throw on fetchMediaContext validation', () => {
      const api = new VeriffAPI(sessionId);
      jest.spyOn(api, 'fetchMediaContext').mockReturnValueOnce([{ invalid: 'fetchMediaContext data' }] as any);
      const service = new SessionService(api, 'req-id');
      return expect(service.run()).rejects.toMatchSnapshot();
    });
    it('should throw on fetchSessionMedia validation', () => {
      const api = new VeriffAPI(sessionId);
      jest.spyOn(api, 'fetchSessionMedia').mockReturnValueOnce([{ invalid: 'fetchSessionMedia data' }] as any);
      const service = new SessionService(api, 'req-id');
      return expect(service.run()).rejects.toMatchSnapshot();
    });
  });
});
