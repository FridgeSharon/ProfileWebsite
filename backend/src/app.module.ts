import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ThrottlerModule } from '@nestjs/throttler';
import { ContentModule } from './content/content.module';
import { ContactModule } from './contact/contact.module';
import { StatsModule } from './stats/stats.module';
import { MediaModule } from './media/media.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'better-sqlite3',
        database: configService.get<string>('DB_PATH', './data/app.sqlite'),
        autoLoadEntities: true,
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    ThrottlerModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ([{
        ttl: configService.get<number>('THROTTLE_TTL', 60000),
        limit: configService.get<number>('THROTTLE_LIMIT', 5),
      }]),
      inject: [ConfigService],
    }),
    ContentModule,
    ContactModule,
    StatsModule,
    MediaModule,
  ],
})
export class AppModule {}
