import { Routes } from '@angular/router';

export const BOOKING_ROUTES: Routes = [
  {
    path: ':showtimeId/seats',
    loadComponent: () =>
      import('./pages/seat-selection/seat-selection').then((m) => m.SeatSelection),
  },
  {
    path: 'payment',
    loadComponent: () => import('./pages/payment/payment').then((m) => m.Payment),
  },
];
