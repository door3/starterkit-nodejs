import * as dotenv from 'dotenv';
import { Scope, Injectable } from '@nestjs/common';

import { AppConfigProvider } from '../config/AppConfig.provider';
import { DBConfigProvider } from '../config/DBConfig.provider';

@Injectable({ scope: Scope.DEFAULT })
export class ConfigService {
  private readonly appConfig: AppConfigProvider;
  private readonly dbConfig: DBConfigProvider;

  constructor() {
    dotenv.config({ path: '.env' });
    this.appConfig = new AppConfigProvider();
    this.dbConfig = new DBConfigProvider();
  }

  get app() {
    return this.appConfig.get();
  }

  db(dbname: string) {
    return this.dbConfig.get(dbname);
  }

}
