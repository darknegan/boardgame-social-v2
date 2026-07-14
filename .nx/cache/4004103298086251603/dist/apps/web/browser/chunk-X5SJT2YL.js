import {
  CollectionsApiService
} from "./chunk-2TWOYIO7.js";
import {
  PlaysApiService
} from "./chunk-2BHGF5LB.js";
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
  ɵɵinterpolate,
  ɵɵinterpolate1,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵpureFunction0,
  ɵɵpureFunction1,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵrepeaterTrackByIdentity,
  ɵɵsanitizeUrl,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1
} from "./chunk-B6IJ3W3N.js";

// apps/web/src/app/features/profile/profile-page.component.ts
var _c0 = () => [1, 2, 3, 4];
var _c1 = (a0) => ["/game-overview", a0];
var _forTrack0 = ($index, $item) => $item.gameId;
function ProfilePageComponent_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "img", 4);
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275property("src", ctx_r0.avatarUrl(), \u0275\u0275sanitizeUrl);
  }
}
function ProfilePageComponent_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0);
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275textInterpolate1(" ", ctx_r0.initials(), " ");
  }
}
function ProfilePageComponent_Conditional_15_For_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "app-skeleton", 11);
  }
}
function ProfilePageComponent_Conditional_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 9);
    \u0275\u0275repeaterCreate(1, ProfilePageComponent_Conditional_15_For_2_Template, 1, 0, "app-skeleton", 11, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275advance();
    \u0275\u0275repeater(\u0275\u0275pureFunction0(0, _c0));
  }
}
function ProfilePageComponent_Conditional_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "app-empty-state", 10)(1, "a", 12);
    \u0275\u0275text(2, "Go to collection");
    \u0275\u0275elementEnd()();
  }
}
function ProfilePageComponent_Conditional_17_For_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "a", 13);
    \u0275\u0275element(1, "img", 14);
    \u0275\u0275elementStart(2, "p", 15);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const game_r2 = ctx.$implicit;
    \u0275\u0275property("routerLink", \u0275\u0275pureFunction1(4, _c1, game_r2.gameId));
    \u0275\u0275advance();
    \u0275\u0275property("src", game_r2.thumbnailUrl || game_r2.imageUrl, \u0275\u0275sanitizeUrl)("alt", game_r2.name);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(game_r2.name);
  }
}
function ProfilePageComponent_Conditional_17_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 9);
    \u0275\u0275repeaterCreate(1, ProfilePageComponent_Conditional_17_For_2_Template, 4, 6, "a", 13, _forTrack0);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r0.preview());
  }
}
var ProfilePageComponent = class _ProfilePageComponent {
  auth = inject(AuthService);
  collections = inject(CollectionsApiService);
  plays = inject(PlaysApiService);
  loading = signal(true, ...ngDevMode ? [{ debugName: "loading" }] : (
    /* istanbul ignore next */
    []
  ));
  preview = signal([], ...ngDevMode ? [{ debugName: "preview" }] : (
    /* istanbul ignore next */
    []
  ));
  displayName() {
    return this.auth.profile()?.display_name ?? this.auth.profile()?.username ?? "Player";
  }
  username() {
    return this.auth.profile()?.username ?? "player";
  }
  avatarUrl() {
    return this.auth.profile()?.profile_picture_url;
  }
  bggUsername() {
    return this.auth.profile()?.bgg_username;
  }
  initials() {
    return this.displayName().split(" ").map((p) => p[0]).join("").slice(0, 2).toUpperCase();
  }
  ngOnInit() {
    this.collections.getPreview(8).subscribe({
      next: (items) => {
        this.preview.set(items);
        this.loading.set(false);
      },
      error: () => this.loading.set(false)
    });
    this.plays.listPlays(5).subscribe();
  }
  static \u0275fac = function ProfilePageComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ProfilePageComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ProfilePageComponent, selectors: [["app-profile-page"]], decls: 18, vars: 7, consts: [["overline", "Your shelf", 3, "title", "subtitle"], ["routerLink", "/profile/edit", 1, "btn", "btn-secondary"], [1, "profile-hero", "card"], [1, "avatar"], ["alt", "", 3, "src"], [1, "stat-label"], [1, "stat-value"], [1, "section"], [1, "section-title"], [1, "game-grid"], ["title", "No games yet", "message", "Import your BGG collection to populate your shelf.", "icon", "\u{1F4DA}"], ["height", "180px"], ["routerLink", "/collection", 1, "btn", "btn-primary"], [1, "game-card", "card", 3, "routerLink"], ["loading", "lazy", 3, "src", "alt"], [1, "game-name"]], template: function ProfilePageComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "app-page-header", 0)(1, "a", 1);
      \u0275\u0275text(2, "Edit profile");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(3, "div", 2)(4, "div", 3);
      \u0275\u0275conditionalCreate(5, ProfilePageComponent_Conditional_5_Template, 1, 1, "img", 4)(6, ProfilePageComponent_Conditional_6_Template, 1, 1);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(7, "div")(8, "p", 5);
      \u0275\u0275text(9, "BGG username");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(10, "p", 6);
      \u0275\u0275text(11);
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(12, "section", 7)(13, "h2", 8);
      \u0275\u0275text(14, "Collection preview");
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(15, ProfilePageComponent_Conditional_15_Template, 3, 1, "div", 9)(16, ProfilePageComponent_Conditional_16_Template, 3, 0, "app-empty-state", 10)(17, ProfilePageComponent_Conditional_17_Template, 3, 0, "div", 9);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      \u0275\u0275property("title", \u0275\u0275interpolate(ctx.displayName()))("subtitle", \u0275\u0275interpolate1("@", ctx.username()));
      \u0275\u0275advance(5);
      \u0275\u0275conditional(ctx.avatarUrl() ? 5 : 6);
      \u0275\u0275advance(6);
      \u0275\u0275textInterpolate(ctx.bggUsername() ?? "Not linked");
      \u0275\u0275advance(4);
      \u0275\u0275conditional(ctx.loading() ? 15 : ctx.preview().length === 0 ? 16 : 17);
    }
  }, dependencies: [PageHeaderComponent, RouterLink, EmptyStateComponent, SkeletonComponent], styles: ['\n.profile-hero[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: var(--space-xl);\n  padding: var(--space-xl);\n  margin-bottom: var(--space-2xl);\n}\n.avatar[_ngcontent-%COMP%] {\n  width: 80px;\n  height: 80px;\n  border-radius: var(--radius-full);\n  background:\n    linear-gradient(\n      135deg,\n      var(--color-grad-start),\n      var(--color-grad-end));\n  color: white;\n  display: grid;\n  place-items: center;\n  font-size: 1.5rem;\n  font-weight: 700;\n  overflow: hidden;\n  flex-shrink: 0;\n}\n.avatar[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n}\n.stat-label[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 0.75rem;\n  font-weight: 700;\n  text-transform: uppercase;\n  color: var(--color-text-muted);\n}\n.stat-value[_ngcontent-%COMP%] {\n  margin: var(--space-xs) 0 0;\n  font-weight: 700;\n  color: var(--color-text-primary);\n}\n.section[_ngcontent-%COMP%] {\n  margin-bottom: var(--space-2xl);\n}\n.section-title[_ngcontent-%COMP%] {\n  margin: 0 0 var(--space-lg);\n  font-family: "Fraunces", serif;\n  font-size: 1.25rem;\n}\n.game-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));\n  gap: var(--space-lg);\n}\n.game-card[_ngcontent-%COMP%] {\n  overflow: hidden;\n  transition: transform 0.15s ease;\n}\n.game-card[_ngcontent-%COMP%]:hover {\n  transform: translateY(-2px);\n}\n.game-card[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n  width: 100%;\n  aspect-ratio: 1;\n  object-fit: cover;\n}\n.game-name[_ngcontent-%COMP%] {\n  margin: 0;\n  padding: var(--space-sm) var(--space-md);\n  font-size: 0.8125rem;\n  font-weight: 700;\n  color: var(--color-text-primary);\n}\n/*# sourceMappingURL=profile-page.component.css.map */'], changeDetection: 0 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ProfilePageComponent, [{
    type: Component,
    args: [{ selector: "app-profile-page", changeDetection: ChangeDetectionStrategy.OnPush, imports: [PageHeaderComponent, RouterLink, EmptyStateComponent, SkeletonComponent], template: `
    <app-page-header
      title="{{ displayName() }}"
      subtitle="@{{ username() }}"
      overline="Your shelf"
    >
      <a class="btn btn-secondary" routerLink="/profile/edit">Edit profile</a>
    </app-page-header>

    <div class="profile-hero card">
      <div class="avatar">
        @if (avatarUrl()) {
          <img [src]="avatarUrl()" alt="" />
        } @else {
          {{ initials() }}
        }
      </div>
      <div>
        <p class="stat-label">BGG username</p>
        <p class="stat-value">{{ bggUsername() ?? 'Not linked' }}</p>
      </div>
    </div>

    <section class="section">
      <h2 class="section-title">Collection preview</h2>
      @if (loading()) {
        <div class="game-grid">
          @for (i of [1, 2, 3, 4]; track i) {
            <app-skeleton height="180px" />
          }
        </div>
      } @else if (preview().length === 0) {
        <app-empty-state
          title="No games yet"
          message="Import your BGG collection to populate your shelf."
          icon="\u{1F4DA}"
        >
          <a class="btn btn-primary" routerLink="/collection">Go to collection</a>
        </app-empty-state>
      } @else {
        <div class="game-grid">
          @for (game of preview(); track game.gameId) {
            <a class="game-card card" [routerLink]="['/game-overview', game.gameId]">
              <img [src]="game.thumbnailUrl || game.imageUrl" [alt]="game.name" loading="lazy" />
              <p class="game-name">{{ game.name }}</p>
            </a>
          }
        </div>
      }
    </section>
  `, styles: ['/* angular:styles/component:scss;5a7113ecf38911e47e1d25f339a58fda7ae2dd36c3f940010d491d0229c70bc4;C:/Users/baseb/OneDrive/Documents/GitHub/boardgame-social-v2/apps/web/src/app/features/profile/profile-page.component.ts */\n.profile-hero {\n  display: flex;\n  align-items: center;\n  gap: var(--space-xl);\n  padding: var(--space-xl);\n  margin-bottom: var(--space-2xl);\n}\n.avatar {\n  width: 80px;\n  height: 80px;\n  border-radius: var(--radius-full);\n  background:\n    linear-gradient(\n      135deg,\n      var(--color-grad-start),\n      var(--color-grad-end));\n  color: white;\n  display: grid;\n  place-items: center;\n  font-size: 1.5rem;\n  font-weight: 700;\n  overflow: hidden;\n  flex-shrink: 0;\n}\n.avatar img {\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n}\n.stat-label {\n  margin: 0;\n  font-size: 0.75rem;\n  font-weight: 700;\n  text-transform: uppercase;\n  color: var(--color-text-muted);\n}\n.stat-value {\n  margin: var(--space-xs) 0 0;\n  font-weight: 700;\n  color: var(--color-text-primary);\n}\n.section {\n  margin-bottom: var(--space-2xl);\n}\n.section-title {\n  margin: 0 0 var(--space-lg);\n  font-family: "Fraunces", serif;\n  font-size: 1.25rem;\n}\n.game-grid {\n  display: grid;\n  grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));\n  gap: var(--space-lg);\n}\n.game-card {\n  overflow: hidden;\n  transition: transform 0.15s ease;\n}\n.game-card:hover {\n  transform: translateY(-2px);\n}\n.game-card img {\n  width: 100%;\n  aspect-ratio: 1;\n  object-fit: cover;\n}\n.game-name {\n  margin: 0;\n  padding: var(--space-sm) var(--space-md);\n  font-size: 0.8125rem;\n  font-weight: 700;\n  color: var(--color-text-primary);\n}\n/*# sourceMappingURL=profile-page.component.css.map */\n'] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ProfilePageComponent, { className: "ProfilePageComponent", filePath: "apps/web/src/app/features/profile/profile-page.component.ts", lineNumber: 149 });
})();
export {
  ProfilePageComponent
};
//# sourceMappingURL=chunk-X5SJT2YL.js.map
