import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './common/services/app.service';
import { ConfigService } from './common/services/config.service';
import { LogService } from './common/services/log.service';
import { LoggerMiddleware } from './common/middleware/logging';
import { requestContext } from './common/middleware/requestContext';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [
    AppService,
    ConfigService,
    LogService,
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
