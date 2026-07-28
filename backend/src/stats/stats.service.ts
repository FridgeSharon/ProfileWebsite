import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, MoreThanOrEqual } from 'typeorm';
import { Subject, Observable, merge, from } from 'rxjs';
import { ContactRequest } from '../contact/entities/contact-request.entity';

export interface StatsPayload {
  today: number;
  total: number;
}

@Injectable()
export class StatsService implements OnModuleInit, OnModuleDestroy {
  private readonly subject = new Subject<StatsPayload>();

  constructor(
    @InjectRepository(ContactRequest)
    private readonly contactRepository: Repository<ContactRequest>,
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
      const total = await this.contactRepository.count();

      const startOfToday = new Date();
      startOfToday.setHours(0, 0, 0, 0);

      const today = await this.contactRepository.count({
        where: {
          submittedAt: MoreThanOrEqual(startOfToday),
        },
      });

      return { total, today };
    } catch {
      return { total: 0, today: 0 };
    }
  }

  async recordRequest(): Promise<void> {
    const summary = await this.getSummary();
    this.subject.next(summary);
  }

  getStream(): Observable<StatsPayload> {
    return merge(from(this.getSummary()), this.subject.asObservable());
  }
}
