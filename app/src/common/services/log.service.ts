import { REQUEST } from '@nestjs/core';
import { LoggerService as ILogger, Injectable, Scope, Inject } from '@nestjs/common';
import { createLogger, transports, format, Logger } from 'winston';

import { ConfigService } from './config.service';
import { INFO, ERROR, WARN, DEBUG, VERBOSE } from '../logging/types';
import { IRequest } from '../interfaces/http.interfaces';

@Injectable({ scope: Scope.REQUEST })
export class LogService implements ILogger {
  private readonly logger: Logger;
  private readonly requestContext: string;

  constructor(
    config: ConfigService,
    @Inject(REQUEST) private readonly request?: IRequest,
    ) {

    if (request && request.identifier) {
      this.requestContext = request.identifier;
    }

    this.logger = createLogger({
      level: config.log.level,
      silent: config.log.silent,
      format: format.combine(
        format.label({ label: config.app.name }),
        format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        format.colorize({ all: true }),
        format.printf(this.logFormat()),
      ),
      transports: [
        new transports.Console(),
      ],
    });

  }

  logFormat() {
    const context = this.requestContext;
    return ({timestamp, level, label, message}) =>
      `[${timestamp}] [${level}] [${label}]${ context ? ` [${context}]` : ''} - ${message}`;
  }

  message(message: string, context?: string) {
    return `${context ? `[${context}] ` : ''}${message}`;
  }

  writeLog(level: string, message: any, context?: string) {
    const logMessage = this.message(message, context);

    this.logger.log(level, logMessage);
  }

  log(message: any, context?: string) {
    this.writeLog(INFO, message, context);
  }

  error(message: any, trace?: string, context?: string) {
    this.writeLog(ERROR, message, context);
    this.writeLog(ERROR, trace);
  }

  warn(message: any, context?: string) {
    this.writeLog(WARN, message, context);
  }

  debug?(message: any, context?: string) {
    this.writeLog(DEBUG, message, context);
  }

  verbose?(message: any, context?: string) {
    this.writeLog(VERBOSE, message, context);
  }

}
