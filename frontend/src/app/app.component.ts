import { DOCUMENT } from '@angular/common';
import { ChangeDetectionStrategy, Component, ElementRef, Inject, ViewChild, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Meta, Title } from '@angular/platform-browser';
import { NavigationEnd, Router, RouterLink, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs';
import { portfolioContent } from './data/portfolio-content';
import { AppearanceService } from './services/appearance.service';
import { ScrollMotionDirective } from './directives/scroll-motion.directive';
import { PointerLightDirective } from './directives/pointer-light.directive';

@Component({
  selector: 'app-root', standalone: true, imports: [RouterOutlet, RouterLink, ScrollMotionDirective], hostDirectives: [PointerLightDirective],
  template: `
    <div class="ambient-background" aria-hidden="true"><span class="ambient-drift drift-one"></span><span class="ambient-drift drift-two"></span><span class="cursor-glow"></span></div>
    <a class="skip-link" href="#main-content" (click)="skipToContent($event)">{{ site.skipLink }}</a>
    <header class="site-header" (keydown.escape)="dismissMenu()">
      <nav class="nav-shell" [attr.aria-label]="site.primaryNavigation">
        <a routerLink="/" class="brand" (click)="closeMenu()" [attr.aria-label]="site.homeLabel">
          <span class="brand-mark" aria-hidden="true">{{ site.initials }}<span>·</span></span>
          <span>{{ profile.name }}</span>
        </a>
        <div id="site-menu" class="nav-links" [class.open]="menuOpen()">
          @for (link of site.navigation; track link.label) {
            <a [routerLink]="link.path" [fragment]="link.fragment" (click)="closeMenu()" [attr.aria-current]="currentUrl() === link.path + (link.fragment ? '#' + link.fragment : '') ? (link.fragment ? 'location' : 'page') : null">{{ link.label }}</a>
          }
          <a class="nav-cta" data-cursor-light="control" [href]="profile.linkedinUrl" target="_blank" rel="noopener noreferrer" (click)="closeMenu()">{{ site.connect }} <span aria-hidden="true">↗</span></a>
        </div>
        <div class="nav-tools">
          <button class="appearance-toggle theme-toggle" data-cursor-light="control" type="button" (click)="appearance.toggleTheme()" [attr.aria-label]="site.darkMode" [attr.aria-pressed]="appearance.theme() === 'dark'" [title]="appearance.theme() === 'dark' ? site.switchToLight : site.switchToDark">
            <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              @if (appearance.theme() === 'dark') { <circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.5 1.5m11 11L19 19M5 19l1.5-1.5m11-11L19 5"/> }
              @else { <path d="M20.5 14.2A8.8 8.8 0 0 1 9.8 3.5a8.8 8.8 0 1 0 10.7 10.7Z"/> }
            </svg>
          </button>
          <button class="appearance-toggle motion-toggle" data-cursor-light="control" type="button" (click)="appearance.toggleMotion()" [attr.aria-label]="site.pauseMotion" [attr.aria-pressed]="!appearance.motionEnabled()" [disabled]="appearance.systemReducedMotion()" [title]="appearance.systemReducedMotion() ? site.reducedMotion : appearance.motionEnabled() ? site.pauseMotion : site.resumeMotion">
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              @if (appearance.motionEnabled()) { <path d="M9 5v14M15 5v14"/> }
              @else { <path d="m8 5 11 7-11 7Z"/> }
            </svg>
          </button>
          <button #menuToggle class="menu-toggle" data-cursor-light="control" type="button" (click)="toggleMenu()" [attr.aria-expanded]="menuOpen()" aria-controls="site-menu" [attr.aria-label]="site.menuLabel">
            <span aria-hidden="true" [class.cross]="menuOpen()"></span><span aria-hidden="true" [class.cross]="menuOpen()"></span>
          </button>
        </div>
      </nav>
    </header>
    <main id="main-content" tabindex="-1" appScrollMotion><router-outlet /></main>
    <footer class="site-footer">
      <div class="footer-shell">
        <div class="footer-brand"><span class="brand-mark" aria-hidden="true">{{ site.initials }}<span>·</span></span><div><strong>{{ profile.name }}</strong><p>{{ profile.shortRole }}</p></div></div>
        <nav [attr.aria-label]="site.footerNavigation">
          <a routerLink="/architecture">{{ site.architecture }}</a><a routerLink="/cv">{{ site.cv }}</a>
          <a [href]="profile.githubUrl" target="_blank" rel="noopener noreferrer">{{ site.github }} <span aria-hidden="true">↗</span></a>
          <a [href]="profile.linkedinUrl" target="_blank" rel="noopener noreferrer">{{ site.linkedin }} <span aria-hidden="true">↗</span></a>
        </nav>
        <div class="footer-bottom"><p>© {{ currentYear }} {{ profile.name }}</p><p>{{ site.footerNote }}</p></div>
      </div>
    </footer>
  `,
  styles: [`
    :host { display: block; isolation: isolate; }
    main, .site-footer { position: relative; z-index: 1; }
    .skip-link { position: fixed; top: .75rem; left: .75rem; z-index: 1000; transform: translateY(-200%); padding: .7rem 1rem; color: var(--on-accent); background: var(--accent); border-radius: 4px; font-weight: 600; }
    .skip-link:focus { transform: translateY(0); }
    .site-header { position: sticky; top: 0; z-index: 100; border-bottom: 1px solid var(--border); background: var(--header-background); backdrop-filter: blur(12px); }
    .nav-shell { display: flex; align-items: center; justify-content: space-between; max-width: 1272px; height: 80px; margin: 0 auto; padding: 0 2.25rem; }
    .brand { display: inline-flex; align-items: center; gap: .8rem; font-size: .9rem; font-weight: 600; }
    .brand-mark { font-size: 1.6rem; font-weight: 600; line-height: 1; letter-spacing: -.09em; }
    .brand-mark span { color: var(--accent); }
    .nav-links { display: flex; align-items: center; gap: 1.5rem; margin-left: auto; font-size: .78rem; font-weight: 500; }
    .nav-links a { padding-block: .65rem; }
    .nav-links a[aria-current], .nav-links a:hover { color: var(--accent); text-decoration: underline; text-underline-offset: 6px; }
    .nav-links .nav-cta { display: flex; gap: 1.2rem; align-items: center; padding: .6rem 1rem; border: 1px solid var(--border-strong); border-radius: 4px; }
    .nav-tools { display: flex; align-items: center; gap: .3rem; margin-left: 1.25rem; }
    .appearance-toggle { display: grid; place-items: center; width: 44px; height: 44px; flex-shrink: 0; border: 1px solid transparent; border-radius: 5px; background: transparent; color: var(--text-muted); }
    .appearance-toggle:hover:not(:disabled) { background: var(--surface); border-color: var(--border); color: var(--text); }
    .appearance-toggle[aria-pressed=true] { color: var(--accent); }
    .appearance-toggle:disabled { opacity: .6; cursor: default; }
    .menu-toggle { display: none; width: 44px; height: 44px; padding: 12px; border: 1px solid var(--border-strong); border-radius: 4px; background: none; }
    .menu-toggle > span { display: block; height: 1.5px; margin: 5px 0; background: var(--text); transition: transform .2s; }
    .menu-toggle .cross:first-child { transform: translateY(3.25px) rotate(45deg); } .menu-toggle .cross:last-child { transform: translateY(-3.25px) rotate(-45deg); }
    .site-footer { border-top: 1px solid var(--border); }
    .footer-shell { display: grid; grid-template-columns: 1fr auto; gap: 2.5rem; max-width: 1272px; margin: 0 auto; padding: 3rem 2.25rem 1.5rem; }
    .footer-brand { display: flex; align-items: center; gap: 1.25rem; font-size: .82rem; } .footer-brand p { color: var(--text-soft); font-size: .72rem; }
    .footer-shell nav { display: flex; flex-wrap: wrap; align-items: center; gap: 1rem 1.5rem; font-size: .75rem; } .footer-shell nav a { padding-block: .6rem; } .footer-shell nav a:hover { text-decoration: underline; text-underline-offset: 4px; }
    .footer-bottom { grid-column: 1 / -1; display: flex; justify-content: space-between; gap: 1rem; padding-top: 1.25rem; border-top: 1px solid var(--border); color: var(--text-soft); font: .6rem/1.6 var(--font-mono); }
    @media (max-width: 900px) { .nav-shell { height: 68px; padding: 0 1.25rem; } .menu-toggle { display: block; } .nav-tools { margin-left: .75rem; } .nav-links { position: absolute; top: 68px; left: 0; right: 0; display: none; flex-direction: column; align-items: stretch; gap: 0; padding: .75rem 1.25rem 1.25rem; background: var(--background); border-bottom: 1px solid var(--border-strong); box-shadow: var(--card-shadow); } .nav-links.open { display: flex; } .nav-links a { padding: .9rem .5rem; } .nav-links .nav-cta { margin-top: .5rem; justify-content: space-between; padding: .85rem; } .footer-shell { padding: 2.5rem 1.25rem 1.5rem; grid-template-columns: 1fr; gap: 1.5rem; } .footer-bottom { flex-wrap: wrap; } }
    @media (max-width: 380px) { .brand { gap: .5rem; font-size: .78rem; } .nav-tools { gap: 0; margin-left: .4rem; } }
  `], changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  protected readonly appearance = inject(AppearanceService);
  protected readonly profile = portfolioContent.profile;
  protected readonly site = portfolioContent.site;
  protected readonly currentYear = new Date().getFullYear();
  protected readonly menuOpen = signal(false);
  protected readonly currentUrl = signal('/');
  private navigationInitialized = false;
  @ViewChild('menuToggle') private menuToggle?: ElementRef<HTMLButtonElement>;

  constructor(private readonly router: Router, private readonly title: Title, private readonly meta: Meta, @Inject(DOCUMENT) private readonly document: Document) {
    this.router.events.pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd), takeUntilDestroyed()).subscribe((event) => {
      const previous = this.currentUrl();
      const shouldFocus = this.navigationInitialized && previous !== event.urlAfterRedirects;
      this.navigationInitialized = true;
      this.closeMenu();
      this.currentUrl.set(event.urlAfterRedirects);
      this.updateMetadata(event.urlAfterRedirects);
      if (shouldFocus) {
        this.document.defaultView?.requestAnimationFrame?.(() => {
          const fragment = this.router.parseUrl(event.urlAfterRedirects).fragment;
          const target = this.document.getElementById(fragment || 'main-content');
          if (target) { target.setAttribute('tabindex', '-1'); target.focus({ preventScroll: true }); }
        });
      }
    });
    this.updateMetadata(this.router.url);
    const structuredData = this.document.querySelector<HTMLScriptElement>('#profile-schema') ?? this.document.createElement('script');
    structuredData.id = 'profile-schema';
    structuredData.type = 'application/ld+json';
    structuredData.textContent = JSON.stringify({
      '@context': 'https://schema.org', '@type': 'Person',
      name: this.profile.name, jobTitle: this.profile.role, url: this.site.url,
      sameAs: [this.profile.linkedinUrl, this.profile.githubUrl],
      homeLocation: { '@type': 'Place', name: this.profile.location },
    });
    this.document.head.appendChild(structuredData);
  }
  protected toggleMenu(): void { this.menuOpen.update((open) => !open); }
  protected closeMenu(): void { this.menuOpen.set(false); }
  protected dismissMenu(): void { if (this.menuOpen()) { this.closeMenu(); this.menuToggle?.nativeElement.focus(); } }
  protected skipToContent(event: Event): void {
    event.preventDefault();
    const main = this.document.getElementById('main-content');
    main?.focus(); main?.scrollIntoView({ block: 'start' });
  }
  private updateMetadata(url: string): void {
    const path = url.split(/[?#]/)[0].replace(/\/$/, '') || '/';
    const pages: Record<string, { title: string; description: string }> = this.site.metadata;
    const page = pages[path] ?? pages['/'];
    const canonicalUrl = `${this.site.url}${path === '/' ? '' : path}`;
    this.title.setTitle(page.title);
    this.meta.updateTag({ name: 'description', content: page.description });
    this.meta.updateTag({ property: 'og:site_name', content: this.profile.name });
    this.meta.updateTag({ property: 'og:title', content: page.title });
    this.meta.updateTag({ property: 'og:description', content: page.description });
    this.meta.updateTag({ property: 'og:url', content: canonicalUrl });
    this.meta.updateTag({ name: 'twitter:title', content: page.title });
    this.meta.updateTag({ name: 'twitter:description', content: page.description });
    let canonical = this.document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) { canonical = this.document.createElement('link'); canonical.rel = 'canonical'; this.document.head.appendChild(canonical); }
    canonical.href = canonicalUrl;
  }
}
