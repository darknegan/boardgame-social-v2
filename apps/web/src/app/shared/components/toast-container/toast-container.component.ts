import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ToastService } from '../../../core/toast/toast.service';

@Component({
  selector: 'app-toast-container',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="toast-container" aria-live="polite">
      @for (msg of toast.messages(); track msg.id) {
        <div class="toast toast--{{ msg.type }}" role="alert">
          <span>{{ msg.text }}</span>
          <button type="button" class="dismiss" (click)="toast.dismiss(msg.id)" aria-label="Dismiss">
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
      z-index: 9999;
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
      box-shadow: var(--shadow-md);
      font-size: 0.875rem;
      font-weight: 600;
      animation: slideIn 0.2s ease;
    }

    .toast--error {
      background: var(--color-danger);
      color: white;
    }

    .toast--success {
      background: var(--color-success, #2d6a4f);
      color: white;
    }

    .toast--info {
      background: var(--color-surface);
      border: 1px solid var(--color-border);
      color: var(--color-text-primary);
    }

    .dismiss {
      background: none;
      border: none;
      font-size: 1.25rem;
      line-height: 1;
      opacity: 0.7;
      color: inherit;
    }

    @keyframes slideIn {
      from { transform: translateY(1rem); opacity: 0; }
      to { transform: translateY(0); opacity: 1; }
    }

    @media (max-width: 768px) {
      .toast-container {
        bottom: calc(var(--bottom-nav-height, 64px) + var(--space-md));
        left: var(--space-md);
        right: var(--space-md);
        max-width: none;
      }
    }
  `,
})
export class ToastContainerComponent {
  protected readonly toast = inject(ToastService);
}
