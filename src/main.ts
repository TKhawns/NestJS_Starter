import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';

require('dotenv').config()

const port = process.env.PORT || 8090
console.log(port)
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.use(cookieParser());
  await app.listen(port);
  Logger.log(`Server is running on port ${port}`);
}
bootstrap();
