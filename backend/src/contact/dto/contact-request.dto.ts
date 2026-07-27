import { IsNotEmpty, MaxLength } from 'class-validator';

export class ContactRequestDto {
  @IsNotEmpty()
  @MaxLength(320)
  contact: string;
}
