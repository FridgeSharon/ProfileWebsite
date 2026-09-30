import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Strength, portfolioContent } from '../data/portfolio-content';
@Component({
  selector: 'app-strengths-section', standalone: true,
  template: `
    <section id="about" class="section" aria-labelledby="about-title">
      <div class="section-shell">
        <div class="about-grid"><div><p class="eyebrow">{{ heading.eyebrow }}</p><h2 id="about-title">{{ heading.title }}</h2><div class="signature" aria-hidden="true">{{ name }}<span>↗</span></div></div><div class="about-copy">@for (paragraph of about(); track paragraph) { <p>{{ paragraph }}</p> }</div></div>
        <div class="strengths">@for (strength of strengths(); track strength.title; let index = $index) { <article><span class="number" aria-hidden="true">0{{ index + 1 }}</span><h3>{{ strength.title }}</h3><p>{{ strength.description }}</p></article> }</div>
      </div>
    </section>
  `,
  styles: [`
    .about-grid { display: grid; grid-template-columns: .85fr 1fr; gap: clamp(2rem, 8vw, 8rem); }
    h2 { max-width: 430px; font-size: clamp(2.2rem, 4vw, 3.5rem); letter-spacing: -.055em; }
    .about-copy { color: var(--text-muted); font-size: 1rem; } .about-copy p + p { margin-top: 1.2rem; }
    .signature { display: flex; align-items: center; gap: 1.4rem; margin-top: 2rem; font-family: Georgia, serif; font-style: italic; font-size: 1.4rem; } .signature span { color: var(--accent); }
    .strengths { display: grid; grid-template-columns: repeat(3, 1fr); gap: 2rem; margin-top: 3.5rem; }
    article { border-top: 1px solid var(--border-strong); padding-top: 1.25rem; }
    .number { color: var(--text-soft); font: .65rem/1.5 var(--font-mono); }
    h3 { margin-top: 1.25rem; font-size: 1.1rem; letter-spacing: -.025em; }
    article p { margin-top: .6rem; color: var(--text-muted); font-size: .85rem; }
    @media (max-width: 760px) { .about-grid { grid-template-columns: 1fr; gap: 2rem; } .strengths { grid-template-columns: 1fr; gap: 1.5rem; } h3 { margin-top: .5rem; } }
  `], changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StrengthsSectionComponent {
  about = input.required<readonly string[]>(); strengths = input.required<readonly Strength[]>();
  protected readonly heading = portfolioContent.sections.about;
  protected readonly name = portfolioContent.profile.name;
}
