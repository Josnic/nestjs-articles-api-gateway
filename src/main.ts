import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setupSwagger } from './swagger';
import { setupSecurity } from './security';
import { createLogger } from './logger';
import { ValidationPipe } from '@nestjs/common';
import { PROD_ENV } from './constants';
import { NestExpressApplication } from '@nestjs/platform-express';
import { json, urlencoded } from 'body-parser';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    logger: process.env.NODE_ENV === PROD_ENV ? createLogger() : ['error', 'warn']
  })

  app.use(urlencoded({ extended: true }))
  app.use(json({
    limit: '100mb'
  }))
  app.enableCors();

  setupSecurity(app)

  setupSwagger(app)

  app.useGlobalPipes(new ValidationPipe());

  const server = await app.listen(process.env.PORT || 4000)
  server.setTimeout(44000);
}
bootstrap();