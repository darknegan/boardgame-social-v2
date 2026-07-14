import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { PageHeaderComponent } from '../../shared/components/page-header/page-header.component';

@Component({
  selector: 'app-feature-placeholder',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [PageHeaderComponent],
  template: `
    <app-page-header
      [title]="data().title"
      [subtitle]="data().subtitle"
      [overline]="data().overline"
    />
    <div class="card placeholder">
      <p>{{ data().message }}</p>
    </div>
  `,
  styles: `
    .placeholder {
      padding: var(--space-2xl);
      color: var(--color-text-secondary);
      max-width: 640px;
    }
  `,
})
export class FeaturePlaceholderComponent {
  private readonly route = inject(ActivatedRoute);

  readonly data = toSignal(
    this.route.data.pipe(
      map((d) => ({
        title: (d['title'] as string) ?? 'Page',
        subtitle: d['subtitle'] as string | undefined,
        overline: d['overline'] as string | undefined,
        message:
          (d['message'] as string) ??
          'This screen is scaffolded and ready for data wiring.',
      })),
    ),
    {
      initialValue: {
        title: 'Page',
        subtitle: undefined,
        overline: undefined,
        message: 'This screen is scaffolded and ready for data wiring.',
      },
    },
  );
}
