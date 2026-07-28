import { Component, ChangeDetectionStrategy, input, computed } from '@angular/core';
import { Project } from '../models/project';

@Component({
  selector: 'app-projects-section',
  standalone: true,
  template: `
    <section id="projects" class="projects-section">
      <div class="container">
        <h2>Featured Projects</h2>
        <div class="projects-grid">
          @for (project of processedProjects(); track project.id) {
            <div class="project-card">
              <div class="project-image">
                @if (project.imageFilename) {
                  <img [src]="'/api/media/images/' + project.imageFilename" [alt]="project.title" loading="lazy">
                } @else {
                  <div class="image-placeholder"></div>
                }
              </div>
              <div class="project-content">
                <h3>{{ project.title }}</h3>
                <p>{{ project.description }}</p>
                <div class="tags">
                  @for (tech of project.techList; track tech) {
                    <span class="tag">{{ tech }}</span>
                  }
                </div>
                @if (project.liveUrl || project.repoUrl) {
                  <div class="links">
                    @if (project.liveUrl) {
                      <a [href]="project.liveUrl" target="_blank" rel="noopener" class="link-btn">Live Demo</a>
                    }
                    @if (project.repoUrl) {
                      <a [href]="project.repoUrl" target="_blank" rel="noopener" class="link-btn outline">GitHub</a>
                    }
                  </div>
                }
              </div>
            </div>
          }
        </div>
      </div>
    </section>
  `,
  styles: [`
    .projects-section {
      padding: 5rem 2rem;
      background: transparent;
      scroll-margin-top: 70px;
    }
    .container {
      max-width: 1200px;
      margin: 0 auto;
    }
    h2 {
      font-size: 2.5rem;
      margin-bottom: 3rem;
      text-align: center;
      background: linear-gradient(90deg, #f8fafc, #94a3b8);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    .projects-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
      gap: 2rem;
    }
    .project-card {
      background: rgba(255, 255, 255, 0.025);
      backdrop-filter: blur(10px);
      border: 1px solid rgba(255, 255, 255, 0.07);
      border-radius: 16px;
      overflow: hidden;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      display: flex;
      flex-direction: column;
    }
    .project-card:hover {
      transform: translateY(-6px);
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5);
      border-color: rgba(59, 130, 246, 0.4);
      background: rgba(255, 255, 255, 0.035);
    }
    .project-image {
      height: 210px;
      width: 100%;
      position: relative;
      overflow: hidden;
      background: #050508;
    }
    .project-image img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.4s ease;
    }
    .project-card:hover .project-image img {
      transform: scale(1.04);
    }
    .image-placeholder {
      width: 100%;
      height: 100%;
      background: linear-gradient(45deg, #1e1b4b, #0f172a);
    }
    .project-content {
      padding: 1.5rem;
      display: flex;
      flex-direction: column;
      flex: 1;
    }
    h3 {
      margin: 0 0 0.75rem;
      font-size: 1.35rem;
      font-weight: 600;
      color: #f8fafc;
    }
    p {
      color: #94a3b8;
      line-height: 1.6;
      font-size: 0.95rem;
      margin-bottom: 1.25rem;
      flex: 1;
    }
    .tags {
      display: flex;
      flex-wrap: wrap;
      gap: 0.4rem;
      margin-bottom: 1.25rem;
    }
    .tag {
      font-size: 0.78rem;
      font-weight: 500;
      background: rgba(168, 85, 247, 0.12);
      color: #c084fc;
      border: 1px solid rgba(168, 85, 247, 0.25);
      padding: 0.2rem 0.65rem;
      border-radius: 9999px;
    }
    .links {
      display: flex;
      gap: 0.75rem;
    }
    .link-btn {
      flex: 1;
      text-align: center;
      padding: 0.6rem;
      border-radius: 8px;
      font-weight: 600;
      font-size: 0.85rem;
      transition: all 0.3s ease;
      background: rgba(255, 255, 255, 0.08);
      color: #fff;
      text-decoration: none;
    }
    .link-btn:hover {
      background: rgba(255, 255, 255, 0.18);
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
  
  processedProjects = computed(() =>
    this.projects().map(p => ({
      ...p,
      techList: p.technologies.split(',').map(t => t.trim()).filter(t => t.length > 0),
    }))
  );
}
