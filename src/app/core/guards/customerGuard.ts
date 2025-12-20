import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const customerGuard: CanActivateFn = () => {
  const router = inject(Router);
  const token = localStorage.getItem('token');

  if (token) {
    return true;
  }

  router.navigate(['/auth']); // or /auth/login
  return false;
};
