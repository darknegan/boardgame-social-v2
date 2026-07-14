import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CollectionTableItem } from '@bgs/shared';
import { AuthService } from '../../core/auth/auth.service';
import { CollectionsApiService } from '../../core/api/collections-api.service';
import { PageHeaderComponent } from '../../shared/components/page-header/page-header.component';
import { EmptyStateComponent } from '../../shared/components/empty-state/empty-state.component';
import { SkeletonComponent } from '../../shared/components/skeleton/skeleton.component';
import { ToastService } from '../../shared/components/toast/toast.service';

@Component({
  selector: 'app-collection-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [PageHeaderComponent, RouterLink, EmptyStateComponent, SkeletonComponent],
  template: `
    <app-page-header
      title="Collection"
      subtitle="Browse and manage your owned games."
      overline="Shelf"
    >
      <button class="btn btn-primary" type="button" (click)="importCollection()" [disabled]="importing()">
        {{ importing() ? 'Importing…' : 'Sync from BGG' }}
      </button>
    </app-page-header>

    @if (loading()) {
      <div class="game-grid">
        @for (i of [1, 2, 3, 4, 5, 6]; track i) {
          <app-skeleton height="200px" />
        }
      </div>
    } @else if (error()) {
      <app-empty-state title="Could not load collection" [message]="error()" icon="⚠️">
        <button class="btn btn-secondary" type="button" (click)="load()">Retry</button>
      </app-empty-state>
    } @else if (games().length === 0) {
      <app-empty-state
        title="Your shelf is empty"
        message="Import your BoardGameGeek collection to get started."
        icon="📚"
      >
        <button class="btn btn-primary" type="button" (click)="importCollection()">Import from BGG</button>
      </app-empty-state>
    } @else {
      <p class="count">{{ games().length }} games</p>
      <div class="game-grid">
        @for (game of games(); track game.id) {
          <a class="game-card card" [routerLink]="['/game-overview', game.game_id]">
            <img [src]="game.thumbnail_url || game.image_url" [alt]="game.name" loading="lazy" />
            <p class="game-name">{{ game.name }}</p>
          </a>
        }
      </div>
    }
  `,
  styles: `
    .count {
      margin: 0 0 var(--space-lg);
      color: var(--color-text-muted);
      font-size: 0.875rem;
      font-weight: 600;
    }

    .game-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
      gap: var(--space-lg);
    }

    .game-card {
      overflow: hidden;
      transition: transform 0.15s ease;

      &:hover {
        transform: translateY(-2px);
      }

      img {
        width: 100%;
        aspect-ratio: 1;
        object-fit: cover;
      }
    }

    .game-name {
      margin: 0;
      padding: var(--space-sm) var(--space-md);
      font-size: 0.8125rem;
      font-weight: 700;
    }
  `,
})
export class CollectionPageComponent implements OnInit {
  private readonly collections = inject(CollectionsApiService);
  private readonly auth = inject(AuthService);
  private readonly toast = inject(ToastService);

  readonly loading = signal(true);
  readonly importing = signal(false);
  readonly error = signal('');
  readonly games = signal<CollectionTableItem[]>([]);

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.loading.set(true);
    this.error.set('');
    this.collections.getCollection().subscribe({
      next: (items) => {
        this.games.set(items);
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set(err?.message ?? 'Failed to load collection');
        this.loading.set(false);
      },
    });
  }

  importCollection(): void {
    const username = this.auth.profile()?.bgg_username;
    if (!username) {
      this.toast.error('Set your BGG username in profile settings first');
      return;
    }
    this.importing.set(true);
    this.collections.importFromBgg(username).subscribe({
      next: () => {
        this.toast.success('Collection imported');
        this.importing.set(false);
        this.load();
      },
      error: () => this.importing.set(false),
    });
  }
}
