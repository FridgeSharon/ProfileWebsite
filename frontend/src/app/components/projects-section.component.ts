import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { Project } from '../models/project';

@Component({
  selector: 'app-projects-section',
  standalone: true,
  template: `
    <section class="projects-section">
      <div class="container">
        <h2>Featured Projects</h2>
        <div class="projects-grid">
          @for (project of projects(); track project.id) {
            <div class="project-card">
              <div class="project-image">
                @if (project.imageFilename) {
                  <img [src]="'/api/media/images/' + project.imageFilename" [alt]="project.title">
                } @else {
                  <div class="image-placeholder"></div>
                }
              </div>
              <div class="project-content">
                <h3>{{ project.title }}</h3>
                <p>{{ project.description }}</p>
                <div class="tags">
                  @for (tech of splitTechnologies(project.technologies); track tech) {
                    <span class="tag">{{ tech }}</span>
                  }
                </div>
                <div class="links">
                  @if (project.liveUrl) {
                    <a [href]="project.liveUrl" target="_blank" rel="noopener" class="link-btn">Live Demo</a>
                  }
                  @if (project.repoUrl) {
                    <a [href]="project.repoUrl" target="_blank" rel="noopener" class="link-btn outline">GitHub</a>
                  }
                </div>
              </div>
            </div>
          }
        </div>
      </div>
    </section>
  `,
  styles: [`
    .projects-section {
      padding: 6rem 2rem;
      background: #0d0d14;
    }
    .container {
      max-width: 1200px;
      margin: 0 auto;
    }
    h2 {
      font-size: 2.5rem;
      margin-bottom: 3rem;
      text-align: center;
    }
    .projects-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
      gap: 2.5rem;
    }
    .project-card {
      background: rgba(255, 255, 255, 0.03);
      border: 1px solid rgba(255, 255, 255, 0.05);
      border-radius: 16px;
      overflow: hidden;
      transition: all 0.3s ease;
    }
    .project-card:hover {
      transform: translateY(-8px);
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
      border-color: rgba(59, 130, 246, 0.3);
    }
    .project-image {
      height: 200px;
      width: 100%;
      position: relative;
    }
    .project-image img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    .image-placeholder {
      width: 100%;
      height: 100%;
      background: linear-gradient(45deg, #2a2a35, #1a1a24);
    }
    .project-content {
      padding: 1.5rem;
    }
    h3 {
      margin: 0 0 1rem;
      font-size: 1.5rem;
    }
    p {
      color: #94a3b8;
      line-height: 1.6;
      margin-bottom: 1.5rem;
    }
    .tags {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
      margin-bottom: 1.5rem;
    }
    .tag {
      font-size: 0.8rem;
      background: rgba(255, 255, 255, 0.1);
      padding: 0.25rem 0.75rem;
      border-radius: 9999px;
    }
    .links {
      display: flex;
      gap: 1rem;
    }
    .link-btn {
      flex: 1;
      text-align: center;
      padding: 0.75rem;
      border-radius: 8px;
      font-weight: 600;
      font-size: 0.9rem;
      transition: all 0.3s ease;
      background: rgba(255, 255, 255, 0.1);
    }
    .link-btn:hover {
      background: rgba(255, 255, 255, 0.2);
    }
    .link-btn.outline {
      background: transparent;
      border: 1px solid rgba(255, 255, 255, 0.2);
    }
    .link-btn.outline:hover {
      background: rgba(255, 255, 255, 0.1);
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectsSectionComponent {
  projects = input.required<Project[]>();

  splitTechnologies(technologies: string): string[] {
    return technologies.split(',').map(t => t.trim()).filter(t => t.length > 0);
  }
}
