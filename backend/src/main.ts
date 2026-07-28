import { NestFactory } from '@nestjs/core';
import { ValidationPipe, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import compression from 'compression';
import type { Request, Response } from 'express';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger('Bootstrap');
  const configService = app.get(ConfigService);

  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  app.use(
    compression({
      filter: (req: Request, res: Response) => {
        if (req.url?.includes('/stats/stream')) return false;
        return compression.filter(req, res);
      },
    }),
  );

  app.enableCors({
    origin: configService.get<string>(
      'FRONTEND_ORIGIN',
      'http://localhost:4200',
    ),
  });

  app.setGlobalPrefix('api');

  await app.listen(3000);
  logger.log('Application listening on port 3000');
}
void bootstrap();
