import * as dotenv from 'dotenv';
import { Scope, Injectable } from '@nestjs/common';

import { AppConfigProvider } from '../config/AppConfig.provider';
import { DBConfigProvider } from '../config/DBConfig.provider';
import { LogConfigProvider } from '../config/LogConfig.provider';

@Injectable({ scope: Scope.DEFAULT })
export class ConfigService {
  private readonly appConfig: AppConfigProvider;
  private readonly dbConfig: DBConfigProvider;
  private readonly logConfig: LogConfigProvider;

  constructor() {
    dotenv.config({ path: '.env' });
    this.appConfig = new AppConfigProvider();
    this.dbConfig = new DBConfigProvider();
    this.logConfig = new LogConfigProvider();
  }

  get app() {
    return this.appConfig.get();
  }

  get log() {
    return this.logConfig.get();
  }

  db(dbname: string) {
    return this.dbConfig.get(dbname);
  }

}
