import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

export const authGuard: CanActivateFn = async () => {
  const auth = inject(AuthService);
  const router = inject(Router);

  await auth.waitUntilReady();

  if (auth.isAuthenticated()) return true;
  return router.createUrlTree(['/login']);
};

export const guestGuard: CanActivateFn = async () => {
  const auth = inject(AuthService);
  const router = inject(Router);

  await auth.waitUntilReady();

  if (!auth.isAuthenticated()) return true;
  return router.createUrlTree(['/']);
};

export const onboardingGuard: CanActivateFn = async () => {
  const auth = inject(AuthService);
  const router = inject(Router);

  await auth.waitUntilReady();

  if (!auth.isAuthenticated()) return router.createUrlTree(['/login']);
  if (auth.hasProfile()) return true;
  return router.createUrlTree(['/onboarding']);
};

export const onboardingOnlyGuard: CanActivateFn = async () => {
  const auth = inject(AuthService);
  const router = inject(Router);

  await auth.waitUntilReady();

  if (!auth.isAuthenticated()) return router.createUrlTree(['/login']);
  if (!auth.hasProfile()) return true;
  return router.createUrlTree(['/']);
};

export const onboardingImportGuard: CanActivateFn = async () => {
  const auth = inject(AuthService);
  const router = inject(Router);

  await auth.waitUntilReady();

  if (!auth.isAuthenticated()) return router.createUrlTree(['/login']);
  if (auth.hasProfile()) return true;
  return router.createUrlTree(['/onboarding']);
};
