import { Logger } from '../../src/utils/logger';

describe('Logger', () => {
  afterAll(() => jest.clearAllMocks());
  it('should verify log messages', () => {
    const spy = jest.spyOn(console, 'log').mockReturnValue(void 0);

    Logger.log('My log message', 'LogContext');
    Logger.warn('My warn message', 'WarnContext');
    Logger.error('My error message', 'ErrorContext');

    expect(spy).toHaveBeenCalledTimes(3);
  });
});
