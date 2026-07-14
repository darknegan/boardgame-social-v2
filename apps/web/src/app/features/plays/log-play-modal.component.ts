import { ChangeDetectionStrategy, Component, inject, input, output, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/auth/auth.service';
import { PlaysApiService } from '../../core/api/plays-api.service';
import { ToastService } from '../../shared/components/toast/toast.service';

@Component({
  selector: 'app-log-play-modal',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ReactiveFormsModule],
  template: `
    <div class="backdrop" (click)="close()" role="presentation">
      <div class="modal card" role="dialog" aria-labelledby="log-play-title" (click)="$event.stopPropagation()">
        <h2 id="log-play-title">Log a play</h2>
        <p class="game-name">{{ gameName() }}</p>

        <form [formGroup]="form" (ngSubmit)="onSubmit()">
          <label class="field">
            <span>Notes</span>
            <textarea class="input" formControlName="description" rows="3" placeholder="How did it go?"></textarea>
          </label>

          <label class="field">
            <span>Your score</span>
            <input class="input" type="number" formControlName="score" />
          </label>

          <label class="field checkbox">
            <input type="checkbox" formControlName="winner" />
            <span>I won</span>
          </label>

          <div class="actions">
            <button class="btn btn-secondary" type="button" (click)="close()">Cancel</button>
            <button class="btn btn-primary" type="submit" [disabled]="submitting()">Log play</button>
          </div>
        </form>
      </div>
    </div>
  `,
  styles: `
    .backdrop {
      position: fixed;
      inset: 0;
      background: rgba(43, 32, 24, 0.4);
      display: grid;
      place-items: center;
      z-index: 50;
      padding: var(--space-lg);
    }

    .modal {
      width: min(100%, 440px);
      padding: var(--space-xl);
    }

    .modal h2 {
      margin: 0;
      font-family: 'Fraunces', serif;
    }

    .game-name {
      margin: var(--space-sm) 0 var(--space-xl);
      color: var(--color-text-secondary);
      font-weight: 600;
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

    .checkbox {
      flex-direction: row;
      align-items: center;
    }

    textarea.input {
      resize: vertical;
      min-height: 80px;
    }

    .actions {
      display: flex;
      justify-content: flex-end;
      gap: var(--space-md);
    }
  `,
})
export class LogPlayModalComponent {
  readonly gameId = input.required<string>();
  readonly gameName = input.required<string>();
  readonly closed = output<void>();
  readonly saved = output<void>();

  private readonly plays = inject(PlaysApiService);
  private readonly auth = inject(AuthService);
  private readonly toast = inject(ToastService);
  private readonly fb = inject(FormBuilder);

  readonly submitting = signal(false);

  readonly form = this.fb.nonNullable.group({
    description: [''],
    score: [0, Validators.required],
    winner: [false],
  });

  close(): void {
    this.closed.emit();
  }

  onSubmit(): void {
    const userId = this.auth.user()?.id;
    const profile = this.auth.profile();
    if (!userId) return;

    this.submitting.set(true);
    const { description, score, winner } = this.form.getRawValue();

    this.plays
      .logPlay({
        created_by: userId,
        description,
        game: { game_id: this.gameId(), name: this.gameName() },
        location_id: '',
        start_time: new Date().toISOString(),
        players: [
          {
            name: profile?.display_name ?? profile?.username ?? 'You',
            user_id: userId,
            score,
            winner,
          },
        ],
      })
      .subscribe({
        next: () => {
          this.toast.success('Play logged');
          this.saved.emit();
        },
        error: () => this.submitting.set(false),
        complete: () => this.submitting.set(false),
      });
  }
}
