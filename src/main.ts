import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app.module';

async function bootstrap() {
  const logger = new Logger('init');
  
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);

  logger.log(`App listening at localhost:3000`)
}
bootstrap();
