import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';

import { UserModule } from './user/user.module';

@Module({
  imports: [UserModule, GraphQLModule.forRoot({ autoSchemaFile: true })],
})
export class AppModule {}
