export interface ILogger {
  log(...msg: any[]): void;
  warn(...msg: any[]): void;
  error(...msg: any[]): void;
}

abstract class BaseLogger implements ILogger {
  constructor(private _target: ILogger) {}

  log(...msg: any[]): void {
    this._target.log(...msg);
  }
  warn(...msg: any[]): void {
    this._target.log(...msg);
  }
  error(...msg: any[]): void {
    this._target.log(...msg);
  }
}

function prefixSuffixLogger(
  logger: ILogger,
  opts: { prefix?: any; suffix?: any }
): ILogger {
  const { prefix, suffix } = opts;
  const wrap: (args: unknown[]) => unknown[] =
    prefix && suffix
      ? (args) => [prefix, ...args, suffix]
      : prefix
      ? (args) => [prefix, ...args]
      : (args) => [...args, suffix];

  return {
    log: (...msg: unknown[]) => logger.log(...wrap(msg)),
    warn: (...msg: unknown[]) => logger.warn(...wrap(msg)),
    error: (...msg: unknown[]) => logger.error(...wrap(msg)),
  };
}

export class Logger extends BaseLogger {}

export class NamedLogger extends Logger {
  constructor(_target: ILogger, name: string) {
    super(prefixSuffixLogger(_target, { prefix: name }));
  }
}
