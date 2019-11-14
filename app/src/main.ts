import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from './common/services/config.service';

async function bootstrap() {

  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService);

  await app.listen(config.app.port, () => {
    // tslint:disable-next-line:no-console
    console.log(`Nest application listening on port ${config.app.port}`);
  });

}

bootstrap();
