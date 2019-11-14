import Joi = require('@hapi/joi');
import { IConfig, IConfigProvider } from './interfaces';

export interface IAppConfig extends IConfig {
  nodeEnv: string;
  port: number;
}

export class AppConfigProvider implements IConfigProvider {
  private readonly appConfig: IAppConfig;

  constructor() {

    // Load and validate environment variables
    const { error, value: config } = this.schema().validate({
      nodeEnv: process.env.NODE_ENV || 'development',
      port: Number.parseInt(process.env.PORT, 10) || 3000,
    });

    if (error) {
      throw new Error(`Config validation error: ${error.message}`);
    }

    this.appConfig = config;

  }

  /**
   * Validate config schema. Customize according to your application's needs.
   */
  schema() {
    return Joi.object({
      nodeEnv: Joi.string().valid('development', 'production', 'test', 'stage').default('development'),
      port: Joi.number().default(3000),
    });
  }

  get() {
    return this.appConfig;
  }

}
