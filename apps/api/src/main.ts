import 'reflect-metadata';
import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);

  const rawOrigins = process.env['FRONTEND_URL'] ?? '';
  const origins = rawOrigins
    .split(',')
    .map((u) => u.trim())
    .filter(Boolean);

  origins.push('http://localhost:4200');

  app.enableCors({
    origin: origins,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    credentials: true,
  });

  const port = process.env['PORT'] ?? 3000;
  await app.listen(port);

  Logger.log(`API running at http://localhost:${port}/${globalPrefix}`);
}

bootstrap();
