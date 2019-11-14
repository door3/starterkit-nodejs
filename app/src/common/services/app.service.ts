import { Injectable } from '@nestjs/common';
import { ConfigService } from './config.service';

@Injectable()
export class AppService {

  constructor(private readonly config: ConfigService) {}

  getHello(): string {
    const env = this.config.app.nodeEnv;
    return `Hello ${env} world!`;
  }
}
