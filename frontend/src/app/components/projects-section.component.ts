import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { CaseStudy } from '../data/portfolio-content';

@Component({
  selector: 'app-projects-section',
  standalone: true,
  template: `
    <section id="work" class="section" aria-labelledby="work-title">
      <div class="section-shell">
        <div class="section-heading">
          <p class="eyebrow">Selected work</p>
          <h2 id="work-title">Architecture with a reason</h2>
          <p>Projects where technical choices follow the product, privacy, and operational constraints.</p>
        </div>
        <div class="case-grid">
          @for (study of caseStudies(); track study.title; let index = $index) {
            <article class="case-card">
              <header><span>{{ study.label }}</span><span aria-hidden="true">0{{ index + 1 }}</span></header>
              <h3>{{ study.title }}</h3>
              <p>{{ study.description }}</p>
              <ul class="highlights">
                @for (highlight of study.highlights; track highlight) { <li>{{ highlight }}</li> }
              </ul>
              <ul class="tag-list" aria-label="Technologies">
                @for (technology of study.technologies; track technology) { <li>{{ technology }}</li> }
              </ul>
              @if (study.url) {
                <a class="case-link" [href]="study.url" target="_blank" rel="noopener noreferrer">{{ study.linkLabel }} <span aria-hidden="true">↗</span></a>
              }
            </article>
          }
        </div>
      </div>
    </section>
  `,
  styles: [`
    .case-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem; }
    .case-card { display: flex; flex-direction: column; min-height: 440px; padding: clamp(1.5rem, 3vw, 2.25rem); background: linear-gradient(155deg, var(--surface-strong), var(--surface)); border: 1px solid var(--border); border-radius: var(--radius-xl); }
    header { display: flex; justify-content: space-between; color: var(--accent-soft); font: 700 .72rem/1.4 var(--font-mono); letter-spacing: .08em; text-transform: uppercase; }
    h3 { margin-top: 3.5rem; font-size: clamp(1.6rem, 3vw, 2.15rem); }
    .case-card > p { margin-top: .8rem; color: var(--text-muted); }
    .highlights { display: grid; gap: .65rem; margin: 1.5rem 0; padding-left: 1.1rem; color: var(--text-muted); }
    .highlights li::marker { color: var(--accent); }
    .tag-list { display: flex; flex-wrap: wrap; gap: .4rem; margin: auto 0 0; padding: 0; list-style: none; }
    .tag-list li { padding: .3rem .55rem; color: var(--text-soft); background: rgba(255,255,255,.045); border-radius: .4rem; font: 600 .7rem/1.2 var(--font-mono); }
    .case-link { margin-top: 1.4rem; color: var(--accent-soft); font-weight: 800; }
    @media (max-width: 760px) { .case-grid { grid-template-columns: 1fr; } .case-card { min-height: auto; } h3 { margin-top: 2rem; } .tag-list { margin-top: 1.5rem; } }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectsSectionComponent {
  caseStudies = input.required<readonly CaseStudy[]>();
}
