import { Component, ChangeDetectionStrategy, inject } from "@angular/core";
import { LiveStatsBadgeComponent } from "./live-stats-badge.component";
import { ContentService } from "../services/content.service";
import { StatsService } from "../services/stats.service";

@Component({
  selector: "app-hero",
  standalone: true,
  imports: [LiveStatsBadgeComponent],
  template: `
    <section class="hero">
      <div class="content">
        <app-live-stats-badge class="badge"></app-live-stats-badge>
        <h1>Hi, I'm <span class="gradient-text">{{ content.profile()?.name || 'Developer' }}</span></h1>
        <p class="title">{{ content.profile()?.title }}</p>
        <p class="subtitle">{{ content.profile()?.tagline }}</p>
        @if (content.profile()?.location) {
          <p class="location">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>
            {{ content.profile()?.location }}
          </p>
        }
        <div class="hero-actions">
          <button class="cta-button" (click)="scrollToContact()">Get in Touch</button>
          @if (content.profile()?.linkedinUrl) {
            <a [href]="content.profile()?.linkedinUrl" (click)="stats.trackLinkedInClick()" target="_blank" rel="noopener" class="social-button linkedin-button">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/></svg>
              LinkedIn
            </a>
          }
          @if (content.profile()?.githubUrl) {
            <a [href]="content.profile()?.githubUrl" target="_blank" rel="noopener" class="social-button github-button">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z"/></svg>
              GitHub
            </a>
          }
        </div>
      </div>
    </section>
  `,
  styles: [`
    .hero {
      min-height: 88vh;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      background: transparent;
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
      margin: 0 0 0.5rem;
      letter-spacing: -0.02em;
    }
    .gradient-text {
      background: linear-gradient(90deg, #a855f7, #3b82f6);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    .title {
      font-size: 1.15rem;
      font-weight: 600;
      color: #a855f7;
      margin: 0 0 0.75rem;
      letter-spacing: 0.02em;
      text-transform: uppercase;
    }
    .subtitle {
      font-size: 1.25rem;
      color: #94a3b8;
      margin-bottom: 1rem;
      line-height: 1.6;
    }
    .location {
      display: inline-flex;
      align-items: center;
      gap: 0.35rem;
      font-size: 0.9rem;
      color: #64748b;
      margin: 0 0 2.5rem;
    }
    .location svg {
      flex-shrink: 0;
    }
    .hero-actions {
      display: flex;
      gap: 1rem;
      justify-content: center;
      align-items: center;
      flex-wrap: wrap;
    }
    .cta-button {
      background: linear-gradient(90deg, #a855f7, #3b82f6);
      color: white;
      border: none;
      padding: 1rem 2.5rem;
      font-size: 1.1rem;
      font-weight: 600;
      border-radius: 9999px;
      cursor: pointer;
      transition: all 0.3s ease;
      box-shadow: 0 10px 20px rgba(124, 58, 237, 0.25);
    }
    .cta-button:hover {
      transform: translateY(-2px);
      box-shadow: 0 15px 30px rgba(124, 58, 237, 0.45);
    }
    .social-button {
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
    .github-button:hover {
      background: rgba(255, 255, 255, 0.1);
      border-color: rgba(255, 255, 255, 0.4);
      color: #f1f5f9;
      transform: translateY(-2px);
    }
    @media (max-width: 768px) {
      h1 { font-size: 2.5rem; }
      .subtitle { font-size: 1.1rem; }
      .title { font-size: 1rem; }
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeroComponent {
  content = inject(ContentService);
  stats = inject(StatsService);

  scrollToContact() {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  }
}
