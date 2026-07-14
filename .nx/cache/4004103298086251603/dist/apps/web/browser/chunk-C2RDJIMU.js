import {
  GamesApiService
} from "./chunk-XGY4NOAH.js";
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
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2
} from "./chunk-B6IJ3W3N.js";

// apps/web/src/app/features/games/games-page.component.ts
var _c0 = () => [1, 2, 3, 4, 5, 6];
var _c1 = (a0) => ["/game-overview", a0];
var _forTrack0 = ($index, $item) => $item.gameId;
function GamesPageComponent_Conditional_3_For_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "app-skeleton", 5);
  }
}
function GamesPageComponent_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 3);
    \u0275\u0275repeaterCreate(1, GamesPageComponent_Conditional_3_For_2_Template, 1, 0, "app-skeleton", 5, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275advance();
    \u0275\u0275repeater(\u0275\u0275pureFunction0(0, _c0));
  }
}
function GamesPageComponent_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "app-empty-state", 4);
  }
}
function GamesPageComponent_Conditional_5_For_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "a", 6);
    \u0275\u0275element(1, "img", 8);
    \u0275\u0275elementStart(2, "div", 9)(3, "p", 10);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "p", 11);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const game_r1 = ctx.$implicit;
    \u0275\u0275property("routerLink", \u0275\u0275pureFunction1(6, _c1, game_r1.gameId));
    \u0275\u0275advance();
    \u0275\u0275property("src", game_r1.thumbnailUrl || game_r1.imageUrl, \u0275\u0275sanitizeUrl)("alt", game_r1.name);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(game_r1.name);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate2("Rank #", game_r1.rank, " \xB7 ", game_r1.yearPublished);
  }
}
function GamesPageComponent_Conditional_5_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 12);
    \u0275\u0275listener("click", function GamesPageComponent_Conditional_5_Conditional_3_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.loadMore());
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275property("disabled", ctx_r2.loadingMore());
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r2.loadingMore() ? "Loading\u2026" : "Load more", " ");
  }
}
function GamesPageComponent_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 3);
    \u0275\u0275repeaterCreate(1, GamesPageComponent_Conditional_5_For_2_Template, 7, 8, "a", 6, _forTrack0);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(3, GamesPageComponent_Conditional_5_Conditional_3_Template, 2, 2, "button", 7);
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r2.games());
    \u0275\u0275advance(2);
    \u0275\u0275conditional(!ctx_r2.searching() ? 3 : -1);
  }
}
var GamesPageComponent = class _GamesPageComponent {
  gamesApi = inject(GamesApiService);
  searchTimeout = null;
  loading = signal(true, ...ngDevMode ? [{ debugName: "loading" }] : (
    /* istanbul ignore next */
    []
  ));
  loadingMore = signal(false, ...ngDevMode ? [{ debugName: "loadingMore" }] : (
    /* istanbul ignore next */
    []
  ));
  searching = signal(false, ...ngDevMode ? [{ debugName: "searching" }] : (
    /* istanbul ignore next */
    []
  ));
  query = signal("", ...ngDevMode ? [{ debugName: "query" }] : (
    /* istanbul ignore next */
    []
  ));
  games = signal([], ...ngDevMode ? [{ debugName: "games" }] : (
    /* istanbul ignore next */
    []
  ));
  offset = 0;
  pageSize = 24;
  ngOnInit() {
    this.loadCatalog();
  }
  onSearch(event) {
    const value = event.target.value;
    this.query.set(value);
    if (this.searchTimeout)
      clearTimeout(this.searchTimeout);
    this.searchTimeout = setTimeout(() => {
      if (value.trim().length < 2) {
        this.searching.set(false);
        this.offset = 0;
        this.loadCatalog();
        return;
      }
      this.searching.set(true);
      this.loading.set(true);
      this.gamesApi.search(value.trim()).subscribe({
        next: (results) => {
          this.games.set(results.map((r) => ({
            gameId: Number(r.value),
            bggGameId: Number(r.value),
            name: r.label,
            imageUrl: "",
            thumbnailUrl: "",
            rank: 0,
            average: 0,
            bayesAverage: 0,
            playerCount: 0,
            yearPublished: 0,
            abstractsRank: 0,
            cgsRank: 0,
            childrensGamesRank: 0,
            familyGamesRank: 0,
            partyGamesRank: 0,
            strategyGamesRank: 0,
            thematicRank: 0,
            warGamesRank: 0
          })));
          this.loading.set(false);
        },
        error: () => this.loading.set(false)
      });
    }, 300);
  }
  loadCatalog() {
    this.loading.set(true);
    this.gamesApi.getAll(this.pageSize, 0).subscribe({
      next: (items) => {
        this.games.set(items);
        this.offset = items.length;
        this.loading.set(false);
      },
      error: () => this.loading.set(false)
    });
  }
  loadMore() {
    this.loadingMore.set(true);
    this.gamesApi.getAll(this.pageSize, this.offset).subscribe({
      next: (items) => {
        this.games.update((current) => [...current, ...items]);
        this.offset += items.length;
        this.loadingMore.set(false);
      },
      error: () => this.loadingMore.set(false)
    });
  }
  static \u0275fac = function GamesPageComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _GamesPageComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _GamesPageComponent, selectors: [["app-games-page"]], decls: 6, vars: 2, consts: [["title", "Games", "subtitle", "Explore the global catalog.", "overline", "Browse"], [1, "search-bar"], ["type", "search", "placeholder", "Search games\u2026", 1, "input", 3, "input", "value"], [1, "game-grid"], ["title", "No games found", "message", "Try a different search term.", "icon", "\u{1F3AF}"], ["height", "200px"], [1, "game-card", "card", 3, "routerLink"], ["type", "button", 1, "btn", "btn-secondary", "load-more", 3, "disabled"], ["loading", "lazy", 3, "src", "alt"], [1, "game-info"], [1, "game-name"], [1, "game-meta"], ["type", "button", 1, "btn", "btn-secondary", "load-more", 3, "click", "disabled"]], template: function GamesPageComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275element(0, "app-page-header", 0);
      \u0275\u0275elementStart(1, "div", 1)(2, "input", 2);
      \u0275\u0275listener("input", function GamesPageComponent_Template_input_input_2_listener($event) {
        return ctx.onSearch($event);
      });
      \u0275\u0275elementEnd()();
      \u0275\u0275conditionalCreate(3, GamesPageComponent_Conditional_3_Template, 3, 1, "div", 3)(4, GamesPageComponent_Conditional_4_Template, 1, 0, "app-empty-state", 4)(5, GamesPageComponent_Conditional_5_Template, 4, 1);
    }
    if (rf & 2) {
      \u0275\u0275advance(2);
      \u0275\u0275property("value", ctx.query());
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.loading() ? 3 : ctx.games().length === 0 ? 4 : 5);
    }
  }, dependencies: [PageHeaderComponent, RouterLink, EmptyStateComponent, SkeletonComponent], styles: ["\n.search-bar[_ngcontent-%COMP%] {\n  margin-bottom: var(--space-xl);\n  max-width: 400px;\n}\n.game-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));\n  gap: var(--space-lg);\n}\n.game-card[_ngcontent-%COMP%] {\n  overflow: hidden;\n}\n.game-card[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n  width: 100%;\n  aspect-ratio: 1;\n  object-fit: cover;\n}\n.game-info[_ngcontent-%COMP%] {\n  padding: var(--space-sm) var(--space-md);\n}\n.game-name[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 0.8125rem;\n  font-weight: 700;\n}\n.game-meta[_ngcontent-%COMP%] {\n  margin: var(--space-xs) 0 0;\n  font-size: 0.75rem;\n  color: var(--color-text-muted);\n}\n.load-more[_ngcontent-%COMP%] {\n  margin-top: var(--space-xl);\n}\n/*# sourceMappingURL=games-page.component.css.map */"], changeDetection: 0 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(GamesPageComponent, [{
    type: Component,
    args: [{ selector: "app-games-page", changeDetection: ChangeDetectionStrategy.OnPush, imports: [PageHeaderComponent, RouterLink, EmptyStateComponent, SkeletonComponent], template: `
    <app-page-header title="Games" subtitle="Explore the global catalog." overline="Browse" />

    <div class="search-bar">
      <input
        class="input"
        type="search"
        placeholder="Search games\u2026"
        [value]="query()"
        (input)="onSearch($event)"
      />
    </div>

    @if (loading()) {
      <div class="game-grid">
        @for (i of [1, 2, 3, 4, 5, 6]; track i) {
          <app-skeleton height="200px" />
        }
      </div>
    } @else if (games().length === 0) {
      <app-empty-state title="No games found" message="Try a different search term." icon="\u{1F3AF}" />
    } @else {
      <div class="game-grid">
        @for (game of games(); track game.gameId) {
          <a class="game-card card" [routerLink]="['/game-overview', game.gameId]">
            <img [src]="game.thumbnailUrl || game.imageUrl" [alt]="game.name" loading="lazy" />
            <div class="game-info">
              <p class="game-name">{{ game.name }}</p>
              <p class="game-meta">Rank #{{ game.rank }} \xB7 {{ game.yearPublished }}</p>
            </div>
          </a>
        }
      </div>
      @if (!searching()) {
        <button class="btn btn-secondary load-more" type="button" (click)="loadMore()" [disabled]="loadingMore()">
          {{ loadingMore() ? 'Loading\u2026' : 'Load more' }}
        </button>
      }
    }
  `, styles: ["/* angular:styles/component:scss;ff91a992b097721ca4c46ffd8770c2a1554e42240a29d101590989d9d580601a;C:/Users/baseb/OneDrive/Documents/GitHub/boardgame-social-v2/apps/web/src/app/features/games/games-page.component.ts */\n.search-bar {\n  margin-bottom: var(--space-xl);\n  max-width: 400px;\n}\n.game-grid {\n  display: grid;\n  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));\n  gap: var(--space-lg);\n}\n.game-card {\n  overflow: hidden;\n}\n.game-card img {\n  width: 100%;\n  aspect-ratio: 1;\n  object-fit: cover;\n}\n.game-info {\n  padding: var(--space-sm) var(--space-md);\n}\n.game-name {\n  margin: 0;\n  font-size: 0.8125rem;\n  font-weight: 700;\n}\n.game-meta {\n  margin: var(--space-xs) 0 0;\n  font-size: 0.75rem;\n  color: var(--color-text-muted);\n}\n.load-more {\n  margin-top: var(--space-xl);\n}\n/*# sourceMappingURL=games-page.component.css.map */\n"] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(GamesPageComponent, { className: "GamesPageComponent", filePath: "apps/web/src/app/features/games/games-page.component.ts", lineNumber: 96 });
})();
export {
  GamesPageComponent
};
//# sourceMappingURL=chunk-C2RDJIMU.js.map
