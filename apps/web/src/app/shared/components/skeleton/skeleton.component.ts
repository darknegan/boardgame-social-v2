import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-skeleton',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="skeleton" [style.width]="width()" [style.height]="height()" [class.round]="round()"></div>
  `,
  styles: `
    .skeleton {
      background: linear-gradient(
        90deg,
        var(--color-surface-elevated) 25%,
        var(--color-surface-hover) 50%,
        var(--color-surface-elevated) 75%
      );
      background-size: 200% 100%;
      animation: shimmer 1.2s infinite;
      border-radius: var(--radius-md);
    }

    .round {
      border-radius: var(--radius-full);
    }

    @keyframes shimmer {
      0% { background-position: 200% 0; }
      100% { background-position: -200% 0; }
    }
  `,
})
export class SkeletonComponent {
  readonly width = input('100%');
  readonly height = input('1rem');
  readonly round = input(false);
}
