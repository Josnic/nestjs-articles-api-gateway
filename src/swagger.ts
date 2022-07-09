import { INestApplication } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

export function setupSwagger (app: INestApplication): void {
  
  const options = new DocumentBuilder()
    .setTitle('Api Gateway Rest Artículos')
    .setDescription('Api Gateway Rest Artículos')
    .setVersion('1.0')
    .addTag('Endpoints')
    .setContact('', '', 'josnikh@gmail.com')
    .addBearerAuth()
    .build()
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('docs', app, document);
}