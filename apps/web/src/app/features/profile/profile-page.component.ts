import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CollectionItem } from '@bgs/shared';
import { AuthService } from '../../core/auth/auth.service';
import { CollectionsApiService } from '../../core/api/collections-api.service';
import { PlaysApiService } from '../../core/api/plays-api.service';
import { PageHeaderComponent } from '../../shared/components/page-header/page-header.component';
import { EmptyStateComponent } from '../../shared/components/empty-state/empty-state.component';
import { SkeletonComponent } from '../../shared/components/skeleton/skeleton.component';

@Component({
  selector: 'app-profile-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [PageHeaderComponent, RouterLink, EmptyStateComponent, SkeletonComponent],
  template: `
    <app-page-header
      [title]="displayName()"
      [subtitle]="'@' + username()"
      overline="Your shelf"
    >
      <a class="btn btn-secondary" routerLink="/profile/edit">Edit profile</a>
    </app-page-header>

    <div class="profile-hero card">
      <div class="avatar">
        @if (avatarUrl()) {
          <img [src]="avatarUrl()" alt="" />
        } @else {
          {{ initials() }}
        }
      </div>
      <div>
        <p class="stat-label">BGG username</p>
        <p class="stat-value">{{ bggUsername() ?? 'Not linked' }}</p>
      </div>
    </div>

    <section class="section">
      <h2 class="section-title">Collection preview</h2>
      @if (loading()) {
        <div class="game-grid">
          @for (i of [1, 2, 3, 4]; track i) {
            <app-skeleton height="180px" />
          }
        </div>
      } @else if (preview().length === 0) {
        <app-empty-state
          title="No games yet"
          message="Import your BGG collection to populate your shelf."
          icon="📚"
        >
          <a class="btn btn-primary" routerLink="/collection">Go to collection</a>
        </app-empty-state>
      } @else {
        <div class="game-grid">
          @for (game of preview(); track game.gameId) {
            <a class="game-card card" [routerLink]="['/game-overview', game.gameId]">
              <img [src]="game.thumbnailUrl || game.imageUrl" [alt]="game.name" loading="lazy" />
              <p class="game-name">{{ game.name }}</p>
            </a>
          }
        </div>
      }
    </section>
  `,
  styles: `
    .profile-hero {
      display: flex;
      align-items: center;
      gap: var(--space-xl);
      padding: var(--space-xl);
      margin-bottom: var(--space-2xl);
    }

    .avatar {
      width: 80px;
      height: 80px;
      border-radius: var(--radius-full);
      background: linear-gradient(135deg, var(--color-grad-start), var(--color-grad-end));
      color: white;
      display: grid;
      place-items: center;
      font-size: 1.5rem;
      font-weight: 700;
      overflow: hidden;
      flex-shrink: 0;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }

    .stat-label {
      margin: 0;
      font-size: 0.75rem;
      font-weight: 700;
      text-transform: uppercase;
      color: var(--color-text-muted);
    }

    .stat-value {
      margin: var(--space-xs) 0 0;
      font-weight: 700;
      color: var(--color-text-primary);
    }

    .section {
      margin-bottom: var(--space-2xl);
    }

    .section-title {
      margin: 0 0 var(--space-lg);
      font-family: 'Fraunces', serif;
      font-size: 1.25rem;
    }

    .game-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
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
      color: var(--color-text-primary);
    }
  `,
})
export class ProfilePageComponent implements OnInit {
  private readonly auth = inject(AuthService);
  private readonly collections = inject(CollectionsApiService);
  private readonly plays = inject(PlaysApiService);

  readonly loading = signal(true);
  readonly preview = signal<CollectionItem[]>([]);

  displayName(): string {
    return this.auth.profile()?.display_name ?? this.auth.profile()?.username ?? 'Player';
  }

  username(): string {
    return this.auth.profile()?.username ?? 'player';
  }

  avatarUrl(): string | undefined {
    return this.auth.profile()?.profile_picture_url;
  }

  bggUsername(): string | undefined {
    return this.auth.profile()?.bgg_username;
  }

  initials(): string {
    return this.displayName()
      .split(' ')
      .map((p) => p[0])
      .join('')
      .slice(0, 2)
      .toUpperCase();
  }

  ngOnInit(): void {
    this.collections.getPreview(8).subscribe({
      next: (items) => {
        this.preview.set(items);
        this.loading.set(false);
      },
      error: () => this.loading.set(false),
    });
    this.plays.listPlays(5).subscribe();
  }
}
