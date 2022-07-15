import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { logger } from './logger';
import * as dotenv from 'dotenv';
dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT);
  logger.info(`Server running on port: ${process.env.PORT}`);
}
bootstrap();
