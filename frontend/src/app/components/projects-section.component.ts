import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { CaseStudy, portfolioContent } from '../data/portfolio-content';

@Component({
  selector: 'app-projects-section', standalone: true,
  template: `
    <section id="work" class="section" aria-labelledby="work-title">
      <div class="section-shell">
        <div class="section-heading"><div><p class="eyebrow">{{ heading.eyebrow }}</p><h2 id="work-title">{{ heading.title }}</h2></div><p>{{ heading.description }}</p></div>
        <div class="projects">
          @for (study of caseStudies(); track study.id) {
            <article class="project" data-cursor-light [attr.data-project]="study.id">
              <div class="project-copy">
                <p class="project-status"><span aria-hidden="true"></span>{{ study.label }}</p>
                <h3>{{ study.title }}</h3><p class="description">{{ study.description }}</p>
                <ul class="tags" [attr.aria-label]="technologiesLabel">@for (technology of study.technologies; track technology) { <li>{{ technology }}</li> }</ul>
                <details><summary>{{ ui.details }}<span aria-hidden="true">+</span></summary><ul class="highlights">@for (highlight of study.highlights; track highlight) { <li>{{ highlight }}</li> }</ul></details>
                <p class="project-note">{{ study.note }}</p>
                @if (study.url) { <a class="text-link" [href]="study.url" target="_blank" rel="noopener noreferrer">{{ study.linkLabel }} <span aria-hidden="true">↗</span></a> }
              </div>
            </article>
          }
        </div>
      </div>
    </section>
  `,
  styles: [`
    .projects { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 1.5rem; }
    .project { border: 1px solid var(--border); border-radius: 9px; background: var(--card-background); }
    .project-copy { padding: 2rem; }
    .project-status { display: flex; gap: .5rem; align-items: center; color: var(--text-soft); font: .61rem/1.6 var(--font-mono); text-transform: uppercase; letter-spacing: .04em; }
    .project-status > span { width: 5px; height: 5px; border-radius: 50%; background: currentColor; }
    h3 { margin-top: .8rem; font-size: 1.8rem; letter-spacing: -.045em; }
    .description { margin-top: 1rem; color: var(--text-muted); font-size: .92rem; }
    details { margin-top: 1.5rem; border-block: 1px solid var(--border); }
    summary { display: flex; align-items: center; justify-content: space-between; gap: 1rem; min-height: 48px; cursor: pointer; list-style: none; font-size: .8rem; font-weight: 600; }
    summary::-webkit-details-marker { display: none; } summary span { font-size: 1.3rem; transition: transform .2s; } details[open] summary span { transform: rotate(45deg); }
    .highlights { margin: 0 0 1.2rem; padding-left: 1rem; color: var(--text-muted); font-size: .83rem; } .highlights li + li { margin-top: .6rem; }
    .project-note { margin-top: 1rem; color: var(--text-soft); font-size: .73rem; line-height: 1.65; }
    .text-link { margin-top: 1rem; }
    @media (max-width: 1000px) { .projects { grid-template-columns: 1fr; } }
    @media (max-width: 800px) { .project-copy { padding: 1.5rem; } }
  `], changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectsSectionComponent {
  caseStudies = input.required<readonly CaseStudy[]>();
  protected readonly heading = portfolioContent.sections.work;
  protected readonly ui = portfolioContent.projectUi;
  protected readonly technologiesLabel = portfolioContent.site.technologiesLabel;
}
