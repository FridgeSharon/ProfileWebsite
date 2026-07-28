import { Component, ChangeDetectionStrategy, inject, OnInit, effect } from '@angular/core';
import { RouterOutlet, RouterLink, Router, NavigationEnd } from '@angular/router';
import { Title, Meta } from '@angular/platform-browser';
import { filter } from 'rxjs';
import { ContentService } from './services/content.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  template: `
    <!-- Static Animated Background -->
    <div class="fixed-background">
      <div class="bg-blob blob-1"></div>
      <div class="bg-blob blob-2"></div>
      <div class="bg-blob blob-3"></div>
      <div class="grid-overlay"></div>
    </div>

    <!-- Foreground Application Content -->
    @let profile = content.profile();
    <nav class="navbar">
      <div class="nav-content">
        <a routerLink="/" class="brand">{{ profile?.name || 'Portfolio' }}</a>
        <div class="nav-links">
          <button (click)="scrollTo('skills')" class="nav-btn">Skills</button>
          <button (click)="scrollTo('projects')" class="nav-btn">Projects</button>
          <button (click)="scrollTo('experience')" class="nav-btn">Experience</button>
          <button (click)="scrollTo('contact')" class="nav-btn">Contact</button>
          <a routerLink="/architecture" class="arch-link">⚡ Source Code</a>
          <a routerLink="/cv" class="cv-link">CV</a>
        </div>
      </div>
    </nav>
    <main>
      <router-outlet></router-outlet>
    </main>
    <footer class="footer">
      <div class="footer-content">
        <p>&copy; {{ currentYear }} {{ profile?.name || 'Portfolio' }}. All rights reserved.</p>
        <div class="footer-links">
          <a routerLink="/architecture">Architecture & Source Code</a>
          <span>•</span>
          <a routerLink="/cv">CV</a>
          @if (profile?.linkedinUrl) {
            <span>•</span>
            <a [href]="profile?.linkedinUrl" target="_blank" rel="noopener">LinkedIn</a>
          }
        </div>
      </div>
    </footer>
  `,
  styles: [`
    .fixed-background {
      position: fixed;
      inset: 0;
      z-index: -10;
      background: #040407;
      pointer-events: none;
      overflow: hidden;
    }
    .grid-overlay {
      position: absolute;
      inset: 0;
      background-image: 
        linear-gradient(rgba(255, 255, 255, 0.02) 1px, transparent 1px),
        linear-gradient(90deg, rgba(255, 255, 255, 0.02) 1px, transparent 1px);
      background-size: 60px 60px;
      opacity: 0.8;
    }
    .bg-blob {
      position: absolute;
      border-radius: 50%;
      filter: blur(100px);
      opacity: 0.4;
      will-change: transform;
    }
    .blob-1 {
      top: -15%;
      left: -10%;
      width: 55vw;
      height: 55vw;
      background: radial-gradient(circle, rgba(168, 85, 247, 0.35) 0%, rgba(124, 58, 237, 0.08) 70%, transparent 100%);
      animation: float1 22s ease-in-out infinite alternate;
    }
    .blob-2 {
      bottom: -15%;
      right: -10%;
      width: 60vw;
      height: 60vw;
      background: radial-gradient(circle, rgba(59, 130, 246, 0.3) 0%, rgba(14, 165, 233, 0.08) 70%, transparent 100%);
      animation: float2 28s ease-in-out infinite alternate;
    }
    .blob-3 {
      top: 35%;
      left: 25%;
      width: 45vw;
      height: 45vw;
      background: radial-gradient(circle, rgba(236, 72, 153, 0.2) 0%, rgba(168, 85, 247, 0.05) 70%, transparent 100%);
      animation: float3 25s ease-in-out infinite alternate;
    }
    @keyframes float1 {
      0% { transform: translate(0, 0) scale(1); }
      50% { transform: translate(8%, 12%) scale(1.1); }
      100% { transform: translate(-5%, 8%) scale(0.95); }
    }
    @keyframes float2 {
      0% { transform: translate(0, 0) scale(1); }
      50% { transform: translate(-10%, -8%) scale(1.15); }
      100% { transform: translate(6%, -12%) scale(0.9); }
    }
    @keyframes float3 {
      0% { transform: translate(0, 0) scale(0.9); }
      50% { transform: translate(-8%, 10%) scale(1.1); }
      100% { transform: translate(10%, -6%) scale(1); }
    }

    .navbar {
      position: sticky;
      top: 0;
      z-index: 100;
      background: rgba(8, 8, 14, 0.82);
      backdrop-filter: blur(14px);
      border-bottom: 1px solid rgba(255,255,255,0.08);
      padding: 0.85rem 2rem;
    }
    .nav-content {
      max-width: 1200px;
      margin: 0 auto;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .brand {
      font-weight: 700;
      font-size: 1.25rem;
      background: linear-gradient(90deg, #a855f7, #3b82f6);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      text-decoration: none;
    }
    .nav-links {
      display: flex;
      align-items: center;
      gap: 1.1rem;
    }
    .nav-btn {
      background: none;
      border: none;
      color: #94a3b8;
      font-weight: 500;
      font-size: 0.95rem;
      cursor: pointer;
      padding: 0.35rem 0.6rem;
      border-radius: 6px;
      transition: all 0.2s ease;
    }
    .nav-btn:hover {
      color: #f8fafc;
      background: rgba(255, 255, 255, 0.05);
    }
    .arch-link {
      font-weight: 600;
      font-size: 0.88rem;
      color: #38bdf8;
      background: rgba(56, 189, 248, 0.1);
      border: 1px solid rgba(56, 189, 248, 0.3);
      padding: 0.35rem 0.85rem;
      border-radius: 20px;
      text-decoration: none;
      transition: all 0.25s ease;
    }
    .arch-link:hover {
      background: rgba(56, 189, 248, 0.2);
      border-color: #38bdf8;
      color: #fff;
      box-shadow: 0 0 15px rgba(56, 189, 248, 0.3);
    }
    .cv-link {
      font-weight: 600;
      font-size: 0.88rem;
      color: #a855f7;
      border: 1px solid rgba(168, 85, 247, 0.4);
      padding: 0.35rem 0.85rem;
      border-radius: 20px;
      text-decoration: none;
      transition: all 0.25s ease;
    }
    .cv-link:hover {
      background: rgba(168, 85, 247, 0.15);
      border-color: #a855f7;
      color: #fff;
    }
    main {
      min-height: calc(100vh - 140px);
    }
    .footer {
      background: rgba(5, 5, 8, 0.85);
      backdrop-filter: blur(10px);
      padding: 2.5rem 2rem;
      border-top: 1px solid rgba(255,255,255,0.05);
      color: #64748b;
      font-size: 0.9rem;
    }
    .footer-content {
      max-width: 1200px;
      margin: 0 auto;
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: 1rem;
    }
    .footer-content p {
      margin: 0;
    }
    .footer-links {
      display: flex;
      gap: 0.75rem;
      align-items: center;
    }
    .footer-links a {
      color: #94a3b8;
      text-decoration: none;
      transition: color 0.2s ease;
    }
    .footer-links a:hover {
      color: #38bdf8;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {
  content = inject(ContentService);
  router = inject(Router);
  titleService = inject(Title);
  metaService = inject(Meta);
  currentYear = new Date().getFullYear();

  constructor() {
    effect(() => {
      const profile = this.content.profile();
      if (profile?.name) {
        const pageTitle = `${profile.name} - ${profile.title || 'Fullstack'}`;
        this.titleService.setTitle(pageTitle);
        this.metaService.updateTag({ name: 'description', content: `${profile.name} — ${profile.title || 'Fullstack'}. ${profile.tagline || ''}` });
        this.metaService.updateTag({ property: 'og:title', content: pageTitle });
      }
    });

    if (typeof window !== 'undefined' && 'scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    this.router.events.pipe(
      filter((e): e is NavigationEnd => e instanceof NavigationEnd)
    ).subscribe((event) => {
      const urlTree = this.router.parseUrl(event.urlAfterRedirects || event.url);
      const fragment = urlTree.fragment;

      if (fragment) {
        this.scrollToSection(fragment);
      } else if (urlTree.root.children['primary']?.segments[0]?.path === '' || event.url === '/' || event.url.startsWith('/#')) {
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      }
    });
  }

  ngOnInit() {
    this.content.loadProfile();
  }

  scrollTo(sectionId: string) {
    this.router.navigate(['/'], { fragment: sectionId });
    this.scrollToSection(sectionId);
  }

  private scrollToSection(sectionId: string) {
    const doScroll = () => {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    };
    setTimeout(doScroll, 50);
    setTimeout(doScroll, 250);
  }
}
