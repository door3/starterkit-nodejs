import { Controller, Get, Inject, Post, Query, Body } from '@nestjs/common';
import { AppService } from './common/services/app.service';
import { LogService } from './common/services/log.service';
import { UserDto } from './common/dto/User.dto';

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

  @Post('user')
  postUser(@Body() user: UserDto) {

    this.logger.log('postUser', 'AppController');
    this.logger.log(JSON.stringify(user), 'AppController');
    return this.appService.createUser({
      ...user,
      isActive: false,
    });
  }

}
