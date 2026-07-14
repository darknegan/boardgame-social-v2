import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/auth/auth.service';

@Component({
  selector: 'app-signup-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ReactiveFormsModule, RouterLink],
  template: `
    <div class="auth-card card">
      <h2 class="title">Create account</h2>
      <p class="subtitle">Join the tabletop community.</p>

      <form [formGroup]="form" (ngSubmit)="onSubmit()">
        <label class="field">
          <span>Email</span>
          <input class="input" type="email" formControlName="email" autocomplete="email" />
        </label>
        <label class="field">
          <span>Password</span>
          <input class="input" type="password" formControlName="password" autocomplete="new-password" />
        </label>
        @if (error()) {
          <p class="error" role="alert">{{ error() }}</p>
        }
        @if (success()) {
          <p class="success" role="status">{{ success() }}</p>
        }
        <button class="btn btn-primary submit" type="submit" [disabled]="form.invalid || submitting()">
          Sign up
        </button>
      </form>

      <p class="links">
        <a routerLink="/login">Already have an account?</a>
      </p>
    </div>
  `,
  styles: `
    .auth-card { width: min(100%, 420px); padding: var(--space-2xl); }
    .title { margin: 0; font-family: 'Fraunces', serif; font-size: 1.75rem; font-weight: 700; }
    .subtitle { margin: var(--space-sm) 0 var(--space-xl); color: var(--color-text-secondary); }
    .field { display: flex; flex-direction: column; gap: var(--space-xs); margin-bottom: var(--space-lg); font-size: 0.875rem; font-weight: 600; color: var(--color-text-secondary); }
    .submit { width: 100%; margin-top: var(--space-sm); }
    .error { color: var(--color-danger); font-size: 0.875rem; margin: 0 0 var(--space-md); }
    .success { color: var(--color-primary); font-size: 0.875rem; margin: 0 0 var(--space-md); }
    .links { margin: var(--space-lg) 0 0; text-align: center; font-size: 0.875rem; a { color: var(--color-primary); font-weight: 600; } }
  `,
})
export class SignupPageComponent {
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);
  private readonly fb = inject(FormBuilder);

  readonly form = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
  });
  readonly error = signal('');
  readonly success = signal('');
  readonly submitting = signal(false);

  async onSubmit(): Promise<void> {
    if (this.form.invalid) return;
    this.submitting.set(true);
    this.error.set('');
    try {
      const { email, password } = this.form.getRawValue();
      await this.auth.signUp(email, password);
      this.success.set('Check your email to confirm your account.');
      setTimeout(() => this.router.navigate(['/confirm-email']), 1500);
    } catch (e) {
      this.error.set(e instanceof Error ? e.message : 'Sign up failed');
    } finally {
      this.submitting.set(false);
    }
  }
}
