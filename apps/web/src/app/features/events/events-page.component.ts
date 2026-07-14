import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { GameEvent } from '@bgs/shared';
import { EventsApiService } from '../../core/api/events-api.service';
import { PageHeaderComponent } from '../../shared/components/page-header/page-header.component';
import { EmptyStateComponent } from '../../shared/components/empty-state/empty-state.component';
import { SkeletonComponent } from '../../shared/components/skeleton/skeleton.component';
import { CreateEventModalComponent } from './create-event-modal.component';

@Component({
  selector: 'app-events-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [PageHeaderComponent, EmptyStateComponent, SkeletonComponent, CreateEventModalComponent],
  template: `
    <app-page-header
      title="Events"
      subtitle="Find and host game nights."
      overline="Community"
    >
      <button class="btn btn-primary" type="button" (click)="showCreate.set(true)">Create event</button>
    </app-page-header>

    @if (loading()) {
      <div class="event-list">
        @for (i of [1, 2, 3]; track i) {
          <app-skeleton height="120px" />
        }
      </div>
    } @else if (events().length === 0) {
      <app-empty-state
        title="No upcoming events"
        message="Be the first to host a game night!"
        icon="📅"
      >
        <button class="btn btn-primary" type="button" (click)="showCreate.set(true)">Create event</button>
      </app-empty-state>
    } @else {
      <div class="event-list">
        @for (event of events(); track event.id) {
          <article class="event-card card">
            <div class="event-meta">
              <span class="badge">{{ event.kind }}</span>
              <time>{{ formatDate(event.start_time) }}</time>
            </div>
            <h2 class="event-title">{{ event.title }}</h2>
            <p class="event-desc">{{ event.description }}</p>
            <p class="event-players">{{ event.min_players }}–{{ event.max_players }} players</p>
          </article>
        }
      </div>
    }

    @if (showCreate()) {
      <app-create-event-modal
        (closed)="showCreate.set(false)"
        (created)="onCreated($event)"
      />
    }
  `,
  styles: `
    .event-list {
      display: flex;
      flex-direction: column;
      gap: var(--space-lg);
      max-width: 720px;
    }

    .event-card {
      padding: var(--space-xl);
    }

    .event-meta {
      display: flex;
      align-items: center;
      gap: var(--space-md);
      margin-bottom: var(--space-sm);
      font-size: 0.8125rem;
      color: var(--color-text-muted);
    }

    .badge {
      padding: 0.2rem 0.6rem;
      border-radius: var(--radius-full);
      background: var(--color-primary-soft);
      color: var(--color-primary);
      font-weight: 700;
      text-transform: uppercase;
      font-size: 0.6875rem;
    }

    .event-title {
      margin: 0 0 var(--space-sm);
      font-family: 'Fraunces', serif;
      font-size: 1.25rem;
    }

    .event-desc {
      margin: 0 0 var(--space-sm);
      color: var(--color-text-secondary);
      line-height: 1.5;
    }

    .event-players {
      margin: 0;
      font-size: 0.875rem;
      font-weight: 600;
      color: var(--color-text-muted);
    }
  `,
})
export class EventsPageComponent implements OnInit {
  private readonly eventsApi = inject(EventsApiService);

  readonly loading = signal(true);
  readonly showCreate = signal(false);
  readonly events = signal<GameEvent[]>([]);

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.eventsApi.listEvents().subscribe({
      next: (list) => {
        this.events.set(list);
        this.loading.set(false);
      },
      error: () => this.loading.set(false),
    });
  }

  onCreated(event: GameEvent): void {
    this.showCreate.set(false);
    this.events.update((list) => [event, ...list]);
  }

  formatDate(iso: string): string {
    return new Date(iso).toLocaleString(undefined, {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
    });
  }
}
