import { Injectable, signal, inject, WritableSignal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Project } from '../models/project';
import { Skill } from '../models/skill';
import { ExperienceEntry } from '../models/experience';
import { Profile } from '../models/profile';

type LoadingFlag = 'loadingProfile' | 'loadingProjects' | 'loadingSkills' | 'loadingExperience';

@Injectable({ providedIn: 'root' })
export class ContentService {
  private http = inject(HttpClient);
  private baseUrl = (environment.apiBaseUrl || '').replace(/\/+$/, '');

  profile = signal<Profile | null>(null);
  projects = signal<Project[]>([]);
  skills = signal<Skill[]>([]);
  experience = signal<ExperienceEntry[]>([]);
  loadError = signal<string | null>(null);

  private loadingProfile = false;
  private loadingProjects = false;
  private loadingSkills = false;
  private loadingExperience = false;

  private fetchContent<T>(
    endpoint: string,
    targetSignal: WritableSignal<T>,
    flagKey: LoadingFlag,
    hasData: boolean,
  ): void {
    if (hasData || this[flagKey]) return;
    this[flagKey] = true;
    this.http.get<T>(`${this.baseUrl}/api/${endpoint}`).subscribe({
      next: (data: T) => {
        targetSignal.set(data);
        this[flagKey] = false;
      },
      error: () => {
        this.loadError.set('Failed to load content. Please refresh.');
        this[flagKey] = false;
      },
    });
  }

  loadProfile(): void {
    this.fetchContent('profile', this.profile, 'loadingProfile', !!this.profile());
  }

  loadProjects(): void {
    this.fetchContent('projects', this.projects, 'loadingProjects', this.projects().length > 0);
  }

  loadSkills(): void {
    this.fetchContent('skills', this.skills, 'loadingSkills', this.skills().length > 0);
  }

  loadExperience(): void {
    this.fetchContent('experience', this.experience, 'loadingExperience', this.experience().length > 0);
  }
}
