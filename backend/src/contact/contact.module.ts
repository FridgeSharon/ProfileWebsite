import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContactController } from './contact.controller';
import { ContactService } from './contact.service';
import { ContactRequest } from './entities/contact-request.entity';
import { StatsModule } from '../stats/stats.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forFeature([ContactRequest]),
    StatsModule,
    ConfigModule,
  ],
  controllers: [ContactController],
  providers: [ContactService],
})
export class ContactModule {}
