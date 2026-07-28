import { Component, ChangeDetectionStrategy, inject, effect, signal } from '@angular/core';
import { StatsService } from '../services/stats.service';

@Component({
  selector: 'app-live-stats-badge',
  standalone: true,
  template: `
    <div class="telemetry-bar" [class.pulse]="pulseEffect()">
      <div class="live-indicator">
        <span class="live-dot"></span>
        <span class="live-text">LIVE STATS</span>
      </div>

      <div class="stats-grid">
        <!-- 1. Unique Visitors -->
        <div class="stat-card" title="Unique visitors to this site">
          <div class="card-header">
            <span class="icon">👁️</span>
            <span class="title">Visitors</span>
          </div>
          <div class="metrics-row">
            <div class="metric-col">
              <span class="sub-label">today</span>
              <span class="num">{{ stats.uniqueVisitors().today }}</span>
            </div>
            <div class="divider"></div>
            <div class="metric-col">
              <span class="sub-label">total</span>
              <span class="num">{{ stats.uniqueVisitors().allTime }}</span>
            </div>
          </div>
        </div>

        <!-- 2. LinkedIn Clicks -->
        <div class="stat-card" title="Outbound LinkedIn profile clicks">
          <div class="card-header">
            <span class="icon">💼</span>
            <span class="title">LinkedIn Clicks</span>
          </div>
          <div class="metrics-row">
            <div class="metric-col">
              <span class="sub-label">today</span>
              <span class="num">{{ stats.linkedinClicks().today }}</span>
            </div>
            <div class="divider"></div>
            <div class="metric-col">
              <span class="sub-label">total</span>
              <span class="num">{{ stats.linkedinClicks().allTime }}</span>
            </div>
          </div>
        </div>

        <!-- 3. Reviewed Source Code -->
        <div class="stat-card" title="Architecture & Source Code views">
          <div class="card-header">
            <span class="icon">⚡</span>
            <span class="title">Source Code Views</span>
          </div>
          <div class="metrics-row">
            <div class="metric-col">
              <span class="sub-label">today</span>
              <span class="num">{{ stats.sourceCodeViews().today }}</span>
            </div>
            <div class="divider"></div>
            <div class="metric-col">
              <span class="sub-label">total</span>
              <span class="num">{{ stats.sourceCodeViews().allTime }}</span>
            </div>
          </div>
        </div>

        <!-- 4. GitHub Forks -->
        <div class="stat-card" title="Forks on the GitHub repository">
          <div class="card-header">
            <span class="icon">🍴</span>
            <span class="title">GitHub Forks</span>
          </div>
          <div class="metrics-row single-col">
            <div class="metric-col">
              <span class="sub-label">total</span>
              <span class="num">{{ stats.githubForks().total }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .telemetry-bar {
      display: inline-flex;
      flex-direction: column;
      align-items: center;
      gap: 0.85rem;
      background: rgba(13, 14, 24, 0.7);
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
      border: 1px solid rgba(255, 255, 255, 0.12);
      border-radius: 20px;
      padding: 1rem 1.5rem;
      margin: 0 auto;
      max-width: 100%;
      box-shadow: 0 12px 35px rgba(0, 0, 0, 0.4);
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }
    .pulse {
      animation: barPulse 1s ease-out;
    }
    @keyframes barPulse {
      0% { transform: scale(1); box-shadow: 0 0 0 0 rgba(168, 85, 247, 0.5); }
      50% { transform: scale(1.02); box-shadow: 0 0 0 12px rgba(168, 85, 247, 0); }
      100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(168, 85, 247, 0); }
    }
    .live-indicator {
      display: flex;
      align-items: center;
      gap: 0.45rem;
    }
    .live-dot {
      width: 7px;
      height: 7px;
      background-color: #22c55e;
      border-radius: 50%;
      box-shadow: 0 0 8px #22c55e;
      animation: blink 1.8s infinite ease-in-out;
    }
    @keyframes blink {
      0%, 100% { opacity: 1; transform: scale(1); }
      50% { opacity: 0.3; transform: scale(0.85); }
    }
    .live-text {
      font-size: 0.72rem;
      font-weight: 700;
      letter-spacing: 0.14em;
      color: #22c55e;
      text-transform: uppercase;
    }
    .stats-grid {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      align-items: stretch;
      gap: 0.85rem 1.25rem;
    }
    .stat-card {
      display: flex;
      flex-direction: column;
      align-items: center;
      background: rgba(255, 255, 255, 0.035);
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 14px;
      padding: 0.65rem 1.1rem;
      min-width: 145px;
      transition: all 0.25s ease;
    }
    .stat-card:hover {
      background: rgba(255, 255, 255, 0.07);
      border-color: rgba(168, 85, 247, 0.35);
      transform: translateY(-2px);
    }
    .card-header {
      display: flex;
      align-items: center;
      gap: 0.4rem;
      margin-bottom: 0.5rem;
    }
    .icon {
      font-size: 1rem;
      line-height: 1;
    }
    .title {
      font-size: 0.73rem;
      font-weight: 700;
      color: #94a3b8;
      text-transform: uppercase;
      letter-spacing: 0.06em;
      line-height: 1;
    }
    .metrics-row {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 1rem;
      width: 100%;
    }
    .single-col {
      justify-content: center;
    }
    .metric-col {
      display: flex;
      flex-direction: column;
      align-items: center;
      min-width: 42px;
    }
    .sub-label {
      font-size: 0.68rem;
      font-weight: 500;
      color: #64748b;
      text-transform: lowercase;
      margin-bottom: 0.2rem;
      letter-spacing: 0.02em;
    }
    .num {
      font-size: 1.2rem;
      font-weight: 800;
      color: #38bdf8;
      line-height: 1;
    }
    .divider {
      width: 1px;
      height: 22px;
      background: rgba(255, 255, 255, 0.1);
    }
    @media (max-width: 640px) {
      .stats-grid {
        flex-direction: column;
        width: 100%;
      }
      .stat-card {
        width: 100%;
      }
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LiveStatsBadgeComponent {
  stats = inject(StatsService);
  pulseEffect = signal(false);

  constructor() {
    let lastVisitors = this.stats.uniqueVisitors().allTime;
    let lastLinkedin = this.stats.linkedinClicks().allTime;
    let lastSource = this.stats.sourceCodeViews().allTime;

    effect(() => {
      const curVisitors = this.stats.uniqueVisitors().allTime;
      const curLinkedin = this.stats.linkedinClicks().allTime;
      const curSource = this.stats.sourceCodeViews().allTime;

      if (curVisitors > lastVisitors || curLinkedin > lastLinkedin || curSource > lastSource) {
        this.pulseEffect.set(true);
        setTimeout(() => this.pulseEffect.set(false), 1000);
      }

      lastVisitors = curVisitors;
      lastLinkedin = curLinkedin;
      lastSource = curSource;
    }, { allowSignalWrites: true });
  }
}
