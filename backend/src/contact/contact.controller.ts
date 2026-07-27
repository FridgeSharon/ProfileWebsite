import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { ThrottlerGuard } from '@nestjs/throttler';
import { ContactService } from './contact.service';
import { ContactRequestDto } from './dto/contact-request.dto';

@Controller('contact')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @Post('request')
  @UseGuards(ThrottlerGuard)
  submitRequest(@Body() dto: ContactRequestDto): Promise<void> {
    return this.contactService.submitContactRequest(dto);
  }
}
