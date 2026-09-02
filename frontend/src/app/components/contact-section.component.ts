import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { portfolioContent } from '../data/portfolio-content';

@Component({
  selector: 'app-contact-section',
  standalone: true,
  imports: [RouterLink],
  template: `
    <section id="contact" class="section contact-section" aria-labelledby="contact-title">
      <div class="section-shell contact-card">
        <div>
          <p class="eyebrow">Let’s talk</p>
          <h2 id="contact-title">Need someone who can connect the whole system?</h2>
          <p>For backend, fullstack, and integration opportunities, LinkedIn is the best way to reach me.</p>
        </div>
        <div class="contact-actions">
          <a class="button primary" [href]="profile.linkedinUrl" target="_blank" rel="noopener noreferrer">Connect on LinkedIn <span aria-hidden="true">↗</span></a>
          <a class="technical-link" routerLink="/architecture">How this site is built</a>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .contact-section { padding-bottom: clamp(6rem, 12vw, 10rem); }
    .contact-card { display: grid; grid-template-columns: minmax(0, 1.3fr) minmax(260px, .7fr); gap: 2rem; align-items: end; padding: clamp(2rem, 5vw, 4rem); background: linear-gradient(125deg, rgba(114,92,255,.17), rgba(13,17,29,.92) 45%, rgba(70,181,255,.09)); border: 1px solid var(--border-strong); border-radius: var(--radius-xl); }
    h2 { max-width: 700px; font-size: clamp(2rem, 4.5vw, 3.7rem); line-height: 1.05; letter-spacing: -.04em; }
    p:not(.eyebrow) { max-width: 620px; margin-top: 1rem; color: var(--text-muted); }
    .contact-actions { display: flex; flex-direction: column; align-items: flex-start; gap: 1rem; }
    .technical-link { color: var(--text-soft); font-weight: 700; }
    .technical-link:hover { color: var(--text); }
    @media (max-width: 760px) { .contact-card { grid-template-columns: 1fr; align-items: start; } }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactSectionComponent {
  protected readonly profile = portfolioContent.profile;
}
