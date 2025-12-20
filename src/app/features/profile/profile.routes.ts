import { Routes } from '@angular/router';
import { customerGuard } from '../../core/guards/customerGuard';

export const PROFILE_ROUTES: Routes = [
  {
    path: '',
    canActivate: [customerGuard],
    loadComponent: () => import('./pages/profile/profile').then((m) => m.Profile),
  },
];
