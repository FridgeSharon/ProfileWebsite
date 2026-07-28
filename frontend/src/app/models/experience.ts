export interface ExperienceEntry {
  id: number;
  role: string;
  company: string;
  companyUrl?: string;
  companyLogoUrl?: string;
  startDate: string;
  endDate: string | null;
  description: string;
}
