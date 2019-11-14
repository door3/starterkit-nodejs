import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './common/services/app.service';
import { ConfigService } from './common/services/config.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [
    AppService,
    ConfigService,
  ],
})
export class AppModule {}
