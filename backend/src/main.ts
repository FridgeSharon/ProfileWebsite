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

  app.enableCors({
    origin: configService.get<string>(
      'FRONTEND_ORIGIN',
      'http://localhost:4200',
    ),
  });

  app.setGlobalPrefix('api');

  const port = configService.get<number>('PORT', 3000);
  await app.listen(port);
  logger.log(`Application listening on port ${port}`);
}
void bootstrap();
