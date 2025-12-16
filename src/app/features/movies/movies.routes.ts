import { Routes } from '@angular/router';

export const MOVIE_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/movies/movies').then((m) => m.Movies),
  },
  {
    path: ':id',
    loadComponent: () => import('./pages/movie-details/movie-details').then((m) => m.MovieDetails),
  },
];
