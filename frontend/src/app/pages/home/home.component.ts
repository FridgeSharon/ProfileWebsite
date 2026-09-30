import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HeroComponent } from '../../components/hero.component';
import { StrengthsSectionComponent } from '../../components/strengths-section.component';
import { ExperienceSectionComponent } from '../../components/experience-section.component';
import { ProjectsSectionComponent } from '../../components/projects-section.component';
import { SkillsSectionComponent } from '../../components/skills-section.component';
import { EducationSectionComponent } from '../../components/education-section.component';
import { ContactSectionComponent } from '../../components/contact-section.component';
import { portfolioContent } from '../../data/portfolio-content';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HeroComponent,
    StrengthsSectionComponent,
    ExperienceSectionComponent,
    ProjectsSectionComponent,
    SkillsSectionComponent,
    EducationSectionComponent,
    ContactSectionComponent,
  ],
  template: `
    <app-hero />
    <app-projects-section [caseStudies]="content.caseStudies" />
    <app-experience-section [experience]="content.experience" />
    <app-strengths-section [about]="content.profile.about" [strengths]="content.strengths" />
    <app-skills-section [groups]="content.skillGroups" />
    <app-education-section [education]="content.education" [languages]="content.languages" />
    <app-contact-section />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  protected readonly content = portfolioContent;
}
