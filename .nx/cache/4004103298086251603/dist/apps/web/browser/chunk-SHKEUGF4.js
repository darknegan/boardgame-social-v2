import {
  SupabaseService
} from "./chunk-ESOBHDPQ.js";
import {
  EmptyStateComponent,
  SkeletonComponent
} from "./chunk-T3V355ZA.js";
import {
  ActivatedRoute
} from "./chunk-3YWMTBPO.js";
import {
  PageHeaderComponent
} from "./chunk-5ISH4G2G.js";
import "./chunk-G3THX2OW.js";
import "./chunk-XKHOIK35.js";
import {
  ChangeDetectionStrategy,
  Component,
  Injectable,
  inject,
  setClassMetadata,
  signal,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵdefineComponent,
  ɵɵdefineInjectable,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵsanitizeUrl,
  ɵɵtext,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2
} from "./chunk-B6IJ3W3N.js";

// apps/web/src/app/core/api/profile-api.service.ts
var ProfileApiService = class _ProfileApiService {
  supabase = inject(SupabaseService, { optional: true })?.supabase;
  async getByUsername(username) {
    if (!this.supabase)
      return null;
    const { data, error } = await this.supabase.from("profiles").select("*").eq("username", username).maybeSingle();
    if (error || !data)
      return null;
    return data;
  }
  static \u0275fac = function ProfileApiService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ProfileApiService)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _ProfileApiService, factory: _ProfileApiService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ProfileApiService, [{
    type: Injectable,
    args: [{ providedIn: "root" }]
  }], null, null);
})();

// apps/web/src/app/features/profile/user-profile-page.component.ts
function UserProfilePageComponent_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "app-skeleton", 1)(1, "app-skeleton", 2);
  }
}
function UserProfilePageComponent_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "app-empty-state", 0);
  }
}
function UserProfilePageComponent_Conditional_2_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "img", 6);
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275property("src", ctx_r0.profile().profile_picture_url, \u0275\u0275sanitizeUrl);
  }
}
function UserProfilePageComponent_Conditional_2_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0);
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275textInterpolate1(" ", ctx_r0.initials(), " ");
  }
}
function UserProfilePageComponent_Conditional_2_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 7);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("BGG: ", ctx_r0.profile().bgg_username);
  }
}
function UserProfilePageComponent_Conditional_2_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 7);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate2("", ctx_r0.profile().city, "", ctx_r0.profile().subdivision ? ", " + ctx_r0.profile().subdivision : "");
  }
}
function UserProfilePageComponent_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "app-page-header", 3);
    \u0275\u0275elementStart(1, "div", 4)(2, "div", 5);
    \u0275\u0275conditionalCreate(3, UserProfilePageComponent_Conditional_2_Conditional_3_Template, 1, 1, "img", 6)(4, UserProfilePageComponent_Conditional_2_Conditional_4_Template, 1, 1);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "div");
    \u0275\u0275conditionalCreate(6, UserProfilePageComponent_Conditional_2_Conditional_6_Template, 2, 1, "p", 7);
    \u0275\u0275conditionalCreate(7, UserProfilePageComponent_Conditional_2_Conditional_7_Template, 2, 2, "p", 7);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275property("title", ctx_r0.displayName())("subtitle", "@" + ctx_r0.profile().username);
    \u0275\u0275advance(3);
    \u0275\u0275conditional(ctx_r0.profile().profile_picture_url ? 3 : 4);
    \u0275\u0275advance(3);
    \u0275\u0275conditional(ctx_r0.profile().bgg_username ? 6 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.profile().city ? 7 : -1);
  }
}
var UserProfilePageComponent = class _UserProfilePageComponent {
  route = inject(ActivatedRoute);
  profileApi = inject(ProfileApiService);
  loading = signal(true, ...ngDevMode ? [{ debugName: "loading" }] : (
    /* istanbul ignore next */
    []
  ));
  profile = signal(null, ...ngDevMode ? [{ debugName: "profile" }] : (
    /* istanbul ignore next */
    []
  ));
  displayName() {
    const p = this.profile();
    return p?.display_name ?? p?.username ?? "Player";
  }
  initials() {
    return this.displayName().split(" ").map((part) => part[0]).join("").slice(0, 2).toUpperCase();
  }
  ngOnInit() {
    const username = this.route.snapshot.paramMap.get("username") ?? "";
    this.profileApi.getByUsername(username).then((p) => {
      this.profile.set(p);
      this.loading.set(false);
    });
  }
  static \u0275fac = function UserProfilePageComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _UserProfilePageComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _UserProfilePageComponent, selectors: [["app-user-profile-page"]], decls: 3, vars: 1, consts: [["title", "User not found", "message", "No player with that username exists.", "icon", "\u{1F464}"], ["height", "2rem", "width", "200px"], ["height", "80px"], ["overline", "Player", 3, "title", "subtitle"], [1, "profile-hero", "card"], [1, "avatar"], ["alt", "", 3, "src"], [1, "meta"]], template: function UserProfilePageComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275conditionalCreate(0, UserProfilePageComponent_Conditional_0_Template, 2, 0)(1, UserProfilePageComponent_Conditional_1_Template, 1, 0, "app-empty-state", 0)(2, UserProfilePageComponent_Conditional_2_Template, 8, 5);
    }
    if (rf & 2) {
      \u0275\u0275conditional(ctx.loading() ? 0 : !ctx.profile() ? 1 : 2);
    }
  }, dependencies: [PageHeaderComponent, EmptyStateComponent, SkeletonComponent], styles: ["\n.profile-hero[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: var(--space-xl);\n  padding: var(--space-xl);\n}\n.avatar[_ngcontent-%COMP%] {\n  width: 80px;\n  height: 80px;\n  border-radius: var(--radius-full);\n  background:\n    linear-gradient(\n      135deg,\n      var(--color-grad-start),\n      var(--color-grad-end));\n  color: white;\n  display: grid;\n  place-items: center;\n  font-size: 1.5rem;\n  font-weight: 700;\n  overflow: hidden;\n}\n.avatar[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n}\n.meta[_ngcontent-%COMP%] {\n  margin: 0 0 var(--space-xs);\n  color: var(--color-text-secondary);\n  font-weight: 600;\n}\n/*# sourceMappingURL=user-profile-page.component.css.map */"], changeDetection: 0 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(UserProfilePageComponent, [{
    type: Component,
    args: [{ selector: "app-user-profile-page", changeDetection: ChangeDetectionStrategy.OnPush, imports: [PageHeaderComponent, EmptyStateComponent, SkeletonComponent], template: `
    @if (loading()) {
      <app-skeleton height="2rem" width="200px" />
      <app-skeleton height="80px" />
    } @else if (!profile()) {
      <app-empty-state title="User not found" message="No player with that username exists." icon="\u{1F464}" />
    } @else {
      <app-page-header
        [title]="displayName()"
        [subtitle]="'@' + profile()!.username"
        overline="Player"
      />

      <div class="profile-hero card">
        <div class="avatar">
          @if (profile()!.profile_picture_url) {
            <img [src]="profile()!.profile_picture_url" alt="" />
          } @else {
            {{ initials() }}
          }
        </div>
        <div>
          @if (profile()!.bgg_username) {
            <p class="meta">BGG: {{ profile()!.bgg_username }}</p>
          }
          @if (profile()!.city) {
            <p class="meta">{{ profile()!.city }}{{ profile()!.subdivision ? ', ' + profile()!.subdivision : '' }}</p>
          }
        </div>
      </div>
    }
  `, styles: ["/* angular:styles/component:scss;ac2e88f2979be1af9bf1d8eee808323e6941f7618fa915b3beff5467450c6ce6;C:/Users/baseb/OneDrive/Documents/GitHub/boardgame-social-v2/apps/web/src/app/features/profile/user-profile-page.component.ts */\n.profile-hero {\n  display: flex;\n  align-items: center;\n  gap: var(--space-xl);\n  padding: var(--space-xl);\n}\n.avatar {\n  width: 80px;\n  height: 80px;\n  border-radius: var(--radius-full);\n  background:\n    linear-gradient(\n      135deg,\n      var(--color-grad-start),\n      var(--color-grad-end));\n  color: white;\n  display: grid;\n  place-items: center;\n  font-size: 1.5rem;\n  font-weight: 700;\n  overflow: hidden;\n}\n.avatar img {\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n}\n.meta {\n  margin: 0 0 var(--space-xs);\n  color: var(--color-text-secondary);\n  font-weight: 600;\n}\n/*# sourceMappingURL=user-profile-page.component.css.map */\n"] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(UserProfilePageComponent, { className: "UserProfilePageComponent", filePath: "apps/web/src/app/features/profile/user-profile-page.component.ts", lineNumber: 79 });
})();
export {
  UserProfilePageComponent
};
//# sourceMappingURL=chunk-SHKEUGF4.js.map
