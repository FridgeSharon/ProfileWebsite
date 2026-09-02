import { ChangeDetectionStrategy, Component } from '@angular/core';
import { portfolioContent } from '../../data/portfolio-content';

@Component({
  selector: 'app-cv',
  standalone: true,
  template: `
    <div class="cv-page">
      <article class="cv-sheet">
        <header class="cv-header">
          <div>
            <p class="cv-kicker">Curriculum vitae</p>
            <h1>{{ content.profile.name }}</h1>
            <p class="role">{{ content.profile.role }}</p>
          </div>
          <div class="cv-actions no-print">
            <button type="button" class="button primary" (click)="printCv()">Print / Save PDF</button>
          </div>
          <address>
            <span>{{ content.profile.location }}</span>
            <a [href]="content.profile.linkedinUrl" target="_blank" rel="noopener noreferrer">LinkedIn</a>
            <a [href]="content.profile.githubUrl" target="_blank" rel="noopener noreferrer">GitHub</a>
          </address>
        </header>

        <section aria-labelledby="summary-heading">
          <h2 id="summary-heading">Professional summary</h2>
          <p class="summary">{{ content.profile.summary }} I bring a strong systems and infrastructure background, with a track record of improving reliability and delivery across application and platform boundaries.</p>
        </section>

        <section aria-labelledby="skills-heading">
          <h2 id="skills-heading">Technical skills</h2>
          <dl class="skill-list">
            @for (group of content.skillGroups; track group.title) {
              <div><dt>{{ group.title }}</dt><dd>{{ group.skills.join(' · ') }}</dd></div>
            }
          </dl>
        </section>

        <section aria-labelledby="employment-heading">
          <h2 id="employment-heading">Employment history</h2>
          @for (entry of content.experience; track entry.role + entry.company) {
            <article class="cv-entry">
              <header>
                <div><h3>{{ entry.role }}</h3><p>{{ entry.company }}</p></div>
                <span>{{ entry.startDate }} — {{ entry.endDate }}</span>
              </header>
              <ul>@for (bullet of entry.bullets; track bullet) { <li>{{ bullet }}</li> }</ul>
            </article>
          }
        </section>

        <section aria-labelledby="education-heading">
          <h2 id="education-heading">Education & certifications</h2>
          @for (item of content.education; track item.institution) {
            <article class="education-entry">
              <div><h3>{{ item.program }}</h3><p>{{ item.institution }}</p></div>
              @if (item.period) { <span>{{ item.period }}</span> }
              <p class="detail">{{ item.detail }}</p>
            </article>
          }
        </section>

        <section aria-labelledby="languages-heading">
          <h2 id="languages-heading">Languages</h2>
          <p>@for (item of content.languages; track item.language; let last = $last) { <strong>{{ item.language }}:</strong> {{ item.level }}@if (!last) { <span> · </span> } }</p>
        </section>
        <p class="references">References and earlier career details available upon request.</p>
      </article>
    </div>
  `,
  styles: [`
    .cv-page { padding: clamp(2rem, 6vw, 5rem) 1.25rem; background: #dfe5ee; color: #182033; }
    .cv-sheet { max-width: 920px; margin: 0 auto; padding: clamp(2rem, 6vw, 4.5rem); background: #fff; border-radius: .35rem; box-shadow: 0 25px 80px rgba(16,24,40,.15); }
    .cv-header { display: grid; grid-template-columns: 1fr auto; gap: 1.5rem; padding-bottom: 2rem; border-bottom: 3px solid #172033; }
    .cv-kicker { color: #6555da; font: 800 .72rem/1.4 var(--font-mono); letter-spacing: .12em; text-transform: uppercase; }
    h1 { margin-top: .35rem; font-size: clamp(2.5rem, 6vw, 4.2rem); line-height: 1; letter-spacing: -.05em; }
    .role { margin-top: .6rem; color: #4c5870; font-weight: 700; }
    address { grid-column: 1 / -1; display: flex; flex-wrap: wrap; gap: .55rem 1.25rem; color: #4c5870; font-style: normal; font-size: .9rem; }
    address a { color: #5142c8; font-weight: 700; text-decoration: underline; text-underline-offset: 3px; }
    section { margin-top: 2.2rem; }
    h2 { margin-bottom: 1rem; padding-bottom: .45rem; border-bottom: 1px solid #d8deea; color: #5142c8; font: 800 .78rem/1.4 var(--font-mono); letter-spacing: .1em; text-transform: uppercase; }
    .summary { color: #374056; line-height: 1.65; }
    .skill-list { display: grid; gap: .65rem; }
    .skill-list div { display: grid; grid-template-columns: 155px 1fr; gap: 1rem; }
    dt { color: #182033; font-weight: 800; }
    dd { color: #4c5870; }
    .cv-entry { margin-top: 1.5rem; break-inside: avoid; }
    .cv-entry header, .education-entry { display: grid; grid-template-columns: 1fr auto; gap: .5rem 1rem; }
    h3 { font-size: 1rem; }
    .cv-entry header p, .education-entry > div p { color: #5142c8; font-weight: 700; }
    .cv-entry header span, .education-entry > span { color: #5d687d; font-size: .82rem; font-weight: 700; white-space: nowrap; }
    .cv-entry ul { display: grid; gap: .4rem; margin: .8rem 0 0; padding-left: 1.1rem; color: #374056; font-size: .92rem; }
    li::marker { color: #6555da; }
    .education-entry { margin-top: 1rem; break-inside: avoid; }
    .education-entry .detail { grid-column: 1 / -1; color: #4c5870; }
    .references { margin-top: 2rem; color: #687388; font-size: .82rem; font-style: italic; }
    @media (max-width: 620px) { .cv-header, .skill-list div, .cv-entry header, .education-entry { grid-template-columns: 1fr; } .cv-actions { grid-row: 2; } address, .education-entry .detail { grid-column: auto; } }
    @media print {
      :host { display: block; }
      .cv-page { padding: 0; background: #fff; }
      .cv-sheet { max-width: none; padding: 0; box-shadow: none; }
      .no-print { display: none !important; }
      .cv-header { padding-bottom: 1rem; }
      section { margin-top: 1.25rem; }
      .cv-entry { margin-top: 1rem; }
      a { color: inherit !important; text-decoration: none !important; }
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CvComponent {
  protected readonly content = portfolioContent;
  protected printCv(): void { window.print(); }
}
