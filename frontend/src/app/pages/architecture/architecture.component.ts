import { Component, ChangeDetectionStrategy, signal, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ContentService } from '../../services/content.service';
import { StatsService } from '../../services/stats.service';

interface CodeSnippet {
  id: string;
  title: string;
  category: string;
  filename: string;
  description: string;
  code: string;
  language: string;
}

@Component({
  selector: 'app-architecture',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="arch-page">
      <div class="arch-container">
        <!-- Hero Header -->
        <header class="arch-header">
          <div class="pill-badge">Engineering Deep Dive</div>
          <h1>Architecture & <span class="gradient-text">Source Code</span></h1>
          <p class="subtitle">
            An inside look into the fullstack design patterns, technical decisions, and source code of this portfolio application.
          </p>
          <div class="tech-stack-pills">
            <span class="tech-pill">Angular 22</span>
            <span class="tech-pill">NestJS 11</span>
            <span class="tech-pill">TypeScript 6</span>
            <span class="tech-pill">SQLite & TypeORM</span>
            <span class="tech-pill">RxJS SSE Stream</span>
            <span class="tech-pill">Nodemailer SMTP</span>
          </div>
        </header>

        <!-- Why Over-Engineered Section -->
        <section class="rationale-section">
          <h2>Why Over-Engineered as a Fullstack Tech Demo?</h2>
          <div class="rationale-grid">
            <div class="rationale-card">
              <div class="card-icon">⚡</div>
              <h3>Fullstack Engineering Proof</h3>
              <p>
                Rather than building a static template, this site is engineered as a decoupled monorepo using <strong>Angular 22</strong> signals on the frontend and <strong>NestJS 11</strong> on the backend to demonstrate enterprise-grade web development skills.
              </p>
            </div>
            <div class="rationale-card">
              <div class="card-icon">🔒</div>
              <h3>Zero-Leak Privacy Architecture</h3>
              <p>
                Personal contact details are stored in an untracked local seed file (<code>cv-seed.json</code>) and loaded into SQLite upon boot. This ensures zero sensitive personal data is hardcoded or leaked in public Git commits.
              </p>
            </div>
            <div class="rationale-card">
              <div class="card-icon">📡</div>
              <h3>Real-Time Telemetry (SSE)</h3>
              <p>
                Features Server-Sent Events (SSE) via RxJS <code>ReplaySubject(1)</code> and NestJS <code>&#64;Sse()</code> controller stream, pushing live visitor activity metrics down to the client with sub-millisecond overhead.
              </p>
            </div>
            <div class="rationale-card">
              <div class="card-icon">✉️</div>
              <h3>SMTP Capabilities & Throttling</h3>
              <p>
                Includes complete Nodemailer SMTP integration and NestJS <code>ThrottlerGuard</code> rate limiting (max 5 requests per IP window) for robust production contact requests.
              </p>
            </div>
          </div>
        </section>

        <!-- Interactive Source Code Showcase -->
        <section class="code-showcase-section">
          <div class="showcase-header">
            <div>
              <h2>Interactive Source Code Showcase</h2>
              <p class="section-desc">Explore the exact production implementation snippets across the fullstack layers:</p>
            </div>
            <a [href]="content.profile()?.githubUrl || 'https://github.com'" target="_blank" rel="noopener noreferrer" class="github-repo-link">
              <svg class="github-icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
              </svg>
              View GitHub Repo ↗
            </a>
          </div>

          <!-- Tab Navigation -->
          <div class="tab-bar">
            @for (snippet of snippets; track snippet.id) {
              <button 
                class="tab-btn" 
                [class.active]="activeTab() === snippet.id"
                (click)="activeTab.set(snippet.id)"
              >
                {{ snippet.category }}
              </button>
            }
          </div>

          <!-- Code Display Card -->
          @for (snippet of snippets; track snippet.id) {
            @if (activeTab() === snippet.id) {
              <div class="snippet-card">
                <div class="snippet-header">
                  <div class="file-info">
                    <span class="file-name">📁 {{ snippet.filename }}</span>
                    <span class="lang-tag">{{ snippet.language }}</span>
                  </div>
                  <button class="copy-btn" (click)="copyCode(snippet.code, snippet.id)">
                    {{ copiedId() === snippet.id ? '✓ Copied' : 'Copy Code' }}
                  </button>
                </div>
                <p class="snippet-desc">{{ snippet.description }}</p>
                <pre class="code-block"><code>{{ snippet.code }}</code></pre>
              </div>
            }
          }
        </section>

        <!-- Back to Home CTA -->
        <footer class="arch-footer">
          <a routerLink="/" class="back-btn">← Back to Portfolio</a>
          <a [href]="content.profile()?.githubUrl || 'https://github.com'" target="_blank" rel="noopener noreferrer" class="github-footer-btn">
            <svg class="github-icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
            </svg>
            GitHub Repository
          </a>
          <a [href]="content.profile()?.linkedinUrl || 'https://linkedin.com'" (click)="stats.trackLinkedInClick()" target="_blank" rel="noopener" class="linkedin-btn">Connect on LinkedIn</a>
        </footer>
      </div>
    </div>
  `,
  styles: [`
    .arch-page {
      background: transparent;
      color: #f8fafc;
      min-height: 100vh;
      padding: 4rem 2rem;
    }
    .arch-container {
      max-width: 1100px;
      margin: 0 auto;
    }
    .arch-header {
      text-align: center;
      margin-bottom: 4rem;
    }
    .pill-badge {
      display: inline-block;
      padding: 0.35rem 1rem;
      background: rgba(168, 85, 247, 0.15);
      color: #c084fc;
      border: 1px solid rgba(168, 85, 247, 0.3);
      border-radius: 9999px;
      font-size: 0.85rem;
      font-weight: 600;
      margin-bottom: 1.25rem;
      text-transform: uppercase;
      letter-spacing: 0.08em;
    }
    h1 {
      font-size: 3rem;
      font-weight: 800;
      margin: 0 0 1rem;
      letter-spacing: -0.02em;
    }
    .gradient-text {
      background: linear-gradient(90deg, #a855f7, #3b82f6);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    .subtitle {
      font-size: 1.15rem;
      color: #94a3b8;
      max-width: 650px;
      margin: 0 auto 2rem;
      line-height: 1.6;
    }
    .tech-stack-pills {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
      justify-content: center;
    }
    .tech-pill {
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid rgba(255, 255, 255, 0.1);
      color: #cbd5e1;
      font-size: 0.82rem;
      font-weight: 500;
      padding: 0.3rem 0.75rem;
      border-radius: 8px;
    }
    .rationale-section {
      margin-bottom: 4.5rem;
    }
    h2 {
      font-size: 2rem;
      font-weight: 700;
      margin-bottom: 0.5rem;
      background: linear-gradient(90deg, #f8fafc, #cbd5e1);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    .rationale-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
      gap: 1.5rem;
      margin-top: 2rem;
    }
    .rationale-card {
      background: rgba(255, 255, 255, 0.025);
      backdrop-filter: blur(10px);
      border: 1px solid rgba(255, 255, 255, 0.07);
      border-radius: 16px;
      padding: 1.75rem;
      transition: all 0.3s ease;
    }
    .rationale-card:hover {
      transform: translateY(-4px);
      border-color: rgba(168, 85, 247, 0.35);
      background: rgba(255, 255, 255, 0.035);
    }
    .card-icon {
      font-size: 2rem;
      margin-bottom: 1rem;
    }
    .rationale-card h3 {
      font-size: 1.15rem;
      font-weight: 600;
      margin: 0 0 0.75rem;
      color: #f1f5f9;
    }
    .rationale-card p {
      margin: 0;
      color: #94a3b8;
      font-size: 0.92rem;
      line-height: 1.6;
    }
    .code-showcase-section {
      margin-bottom: 4rem;
    }
    .showcase-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      flex-wrap: wrap;
      gap: 1rem;
      margin-bottom: 2rem;
    }
    .section-desc {
      color: #94a3b8;
      margin: 0.25rem 0 0;
    }
    .github-repo-link, .github-footer-btn {
      display: inline-flex;
      align-items: center;
      gap: 0.6rem;
      background: rgba(255, 255, 255, 0.06);
      border: 1px solid rgba(255, 255, 255, 0.15);
      color: #38bdf8;
      text-decoration: none;
      padding: 0.6rem 1.25rem;
      border-radius: 10px;
      font-weight: 600;
      font-size: 0.9rem;
      transition: all 0.25s ease;
    }
    .github-repo-link:hover, .github-footer-btn:hover {
      background: rgba(56, 189, 248, 0.15);
      border-color: rgba(56, 189, 248, 0.4);
      color: #ffffff;
      transform: translateY(-2px);
    }
    .github-icon {
      width: 18px;
      height: 18px;
    }
    .tab-bar {
      display: flex;
      gap: 0.5rem;
      flex-wrap: wrap;
      margin-bottom: 1.5rem;
      justify-content: center;
    }
    .tab-btn {
      background: rgba(255, 255, 255, 0.04);
      border: 1px solid rgba(255, 255, 255, 0.08);
      color: #94a3b8;
      padding: 0.6rem 1.2rem;
      border-radius: 10px;
      font-weight: 600;
      font-size: 0.9rem;
      cursor: pointer;
      transition: all 0.25s ease;
    }
    .tab-btn:hover {
      color: #f8fafc;
      background: rgba(255, 255, 255, 0.08);
    }
    .tab-btn.active {
      background: linear-gradient(90deg, #a855f7, #3b82f6);
      color: #fff;
      border-color: transparent;
      box-shadow: 0 8px 20px rgba(168, 85, 247, 0.25);
    }
    .snippet-card {
      background: rgba(15, 17, 26, 0.85);
      backdrop-filter: blur(14px);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 16px;
      padding: 1.75rem;
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.6);
    }
    .snippet-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1rem;
      padding-bottom: 0.75rem;
      border-bottom: 1px solid rgba(255, 255, 255, 0.08);
    }
    .file-name {
      font-weight: 600;
      font-size: 0.95rem;
      color: #38bdf8;
      font-family: monospace;
    }
    .lang-tag {
      font-size: 0.75rem;
      background: rgba(255, 255, 255, 0.1);
      color: #cbd5e1;
      padding: 0.2rem 0.5rem;
      border-radius: 4px;
      margin-left: 0.75rem;
    }
    .copy-btn {
      background: rgba(255, 255, 255, 0.08);
      border: 1px solid rgba(255, 255, 255, 0.15);
      color: #f8fafc;
      padding: 0.35rem 0.85rem;
      border-radius: 6px;
      font-size: 0.82rem;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.2s ease;
    }
    .copy-btn:hover {
      background: rgba(255, 255, 255, 0.18);
    }
    .snippet-desc {
      color: #cbd5e1;
      font-size: 0.95rem;
      margin-bottom: 1.25rem;
      line-height: 1.65;
    }
    .code-block {
      background: rgba(5, 6, 10, 0.9);
      border-radius: 10px;
      padding: 1.25rem;
      overflow-x: auto;
      border: 1px solid rgba(255, 255, 255, 0.05);
      margin: 0;
    }
    .code-block code {
      font-family: 'Fira Code', Consolas, Monaco, 'Andale Mono', monospace;
      font-size: 0.88rem;
      color: #a78bfa;
      line-height: 1.6;
      white-space: pre;
    }
    .arch-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-top: 2rem;
      border-top: 1px solid rgba(255, 255, 255, 0.08);
      flex-wrap: wrap;
      gap: 1rem;
    }
    .back-btn {
      color: #94a3b8;
      text-decoration: none;
      font-weight: 600;
      transition: color 0.2s ease;
    }
    .back-btn:hover {
      color: #f8fafc;
    }
    .linkedin-btn {
      background: #0a66c2;
      color: #fff;
      text-decoration: none;
      padding: 0.65rem 1.5rem;
      border-radius: 10px;
      font-weight: 600;
      font-size: 0.92rem;
      transition: background 0.2s ease;
    }
    .linkedin-btn:hover {
      background: #0077b5;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ArchitectureComponent implements OnInit {
  content = inject(ContentService);
  stats = inject(StatsService);
  activeTab = signal<string>('backend');
  copiedId = signal<string | null>(null);

  ngOnInit() {
    this.stats.trackSourceCodeView();
  }

  snippets: CodeSnippet[] = [
    {
      id: 'backend',
      title: 'NestJS Monorepo & TypeORM Architecture',
      category: '1. NestJS Backend',
      filename: 'backend/src/content/content.controller.ts',
      language: 'TypeScript / NestJS',
      description: 'NestJS REST Controller using Dependency Injection to deliver TypeORM entity queries over high-performance HTTP endpoints.',
      code: `import { Controller, Get } from '@nestjs/common';
import { ContentService } from './content.service';
import { Profile } from './entities/profile.entity';
import { Project } from './entities/project.entity';

@Controller('api')
export class ContentController {
  constructor(private readonly contentService: ContentService) {}

  @Get('profile')
  getProfile(): Promise<Profile | null> {
    return this.contentService.getProfile();
  }

  @Get('projects')
  getProjects(): Promise<Project[]> {
    return this.contentService.getProjects();
  }
}`
    },
    {
      id: 'frontend',
      title: 'Angular 22 Signals & State Management',
      category: '2. Angular 22 Signals',
      filename: 'frontend/src/app/services/content.service.ts',
      language: 'TypeScript / Angular 22',
      description: 'Modern Angular service using signal<T>(), cache guards, and error handling for zone-efficient reactive state management.',
      code: `import { Injectable, signal, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Profile } from '../models/profile';

@Injectable({ providedIn: 'root' })
export class ContentService {
  private http = inject(HttpClient);
  private baseUrl = environment.apiBaseUrl;

  profile = signal<Profile | null>(null);
  loadError = signal<string | null>(null);

  loadProfile(): void {
    if (this.profile()) return; // Cache guard
    this.http.get<Profile | null>(\`\${this.baseUrl}/api/profile\`).subscribe({
      next: (data) => this.profile.set(data),
      error: () => this.loadError.set('Failed to load content. Please refresh.'),
    });
  }
}`
    },
    {
      id: 'sse',
      title: 'Real-Time Server-Sent Events (SSE)',
      category: '3. Real-Time Telemetry (SSE)',
      filename: 'backend/src/stats/stats.service.ts',
      language: 'TypeScript / RxJS',
      description: 'Real-time SSE event stream in NestJS using ReplaySubject(1) and OnModuleDestroy to stream visitor telemetry without leaks.',
      code: `@Injectable()
export class StatsService implements OnModuleInit, OnModuleDestroy {
  private readonly subject = new ReplaySubject<StatsPayload>(1);

  async onModuleInit() {
    const summary = await this.getSummary();
    this.subject.next(summary);
  }

  onModuleDestroy() {
    this.subject.complete();
  }

  getStream(): Observable<StatsPayload> {
    return this.subject.asObservable();
  }
}`
    },
    {
      id: 'smtp',
      title: 'Nodemailer SMTP & Rate Limiting',
      category: '4. SMTP & ThrottlerGuard',
      filename: 'backend/src/contact/contact.service.ts',
      language: 'TypeScript / Nodemailer',
      description: 'Asynchronous SMTP email dispatch via Nodemailer with notificationSent tracking, Logger error handling, and ThrottlerGuard protection.',
      code: `@Injectable()
export class ContactService {
  private readonly logger = new Logger(ContactService.name);

  async submitContactRequest(dto: ContactRequestDto): Promise<void> {
    const request = this.contactRepository.create(dto);
    await this.contactRepository.save(request);

    try {
      await this.transporter.sendMail({ ... });
      request.notificationSent = true;
      await this.contactRepository.save(request);
    } catch (e) {
      this.logger.error('Failed to send notification email:', e);
    }

    await this.statsService.recordRequest();
  }
}`
    },
    {
      id: 'seed',
      title: 'Git-Safe SQLite DB Seeding',
      category: '5. Zero-Leak Seeding',
      filename: 'backend/src/database/seed.ts',
      language: 'TypeScript / TypeORM',
      description: 'Idempotent SQLite database seeder with strict SeedData typing and try-catch JSON parsing to keep Git repos 100% clean.',
      code: `interface SeedData {
  profile?: Partial<Profile>;
  projects?: Partial<Project>[];
}

async function seed() {
  const customSeedPath = path.join(dbDir, 'cv-seed.json');
  let seedData: SeedData | null = null;

  if (fs.existsSync(customSeedPath)) {
    try {
      seedData = JSON.parse(fs.readFileSync(customSeedPath, 'utf8')) as SeedData;
    } catch (e) {
      console.error(\`Failed to parse \${customSeedPath}:\`, e);
      process.exit(1);
    }
  }

  const profileItem = seedData?.profile || defaultFallbackProfile;
  await profileRepo.save([profileItem]);
}

seed().catch((err) => { console.error(err); process.exit(1); });`
    }
  ];

  copyCode(code: string, id: string) {
    navigator.clipboard.writeText(code).then(() => {
      this.copiedId.set(id);
      setTimeout(() => this.copiedId.set(null), 2000);
    });
  }
}
