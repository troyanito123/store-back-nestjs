import { join } from 'path';

export enum ConfigOptions {
  port = 'port',
  jwtSecret = 'jwtSecret',
  jwtExp = 'jwtExp',
  database = 'database',
  cloudinary_name = 'cloudinary_name',
  cloudinary_api_key = 'cloudinary_api_key',
  cloudinary_api_secret = 'cloudinary_api_secret',
  defaultUserName = 'defaultUserName',
  defaultUserEmail = 'defaultUserEmail',
  defaultUserPassword = 'defaultUserPassword',
  onesignalAppId = 'onesignalAppId',
  onesignalRestApiKey = 'onesignalRestApiKey',
}

export const config = () => ({
  port: Number(process.env.PORT) || 3000,
  jwtSecret: process.env.JWT_SECRET,
  jwtExp: process.env.JWT_EXP,
  cloudinary_name: process.env.CLOUDINARY_NAME,
  cloudinary_api_key: process.env.CLOUDINARY_API_KEY,
  cloudinary_api_secret: process.env.CLOUDINARY_API_SECRET,
  defaultUserName: process.env.DEFAULT_USER_NAME,
  defaultUserEmail: process.env.DEFAULT_USER_EMAIL,
  defaultUserPassword: process.env.DEFAULT_USER_PASSWORD,
  onesignalAppId: process.env.ONESIGNAL_APP_ID,
  onesignalRestApiKey: process.env.ONESIGNAL_REST_API_KEY,
  database: {
    type: 'postgres',
    // descomentar para mandar a produccion
    ssl: {
      rejectUnauthorized: false,
    },
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT, 10) || 5432,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    entities: [join(__dirname, '../**/**/*.entity{.ts,.js}')],
    autoLoadEntities: true,

    // Implementaremos Migrations.
    /** Recursos
     *  * https://typeorm.io/#/migrations
     */
    // descomentar para mandar a produccion
    migrationsRun: true,
    migrations: [join(__dirname, '../database/migrations/**/*{.ts,.js}')],
    migrationsTableName: 'custom_migration_table',
    cli: {
      migrationsDir: 'src/database/migrations',
    },

    // Activar SOLO MANUALMENTE en DESARROLLO SI ES NECESARIO (DESACTIVAR EN PRODUCCION).
    synchronize: false,
  },
});
