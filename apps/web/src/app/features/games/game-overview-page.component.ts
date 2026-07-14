import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CollectionItem, GameInfo } from '@bgs/shared';
import { GamesApiService } from '../../core/api/games-api.service';
import { PageHeaderComponent } from '../../shared/components/page-header/page-header.component';
import { EmptyStateComponent } from '../../shared/components/empty-state/empty-state.component';
import { SkeletonComponent } from '../../shared/components/skeleton/skeleton.component';
import { LogPlayModalComponent } from '../plays/log-play-modal.component';

@Component({
  selector: 'app-game-overview-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [PageHeaderComponent, EmptyStateComponent, SkeletonComponent, LogPlayModalComponent],
  template: `
    @if (loading()) {
      <app-skeleton height="2rem" width="300px" />
      <app-skeleton height="400px" />
    } @else if (error()) {
      <app-empty-state title="Game not found" [message]="error()" icon="🎲">
        <a class="btn btn-secondary" href="/games">Back to games</a>
      </app-empty-state>
    } @else {
      <app-page-header [title]="game()?.name ?? 'Game'" [subtitle]="metaLine()" overline="Game" />

      <div class="layout">
        <div class="hero card">
          <img [src]="game()?.imageUrl" [alt]="game()?.name" />
        </div>

        <div class="details">
          @if (details()) {
            <section class="card section">
              <h2>Overview</h2>
              <p class="description" [innerHTML]="details()!.description"></p>
              <dl class="stats">
                <div><dt>Players</dt><dd>{{ details()!.minplayers }}–{{ details()!.maxplayers }}</dd></div>
                <div><dt>Play time</dt><dd>{{ details()!.minPlayTime }}–{{ details()!.maxPlayTime }} min</dd></div>
                <div><dt>Year</dt><dd>{{ details()!.yearpublished }}</dd></div>
              </dl>
            </section>

            @if (details()!.gameCategories.length) {
              <section class="card section">
                <h2>Categories</h2>
                <div class="chips">
                  @for (cat of details()!.gameCategories; track cat.id) {
                    <span class="chip">{{ cat.value }}</span>
                  }
                </div>
              </section>
            }
          }

          <button class="btn btn-primary" type="button" (click)="showLogPlay.set(true)">Log a play</button>
        </div>
      </div>
    }

    @if (showLogPlay() && game()) {
      <app-log-play-modal
        [gameId]="String(game()!.gameId)"
        [gameName]="game()!.name"
        (closed)="showLogPlay.set(false)"
        (saved)="showLogPlay.set(false)"
      />
    }
  `,
  styles: `
    .layout {
      display: grid;
      grid-template-columns: minmax(200px, 320px) 1fr;
      gap: var(--space-xl);

      @media (max-width: 768px) {
        grid-template-columns: 1fr;
      }
    }

    .hero img {
      width: 100%;
      border-radius: var(--radius-md);
    }

    .section {
      padding: var(--space-xl);
      margin-bottom: var(--space-lg);
    }

    .section h2 {
      margin: 0 0 var(--space-md);
      font-family: 'Fraunces', serif;
      font-size: 1.125rem;
    }

    .description {
      color: var(--color-text-secondary);
      line-height: 1.6;
      margin: 0 0 var(--space-lg);
    }

    .stats {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: var(--space-md);
      margin: 0;

      dt {
        font-size: 0.75rem;
        font-weight: 700;
        text-transform: uppercase;
        color: var(--color-text-muted);
      }

      dd {
        margin: var(--space-xs) 0 0;
        font-weight: 700;
      }
    }

    .chips {
      display: flex;
      flex-wrap: wrap;
      gap: var(--space-sm);
    }

    .chip {
      padding: 0.25rem 0.75rem;
      border-radius: var(--radius-full);
      background: var(--color-primary-soft);
      color: var(--color-primary);
      font-size: 0.8125rem;
      font-weight: 600;
    }
  `,
})
export class GameOverviewPageComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly gamesApi = inject(GamesApiService);

  readonly loading = signal(true);
  readonly error = signal('');
  readonly game = signal<CollectionItem | null>(null);
  readonly details = signal<GameInfo | null>(null);
  readonly showLogPlay = signal(false);

  metaLine(): string {
    const d = this.details();
    if (!d) return '';
    return `${d.minplayers}–${d.maxplayers} players · ${d.yearpublished}`;
  }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (!id) {
      this.error.set('Invalid game ID');
      this.loading.set(false);
      return;
    }

    this.gamesApi.getInfo(id).subscribe({
      next: (info) => {
        this.game.set(info);
        this.gamesApi.getBggDetails(String(info.bggGameId)).subscribe({
          next: (d) => {
            this.details.set(d);
            this.loading.set(false);
          },
          error: () => this.loading.set(false),
        });
      },
      error: (err) => {
        this.error.set(err?.message ?? 'Could not load game');
        this.loading.set(false);
      },
    });
  }
}
