import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { TopbarComponent } from '../topbar/topbar.component';
import { BottomNavComponent } from '../bottom-nav/bottom-nav.component';

@Component({
  selector: 'app-shell',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterOutlet, SidebarComponent, TopbarComponent, BottomNavComponent],
  template: `
    <div class="shell" [class.sidebar-collapsed]="sidebarCollapsed()">
      <app-sidebar [collapsed]="sidebarCollapsed()" />
      <div class="main">
        <app-topbar (menuToggle)="toggleSidebar()" />
        <main class="content">
          <router-outlet />
        </main>
      </div>
      <app-bottom-nav />
    </div>
  `,
  styles: `
    .shell {
      display: flex;
      min-height: 100vh;
      background: var(--color-bg-base);
    }

    .main {
      flex: 1;
      display: flex;
      flex-direction: column;
      min-width: 0;
    }

    .content {
      flex: 1;
      padding: var(--space-xl);
      overflow: auto;
    }

    @media (max-width: 768px) {
      .content {
        padding: var(--space-lg);
        padding-bottom: calc(64px + var(--space-lg));
      }
    }
  `,
})
export class AppShellComponent {
  readonly sidebarCollapsed = signal(true);

  toggleSidebar(): void {
    this.sidebarCollapsed.update((v) => !v);
  }
}
