import { Module, DynamicModule } from '@nestjs/common';
import { ConnectionOptions } from 'typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({})
export class OrmModule {

  static register(options: ConnectionOptions): DynamicModule {

    return {
      module: OrmModule,
      imports: [
        TypeOrmModule.forRoot(options),
      ],
    };

  }

}
