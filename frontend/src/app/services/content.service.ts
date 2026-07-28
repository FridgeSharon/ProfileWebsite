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

  loadProfile(): void {
    if (this.profile()) return;
    this.http.get<Profile | null>(`${this.baseUrl}/api/profile`).subscribe({
      next: (data: Profile | null) => this.profile.set(data),
      error: () => this.loadError.set('Failed to load content. Please refresh.')
    });
  }

  loadProjects(): void {
    if (this.projects().length) return;
    this.http.get<Project[]>(`${this.baseUrl}/api/projects`).subscribe({
      next: (data: Project[]) => this.projects.set(data),
      error: () => this.loadError.set('Failed to load content. Please refresh.')
    });
  }

  loadSkills(): void {
    if (this.skills().length) return;
    this.http.get<Skill[]>(`${this.baseUrl}/api/skills`).subscribe({
      next: (data: Skill[]) => this.skills.set(data),
      error: () => this.loadError.set('Failed to load content. Please refresh.')
    });
  }

  loadExperience(): void {
    if (this.experience().length) return;
    this.http.get<ExperienceEntry[]>(`${this.baseUrl}/api/experience`).subscribe({
      next: (data: ExperienceEntry[]) => this.experience.set(data),
      error: () => this.loadError.set('Failed to load content. Please refresh.')
    });
  }
}
