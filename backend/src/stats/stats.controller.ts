import { Controller, Get, Post, Body, Sse, MessageEvent } from '@nestjs/common';
import { IsString, IsNotEmpty, MaxLength } from 'class-validator';
import { Observable } from 'rxjs';
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
  getStream(): Observable<MessageEvent> {
    return this.statsService
      .getStream()
      .pipe(map((payload) => ({ data: payload })));
  }
}
