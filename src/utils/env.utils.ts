import dotenv from 'dotenv';
dotenv.config();

export class EnvUtils {
  static getServerPort() {
    return Number(process.env.PORT) || 3000;
  }

  static getVeriffBaseUrl() {
    const url = process.env.VERIFF_API_BASE_URL;
    if (!url) throw new Error('"VERIFF_API_BASE_URL" is missing');

    return url;
  }

  static getVeriffSessionUUID() {
    const uuid = process.env.VERIFF_SESSION_UUID;
    if (!uuid) throw new Error('"VERIFF_SESSION_UUID" is missing');

    return uuid;
  }
}
