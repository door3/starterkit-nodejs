import { Module } from '@nestjs/common';
import { OrmModule } from '../Orm/orm.module';
import { UserRepository } from './entities/user.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import config = require('./db.config');

@Module({
  imports: [
    OrmModule.register(config),
    TypeOrmModule.forFeature([
      User,
      UserRepository,
    ]),
  ],
  exports: [
    TypeOrmModule,
  ],
})
export class DataModule {}
