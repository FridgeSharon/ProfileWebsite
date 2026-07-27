import { Component, ChangeDetectionStrategy, inject, OnInit } from '@angular/core';
import { ContentService } from '../../services/content.service';

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
              <a [href]="content.profile()?.linkedinUrl" target="_blank" rel="noopener" class="cv-link">LinkedIn Profile</a>
            }
            @if (content.profile()?.githubUrl) {
              <span> | </span>
              <a [href]="content.profile()?.githubUrl" target="_blank" rel="noopener" class="cv-link">GitHub Profile</a>
            }
          </div>
        </header>

        <section class="cv-section">
          <h2>Skills</h2>
          <div class="skills-list">
            @for (skill of content.skills(); track skill.id) {
              <div class="skill-item">
                <strong>{{ skill.name }}</strong> ({{ skill.category }})
              </div>
            }
          </div>
        </section>

        <section class="cv-section">
          <h2>Experience</h2>
          <div class="experience-list">
            @for (exp of content.experience(); track exp.id) {
              <div class="exp-item">
                <div class="exp-header">
                  <h3>{{ exp.role }}</h3>
                  <span class="dates">{{ exp.startDate }} - {{ exp.endDate || 'Present' }}</span>
                </div>
                <h4>{{ exp.company }}</h4>
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
      margin-bottom: 3rem;
    }
    h2 {
      font-size: 1.5rem;
      color: #0f172a;
      border-bottom: 1px solid #e2e8f0;
      padding-bottom: 0.5rem;
      margin-bottom: 1.5rem;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }
    .skills-list {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 1rem;
    }
    .skill-item {
      font-size: 0.95rem;
    }
    .exp-item {
      margin-bottom: 2rem;
    }
    .exp-header {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      margin-bottom: 0.25rem;
    }
    h3 {
      font-size: 1.2rem;
      margin: 0;
      color: #1e293b;
    }
    .dates {
      font-size: 0.9rem;
      color: #64748b;
    }
    h4 {
      font-size: 1rem;
      margin: 0 0 0.5rem;
      color: #475569;
      font-weight: 500;
    }
    p {
      margin: 0;
      line-height: 1.6;
      color: #334155;
    }
    .project-item {
      margin-bottom: 1.5rem;
    }
    .tech {
      margin-top: 0.5rem;
      font-size: 0.9rem;
      color: #64748b;
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

  ngOnInit() {
    this.content.loadProfile();
    this.content.loadProjects();
    this.content.loadSkills();
    this.content.loadExperience();
  }
}
