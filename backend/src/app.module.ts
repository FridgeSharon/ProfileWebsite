import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as Joi from 'joi';
import * as fs from 'fs';
import * as path from 'path';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ThrottlerModule } from '@nestjs/throttler';
import { ContentModule } from './content/content.module';
import { ContactModule } from './contact/contact.module';
import { StatsModule } from './stats/stats.module';
import { MediaModule } from './media/media.module';
import { HealthModule } from './health/health.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        NODE_ENV: Joi.string().default('development'),
        SMTP_HOST: Joi.string().allow('').optional(),
        SMTP_PORT: Joi.number().allow('').optional(),
        SMTP_USER: Joi.string().allow('').optional(),
        SMTP_PASS: Joi.string().allow('').optional(),
        SMTP_FROM: Joi.string().allow('').optional(),
        OWNER_EMAIL: Joi.string().allow('').optional(),
        FRONTEND_ORIGIN: Joi.string().allow('').optional(),
        THROTTLE_TTL: Joi.number().allow('').optional(),
        THROTTLE_LIMIT: Joi.number().allow('').optional(),
        DB_PATH: Joi.string().allow('').optional(),
      }),
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        const dbPath = configService.get<string>(
          'DB_PATH',
          './data/app.sqlite',
        );
        const dbDir = path.dirname(dbPath);
        if (!fs.existsSync(dbDir)) {
          fs.mkdirSync(dbDir, { recursive: true });
        }
        return {
          type: 'better-sqlite3',
          database: dbPath,
          autoLoadEntities: true,
          synchronize: configService.get<string>('NODE_ENV') === 'development',
        };
      },
      inject: [ConfigService],
    }),
    ThrottlerModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => [
        {
          ttl: configService.get<number>('THROTTLE_TTL', 60000),
          limit: configService.get<number>('THROTTLE_LIMIT', 5),
        },
      ],
      inject: [ConfigService],
    }),
    ContentModule,
    ContactModule,
    StatsModule,
    MediaModule,
    HealthModule,
  ],
})
export class AppModule {}
