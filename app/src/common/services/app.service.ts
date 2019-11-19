import { Injectable } from '@nestjs/common';
import { ConfigService } from './config.service';
import { LogService } from './log.service';

@Injectable()
export class AppService {

  constructor(
    private readonly config: ConfigService,
    private readonly logger: LogService,
    ) {}

  getHello(): string {
    this.logger.log('getHello', 'AppService');
    const env = this.config.app.nodeEnv;
    return `Hello ${env} world!`;
  }
}
