import { DOCUMENT } from '@angular/common';
import { ChangeDetectionStrategy, Component, Inject, signal } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { NavigationEnd, Router, RouterLink, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs';
import { portfolioContent } from './data/portfolio-content';

const SITE_URL = 'https://guysharon.pages.dev';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  template: `
    <a class="skip-link" [routerLink]="[]" fragment="main-content">Skip to main content</a>
    <div class="fixed-background" aria-hidden="true">
      <div class="aurora aurora-one"></div>
      <div class="aurora aurora-two"></div>
      <div class="grid-overlay"></div>
    </div>

    <header class="site-header">
      <nav class="nav-shell" aria-label="Primary navigation">
        <a routerLink="/" class="brand" (click)="closeMenu()" aria-label="Guy Sharon, home">
          <span class="brand-mark" aria-hidden="true">GS</span>
          <span>Guy Sharon</span>
        </a>
        <button class="menu-toggle" type="button" (click)="toggleMenu()" [attr.aria-expanded]="menuOpen()" aria-controls="site-menu">
          <span class="sr-only">Toggle navigation</span>
          <span aria-hidden="true"></span><span aria-hidden="true"></span><span aria-hidden="true"></span>
        </button>
        <div id="site-menu" class="nav-links" [class.open]="menuOpen()">
          <a routerLink="/" fragment="experience" (click)="closeMenu()">Experience</a>
          <a routerLink="/" fragment="work" (click)="closeMenu()">Work</a>
          <a routerLink="/" fragment="skills" (click)="closeMenu()">Skills</a>
          <a routerLink="/cv" (click)="closeMenu()">CV</a>
          <a class="nav-cta" [href]="profile.linkedinUrl" target="_blank" rel="noopener noreferrer" (click)="closeMenu()">LinkedIn <span aria-hidden="true">↗</span></a>
        </div>
      </nav>
    </header>

    <main id="main-content" tabindex="-1"><router-outlet /></main>

    <footer class="site-footer">
      <div class="footer-shell">
        <div><strong>{{ profile.name }}</strong><p>{{ profile.role }}</p></div>
        <nav aria-label="Footer navigation">
          <a routerLink="/architecture">About this site</a>
          <a routerLink="/cv">CV</a>
          <a [href]="profile.githubUrl" target="_blank" rel="noopener noreferrer">GitHub</a>
          <a [href]="profile.linkedinUrl" target="_blank" rel="noopener noreferrer">LinkedIn</a>
        </nav>
        <p class="copyright">© {{ currentYear }} Guy Sharon</p>
      </div>
    </footer>
  `,
  styles: [`
    .skip-link { position: fixed; top: .75rem; left: .75rem; z-index: 1000; transform: translateY(-200%); padding: .7rem 1rem; color: #fff; background: var(--accent); border-radius: .5rem; font-weight: 700; }
    .skip-link:focus { transform: translateY(0); }
    .fixed-background { position: fixed; inset: 0; z-index: -1; overflow: hidden; background: var(--background); pointer-events: none; }
    .grid-overlay { position: absolute; inset: 0; background-image: linear-gradient(rgba(255,255,255,.018) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.018) 1px, transparent 1px); background-size: 56px 56px; mask-image: linear-gradient(to bottom, black, transparent 70%); }
    .aurora { position: absolute; width: 44rem; height: 44rem; border-radius: 50%; filter: blur(120px); opacity: .18; }
    .aurora-one { top: -25rem; left: -12rem; background: #765bff; }
    .aurora-two { top: 20rem; right: -28rem; background: #248dff; }
    .site-header { position: sticky; top: 0; z-index: 100; border-bottom: 1px solid rgba(255,255,255,.06); background: rgba(7,9,16,.82); backdrop-filter: blur(18px); }
    .nav-shell { display: flex; align-items: center; justify-content: space-between; max-width: 1180px; height: 72px; margin: 0 auto; padding: 0 1.25rem; }
    .brand { display: inline-flex; align-items: center; gap: .7rem; font-weight: 800; letter-spacing: -.02em; }
    .brand-mark { display: grid; width: 2rem; height: 2rem; place-items: center; color: #fff; background: linear-gradient(135deg, var(--accent), #3ca7ff); border-radius: .55rem; font: 800 .7rem/1 var(--font-mono); }
    .nav-links { display: flex; align-items: center; gap: 1.35rem; color: var(--text-muted); font-size: .9rem; font-weight: 650; }
    .nav-links a:hover, .nav-links a:focus-visible { color: var(--text); }
    .nav-cta { padding: .6rem .9rem; color: var(--text) !important; background: rgba(255,255,255,.07); border: 1px solid var(--border-strong); border-radius: .65rem; }
    .menu-toggle { display: none; width: 2.75rem; height: 2.75rem; padding: .65rem; background: transparent; border: 1px solid var(--border); border-radius: .6rem; }
    .menu-toggle span:not(.sr-only) { display: block; height: 2px; margin: 4px 0; background: var(--text); }
    .site-footer { border-top: 1px solid var(--border); background: rgba(6,8,14,.74); }
    .footer-shell { display: grid; grid-template-columns: 1fr auto; gap: 2rem; max-width: 1180px; margin: 0 auto; padding: 3rem 1.25rem; }
    .footer-shell > div p, .copyright { margin-top: .3rem; color: var(--text-soft); font-size: .82rem; }
    .footer-shell nav { display: flex; flex-wrap: wrap; justify-content: flex-end; gap: 1rem 1.4rem; color: var(--text-muted); font-size: .85rem; }
    .copyright { grid-column: 1 / -1; }
    @media (max-width: 720px) {
      .menu-toggle { display: block; }
      .nav-links { position: absolute; top: 72px; left: 0; right: 0; display: none; flex-direction: column; align-items: stretch; gap: 0; padding: .75rem 1.25rem 1.25rem; background: rgba(7,9,16,.98); border-bottom: 1px solid var(--border); }
      .nav-links.open { display: flex; }
      .nav-links a { padding: .85rem 0; }
      .nav-cta { margin-top: .4rem; padding: .8rem !important; text-align: center; }
      .footer-shell { grid-template-columns: 1fr; }
      .footer-shell nav { justify-content: flex-start; }
      .copyright { grid-column: auto; }
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  protected readonly profile = portfolioContent.profile;
  protected readonly currentYear = new Date().getFullYear();
  protected readonly menuOpen = signal(false);

  constructor(
    private readonly router: Router,
    private readonly title: Title,
    private readonly meta: Meta,
    @Inject(DOCUMENT) private readonly document: Document,
  ) {
    this.router.events.pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd)).subscribe((event) => {
      this.closeMenu();
      this.updateMetadata(event.urlAfterRedirects.split('#')[0]);
    });
    this.updateMetadata(this.router.url.split('#')[0]);
  }

  protected toggleMenu(): void { this.menuOpen.update((open) => !open); }
  protected closeMenu(): void { this.menuOpen.set(false); }

  private updateMetadata(path: string): void {
    const pages: Record<string, { title: string; description: string }> = {
      '/cv': {
        title: 'CV | Guy Sharon - Backend Engineer',
        description: 'Guy Sharon’s professional experience, technical skills, education, and languages.',
      },
      '/architecture': {
        title: 'About This Site | Guy Sharon',
        description: 'How Guy Sharon’s static Angular portfolio is built for accessibility, privacy, and Cloudflare Pages.',
      },
      '/': {
        title: 'Guy Sharon | Backend TypeScript & Node.js Engineer',
        description: 'Backend-focused TypeScript and Node.js engineer specializing in integrations, distributed workflows, and AWS systems.',
      },
    };
    const page = pages[path] ?? pages['/'];
    const canonicalUrl = `${SITE_URL}${path === '/' ? '' : path}`;
    this.title.setTitle(page.title);
    this.meta.updateTag({ name: 'description', content: page.description });
    this.meta.updateTag({ property: 'og:title', content: page.title });
    this.meta.updateTag({ property: 'og:description', content: page.description });
    this.meta.updateTag({ property: 'og:url', content: canonicalUrl });
    this.meta.updateTag({ name: 'twitter:title', content: page.title });
    this.meta.updateTag({ name: 'twitter:description', content: page.description });
    let canonical = this.document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) {
      canonical = this.document.createElement('link');
      canonical.rel = 'canonical';
      this.document.head.appendChild(canonical);
    }
    canonical.href = canonicalUrl;
  }
}
