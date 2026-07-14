import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { CollectionsApiService } from '../../core/api/collections-api.service';
import { AuthService } from '../../core/auth/auth.service';

@Component({
  selector: 'app-import-games-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ReactiveFormsModule],
  template: `
    <div class="import card">
      <h1 class="title">Import your collection</h1>
      <p class="subtitle">Enter your BoardGameGeek username to sync owned games.</p>

      <form [formGroup]="form" (ngSubmit)="onSubmit()">
        <label class="field">
          <span>BGG username</span>
          <input class="input" formControlName="username" placeholder="e.g. alexplays" />
        </label>
        @if (error()) {
          <p class="error" role="alert">{{ error() }}</p>
        }
        @if (result()) {
          <p class="success" role="status">Imported {{ result() }} games!</p>
        }
        <div class="actions">
          <button class="btn btn-primary" type="submit" [disabled]="form.invalid || importing()">
            {{ importing() ? 'Importing…' : 'Import from BGG' }}
          </button>
          <button type="button" class="btn btn-secondary" (click)="skip()">Skip for now</button>
        </div>
      </form>
    </div>
  `,
  styles: `
    .import { max-width: 480px; margin: 0 auto; padding: var(--space-2xl); }
    .title { margin: 0; font-family: 'Fraunces', serif; font-size: 1.75rem; }
    .subtitle { margin: var(--space-sm) 0 var(--space-xl); color: var(--color-text-secondary); }
    .field { display: flex; flex-direction: column; gap: var(--space-xs); margin-bottom: var(--space-lg); font-size: 0.875rem; font-weight: 600; color: var(--color-text-secondary); }
    .actions { display: flex; gap: var(--space-md); flex-wrap: wrap; }
    .error { color: var(--color-danger); font-size: 0.875rem; }
    .success { color: var(--color-primary); font-size: 0.875rem; }
  `,
})
export class ImportGamesPageComponent {
  private readonly collections = inject(CollectionsApiService);
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);
  private readonly fb = inject(FormBuilder);

  readonly form = this.fb.nonNullable.group({
    username: [this.auth.profile()?.bgg_username ?? '', Validators.required],
  });
  readonly error = signal('');
  readonly result = signal<number | null>(null);
  readonly importing = signal(false);

  async onSubmit(): Promise<void> {
    if (this.form.invalid) return;
    this.importing.set(true);
    this.error.set('');
    try {
      const { username } = this.form.getRawValue();
      const res = await firstValueFrom(this.collections.importFromBgg(username));
      this.result.set((res as { imported: number }).imported ?? 0);
      await this.auth.loadProfile(this.auth.user()?.id ?? '');
      setTimeout(() => this.router.navigate(['/']), 1500);
    } catch (e) {
      this.error.set(e instanceof Error ? e.message : 'Import failed');
    } finally {
      this.importing.set(false);
    }
  }

  skip(): void {
    this.router.navigate(['/']);
  }
}
