import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StatsService } from './stats.service';
import { StatsController } from './stats.controller';
import { ContactRequest } from '../contact/entities/contact-request.entity';
import { StatEvent } from './entities/stat-event.entity';
import { Profile } from '../content/entities/profile.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ContactRequest, StatEvent, Profile])],
  providers: [StatsService],
  controllers: [StatsController],
  exports: [StatsService],
})
export class StatsModule {}

