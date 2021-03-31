import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';

import { config as databaseConfig } from 'src/config/database.config';

import { UserModule } from './user/user.module';

@Module({
  imports: [
    UserModule,
    GraphQLModule.forRoot({ autoSchemaFile: true }),
    TypeOrmModule.forRoot(databaseConfig),
  ],
})
export class AppModule {}
