import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, MoreThanOrEqual } from 'typeorm';
import { Subject, Observable } from 'rxjs';
import { ContactRequest } from '../contact/entities/contact-request.entity';

export interface StatsPayload {
  today: number;
  total: number;
}

@Injectable()
export class StatsService {
  private readonly subject = new Subject<StatsPayload>();

  constructor(
    @InjectRepository(ContactRequest)
    private readonly contactRepository: Repository<ContactRequest>,
  ) {}

  async getSummary(): Promise<StatsPayload> {
    const total = await this.contactRepository.count();
    
    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);
    
    const today = await this.contactRepository.count({
      where: {
        submittedAt: MoreThanOrEqual(startOfToday),
      },
    });

    return { total, today };
  }

  async recordRequest(): Promise<void> {
    const summary = await this.getSummary();
    this.subject.next(summary);
  }

  getStream(): Observable<StatsPayload> {
    return this.subject.asObservable();
  }
}
