import { Routes } from '@angular/router';

export const routes: Routes = [
  { 
    path: '', 
    title: 'Guy Sharon | Backend TypeScript & Node.js Engineer',
    loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent) 
  },
  { 
    path: 'cv', 
    title: 'CV | Guy Sharon - Backend Engineer',
    loadComponent: () => import('./pages/cv/cv.component').then(m => m.CvComponent) 
  },
  { 
    path: 'architecture', 
    title: 'About This Site | Guy Sharon',
    loadComponent: () => import('./pages/architecture/architecture.component').then(m => m.ArchitectureComponent) 
  },
  { path: '**', redirectTo: '' },
];
