import {
  ThemeService
} from "./chunk-M2PROZ2H.js";
import {
  ToastService
} from "./chunk-FNB3VBA5.js";
import {
  AuthService
} from "./chunk-QR2D7B5O.js";
import {
  environment
} from "./chunk-ESOBHDPQ.js";
import {
  Router,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
  bootstrapApplication,
  provideRouter
} from "./chunk-3YWMTBPO.js";
import "./chunk-G3THX2OW.js";
import {
  provideHttpClient,
  withInterceptors
} from "./chunk-XKHOIK35.js";
import {
  APP_INITIALIZER,
  ChangeDetectionStrategy,
  Component,
  Injectable,
  Input,
  Output,
  catchError,
  inject,
  input,
  output,
  provideBrowserGlobalErrorListeners,
  setClassMetadata,
  signal,
  throwError,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵattribute,
  ɵɵclassMap,
  ɵɵclassProp,
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵdefineComponent,
  ɵɵdefineInjectable,
  ɵɵdomElementEnd,
  ɵɵdomElementStart,
  ɵɵdomListener,
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
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1
} from "./chunk-B6IJ3W3N.js";

// apps/web/src/app/core/http/api.interceptor.ts
var apiInterceptor = (req, next) => {
  const auth = inject(AuthService);
  const isApiCall = !req.url.startsWith("http") || req.url.startsWith(environment.apiBase);
  if (!isApiCall)
    return next(req);
  const token = auth.getAccessToken();
  let url = req.url;
  if (!url.startsWith("http")) {
    url = `${environment.apiBase.replace(/\/$/, "")}/${url.replace(/^\//, "")}`;
  }
  const headers = {};
  if (token)
    headers["Authorization"] = `Bearer ${token}`;
  return next(req.clone({ url, setHeaders: headers }));
};

// apps/web/src/app/core/toast/toast.service.ts
var ToastService2 = class _ToastService {
  nextId = 0;
  messages = signal([], ...ngDevMode ? [{ debugName: "messages" }] : (
    /* istanbul ignore next */
    []
  ));
  show(text, type = "info") {
    const id = ++this.nextId;
    this.messages.update((msgs) => [...msgs, { id, text, type }]);
    setTimeout(() => this.dismiss(id), 5e3);
  }
  error(text) {
    this.show(text, "error");
  }
  success(text) {
    this.show(text, "success");
  }
  dismiss(id) {
    this.messages.update((msgs) => msgs.filter((m) => m.id !== id));
  }
  static \u0275fac = function ToastService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ToastService)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _ToastService, factory: _ToastService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ToastService2, [{
    type: Injectable,
    args: [{ providedIn: "root" }]
  }], null, null);
})();

// apps/web/src/app/core/http/error.interceptor.ts
var errorInterceptor = (req, next) => {
  const toast = inject(ToastService2);
  return next(req).pipe(catchError((err) => {
    const message = err.error?.message ?? err.error?.error ?? err.message ?? "Something went wrong";
    toast.error(typeof message === "string" ? message : "Request failed");
    return throwError(() => err);
  }));
};

// apps/web/src/app/core/auth/auth.guard.ts
var authGuard = async () => {
  const auth = inject(AuthService);
  const router = inject(Router);
  await auth.waitUntilReady();
  if (auth.isAuthenticated())
    return true;
  return router.createUrlTree(["/login"]);
};
var guestGuard = async () => {
  const auth = inject(AuthService);
  const router = inject(Router);
  await auth.waitUntilReady();
  if (!auth.isAuthenticated())
    return true;
  return router.createUrlTree(["/"]);
};
var onboardingGuard = async () => {
  const auth = inject(AuthService);
  const router = inject(Router);
  await auth.waitUntilReady();
  if (!auth.isAuthenticated())
    return router.createUrlTree(["/login"]);
  if (auth.hasProfile())
    return true;
  return router.createUrlTree(["/onboarding"]);
};
var onboardingOnlyGuard = async () => {
  const auth = inject(AuthService);
  const router = inject(Router);
  await auth.waitUntilReady();
  if (!auth.isAuthenticated())
    return router.createUrlTree(["/login"]);
  if (!auth.hasProfile())
    return true;
  return router.createUrlTree(["/"]);
};
var onboardingImportGuard = async () => {
  const auth = inject(AuthService);
  const router = inject(Router);
  await auth.waitUntilReady();
  if (!auth.isAuthenticated())
    return router.createUrlTree(["/login"]);
  if (auth.hasProfile())
    return true;
  return router.createUrlTree(["/onboarding"]);
};

// apps/web/src/app/layout/sidebar/sidebar.component.ts
var _forTrack0 = ($index, $item) => $item.route;
function SidebarComponent_For_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "a", 6)(1, "span", 7);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const item_r1 = ctx.$implicit;
    \u0275\u0275property("routerLink", item_r1.route);
    \u0275\u0275attribute("aria-label", item_r1.label);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(item_r1.icon);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(item_r1.label);
  }
}
var SidebarComponent = class _SidebarComponent {
  collapsed = input(false, ...ngDevMode ? [{ debugName: "collapsed" }] : (
    /* istanbul ignore next */
    []
  ));
  items = input([
    { label: "Home", route: "/", icon: "\u{1F3E0}" },
    { label: "Profile", route: "/profile", icon: "\u{1F464}" },
    { label: "Collection", route: "/collection", icon: "\u{1F4DA}" },
    { label: "Games", route: "/games", icon: "\u{1F3AF}" },
    { label: "Tier List", route: "/play", icon: "\u{1F3C6}" },
    { label: "Events", route: "/events", icon: "\u{1F4C5}" },
    { label: "Settings", route: "/settings", icon: "\u2699\uFE0F" }
  ], ...ngDevMode ? [{ debugName: "items" }] : (
    /* istanbul ignore next */
    []
  ));
  static \u0275fac = function SidebarComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _SidebarComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _SidebarComponent, selectors: [["app-sidebar"]], hostAttrs: [1, "app-sidebar"], hostVars: 2, hostBindings: function SidebarComponent_HostBindings(rf, ctx) {
    if (rf & 2) {
      \u0275\u0275classProp("collapsed", ctx.collapsed());
    }
  }, inputs: { collapsed: [1, "collapsed"], items: [1, "items"] }, decls: 12, vars: 0, consts: [["aria-label", "Main navigation", 1, "sidebar"], [1, "brand"], ["aria-hidden", "true", 1, "brand-mark"], [1, "brand-overline"], [1, "brand-title"], [1, "nav"], ["routerLinkActive", "active", 1, "nav-link", 3, "routerLink"], ["aria-hidden", "true", 1, "nav-icon"]], template: function SidebarComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "aside", 0)(1, "div", 1)(2, "span", 2);
      \u0275\u0275text(3, "\u{1F3B2}");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(4, "div")(5, "p", 3);
      \u0275\u0275text(6, "Game Night");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(7, "p", 4);
      \u0275\u0275text(8, "Board Game Social");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(9, "nav", 5);
      \u0275\u0275repeaterCreate(10, SidebarComponent_For_11_Template, 5, 4, "a", 6, _forTrack0);
      \u0275\u0275elementEnd()();
    }
    if (rf & 2) {
      \u0275\u0275advance(10);
      \u0275\u0275repeater(ctx.items());
    }
  }, dependencies: [RouterLink, RouterLinkActive], styles: ['\n[_nghost-%COMP%] {\n  display: block;\n}\n.collapsed[_nghost-%COMP%]   .sidebar[_ngcontent-%COMP%] {\n  transform: translateX(-100%);\n}\n@media (min-width: 769px) {\n  .collapsed[_nghost-%COMP%]   .sidebar[_ngcontent-%COMP%] {\n    transform: none;\n  }\n}\n@media (max-width: 768px) {\n  [_nghost-%COMP%]   .sidebar[_ngcontent-%COMP%] {\n    position: fixed;\n    left: 0;\n    top: 0;\n    z-index: 40;\n    transform: translateX(-100%);\n    transition: transform 0.2s ease;\n  }\n  [_nghost-%COMP%]:not(.collapsed)   .sidebar[_ngcontent-%COMP%] {\n    transform: translateX(0);\n  }\n}\n.sidebar[_ngcontent-%COMP%] {\n  width: var(--sidebar-width);\n  min-height: 100vh;\n  padding: var(--space-xl) var(--space-lg);\n  background: var(--color-bg-raised);\n  border-right: 1px solid var(--color-border);\n  display: flex;\n  flex-direction: column;\n  gap: var(--space-2xl);\n  flex-shrink: 0;\n}\n.brand[_ngcontent-%COMP%] {\n  display: flex;\n  gap: var(--space-md);\n  align-items: center;\n}\n.brand-mark[_ngcontent-%COMP%] {\n  width: 40px;\n  height: 40px;\n  display: grid;\n  place-items: center;\n  border-radius: var(--radius-md);\n  background: var(--color-primary-soft);\n  font-size: 1.25rem;\n}\n.brand-overline[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 0.6875rem;\n  font-weight: 700;\n  letter-spacing: 0.06em;\n  text-transform: uppercase;\n  color: var(--color-primary);\n}\n.brand-title[_ngcontent-%COMP%] {\n  margin: 0;\n  font-family: "Fraunces", serif;\n  font-weight: 700;\n  font-size: 1rem;\n  color: var(--color-text-primary);\n}\n.nav[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: var(--space-xs);\n}\n.nav-link[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: var(--space-md);\n  padding: 0.75rem 1rem;\n  border-radius: var(--radius-md);\n  color: var(--color-text-secondary);\n  font-weight: 600;\n  font-size: 0.9375rem;\n  transition: background 0.15s ease, color 0.15s ease;\n}\n.nav-link[_ngcontent-%COMP%]:hover {\n  background: var(--color-surface-hover);\n  color: var(--color-text-primary);\n}\n.nav-link.active[_ngcontent-%COMP%] {\n  background: var(--color-primary-soft);\n  color: var(--color-primary);\n}\n.nav-icon[_ngcontent-%COMP%] {\n  width: 1.25rem;\n  text-align: center;\n}\n/*# sourceMappingURL=sidebar.component.css.map */'], changeDetection: 0 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(SidebarComponent, [{
    type: Component,
    args: [{ selector: "app-sidebar", changeDetection: ChangeDetectionStrategy.OnPush, host: {
      class: "app-sidebar",
      "[class.collapsed]": "collapsed()"
    }, imports: [RouterLink, RouterLinkActive], template: `
    <aside class="sidebar" aria-label="Main navigation">
      <div class="brand">
        <span class="brand-mark" aria-hidden="true">\u{1F3B2}</span>
        <div>
          <p class="brand-overline">Game Night</p>
          <p class="brand-title">Board Game Social</p>
        </div>
      </div>

      <nav class="nav">
        @for (item of items(); track item.route) {
          <a
            class="nav-link"
            [routerLink]="item.route"
            routerLinkActive="active"
            [attr.aria-label]="item.label"
          >
            <span class="nav-icon" aria-hidden="true">{{ item.icon }}</span>
            <span>{{ item.label }}</span>
          </a>
        }
      </nav>
    </aside>
  `, styles: ['/* angular:styles/component:scss;4711b9dbbe0d4d82c17e1e5bd1c2ffdf6725e3eac92c6702521d08082fe0a8a7;C:/Users/baseb/OneDrive/Documents/GitHub/boardgame-social-v2/apps/web/src/app/layout/sidebar/sidebar.component.ts */\n:host {\n  display: block;\n}\n:host(.collapsed) .sidebar {\n  transform: translateX(-100%);\n}\n@media (min-width: 769px) {\n  :host(.collapsed) .sidebar {\n    transform: none;\n  }\n}\n@media (max-width: 768px) {\n  :host .sidebar {\n    position: fixed;\n    left: 0;\n    top: 0;\n    z-index: 40;\n    transform: translateX(-100%);\n    transition: transform 0.2s ease;\n  }\n  :host(:not(.collapsed)) .sidebar {\n    transform: translateX(0);\n  }\n}\n.sidebar {\n  width: var(--sidebar-width);\n  min-height: 100vh;\n  padding: var(--space-xl) var(--space-lg);\n  background: var(--color-bg-raised);\n  border-right: 1px solid var(--color-border);\n  display: flex;\n  flex-direction: column;\n  gap: var(--space-2xl);\n  flex-shrink: 0;\n}\n.brand {\n  display: flex;\n  gap: var(--space-md);\n  align-items: center;\n}\n.brand-mark {\n  width: 40px;\n  height: 40px;\n  display: grid;\n  place-items: center;\n  border-radius: var(--radius-md);\n  background: var(--color-primary-soft);\n  font-size: 1.25rem;\n}\n.brand-overline {\n  margin: 0;\n  font-size: 0.6875rem;\n  font-weight: 700;\n  letter-spacing: 0.06em;\n  text-transform: uppercase;\n  color: var(--color-primary);\n}\n.brand-title {\n  margin: 0;\n  font-family: "Fraunces", serif;\n  font-weight: 700;\n  font-size: 1rem;\n  color: var(--color-text-primary);\n}\n.nav {\n  display: flex;\n  flex-direction: column;\n  gap: var(--space-xs);\n}\n.nav-link {\n  display: flex;\n  align-items: center;\n  gap: var(--space-md);\n  padding: 0.75rem 1rem;\n  border-radius: var(--radius-md);\n  color: var(--color-text-secondary);\n  font-weight: 600;\n  font-size: 0.9375rem;\n  transition: background 0.15s ease, color 0.15s ease;\n}\n.nav-link:hover {\n  background: var(--color-surface-hover);\n  color: var(--color-text-primary);\n}\n.nav-link.active {\n  background: var(--color-primary-soft);\n  color: var(--color-primary);\n}\n.nav-icon {\n  width: 1.25rem;\n  text-align: center;\n}\n/*# sourceMappingURL=sidebar.component.css.map */\n'] }]
  }], null, { collapsed: [{ type: Input, args: [{ isSignal: true, alias: "collapsed", required: false }] }], items: [{ type: Input, args: [{ isSignal: true, alias: "items", required: false }] }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(SidebarComponent, { className: "SidebarComponent", filePath: "apps/web/src/app/layout/sidebar/sidebar.component.ts", lineNumber: 152 });
})();

// apps/web/src/app/layout/topbar/topbar.component.ts
function TopbarComponent_Conditional_16_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 11)(1, "a", 12);
    \u0275\u0275listener("click", function TopbarComponent_Conditional_16_Template_a_click_1_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.menuOpen.set(false));
    });
    \u0275\u0275text(2, "Profile");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "a", 13);
    \u0275\u0275listener("click", function TopbarComponent_Conditional_16_Template_a_click_3_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.menuOpen.set(false));
    });
    \u0275\u0275text(4, "Settings");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "button", 14);
    \u0275\u0275listener("click", function TopbarComponent_Conditional_16_Template_button_click_5_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.signOut());
    });
    \u0275\u0275text(6, "Sign out");
    \u0275\u0275elementEnd()();
  }
}
var TopbarComponent = class _TopbarComponent {
  theme = inject(ThemeService);
  auth = inject(AuthService);
  menuToggle = output();
  menuOpen = signal(false, ...ngDevMode ? [{ debugName: "menuOpen" }] : (
    /* istanbul ignore next */
    []
  ));
  displayName() {
    return this.auth.profile()?.display_name ?? this.auth.profile()?.username ?? "Player";
  }
  initials() {
    const name = this.displayName();
    return name.split(" ").map((p) => p[0]).join("").slice(0, 2).toUpperCase();
  }
  signOut() {
    this.menuOpen.set(false);
    void this.auth.signOut();
  }
  static \u0275fac = function TopbarComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _TopbarComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _TopbarComponent, selectors: [["app-topbar"]], outputs: { menuToggle: "menuToggle" }, decls: 17, vars: 4, consts: [[1, "topbar"], ["type", "button", "aria-label", "Toggle menu", 1, "menu-btn", 3, "click"], ["role", "search", 1, "search", 3, "submit"], ["for", "global-search", 1, "sr-only"], ["id", "global-search", "type", "search", "placeholder", "Search games, players, events\u2026", 1, "search-input"], [1, "actions"], ["type", "button", "aria-label", "Toggle theme", 1, "icon-btn", 3, "click"], [1, "user-menu"], ["type", "button", "aria-haspopup", "true", 1, "user-chip", 3, "click"], ["aria-hidden", "true", 1, "avatar"], [1, "username"], ["role", "menu", 1, "dropdown"], ["routerLink", "/profile", "role", "menuitem", 3, "click"], ["routerLink", "/settings", "role", "menuitem", 3, "click"], ["type", "button", "role", "menuitem", 3, "click"]], template: function TopbarComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "header", 0)(1, "button", 1);
      \u0275\u0275listener("click", function TopbarComponent_Template_button_click_1_listener() {
        return ctx.menuToggle.emit();
      });
      \u0275\u0275text(2, " \u2630 ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(3, "form", 2);
      \u0275\u0275listener("submit", function TopbarComponent_Template_form_submit_3_listener($event) {
        return $event.preventDefault();
      });
      \u0275\u0275elementStart(4, "label", 3);
      \u0275\u0275text(5, "Search games");
      \u0275\u0275elementEnd();
      \u0275\u0275element(6, "input", 4);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(7, "div", 5)(8, "button", 6);
      \u0275\u0275listener("click", function TopbarComponent_Template_button_click_8_listener() {
        return ctx.theme.toggle();
      });
      \u0275\u0275text(9);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(10, "div", 7)(11, "button", 8);
      \u0275\u0275listener("click", function TopbarComponent_Template_button_click_11_listener() {
        return ctx.menuOpen.set(!ctx.menuOpen());
      });
      \u0275\u0275elementStart(12, "span", 9);
      \u0275\u0275text(13);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(14, "span", 10);
      \u0275\u0275text(15);
      \u0275\u0275elementEnd()();
      \u0275\u0275conditionalCreate(16, TopbarComponent_Conditional_16_Template, 7, 0, "div", 11);
      \u0275\u0275elementEnd()()();
    }
    if (rf & 2) {
      \u0275\u0275advance(9);
      \u0275\u0275textInterpolate1(" ", ctx.theme.theme() === "light" ? "\u{1F319}" : "\u2600\uFE0F", " ");
      \u0275\u0275advance(4);
      \u0275\u0275textInterpolate(ctx.initials());
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate(ctx.displayName());
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.menuOpen() ? 16 : -1);
    }
  }, dependencies: [RouterLink], styles: [`
.topbar[_ngcontent-%COMP%] {
  height: var(--topbar-height);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-lg);
  padding: 0 var(--space-xl);
  background: var(--color-bg-raised);
  border-bottom: 1px solid var(--color-border);
}
.menu-btn[_ngcontent-%COMP%] {
  display: none;
  width: 40px;
  height: 40px;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  background: var(--color-surface);
  font-size: 1.125rem;
}
@media (max-width: 768px) {
  .menu-btn[_ngcontent-%COMP%] {
    display: grid;
    place-items: center;
  }
}
.menu-btn[_ngcontent-%COMP%] {
  display: none;
  width: 40px;
  height: 40px;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  background: var(--color-surface);
  font-size: 1.25rem;
}
.search[_ngcontent-%COMP%] {
  flex: 1;
  max-width: 480px;
}
.search-input[_ngcontent-%COMP%] {
  width: 100%;
  padding: 0.625rem 1rem 0.625rem 2.5rem;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-full);
  background: var(--color-surface-elevated) url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='%23A2937F' viewBox='0 0 16 16'%3E%3Cpath d='M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85zm-5.242 1.156a5 5 0 1 1 0-10 5 5 0 0 1 0 10z'/%3E%3C/svg%3E") no-repeat 0.875rem center;
  color: var(--color-text-primary);
  font-family: "Nunito", sans-serif;
  font-size: 0.875rem;
}
.search-input[_ngcontent-%COMP%]:focus {
  outline: 2px solid var(--color-primary-soft);
  border-color: var(--color-primary);
}
.actions[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  gap: var(--space-md);
}
.icon-btn[_ngcontent-%COMP%] {
  width: 40px;
  height: 40px;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-full);
  background: var(--color-surface);
  font-size: 1rem;
}
.user-menu[_ngcontent-%COMP%] {
  position: relative;
}
.user-chip[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  padding: 0.25rem 0.75rem 0.25rem 0.25rem;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-full);
  background: var(--color-surface);
}
.avatar[_ngcontent-%COMP%] {
  width: 32px;
  height: 32px;
  border-radius: var(--radius-full);
  background:
    linear-gradient(
      135deg,
      var(--color-grad-start),
      var(--color-grad-end));
  color: white;
  display: grid;
  place-items: center;
  font-size: 0.75rem;
  font-weight: 700;
}
.username[_ngcontent-%COMP%] {
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--color-text-primary);
}
.dropdown[_ngcontent-%COMP%] {
  position: absolute;
  top: calc(100% + 4px);
  right: 0;
  min-width: 160px;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-md);
  padding: var(--space-xs);
  z-index: 100;
}
.dropdown[_ngcontent-%COMP%]   a[_ngcontent-%COMP%], 
.dropdown[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {
  display: block;
  width: 100%;
  text-align: left;
  padding: 0.625rem 0.875rem;
  border: none;
  background: none;
  border-radius: var(--radius-sm);
  font-weight: 600;
  font-size: 0.875rem;
  color: var(--color-text-primary);
}
.dropdown[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:hover, 
.dropdown[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]:hover {
  background: var(--color-surface-hover);
}
@media (max-width: 768px) {
  .menu-btn[_ngcontent-%COMP%] {
    display: grid;
    place-items: center;
  }
  .search[_ngcontent-%COMP%] {
    display: none;
  }
  .username[_ngcontent-%COMP%] {
    display: none;
  }
}
/*# sourceMappingURL=topbar.component.css.map */`], changeDetection: 0 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(TopbarComponent, [{
    type: Component,
    args: [{ selector: "app-topbar", changeDetection: ChangeDetectionStrategy.OnPush, imports: [RouterLink], template: `
    <header class="topbar">
      <button type="button" class="menu-btn" (click)="menuToggle.emit()" aria-label="Toggle menu">
        \u2630
      </button>

      <form class="search" role="search" (submit)="$event.preventDefault()">
        <label class="sr-only" for="global-search">Search games</label>
        <input
          id="global-search"
          class="search-input"
          type="search"
          placeholder="Search games, players, events\u2026"
        />
      </form>

      <div class="actions">
        <button type="button" class="icon-btn" (click)="theme.toggle()" aria-label="Toggle theme">
          {{ theme.theme() === 'light' ? '\u{1F319}' : '\u2600\uFE0F' }}
        </button>

        <div class="user-menu">
          <button type="button" class="user-chip" (click)="menuOpen.set(!menuOpen())" aria-haspopup="true">
            <span class="avatar" aria-hidden="true">{{ initials() }}</span>
            <span class="username">{{ displayName() }}</span>
          </button>
          @if (menuOpen()) {
            <div class="dropdown" role="menu">
              <a routerLink="/profile" role="menuitem" (click)="menuOpen.set(false)">Profile</a>
              <a routerLink="/settings" role="menuitem" (click)="menuOpen.set(false)">Settings</a>
              <button type="button" role="menuitem" (click)="signOut()">Sign out</button>
            </div>
          }
        </div>
      </div>
    </header>
  `, styles: [`/* angular:styles/component:scss;4a07e26c0b24a6134f229300a4b78ea8d54787287e6b8509f35574b0428adeca;C:/Users/baseb/OneDrive/Documents/GitHub/boardgame-social-v2/apps/web/src/app/layout/topbar/topbar.component.ts */
.topbar {
  height: var(--topbar-height);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-lg);
  padding: 0 var(--space-xl);
  background: var(--color-bg-raised);
  border-bottom: 1px solid var(--color-border);
}
.menu-btn {
  display: none;
  width: 40px;
  height: 40px;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  background: var(--color-surface);
  font-size: 1.125rem;
}
@media (max-width: 768px) {
  .menu-btn {
    display: grid;
    place-items: center;
  }
}
.menu-btn {
  display: none;
  width: 40px;
  height: 40px;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  background: var(--color-surface);
  font-size: 1.25rem;
}
.search {
  flex: 1;
  max-width: 480px;
}
.search-input {
  width: 100%;
  padding: 0.625rem 1rem 0.625rem 2.5rem;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-full);
  background: var(--color-surface-elevated) url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='%23A2937F' viewBox='0 0 16 16'%3E%3Cpath d='M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85zm-5.242 1.156a5 5 0 1 1 0-10 5 5 0 0 1 0 10z'/%3E%3C/svg%3E") no-repeat 0.875rem center;
  color: var(--color-text-primary);
  font-family: "Nunito", sans-serif;
  font-size: 0.875rem;
}
.search-input:focus {
  outline: 2px solid var(--color-primary-soft);
  border-color: var(--color-primary);
}
.actions {
  display: flex;
  align-items: center;
  gap: var(--space-md);
}
.icon-btn {
  width: 40px;
  height: 40px;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-full);
  background: var(--color-surface);
  font-size: 1rem;
}
.user-menu {
  position: relative;
}
.user-chip {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  padding: 0.25rem 0.75rem 0.25rem 0.25rem;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-full);
  background: var(--color-surface);
}
.avatar {
  width: 32px;
  height: 32px;
  border-radius: var(--radius-full);
  background:
    linear-gradient(
      135deg,
      var(--color-grad-start),
      var(--color-grad-end));
  color: white;
  display: grid;
  place-items: center;
  font-size: 0.75rem;
  font-weight: 700;
}
.username {
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--color-text-primary);
}
.dropdown {
  position: absolute;
  top: calc(100% + 4px);
  right: 0;
  min-width: 160px;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-md);
  padding: var(--space-xs);
  z-index: 100;
}
.dropdown a,
.dropdown button {
  display: block;
  width: 100%;
  text-align: left;
  padding: 0.625rem 0.875rem;
  border: none;
  background: none;
  border-radius: var(--radius-sm);
  font-weight: 600;
  font-size: 0.875rem;
  color: var(--color-text-primary);
}
.dropdown a:hover,
.dropdown button:hover {
  background: var(--color-surface-hover);
}
@media (max-width: 768px) {
  .menu-btn {
    display: grid;
    place-items: center;
  }
  .search {
    display: none;
  }
  .username {
    display: none;
  }
}
/*# sourceMappingURL=topbar.component.css.map */
`] }]
  }], null, { menuToggle: [{ type: Output, args: ["menuToggle"] }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(TopbarComponent, { className: "TopbarComponent", filePath: "apps/web/src/app/layout/topbar/topbar.component.ts", lineNumber: 141 });
})();

// apps/web/src/app/layout/bottom-nav/bottom-nav.component.ts
var _forTrack02 = ($index, $item) => $item.route;
function BottomNavComponent_For_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "a", 1)(1, "span", 2);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 3);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const item_r1 = ctx.$implicit;
    \u0275\u0275property("routerLink", item_r1.route);
    \u0275\u0275attribute("aria-label", item_r1.label);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(item_r1.icon);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(item_r1.label);
  }
}
var BottomNavComponent = class _BottomNavComponent {
  items = input([
    { label: "Home", route: "/", icon: "\u{1F3E0}" },
    { label: "Collection", route: "/collection", icon: "\u{1F4DA}" },
    { label: "Games", route: "/games", icon: "\u{1F3AF}" },
    { label: "Events", route: "/events", icon: "\u{1F4C5}" },
    { label: "Profile", route: "/profile", icon: "\u{1F464}" }
  ], ...ngDevMode ? [{ debugName: "items" }] : (
    /* istanbul ignore next */
    []
  ));
  static \u0275fac = function BottomNavComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _BottomNavComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _BottomNavComponent, selectors: [["app-bottom-nav"]], inputs: { items: [1, "items"] }, decls: 3, vars: 0, consts: [["aria-label", "Mobile navigation", 1, "bottom-nav"], ["routerLinkActive", "active", 1, "tab", 3, "routerLink"], ["aria-hidden", "true", 1, "tab-icon"], [1, "tab-label"]], template: function BottomNavComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "nav", 0);
      \u0275\u0275repeaterCreate(1, BottomNavComponent_For_2_Template, 5, 4, "a", 1, _forTrack02);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      \u0275\u0275advance();
      \u0275\u0275repeater(ctx.items());
    }
  }, dependencies: [RouterLink, RouterLinkActive], styles: ["\n.bottom-nav[_ngcontent-%COMP%] {\n  display: none;\n  position: fixed;\n  bottom: 0;\n  left: 0;\n  right: 0;\n  height: 64px;\n  background: var(--color-bg-raised);\n  border-top: 1px solid var(--color-border);\n  z-index: 30;\n  padding: 0 var(--space-sm);\n  justify-content: space-around;\n  align-items: center;\n}\n@media (max-width: 768px) {\n  .bottom-nav[_ngcontent-%COMP%] {\n    display: flex;\n  }\n}\n.tab[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 2px;\n  padding: var(--space-xs) var(--space-sm);\n  color: var(--color-text-muted);\n  font-size: 0.625rem;\n  font-weight: 700;\n}\n.tab.active[_ngcontent-%COMP%] {\n  color: var(--color-primary);\n}\n.tab-icon[_ngcontent-%COMP%] {\n  font-size: 1.25rem;\n}\n/*# sourceMappingURL=bottom-nav.component.css.map */"], changeDetection: 0 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(BottomNavComponent, [{
    type: Component,
    args: [{ selector: "app-bottom-nav", changeDetection: ChangeDetectionStrategy.OnPush, imports: [RouterLink, RouterLinkActive], template: `
    <nav class="bottom-nav" aria-label="Mobile navigation">
      @for (item of items(); track item.route) {
        <a
          class="tab"
          [routerLink]="item.route"
          routerLinkActive="active"
          [attr.aria-label]="item.label"
        >
          <span class="tab-icon" aria-hidden="true">{{ item.icon }}</span>
          <span class="tab-label">{{ item.label }}</span>
        </a>
      }
    </nav>
  `, styles: ["/* angular:styles/component:scss;2da25fa03124d855807058d3556e48ea992f8dc7a6be96305c7d5c58b76df29a;C:/Users/baseb/OneDrive/Documents/GitHub/boardgame-social-v2/apps/web/src/app/layout/bottom-nav/bottom-nav.component.ts */\n.bottom-nav {\n  display: none;\n  position: fixed;\n  bottom: 0;\n  left: 0;\n  right: 0;\n  height: 64px;\n  background: var(--color-bg-raised);\n  border-top: 1px solid var(--color-border);\n  z-index: 30;\n  padding: 0 var(--space-sm);\n  justify-content: space-around;\n  align-items: center;\n}\n@media (max-width: 768px) {\n  .bottom-nav {\n    display: flex;\n  }\n}\n.tab {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 2px;\n  padding: var(--space-xs) var(--space-sm);\n  color: var(--color-text-muted);\n  font-size: 0.625rem;\n  font-weight: 700;\n}\n.tab.active {\n  color: var(--color-primary);\n}\n.tab-icon {\n  font-size: 1.25rem;\n}\n/*# sourceMappingURL=bottom-nav.component.css.map */\n"] }]
  }], null, { items: [{ type: Input, args: [{ isSignal: true, alias: "items", required: false }] }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(BottomNavComponent, { className: "BottomNavComponent", filePath: "apps/web/src/app/layout/bottom-nav/bottom-nav.component.ts", lineNumber: 71 });
})();

// apps/web/src/app/layout/app-shell/app-shell.component.ts
var AppShellComponent = class _AppShellComponent {
  sidebarCollapsed = signal(true, ...ngDevMode ? [{ debugName: "sidebarCollapsed" }] : (
    /* istanbul ignore next */
    []
  ));
  toggleSidebar() {
    this.sidebarCollapsed.update((v) => !v);
  }
  static \u0275fac = function AppShellComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _AppShellComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _AppShellComponent, selectors: [["app-shell"]], decls: 7, vars: 3, consts: [[1, "shell"], [3, "collapsed"], [1, "main"], [3, "menuToggle"], [1, "content"]], template: function AppShellComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0);
      \u0275\u0275element(1, "app-sidebar", 1);
      \u0275\u0275elementStart(2, "div", 2)(3, "app-topbar", 3);
      \u0275\u0275listener("menuToggle", function AppShellComponent_Template_app_topbar_menuToggle_3_listener() {
        return ctx.toggleSidebar();
      });
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(4, "main", 4);
      \u0275\u0275element(5, "router-outlet");
      \u0275\u0275elementEnd()();
      \u0275\u0275element(6, "app-bottom-nav");
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      \u0275\u0275classProp("sidebar-collapsed", ctx.sidebarCollapsed());
      \u0275\u0275advance();
      \u0275\u0275property("collapsed", ctx.sidebarCollapsed());
    }
  }, dependencies: [RouterOutlet, SidebarComponent, TopbarComponent, BottomNavComponent], styles: ["\n.shell[_ngcontent-%COMP%] {\n  display: flex;\n  min-height: 100vh;\n  background: var(--color-bg-base);\n}\n.main[_ngcontent-%COMP%] {\n  flex: 1;\n  display: flex;\n  flex-direction: column;\n  min-width: 0;\n}\n.content[_ngcontent-%COMP%] {\n  flex: 1;\n  padding: var(--space-xl);\n  overflow: auto;\n}\n@media (max-width: 768px) {\n  .content[_ngcontent-%COMP%] {\n    padding: var(--space-lg);\n    padding-bottom: calc(64px + var(--space-lg));\n  }\n}\n/*# sourceMappingURL=app-shell.component.css.map */"], changeDetection: 0 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AppShellComponent, [{
    type: Component,
    args: [{ selector: "app-shell", changeDetection: ChangeDetectionStrategy.OnPush, imports: [RouterOutlet, SidebarComponent, TopbarComponent, BottomNavComponent], template: `
    <div class="shell" [class.sidebar-collapsed]="sidebarCollapsed()">
      <app-sidebar [collapsed]="sidebarCollapsed()" />
      <div class="main">
        <app-topbar (menuToggle)="toggleSidebar()" />
        <main class="content">
          <router-outlet />
        </main>
      </div>
      <app-bottom-nav />
    </div>
  `, styles: ["/* angular:styles/component:scss;e7601612070de2b5ee4309e0f7f415d1dc4b6c0d72d081d86c400704ac69124f;C:/Users/baseb/OneDrive/Documents/GitHub/boardgame-social-v2/apps/web/src/app/layout/app-shell/app-shell.component.ts */\n.shell {\n  display: flex;\n  min-height: 100vh;\n  background: var(--color-bg-base);\n}\n.main {\n  flex: 1;\n  display: flex;\n  flex-direction: column;\n  min-width: 0;\n}\n.content {\n  flex: 1;\n  padding: var(--space-xl);\n  overflow: auto;\n}\n@media (max-width: 768px) {\n  .content {\n    padding: var(--space-lg);\n    padding-bottom: calc(64px + var(--space-lg));\n  }\n}\n/*# sourceMappingURL=app-shell.component.css.map */\n"] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(AppShellComponent, { className: "AppShellComponent", filePath: "apps/web/src/app/layout/app-shell/app-shell.component.ts", lineNumber: 51 });
})();

// apps/web/src/app/layout/auth-layout/auth-layout.component.ts
var AuthLayoutComponent = class _AuthLayoutComponent {
  static \u0275fac = function AuthLayoutComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _AuthLayoutComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _AuthLayoutComponent, selectors: [["app-auth-layout"]], decls: 10, vars: 0, consts: [[1, "auth-layout"], ["aria-label", "Branding", 1, "brand-panel"], [1, "overline"], [1, "title"], [1, "subtitle"], [1, "form-panel"]], template: function AuthLayoutComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "section", 1)(2, "p", 2);
      \u0275\u0275text(3, "Game Night");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(4, "h1", 3);
      \u0275\u0275text(5, "Roll, play, repeat");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(6, "p", 4);
      \u0275\u0275text(7, " Track your collection, log plays, and connect with fellow tabletop gamers. ");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(8, "section", 5);
      \u0275\u0275element(9, "router-outlet");
      \u0275\u0275elementEnd()();
    }
  }, dependencies: [RouterOutlet], styles: ['\n.auth-layout[_ngcontent-%COMP%] {\n  min-height: 100vh;\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n}\n.brand-panel[_ngcontent-%COMP%] {\n  padding: var(--space-4xl);\n  background:\n    linear-gradient(\n      145deg,\n      var(--color-grad-start),\n      var(--color-grad-end));\n  color: white;\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  gap: var(--space-lg);\n}\n.overline[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 0.75rem;\n  font-weight: 700;\n  letter-spacing: 0.08em;\n  text-transform: uppercase;\n  opacity: 0.9;\n}\n.title[_ngcontent-%COMP%] {\n  margin: 0;\n  font-family: "Fraunces", serif;\n  font-weight: 900;\n  font-size: clamp(2.5rem, 4vw, 3.5rem);\n  line-height: 1.05;\n}\n.subtitle[_ngcontent-%COMP%] {\n  margin: 0;\n  max-width: 28rem;\n  font-size: 1.125rem;\n  line-height: 1.5;\n  opacity: 0.92;\n}\n.form-panel[_ngcontent-%COMP%] {\n  display: grid;\n  place-items: center;\n  padding: var(--space-3xl);\n  background: var(--color-bg-base);\n}\n@media (max-width: 900px) {\n  .auth-layout[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n  .brand-panel[_ngcontent-%COMP%] {\n    min-height: 240px;\n    padding: var(--space-2xl);\n  }\n}\n/*# sourceMappingURL=auth-layout.component.css.map */'], changeDetection: 0 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AuthLayoutComponent, [{
    type: Component,
    args: [{ selector: "app-auth-layout", changeDetection: ChangeDetectionStrategy.OnPush, imports: [RouterOutlet], template: `
    <div class="auth-layout">
      <section class="brand-panel" aria-label="Branding">
        <p class="overline">Game Night</p>
        <h1 class="title">Roll, play, repeat</h1>
        <p class="subtitle">
          Track your collection, log plays, and connect with fellow tabletop gamers.
        </p>
      </section>
      <section class="form-panel">
        <router-outlet />
      </section>
    </div>
  `, styles: ['/* angular:styles/component:scss;81949edc72bc928dc37028381339b2ea7a62e88e271ae4a3c61d8d24e6b7d25f;C:/Users/baseb/OneDrive/Documents/GitHub/boardgame-social-v2/apps/web/src/app/layout/auth-layout/auth-layout.component.ts */\n.auth-layout {\n  min-height: 100vh;\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n}\n.brand-panel {\n  padding: var(--space-4xl);\n  background:\n    linear-gradient(\n      145deg,\n      var(--color-grad-start),\n      var(--color-grad-end));\n  color: white;\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  gap: var(--space-lg);\n}\n.overline {\n  margin: 0;\n  font-size: 0.75rem;\n  font-weight: 700;\n  letter-spacing: 0.08em;\n  text-transform: uppercase;\n  opacity: 0.9;\n}\n.title {\n  margin: 0;\n  font-family: "Fraunces", serif;\n  font-weight: 900;\n  font-size: clamp(2.5rem, 4vw, 3.5rem);\n  line-height: 1.05;\n}\n.subtitle {\n  margin: 0;\n  max-width: 28rem;\n  font-size: 1.125rem;\n  line-height: 1.5;\n  opacity: 0.92;\n}\n.form-panel {\n  display: grid;\n  place-items: center;\n  padding: var(--space-3xl);\n  background: var(--color-bg-base);\n}\n@media (max-width: 900px) {\n  .auth-layout {\n    grid-template-columns: 1fr;\n  }\n  .brand-panel {\n    min-height: 240px;\n    padding: var(--space-2xl);\n  }\n}\n/*# sourceMappingURL=auth-layout.component.css.map */\n'] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(AuthLayoutComponent, { className: "AuthLayoutComponent", filePath: "apps/web/src/app/layout/auth-layout/auth-layout.component.ts", lineNumber: 83 });
})();

// apps/web/src/app/app.routes.ts
var routes = [
  {
    path: "",
    component: AppShellComponent,
    canActivate: [authGuard, onboardingGuard],
    children: [
      {
        path: "",
        loadComponent: () => import("./chunk-OMGQI5YM.js").then((m) => m.HomePageComponent)
      },
      {
        path: "profile",
        loadComponent: () => import("./chunk-X5SJT2YL.js").then((m) => m.ProfilePageComponent)
      },
      {
        path: "profile/edit",
        loadComponent: () => import("./chunk-T52VPUVZ.js").then((m) => m.ProfileEditPageComponent)
      },
      {
        path: "user/:username",
        loadComponent: () => import("./chunk-SHKEUGF4.js").then((m) => m.UserProfilePageComponent)
      },
      {
        path: "collection",
        loadComponent: () => import("./chunk-6BFOTSBT.js").then((m) => m.CollectionPageComponent)
      },
      {
        path: "games",
        loadComponent: () => import("./chunk-C2RDJIMU.js").then((m) => m.GamesPageComponent)
      },
      {
        path: "game-overview/:id",
        loadComponent: () => import("./chunk-5AYOTGDY.js").then((m) => m.GameOverviewPageComponent)
      },
      {
        path: "play",
        loadComponent: () => import("./chunk-6ZVU7NGI.js").then((m) => m.TierListPageComponent)
      },
      {
        path: "events",
        loadComponent: () => import("./chunk-4QV2J6KA.js").then((m) => m.EventsPageComponent)
      },
      {
        path: "settings",
        loadComponent: () => import("./chunk-HMTAUAVK.js").then((m) => m.SettingsPageComponent)
      },
      {
        path: "tokens-preview",
        loadComponent: () => import("./chunk-BCMLQV7U.js").then((m) => m.TokensPreviewPageComponent)
      }
    ]
  },
  {
    path: "onboarding",
    component: AuthLayoutComponent,
    canActivate: [authGuard],
    children: [
      {
        path: "",
        canActivate: [onboardingOnlyGuard],
        loadComponent: () => import("./chunk-PS7FL7IU.js").then((m) => m.OnboardingPageComponent)
      },
      {
        path: "import-games",
        canActivate: [onboardingImportGuard],
        loadComponent: () => import("./chunk-CRH2O3BL.js").then((m) => m.ImportGamesPageComponent)
      }
    ]
  },
  {
    path: "",
    component: AuthLayoutComponent,
    children: [
      {
        path: "login",
        canActivate: [guestGuard],
        loadComponent: () => import("./chunk-LZOLIYJI.js").then((m) => m.LoginPageComponent)
      },
      {
        path: "signup",
        canActivate: [guestGuard],
        loadComponent: () => import("./chunk-NCRLBFX7.js").then((m) => m.SignupPageComponent)
      },
      {
        path: "forgot-password",
        canActivate: [guestGuard],
        loadComponent: () => import("./chunk-PC5XK7YP.js").then((m) => m.ForgotPasswordPageComponent)
      },
      {
        path: "confirm-email",
        loadComponent: () => import("./chunk-NK7ARN2P.js").then((m) => m.ConfirmEmailPageComponent)
      },
      {
        path: "reset-password",
        loadComponent: () => import("./chunk-TDN4GR6Y.js").then((m) => m.ResetPasswordPageComponent)
      }
    ]
  },
  { path: "**", redirectTo: "" }
];

// apps/web/src/app/app.config.ts
function initAuth(auth) {
  return () => auth.init();
}
var appConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(withInterceptors([apiInterceptor, errorInterceptor])),
    {
      provide: APP_INITIALIZER,
      useFactory: initAuth,
      deps: [AuthService],
      multi: true
    }
  ]
};

// apps/web/src/app/shared/components/toast/toast.component.ts
var _forTrack03 = ($index, $item) => $item.id;
function ToastContainerComponent_For_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275domElementStart(0, "div", 2)(1, "span");
    \u0275\u0275text(2);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(3, "button", 3);
    \u0275\u0275domListener("click", function ToastContainerComponent_For_2_Template_button_click_3_listener() {
      const toast_r2 = \u0275\u0275restoreView(_r1).$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.toastService.dismiss(toast_r2.id));
    });
    \u0275\u0275text(4, " \xD7 ");
    \u0275\u0275domElementEnd()();
  }
  if (rf & 2) {
    const toast_r2 = ctx.$implicit;
    \u0275\u0275classMap(\u0275\u0275interpolate1("toast toast--", toast_r2.type));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(toast_r2.message);
  }
}
var ToastContainerComponent = class _ToastContainerComponent {
  toastService = inject(ToastService);
  static \u0275fac = function ToastContainerComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ToastContainerComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ToastContainerComponent, selectors: [["app-toast-container"]], decls: 3, vars: 0, consts: [["aria-live", "polite", "aria-atomic", "true", 1, "toast-container"], ["role", "alert", 3, "class"], ["role", "alert"], ["type", "button", "aria-label", "Dismiss", 1, "dismiss", 3, "click"]], template: function ToastContainerComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275domElementStart(0, "div", 0);
      \u0275\u0275repeaterCreate(1, ToastContainerComponent_For_2_Template, 5, 4, "div", 1, _forTrack03);
      \u0275\u0275domElementEnd();
    }
    if (rf & 2) {
      \u0275\u0275advance();
      \u0275\u0275repeater(ctx.toastService.toasts());
    }
  }, styles: ["\n.toast-container[_ngcontent-%COMP%] {\n  position: fixed;\n  bottom: var(--space-xl);\n  right: var(--space-xl);\n  z-index: 1000;\n  display: flex;\n  flex-direction: column;\n  gap: var(--space-sm);\n  max-width: 400px;\n}\n.toast[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: var(--space-md);\n  padding: var(--space-md) var(--space-lg);\n  border-radius: var(--radius-md);\n  background: var(--color-surface);\n  border: 1px solid var(--color-border);\n  box-shadow: var(--shadow-md);\n  font-size: 0.875rem;\n  font-weight: 600;\n}\n.toast--error[_ngcontent-%COMP%] {\n  border-color: var(--color-danger);\n  color: var(--color-danger);\n}\n.toast--success[_ngcontent-%COMP%] {\n  border-color: var(--color-success);\n  color: var(--color-success);\n}\n.dismiss[_ngcontent-%COMP%] {\n  border: none;\n  background: transparent;\n  font-size: 1.25rem;\n  line-height: 1;\n  color: inherit;\n  opacity: 0.7;\n}\n/*# sourceMappingURL=toast.component.css.map */"], changeDetection: 0 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ToastContainerComponent, [{
    type: Component,
    args: [{ selector: "app-toast-container", changeDetection: ChangeDetectionStrategy.OnPush, template: `
    <div class="toast-container" aria-live="polite" aria-atomic="true">
      @for (toast of toastService.toasts(); track toast.id) {
        <div class="toast toast--{{ toast.type }}" role="alert">
          <span>{{ toast.message }}</span>
          <button type="button" class="dismiss" (click)="toastService.dismiss(toast.id)" aria-label="Dismiss">
            \xD7
          </button>
        </div>
      }
    </div>
  `, styles: ["/* angular:styles/component:scss;3bf173ff1648c3b3bb91dc5f2e43f52fa99c0fd4bc2dc667b7537a880a7315cf;C:/Users/baseb/OneDrive/Documents/GitHub/boardgame-social-v2/apps/web/src/app/shared/components/toast/toast.component.ts */\n.toast-container {\n  position: fixed;\n  bottom: var(--space-xl);\n  right: var(--space-xl);\n  z-index: 1000;\n  display: flex;\n  flex-direction: column;\n  gap: var(--space-sm);\n  max-width: 400px;\n}\n.toast {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: var(--space-md);\n  padding: var(--space-md) var(--space-lg);\n  border-radius: var(--radius-md);\n  background: var(--color-surface);\n  border: 1px solid var(--color-border);\n  box-shadow: var(--shadow-md);\n  font-size: 0.875rem;\n  font-weight: 600;\n}\n.toast--error {\n  border-color: var(--color-danger);\n  color: var(--color-danger);\n}\n.toast--success {\n  border-color: var(--color-success);\n  color: var(--color-success);\n}\n.dismiss {\n  border: none;\n  background: transparent;\n  font-size: 1.25rem;\n  line-height: 1;\n  color: inherit;\n  opacity: 0.7;\n}\n/*# sourceMappingURL=toast.component.css.map */\n"] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ToastContainerComponent, { className: "ToastContainerComponent", filePath: "apps/web/src/app/shared/components/toast/toast.component.ts", lineNumber: 65 });
})();

// apps/web/src/app/app.ts
var App = class _App {
  static \u0275fac = function App_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _App)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _App, selectors: [["app-root"]], decls: 2, vars: 0, template: function App_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275element(0, "router-outlet")(1, "app-toast-container");
    }
  }, dependencies: [RouterOutlet, ToastContainerComponent], styles: ["\n[_nghost-%COMP%] {\n  display: block;\n  min-height: 100vh;\n}\n/*# sourceMappingURL=app.css.map */"], changeDetection: 0 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(App, [{
    type: Component,
    args: [{ selector: "app-root", changeDetection: ChangeDetectionStrategy.OnPush, imports: [RouterOutlet, ToastContainerComponent], template: `
    <router-outlet />
    <app-toast-container />
  `, styles: ["/* angular:styles/component:scss;b12e85be7d455115f6d554170e92b6088ef37ef9bf708b0eae91cd65079b1ecd;C:/Users/baseb/OneDrive/Documents/GitHub/boardgame-social-v2/apps/web/src/app/app.ts */\n:host {\n  display: block;\n  min-height: 100vh;\n}\n/*# sourceMappingURL=app.css.map */\n"] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(App, { className: "App", filePath: "apps/web/src/app/app.ts", lineNumber: 15 });
})();

// apps/web/src/main.ts
bootstrapApplication(App, appConfig).catch((err) => console.error(err));
//# sourceMappingURL=main.js.map
