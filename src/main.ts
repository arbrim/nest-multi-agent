import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';

async function bootstrap() {
  // Load .env variables
  dotenv.config();

  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
  console.log('Nest Multi-Agent app running on http://localhost:3000');
}
bootstrap();
