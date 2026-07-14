import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../core/auth/auth.service';

@Component({
  selector: 'app-forgot-password-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ReactiveFormsModule, RouterLink],
  template: `
    <div class="auth-card card">
      <h2 class="title">Reset password</h2>
      <p class="subtitle">We'll email you a reset link.</p>

      <form [formGroup]="form" (ngSubmit)="onSubmit()">
        <label class="field">
          <span>Email</span>
          <input class="input" type="email" formControlName="email" autocomplete="email" />
        </label>
        @if (error()) {
          <p class="error" role="alert">{{ error() }}</p>
        }
        @if (success()) {
          <p class="success" role="status">{{ success() }}</p>
        }
        <button class="btn btn-primary submit" type="submit" [disabled]="form.invalid || submitting()">
          Send reset link
        </button>
      </form>

      <p class="links"><a routerLink="/login">Back to sign in</a></p>
    </div>
  `,
  styles: `
    .auth-card { width: min(100%, 420px); padding: var(--space-2xl); }
    .title { margin: 0; font-family: 'Fraunces', serif; font-size: 1.75rem; font-weight: 700; }
    .subtitle { margin: var(--space-sm) 0 var(--space-xl); color: var(--color-text-secondary); }
    .field { display: flex; flex-direction: column; gap: var(--space-xs); margin-bottom: var(--space-lg); font-size: 0.875rem; font-weight: 600; color: var(--color-text-secondary); }
    .submit { width: 100%; }
    .error { color: var(--color-danger); font-size: 0.875rem; }
    .success { color: var(--color-primary); font-size: 0.875rem; }
    .links { margin: var(--space-lg) 0 0; text-align: center; font-size: 0.875rem; a { color: var(--color-primary); font-weight: 600; } }
  `,
})
export class ForgotPasswordPageComponent {
  private readonly auth = inject(AuthService);
  private readonly fb = inject(FormBuilder);

  readonly form = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
  });
  readonly error = signal('');
  readonly success = signal('');
  readonly submitting = signal(false);

  async onSubmit(): Promise<void> {
    if (this.form.invalid) return;
    this.submitting.set(true);
    this.error.set('');
    try {
      await this.auth.resetPassword(this.form.getRawValue().email);
      this.success.set('Check your inbox for a reset link.');
    } catch (e) {
      this.error.set(e instanceof Error ? e.message : 'Request failed');
    } finally {
      this.submitting.set(false);
    }
  }
}
