import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { ExperienceEntry } from '../models/experience';

@Component({
  selector: 'app-experience-section',
  standalone: true,
  template: `
    <section class="experience-section">
      <div class="container">
        <h2>Experience</h2>
        <div class="timeline">
          @for (exp of experience(); track exp.id; let i = $index) {
            <div class="timeline-item" [class.right]="i % 2 !== 0">
              <div class="timeline-content">
                <div class="date">{{ exp.startDate }} - {{ exp.endDate || 'Present' }}</div>
                <h3>{{ exp.role }}</h3>
                <h4>{{ exp.company }}</h4>
                <p>{{ exp.description }}</p>
              </div>
            </div>
          }
        </div>
      </div>
    </section>
  `,
  styles: [`
    .experience-section {
      padding: 6rem 2rem;
      background: #0a0a0f;
    }
    .container {
      max-width: 1000px;
      margin: 0 auto;
    }
    h2 {
      font-size: 2.5rem;
      margin-bottom: 4rem;
      text-align: center;
    }
    .timeline {
      position: relative;
    }
    .timeline::after {
      content: '';
      position: absolute;
      width: 2px;
      background: rgba(255, 255, 255, 0.1);
      top: 0;
      bottom: 0;
      left: 50%;
      margin-left: -1px;
    }
    .timeline-item {
      padding: 10px 40px;
      position: relative;
      background: inherit;
      width: 50%;
      margin-bottom: 2rem;
    }
    .timeline-item::after {
      content: '';
      position: absolute;
      width: 16px;
      height: 16px;
      right: -8px;
      background: #7c3aed;
      border: 4px solid #0a0a0f;
      top: 15px;
      border-radius: 50%;
      z-index: 1;
    }
    .timeline-item.right {
      left: 50%;
    }
    .timeline-item.right::after {
      left: -8px;
    }
    .timeline-content {
      padding: 1.5rem;
      background: rgba(255, 255, 255, 0.03);
      backdrop-filter: blur(10px);
      border: 1px solid rgba(255, 255, 255, 0.05);
      border-radius: 16px;
      transition: all 0.3s ease;
    }
    .timeline-content:hover {
      transform: translateY(-5px);
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
      border-color: rgba(124, 58, 237, 0.3);
    }
    .date {
      color: #a78bfa;
      font-weight: 600;
      font-size: 0.9rem;
      margin-bottom: 0.5rem;
    }
    h3 {
      margin: 0 0 0.25rem;
      font-size: 1.3rem;
    }
    h4 {
      margin: 0 0 1rem;
      color: #94a3b8;
      font-weight: 500;
    }
    p {
      margin: 0;
      color: #cbd5e1;
      line-height: 1.6;
    }
    @media (max-width: 768px) {
      .timeline::after { left: 31px; }
      .timeline-item { width: 100%; padding-left: 70px; padding-right: 25px; }
      .timeline-item::after { left: 23px; }
      .timeline-item.right { left: 0; }
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExperienceSectionComponent {
  experience = input.required<ExperienceEntry[]>();
}
