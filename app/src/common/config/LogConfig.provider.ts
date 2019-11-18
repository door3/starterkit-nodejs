import Joi = require('@hapi/joi');

import { IConfig, IConfigProvider } from './interfaces';
import { LOG_LEVELS, LOG_LEVEL_NAMES, INFO } from '../logging/types';

export interface ILogConfig extends IConfig {
  level: LOG_LEVELS; // LOG_LEVEL
  silent: boolean; // LOG_SILENT
}

export class LogConfigProvider implements IConfigProvider {
  private readonly logConfig: ILogConfig;

  constructor() {

    const { error, value: config } = this.schema().validate({
      level: process.env.LOG_LEVEL,
      silent: !!process.env.LOG_SILENT || false,
    });

    if (error) {
      throw new Error(`LOG config error: ${error.message}`);
    }

    this.logConfig = config;

  }

  schema() {
    return Joi.object({
      level: Joi.string().valid(...LOG_LEVEL_NAMES).default(INFO),
      silent: Joi.boolean().default(false),
    });
  }

  get() {
    return this.logConfig;
  }
}
