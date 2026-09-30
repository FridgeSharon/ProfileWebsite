import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { portfolioContent } from '../../data/portfolio-content';
@Component({
  selector: 'app-architecture', standalone: true, imports: [RouterLink],
  template: `
    <div class="technical-page section"><div class="section-shell">
      <a class="text-link back" routerLink="/"><span aria-hidden="true">←</span>{{ site.back }}</a>
      <header class="technical-hero"><p class="eyebrow">{{ copy.eyebrow }}</p><h1>{{ copy.title }}</h1><p class="intro">{{ copy.description }}</p></header>
      <section class="decisions" aria-labelledby="decisions-title"><h2 id="decisions-title">{{ copy.decisionsTitle }}</h2><div class="decision-grid">@for (item of copy.decisions; track item.title; let index = $index) { <article><span class="number" aria-hidden="true">0{{ index + 1 }}</span><h3>{{ item.title }}</h3><p>{{ item.description }}</p></article> }</div></section>
      <section class="flow-section" aria-labelledby="flow-title"><h2 id="flow-title">{{ copy.flowTitle }}</h2><ol class="flow">@for (step of copy.flow; track step.title; let index = $index) { <li data-cursor-light><span class="number" aria-hidden="true">0{{ index + 1 }} ↗</span><strong>{{ step.title }}</strong><span>{{ step.detail }}</span></li> }</ol></section>
      <footer class="technical-footer"><div><h2>{{ copy.footerTitle }}</h2><p>{{ copy.footerDescription }}</p></div><a class="button primary" data-cursor-light="filled" [href]="profile.repositoryUrl" target="_blank" rel="noopener noreferrer">{{ site.repository }} <span aria-hidden="true">↗</span></a></footer>
    </div></div>
  `,
  styles: [`
    .technical-page { padding-top: 2rem; } .back { margin-bottom: 3.5rem; }
    .technical-hero { max-width: 850px; margin-bottom: 5rem; }
    h1 { font-size: clamp(3rem, 6vw, 5.7rem); letter-spacing: -.06em; max-width: 800px; }
    .intro { max-width: 690px; margin-top: 1.5rem; font-size: 1.1rem; color: var(--text-muted); }
    h2 { font-size: clamp(1.6rem, 3vw, 2.4rem); letter-spacing: -.04em; }
    .decision-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 2rem 3rem; margin-top: 2rem; }
    article { padding-top: 1.5rem; border-top: 1px solid var(--border-strong); }
    .number { color: var(--text-soft); font: .68rem/1.5 var(--font-mono); }
    h3 { margin-top: 1.4rem; font-size: 1.15rem; } article p { margin-top: .75rem; color: var(--text-muted); font-size: .93rem; }
    .flow-section { margin-top: 4.5rem; } .flow { display: grid; grid-template-columns: repeat(4, 1fr); padding: 0; margin: 2rem 0 0; list-style: none; border: 1px solid var(--border); border-radius: 6px; overflow: hidden; }
    .flow li { padding: 1.5rem; background: var(--surface); } .flow li + li { border-left: 1px solid var(--border); }
    .flow strong { display: block; margin-top: 1.75rem; font-size: .95rem; } .flow li > span:last-child { display: block; margin-top: .5rem; font-size: .78rem; color: var(--text-muted); }
    .technical-footer { display: flex; align-items: center; justify-content: space-between; gap: 2rem; margin-top: 4.5rem; padding-top: 2.5rem; border-top: 1px solid var(--border); } .technical-footer p { margin-top: .75rem; color: var(--text-muted); }
    @media (max-width: 760px) { .decision-grid, .flow { grid-template-columns: 1fr; } .flow li + li { border-left: 0; border-top: 1px solid var(--border); } .flow strong { margin-top: .7rem; } .technical-footer { flex-direction: column; align-items: start; } }
  `], changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArchitectureComponent { protected readonly profile = portfolioContent.profile; protected readonly site = portfolioContent.site; protected readonly copy = portfolioContent.architecture; }
