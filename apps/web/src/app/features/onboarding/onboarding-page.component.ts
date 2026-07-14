import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/auth/auth.service';

@Component({
  selector: 'app-onboarding-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ReactiveFormsModule, RouterLink],
  template: `
    <div class="onboarding card">
      <h1 class="title">Set up your profile</h1>
      <p class="subtitle">Tell us a bit about yourself to get started.</p>

      <form [formGroup]="form" (ngSubmit)="onSubmit()">
        <label class="field">
          <span>Username</span>
          <input class="input" formControlName="username" autocomplete="username" />
        </label>
        <label class="field">
          <span>Display name</span>
          <input class="input" formControlName="display_name" autocomplete="name" />
        </label>
        <label class="field">
          <span>Avatar</span>
          <input type="file" accept="image/*" (change)="onFile($event)" />
        </label>
        @if (error()) {
          <p class="error" role="alert">{{ error() }}</p>
        }
        <button class="btn btn-primary" type="submit" [disabled]="form.invalid || submitting()">
          Continue
        </button>
      </form>

      <p class="skip">
        <a routerLink="/onboarding/import-games">Skip to BGG import →</a>
      </p>
    </div>
  `,
  styles: `
    .onboarding { max-width: 480px; margin: 0 auto; padding: var(--space-2xl); }
    .title { margin: 0; font-family: 'Fraunces', serif; font-size: 1.75rem; }
    .subtitle { margin: var(--space-sm) 0 var(--space-xl); color: var(--color-text-secondary); }
    .field { display: flex; flex-direction: column; gap: var(--space-xs); margin-bottom: var(--space-lg); font-size: 0.875rem; font-weight: 600; color: var(--color-text-secondary); }
    .error { color: var(--color-danger); font-size: 0.875rem; }
    .skip { margin-top: var(--space-lg); text-align: center; font-size: 0.875rem; a { color: var(--color-primary); font-weight: 600; } }
  `,
})
export class OnboardingPageComponent {
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);
  private readonly fb = inject(FormBuilder);

  readonly form = this.fb.nonNullable.group({
    username: ['', [Validators.required, Validators.minLength(3)]],
    display_name: ['', Validators.required],
  });
  readonly error = signal('');
  readonly submitting = signal(false);
  private avatarFile: File | null = null;

  onFile(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.avatarFile = input.files?.[0] ?? null;
  }

  async onSubmit(): Promise<void> {
    if (this.form.invalid) return;
    this.submitting.set(true);
    this.error.set('');
    try {
      await this.auth.updateProfile(this.form.getRawValue());
      if (this.avatarFile) {
        await this.auth.uploadAvatar(this.avatarFile);
      }
      await this.router.navigate(['/onboarding/import-games']);
    } catch (e) {
      this.error.set(e instanceof Error ? e.message : 'Setup failed');
    } finally {
      this.submitting.set(false);
    }
  }
}
