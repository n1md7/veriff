export class Logger {
  private static message(msg: unknown, ctx: string, type: string) {
    console.log(`${type} - ${process.pid} - [${Date.now()}] [${ctx}]: ${JSON.stringify(msg)}`);
  }

  static log(msg: unknown, ctx: string) {
    Logger.message(msg, ctx, 'LOG');
  }

  static error(msg: unknown, ctx: string) {
    Logger.message(msg, ctx, 'ERROR');
  }

  static warn(msg: unknown, ctx: string) {
    Logger.message(msg, ctx, 'WARN');
  }
}
