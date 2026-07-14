import {
  RouterLink
} from "./chunk-3YWMTBPO.js";
import "./chunk-G3THX2OW.js";
import "./chunk-XKHOIK35.js";
import {
  ChangeDetectionStrategy,
  Component,
  setClassMetadata,
  ɵsetClassDebugInfo,
  ɵɵdefineComponent,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵtext
} from "./chunk-B6IJ3W3N.js";

// apps/web/src/app/features/auth/confirm-email-page.component.ts
var ConfirmEmailPageComponent = class _ConfirmEmailPageComponent {
  static \u0275fac = function ConfirmEmailPageComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ConfirmEmailPageComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ConfirmEmailPageComponent, selectors: [["app-confirm-email-page"]], decls: 7, vars: 0, consts: [[1, "auth-card", "card"], [1, "title"], [1, "subtitle"], ["routerLink", "/login", 1, "btn", "btn-primary"]], template: function ConfirmEmailPageComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "h2", 1);
      \u0275\u0275text(2, "Check your email");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(3, "p", 2);
      \u0275\u0275text(4, " We sent a confirmation link to your inbox. Click it to activate your account, then sign in. ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(5, "a", 3);
      \u0275\u0275text(6, "Go to sign in");
      \u0275\u0275elementEnd()();
    }
  }, dependencies: [RouterLink], styles: ['\n.auth-card[_ngcontent-%COMP%] {\n  width: min(100%, 420px);\n  padding: var(--space-2xl);\n  text-align: center;\n}\n.title[_ngcontent-%COMP%] {\n  margin: 0;\n  font-family: "Fraunces", serif;\n  font-size: 1.75rem;\n  font-weight: 700;\n}\n.subtitle[_ngcontent-%COMP%] {\n  margin: var(--space-sm) 0 var(--space-xl);\n  color: var(--color-text-secondary);\n  line-height: 1.5;\n}\n/*# sourceMappingURL=confirm-email-page.component.css.map */'], changeDetection: 0 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ConfirmEmailPageComponent, [{
    type: Component,
    args: [{ selector: "app-confirm-email-page", changeDetection: ChangeDetectionStrategy.OnPush, imports: [RouterLink], template: `
    <div class="auth-card card">
      <h2 class="title">Check your email</h2>
      <p class="subtitle">
        We sent a confirmation link to your inbox. Click it to activate your account, then sign in.
      </p>
      <a routerLink="/login" class="btn btn-primary">Go to sign in</a>
    </div>
  `, styles: ['/* angular:styles/component:scss;b307d77d90dc1255196cafe648ef19e8ab9f6bb9a0948eeeed2b64e09f4ccecd;C:/Users/baseb/OneDrive/Documents/GitHub/boardgame-social-v2/apps/web/src/app/features/auth/confirm-email-page.component.ts */\n.auth-card {\n  width: min(100%, 420px);\n  padding: var(--space-2xl);\n  text-align: center;\n}\n.title {\n  margin: 0;\n  font-family: "Fraunces", serif;\n  font-size: 1.75rem;\n  font-weight: 700;\n}\n.subtitle {\n  margin: var(--space-sm) 0 var(--space-xl);\n  color: var(--color-text-secondary);\n  line-height: 1.5;\n}\n/*# sourceMappingURL=confirm-email-page.component.css.map */\n'] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ConfirmEmailPageComponent, { className: "ConfirmEmailPageComponent", filePath: "apps/web/src/app/features/auth/confirm-email-page.component.ts", lineNumber: 23 });
})();
export {
  ConfirmEmailPageComponent
};
//# sourceMappingURL=chunk-NK7ARN2P.js.map
