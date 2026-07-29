export interface Profile {
  id: number;
  name: string;
  title: string;
  tagline: string;
  location: string;
  linkedinUrl: string | null;
  githubUrl: string | null;
  email: string | null;
  phone: string | null;
  bio: string | null;
}
