import { Routes } from '@angular/router';
import { portfolioContent } from './data/portfolio-content';

export const routes: Routes = [
  { 
    path: '', 
    title: portfolioContent.site.metadata['/'].title,
    loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent) 
  },
  { 
    path: 'cv', 
    title: portfolioContent.site.metadata['/cv'].title,
    loadComponent: () => import('./pages/cv/cv.component').then(m => m.CvComponent) 
  },
  { 
    path: 'architecture', 
    title: portfolioContent.site.metadata['/architecture'].title,
    loadComponent: () => import('./pages/architecture/architecture.component').then(m => m.ArchitectureComponent) 
  },
  { path: '**', redirectTo: '' },
];
