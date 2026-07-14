import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

export interface TabItem {
  label: string;
  route: string;
  icon: string;
}

@Component({
  selector: 'app-bottom-nav',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, RouterLinkActive],
  template: `
    <nav class="bottom-nav" aria-label="Mobile navigation">
      @for (item of items(); track item.route) {
        <a
          class="tab"
          [routerLink]="item.route"
          routerLinkActive="active"
          [attr.aria-label]="item.label"
        >
          <span class="tab-icon" aria-hidden="true">{{ item.icon }}</span>
          <span class="tab-label">{{ item.label }}</span>
        </a>
      }
    </nav>
  `,
  styles: `
    .bottom-nav {
      display: none;
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      height: 64px;
      background: var(--color-bg-raised);
      border-top: 1px solid var(--color-border);
      z-index: 30;
      padding: 0 var(--space-sm);
      justify-content: space-around;
      align-items: center;
    }

    @media (max-width: 768px) {
      .bottom-nav {
        display: flex;
      }
    }

    .tab {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 2px;
      padding: var(--space-xs) var(--space-sm);
      color: var(--color-text-muted);
      font-size: 0.625rem;
      font-weight: 700;

      &.active {
        color: var(--color-primary);
      }
    }

    .tab-icon {
      font-size: 1.25rem;
    }
  `,
})
export class BottomNavComponent {
  readonly items = input<TabItem[]>([
    { label: 'Home', route: '/', icon: '🏠' },
    { label: 'Collection', route: '/collection', icon: '📚' },
    { label: 'Games', route: '/games', icon: '🎯' },
    { label: 'Events', route: '/events', icon: '📅' },
    { label: 'Profile', route: '/profile', icon: '👤' },
  ]);
}
