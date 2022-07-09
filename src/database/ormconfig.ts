import { join } from 'path';
import { DataSourceOptions } from 'typeorm';

const config = {
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.SQL_DATABASE,
  port: parseInt(process.env.DATABASE_PORT)
};

export const connection: DataSourceOptions = {
  type: 'mysql',
  host: config.host,
  port: config.port,
  username: config.user,
  password: config.password,
  database: config.database,
  entities: [join(__dirname, '../api/**/*.entity{.ts,.js}')],
  // We are using migrations, synchronize should be set to false.
  synchronize: false,
  dropSchema: false,
  // Run migrations automatically,
  // you can disable this if you prefer running migration manually.
  migrationsRun: false,
  logging: true,
  migrations: [
    join(__dirname, 'migrations/*{.ts,.js}')
  ]
}

export default connection;