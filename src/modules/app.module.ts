import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';

import { config as databaseConfig } from 'src/config/database.config';

import { UserModule } from './user/user.module';
import { CustomerServiceModule } from './customer-service/customer-service.module';

@Module({
  imports: [
    UserModule,
    GraphQLModule.forRoot({ autoSchemaFile: true }),
    TypeOrmModule.forRoot(databaseConfig),
    CustomerServiceModule,
  ],
})
export class AppModule {}
