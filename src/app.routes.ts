
import { Routes } from '@angular/router';
import { PageViewComponent } from './components/page-view.component';
import { FileManagerComponent } from './components/file-manager.component';

export const routes: Routes = [
  { path: '', redirectTo: 'page/home', pathMatch: 'full' },
  // Specific route for the repository to intercept the generic :id matcher
  { path: 'page/repository', component: FileManagerComponent }, 
  { path: 'page/:id', component: PageViewComponent },
  { path: '**', redirectTo: 'page/home' }
];
