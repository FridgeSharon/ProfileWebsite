import { ChangeDetectionStrategy, Component } from '@angular/core';
import { portfolioContent } from '../data/portfolio-content';

@Component({
  selector: 'app-hero',
  standalone: true,
  template: `
    <section class="hero" aria-labelledby="hero-title">
      <div class="hero-grid section-shell">
        <div class="hero-copy">
          <p class="eyebrow"><span class="status-dot" aria-hidden="true"></span>{{ profile.availability }}</p>
          <p class="role">{{ profile.role }}</p>
          <h1 id="hero-title">{{ profile.headline }}</h1>
          <p class="summary">{{ profile.summary }}</p>
          <div class="actions">
            <a class="button primary" [href]="profile.linkedinUrl" target="_blank" rel="noopener noreferrer">
              Connect on LinkedIn
              <span aria-hidden="true">↗</span>
            </a>
            <a class="button secondary" href="#experience">View experience</a>
          </div>
        </div>
        <aside class="system-card" aria-label="Professional profile summary">
          <div class="system-topline">
            <span>PROFILE / {{ profile.name.toUpperCase() }}</span>
            <span class="online">AVAILABLE</span>
          </div>
          <dl>
            <div><dt>Focus</dt><dd>Backend systems & integrations</dd></div>
            <div><dt>Core</dt><dd>TypeScript · Node.js · APIs</dd></div>
            <div><dt>Cloud</dt><dd>AWS · Docker · CI/CD</dd></div>
            <div><dt>Location</dt><dd>{{ profile.location }}</dd></div>
          </dl>
          <div class="system-footer" aria-hidden="true">
            <span>01</span><span>RELIABILITY</span><span>02</span><span>DELIVERY</span>
          </div>
        </aside>
      </div>
    </section>
  `,
  styles: [`
    .hero { display: grid; min-height: min(820px, calc(100svh - 72px)); align-items: center; padding: clamp(5rem, 11vw, 9rem) 1.25rem 5rem; }
    .hero-grid { display: grid; grid-template-columns: minmax(0, 1.25fr) minmax(320px, .75fr); gap: clamp(2rem, 6vw, 6rem); align-items: center; }
    .hero-copy { max-width: 760px; }
    .eyebrow { display: flex; align-items: center; gap: .65rem; margin-bottom: 1.7rem; }
    .status-dot { width: .55rem; height: .55rem; border-radius: 50%; background: var(--success); box-shadow: 0 0 0 .35rem rgba(72, 216, 158, .12); }
    .role { margin-bottom: .8rem; color: var(--accent-soft); font: 700 .88rem/1.4 var(--font-mono); letter-spacing: .1em; text-transform: uppercase; }
    h1 { max-width: 850px; font-size: clamp(2.7rem, 5.5vw, 5rem); line-height: .98; letter-spacing: -.055em; text-wrap: balance; }
    .summary { max-width: 700px; margin-top: 1.7rem; color: var(--text-muted); font-size: clamp(1.05rem, 1.8vw, 1.25rem); line-height: 1.7; }
    .actions { display: flex; flex-wrap: wrap; gap: .75rem; margin-top: 2rem; }
    .system-card { position: relative; padding: 1.25rem; background: linear-gradient(150deg, rgba(18, 22, 37, .95), rgba(10, 13, 23, .88)); border: 1px solid var(--border-strong); border-radius: var(--radius-xl); box-shadow: 0 30px 90px rgba(0,0,0,.4); overflow: hidden; }
    .system-card::before { content: ''; position: absolute; inset: 0; background: linear-gradient(rgba(255,255,255,.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.02) 1px, transparent 1px); background-size: 24px 24px; mask-image: linear-gradient(to bottom, black, transparent); pointer-events: none; }
    .system-topline, .system-footer { position: relative; display: flex; justify-content: space-between; gap: 1rem; color: var(--text-soft); font: 700 .65rem/1.3 var(--font-mono); letter-spacing: .09em; }
    .online { color: var(--success); }
    dl { position: relative; display: grid; margin: 3.5rem 0; }
    dl div { display: grid; grid-template-columns: 80px 1fr; gap: 1rem; padding: .95rem 0; border-bottom: 1px solid var(--border); }
    dt { color: var(--text-soft); font: 600 .72rem/1.5 var(--font-mono); text-transform: uppercase; }
    dd { color: var(--text); font-weight: 600; }
    .system-footer { justify-content: flex-start; flex-wrap: wrap; color: var(--accent-soft); }
    .system-footer span:nth-child(odd) { color: var(--text-soft); }
    @media (max-width: 900px) { .hero { min-height: auto; } .hero-grid { grid-template-columns: 1fr; } .system-card { max-width: 560px; } }
    @media (max-width: 520px) { .actions, .button { width: 100%; } .system-card { display: none; } }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeroComponent {
  protected readonly profile = portfolioContent.profile;
}
