import { Injectable, signal, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Project } from '../models/project';
import { Skill } from '../models/skill';
import { ExperienceEntry } from '../models/experience';
import { Profile } from '../models/profile';

@Injectable({ providedIn: 'root' })
export class ContentService {
  private http = inject(HttpClient);
  private baseUrl = environment.apiBaseUrl;

  profile = signal<Profile | null>(null);
  projects = signal<Project[]>([]);
  skills = signal<Skill[]>([]);
  experience = signal<ExperienceEntry[]>([]);
  loadError = signal<string | null>(null);

  private loadingProfile = false;
  private loadingProjects = false;
  private loadingSkills = false;
  private loadingExperience = false;

  loadProfile(): void {
    if (this.profile() || this.loadingProfile) return;
    this.loadingProfile = true;
    this.http.get<Profile | null>(`${this.baseUrl}/api/profile`).subscribe({
      next: (data: Profile | null) => {
        this.profile.set(data);
        this.loadingProfile = false;
      },
      error: () => {
        this.loadError.set('Failed to load content. Please refresh.');
        this.loadingProfile = false;
      }
    });
  }

  loadProjects(): void {
    if (this.projects().length || this.loadingProjects) return;
    this.loadingProjects = true;
    this.http.get<Project[]>(`${this.baseUrl}/api/projects`).subscribe({
      next: (data: Project[]) => {
        this.projects.set(data);
        this.loadingProjects = false;
      },
      error: () => {
        this.loadError.set('Failed to load content. Please refresh.');
        this.loadingProjects = false;
      }
    });
  }

  loadSkills(): void {
    if (this.skills().length || this.loadingSkills) return;
    this.loadingSkills = true;
    this.http.get<Skill[]>(`${this.baseUrl}/api/skills`).subscribe({
      next: (data: Skill[]) => {
        this.skills.set(data);
        this.loadingSkills = false;
      },
      error: () => {
        this.loadError.set('Failed to load content. Please refresh.');
        this.loadingSkills = false;
      }
    });
  }

  loadExperience(): void {
    if (this.experience().length || this.loadingExperience) return;
    this.loadingExperience = true;
    this.http.get<ExperienceEntry[]>(`${this.baseUrl}/api/experience`).subscribe({
      next: (data: ExperienceEntry[]) => {
        this.experience.set(data);
        this.loadingExperience = false;
      },
      error: () => {
        this.loadError.set('Failed to load content. Please refresh.');
        this.loadingExperience = false;
      }
    });
  }
}
