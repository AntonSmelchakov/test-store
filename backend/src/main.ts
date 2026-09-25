import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  app.useGlobalPipes(
    new ValidationPipe({
      enableDebugMessages: true,
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),)
  const clientUrl =`http://${configService.get('VITE_CLIENT_HOST')}:${configService.get('VITE_CLIENT_PORT')}`
  app.enableCors({ origin: clientUrl,credentials: true, })
  await app.listen(process.env.PORT ?? 3000);
}
await bootstrap();
