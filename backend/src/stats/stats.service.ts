import { Injectable, OnModuleInit, OnModuleDestroy, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, MoreThanOrEqual } from 'typeorm';
import { Subject, Observable, merge, from } from 'rxjs';
import { StatEvent } from './entities/stat-event.entity';
import { Profile } from '../content/entities/profile.entity';

export interface StatMetric {
  today: number;
  allTime: number;
}

export interface StatsPayload {
  uniqueVisitors: StatMetric;
  linkedinClicks: StatMetric;
  sourceCodeViews: StatMetric;
  githubForks: { total: number };
}

@Injectable()
export class StatsService implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(StatsService.name);
  private readonly subject = new Subject<StatsPayload>();

  private cachedForks = 0;
  private forksCacheExpiry = 0;

  constructor(
    @InjectRepository(StatEvent)
    private readonly eventRepository: Repository<StatEvent>,
    @InjectRepository(Profile)
    private readonly profileRepository: Repository<Profile>,
  ) {}

  async onModuleInit() {
    const summary = await this.getSummary();
    this.subject.next(summary);
  }

  onModuleDestroy() {
    this.subject.complete();
  }

  async getSummary(): Promise<StatsPayload> {
    try {
      const startOfToday = new Date();
      startOfToday.setHours(0, 0, 0, 0);

      // 1. Unique Visitors
      const todayEvents = await this.eventRepository.find({
        where: {
          eventType: 'visitor',
          createdAt: MoreThanOrEqual(startOfToday),
        },
        select: ['visitorId'],
      });
      const uniqueVisitorsToday = new Set(todayEvents.map((e) => e.visitorId)).size;

      const allEvents = await this.eventRepository.find({
        where: { eventType: 'visitor' },
        select: ['visitorId'],
      });
      const uniqueVisitorsAllTime = new Set(allEvents.map((e) => e.visitorId)).size;

      // 2. LinkedIn Clicks
      const linkedinToday = await this.eventRepository.count({
        where: {
          eventType: 'linkedin',
          createdAt: MoreThanOrEqual(startOfToday),
        },
      });
      const linkedinAllTime = await this.eventRepository.count({
        where: { eventType: 'linkedin' },
      });

      // 3. Source Code Views
      const sourceCodeToday = await this.eventRepository.count({
        where: {
          eventType: 'source_code',
          createdAt: MoreThanOrEqual(startOfToday),
        },
      });
      const sourceCodeAllTime = await this.eventRepository.count({
        where: { eventType: 'source_code' },
      });

      // 4. GitHub Forks
      const forks = await this.getGitHubForks();

      return {
        uniqueVisitors: { today: uniqueVisitorsToday, allTime: uniqueVisitorsAllTime },
        linkedinClicks: { today: linkedinToday, allTime: linkedinAllTime },
        sourceCodeViews: { today: sourceCodeToday, allTime: sourceCodeAllTime },
        githubForks: { total: forks },
      };
    } catch (err) {
      this.logger.error('Error computing stats summary:', err);
      return {
        uniqueVisitors: { today: 0, allTime: 0 },
        linkedinClicks: { today: 0, allTime: 0 },
        sourceCodeViews: { today: 0, allTime: 0 },
        githubForks: { total: 0 },
      };
    }
  }

  async trackEvent(eventType: string, visitorId: string): Promise<void> {
    if (!['visitor', 'linkedin', 'source_code'].includes(eventType)) {
      return;
    }
    const cleanVisitorId = (visitorId || 'anonymous').trim().substring(0, 100);

    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);

    if (eventType === 'visitor') {
      const existingToday = await this.eventRepository.findOne({
        where: {
          eventType: 'visitor',
          visitorId: cleanVisitorId,
          createdAt: MoreThanOrEqual(startOfToday),
        },
      });
      if (existingToday) {
        return; // Visitor already logged for today
      }
    }

    const event = this.eventRepository.create({
      eventType,
      visitorId: cleanVisitorId,
    });
    await this.eventRepository.save(event);

    const updatedSummary = await this.getSummary();
    this.subject.next(updatedSummary);
  }

  async recordRequest(): Promise<void> {
    const summary = await this.getSummary();
    this.subject.next(summary);
  }

  getStream(): Observable<StatsPayload> {
    return merge(from(this.getSummary()), this.subject.asObservable());
  }

  private async getGitHubForks(): Promise<number> {
    const now = Date.now();
    if (now < this.forksCacheExpiry) {
      return this.cachedForks;
    }

    try {
      const profile = await this.profileRepository.findOne({ where: {} });
      if (!profile?.githubUrl) {
        return this.cachedForks;
      }

      // Match github.com/owner/repo pattern
      const match = profile.githubUrl.match(/github\.com\/([^/]+)\/([^/]+)/);
      if (!match) {
        return this.cachedForks;
      }

      const [, owner, repo] = match;
      const repoClean = repo.replace(/\.git$/, '');

      const res = await fetch(`https://api.github.com/repos/${owner}/${repoClean}`, {
        headers: {
          'User-Agent': 'ProfileWebsite-Backend',
          Accept: 'application/vnd.github.v3+json',
        },
      });

      if (res.ok) {
        const data = (await res.json()) as { forks_count?: number };
        if (typeof data.forks_count === 'number') {
          this.cachedForks = data.forks_count;
          this.forksCacheExpiry = now + 5 * 60 * 1000; // 5 minutes cache
        }
      }
    } catch (e) {
      this.logger.warn('Failed to fetch GitHub repo forks:', e);
    }

    return this.cachedForks;
  }
}
