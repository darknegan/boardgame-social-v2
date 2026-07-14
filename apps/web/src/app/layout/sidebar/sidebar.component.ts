import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

export interface NavItem {
  label: string;
  route: string;
  icon: string;
}

@Component({
  selector: 'app-sidebar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'app-sidebar',
    '[class.collapsed]': 'collapsed()',
  },
  imports: [RouterLink, RouterLinkActive],
  template: `
    <aside class="sidebar" aria-label="Main navigation">
      <div class="brand">
        <span class="brand-mark" aria-hidden="true">🎲</span>
        <div>
          <p class="brand-overline">Game Night</p>
          <p class="brand-title">Board Game Social</p>
        </div>
      </div>

      <nav class="nav">
        @for (item of items(); track item.route) {
          <a
            class="nav-link"
            [routerLink]="item.route"
            routerLinkActive="active"
            [attr.aria-label]="item.label"
          >
            <span class="nav-icon" aria-hidden="true">{{ item.icon }}</span>
            <span>{{ item.label }}</span>
          </a>
        }
      </nav>
    </aside>
  `,
  styles: `
    :host {
      display: block;
    }

    :host(.collapsed) .sidebar {
      transform: translateX(-100%);
    }

    @media (min-width: 769px) {
      :host(.collapsed) .sidebar {
        transform: none;
      }
    }

    @media (max-width: 768px) {
      :host .sidebar {
        position: fixed;
        left: 0;
        top: 0;
        z-index: 40;
        transform: translateX(-100%);
        transition: transform 0.2s ease;
      }

      :host(:not(.collapsed)) .sidebar {
        transform: translateX(0);
      }
    }

    .sidebar {
      width: var(--sidebar-width);
      min-height: 100vh;
      padding: var(--space-xl) var(--space-lg);
      background: var(--color-bg-raised);
      border-right: 1px solid var(--color-border);
      display: flex;
      flex-direction: column;
      gap: var(--space-2xl);
      flex-shrink: 0;
    }

    .brand {
      display: flex;
      gap: var(--space-md);
      align-items: center;
    }

    .brand-mark {
      width: 40px;
      height: 40px;
      display: grid;
      place-items: center;
      border-radius: var(--radius-md);
      background: var(--color-primary-soft);
      font-size: 1.25rem;
    }

    .brand-overline {
      margin: 0;
      font-size: 0.6875rem;
      font-weight: 700;
      letter-spacing: 0.06em;
      text-transform: uppercase;
      color: var(--color-primary);
    }

    .brand-title {
      margin: 0;
      font-family: 'Fraunces', serif;
      font-weight: 700;
      font-size: 1rem;
      color: var(--color-text-primary);
    }

    .nav {
      display: flex;
      flex-direction: column;
      gap: var(--space-xs);
    }

    .nav-link {
      display: flex;
      align-items: center;
      gap: var(--space-md);
      padding: 0.75rem 1rem;
      border-radius: var(--radius-md);
      color: var(--color-text-secondary);
      font-weight: 600;
      font-size: 0.9375rem;
      transition: background 0.15s ease, color 0.15s ease;

      &:hover {
        background: var(--color-surface-hover);
        color: var(--color-text-primary);
      }

      &.active {
        background: var(--color-primary-soft);
        color: var(--color-primary);
      }
    }

    .nav-icon {
      width: 1.25rem;
      text-align: center;
    }
  `,
})
export class SidebarComponent {
  readonly collapsed = input(false);
  readonly items = input<NavItem[]>([
    { label: 'Home', route: '/', icon: '🏠' },
    { label: 'Profile', route: '/profile', icon: '👤' },
    { label: 'Collection', route: '/collection', icon: '📚' },
    { label: 'Games', route: '/games', icon: '🎯' },
    { label: 'Tier List', route: '/play', icon: '🏆' },
    { label: 'Events', route: '/events', icon: '📅' },
    { label: 'Settings', route: '/settings', icon: '⚙️' },
  ]);
}
