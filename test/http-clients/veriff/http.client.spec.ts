import { httpClient, VeriffAPI } from '../../../src/http-clients/veriff/http.client';
import { Logger } from '../../../src/utils/logger';

describe('VeriffAPI', () => {
  afterAll(() => jest.clearAllMocks());
  it('should have methods defined', () => {
    const api = new VeriffAPI('');
    expect(api.fetchMediaContext).toBeDefined();
    expect(api.fetchSessionMedia).toBeDefined();
    expect(api.fetchSessionDetails).toBeDefined();
  });

  it('should send api request', async () => {
    const apiCall = jest.spyOn(httpClient, 'get').mockResolvedValue('data');
    const logCall = jest.spyOn(Logger, 'log').mockReturnValue(void 0);

    const api = new VeriffAPI('session-id');
    const reqId = 'req-id';

    await api.fetchSessionMedia(reqId);
    await api.fetchMediaContext(reqId);
    await api.fetchSessionDetails(reqId);

    expect(apiCall).toMatchSnapshot();
    expect(logCall).toMatchSnapshot();
  });
});
