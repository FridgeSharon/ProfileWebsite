import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { SkillGroup, portfolioContent } from '../data/portfolio-content';
@Component({
  selector: 'app-skills-section', standalone: true,
  template: `
    <section id="skills" class="section skills" aria-labelledby="skills-title"><div class="section-shell">
      <div class="section-heading"><div><p class="eyebrow">{{ heading.eyebrow }}</p><h2 id="skills-title">{{ heading.title }}</h2></div><p>{{ heading.description }}</p></div>
      <div class="skills-grid">@for (group of groups(); track group.title; let index = $index) { <article data-cursor-light><span class="number" aria-hidden="true">0{{ index + 1 }}</span><h3>{{ group.title }}</h3><ul>@for (skill of group.skills; track skill) { <li>{{ skill }}</li> }</ul></article> }</div>
    </div></section>
  `,
  styles: [`
    .skills { padding-top: 0; }
    .skills-grid { display: grid; grid-template-columns: repeat(3, 1fr); border-top: 1px solid var(--border); border-left: 1px solid var(--border); border-radius: 6px; overflow: hidden; }
    article { padding: 1.75rem; border-right: 1px solid var(--border); border-bottom: 1px solid var(--border); }
    .number { color: var(--text-soft); font: .6rem/1.4 var(--font-mono); }
    h3 { margin-top: 1.5rem; font-size: 1rem; letter-spacing: -.02em; }
    ul { display: flex; flex-wrap: wrap; gap: .5rem .7rem; padding: 0; margin: 1rem 0 0; list-style: none; }
    li { color: var(--text-muted); font-size: .81rem; } li:not(:last-child)::after { content: ' /'; color: var(--text-soft); margin-left: .35rem; }
    @media (max-width: 900px) { .skills-grid { grid-template-columns: repeat(2, 1fr); } }
    @media (max-width: 520px) { .skills-grid { grid-template-columns: 1fr; } article { padding: 1.5rem; } h3 { margin-top: .75rem; } }
  `], changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SkillsSectionComponent { groups = input.required<readonly SkillGroup[]>(); protected readonly heading = portfolioContent.sections.skills; }
