import { Routes } from '@angular/router';
import { CustomerLayout } from './core/layouts/customer-layout/customer-layout';
import { AdminLayout } from './core/layouts/admin-layout/admin-layout';

export const routes: Routes = [
  {
    path: 'admin',
    component: AdminLayout,
    loadChildren: () => import('./features/admin/admin.routes').then((m) => m.ADMIN_ROUTES),
  },
  {
    path: '',
    component: CustomerLayout,
    children: [
      {
        path: 'admin',
        loadChildren: () => import('./features/home/home.routes').then((m) => m.HOME_ROUTES),
      },
      {
        path: '',
        loadChildren: () => import('./features/home/home.routes').then((m) => m.HOME_ROUTES),
      },
      {
        path: 'home',
        loadChildren: () => import('./features/home/home.routes').then((m) => m.HOME_ROUTES),
      },
      {
        path: 'movies',
        loadChildren: () => import('./features/movies/movies.routes').then((m) => m.MOVIE_ROUTES),
      },
      {
        path: 'booking',
        loadChildren: () =>
          import('./features/booking/booking.routes').then((m) => m.BOOKING_ROUTES),
      },
      {
        path: 'auth',
        loadChildren: () =>
          import('./features/authentication/auth.routes').then((m) => m.AUTH_ROUTES),
      },
      {
        path: 'profile',
        loadChildren: () =>
          import('./features/profile/profile.routes').then((m) => m.PROFILE_ROUTES),
      },
    ],
  },
];
