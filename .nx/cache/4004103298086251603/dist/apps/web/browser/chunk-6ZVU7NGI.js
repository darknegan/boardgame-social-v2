import {
  CollectionsApiService
} from "./chunk-2TWOYIO7.js";
import {
  ToastService
} from "./chunk-FNB3VBA5.js";
import {
  EmptyStateComponent,
  SkeletonComponent
} from "./chunk-T3V355ZA.js";
import {
  PageHeaderComponent
} from "./chunk-5ISH4G2G.js";
import {
  HttpClient
} from "./chunk-XKHOIK35.js";
import {
  ChangeDetectionStrategy,
  Component,
  Injectable,
  __spreadProps,
  __spreadValues,
  inject,
  setClassMetadata,
  signal,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵclassMap,
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵdefineComponent,
  ɵɵdefineInjectable,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵinterpolate1,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵrepeaterTrackByIdentity,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵsanitizeUrl,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1
} from "./chunk-B6IJ3W3N.js";

// apps/web/src/app/core/api/tier-lists-api.service.ts
var TierListsApiService = class _TierListsApiService {
  http = inject(HttpClient);
  getTierList() {
    return this.http.get("tier-lists");
  }
  saveTierList(dto) {
    return this.http.put("tier-lists", dto);
  }
  static \u0275fac = function TierListsApiService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _TierListsApiService)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _TierListsApiService, factory: _TierListsApiService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(TierListsApiService, [{
    type: Injectable,
    args: [{ providedIn: "root" }]
  }], null, null);
})();

// apps/web/src/app/features/tier-list/tier-list-page.component.ts
var _forTrack0 = ($index, $item) => $item.game_id;
function TierListPageComponent_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "app-skeleton", 2);
  }
}
function TierListPageComponent_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "app-empty-state", 3);
  }
}
function TierListPageComponent_Conditional_5_For_2_For_5_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 10);
    \u0275\u0275listener("dragstart", function TierListPageComponent_Conditional_5_For_2_For_5_Template_div_dragstart_0_listener($event) {
      const item_r6 = \u0275\u0275restoreView(_r5).$implicit;
      const tier_r4 = \u0275\u0275nextContext().$implicit;
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.onDragStart($event, item_r6, tier_r4));
    });
    \u0275\u0275element(1, "img", 11);
    \u0275\u0275elementStart(2, "span");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const item_r6 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275property("src", item_r6.thumbnail_url, \u0275\u0275sanitizeUrl)("alt", item_r6.name);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(item_r6.name);
  }
}
function TierListPageComponent_Conditional_5_For_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 5)(1, "div");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 9);
    \u0275\u0275listener("dragover", function TierListPageComponent_Conditional_5_For_2_Template_div_dragover_3_listener($event) {
      \u0275\u0275restoreView(_r2);
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.onDragOver($event));
    })("drop", function TierListPageComponent_Conditional_5_For_2_Template_div_drop_3_listener($event) {
      const tier_r4 = \u0275\u0275restoreView(_r2).$implicit;
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.onDrop($event, tier_r4));
    });
    \u0275\u0275repeaterCreate(4, TierListPageComponent_Conditional_5_For_2_For_5_Template, 4, 3, "div", 8, _forTrack0);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const tier_r4 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275classMap(\u0275\u0275interpolate1("tier-label tier-label--", tier_r4.toLowerCase()));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(tier_r4);
    \u0275\u0275advance(2);
    \u0275\u0275repeater(ctx_r2.tierBuckets()[tier_r4]);
  }
}
function TierListPageComponent_Conditional_5_For_8_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 10);
    \u0275\u0275listener("dragstart", function TierListPageComponent_Conditional_5_For_8_Template_div_dragstart_0_listener($event) {
      const item_r8 = \u0275\u0275restoreView(_r7).$implicit;
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.onDragStart($event, item_r8, null));
    });
    \u0275\u0275element(1, "img", 11);
    \u0275\u0275elementStart(2, "span");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const item_r8 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275property("src", item_r8.thumbnail_url, \u0275\u0275sanitizeUrl)("alt", item_r8.name);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(item_r8.name);
  }
}
function TierListPageComponent_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 4);
    \u0275\u0275repeaterCreate(1, TierListPageComponent_Conditional_5_For_2_Template, 6, 4, "div", 5, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275elementStart(3, "div", 6)(4, "h3");
    \u0275\u0275text(5, "Unranked");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "div", 7);
    \u0275\u0275listener("dragover", function TierListPageComponent_Conditional_5_Template_div_dragover_6_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.onDragOver($event));
    })("drop", function TierListPageComponent_Conditional_5_Template_div_drop_6_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.onDrop($event, null));
    });
    \u0275\u0275repeaterCreate(7, TierListPageComponent_Conditional_5_For_8_Template, 4, 3, "div", 8, _forTrack0);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r2.tiers);
    \u0275\u0275advance(6);
    \u0275\u0275repeater(ctx_r2.pool());
  }
}
var TIERS = ["S", "A", "B", "C", "D"];
var TierListPageComponent = class _TierListPageComponent {
  tierLists = inject(TierListsApiService);
  collections = inject(CollectionsApiService);
  toast = inject(ToastService);
  tiers = TIERS;
  loading = signal(true, ...ngDevMode ? [{ debugName: "loading" }] : (
    /* istanbul ignore next */
    []
  ));
  saving = signal(false, ...ngDevMode ? [{ debugName: "saving" }] : (
    /* istanbul ignore next */
    []
  ));
  pool = signal([], ...ngDevMode ? [{ debugName: "pool" }] : (
    /* istanbul ignore next */
    []
  ));
  tierBuckets = signal({
    S: [],
    A: [],
    B: [],
    C: [],
    D: []
  }, ...ngDevMode ? [{ debugName: "tierBuckets" }] : (
    /* istanbul ignore next */
    []
  ));
  dragItem = null;
  dragSource = null;
  allRanked() {
    const buckets = this.tierBuckets();
    return TIERS.flatMap((t) => buckets[t]);
  }
  ngOnInit() {
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
          }
        });
      },
      error: () => this.loading.set(false)
    });
  }
  onDragStart(event, item, tier) {
    this.dragItem = item;
    this.dragSource = tier ?? "pool";
    event.dataTransfer?.setData("text/plain", String(item.game_id));
  }
  onDragOver(event) {
    event.preventDefault();
  }
  onDrop(event, targetTier) {
    event.preventDefault();
    if (!this.dragItem || !this.dragSource)
      return;
    const item = this.dragItem;
    const source = this.dragSource;
    if (source === "pool") {
      this.pool.update((p) => p.filter((i) => i.game_id !== item.game_id));
    } else {
      this.tierBuckets.update((b) => __spreadProps(__spreadValues({}, b), {
        [source]: b[source].filter((i) => i.game_id !== item.game_id)
      }));
    }
    if (targetTier) {
      item.tier = targetTier;
      this.tierBuckets.update((b) => __spreadProps(__spreadValues({}, b), {
        [targetTier]: [...b[targetTier], item]
      }));
    } else {
      this.pool.update((p) => [...p, item]);
    }
    this.dragItem = null;
    this.dragSource = null;
  }
  toTierItems(games) {
    return games.map((g, i) => ({
      game_id: g.gameId,
      bgg_game_id: g.bggGameId,
      name: g.name,
      thumbnail_url: g.thumbnailUrl || g.imageUrl,
      tier: "D",
      position: i
    }));
  }
  applySaved(saved, games) {
    const buckets = { S: [], A: [], B: [], C: [], D: [] };
    const savedIds = new Set(saved.map((s) => s.game_id));
    for (const item of saved) {
      buckets[item.tier].push(item);
    }
    const unranked = games.filter((g) => !savedIds.has(g.gameId)).map((g, i) => ({
      game_id: g.gameId,
      bgg_game_id: g.bggGameId,
      name: g.name,
      thumbnail_url: g.thumbnailUrl || g.imageUrl,
      tier: "D",
      position: i
    }));
    this.tierBuckets.set(buckets);
    this.pool.set(unranked);
  }
  save() {
    const items = [];
    const buckets = this.tierBuckets();
    for (const tier of TIERS) {
      buckets[tier].forEach((item, idx) => {
        items.push(__spreadProps(__spreadValues({}, item), { tier, position: idx }));
      });
    }
    this.saving.set(true);
    this.tierLists.saveTierList({ name: "My Tier List", items }).subscribe({
      next: () => {
        this.toast.success("Tier list saved");
        this.saving.set(false);
      },
      error: () => this.saving.set(false)
    });
  }
  static \u0275fac = function TierListPageComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _TierListPageComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _TierListPageComponent, selectors: [["app-tier-list-page"]], decls: 6, vars: 3, consts: [["title", "Tier List", "subtitle", "Drag games to rank your favorites.", "overline", "Play"], ["type", "button", 1, "btn", "btn-primary", 3, "click", "disabled"], ["height", "400px"], ["title", "No games to rank", "message", "Import your collection first, then drag games into tiers.", "icon", "\u{1F3C6}"], [1, "tier-board"], [1, "tier-row"], [1, "pool-section"], [1, "tier-drop", "pool", 3, "dragover", "drop"], ["draggable", "true", 1, "tier-item"], [1, "tier-drop", 3, "dragover", "drop"], ["draggable", "true", 1, "tier-item", 3, "dragstart"], [3, "src", "alt"]], template: function TierListPageComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "app-page-header", 0)(1, "button", 1);
      \u0275\u0275listener("click", function TierListPageComponent_Template_button_click_1_listener() {
        return ctx.save();
      });
      \u0275\u0275text(2);
      \u0275\u0275elementEnd()();
      \u0275\u0275conditionalCreate(3, TierListPageComponent_Conditional_3_Template, 1, 0, "app-skeleton", 2)(4, TierListPageComponent_Conditional_4_Template, 1, 0, "app-empty-state", 3)(5, TierListPageComponent_Conditional_5_Template, 9, 0, "div", 4);
    }
    if (rf & 2) {
      \u0275\u0275advance();
      \u0275\u0275property("disabled", ctx.saving() || ctx.loading());
      \u0275\u0275advance();
      \u0275\u0275textInterpolate1(" ", ctx.saving() ? "Saving\u2026" : "Save", " ");
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.loading() ? 3 : ctx.pool().length === 0 && ctx.allRanked().length === 0 ? 4 : 5);
    }
  }, dependencies: [PageHeaderComponent, EmptyStateComponent, SkeletonComponent], styles: ["\n.tier-board[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: var(--space-md);\n}\n.tier-row[_ngcontent-%COMP%] {\n  display: flex;\n  gap: var(--space-md);\n  align-items: stretch;\n}\n.tier-label[_ngcontent-%COMP%] {\n  width: 48px;\n  display: grid;\n  place-items: center;\n  font-weight: 800;\n  font-size: 1.25rem;\n  border-radius: var(--radius-sm);\n  color: white;\n  flex-shrink: 0;\n}\n.tier-label--s[_ngcontent-%COMP%] {\n  background: var(--color-tier-s);\n}\n.tier-label--a[_ngcontent-%COMP%] {\n  background: var(--color-tier-a);\n}\n.tier-label--b[_ngcontent-%COMP%] {\n  background: var(--color-tier-b);\n}\n.tier-label--c[_ngcontent-%COMP%] {\n  background: var(--color-tier-c);\n}\n.tier-label--d[_ngcontent-%COMP%] {\n  background: var(--color-tier-d);\n}\n.tier-drop[_ngcontent-%COMP%] {\n  flex: 1;\n  min-height: 72px;\n  display: flex;\n  flex-wrap: wrap;\n  gap: var(--space-sm);\n  padding: var(--space-sm);\n  background: var(--color-surface-elevated);\n  border: 2px dashed var(--color-border);\n  border-radius: var(--radius-md);\n}\n.tier-item[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: var(--space-xs);\n  padding: var(--space-xs) var(--space-sm);\n  background: var(--color-surface);\n  border: 1px solid var(--color-border);\n  border-radius: var(--radius-sm);\n  font-size: 0.75rem;\n  font-weight: 600;\n  cursor: grab;\n}\n.tier-item[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n  width: 32px;\n  height: 32px;\n  object-fit: cover;\n  border-radius: var(--radius-sm);\n}\n.pool-section[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  margin: var(--space-lg) 0 var(--space-sm);\n  font-size: 0.875rem;\n  color: var(--color-text-muted);\n}\n/*# sourceMappingURL=tier-list-page.component.css.map */"], changeDetection: 0 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(TierListPageComponent, [{
    type: Component,
    args: [{ selector: "app-tier-list-page", changeDetection: ChangeDetectionStrategy.OnPush, imports: [PageHeaderComponent, EmptyStateComponent, SkeletonComponent], template: `
    <app-page-header
      title="Tier List"
      subtitle="Drag games to rank your favorites."
      overline="Play"
    >
      <button class="btn btn-primary" type="button" (click)="save()" [disabled]="saving() || loading()">
        {{ saving() ? 'Saving\u2026' : 'Save' }}
      </button>
    </app-page-header>

    @if (loading()) {
      <app-skeleton height="400px" />
    } @else if (pool().length === 0 && allRanked().length === 0) {
      <app-empty-state
        title="No games to rank"
        message="Import your collection first, then drag games into tiers."
        icon="\u{1F3C6}"
      />
    } @else {
      <div class="tier-board">
        @for (tier of tiers; track tier) {
          <div class="tier-row">
            <div class="tier-label tier-label--{{ tier.toLowerCase() }}">{{ tier }}</div>
            <div
              class="tier-drop"
              (dragover)="onDragOver($event)"
              (drop)="onDrop($event, tier)"
            >
              @for (item of tierBuckets()[tier]; track item.game_id) {
                <div
                  class="tier-item"
                  draggable="true"
                  (dragstart)="onDragStart($event, item, tier)"
                >
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
            (dragover)="onDragOver($event)"
            (drop)="onDrop($event, null)"
          >
            @for (item of pool(); track item.game_id) {
              <div
                class="tier-item"
                draggable="true"
                (dragstart)="onDragStart($event, item, null)"
              >
                <img [src]="item.thumbnail_url" [alt]="item.name" />
                <span>{{ item.name }}</span>
              </div>
            }
          </div>
        </div>
      </div>
    }
  `, styles: ["/* angular:styles/component:scss;4b0e46b5e0e4dc18b563a7363fbb7adda451a79f99b85653c12f38c85c1f65a2;C:/Users/baseb/OneDrive/Documents/GitHub/boardgame-social-v2/apps/web/src/app/features/tier-list/tier-list-page.component.ts */\n.tier-board {\n  display: flex;\n  flex-direction: column;\n  gap: var(--space-md);\n}\n.tier-row {\n  display: flex;\n  gap: var(--space-md);\n  align-items: stretch;\n}\n.tier-label {\n  width: 48px;\n  display: grid;\n  place-items: center;\n  font-weight: 800;\n  font-size: 1.25rem;\n  border-radius: var(--radius-sm);\n  color: white;\n  flex-shrink: 0;\n}\n.tier-label--s {\n  background: var(--color-tier-s);\n}\n.tier-label--a {\n  background: var(--color-tier-a);\n}\n.tier-label--b {\n  background: var(--color-tier-b);\n}\n.tier-label--c {\n  background: var(--color-tier-c);\n}\n.tier-label--d {\n  background: var(--color-tier-d);\n}\n.tier-drop {\n  flex: 1;\n  min-height: 72px;\n  display: flex;\n  flex-wrap: wrap;\n  gap: var(--space-sm);\n  padding: var(--space-sm);\n  background: var(--color-surface-elevated);\n  border: 2px dashed var(--color-border);\n  border-radius: var(--radius-md);\n}\n.tier-item {\n  display: flex;\n  align-items: center;\n  gap: var(--space-xs);\n  padding: var(--space-xs) var(--space-sm);\n  background: var(--color-surface);\n  border: 1px solid var(--color-border);\n  border-radius: var(--radius-sm);\n  font-size: 0.75rem;\n  font-weight: 600;\n  cursor: grab;\n}\n.tier-item img {\n  width: 32px;\n  height: 32px;\n  object-fit: cover;\n  border-radius: var(--radius-sm);\n}\n.pool-section h3 {\n  margin: var(--space-lg) 0 var(--space-sm);\n  font-size: 0.875rem;\n  color: var(--color-text-muted);\n}\n/*# sourceMappingURL=tier-list-page.component.css.map */\n"] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(TierListPageComponent, { className: "TierListPageComponent", filePath: "apps/web/src/app/features/tier-list/tier-list-page.component.ts", lineNumber: 150 });
})();
export {
  TierListPageComponent
};
//# sourceMappingURL=chunk-6ZVU7NGI.js.map
