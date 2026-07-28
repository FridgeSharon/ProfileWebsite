import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('stat_events')
export class StatEvent {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'varchar', length: 50 })
  eventType!: string;

  @Column({ type: 'varchar', length: 100 })
  visitorId!: string;

  @CreateDateColumn()
  createdAt!: Date;
}
