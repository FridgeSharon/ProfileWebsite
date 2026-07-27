import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from './entities/project.entity';
import { Skill } from './entities/skill.entity';
import { ExperienceEntry } from './entities/experience-entry.entity';
import { Profile } from './entities/profile.entity';
import { ContentService } from './content.service';
import { ContentController } from './content.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Project, Skill, ExperienceEntry, Profile])],
  providers: [ContentService],
  controllers: [ContentController],
})
export class ContentModule {}
