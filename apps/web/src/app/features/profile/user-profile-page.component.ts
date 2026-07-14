import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserProfile } from '@bgs/shared';
import { ProfileApiService } from '../../core/api/profile-api.service';
import { PageHeaderComponent } from '../../shared/components/page-header/page-header.component';
import { EmptyStateComponent } from '../../shared/components/empty-state/empty-state.component';
import { SkeletonComponent } from '../../shared/components/skeleton/skeleton.component';

@Component({
  selector: 'app-user-profile-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [PageHeaderComponent, EmptyStateComponent, SkeletonComponent],
  template: `
    @if (loading()) {
      <app-skeleton height="2rem" width="200px" />
      <app-skeleton height="80px" />
    } @else if (!profile()) {
      <app-empty-state title="User not found" message="No player with that username exists." icon="👤" />
    } @else {
      <app-page-header
        [title]="displayName()"
        [subtitle]="'@' + profile()!.username"
        overline="Player"
      />

      <div class="profile-hero card">
        <div class="avatar">
          @if (profile()!.profile_picture_url) {
            <img [src]="profile()!.profile_picture_url" alt="" />
          } @else {
            {{ initials() }}
          }
        </div>
        <div>
          @if (profile()!.bgg_username) {
            <p class="meta">BGG: {{ profile()!.bgg_username }}</p>
          }
          @if (profile()!.city) {
            <p class="meta">{{ profile()!.city }}{{ profile()!.subdivision ? ', ' + profile()!.subdivision : '' }}</p>
          }
        </div>
      </div>
    }
  `,
  styles: `
    .profile-hero {
      display: flex;
      align-items: center;
      gap: var(--space-xl);
      padding: var(--space-xl);
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

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }

    .meta {
      margin: 0 0 var(--space-xs);
      color: var(--color-text-secondary);
      font-weight: 600;
    }
  `,
})
export class UserProfilePageComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly profileApi = inject(ProfileApiService);

  readonly loading = signal(true);
  readonly profile = signal<UserProfile | null>(null);

  displayName(): string {
    const p = this.profile();
    return p?.display_name ?? p?.username ?? 'Player';
  }

  initials(): string {
    return this.displayName()
      .split(' ')
      .map((part) => part[0])
      .join('')
      .slice(0, 2)
      .toUpperCase();
  }

  ngOnInit(): void {
    const username = this.route.snapshot.paramMap.get('username') ?? '';
    this.profileApi.getByUsername(username).then((p) => {
      this.profile.set(p);
      this.loading.set(false);
    });
  }
}
