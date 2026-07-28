import { Injectable, BadRequestException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';
import { ContactRequest } from './entities/contact-request.entity';
import { ContactRequestDto } from './dto/contact-request.dto';
import { StatsService } from '../stats/stats.service';

@Injectable()
export class ContactService {
  private readonly logger = new Logger(ContactService.name);
  private transporter: nodemailer.Transporter;

  constructor(
    @InjectRepository(ContactRequest)
    private readonly contactRepository: Repository<ContactRequest>,
    private readonly configService: ConfigService,
    private readonly statsService: StatsService,
  ) {
    this.transporter = nodemailer.createTransport({
      host: this.configService.get<string>('SMTP_HOST'),
      port: this.configService.get<number>('SMTP_PORT'),
      auth: {
        user: this.configService.get<string>('SMTP_USER'),
        pass: this.configService.get<string>('SMTP_PASS'),
      },
    });
  }

  isValidContact(value: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\+?[\d\s-]{7,20}$/;
    return emailRegex.test(value) || phoneRegex.test(value);
  }

  async submitContactRequest(dto: ContactRequestDto): Promise<void> {
    if (!this.isValidContact(dto.contact)) {
      throw new BadRequestException('Invalid contact info');
    }

    const request = this.contactRepository.create(dto);
    await this.contactRepository.save(request);

    try {
      await this.transporter.sendMail({
        from: this.configService.get<string>('SMTP_FROM'),
        to: this.configService.get<string>('OWNER_EMAIL'),
        subject: 'New Contact Request',
        text: `New contact request received from: ${dto.contact}`,
      });
      request.notificationSent = true;
      await this.contactRepository.save(request);
    } catch (e) {
      this.logger.error('Failed to send email:', e);
    }

    await this.statsService.recordRequest();
  }
}
