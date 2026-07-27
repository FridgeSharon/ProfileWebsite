import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Project } from './entities/project.entity';
import { Skill } from './entities/skill.entity';
import { ExperienceEntry } from './entities/experience-entry.entity';
import { Profile } from './entities/profile.entity';

@Injectable()
export class ContentService {
  constructor(
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
    @InjectRepository(Skill)
    private readonly skillRepository: Repository<Skill>,
    @InjectRepository(ExperienceEntry)
    private readonly experienceRepository: Repository<ExperienceEntry>,
    @InjectRepository(Profile)
    private readonly profileRepository: Repository<Profile>,
  ) {}

  async getProfile(): Promise<Profile | null> {
    const profiles = await this.profileRepository.find({ take: 1 });
    return profiles[0] || null;
  }

  findAllProjects(): Promise<Project[]> {
    return this.projectRepository.find();
  }

  findAllSkills(): Promise<Skill[]> {
    return this.skillRepository.find();
  }

  findAllExperience(): Promise<ExperienceEntry[]> {
    return this.experienceRepository.find();
  }
}
