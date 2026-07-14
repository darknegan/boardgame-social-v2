import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ToastService } from './toast.service';

@Component({
  selector: 'app-toast-container',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="toast-container" aria-live="polite" aria-atomic="true">
      @for (toast of toastService.toasts(); track toast.id) {
        <div class="toast toast--{{ toast.type }}" role="alert">
          <span>{{ toast.message }}</span>
          <button type="button" class="dismiss" (click)="toastService.dismiss(toast.id)" aria-label="Dismiss">
            ×
          </button>
        </div>
      }
    </div>
  `,
  styles: `
    .toast-container {
      position: fixed;
      bottom: var(--space-xl);
      right: var(--space-xl);
      z-index: 1000;
      display: flex;
      flex-direction: column;
      gap: var(--space-sm);
      max-width: 400px;
    }

    .toast {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: var(--space-md);
      padding: var(--space-md) var(--space-lg);
      border-radius: var(--radius-md);
      background: var(--color-surface);
      border: 1px solid var(--color-border);
      box-shadow: var(--shadow-md);
      font-size: 0.875rem;
      font-weight: 600;
    }

    .toast--error {
      border-color: var(--color-danger);
      color: var(--color-danger);
    }

    .toast--success {
      border-color: var(--color-success);
      color: var(--color-success);
    }

    .dismiss {
      border: none;
      background: transparent;
      font-size: 1.25rem;
      line-height: 1;
      color: inherit;
      opacity: 0.7;
    }
  `,
})
export class ToastContainerComponent {
  protected readonly toastService = inject(ToastService);
}
