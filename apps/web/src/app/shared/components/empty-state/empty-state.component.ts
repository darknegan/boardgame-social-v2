import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';

@Component({
  selector: 'app-empty-state',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="empty-state">
      <span class="icon" aria-hidden="true">{{ icon() }}</span>
      <h2 class="title">{{ title() }}</h2>
      @if (message()) {
        <p class="message">{{ message() }}</p>
      }
      @if (actionLabel()) {
        <button type="button" class="btn btn-primary" (click)="action.emit()">
          {{ actionLabel() }}
        </button>
      }
    </div>
  `,
  styles: `
    .empty-state {
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      padding: var(--space-3xl) var(--space-xl);
      gap: var(--space-md);
    }

    .icon {
      font-size: 2.5rem;
    }

    .title {
      margin: 0;
      font-family: 'Fraunces', serif;
      font-size: 1.25rem;
    }

    .message {
      margin: 0;
      color: var(--color-text-secondary);
      max-width: 360px;
    }
  `,
})
export class EmptyStateComponent {
  readonly icon = input('📭');
  readonly title = input.required<string>();
  readonly message = input<string>();
  readonly actionLabel = input<string>();
  readonly action = output<void>();
}
