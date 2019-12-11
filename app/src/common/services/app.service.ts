import { Injectable } from '@nestjs/common';
import { ConfigService } from './config.service';
import { LogService } from './log.service';
import { UserRepository } from '../../modules/Data/entities/user.repository';
import { User } from '../../modules/Data/entities/user.entity';

@Injectable()
export class AppService {

  constructor(
    private readonly config: ConfigService,
    private readonly logger: LogService,
    private readonly users: UserRepository,
    ) {}

  getHello(): string {
    this.logger.log('getHello', 'AppService');
    const env = this.config.app.nodeEnv;
    return `Hello ${env} world!`;
  }

  async createUser(user: Omit<User, 'id'>) {
    const existing = await this.users.find({ email: user.email });
    if (!existing.length) {
      await this.users.insert(user);
      return true;
    }

    return false;
  }

}
