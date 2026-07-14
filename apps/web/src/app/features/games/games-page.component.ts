import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { GameItem } from '@bgs/shared';
import { GamesApiService } from '../../core/api/games-api.service';
import { PageHeaderComponent } from '../../shared/components/page-header/page-header.component';
import { EmptyStateComponent } from '../../shared/components/empty-state/empty-state.component';
import { SkeletonComponent } from '../../shared/components/skeleton/skeleton.component';

@Component({
  selector: 'app-games-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [PageHeaderComponent, RouterLink, EmptyStateComponent, SkeletonComponent],
  template: `
    <app-page-header title="Games" subtitle="Explore the global catalog." overline="Browse" />

    <div class="search-bar">
      <input
        class="input"
        type="search"
        placeholder="Search games…"
        [value]="query()"
        (input)="onSearch($event)"
      />
    </div>

    @if (loading()) {
      <div class="game-grid">
        @for (i of [1, 2, 3, 4, 5, 6]; track i) {
          <app-skeleton height="200px" />
        }
      </div>
    } @else if (games().length === 0) {
      <app-empty-state title="No games found" message="Try a different search term." icon="🎯" />
    } @else {
      <div class="game-grid">
        @for (game of games(); track game.gameId) {
          <a class="game-card card" [routerLink]="['/game-overview', game.gameId]">
            <img [src]="game.thumbnailUrl || game.imageUrl" [alt]="game.name" loading="lazy" />
            <div class="game-info">
              <p class="game-name">{{ game.name }}</p>
              <p class="game-meta">Rank #{{ game.rank }} · {{ game.yearPublished }}</p>
            </div>
          </a>
        }
      </div>
      @if (!searching()) {
        <button class="btn btn-secondary load-more" type="button" (click)="loadMore()" [disabled]="loadingMore()">
          {{ loadingMore() ? 'Loading…' : 'Load more' }}
        </button>
      }
    }
  `,
  styles: `
    .search-bar {
      margin-bottom: var(--space-xl);
      max-width: 400px;
    }

    .game-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
      gap: var(--space-lg);
    }

    .game-card {
      overflow: hidden;

      img {
        width: 100%;
        aspect-ratio: 1;
        object-fit: cover;
      }
    }

    .game-info {
      padding: var(--space-sm) var(--space-md);
    }

    .game-name {
      margin: 0;
      font-size: 0.8125rem;
      font-weight: 700;
    }

    .game-meta {
      margin: var(--space-xs) 0 0;
      font-size: 0.75rem;
      color: var(--color-text-muted);
    }

    .load-more {
      margin-top: var(--space-xl);
    }
  `,
})
export class GamesPageComponent implements OnInit {
  private readonly gamesApi = inject(GamesApiService);
  private searchTimeout: ReturnType<typeof setTimeout> | null = null;

  readonly loading = signal(true);
  readonly loadingMore = signal(false);
  readonly searching = signal(false);
  readonly query = signal('');
  readonly games = signal<GameItem[]>([]);
  private offset = 0;
  private readonly pageSize = 24;

  ngOnInit(): void {
    this.loadCatalog();
  }

  onSearch(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.query.set(value);
    if (this.searchTimeout) clearTimeout(this.searchTimeout);
    this.searchTimeout = setTimeout(() => {
      if (value.trim().length < 2) {
        this.searching.set(false);
        this.offset = 0;
        this.loadCatalog();
        return;
      }
      this.searching.set(true);
      this.loading.set(true);
      this.gamesApi.search(value.trim()).subscribe({
        next: (results) => {
          this.games.set(
            results.map((r) => ({
              gameId: Number(r.value),
              bggGameId: Number(r.value),
              name: r.label,
              imageUrl: '',
              thumbnailUrl: '',
              rank: 0,
              average: 0,
              bayesAverage: 0,
              playerCount: 0,
              yearPublished: 0,
              abstractsRank: 0,
              cgsRank: 0,
              childrensGamesRank: 0,
              familyGamesRank: 0,
              partyGamesRank: 0,
              strategyGamesRank: 0,
              thematicRank: 0,
              warGamesRank: 0,
            })),
          );
          this.loading.set(false);
        },
        error: () => this.loading.set(false),
      });
    }, 300);
  }

  loadCatalog(): void {
    this.loading.set(true);
    this.gamesApi.getAll(this.pageSize, 0).subscribe({
      next: (items) => {
        this.games.set(items);
        this.offset = items.length;
        this.loading.set(false);
      },
      error: () => this.loading.set(false),
    });
  }

  loadMore(): void {
    this.loadingMore.set(true);
    this.gamesApi.getAll(this.pageSize, this.offset).subscribe({
      next: (items) => {
        this.games.update((current) => [...current, ...items]);
        this.offset += items.length;
        this.loadingMore.set(false);
      },
      error: () => this.loadingMore.set(false),
    });
  }
}
