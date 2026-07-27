import { Controller, Get, Sse, MessageEvent } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { StatsService, StatsPayload } from './stats.service';

@Controller('stats')
export class StatsController {
  constructor(private readonly statsService: StatsService) {}

  @Get('summary')
  getSummary(): Promise<StatsPayload> {
    return this.statsService.getSummary();
  }

  @Sse('stream')
  getStream(): Observable<MessageEvent> {
    return this.statsService.getStream().pipe(
      map((payload) => ({ data: payload } as MessageEvent)),
    );
  }
}
