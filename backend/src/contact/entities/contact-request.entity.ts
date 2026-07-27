import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity()
export class ContactRequest {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  contact: string;

  @CreateDateColumn()
  submittedAt: Date;
}
