import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-page-header',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <header class="page-header">
      <div>
        @if (overline()) {
          <p class="overline">{{ overline() }}</p>
        }
        <h1 class="title">{{ title() }}</h1>
        @if (subtitle()) {
          <p class="subtitle">{{ subtitle() }}</p>
        }
      </div>
      <ng-content />
    </header>
  `,
  styles: `
    .page-header {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      gap: var(--space-lg);
      margin-bottom: var(--space-xl);
    }

    .overline {
      margin: 0 0 var(--space-xs);
      font-size: 0.6875rem;
      font-weight: 700;
      letter-spacing: 0.06em;
      text-transform: uppercase;
      color: var(--color-primary);
    }

    .title {
      margin: 0;
      font-family: 'Fraunces', serif;
      font-weight: 700;
      font-size: 2rem;
      color: var(--color-text-primary);
    }

    .subtitle {
      margin: var(--space-sm) 0 0;
      color: var(--color-text-secondary);
      font-size: 1rem;
    }
  `,
})
export class PageHeaderComponent {
  readonly title = input.required<string>();
  readonly subtitle = input<string>();
  readonly overline = input<string>();
}
