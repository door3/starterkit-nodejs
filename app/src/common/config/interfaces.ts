import Joi = require('@hapi/joi');

// tslint:disable-next-line:no-empty-interface
export interface IConfig {}

export interface IConfigProvider {
  get: (arg?: string) => IConfig;
  schema: () => Joi.ObjectSchema;
}
