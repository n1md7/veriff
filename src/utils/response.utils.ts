export class ResponseUtils {
  static getResponse(code, data) {
    const random = Math.floor(Math.random() * 10) + 1;
    if (random > 8) {
      return [500, 'There is something wrong with the service'];
    }

    return [code, data];
  }
}
