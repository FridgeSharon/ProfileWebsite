import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { Skill } from '../models/skill';

@Component({
  selector: 'app-skills-section',
  standalone: true,
  template: `
    <section id="skills" class="skills-section">
      <div class="container">
        <h2>My Skills</h2>
        <div class="skills-grid">
          @for (skill of skills(); track skill.id) {
            <div class="skill-card">
              <div class="skill-header">
                <span class="skill-name">{{ skill.name }}</span>
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
    .skills-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      gap: 1.5rem;
    }
    .skill-card {
      background: rgba(255, 255, 255, 0.025);
      backdrop-filter: blur(10px);
      border: 1px solid rgba(255, 255, 255, 0.07);
      border-radius: 14px;
      padding: 1.25rem 1.5rem;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }
    .skill-card:hover {
      transform: translateY(-4px);
      box-shadow: 0 12px 30px rgba(124, 58, 237, 0.18);
      border-color: rgba(168, 85, 247, 0.4);
      background: rgba(255, 255, 255, 0.04);
    }
    .skill-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 0.85rem;
    }
    .skill-name {
      font-weight: 600;
      font-size: 1.05rem;
      color: #f1f5f9;
    }
    .progress-bar-bg {
      height: 6px;
      background: rgba(255, 255, 255, 0.08);
      border-radius: 3px;
      overflow: hidden;
    }
    .progress-bar-fill {
      height: 100%;
      background: linear-gradient(90deg, #a855f7, #3b82f6);
      border-radius: 3px;
      transition: width 1s ease-out;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SkillsSectionComponent {
  skills = input.required<Skill[]>();
}
