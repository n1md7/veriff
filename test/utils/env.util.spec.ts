import { EnvUtils } from '../../src/utils';

describe('EnvUtils', () => {
  const VERIFF_API_BASE_URL = 'VERIFF_API_BASE_URL';
  const VERIFF_SESSION_UUID = 'VERIFF_SESSION_UUID';

  beforeEach(() => {
    process.env.VERIFF_API_BASE_URL = VERIFF_API_BASE_URL;
    process.env.VERIFF_SESSION_UUID = VERIFF_SESSION_UUID;
  });

  describe('getVeriffBaseUrl', () => {
    it('should get value', () => {
      expect(EnvUtils.getVeriffBaseUrl()).toBe(VERIFF_API_BASE_URL);
    });
    it('should throw', () => {
      delete process.env.VERIFF_API_BASE_URL;
      expect(() => EnvUtils.getVeriffBaseUrl()).toThrowErrorMatchingSnapshot();
    });
  });

  describe('getVeriffSessionUUID', () => {
    it('should get value', () => {
      expect(EnvUtils.getVeriffSessionUUID()).toBe(VERIFF_SESSION_UUID);
    });
    it('should throw', () => {
      delete process.env.VERIFF_SESSION_UUID;
      expect(() => EnvUtils.getVeriffSessionUUID()).toThrowErrorMatchingSnapshot();
    });
  });

  describe('getServerPort', () => {
    it('should get value', () => {
      expect(EnvUtils.getServerPort()).toBe(3000);
    });
    it('should not throw', () => {
      delete process.env.PORT;
      expect(EnvUtils.getServerPort()).toBe(3000);
      expect(() => EnvUtils.getServerPort()).not.toThrow();
    });
  });
});
