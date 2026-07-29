import { Component, ChangeDetectionStrategy, inject, OnInit } from '@angular/core';
import { ContentService } from '../../services/content.service';
import { HeroComponent } from '../../components/hero.component';
import { AboutSectionComponent } from '../../components/about-section.component';
import { SkillsSectionComponent } from '../../components/skills-section.component';
import { ProjectsSectionComponent } from '../../components/projects-section.component';
import { ExperienceSectionComponent } from '../../components/experience-section.component';
import { ContactSectionComponent } from '../../components/contact-section.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HeroComponent,
    AboutSectionComponent,
    SkillsSectionComponent,
    ProjectsSectionComponent,
    ExperienceSectionComponent,
    ContactSectionComponent
  ],
  template: `
    <app-hero></app-hero>
    <app-about-section></app-about-section>
    <app-skills-section [skills]="content.skills()"></app-skills-section>
    <app-projects-section [projects]="content.projects()"></app-projects-section>
    <app-experience-section [experience]="content.experience()"></app-experience-section>
    <app-contact-section></app-contact-section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit {
  content = inject(ContentService);

  ngOnInit() {
    this.content.loadProfile();
    this.content.loadProjects();
    this.content.loadSkills();
    this.content.loadExperience();
  }
}
