import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-confirm-email-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink],
  template: `
    <div class="auth-card card">
      <h2 class="title">Check your email</h2>
      <p class="subtitle">
        We sent a confirmation link to your inbox. Click it to activate your account, then sign in.
      </p>
      <a routerLink="/login" class="btn btn-primary">Go to sign in</a>
    </div>
  `,
  styles: `
    .auth-card { width: min(100%, 420px); padding: var(--space-2xl); text-align: center; }
    .title { margin: 0; font-family: 'Fraunces', serif; font-size: 1.75rem; font-weight: 700; }
    .subtitle { margin: var(--space-sm) 0 var(--space-xl); color: var(--color-text-secondary); line-height: 1.5; }
  `,
})
export class ConfirmEmailPageComponent {}
