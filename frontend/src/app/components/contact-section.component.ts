import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { portfolioContent } from '../data/portfolio-content';
@Component({
  selector: 'app-contact-section', standalone: true, imports: [RouterLink],
  template: `
    <section id="contact" class="contact-section" aria-labelledby="contact-title"><div class="section-shell contact-inner">
      <div><p class="eyebrow">{{ heading.eyebrow }}</p><h2 id="contact-title">{{ heading.title }}</h2><p class="description">{{ heading.description }}</p></div>
      <div class="contact-actions"><a class="button" data-cursor-light="lime" [href]="profile.linkedinUrl" target="_blank" rel="noopener noreferrer">{{ site.connect }} <span aria-hidden="true">↗</span></a><a class="text-link" routerLink="/cv">{{ site.cv }} <span aria-hidden="true">→</span></a></div>
    </div></section>
  `,
  styles: [`
    .contact-section { padding: 4.5rem 2.25rem; background: #1c3b2f; color: #f5f6ec; }
    .contact-inner { display: flex; align-items: center; justify-content: space-between; gap: 3rem; }
    .eyebrow { color: #c2d4bd; } h2 { max-width: 680px; font-size: clamp(2.3rem, 4.5vw, 3.8rem); letter-spacing: -.05em; }
    .description { max-width: 560px; margin-top: 1rem; color: #c2d4bd; font-size: .9rem; }
    .contact-actions { display: flex; flex-direction: column; align-items: center; gap: 1rem; flex-shrink: 0; }
    .button { background: var(--lime); color: #1b3828; min-width: 200px; }
    .button:hover { background: #e5f5bb; } .text-link { color: #dce6d6; }
    :focus-visible { outline-color: var(--lime); }
    @media (max-width: 760px) { .contact-section { padding: 3.5rem 1.25rem; } .contact-inner { flex-direction: column; align-items: start; gap: 2rem; } .contact-actions { flex-direction: row; flex-wrap: wrap; gap: 1.5rem; } .button { min-width: auto; } }
  `], changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactSectionComponent { protected readonly profile = portfolioContent.profile; protected readonly site = portfolioContent.site; protected readonly heading = portfolioContent.sections.contact; }
