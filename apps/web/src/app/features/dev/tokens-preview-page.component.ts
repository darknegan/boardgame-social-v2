import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PageHeaderComponent } from '../../shared/components/page-header/page-header.component';

@Component({
  selector: 'app-tokens-preview',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [PageHeaderComponent],
  template: `
    <app-page-header title="Design tokens" subtitle="Palette, type, and spacing preview." overline="Dev" />

    <section class="card section">
      <h2>Colors</h2>
      <div class="swatches">
        @for (color of colors; track color.name) {
          <div class="swatch">
            <div class="swatch-color" [style.background]="color.var"></div>
            <span>{{ color.name }}</span>
          </div>
        }
      </div>
    </section>

    <section class="card section">
      <h2>Typography</h2>
      <p class="display">Fraunces display — Game Night</p>
      <p class="body">Nunito body — Track plays, rank favorites, host events.</p>
    </section>

    <section class="card section">
      <h2>Spacing</h2>
      <div class="spacing-row">
        @for (space of spaces; track space) {
          <div class="space-block" [style.width]="space" [style.height]="space"></div>
        }
      </div>
    </section>
  `,
  styles: `
    .section { padding: var(--space-xl); margin-bottom: var(--space-lg); h2 { margin-top: 0; font-family: 'Fraunces', serif; } }
    .swatches { display: flex; flex-wrap: wrap; gap: var(--space-md); }
    .swatch { text-align: center; font-size: 0.75rem; font-weight: 600; }
    .swatch-color { width: 64px; height: 64px; border-radius: var(--radius-md); margin-bottom: var(--space-xs); border: 1px solid var(--color-border); }
    .display { font-family: 'Fraunces', serif; font-size: 2rem; font-weight: 700; }
    .body { font-size: 1rem; color: var(--color-text-secondary); }
    .spacing-row { display: flex; align-items: flex-end; gap: var(--space-sm); }
    .space-block { background: var(--color-primary-soft); border-radius: var(--radius-sm); }
  `,
})
export class TokensPreviewPageComponent {
  readonly colors = [
    { name: 'Primary', var: 'var(--color-primary)' },
    { name: 'Accent', var: 'var(--color-accent)' },
    { name: 'Surface', var: 'var(--color-surface)' },
    { name: 'Border', var: 'var(--color-border)' },
    { name: 'Danger', var: 'var(--color-danger)' },
  ];

  readonly spaces = [
    'var(--space-xs)',
    'var(--space-sm)',
    'var(--space-md)',
    'var(--space-lg)',
    'var(--space-xl)',
  ];
}
