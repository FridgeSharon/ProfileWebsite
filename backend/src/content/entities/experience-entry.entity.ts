import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class ExperienceEntry {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  role: string;

  @Column()
  company: string;

  @Column({ nullable: true })
  companyUrl: string;

  @Column({ nullable: true })
  companyLogoUrl: string;

  @Column()
  startDate: string;

  @Column({ type: 'text', nullable: true })
  endDate: string | null;

  @Column('text')
  description: string;
}
