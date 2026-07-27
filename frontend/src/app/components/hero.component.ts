import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { LiveStatsBadgeComponent } from './live-stats-badge.component';
import { ContentService } from '../services/content.service';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [LiveStatsBadgeComponent],
  template: `
    <section class="hero">
      <div class="particles"></div>
      <div class="content">
        <app-live-stats-badge class="badge"></app-live-stats-badge>
        <h1>Hi, I'm <span class="gradient-text">{{ content.profile()?.name || 'Developer' }}</span></h1>
        <p class="subtitle">{{ content.profile()?.tagline }}</p>
        <div class="hero-actions">
          <button class="cta-button" (click)="scrollToContact()">Get in Touch</button>
          @if (content.profile()?.linkedinUrl) {
            <a [href]="content.profile()?.linkedinUrl" target="_blank" rel="noopener" class="linkedin-button">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/></svg>
              LinkedIn
            </a>
          }
        </div>
      </div>
    </section>
  `,
  styles: [`
    .hero {
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      overflow: hidden;
      background: linear-gradient(135deg, #050508, #120a2e);
    }
    .particles {
      position: absolute;
      inset: 0;
      background-image: radial-gradient(circle at 20% 30%, rgba(124, 58, 237, 0.1) 0%, transparent 20%),
                        radial-gradient(circle at 80% 70%, rgba(59, 130, 246, 0.1) 0%, transparent 20%);
      pointer-events: none;
    }
    .content {
      position: relative;
      z-index: 10;
      text-align: center;
      max-width: 800px;
      padding: 2rem;
    }
    .badge {
      display: block;
      margin-bottom: 2rem;
    }
    h1 {
      font-size: 4rem;
      font-weight: 800;
      margin: 0 0 1rem;
      letter-spacing: -0.02em;
    }
    .gradient-text {
      background: linear-gradient(90deg, #7c3aed, #3b82f6);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    .subtitle {
      font-size: 1.5rem;
      color: #94a3b8;
      margin-bottom: 3rem;
    }
    .hero-actions {
      display: flex;
      gap: 1rem;
      justify-content: center;
      align-items: center;
      flex-wrap: wrap;
    }
    .cta-button {
      background: linear-gradient(90deg, #7c3aed, #3b82f6);
      color: white;
      border: none;
      padding: 1rem 2.5rem;
      font-size: 1.1rem;
      font-weight: 600;
      border-radius: 9999px;
      cursor: pointer;
      transition: all 0.3s ease;
      box-shadow: 0 10px 20px rgba(124, 58, 237, 0.2);
    }
    .cta-button:hover {
      transform: translateY(-2px);
      box-shadow: 0 15px 30px rgba(124, 58, 237, 0.4);
    }
    .linkedin-button {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      background: rgba(255, 255, 255, 0.05);
      color: #e2e8f0;
      border: 1px solid rgba(255, 255, 255, 0.15);
      padding: 1rem 2rem;
      font-size: 1.1rem;
      font-weight: 600;
      border-radius: 9999px;
      text-decoration: none;
      transition: all 0.3s ease;
    }
    .linkedin-button:hover {
      background: rgba(10, 102, 194, 0.2);
      border-color: #0a66c2;
      color: #38bdf8;
      transform: translateY(-2px);
    }
    @media (max-width: 768px) {
      h1 { font-size: 2.5rem; }
      .subtitle { font-size: 1.2rem; }
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeroComponent {
  content = inject(ContentService);

  scrollToContact() {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  }
}
