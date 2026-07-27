import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { CvComponent } from './pages/cv/cv.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'cv', component: CvComponent }
];
