import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  Index,
} from 'typeorm';

@Entity()
export class ContactRequest {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  contact: string;

  @Index()
  @CreateDateColumn()
  submittedAt: Date;

  @Column({ default: false })
  notificationSent: boolean;
}
