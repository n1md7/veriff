import { EnvUtils } from './env.utils';

export const findMatch = (haystack: string, needle = EnvUtils.getVeriffSessionUUID()) => {
  return haystack.includes(needle);
};
