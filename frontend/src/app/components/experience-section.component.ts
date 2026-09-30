import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { ExperienceEntry, portfolioContent } from '../data/portfolio-content';
@Component({
  selector: 'app-experience-section', standalone: true,
  template: `
    <section id="experience" class="section experience" aria-labelledby="experience-title">
      <div class="section-shell">
        <div class="section-heading"><div><p class="eyebrow">{{ heading.eyebrow }}</p><h2 id="experience-title">{{ heading.title }}</h2></div><p>{{ heading.description }}</p></div>
        <div class="timeline">
          @for (entry of experience(); track entry.role + entry.company) {
            <article class="entry">
              <div class="entry-meta"><p class="dates">{{ entry.startDate }} — {{ entry.endDate }}</p><a [href]="entry.companyUrl" target="_blank" rel="noopener noreferrer"><img [src]="entry.companyLogo" alt="" width="32" height="32" loading="lazy">{{ entry.company }} <span aria-hidden="true">↗</span></a></div>
              <div class="entry-body"><h3>{{ entry.role }}</h3><p class="focus">{{ entry.focus }}</p><ul>@for (bullet of entry.bullets; track bullet) { <li>{{ bullet }}</li> }</ul></div>
            </article>
          }
        </div>
      </div>
    </section>
  `,
  styles: [`
    .experience { background: var(--surface); border-block: 1px solid var(--border); }
    .entry { display: grid; grid-template-columns: .65fr 1.5fr; gap: 3rem; padding: 2.5rem 0; border-top: 1px solid var(--border-strong); }
    .entry:last-child { padding-bottom: 0; }
    .dates { color: var(--text-soft); font: .68rem/1.6 var(--font-mono); }
    .entry-meta a { display: inline-flex; align-items: center; gap: .7rem; margin-top: 1.2rem; font-size: 1rem; font-weight: 600; }
    .entry-meta a:hover { text-decoration: underline; text-underline-offset: 5px; }
    img { object-fit: cover; border-radius: 5px; border: 1px solid var(--border); }
    .entry-meta a span { color: var(--text-soft); font-size: .8rem; }
    h3 { font-size: 1.4rem; letter-spacing: -.025em; }
    .focus { margin-top: .55rem; color: var(--accent); font: .65rem/1.6 var(--font-mono); }
    ul { display: grid; gap: .7rem; margin: 1.2rem 0 0; padding-left: 1rem; color: var(--text-muted); font-size: .9rem; }
    li::marker { color: var(--accent); }
    @media (max-width: 760px) { .entry { grid-template-columns: 1fr; gap: 1.4rem; padding: 2rem 0; } .entry-meta { display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 1rem; } .entry-meta a { margin-top: 0; } .dates { font-size: .62rem; } h3 { font-size: 1.25rem; } }
  `], changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExperienceSectionComponent {
  experience = input.required<readonly ExperienceEntry[]>();
  protected readonly heading = portfolioContent.sections.experience;
}
