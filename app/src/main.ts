import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from './common/services/config.service';
import { LogService } from './common/services/log.service';
import { SwaggerService } from './common/services/swagger.service';
import { requestContext } from './common/middleware/requestContext';

async function bootstrap() {

  const app = await NestFactory.create(AppModule);
  const logger = await app.resolve(LogService); // Request and transient-scoped providers must be retrieved using `resolve`
  const config = app.get(ConfigService); // Singleton-scoped providers can be retrieved using `get`
  const swagger = app.get(SwaggerService);

  // app.enableCors(); // Uncomment if app requires cors
  app.use(requestContext); // Initializes request.identifier
  app.setGlobalPrefix(config.app.basePath);

  // Swagger integration
  swagger.setup(app);

  await app.listen(config.app.port, () => {
    logger.log(`Nest application listening on port ${config.app.port}`);
  });

}

bootstrap();
