import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Strength } from '../data/portfolio-content';

@Component({
  selector: 'app-strengths-section',
  standalone: true,
  template: `
    <section id="about" class="section" aria-labelledby="about-title">
      <div class="section-shell">
        <div class="section-heading split-heading">
          <div>
            <p class="eyebrow">How I work</p>
            <h2 id="about-title">Engineering across boundaries</h2>
          </div>
          <div class="intro-copy">
            @for (paragraph of about(); track paragraph) {
              <p>{{ paragraph }}</p>
            }
          </div>
        </div>
        <div class="strength-grid">
          @for (strength of strengths(); track strength.title; let index = $index) {
            <article class="strength-card">
              <span class="number" aria-hidden="true">0{{ index + 1 }}</span>
              <h3>{{ strength.title }}</h3>
              <p>{{ strength.description }}</p>
              <ul class="tag-list" aria-label="Technologies">
                @for (technology of strength.technologies; track technology) {
                  <li>{{ technology }}</li>
                }
              </ul>
            </article>
          }
        </div>
      </div>
    </section>
  `,
  styles: [`
    .split-heading { display: grid; grid-template-columns: minmax(0, .8fr) minmax(0, 1.2fr); gap: 3rem; align-items: start; }
    .intro-copy { color: var(--text-muted); font-size: 1.05rem; }
    .intro-copy p + p { margin-top: 1rem; }
    .strength-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; }
    .strength-card { position: relative; min-height: 260px; padding: 1.75rem; background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius-lg); overflow: hidden; }
    .strength-card::after { content: ''; position: absolute; inset: auto -25% -55% 25%; height: 180px; background: radial-gradient(circle, rgba(114, 92, 255, .17), transparent 68%); pointer-events: none; }
    .number { display: block; margin-bottom: 3.75rem; color: var(--accent); font: 700 .78rem/1 var(--font-mono); letter-spacing: .12em; }
    h3 { margin-bottom: .65rem; font-size: 1.2rem; }
    .strength-card p { color: var(--text-muted); }
    .tag-list { display: flex; flex-wrap: wrap; gap: .4rem; margin-top: 1.25rem; padding: 0; list-style: none; }
    .tag-list li { padding: .3rem .55rem; color: var(--text-soft); background: rgba(255,255,255,.045); border-radius: .4rem; font: 600 .72rem/1.2 var(--font-mono); }
    @media (max-width: 820px) { .split-heading, .strength-grid { grid-template-columns: 1fr; } .split-heading { gap: 1.25rem; } .strength-card { min-height: auto; } .number { margin-bottom: 2rem; } }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StrengthsSectionComponent {
  about = input.required<readonly string[]>();
  strengths = input.required<readonly Strength[]>();
}
