import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from './common/services/config.service';
import { LogService } from './common/services/log.service';
import { requestContext } from './common/middleware/requestContext';

async function bootstrap() {

  const app = await NestFactory.create(AppModule);
  const logger = await app.resolve(LogService); // Request and transient-scoped providers must be retrieved using `resolve`
  const config = app.get(ConfigService); // Singleton-scoped providers can be retrieved using `get`

  // app.enableCors(); // Uncomment if app requires cors
  app.use(requestContext); // Initializes request.identifier

  await app.listen(config.app.port, () => {
    logger.log(`Nest application listening on port ${config.app.port}`);
  });

}

bootstrap();
