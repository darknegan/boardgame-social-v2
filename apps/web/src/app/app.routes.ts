import { Routes } from '@angular/router';
import {
  authGuard,
  guestGuard,
  onboardingGuard,
  onboardingImportGuard,
  onboardingOnlyGuard,
} from './core/auth/auth.guard';
import { AppShellComponent } from './layout/app-shell/app-shell.component';
import { AuthLayoutComponent } from './layout/auth-layout/auth-layout.component';

export const routes: Routes = [
  {
    path: '',
    component: AppShellComponent,
    canActivate: [authGuard, onboardingGuard],
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./features/home/home-page.component').then((m) => m.HomePageComponent),
      },
      {
        path: 'profile',
        loadComponent: () =>
          import('./features/profile/profile-page.component').then((m) => m.ProfilePageComponent),
      },
      {
        path: 'profile/edit',
        loadComponent: () =>
          import('./features/profile/profile-edit-page.component').then(
            (m) => m.ProfileEditPageComponent,
          ),
      },
      {
        path: 'user/:username',
        loadComponent: () =>
          import('./features/profile/user-profile-page.component').then(
            (m) => m.UserProfilePageComponent,
          ),
      },
      {
        path: 'collection',
        loadComponent: () =>
          import('./features/collection/collection-page.component').then(
            (m) => m.CollectionPageComponent,
          ),
      },
      {
        path: 'games',
        loadComponent: () =>
          import('./features/games/games-page.component').then((m) => m.GamesPageComponent),
      },
      {
        path: 'game-overview/:id',
        loadComponent: () =>
          import('./features/games/game-overview-page.component').then(
            (m) => m.GameOverviewPageComponent,
          ),
      },
      {
        path: 'play',
        loadComponent: () =>
          import('./features/tier-list/tier-list-page.component').then(
            (m) => m.TierListPageComponent,
          ),
      },
      {
        path: 'events',
        loadComponent: () =>
          import('./features/events/events-page.component').then((m) => m.EventsPageComponent),
      },
      {
        path: 'settings',
        loadComponent: () =>
          import('./features/settings/settings-page.component').then(
            (m) => m.SettingsPageComponent,
          ),
      },
      {
        path: 'tokens-preview',
        loadComponent: () =>
          import('./features/dev/tokens-preview-page.component').then(
            (m) => m.TokensPreviewPageComponent,
          ),
      },
    ],
  },
  {
    path: 'onboarding',
    component: AuthLayoutComponent,
    canActivate: [authGuard],
    children: [
      {
        path: '',
        canActivate: [onboardingOnlyGuard],
        loadComponent: () =>
          import('./features/onboarding/onboarding-page.component').then(
            (m) => m.OnboardingPageComponent,
          ),
      },
      {
        path: 'import-games',
        canActivate: [onboardingImportGuard],
        loadComponent: () =>
          import('./features/onboarding/import-games-page.component').then(
            (m) => m.ImportGamesPageComponent,
          ),
      },
    ],
  },
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      {
        path: 'login',
        canActivate: [guestGuard],
        loadComponent: () =>
          import('./features/auth/login-page.component').then((m) => m.LoginPageComponent),
      },
      {
        path: 'signup',
        canActivate: [guestGuard],
        loadComponent: () =>
          import('./features/auth/signup-page.component').then((m) => m.SignupPageComponent),
      },
      {
        path: 'forgot-password',
        canActivate: [guestGuard],
        loadComponent: () =>
          import('./features/auth/forgot-password-page.component').then(
            (m) => m.ForgotPasswordPageComponent,
          ),
      },
      {
        path: 'confirm-email',
        loadComponent: () =>
          import('./features/auth/confirm-email-page.component').then(
            (m) => m.ConfirmEmailPageComponent,
          ),
      },
      {
        path: 'reset-password',
        loadComponent: () =>
          import('./features/auth/reset-password-page.component').then(
            (m) => m.ResetPasswordPageComponent,
          ),
      },
    ],
  },
  { path: '**', redirectTo: '' },
];
