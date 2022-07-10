import { join } from 'path';
import { DataSourceOptions, DataSource } from 'typeorm';

export const connection : DataSourceOptions = {
    type: 'mysql',
    host: process.env.DATABASE_HOST || "localhost",
    port: parseInt(process.env.DATABASE_PORT) || 3306,
    username: process.env.DATABASE_USER || "root",
    password: process.env.DATABASE_PASSWORD || "",
    database: process.env.DATABASE_NAME || "test",
    entities: [join(__dirname, '../api/**/*.entity{.ts,.js}')],
    // We are using migrations, synchronize should be set to false.
    synchronize: false,
    // Run migrations automatically,
    // you can disable this if you prefer running migration manually.
    migrationsRun: false,
    logging: true,
    migrations: [
      join(__dirname, 'migrations/*{.ts,.js}')
    ]
}

export const DataSourceMigrations = new DataSource(connection);