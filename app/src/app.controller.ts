import { Controller, Get, Inject, Post, Query, Body, HttpException } from '@nestjs/common';
import { AppService } from './common/services/app.service';
import { LogService } from './common/services/log.service';
import { UserDto } from './common/dto/User.dto';
import { ApiResponse } from '@nestjs/swagger';

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
  @ApiResponse({ status: 201, description: 'User record created successfully.'})
  @ApiResponse({ status: 400, description: 'User not created'})
  async postUser(@Body() user: UserDto) {

    this.logger.log('postUser', 'AppController');
    this.logger.log(JSON.stringify(user), 'AppController');
    const success = await this.appService.createUser({
      ...user,
      isActive: false,
    });

    if (!success) {
      throw new HttpException('Error creating user', 400);
    }

    return success;
  }

}
