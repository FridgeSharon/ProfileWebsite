import { Controller, Get, Post, Body, Sse, MessageEvent, Header } from '@nestjs/common';
import { IsString, IsNotEmpty, MaxLength } from 'class-validator';
import { Observable, interval, merge } from 'rxjs';
import { map } from 'rxjs/operators';
import { StatsService, StatsPayload } from './stats.service';

export class TrackEventDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  eventType!: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  visitorId!: string;
}

@Controller('stats')
export class StatsController {
  constructor(private readonly statsService: StatsService) {}

  @Get('summary')
  getSummary(): Promise<StatsPayload> {
    return this.statsService.getSummary();
  }

  @Post('track')
  async trackEvent(@Body() dto: TrackEventDto): Promise<{ success: boolean }> {
    await this.statsService.trackEvent(dto.eventType, dto.visitorId);
    return { success: true };
  }

  @Sse('stream')
  @Header('Content-Type', 'text/event-stream')
  @Header('Cache-Control', 'no-cache, no-transform')
  @Header('X-Accel-Buffering', 'no')
  @Header('Connection', 'keep-alive')
  getStream(): Observable<MessageEvent> {
    const ping$: Observable<MessageEvent> = interval(15000).pipe(
      map(() => ({ data: { ping: true } })),
    );

    const data$: Observable<MessageEvent> = this.statsService
      .getStream()
      .pipe(map((payload) => ({ data: payload })));

    return merge(data$, ping$);
  }
}
