import { ChangeDetectionStrategy, Component, inject, input, output, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CreateEventDto, EventKind, ExperienceLevel, GameEvent, Venue } from '@bgs/shared';
import { EventsApiService } from '../../core/api/events-api.service';
import { LocationsApiService } from '../../core/api/locations-api.service';
import { ToastService } from '../../shared/components/toast/toast.service';

@Component({
  selector: 'app-create-event-modal',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ReactiveFormsModule],
  template: `
    <div class="backdrop" (click)="close()" role="presentation">
      <div class="modal card" role="dialog" aria-labelledby="create-event-title" (click)="$event.stopPropagation()">
        <h2 id="create-event-title">Create event</h2>

        <form [formGroup]="form" (ngSubmit)="onSubmit()">
          <label class="field">
            <span>Title</span>
            <input class="input" type="text" formControlName="title" />
          </label>

          <label class="field">
            <span>Description</span>
            <textarea class="input" formControlName="description" rows="3"></textarea>
          </label>

          <label class="field">
            <span>Kind</span>
            <select class="input" formControlName="kind">
              <option value="regular">Regular game night</option>
              <option value="playtest">Playtest</option>
              <option value="demo">Demo</option>
            </select>
          </label>

          <label class="field">
            <span>Venue</span>
            <select class="input" formControlName="location_id">
              <option value="">Select venue</option>
              @for (venue of venues(); track venue.id) {
                <option [value]="venue.id">{{ venue.name }}</option>
              }
            </select>
          </label>

          <div class="row">
            <label class="field">
              <span>Start</span>
              <input class="input" type="datetime-local" formControlName="start_time" />
            </label>
            <label class="field">
              <span>End</span>
              <input class="input" type="datetime-local" formControlName="end_time" />
            </label>
          </div>

          <div class="row">
            <label class="field">
              <span>Min players</span>
              <input class="input" type="number" formControlName="min_players" min="1" />
            </label>
            <label class="field">
              <span>Max players</span>
              <input class="input" type="number" formControlName="max_players" min="1" />
            </label>
          </div>

          <div class="actions">
            <button class="btn btn-secondary" type="button" (click)="close()">Cancel</button>
            <button class="btn btn-primary" type="submit" [disabled]="form.invalid || submitting()">
              Create
            </button>
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
      width: min(100%, 520px);
      padding: var(--space-xl);
      max-height: 90vh;
      overflow: auto;
    }

    .modal h2 {
      margin: 0 0 var(--space-xl);
      font-family: 'Fraunces', serif;
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

    .row {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: var(--space-md);
    }

    textarea.input {
      resize: vertical;
    }

    .actions {
      display: flex;
      justify-content: flex-end;
      gap: var(--space-md);
    }
  `,
})
export class CreateEventModalComponent {
  readonly closed = output<void>();
  readonly created = output<GameEvent>();

  private readonly events = inject(EventsApiService);
  private readonly locations = inject(LocationsApiService);
  private readonly toast = inject(ToastService);
  private readonly fb = inject(FormBuilder);

  readonly submitting = signal(false);
  readonly venues = signal<Venue[]>([]);

  readonly form = this.fb.nonNullable.group({
    title: ['', Validators.required],
    description: [''],
    kind: ['regular' as EventKind, Validators.required],
    location_id: ['', Validators.required],
    start_time: ['', Validators.required],
    end_time: ['', Validators.required],
    min_players: [2, Validators.required],
    max_players: [6, Validators.required],
    experience_required: ['any' as ExperienceLevel],
    recurring: [false],
    image: [''],
  });

  constructor() {
    this.locations.getVenues().subscribe({
      next: (v) => this.venues.set(v),
    });
  }

  close(): void {
    this.closed.emit();
  }

  onSubmit(): void {
    if (this.form.invalid) return;
    this.submitting.set(true);
    const raw = this.form.getRawValue();
    const dto: CreateEventDto = {
      gameEvent: {
        title: raw.title,
        description: raw.description,
        kind: raw.kind,
        image: raw.image,
        created_by: '',
        location_id: raw.location_id,
        start_time: new Date(raw.start_time).toISOString(),
        end_time: new Date(raw.end_time).toISOString(),
        recurring: raw.recurring,
        min_players: raw.min_players,
        max_players: raw.max_players,
        experience_required: raw.experience_required,
      },
    };

    this.events.createEvent(dto).subscribe({
      next: (event) => {
        this.toast.success('Event created');
        this.created.emit(event);
      },
      error: () => this.submitting.set(false),
      complete: () => this.submitting.set(false),
    });
  }
}
