import { Controller, Get, Inject } from '@nestjs/common';
import { AppService } from './common/services/app.service';
import { LogService } from './common/services/log.service';

@Controller()
export class AppController {

  constructor(
    private readonly appService: AppService,
    private readonly logger: LogService,
  ) {}

  @Get()
  getHello(): string {
    this.logger.log('getHello', 'AppController');
    return this.appService.getHello();
  }

}
