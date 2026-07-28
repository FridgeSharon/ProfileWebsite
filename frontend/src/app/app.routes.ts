import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent) },
  { path: 'cv', loadComponent: () => import('./pages/cv/cv.component').then(m => m.CvComponent) },
  { path: 'architecture', loadComponent: () => import('./pages/architecture/architecture.component').then(m => m.ArchitectureComponent) },
  { path: '**', redirectTo: '' },
];
