import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { portfolioContent } from '../../data/portfolio-content';
@Component({
  selector: 'app-cv', standalone: true, imports: [RouterLink],
  template: `
    <div class="cv-page">
      <div class="cv-toolbar no-print"><a class="text-link" routerLink="/"><span aria-hidden="true">←</span>{{ content.site.back }}</a><button type="button" class="button primary" data-cursor-light="filled" (click)="printCv()">{{ copy.print }} <span aria-hidden="true">↗</span></button></div>
      <article class="cv-sheet">
        <header class="cv-header"><p class="cv-kicker">{{ copy.eyebrow }}</p><h1>{{ content.profile.name }}</h1><p class="role">{{ content.profile.role }}</p><address><span>{{ content.profile.location }}</span><a [href]="content.profile.linkedinUrl" target="_blank" rel="noopener noreferrer">{{ content.site.linkedin }}</a><a [href]="content.profile.githubUrl" target="_blank" rel="noopener noreferrer">{{ content.site.github }}</a></address></header>
        <section aria-labelledby="summary-heading"><h2 id="summary-heading">{{ copy.summary }}</h2><p class="summary">{{ content.profile.cvSummary }} {{ copy.workflow }}</p></section>
        <section aria-labelledby="skills-heading"><h2 id="skills-heading">{{ copy.skills }}</h2><dl class="skill-list">@for (group of cvSkills; track group.title) { <div><dt>{{ group.title }}</dt><dd>{{ group.skills.join(' · ') }}</dd></div> }</dl></section>
        <section aria-labelledby="employment-heading"><h2 id="employment-heading">{{ copy.experience }}</h2>@for (entry of content.experience; track entry.role + entry.company) { <article class="cv-entry"><header><div><h3>{{ entry.role }}</h3><p>{{ entry.company }}</p></div><span>{{ entry.startDate }} — {{ entry.endDate }}</span></header><ul>@for (bullet of entry.bullets; track bullet) { <li>{{ bullet }}</li> }</ul></article> }</section>
        <section aria-labelledby="education-heading"><h2 id="education-heading">{{ copy.education }}</h2>@for (item of education; track item.institution) { <article class="education-entry"><div><h3>{{ item.program }}</h3><p>{{ item.institution }}@if (item.period) { <span> · {{ item.period }}</span> }</p></div><p class="detail">{{ item.detail }}</p></article> }</section>
        <section class="languages" aria-labelledby="languages-heading"><h2 id="languages-heading">{{ copy.languages }}</h2><p>@for (item of content.languages; track item.language; let last = $last) { <strong>{{ item.language }}:</strong> {{ item.level }}@if (!last) { <span> · </span> } }</p></section>
        <p class="cv-note">{{ copy.note }}</p>
      </article>
    </div>
  `,
  styles: [`
    .cv-page { padding: 2.5rem 1.25rem 5rem; }
    .cv-toolbar { display: flex; align-items: center; justify-content: space-between; gap: 1rem; max-width: 920px; margin: 0 auto 1.5rem; }
    .cv-sheet { max-width: 920px; margin: auto; padding: clamp(1.5rem, 5vw, 4rem); background: var(--sheet-background); border: 1px solid var(--border); box-shadow: var(--sheet-shadow); }
    .cv-header { padding-bottom: 1.5rem; border-bottom: 2px solid var(--accent); }
    .cv-kicker { color: var(--accent); font: .65rem/1.5 var(--font-mono); letter-spacing: .1em; text-transform: uppercase; }
    h1 { margin-top: .5rem; font-size: clamp(2.5rem, 6vw, 4rem); letter-spacing: -.055em; }
    .role { margin-top: .5rem; font-weight: 600; font-size: .95rem; }
    address { display: flex; flex-wrap: wrap; gap: .5rem 1.4rem; margin-top: .9rem; color: var(--text-muted); font-style: normal; font-size: .8rem; }
    address a { color: var(--accent); text-decoration: underline; text-underline-offset: 3px; }
    section { margin-top: 1.8rem; }
    h2 { margin-bottom: .8rem; padding-bottom: .4rem; border-bottom: 1px solid var(--border); color: var(--accent); font: 600 .67rem/1.5 var(--font-mono); letter-spacing: .07em; text-transform: uppercase; }
    .summary { color: var(--text-muted); font-size: .88rem; }
    .skill-list { display: grid; gap: .55rem; font-size: .82rem; }
    .skill-list div { display: grid; grid-template-columns: 155px 1fr; gap: 1rem; } dt { font-weight: 600; } dd { color: var(--text-muted); }
    .cv-entry { margin-top: 1.4rem; break-inside: avoid; }
    .cv-entry header { display: flex; align-items: start; justify-content: space-between; gap: 1rem; }
    h3 { font-size: .92rem; line-height: 1.35; }
    .cv-entry header p, .education-entry p { color: var(--accent); font-size: .83rem; }
    .cv-entry header > span { color: var(--text-soft); font-size: .72rem; white-space: nowrap; }
    .cv-entry ul { display: grid; gap: .4rem; margin: .6rem 0 0; padding-left: 1rem; color: var(--text-muted); font-size: .83rem; }
    li::marker { color: var(--accent); }
    .education-entry { margin-top: .9rem; break-inside: avoid; } .education-entry .detail { margin-top: .3rem; color: var(--text-muted); font-size: .81rem; }
    .languages p { font-size: .85rem; } .cv-note { margin-top: 1.5rem; color: var(--text-soft); font: .62rem/1.5 var(--font-mono); }
    @media screen and (max-width: 620px) { .cv-toolbar { align-items: start; flex-direction: column; } .skill-list div { grid-template-columns: 1fr; gap: .2rem; } .cv-entry header { flex-direction: column; gap: .3rem; } }
    @media print {
      :host { display: block; font-family: Arial, sans-serif; line-height: 1.35; }
      .cv-page { padding: 0; } .cv-sheet { max-width: none; padding: 0; border: 0; box-shadow: none; }
      .no-print { display: none !important; } .cv-header { padding-bottom: 2.5mm; } .cv-kicker { font-size: 6.5pt; }
      h1 { margin-top: 1mm; font-size: 25pt; } .role { margin-top: 1mm; font-size: 10pt; }
      address { margin-top: 2mm; gap: 4mm; font-size: 8pt; }
      section { margin-top: 3.3mm; } h2 { font-size: 7.5pt; margin-bottom: 1.5mm; padding-bottom: 1mm; }
      .summary { font-size: 9pt; line-height: 1.4; } .skill-list { gap: 1mm; font-size: 8.5pt; } .skill-list div { grid-template-columns: 37mm 1fr; gap: 3mm; }
      .cv-entry { margin-top: 2.5mm; } h3 { font-size: 9.2pt; } .cv-entry header p, .education-entry p { font-size: 8.5pt; }
      .cv-entry header > span { font-size: 8pt; } .cv-entry ul { gap: 1mm; margin-top: 1.2mm; padding-left: 3.5mm; font-size: 8.7pt; line-height: 1.35; }
      .education-entry { margin-top: 2mm; } .education-entry .detail { margin-top: .6mm; font-size: 8.5pt; }
      .languages { display: flex; gap: 3mm; align-items: baseline; } .languages h2 { border: 0; margin: 0; padding: 0; } .languages p { font-size: 8.5pt; }
      .cv-note { margin-top: 2mm; font-size: 6.5pt; } a { color: inherit !important; }
    }
  `], changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CvComponent {
  protected readonly content = portfolioContent; protected readonly copy = portfolioContent.cv;
  protected readonly education: readonly import('../../data/portfolio-content').EducationEntry[] = portfolioContent.education;
  protected readonly cvSkills = portfolioContent.skillGroups.slice(0, 4);
  protected printCv(): void { window.print(); }
}
