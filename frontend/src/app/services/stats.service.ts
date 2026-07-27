import { Injectable, signal } from '@angular/core';
import { environment } from '../../environments/environment';
import { Stats } from '../models/stats';

@Injectable({ providedIn: 'root' })
export class StatsService {
  today = signal<number>(0);
  total = signal<number>(0);
  private eventSource: EventSource | null = null;
  private baseUrl = environment.apiBaseUrl;

  constructor() {
    this.initStats();
  }

  private async initStats() {
    try {
      const response = await fetch(`${this.baseUrl}/api/stats/summary`);
      const data: Stats = await response.json();
      this.today.set(data.today);
      this.total.set(data.total);

      this.eventSource = new EventSource(`${this.baseUrl}/api/stats/stream`);
      this.eventSource.onmessage = (event) => {
        const parsed = JSON.parse(event.data);
        this.today.set(parsed.today);
        this.total.set(parsed.total);
      };
    } catch (err) {
      console.error(err);
    }
  }

  destroy(): void {
    if (this.eventSource) {
      this.eventSource.close();
    }
  }
}
