import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Profile {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  title: string;

  @Column('text')
  tagline: string;

  @Column()
  location: string;

  @Column({ type: 'text', nullable: true })
  linkedinUrl: string | null;

  @Column({ type: 'text', nullable: true })
  githubUrl: string | null;

  @Column({ type: 'text', nullable: true })
  email: string | null;

  @Column({ type: 'text', nullable: true })
  phone: string | null;
}
