import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { ExperienceEntry } from '../data/portfolio-content';

@Component({
  selector: 'app-experience-section',
  standalone: true,
  template: `
    <section id="experience" class="section" aria-labelledby="experience-title">
      <div class="section-shell narrow-shell">
        <div class="section-heading">
          <p class="eyebrow">Experience</p>
          <h2 id="experience-title">Production work, end to end</h2>
          <p>Backend-heavy roles grounded in integration delivery, performance work, and cross-team problem solving.</p>
        </div>
        <div class="timeline">
          @for (entry of experience(); track entry.company + entry.role) {
            <article class="experience-card">
              <div class="timeline-marker" aria-hidden="true"></div>
              <header>
                <div class="company">
                  <img [src]="entry.companyLogo" [alt]="entry.company + ' logo'" width="48" height="48" loading="lazy">
                  <div><h3>{{ entry.role }}</h3><a [href]="entry.companyUrl" target="_blank" rel="noopener noreferrer">{{ entry.company }} <span aria-hidden="true">↗</span></a></div>
                </div>
                <p class="dates">{{ entry.startDate }} — {{ entry.endDate }}</p>
              </header>
              <ul>
                @for (bullet of entry.bullets; track bullet) { <li>{{ bullet }}</li> }
              </ul>
            </article>
          }
        </div>
      </div>
    </section>
  `,
  styles: [`
    .timeline { position: relative; display: grid; gap: 1rem; margin-left: 1rem; padding-left: 2rem; border-left: 1px solid var(--border-strong); }
    .experience-card { position: relative; padding: 1.6rem; background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius-lg); }
    .timeline-marker { position: absolute; top: 2rem; left: calc(-2rem - 5px); width: 9px; height: 9px; border: 2px solid var(--background); border-radius: 50%; background: var(--accent); box-shadow: 0 0 0 3px rgba(114,92,255,.18); }
    header { display: flex; justify-content: space-between; align-items: flex-start; gap: 1.25rem; }
    .company { display: flex; align-items: center; gap: 1rem; }
    img { border: 1px solid var(--border); border-radius: .75rem; object-fit: cover; }
    h3 { font-size: 1.1rem; }
    .company a { display: inline-block; margin-top: .25rem; color: var(--accent-soft); font-weight: 700; }
    .dates { color: var(--text-soft); font: 600 .74rem/1.5 var(--font-mono); white-space: nowrap; }
    ul { display: grid; gap: .7rem; margin: 1.4rem 0 0 4rem; padding-left: 1rem; color: var(--text-muted); }
    li::marker { color: var(--accent); }
    @media (max-width: 700px) { .timeline { margin-left: .25rem; padding-left: 1rem; } .timeline-marker { left: calc(-1rem - 5px); } header { flex-direction: column; } ul { margin-left: 0; } }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExperienceSectionComponent {
  experience = input.required<readonly ExperienceEntry[]>();
}
