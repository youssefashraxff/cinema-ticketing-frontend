import { Routes } from '@angular/router';

export const ADMIN_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('../admin/movies-management/pages/movies-management/movies-management').then(
        (m) => m.MoviesManagement
      ),
  },
  {
    path: 'movies',
    loadComponent: () =>
      import('../admin/movies-management/pages/movies-management/movies-management').then(
        (m) => m.MoviesManagement
      ),
  },
  {
    path: 'shows',
    loadComponent: () =>
      import('../admin/shows-management/pages/shows-management/shows-management').then(
        (m) => m.ShowsManagement
      ),
  },
  {
    path: 'halls',
    loadComponent: () =>
      import('../admin/halls-management/pages/halls-management/halls-management').then(
        (m) => m.HallsManagement
      ),
  },
];
