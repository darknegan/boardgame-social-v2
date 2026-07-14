import {
  CollectionsApiService
} from "./chunk-2TWOYIO7.js";
import {
  ToastService
} from "./chunk-FNB3VBA5.js";
import {
  AuthService
} from "./chunk-QR2D7B5O.js";
import "./chunk-ESOBHDPQ.js";
import {
  EmptyStateComponent,
  SkeletonComponent
} from "./chunk-T3V355ZA.js";
import {
  RouterLink
} from "./chunk-3YWMTBPO.js";
import {
  PageHeaderComponent
} from "./chunk-5ISH4G2G.js";
import "./chunk-G3THX2OW.js";
import "./chunk-XKHOIK35.js";
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  setClassMetadata,
  signal,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵdefineComponent,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵpureFunction0,
  ɵɵpureFunction1,
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

// apps/web/src/app/features/collection/collection-page.component.ts
var _c0 = () => [1, 2, 3, 4, 5, 6];
var _c1 = (a0) => ["/game-overview", a0];
var _forTrack0 = ($index, $item) => $item.id;
function CollectionPageComponent_Conditional_3_For_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "app-skeleton", 5);
  }
}
function CollectionPageComponent_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 2);
    \u0275\u0275repeaterCreate(1, CollectionPageComponent_Conditional_3_For_2_Template, 1, 0, "app-skeleton", 5, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275advance();
    \u0275\u0275repeater(\u0275\u0275pureFunction0(0, _c0));
  }
}
function CollectionPageComponent_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "app-empty-state", 3)(1, "button", 6);
    \u0275\u0275listener("click", function CollectionPageComponent_Conditional_4_Template_button_click_1_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.load());
    });
    \u0275\u0275text(2, "Retry");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275property("message", ctx_r1.error());
  }
}
function CollectionPageComponent_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "app-empty-state", 4)(1, "button", 7);
    \u0275\u0275listener("click", function CollectionPageComponent_Conditional_5_Template_button_click_1_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.importCollection());
    });
    \u0275\u0275text(2, "Import from BGG");
    \u0275\u0275elementEnd()();
  }
}
function CollectionPageComponent_Conditional_6_For_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "a", 9);
    \u0275\u0275element(1, "img", 10);
    \u0275\u0275elementStart(2, "p", 11);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const game_r4 = ctx.$implicit;
    \u0275\u0275property("routerLink", \u0275\u0275pureFunction1(4, _c1, game_r4.game_id));
    \u0275\u0275advance();
    \u0275\u0275property("src", game_r4.thumbnail_url || game_r4.image_url, \u0275\u0275sanitizeUrl)("alt", game_r4.name);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(game_r4.name);
  }
}
function CollectionPageComponent_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 8);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "div", 2);
    \u0275\u0275repeaterCreate(3, CollectionPageComponent_Conditional_6_For_4_Template, 4, 6, "a", 9, _forTrack0);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("", ctx_r1.games().length, " games");
    \u0275\u0275advance(2);
    \u0275\u0275repeater(ctx_r1.games());
  }
}
var CollectionPageComponent = class _CollectionPageComponent {
  collections = inject(CollectionsApiService);
  auth = inject(AuthService);
  toast = inject(ToastService);
  loading = signal(true, ...ngDevMode ? [{ debugName: "loading" }] : (
    /* istanbul ignore next */
    []
  ));
  importing = signal(false, ...ngDevMode ? [{ debugName: "importing" }] : (
    /* istanbul ignore next */
    []
  ));
  error = signal("", ...ngDevMode ? [{ debugName: "error" }] : (
    /* istanbul ignore next */
    []
  ));
  games = signal([], ...ngDevMode ? [{ debugName: "games" }] : (
    /* istanbul ignore next */
    []
  ));
  ngOnInit() {
    this.load();
  }
  load() {
    this.loading.set(true);
    this.error.set("");
    this.collections.getCollection().subscribe({
      next: (items) => {
        this.games.set(items);
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set(err?.message ?? "Failed to load collection");
        this.loading.set(false);
      }
    });
  }
  importCollection() {
    const username = this.auth.profile()?.bgg_username;
    if (!username) {
      this.toast.error("Set your BGG username in profile settings first");
      return;
    }
    this.importing.set(true);
    this.collections.importFromBgg(username).subscribe({
      next: () => {
        this.toast.success("Collection imported");
        this.importing.set(false);
        this.load();
      },
      error: () => this.importing.set(false)
    });
  }
  static \u0275fac = function CollectionPageComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _CollectionPageComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _CollectionPageComponent, selectors: [["app-collection-page"]], decls: 7, vars: 3, consts: [["title", "Collection", "subtitle", "Browse and manage your owned games.", "overline", "Shelf"], ["type", "button", 1, "btn", "btn-primary", 3, "click", "disabled"], [1, "game-grid"], ["title", "Could not load collection", "icon", "\u26A0\uFE0F", 3, "message"], ["title", "Your shelf is empty", "message", "Import your BoardGameGeek collection to get started.", "icon", "\u{1F4DA}"], ["height", "200px"], ["type", "button", 1, "btn", "btn-secondary", 3, "click"], ["type", "button", 1, "btn", "btn-primary", 3, "click"], [1, "count"], [1, "game-card", "card", 3, "routerLink"], ["loading", "lazy", 3, "src", "alt"], [1, "game-name"]], template: function CollectionPageComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "app-page-header", 0)(1, "button", 1);
      \u0275\u0275listener("click", function CollectionPageComponent_Template_button_click_1_listener() {
        return ctx.importCollection();
      });
      \u0275\u0275text(2);
      \u0275\u0275elementEnd()();
      \u0275\u0275conditionalCreate(3, CollectionPageComponent_Conditional_3_Template, 3, 1, "div", 2)(4, CollectionPageComponent_Conditional_4_Template, 3, 1, "app-empty-state", 3)(5, CollectionPageComponent_Conditional_5_Template, 3, 0, "app-empty-state", 4)(6, CollectionPageComponent_Conditional_6_Template, 5, 1);
    }
    if (rf & 2) {
      \u0275\u0275advance();
      \u0275\u0275property("disabled", ctx.importing());
      \u0275\u0275advance();
      \u0275\u0275textInterpolate1(" ", ctx.importing() ? "Importing\u2026" : "Sync from BGG", " ");
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.loading() ? 3 : ctx.error() ? 4 : ctx.games().length === 0 ? 5 : 6);
    }
  }, dependencies: [PageHeaderComponent, RouterLink, EmptyStateComponent, SkeletonComponent], styles: ["\n.count[_ngcontent-%COMP%] {\n  margin: 0 0 var(--space-lg);\n  color: var(--color-text-muted);\n  font-size: 0.875rem;\n  font-weight: 600;\n}\n.game-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));\n  gap: var(--space-lg);\n}\n.game-card[_ngcontent-%COMP%] {\n  overflow: hidden;\n  transition: transform 0.15s ease;\n}\n.game-card[_ngcontent-%COMP%]:hover {\n  transform: translateY(-2px);\n}\n.game-card[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n  width: 100%;\n  aspect-ratio: 1;\n  object-fit: cover;\n}\n.game-name[_ngcontent-%COMP%] {\n  margin: 0;\n  padding: var(--space-sm) var(--space-md);\n  font-size: 0.8125rem;\n  font-weight: 700;\n}\n/*# sourceMappingURL=collection-page.component.css.map */"], changeDetection: 0 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CollectionPageComponent, [{
    type: Component,
    args: [{ selector: "app-collection-page", changeDetection: ChangeDetectionStrategy.OnPush, imports: [PageHeaderComponent, RouterLink, EmptyStateComponent, SkeletonComponent], template: `
    <app-page-header
      title="Collection"
      subtitle="Browse and manage your owned games."
      overline="Shelf"
    >
      <button class="btn btn-primary" type="button" (click)="importCollection()" [disabled]="importing()">
        {{ importing() ? 'Importing\u2026' : 'Sync from BGG' }}
      </button>
    </app-page-header>

    @if (loading()) {
      <div class="game-grid">
        @for (i of [1, 2, 3, 4, 5, 6]; track i) {
          <app-skeleton height="200px" />
        }
      </div>
    } @else if (error()) {
      <app-empty-state title="Could not load collection" [message]="error()" icon="\u26A0\uFE0F">
        <button class="btn btn-secondary" type="button" (click)="load()">Retry</button>
      </app-empty-state>
    } @else if (games().length === 0) {
      <app-empty-state
        title="Your shelf is empty"
        message="Import your BoardGameGeek collection to get started."
        icon="\u{1F4DA}"
      >
        <button class="btn btn-primary" type="button" (click)="importCollection()">Import from BGG</button>
      </app-empty-state>
    } @else {
      <p class="count">{{ games().length }} games</p>
      <div class="game-grid">
        @for (game of games(); track game.id) {
          <a class="game-card card" [routerLink]="['/game-overview', game.game_id]">
            <img [src]="game.thumbnail_url || game.image_url" [alt]="game.name" loading="lazy" />
            <p class="game-name">{{ game.name }}</p>
          </a>
        }
      </div>
    }
  `, styles: ["/* angular:styles/component:scss;369aefdf4e153f9af3dd4e0bbff7a38794b86a7f846b7d59d43c710c69b2ad3f;C:/Users/baseb/OneDrive/Documents/GitHub/boardgame-social-v2/apps/web/src/app/features/collection/collection-page.component.ts */\n.count {\n  margin: 0 0 var(--space-lg);\n  color: var(--color-text-muted);\n  font-size: 0.875rem;\n  font-weight: 600;\n}\n.game-grid {\n  display: grid;\n  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));\n  gap: var(--space-lg);\n}\n.game-card {\n  overflow: hidden;\n  transition: transform 0.15s ease;\n}\n.game-card:hover {\n  transform: translateY(-2px);\n}\n.game-card img {\n  width: 100%;\n  aspect-ratio: 1;\n  object-fit: cover;\n}\n.game-name {\n  margin: 0;\n  padding: var(--space-sm) var(--space-md);\n  font-size: 0.8125rem;\n  font-weight: 700;\n}\n/*# sourceMappingURL=collection-page.component.css.map */\n"] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(CollectionPageComponent, { className: "CollectionPageComponent", filePath: "apps/web/src/app/features/collection/collection-page.component.ts", lineNumber: 93 });
})();
export {
  CollectionPageComponent
};
//# sourceMappingURL=chunk-6BFOTSBT.js.map
