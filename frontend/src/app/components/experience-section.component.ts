import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { ExperienceEntry } from '../models/experience';

@Component({
  selector: 'app-experience-section',
  standalone: true,
  imports: [NgTemplateOutlet],
  template: `
    <section id="experience" class="experience-section">
      <div class="container">
        <h2>Experience</h2>
        <div class="experience-list">
          @for (exp of experience(); track exp.id) {
            <ng-template #cardContent>
              <div class="exp-header">
                <div class="company-brand">
                  @if (exp.companyLogoUrl) {
                    <img [src]="exp.companyLogoUrl" [alt]="exp.company" class="company-logo">
                  } @else {
                    <div class="company-logo-placeholder">{{ exp.company.substring(0, 2) }}</div>
                  }
                  <div>
                    <h3 class="role">{{ exp.role }}</h3>
                    <h4 class="company-name">
                      {{ exp.company }}
                      @if (exp.companyUrl) {
                        <svg class="external-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                          <polyline points="15 3 21 3 21 9"></polyline>
                          <line x1="10" y1="14" x2="21" y2="3"></line>
                        </svg>
                      }
                    </h4>
                  </div>
                </div>
                <div class="date-badge">{{ exp.startDate }} - {{ exp.endDate || 'Present' }}</div>
              </div>
              <p class="description">{{ exp.description }}</p>
            </ng-template>
            @if (exp.companyUrl) {
              <a [href]="exp.companyUrl" target="_blank" rel="noopener" class="exp-card clickable">
                <ng-container *ngTemplateOutlet="cardContent"></ng-container>
              </a>
            } @else {
              <div class="exp-card">
                <ng-container *ngTemplateOutlet="cardContent"></ng-container>
              </div>
            }
          }
        </div>
      </div>
    </section>
  `,
  styles: [`
    .experience-section {
      padding: 4.5rem 2rem;
      background: transparent;
      scroll-margin-top: 70px;
    }
    .container {
      max-width: 900px;
      margin: 0 auto;
    }
    h2 {
      font-size: 2.25rem;
      margin-bottom: 2.25rem;
      text-align: center;
      background: linear-gradient(90deg, #f8fafc, #94a3b8);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    .experience-list {
      display: flex;
      flex-direction: column;
      gap: 1.25rem;
    }
    .exp-card {
      display: block;
      background: rgba(255, 255, 255, 0.025);
      backdrop-filter: blur(10px);
      border: 1px solid rgba(255, 255, 255, 0.06);
      border-radius: 14px;
      padding: 1.35rem 1.6rem;
      text-decoration: none;
      color: inherit;
      transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
    }
    .exp-card.clickable:hover {
      transform: translateY(-3px);
      background: rgba(255, 255, 255, 0.04);
      border-color: rgba(168, 85, 247, 0.35);
      box-shadow: 0 10px 25px rgba(124, 58, 237, 0.12);
    }
    .exp-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 0.85rem;
      flex-wrap: wrap;
      gap: 0.75rem;
    }
    .company-brand {
      display: flex;
      align-items: center;
      gap: 1rem;
    }
    .company-logo {
      width: 44px;
      height: 44px;
      border-radius: 10px;
      object-fit: cover;
      border: 1px solid rgba(255, 255, 255, 0.1);
      background: #000;
    }
    .company-logo-placeholder {
      width: 44px;
      height: 44px;
      border-radius: 10px;
      background: linear-gradient(135deg, #7c3aed, #3b82f6);
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 700;
      font-size: 1.1rem;
      color: #fff;
    }
    .role {
      margin: 0 0 0.2rem;
      font-size: 1.2rem;
      font-weight: 600;
      color: #f8fafc;
    }
    .company-name {
      margin: 0;
      font-size: 0.95rem;
      font-weight: 500;
      color: #a855f7;
      display: flex;
      align-items: center;
      gap: 0.4rem;
    }
    .external-icon {
      width: 14px;
      height: 14px;
      opacity: 0.7;
      transition: opacity 0.2s ease;
    }
    .exp-card:hover .external-icon {
      opacity: 1;
    }
    .date-badge {
      font-size: 0.82rem;
      font-weight: 600;
      color: #94a3b8;
      background: rgba(255, 255, 255, 0.06);
      padding: 0.25rem 0.75rem;
      border-radius: 20px;
      border: 1px solid rgba(255, 255, 255, 0.05);
    }
    .description {
      margin: 0;
      color: #cbd5e1;
      line-height: 1.55;
      font-size: 0.92rem;
    }
    @media (max-width: 640px) {
      .exp-header {
        flex-direction: column;
        align-items: flex-start;
      }
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExperienceSectionComponent {
  experience = input.required<ExperienceEntry[]>();
}
