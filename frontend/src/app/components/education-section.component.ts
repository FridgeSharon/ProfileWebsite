import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { EducationEntry } from '../data/portfolio-content';

@Component({
  selector: 'app-education-section',
  standalone: true,
  template: `
    <section id="education" class="section" aria-labelledby="education-title">
      <div class="section-shell">
        <div class="section-heading">
          <p class="eyebrow">Foundation</p>
          <h2 id="education-title">Education & languages</h2>
        </div>
        <div class="education-layout">
          <div class="education-list">
            @for (item of education(); track item.institution) {
              <article>
                <div>
                  <p class="program">{{ item.program }}</p>
                  <h3>{{ item.institution }}</h3>
                </div>
                @if (item.period) { <span class="period">{{ item.period }}</span> }
                <p class="detail">{{ item.detail }}</p>
              </article>
            }
          </div>
          <aside class="language-card" aria-label="Languages">
            <p class="eyebrow">Languages</p>
            @for (item of languages(); track item.language) {
              <div class="language-row">
                <strong>{{ item.language }}</strong>
                <span>{{ item.level }}</span>
              </div>
            }
          </aside>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .education-layout { display: grid; grid-template-columns: minmax(0, 1.5fr) minmax(240px, .5fr); gap: 1rem; }
    .education-list { display: grid; gap: 1rem; }
    article, .language-card { padding: 1.5rem; background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius-lg); }
    article { display: grid; grid-template-columns: 1fr auto; gap: .75rem 1rem; }
    .program { color: var(--accent-soft); font-weight: 700; }
    h3 { margin-top: .2rem; font-size: 1.05rem; }
    .period { color: var(--text-soft); font: 600 .78rem/1.4 var(--font-mono); }
    .detail { grid-column: 1 / -1; color: var(--text-muted); }
    .language-row { display: flex; justify-content: space-between; gap: 1rem; padding: 1rem 0; border-bottom: 1px solid var(--border); }
    .language-row:last-child { border: 0; }
    .language-row span { color: var(--text-muted); }
    @media (max-width: 720px) { .education-layout { grid-template-columns: 1fr; } article { grid-template-columns: 1fr; } .detail { grid-column: auto; } }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EducationSectionComponent {
  education = input.required<readonly EducationEntry[]>();
  languages = input.required<readonly { language: string; level: string }[]>();
}
