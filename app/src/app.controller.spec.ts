import { Test, TestingModule } from '@nestjs/testing';

import { AppController } from './app.controller';
import { AppService } from './common/services/app.service';
import { ConfigService } from './common/services/config.service';
import { LogService } from './common/services/log.service';

describe('AppController', () => {
  let appController: AppController;
  const config = new ConfigService();

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        {
          provide: ConfigService,
          useValue: config,
        },
        {
          provide: LogService,
          useFactory: () => new LogService(config),
        },
        AppService,
      ],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return "Hello test world!"', () => {
      expect(appController.getHello()).toBe('Hello test world!');
    });
  });
});
