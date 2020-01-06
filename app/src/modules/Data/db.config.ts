const SOURCE_PATH = process.env.ENV_DIR || 'src';

// Config is used by the application as well as the typeorm cli
export = {
  name: process.env.DB1_NAME || 'default',
  type: process.env.DB1_TYPE as any || 'postgres',
  host: process.env.DB1_HOST || '0.0.0.0',
  port: Number.parseInt(process.env.DB1_PORT, 10) || 5432,
  database: process.env.DB1_DATABASE || 'development',
  username: process.env.DB1_USER || 'admin',
  password: process.env.DB1_PASSWORD || 'adminpassword',
  entities: [
    `${SOURCE_PATH}/modules/Data/entities/**/*.entity{.ts,.js}`,
    `${SOURCE_PATH}/modules/Data/entities/**/*.repository{.ts,.js}`,
  ],
  migrations: [`${SOURCE_PATH}/modules/Data/migrations/*{.js,.ts}`],
  migrationsRun: true,
  cli: {
    migrationsDir: `${SOURCE_PATH}/modules/Data/migrations`,
  },
};
