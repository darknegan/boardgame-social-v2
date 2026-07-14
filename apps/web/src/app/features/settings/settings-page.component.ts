import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Friend } from '@bgs/shared';
import { AuthService } from '../../core/auth/auth.service';
import { SocialApiService } from '../../core/api/social-api.service';
import { ThemeService } from '../../core/theme/theme.service';
import { PageHeaderComponent } from '../../shared/components/page-header/page-header.component';
import { ToastService } from '../../core/toast/toast.service';

@Component({
  selector: 'app-settings-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [PageHeaderComponent, ReactiveFormsModule, RouterLink],
  template: `
    <app-page-header
      title="Settings"
      subtitle="Account, notifications, and appearance."
      overline="Preferences"
    />

    <section class="card section">
      <h2>Account</h2>
      <p class="meta">Signed in as {{ email() }}</p>
      <a class="btn btn-secondary" routerLink="/profile/edit">Edit profile</a>
    </section>

    <section class="card section">
      <h2>Appearance</h2>
      <p class="meta">Current theme: {{ theme.theme() }}</p>
      <button class="btn btn-secondary" type="button" (click)="theme.toggle()">
        Switch to {{ theme.theme() === 'light' ? 'dark' : 'light' }} mode
      </button>
    </section>

    <section class="card section">
      <h2>Notifications</h2>
      <label class="toggle">
        <input type="checkbox" [checked]="notifications()" (change)="toggleNotifications()" />
        <span>Email notifications (coming soon)</span>
      </label>
    </section>

    <section class="card section">
      <h2>Friends</h2>
      <form class="friend-form" [formGroup]="friendForm" (ngSubmit)="sendRequest()">
        <input class="input" type="text" formControlName="username" placeholder="Add friend by username" />
        <button class="btn btn-primary" type="submit" [disabled]="friendForm.invalid || requesting()">
          Send request
        </button>
      </form>

      @if (friends().length) {
        <ul class="friend-list">
          @for (friend of friends(); track friend.id) {
            <li class="friend-item">
              <span>{{ friend.display_name ?? friend.username }}</span>
              <span class="status">{{ friend.status }}</span>
              @if (friend.status === 'pending' && isIncoming(friend)) {
                <button class="btn btn-secondary btn-sm" type="button" (click)="accept(friend.id)">
                  Accept
                </button>
              }
            </li>
          }
        </ul>
      } @else {
        <p class="meta">No friends yet. Send a request above.</p>
      }
    </section>
  `,
  styles: `
    .section {
      padding: var(--space-xl);
      margin-bottom: var(--space-lg);
      max-width: 560px;
    }

    .section h2 {
      margin: 0 0 var(--space-md);
      font-family: 'Fraunces', serif;
      font-size: 1.125rem;
    }

    .meta {
      margin: 0 0 var(--space-lg);
      color: var(--color-text-secondary);
      font-size: 0.875rem;
    }

    .toggle {
      display: flex;
      align-items: center;
      gap: var(--space-md);
      font-weight: 600;
      color: var(--color-text-secondary);
    }

    .friend-form {
      display: flex;
      gap: var(--space-md);
      margin-bottom: var(--space-lg);
    }

    .friend-list {
      list-style: none;
      margin: 0;
      padding: 0;
    }

    .friend-item {
      display: flex;
      align-items: center;
      gap: var(--space-md);
      padding: var(--space-sm) 0;
      border-bottom: 1px solid var(--color-border);
      font-weight: 600;
    }

    .status {
      margin-left: auto;
      font-size: 0.75rem;
      color: var(--color-text-muted);
      text-transform: uppercase;
    }

    .btn-sm {
      padding: 0.375rem 0.75rem;
      font-size: 0.75rem;
    }
  `,
})
export class SettingsPageComponent implements OnInit {
  protected readonly theme = inject(ThemeService);
  private readonly auth = inject(AuthService);
  private readonly social = inject(SocialApiService);
  private readonly toast = inject(ToastService);
  private readonly fb = inject(FormBuilder);

  readonly notifications = signal(false);
  readonly requesting = signal(false);
  readonly friends = signal<Friend[]>([]);

  readonly friendForm = this.fb.group({ username: [''] });

  email(): string {
    return this.auth.user()?.email ?? 'unknown';
  }

  ngOnInit(): void {
    this.social.getFriends().subscribe({
      next: (f) => this.friends.set(f),
    });
  }

  toggleNotifications(): void {
    this.notifications.update((v) => !v);
    this.toast.success('Notification preference saved');
  }

  sendRequest(): void {
    const username = this.friendForm.value.username?.trim();
    if (!username) return;
    this.requesting.set(true);
    this.social.sendFriendRequest(username).subscribe({
      next: (friend) => {
        this.friends.update((list) => [...list, friend]);
        this.friendForm.reset();
        this.toast.success('Friend request sent');
        this.requesting.set(false);
      },
      error: () => this.requesting.set(false),
    });
  }

  accept(requestId: string): void {
    this.social.acceptFriendRequest(requestId).subscribe({
      next: (friend) => {
        this.friends.update((list) =>
          list.map((f) => (f.id === requestId ? { ...f, status: 'accepted' } : f)),
        );
        this.toast.success('Friend request accepted');
      },
    });
  }

  isIncoming(friend: Friend): boolean {
    return friend.friend_id === this.auth.user()?.id;
  }
}
