import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { EducationEntry, portfolioContent } from '../data/portfolio-content';
@Component({
  selector: 'app-education-section', standalone: true,
  template: `
    <section id="education" class="section education" aria-labelledby="education-title"><div class="section-shell">
      <div class="section-heading"><div><p class="eyebrow">{{ heading.eyebrow }}</p><h2 id="education-title">{{ heading.title }}</h2></div></div>
      <div class="education-layout"><div class="education-list">@for (item of education(); track item.institution) { <article><div><h3>{{ item.program }}</h3><p class="institution">{{ item.institution }}@if (item.period) { <span> · {{ item.period }}</span> }</p></div><p class="detail">{{ item.detail }}</p></article> }</div>
        <aside [attr.aria-label]="heading.languages"><p class="eyebrow">{{ heading.languages }}</p>@for (item of languages(); track item.language) { <div class="language-row"><strong>{{ item.language }}</strong><span>{{ item.level }}</span></div> }</aside>
      </div>
    </div></section>
  `,
  styles: [`
    .education { padding-top: 0; }
    .education-layout { display: grid; grid-template-columns: 1.6fr .65fr; gap: 4rem; }
    .education-list { display: grid; gap: 1.75rem; }
    article { padding-top: 1.5rem; border-top: 1px solid var(--border); }
    h3 { font-size: 1.05rem; } .institution { margin-top: .5rem; color: var(--accent); font-size: .85rem; } .institution span { color: var(--text-soft); }
    .detail { margin-top: .55rem; color: var(--text-muted); font-size: .83rem; }
    aside { padding: 1.5rem; border: 1px solid var(--border); border-radius: 6px; align-self: start; }
    .language-row { display: flex; align-items: baseline; justify-content: space-between; gap: 1rem; padding: .8rem 0; border-top: 1px solid var(--border); font-size: .85rem; } .language-row span { color: var(--text-muted); }
    @media (max-width: 760px) { .education-layout { grid-template-columns: 1fr; gap: 2rem; } }
  `], changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EducationSectionComponent {
  education = input.required<readonly EducationEntry[]>(); languages = input.required<readonly { language: string; level: string }[]>();
  protected readonly heading = portfolioContent.sections.education;
}
