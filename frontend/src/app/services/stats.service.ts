import { Injectable, OnDestroy, signal, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Stats } from '../models/stats';

@Injectable({ providedIn: 'root' })
export class StatsService implements OnDestroy {
  private http = inject(HttpClient);
  today = signal<number>(0);
  total = signal<number>(0);
  private eventSource: EventSource | null = null;
  private baseUrl = environment.apiBaseUrl;
  private retryCount = 0;
  private retryTimeout: ReturnType<typeof setTimeout> | null = null;

  constructor() {
    this.loadInitialStats();
  }

  private loadInitialStats() {
    this.http.get<Stats>(`${this.baseUrl}/api/stats/summary`).subscribe({
      next: (data) => {
        this.today.set(data.today);
        this.total.set(data.total);
        this.connectStream();
      },
      error: () => this.connectStream(),
    });
  }

  private connectStream() {
    this.cleanupStream();
    this.eventSource = new EventSource(`${this.baseUrl}/api/stats/stream`);
    this.eventSource.onmessage = (event) => {
      this.retryCount = 0;
      const parsed = JSON.parse(event.data);
      this.today.set(parsed.today);
      this.total.set(parsed.total);
    };
    this.eventSource.onerror = () => {
      this.reconnect();
    };
  }

  private reconnect() {
    this.cleanupStream();
    const delay = Math.min(1000 * 2 ** this.retryCount, 30000);
    this.retryTimeout = setTimeout(() => this.connectStream(), delay);
    this.retryCount++;
  }

  private cleanupStream() {
    if (this.retryTimeout) clearTimeout(this.retryTimeout);
    if (this.eventSource) {
      this.eventSource.close();
      this.eventSource = null;
    }
  }

  ngOnDestroy() {
    this.cleanupStream();
  }
}
