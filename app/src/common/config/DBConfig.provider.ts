import { ConnectionOptions } from 'typeorm';
import Joi = require('@hapi/joi');
import { IConfig, IConfigProvider } from './interfaces';

export interface IDBConfig extends IConfig {
  [key: string]: ConnectionOptions;
}

export class DBConfigProvider implements IConfigProvider {
  private readonly config: IDBConfig;

  constructor() {

    // Load and validate database environment variables
    this.config = this.validate({
      db1: {
        type: process.env.DB1_TYPE as any || 'postgres',
        host: process.env.DB1_HOST || 'database1',
        port: Number.parseInt(process.env.DB_PORT, 10) || 5432,
        username: process.env.DB1_USER,
        password: process.env.DB1_PASSWORD,
        database: process.env.DB1_NAME,
      },
      db2: {
        type: process.env.DB2_TYPE as any || 'mysql',
        host: process.env.DB2_HOST || 'database2',
        port: Number.parseInt(process.env.DB_PORT, 10) || 3306,
        username: process.env.DB2_USER,
        password: process.env.DB2_PASSWORD,
        database: process.env.DB2_NAME,
      },
    });

  }

  get(dbname: string) {
    return this.config[dbname];
  }

  /**
   * Validate config schema. Customize according to your application's needs.
   */
  schema() {
    return Joi.object({
      type: Joi.string().valid('postgres', 'mysql', 'mssql', 'oracle', 'sqlite', 'mongodb').required(),
      host: Joi.string(),
      port: Joi.number(),
      url: Joi.string(),
      username: Joi.string(),
      password: Joi.string(),
      database: Joi.string(),
    });
  }

  private validate(config: IDBConfig) {

    let validation: Joi.ValidationResult;
    const schema = this.schema();
    const connections = Object.keys(config);

    const valid = connections.every(name => {
      validation = this.validateConnection(config[name], schema);
      return !validation.error;
    });

    if (!valid) {
      throw new Error(`Config validation error: ${validation.error.message}`);
    }

    return config;

  }

  private validateConnection(connection: ConnectionOptions, schema: Joi.ObjectSchema): Joi.ValidationResult {
    return schema.validate(connection);
  }

}
