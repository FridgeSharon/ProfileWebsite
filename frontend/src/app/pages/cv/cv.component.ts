import { Component, ChangeDetectionStrategy, inject, OnInit } from '@angular/core';
import { ContentService } from '../../services/content.service';
import { StatsService } from '../../services/stats.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-cv',
  standalone: true,
  template: `
    <div class="cv-page">
      <div class="cv-container">
        <header class="cv-header">
          <h1>{{ content.profile()?.name || 'Resume' }}</h1>
          @if (content.profile()?.title) {
            <p class="title">{{ content.profile()?.title }}</p>
          }
          <div class="contact-info">
            @if (content.profile()?.location) {
              <span>{{ content.profile()?.location }}</span>
            }
            @if (content.profile()?.linkedinUrl) {
              @if (content.profile()?.location) { <span> | </span> }
              <a [href]="content.profile()?.linkedinUrl" (click)="stats.trackLinkedInClick()" target="_blank" rel="noopener" class="cv-link">LinkedIn Profile</a>
            }
            @if (content.profile()?.githubUrl) {
              <span> | </span>
              <a [href]="content.profile()?.githubUrl" target="_blank" rel="noopener" class="cv-link">GitHub Profile</a>
            }
          </div>
        </header>

        <section class="cv-section">
          <h2>Skills</h2>
          <div class="skills-tags">
            @for (skill of content.skills(); track skill.id) {
              <span class="skill-tag">{{ skill.name }}</span>
            }
          </div>
        </section>

        <section class="cv-section">
          <h2>Experience</h2>
          <div class="experience-list">
            @for (exp of content.experience(); track exp.id) {
              <div class="exp-item">
                <div class="exp-header">
                  <div class="exp-title-row">
                    @if (exp.companyLogoUrl && !failedLogos.has(exp.id)) {
                      <img
                        [src]="getCompanyLogoUrl(exp.companyLogoUrl)"
                        [alt]="exp.company"
                        class="cv-company-logo"
                        (error)="failedLogos.add(exp.id)"
                      >
                    } @else {
                      <div class="cv-logo-placeholder">
                        {{ getInitials(exp.company) }}
                      </div>
                    }
                    <div>
                      <h3>{{ exp.role }}</h3>
                      <h4 class="company-sub">
                        @if (exp.companyUrl) {
                          <a [href]="exp.companyUrl" target="_blank" rel="noopener" class="company-link">{{ exp.company }} ↗</a>
                        } @else {
                          {{ exp.company }}
                        }
                      </h4>
                    </div>
                  </div>
                  <span class="dates">{{ exp.startDate }} - {{ exp.endDate || 'Present' }}</span>
                </div>
                <p>{{ exp.description }}</p>
              </div>
            }
          </div>
        </section>

        <section class="cv-section">
          <h2>Projects</h2>
          <div class="projects-list">
            @for (project of content.projects(); track project.id) {
              <div class="project-item">
                <h3>{{ project.title }}</h3>
                <p>{{ project.description }}</p>
                <div class="tech">
                  <strong>Tech:</strong> {{ project.technologies }}
                </div>
              </div>
            }
          </div>
        </section>
      </div>
    </div>
  `,
  styles: [`
    .cv-page {
      background: #e2e8f0;
      min-height: 100vh;
      padding: 4rem 2rem;
      color: #1e293b;
    }
    .cv-container {
      max-width: 800px;
      margin: 0 auto;
      background: white;
      padding: 4rem;
      box-shadow: 0 20px 40px rgba(0,0,0,0.1);
    }
    .cv-header {
      text-align: center;
      margin-bottom: 3rem;
      border-bottom: 2px solid #cbd5e1;
      padding-bottom: 2rem;
    }
    h1 {
      font-size: 3rem;
      margin: 0 0 0.5rem;
      color: #0f172a;
    }
    .title {
      font-size: 1.2rem;
      color: #64748b;
      margin-bottom: 1rem;
      text-transform: uppercase;
      letter-spacing: 0.1em;
    }
    .contact-info {
      font-size: 0.9rem;
      color: #475569;
    }
    .cv-link {
      color: #2563eb;
      font-weight: 500;
      text-decoration: underline;
    }
    .cv-link:hover {
      color: #1d4ed8;
    }
    .cv-section {
      margin-bottom: 2.75rem;
    }
    h2 {
      font-size: 1.4rem;
      color: #0f172a;
      border-bottom: 1px solid #e2e8f0;
      padding-bottom: 0.5rem;
      margin-bottom: 1.25rem;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }
    .skills-tags {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
    }
    .skill-tag {
      font-size: 0.88rem;
      font-weight: 500;
      background: #f1f5f9;
      color: #334155;
      border: 1px solid #cbd5e1;
      padding: 0.3rem 0.75rem;
      border-radius: 6px;
    }
    .exp-item {
      margin-bottom: 1.75rem;
    }
    .exp-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 0.5rem;
    }
    .exp-title-row {
      display: flex;
      align-items: center;
      gap: 0.75rem;
    }
    .cv-company-logo {
      width: 36px;
      height: 36px;
      border-radius: 8px;
      object-fit: cover;
      border: 1px solid #e2e8f0;
    }
    h3 {
      font-size: 1.15rem;
      margin: 0;
      color: #0f172a;
      font-weight: 600;
    }
    .company-sub {
      font-size: 0.95rem;
      margin: 0.15rem 0 0;
      color: #64748b;
      font-weight: 500;
    }
    .company-link {
      color: #2563eb;
      text-decoration: none;
    }
    .company-link:hover {
      text-decoration: underline;
    }
    .dates {
      font-size: 0.85rem;
      color: #64748b;
      font-weight: 500;
      white-space: nowrap;
    }
    p {
      margin: 0;
      line-height: 1.6;
      color: #334155;
      font-size: 0.93rem;
    }
    .project-item {
      margin-bottom: 1.25rem;
    }
    .tech {
      margin-top: 0.35rem;
      font-size: 0.88rem;
      color: #64748b;
    }
    .cv-logo-placeholder {
      width: 36px;
      height: 36px;
      border-radius: 8px;
      background: linear-gradient(135deg, #0a66c2, #3b82f6);
      color: #ffffff;
      font-weight: 700;
      font-size: 0.85rem;
      display: flex;
      align-items: center;
      justify-content: center;
      border: 1px solid #cbd5e1;
      flex-shrink: 0;
    }
    @media print {
      .cv-page { padding: 0; background: white; }
      .cv-container { box-shadow: none; padding: 0; max-width: 100%; }
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CvComponent implements OnInit {
  content = inject(ContentService);
  stats = inject(StatsService);
  failedLogos = new Set<number>();

  ngOnInit() {
    this.content.loadProfile();
    this.content.loadProjects();
    this.content.loadSkills();
    this.content.loadExperience();
  }

  getCompanyLogoUrl(logoUrl: string | undefined): string {
    if (!logoUrl) return '';
    if (logoUrl.startsWith('http://') || logoUrl.startsWith('https://')) return logoUrl;
    if (logoUrl.startsWith('/')) return `${environment.apiBaseUrl}${logoUrl}`;
    return `${environment.apiBaseUrl}/api/media/images/${logoUrl}`;
  }

  getInitials(name: string): string {
    if (!name) return '??';
    const parts = name.trim().split(/\s+/);
    if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
    return name.substring(0, 2).toUpperCase();
  }
}
