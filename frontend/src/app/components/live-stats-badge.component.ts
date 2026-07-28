import { Component, ChangeDetectionStrategy, inject, effect, signal } from '@angular/core';
import { StatsService } from '../services/stats.service';

@Component({
  selector: 'app-live-stats-badge',
  standalone: true,
  template: `
    <div class="stats-badge" [class.pulse]="pulseEffect()">
      <span class="icon" aria-hidden="true">✨</span>
      <span class="text">{{ stats.today() }} people reached out today</span>
    </div>
  `,
  styles: [`
    .stats-badge {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      background: rgba(255, 255, 255, 0.05);
      backdrop-filter: blur(10px);
      border: 1px solid rgba(255, 255, 255, 0.1);
      padding: 0.5rem 1rem;
      border-radius: 9999px;
      font-size: 0.9rem;
      color: #e2e8f0;
      transition: all 0.3s ease;
    }
    .pulse {
      animation: pulseAnim 1s ease-out;
    }
    @keyframes pulseAnim {
      0% { transform: scale(1); box-shadow: 0 0 0 0 rgba(124, 58, 237, 0.4); }
      50% { transform: scale(1.05); box-shadow: 0 0 0 10px rgba(124, 58, 237, 0); }
      100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(124, 58, 237, 0); }
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LiveStatsBadgeComponent {
  stats = inject(StatsService);
  pulseEffect = signal(false);

  constructor() {
    let previousTotal = this.stats.total();
    effect(() => {
      const currentTotal = this.stats.total();
      if (currentTotal > previousTotal) {
        this.pulseEffect.set(true);
        setTimeout(() => this.pulseEffect.set(false), 1000);
      }
      previousTotal = currentTotal;
    }, { allowSignalWrites: true });
  }
}
