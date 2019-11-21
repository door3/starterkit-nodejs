import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './common/services/app.service';
import { ConfigService } from './common/services/config.service';
import { LogService } from './common/services/log.service';
import { LoggerMiddleware } from './common/middleware/logging';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [
    LogService,
    ConfigService,
    AppService,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes('*')
    ;
  }
}
