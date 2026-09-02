import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { SkillGroup } from '../data/portfolio-content';

@Component({
  selector: 'app-skills-section',
  standalone: true,
  template: `
    <section id="skills" class="section" aria-labelledby="skills-title">
      <div class="section-shell">
        <div class="section-heading">
          <p class="eyebrow">Technical range</p>
          <h2 id="skills-title">Tools I use to deliver</h2>
          <p>Technologies I use across backend systems, integrations, data, cloud delivery, and frontend work.</p>
        </div>
        <div class="skills-grid">
          @for (group of groups(); track group.title) {
            <article>
              <h3>{{ group.title }}</h3>
              <ul>
                @for (skill of group.skills; track skill) { <li>{{ skill }}</li> }
              </ul>
            </article>
          }
        </div>
      </div>
    </section>
  `,
  styles: [`
    .skills-grid { display: grid; grid-template-columns: repeat(3, 1fr); border-top: 1px solid var(--border-strong); border-left: 1px solid var(--border-strong); }
    article { padding: 1.5rem; border-right: 1px solid var(--border-strong); border-bottom: 1px solid var(--border-strong); }
    h3 { color: var(--accent-soft); font: 700 .8rem/1.4 var(--font-mono); letter-spacing: .08em; text-transform: uppercase; }
    ul { display: flex; flex-wrap: wrap; gap: .55rem; margin: 1.2rem 0 0; padding: 0; list-style: none; }
    li { color: var(--text-muted); }
    li:not(:last-child)::after { content: ' /'; color: var(--border-strong); }
    @media (max-width: 820px) { .skills-grid { grid-template-columns: repeat(2, 1fr); } }
    @media (max-width: 520px) { .skills-grid { grid-template-columns: 1fr; } }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SkillsSectionComponent {
  groups = input.required<readonly SkillGroup[]>();
}
