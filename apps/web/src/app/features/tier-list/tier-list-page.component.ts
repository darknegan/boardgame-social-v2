import {
  CdkDrag,
  CdkDragDrop,
  CdkDropList,
  CdkDropListGroup,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { CollectionItem, TierListItem, TierRank } from '@bgs/shared';
import { CollectionsApiService } from '../../core/api/collections-api.service';
import { TierListsApiService } from '../../core/api/tier-lists-api.service';
import { PageHeaderComponent } from '../../shared/components/page-header/page-header.component';
import { EmptyStateComponent } from '../../shared/components/empty-state/empty-state.component';
import { SkeletonComponent } from '../../shared/components/skeleton/skeleton.component';
import { ToastService } from '../../shared/components/toast/toast.service';

const TIERS: TierRank[] = ['S', 'A', 'B', 'C', 'D'];

@Component({
  selector: 'app-tier-list-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    PageHeaderComponent,
    EmptyStateComponent,
    SkeletonComponent,
    CdkDropListGroup,
    CdkDropList,
    CdkDrag,
  ],
  template: `
    <app-page-header
      title="Tier List"
      subtitle="Drag games to rank your favorites."
      overline="Play"
    >
      <button class="btn btn-primary" type="button" (click)="save()" [disabled]="saving() || loading()">
        {{ saving() ? 'Saving…' : 'Save' }}
      </button>
    </app-page-header>

    @if (loading()) {
      <app-skeleton height="400px" />
    } @else if (pool().length === 0 && allRanked().length === 0) {
      <app-empty-state
        title="No games to rank"
        message="Import your collection first, then drag games into tiers."
        icon="🏆"
      />
    } @else {
      <div class="tier-board" cdkDropListGroup>
        @for (tier of tiers; track tier) {
          <div class="tier-row">
            <div class="tier-label tier-label--{{ tier.toLowerCase() }}">{{ tier }}</div>
            <div
              class="tier-drop"
              cdkDropList
              [cdkDropListData]="tierBuckets()[tier]"
              (cdkDropListDropped)="onDrop($event, tier)"
            >
              @for (item of tierBuckets()[tier]; track item.game_id) {
                <div class="tier-item" cdkDrag>
                  <img [src]="item.thumbnail_url" [alt]="item.name" />
                  <span>{{ item.name }}</span>
                </div>
              }
            </div>
          </div>
        }

        <div class="pool-section">
          <h3>Unranked</h3>
          <div
            class="tier-drop pool"
            cdkDropList
            [cdkDropListData]="pool()"
            (cdkDropListDropped)="onDrop($event, null)"
          >
            @for (item of pool(); track item.game_id) {
              <div class="tier-item" cdkDrag>
                <img [src]="item.thumbnail_url" [alt]="item.name" />
                <span>{{ item.name }}</span>
              </div>
            }
          </div>
        </div>
      </div>
    }
  `,
  styles: `
    .tier-board {
      display: flex;
      flex-direction: column;
      gap: var(--space-md);
    }

    .tier-row {
      display: flex;
      gap: var(--space-md);
      align-items: stretch;
    }

    .tier-label {
      width: 48px;
      display: grid;
      place-items: center;
      font-weight: 800;
      font-size: 1.25rem;
      border-radius: var(--radius-sm);
      color: white;
      flex-shrink: 0;
    }

    .tier-label--s { background: var(--color-tier-s); }
    .tier-label--a { background: var(--color-tier-a); }
    .tier-label--b { background: var(--color-tier-b); }
    .tier-label--c { background: var(--color-tier-c); }
    .tier-label--d { background: var(--color-tier-d); }

    .tier-drop {
      flex: 1;
      min-height: 72px;
      display: flex;
      flex-wrap: wrap;
      gap: var(--space-sm);
      padding: var(--space-sm);
      background: var(--color-surface-elevated);
      border: 2px dashed var(--color-border);
      border-radius: var(--radius-md);
    }

    .tier-item {
      display: flex;
      align-items: center;
      gap: var(--space-xs);
      padding: var(--space-xs) var(--space-sm);
      background: var(--color-surface);
      border: 1px solid var(--color-border);
      border-radius: var(--radius-sm);
      font-size: 0.75rem;
      font-weight: 600;
      cursor: grab;

      img {
        width: 32px;
        height: 32px;
        object-fit: cover;
        border-radius: var(--radius-sm);
      }
    }

    .pool-section h3 {
      margin: var(--space-lg) 0 var(--space-sm);
      font-size: 0.875rem;
      color: var(--color-text-muted);
    }
  `,
})
export class TierListPageComponent implements OnInit {
  private readonly tierLists = inject(TierListsApiService);
  private readonly collections = inject(CollectionsApiService);
  private readonly toast = inject(ToastService);

  readonly tiers = TIERS;
  readonly loading = signal(true);
  readonly saving = signal(false);
  readonly pool = signal<TierListItem[]>([]);
  readonly tierBuckets = signal<Record<TierRank, TierListItem[]>>({
    S: [],
    A: [],
    B: [],
    C: [],
    D: [],
  });

  allRanked(): TierListItem[] {
    const buckets = this.tierBuckets();
    return TIERS.flatMap((t) => buckets[t]);
  }

  ngOnInit(): void {
    this.collections.getPreview(50).subscribe({
      next: (games) => {
        this.tierLists.getTierList().subscribe({
          next: (list) => {
            if (list?.items?.length) {
              this.applySaved(list.items, games);
            } else {
              this.pool.set(this.toTierItems(games));
            }
            this.loading.set(false);
          },
          error: () => {
            this.pool.set(this.toTierItems(games));
            this.loading.set(false);
          },
        });
      },
      error: () => this.loading.set(false),
    });
  }

  onDrop(event: CdkDragDrop<TierListItem[]>, targetTier: TierRank | null): void {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }

    if (targetTier) {
      event.container.data.forEach((item, idx) => {
        item.tier = targetTier;
        item.position = idx;
      });
      this.tierBuckets.update((b) => ({ ...b }));
    } else {
      this.pool.update((p) => [...p]);
    }
  }

  private toTierItems(games: CollectionItem[]): TierListItem[] {
    return games.map((g, i) => ({
      game_id: g.gameId,
      bgg_game_id: g.bggGameId,
      name: g.name,
      thumbnail_url: g.thumbnailUrl || g.imageUrl,
      tier: 'D' as TierRank,
      position: i,
    }));
  }

  private applySaved(saved: TierListItem[], games: CollectionItem[]): void {
    const buckets: Record<TierRank, TierListItem[]> = { S: [], A: [], B: [], C: [], D: [] };
    const savedIds = new Set(saved.map((s) => s.game_id));

    for (const item of saved) {
      buckets[item.tier].push(item);
    }

    const unranked = games
      .filter((g) => !savedIds.has(g.gameId))
      .map((g, i) => ({
        game_id: g.gameId,
        bgg_game_id: g.bggGameId,
        name: g.name,
        thumbnail_url: g.thumbnailUrl || g.imageUrl,
        tier: 'D' as TierRank,
        position: i,
      }));

    this.tierBuckets.set(buckets);
    this.pool.set(unranked);
  }

  save(): void {
    const items: TierListItem[] = [];
    const buckets = this.tierBuckets();
    for (const tier of TIERS) {
      buckets[tier].forEach((item, idx) => {
        items.push({ ...item, tier, position: idx });
      });
    }

    this.saving.set(true);
    this.tierLists.saveTierList({ name: 'My Tier List', items }).subscribe({
      next: () => {
        this.toast.success('Tier list saved');
        this.saving.set(false);
      },
      error: () => this.saving.set(false),
    });
  }
}
