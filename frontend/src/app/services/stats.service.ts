import { Injectable, OnDestroy, signal, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Stats, StatMetric } from '../models/stats';

@Injectable({ providedIn: 'root' })
export class StatsService implements OnDestroy {
  private http = inject(HttpClient);
  
  uniqueVisitors = signal<StatMetric>({ today: 0, allTime: 0 });
  linkedinClicks = signal<StatMetric>({ today: 0, allTime: 0 });
  sourceCodeViews = signal<StatMetric>({ today: 0, allTime: 0 });
  githubForks = signal<{ total: number }>({ total: 0 });

  private eventSource: EventSource | null = null;
  private baseUrl = environment.apiBaseUrl;
  private retryCount = 0;
  private retryTimeout: ReturnType<typeof setTimeout> | null = null;
  private visitorId: string;

  constructor() {
    this.visitorId = this.getOrCreateVisitorId();
    this.trackVisitor();
    this.loadInitialStats();
  }

  private getOrCreateVisitorId(): string {
    if (typeof window === 'undefined' || !window.localStorage) {
      return 'anonymous-' + Math.random().toString(36).substring(2, 9);
    }
    let id = localStorage.getItem('profile_visitor_id');
    if (!id) {
      id = typeof crypto !== 'undefined' && crypto.randomUUID
        ? crypto.randomUUID()
        : 'v-' + Math.random().toString(36).substring(2, 15) + Date.now().toString(36);
      localStorage.setItem('profile_visitor_id', id);
    }
    return id;
  }

  trackVisitor() {
    this.trackEvent('visitor');
  }

  trackLinkedInClick() {
    this.trackEvent('linkedin');
  }

  trackSourceCodeView() {
    this.trackEvent('source_code');
  }

  private trackEvent(eventType: 'visitor' | 'linkedin' | 'source_code') {
    this.http.post(`${this.baseUrl}/api/stats/track`, {
      eventType,
      visitorId: this.visitorId,
    }).subscribe({
      error: (err) => console.warn(`Failed to track event ${eventType}:`, err),
    });
  }

  private loadInitialStats() {
    this.http.get<Stats>(`${this.baseUrl}/api/stats/summary`).subscribe({
      next: (data) => {
        this.updateSignals(data);
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
      try {
        const parsed: Stats = JSON.parse(event.data);
        this.updateSignals(parsed);
      } catch (e) {
        console.warn('Failed to parse SSE payload:', e);
      }
    };
    this.eventSource.onerror = () => {
      this.reconnect();
    };
  }

  private updateSignals(data: Stats) {
    if (data.uniqueVisitors) this.uniqueVisitors.set(data.uniqueVisitors);
    if (data.linkedinClicks) this.linkedinClicks.set(data.linkedinClicks);
    if (data.sourceCodeViews) this.sourceCodeViews.set(data.sourceCodeViews);
    if (data.githubForks) this.githubForks.set(data.githubForks);
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
