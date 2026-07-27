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

  loadProfile(): void {
    this.http.get<Profile | null>(`${this.baseUrl}/api/profile`).subscribe(data => this.profile.set(data));
  }

  loadProjects(): void {
    this.http.get<Project[]>(`${this.baseUrl}/api/projects`).subscribe(data => this.projects.set(data));
  }

  loadSkills(): void {
    this.http.get<Skill[]>(`${this.baseUrl}/api/skills`).subscribe(data => this.skills.set(data));
  }

  loadExperience(): void {
    this.http.get<ExperienceEntry[]>(`${this.baseUrl}/api/experience`).subscribe(data => this.experience.set(data));
  }
}
