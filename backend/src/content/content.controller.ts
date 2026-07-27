import { Controller, Get } from '@nestjs/common';
import { ContentService } from './content.service';
import { Project } from './entities/project.entity';
import { Skill } from './entities/skill.entity';
import { ExperienceEntry } from './entities/experience-entry.entity';
import { Profile } from './entities/profile.entity';

@Controller()
export class ContentController {
  constructor(private readonly contentService: ContentService) {}

  @Get('profile')
  getProfile(): Promise<Profile | null> {
    return this.contentService.getProfile();
  }

  @Get('projects')
  getProjects(): Promise<Project[]> {
    return this.contentService.findAllProjects();
  }

  @Get('skills')
  getSkills(): Promise<Skill[]> {
    return this.contentService.findAllSkills();
  }

  @Get('experience')
  getExperience(): Promise<ExperienceEntry[]> {
    return this.contentService.findAllExperience();
  }
}
