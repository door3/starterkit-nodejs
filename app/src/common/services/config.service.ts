import * as dotenv from 'dotenv';
import { Injectable } from '@nestjs/common';

import { AppConfigProvider } from '../config/AppConfig.provider';
import { LogConfigProvider } from '../config/LogConfig.provider';

@Injectable()
export class ConfigService {
  private readonly appConfig: AppConfigProvider;
  private readonly logConfig: LogConfigProvider;

  constructor() {
    dotenv.config({ path: '.env' });
    this.appConfig = new AppConfigProvider();
    this.logConfig = new LogConfigProvider();
  }

  get app() {
    return this.appConfig.get();
  }

  get log() {
    return this.logConfig.get();
  }

}
