import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class ContactRequestDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(320)
  contact: string;
}
