import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import compression from 'compression';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  app.use(compression());
  
  app.enableCors({
    origin: configService.get<string>('FRONTEND_ORIGIN', 'http://localhost:4200'),
  });

  app.setGlobalPrefix('api');

  await app.listen(3000);
}
bootstrap();
