export interface Project {
  id: number;
  title: string;
  description: string;
  technologies: string;
  imageFilename: string | null;
  liveUrl: string | null;
  repoUrl: string | null;
}
