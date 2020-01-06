import { Module, NestModule, MiddlewareConsumer, Global } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './common/services/app.service';
import { ConfigService } from './common/services/config.service';
import { LogService } from './common/services/log.service';
import { LoggerMiddleware } from './common/middleware/logging';
import { DataModule } from './modules/Data/data.module';
import { SwaggerService } from './common/services/swagger.service';

@Global()
@Module({
  imports: [
    DataModule,
  ],
  controllers: [AppController],
  providers: [
    LogService,
    ConfigService,
    AppService,
    SwaggerService,
  ],
  exports: [
    ConfigService,
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
