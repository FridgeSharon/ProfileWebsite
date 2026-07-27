import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { Skill } from '../models/skill';

@Component({
  selector: 'app-skills-section',
  standalone: true,
  template: `
    <section class="skills-section">
      <div class="container">
        <h2>My Skills</h2>
        <div class="skills-grid">
          @for (skill of skills(); track skill.id) {
            <div class="skill-card">
              <div class="skill-header">
                <span class="skill-name">{{ skill.name }}</span>
                <span class="skill-category">{{ skill.category }}</span>
              </div>
              <div class="progress-bar-bg">
                <div class="progress-bar-fill" [style.width.%]="skill.proficiency"></div>
              </div>
            </div>
          }
        </div>
      </div>
    </section>
  `,
  styles: [`
    .skills-section {
      padding: 6rem 2rem;
      background: #0a0a0f;
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
    .skills-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 2rem;
    }
    .skill-card {
      background: rgba(255, 255, 255, 0.03);
      backdrop-filter: blur(10px);
      border: 1px solid rgba(255, 255, 255, 0.05);
      border-radius: 16px;
      padding: 1.5rem;
      transition: all 0.3s ease;
    }
    .skill-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 10px 30px rgba(124, 58, 237, 0.1);
      border-color: rgba(124, 58, 237, 0.3);
    }
    .skill-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1rem;
    }
    .skill-name {
      font-weight: 600;
      font-size: 1.1rem;
    }
    .skill-category {
      font-size: 0.8rem;
      padding: 0.25rem 0.75rem;
      background: rgba(124, 58, 237, 0.2);
      color: #a78bfa;
      border-radius: 9999px;
    }
    .progress-bar-bg {
      height: 6px;
      background: rgba(255, 255, 255, 0.1);
      border-radius: 3px;
      overflow: hidden;
    }
    .progress-bar-fill {
      height: 100%;
      background: linear-gradient(90deg, #7c3aed, #3b82f6);
      border-radius: 3px;
      transition: width 1s ease-out;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SkillsSectionComponent {
  skills = input.required<Skill[]>();
}
