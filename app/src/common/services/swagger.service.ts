import { INestApplication, Injectable } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import packageJson = require('../../../package.json');

@Injectable()
export class SwaggerService {
  private options: DocumentBuilder;

  constructor() {
    this.options = new DocumentBuilder()
      .setTitle(packageJson.name)
      .setDescription(packageJson.description)
      .setVersion(packageJson.version)
    ;
  }

  addBearerAuth() {
    this.options.addBearerAuth();
  }

  setBasePath(path: string) {
    this.options.setBasePath(path);
  }

  setup(app: INestApplication) {
    const document = SwaggerModule.createDocument(app, this.options.build());
    SwaggerModule.setup('swagger', app, document);
  }

}
