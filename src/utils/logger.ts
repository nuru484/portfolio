// src/utils/logger.ts
//
// Minimal pino-style logger: `logger.info(mergeObj?, msg?)`. Swap for pino in
// production if structured/transport logging is needed.

type LogArg = unknown;

const emit =
  (level: 'debug' | 'info' | 'warn' | 'error' | 'fatal') =>
  (a?: LogArg, b?: string): void => {
    const time = new Date().toISOString();
    const fn =
      level === 'fatal'
        ? console.error
        : level === 'debug'
          ? console.debug
          : console[level];

    if (typeof a === 'string') {
      fn(`[${level}] ${time} — ${a}`);
    } else {
      fn(`[${level}] ${time} — ${b ?? ''}`, a ?? '');
    }
  };

const logger = {
  debug: emit('debug'),
  info: emit('info'),
  warn: emit('warn'),
  error: emit('error'),
  fatal: emit('fatal'),
};

export default logger;
