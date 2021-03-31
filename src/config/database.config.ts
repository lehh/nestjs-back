import { TypeOrmModuleOptions } from "@nestjs/typeorm";

function databaseConfig(): TypeOrmModuleOptions {
  const {
    DB_HOST: host = 'localhost',
    DB_PORT: port = '5432',
    DB_USER: username = 'user',
    DB_PASSWORD: password = '123456',
    DB_NAME: database = 'back_nestjs'
  } = process.env;

  return {
    type: 'postgres',
    host,
    port: parseInt(port),
    username,
    password,
    database,
    autoLoadEntities: true
  }
}

export const config = databaseConfig();