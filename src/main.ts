import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { config as loadEnv } from 'dotenv';

loadEnv();

import { AppModule } from './modules/app.module';

async function bootstrap() {
  const logger = new Logger('Init');
  
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT);

  logger.log(`App listening at localhost:${process.env.PORT}`)
}
bootstrap();
