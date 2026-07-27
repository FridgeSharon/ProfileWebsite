import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Project {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  technologies: string;

  @Column({ type: 'text', nullable: true })
  imageFilename: string | null;

  @Column({ type: 'text', nullable: true })
  liveUrl: string | null;

  @Column({ type: 'text', nullable: true })
  repoUrl: string | null;
}
