import { ChangeDetectionStrategy, Component, inject, output, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../core/auth/auth.service';
import { ThemeService } from '../../core/theme/theme.service';

@Component({
  selector: 'app-topbar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink],
  template: `
    <header class="topbar">
      <button type="button" class="menu-btn" (click)="menuToggle.emit()" aria-label="Toggle menu">
        ☰
      </button>

      <form class="search" role="search" (submit)="$event.preventDefault()">
        <label class="sr-only" for="global-search">Search games</label>
        <input
          id="global-search"
          class="search-input"
          type="search"
          placeholder="Search games, players, events…"
        />
      </form>

      <div class="actions">
        <button type="button" class="icon-btn" (click)="theme.toggle()" aria-label="Toggle theme">
          {{ theme.theme() === 'light' ? '🌙' : '☀️' }}
        </button>

        <div class="user-menu">
          <button type="button" class="user-chip" (click)="menuOpen.set(!menuOpen())" aria-haspopup="true">
            <span class="avatar" aria-hidden="true">{{ initials() }}</span>
            <span class="username">{{ displayName() }}</span>
          </button>
          @if (menuOpen()) {
            <div class="dropdown" role="menu">
              <a routerLink="/profile" role="menuitem" (click)="menuOpen.set(false)">Profile</a>
              <a routerLink="/settings" role="menuitem" (click)="menuOpen.set(false)">Settings</a>
              <button type="button" role="menuitem" (click)="signOut()">Sign out</button>
            </div>
          }
        </div>
      </div>
    </header>
  `,
  styles: `
    .topbar {
      height: var(--topbar-height);
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: var(--space-lg);
      padding: 0 var(--space-xl);
      background: var(--color-bg-raised);
      border-bottom: 1px solid var(--color-border);
    }

    .menu-btn {
      display: none;
      width: 40px;
      height: 40px;
      border: 1px solid var(--color-border);
      border-radius: var(--radius-md);
      background: var(--color-surface);
      font-size: 1.125rem;
    }

    @media (max-width: 768px) {
      .menu-btn {
        display: grid;
        place-items: center;
      }
    }

    .menu-btn {
      display: none;
      width: 40px;
      height: 40px;
      border: 1px solid var(--color-border);
      border-radius: var(--radius-md);
      background: var(--color-surface);
      font-size: 1.25rem;
    }

    .search { flex: 1; max-width: 480px; }

    .search-input {
      width: 100%;
      padding: 0.625rem 1rem 0.625rem 2.5rem;
      border: 1px solid var(--color-border);
      border-radius: var(--radius-full);
      background: var(--color-surface-elevated)
        url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='%23A2937F' viewBox='0 0 16 16'%3E%3Cpath d='M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85zm-5.242 1.156a5 5 0 1 1 0-10 5 5 0 0 1 0 10z'/%3E%3C/svg%3E")
        no-repeat 0.875rem center;
      color: var(--color-text-primary);
      font-family: 'Nunito', sans-serif;
      font-size: 0.875rem;
      &:focus { outline: 2px solid var(--color-primary-soft); border-color: var(--color-primary); }
    }

    .actions { display: flex; align-items: center; gap: var(--space-md); }
    .icon-btn { width: 40px; height: 40px; border: 1px solid var(--color-border); border-radius: var(--radius-full); background: var(--color-surface); font-size: 1rem; }
    .user-menu { position: relative; }
    .user-chip { display: flex; align-items: center; gap: var(--space-sm); padding: 0.25rem 0.75rem 0.25rem 0.25rem; border: 1px solid var(--color-border); border-radius: var(--radius-full); background: var(--color-surface); }
    .avatar { width: 32px; height: 32px; border-radius: var(--radius-full); background: linear-gradient(135deg, var(--color-grad-start), var(--color-grad-end)); color: white; display: grid; place-items: center; font-size: 0.75rem; font-weight: 700; }
    .username { font-size: 0.875rem; font-weight: 600; color: var(--color-text-primary); }
    .dropdown {
      position: absolute;
      top: calc(100% + 4px);
      right: 0;
      min-width: 160px;
      background: var(--color-surface);
      border: 1px solid var(--color-border);
      border-radius: var(--radius-md);
      box-shadow: var(--shadow-md);
      padding: var(--space-xs);
      z-index: 100;
      a, button {
        display: block;
        width: 100%;
        text-align: left;
        padding: 0.625rem 0.875rem;
        border: none;
        background: none;
        border-radius: var(--radius-sm);
        font-weight: 600;
        font-size: 0.875rem;
        color: var(--color-text-primary);
        &:hover { background: var(--color-surface-hover); }
      }
    }

    @media (max-width: 768px) {
      .menu-btn { display: grid; place-items: center; }
      .search { display: none; }
      .username { display: none; }
    }
  `,
})
export class TopbarComponent {
  protected readonly theme = inject(ThemeService);
  private readonly auth = inject(AuthService);

  readonly menuToggle = output<void>();
  readonly menuOpen = signal(false);

  displayName(): string {
    return this.auth.profile()?.display_name ?? this.auth.profile()?.username ?? 'Player';
  }

  initials(): string {
    const name = this.displayName();
    return name.split(' ').map((p) => p[0]).join('').slice(0, 2).toUpperCase();
  }

  signOut(): void {
    this.menuOpen.set(false);
    void this.auth.signOut();
  }
}
