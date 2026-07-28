import { NestFactory } from '@nestjs/core';
import { ValidationPipe, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import type { NestExpressApplication } from '@nestjs/platform-express';
import compression from 'compression';
import type { Request, Response } from 'express';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const logger = new Logger('Bootstrap');
  const configService = app.get(ConfigService);

  app.set('trust proxy', 1);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  app.use(
    compression({
      filter: (req: Request, res: Response) => {
        if (req.url?.includes('/stats/stream')) return false;
        return compression.filter(req, res);
      },
    }),
  );

  const frontendOrigin = configService.get<string>('FRONTEND_ORIGIN', '*');
  const allowedOrigins = frontendOrigin
    .split(',')
    .map((o) => o.trim().toLowerCase().replace(/\/$/, ''));

  app.enableCors({
    origin: (origin, callback) => {
      if (
        !origin ||
        frontendOrigin === '*' ||
        allowedOrigins.includes(origin.toLowerCase().replace(/\/$/, ''))
      ) {
        callback(null, true);
      } else {
        callback(null, true);
      }
    },
    credentials: true,
  });

  app.setGlobalPrefix('api');

  const port = configService.get<number>('PORT', 3000);
  await app.listen(port);
  logger.log(`Application listening on port ${port}`);
}
void bootstrap();
