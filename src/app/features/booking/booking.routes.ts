import { Routes } from '@angular/router';
import { customerGuard } from '../../core/guards/customerGuard';

export const BOOKING_ROUTES: Routes = [
  {
    canActivate: [customerGuard],
    path: ':showId/seats',
    loadComponent: () =>
      import('./pages/seat-selection/seat-selection').then((m) => m.SeatSelection),
  },
];
