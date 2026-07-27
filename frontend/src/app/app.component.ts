import { Component, ChangeDetectionStrategy, inject, OnInit } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { ContentService } from './services/content.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  template: `
    <nav class="navbar">
      <div class="nav-content">
        <a routerLink="/" class="brand">{{ content.profile()?.name || 'Portfolio' }}</a>
        <div class="nav-links">
          <a routerLink="/">Home</a>
          <a routerLink="/cv">CV</a>
        </div>
      </div>
    </nav>
    <main>
      <router-outlet></router-outlet>
    </main>
    <footer class="footer">
      <p>&copy; {{ currentYear }} {{ content.profile()?.name || 'Portfolio' }}. All rights reserved.</p>
    </footer>
  `,
  styles: [`
    .navbar {
      position: sticky;
      top: 0;
      z-index: 100;
      background: rgba(10, 10, 15, 0.7);
      backdrop-filter: blur(10px);
      border-bottom: 1px solid rgba(255,255,255,0.1);
      padding: 1rem 2rem;
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
      font-size: 1.2rem;
      background: linear-gradient(90deg, #7c3aed, #3b82f6);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    .nav-links a {
      margin-left: 2rem;
      font-weight: 500;
      transition: color 0.3s ease;
    }
    .nav-links a:hover {
      color: #7c3aed;
    }
    main {
      min-height: calc(100vh - 140px);
    }
    .footer {
      background: #050508;
      text-align: center;
      padding: 2rem;
      border-top: 1px solid rgba(255,255,255,0.05);
      color: #888;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {
  content = inject(ContentService);
  currentYear = new Date().getFullYear();

  ngOnInit() {
    this.content.loadProfile();
  }
}
