import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/auth/auth.service';
import { AvatarStorageService } from '../../core/supabase/avatar-storage.service';
import { PageHeaderComponent } from '../../shared/components/page-header/page-header.component';
import { ToastService } from '../../shared/components/toast/toast.service';

const USERNAME_PATTERN = /^[a-zA-Z0-9_]{3,20}$/;

@Component({
  selector: 'app-profile-edit-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [PageHeaderComponent, ReactiveFormsModule],
  template: `
    <app-page-header
      title="Edit profile"
      subtitle="Update how you appear to other players."
      overline="Settings"
    />

    <form class="card form" [formGroup]="form" (ngSubmit)="onSubmit()">
      <div class="avatar-row">
        <div class="avatar-preview" aria-hidden="true">
          @if (avatarPreview()) {
            <img [src]="avatarPreview()" alt="" />
          } @else {
            <span>{{ initials() }}</span>
          }
        </div>
        <label class="avatar-upload btn btn-secondary">
          Change photo
          <input
            type="file"
            accept="image/jpeg,image/png,image/webp,image/gif"
            (change)="onAvatarSelected($event)"
            hidden
          />
        </label>
      </div>

      <label class="field">
        <span>Username</span>
        <input class="input" type="text" formControlName="username" autocomplete="username" />
      </label>

      <label class="field">
        <span>Display name</span>
        <input class="input" type="text" formControlName="display_name" autocomplete="name" />
      </label>

      <label class="field">
        <span>BGG username</span>
        <input class="input" type="text" formControlName="bgg_username" placeholder="BoardGameGeek username" />
      </label>

      @if (error()) {
        <p class="error" role="alert">{{ error() }}</p>
      }

      <div class="actions">
        <button class="btn btn-secondary" type="button" (click)="cancel()">Cancel</button>
        <button class="btn btn-primary" type="submit" [disabled]="form.invalid || submitting()">
          Save changes
        </button>
      </div>
    </form>
  `,
  styles: `
    .form {
      max-width: 480px;
      padding: var(--space-xl);
    }

    .avatar-row {
      display: flex;
      align-items: center;
      gap: var(--space-lg);
      margin-bottom: var(--space-xl);
    }

    .avatar-preview {
      width: 72px;
      height: 72px;
      border-radius: var(--radius-full);
      background: linear-gradient(135deg, var(--color-grad-start), var(--color-grad-end));
      color: white;
      display: grid;
      place-items: center;
      font-weight: 700;
      overflow: hidden;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }

    .avatar-upload {
      cursor: pointer;
    }

    .field {
      display: flex;
      flex-direction: column;
      gap: var(--space-xs);
      margin-bottom: var(--space-lg);
      font-size: 0.875rem;
      font-weight: 600;
      color: var(--color-text-secondary);
    }

    .actions {
      display: flex;
      gap: var(--space-md);
      justify-content: flex-end;
    }

    .error {
      color: var(--color-danger);
      font-size: 0.875rem;
    }
  `,
})
export class ProfileEditPageComponent {
  private readonly auth = inject(AuthService);
  private readonly avatarStorage = inject(AvatarStorageService);
  private readonly router = inject(Router);
  private readonly toast = inject(ToastService);
  private readonly fb = inject(FormBuilder);

  readonly error = signal('');
  readonly submitting = signal(false);
  readonly avatarPreview = signal<string | null>(this.auth.profile()?.profile_picture_url ?? null);
  private avatarFile: File | null = null;

  readonly form = this.fb.nonNullable.group({
    username: [
      this.auth.profile()?.username ?? '',
      [Validators.required, Validators.pattern(USERNAME_PATTERN)],
    ],
    display_name: [this.auth.profile()?.display_name ?? ''],
    bgg_username: [this.auth.profile()?.bgg_username ?? ''],
  });

  initials(): string {
    const name = this.form.controls.display_name.value || this.form.controls.username.value || '?';
    return name
      .split(' ')
      .map((p) => p[0])
      .join('')
      .slice(0, 2)
      .toUpperCase();
  }

  onAvatarSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) return;
    const validationError = this.avatarStorage.validateAvatarFile(file);
    if (validationError) {
      this.error.set(validationError);
      return;
    }
    this.avatarFile = file;
    this.avatarPreview.set(URL.createObjectURL(file));
  }

  cancel(): void {
    this.router.navigate(['/profile']);
  }

  async onSubmit(): Promise<void> {
    if (this.form.invalid) return;
    const userId = this.auth.user()?.id;
    if (!userId) return;

    this.submitting.set(true);
    this.error.set('');

    try {
      const { username, display_name, bgg_username } = this.form.getRawValue();
      const updates: Record<string, string> = { username };
      if (display_name.trim()) updates['display_name'] = display_name.trim();
      if (bgg_username.trim()) updates['bgg_username'] = bgg_username.trim();

      if (this.avatarFile) {
        updates['profile_picture_url'] = await this.avatarStorage.uploadAvatar(userId, this.avatarFile);
      }

      await this.auth.updateProfile(updates);
      this.toast.success('Profile updated');
      await this.router.navigate(['/profile']);
    } catch (e) {
      this.error.set(e instanceof Error ? e.message : 'Could not save profile');
    } finally {
      this.submitting.set(false);
    }
  }
}
