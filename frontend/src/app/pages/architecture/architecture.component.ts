import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { portfolioContent } from '../../data/portfolio-content';

@Component({
  selector: 'app-architecture',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="technical-page">
      <header class="technical-hero section-shell narrow-shell">
        <p class="eyebrow">About this site</p>
        <h1>Advanced where it matters. Static where it should be.</h1>
        <p>This portfolio is a fully static Angular application delivered through Cloudflare Pages. Its architecture prioritizes fast first paint, accessibility, privacy, and predictable operation.</p>
      </header>

      <section class="section" aria-labelledby="decisions-title">
        <div class="section-shell narrow-shell">
          <div class="section-heading"><p class="eyebrow">Technical decisions</p><h2 id="decisions-title">A focused static architecture</h2></div>
          <div class="decision-grid">
            @for (item of decisions; track item.title; let index = $index) {
              <article><span>0{{ index + 1 }}</span><h3>{{ item.title }}</h3><p>{{ item.description }}</p></article>
            }
          </div>
        </div>
      </section>

      <section class="section flow-section" aria-labelledby="flow-title">
        <div class="section-shell narrow-shell">
          <div class="section-heading"><p class="eyebrow">Delivery path</p><h2 id="flow-title">Repository to browser</h2></div>
          <ol class="flow">
            <li><strong>Typed content</strong><span>One reviewed source for every page</span></li>
            <li><strong>Angular static build</strong><span>Prerendered routes and optimized assets</span></li>
            <li><strong>Cloudflare Pages</strong><span>Git deployment and global CDN delivery</span></li>
            <li><strong>Your browser</strong><span>No API, database, cookie, or visitor identifier</span></li>
          </ol>
        </div>
      </section>

      <footer class="technical-footer section-shell narrow-shell">
        <div><h2>Want to inspect the implementation?</h2><p>The implementation is available in the public repository.</p></div>
        <div class="footer-actions">
          <a class="button secondary" [href]="profile.repositoryUrl" target="_blank" rel="noopener noreferrer">View repository <span aria-hidden="true">↗</span></a>
          <a class="text-link" routerLink="/">Back to portfolio</a>
        </div>
      </footer>
    </div>
  `,
  styles: [`
    .technical-page { padding-bottom: 6rem; }
    .technical-hero { padding-top: clamp(5rem, 11vw, 9rem); padding-bottom: clamp(4rem, 8vw, 7rem); }
    .technical-hero h1 { max-width: 850px; font-size: clamp(2.8rem, 6.5vw, 5.5rem); line-height: .98; letter-spacing: -.055em; text-wrap: balance; }
    .technical-hero > p:last-child { max-width: 720px; margin-top: 1.5rem; color: var(--text-muted); font-size: 1.15rem; }
    .decision-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem; }
    .decision-grid article { min-height: 260px; padding: 1.75rem; background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius-lg); }
    .decision-grid article > span { color: var(--accent); font: 700 .75rem/1 var(--font-mono); }
    h3 { margin-top: 4rem; font-size: 1.25rem; }
    article p { margin-top: .65rem; color: var(--text-muted); }
    .flow-section { background: rgba(255,255,255,.015); border-block: 1px solid var(--border); }
    .flow { display: grid; grid-template-columns: repeat(4, 1fr); margin: 0; padding: 0; list-style: none; counter-reset: step; }
    .flow li { position: relative; min-height: 180px; padding: 1.5rem; border: 1px solid var(--border); border-right: 0; }
    .flow li:last-child { border-right: 1px solid var(--border); }
    .flow strong, .flow span { display: block; }
    .flow strong { margin-top: 3rem; }
    .flow span { margin-top: .5rem; color: var(--text-soft); font-size: .9rem; }
    .technical-footer { display: flex; justify-content: space-between; align-items: end; gap: 2rem; padding-top: 5rem; }
    .technical-footer p { margin-top: .5rem; color: var(--text-muted); }
    .footer-actions { display: flex; flex-direction: column; align-items: flex-start; gap: 1rem; }
    .text-link { color: var(--text-soft); font-weight: 700; }
    @media (max-width: 780px) { .decision-grid, .flow { grid-template-columns: 1fr; } .flow li, .flow li:last-child { min-height: auto; border-right: 1px solid var(--border); border-bottom: 0; } .flow li:last-child { border-bottom: 1px solid var(--border); } .flow strong, h3 { margin-top: 1.5rem; } .technical-footer { align-items: flex-start; flex-direction: column; } }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArchitectureComponent {
  protected readonly profile = portfolioContent.profile;
  protected readonly decisions = [
    { title: 'Static by design', description: 'Portfolio content is compiled with the application and served as static HTML and assets.' },
    { title: 'Prerendered for clarity', description: 'Each route ships meaningful HTML for fast rendering, resilient navigation, search engines, and link previews.' },
    { title: 'Private by default', description: 'The site has no contact form, visitor ID, analytics beacon, application cookie, or personal-data store.' },
    { title: 'Accessible interaction', description: 'Semantic structure, keyboard navigation, visible focus, responsive layouts, and reduced-motion behavior are part of the implementation.' },
  ];
}
