import { DataSource } from 'typeorm';
import * as fs from 'fs';
import * as path from 'path';
import { Project } from '../content/entities/project.entity';
import { Skill } from '../content/entities/skill.entity';
import { ExperienceEntry } from '../content/entities/experience-entry.entity';
import { Profile } from '../content/entities/profile.entity';
import { ContactRequest } from '../contact/entities/contact-request.entity';

async function seed() {
  const dbPath = process.env.DB_PATH || './data/app.sqlite';
  const dbDir = path.dirname(dbPath);

  if (!fs.existsSync(dbDir)) {
    fs.mkdirSync(dbDir, { recursive: true });
  }

  const dataSource = new DataSource({
    type: 'better-sqlite3',
    database: dbPath,
    entities: [Project, Skill, ExperienceEntry, Profile, ContactRequest],
    synchronize: true,
  });

  await dataSource.initialize();

  const profileRepo = dataSource.getRepository(Profile);
  const projectRepo = dataSource.getRepository(Project);
  const skillRepo = dataSource.getRepository(Skill);
  const experienceRepo = dataSource.getRepository(ExperienceEntry);

  let seedData: any = null;
  const customSeedPath = path.join(dbDir, 'cv-seed.json');
  if (fs.existsSync(customSeedPath)) {
    seedData = JSON.parse(fs.readFileSync(customSeedPath, 'utf8'));
  }

  const profileCount = await profileRepo.count();
  if (profileCount === 0) {
    const profileItem = seedData?.profile || {
      name: 'Developer Portfolio',
      title: 'Full Stack Engineer',
      tagline: 'Building modern, high-performance web applications and services.',
      location: 'Global',
      linkedinUrl: null,
      githubUrl: null,
      email: null,
      phone: null,
    };
    await profileRepo.save([profileItem]);
  }

  const projectCount = await projectRepo.count();
  if (projectCount === 0) {
    const projectsList = seedData?.projects || [
      { title: 'Project 1', description: 'Sample web application built with modern architecture.', technologies: 'TypeScript, Angular, NestJS', imageFilename: 'placeholder.svg', liveUrl: null, repoUrl: null },
      { title: 'Project 2', description: 'Scalable backend API service.', technologies: 'Node.js, PostgreSQL, Docker', imageFilename: 'placeholder.svg', liveUrl: null, repoUrl: null },
    ];
    await projectRepo.save(projectsList);
  }

  const skillCount = await skillRepo.count();
  if (skillCount === 0) {
    const skillsList = seedData?.skills || [
      { name: 'TypeScript', category: 'Language', proficiency: 90 },
      { name: 'Node.js', category: 'Backend & APIs', proficiency: 90 },
      { name: 'Angular', category: 'Frontend', proficiency: 85 },
    ];
    await skillRepo.save(skillsList);
  }

  const experienceCount = await experienceRepo.count();
  if (experienceCount === 0) {
    const experienceList = seedData?.experience || [
      { role: 'Software Engineer', company: 'Tech Corp', startDate: '2022-01', endDate: null, description: 'Developing web applications and cloud integrations.' },
    ];
    await experienceRepo.save(experienceList);
  }

  await dataSource.destroy();
}

seed().catch(console.error);
