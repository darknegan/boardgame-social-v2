import {
  DefaultValueAccessor,
  FormBuilder,
  FormControlName,
  FormGroupDirective,
  NgControlStatus,
  NgControlStatusGroup,
  ReactiveFormsModule,
  Validators,
  ɵNgNoValidate
} from "./chunk-RUD23VHN.js";
import {
  AuthService
} from "./chunk-QR2D7B5O.js";
import "./chunk-ESOBHDPQ.js";
import {
  Router,
  RouterLink
} from "./chunk-3YWMTBPO.js";
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
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵtext,
  ɵɵtextInterpolate
} from "./chunk-B6IJ3W3N.js";

// apps/web/src/app/features/auth/reset-password-page.component.ts
function ResetPasswordPageComponent_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 6);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.error());
  }
}
var ResetPasswordPageComponent = class _ResetPasswordPageComponent {
  auth = inject(AuthService);
  router = inject(Router);
  fb = inject(FormBuilder);
  form = this.fb.nonNullable.group({
    password: ["", [Validators.required, Validators.minLength(8)]]
  });
  error = signal("", ...ngDevMode ? [{ debugName: "error" }] : (
    /* istanbul ignore next */
    []
  ));
  submitting = signal(false, ...ngDevMode ? [{ debugName: "submitting" }] : (
    /* istanbul ignore next */
    []
  ));
  async onSubmit() {
    if (this.form.invalid)
      return;
    this.submitting.set(true);
    this.error.set("");
    try {
      await this.auth.updatePassword(this.form.getRawValue().password);
      await this.router.navigate(["/login"]);
    } catch (e) {
      this.error.set(e instanceof Error ? e.message : "Update failed");
    } finally {
      this.submitting.set(false);
    }
  }
  static \u0275fac = function ResetPasswordPageComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ResetPasswordPageComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ResetPasswordPageComponent, selectors: [["app-reset-password-page"]], decls: 16, vars: 3, consts: [[1, "auth-card", "card"], [1, "title"], [1, "subtitle"], [3, "ngSubmit", "formGroup"], [1, "field"], ["type", "password", "formControlName", "password", "autocomplete", "new-password", 1, "input"], ["role", "alert", 1, "error"], ["type", "submit", 1, "btn", "btn-primary", "submit", 3, "disabled"], [1, "links"], ["routerLink", "/login"]], template: function ResetPasswordPageComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "h2", 1);
      \u0275\u0275text(2, "Set new password");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(3, "p", 2);
      \u0275\u0275text(4, "Choose a strong password for your account.");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(5, "form", 3);
      \u0275\u0275listener("ngSubmit", function ResetPasswordPageComponent_Template_form_ngSubmit_5_listener() {
        return ctx.onSubmit();
      });
      \u0275\u0275elementStart(6, "label", 4)(7, "span");
      \u0275\u0275text(8, "New password");
      \u0275\u0275elementEnd();
      \u0275\u0275element(9, "input", 5);
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(10, ResetPasswordPageComponent_Conditional_10_Template, 2, 1, "p", 6);
      \u0275\u0275elementStart(11, "button", 7);
      \u0275\u0275text(12, " Update password ");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(13, "p", 8)(14, "a", 9);
      \u0275\u0275text(15, "Back to sign in");
      \u0275\u0275elementEnd()()();
    }
    if (rf & 2) {
      \u0275\u0275advance(5);
      \u0275\u0275property("formGroup", ctx.form);
      \u0275\u0275advance(5);
      \u0275\u0275conditional(ctx.error() ? 10 : -1);
      \u0275\u0275advance();
      \u0275\u0275property("disabled", ctx.form.invalid || ctx.submitting());
    }
  }, dependencies: [ReactiveFormsModule, \u0275NgNoValidate, DefaultValueAccessor, NgControlStatus, NgControlStatusGroup, FormGroupDirective, FormControlName, RouterLink], styles: ['\n.auth-card[_ngcontent-%COMP%] {\n  width: min(100%, 420px);\n  padding: var(--space-2xl);\n}\n.title[_ngcontent-%COMP%] {\n  margin: 0;\n  font-family: "Fraunces", serif;\n  font-size: 1.75rem;\n  font-weight: 700;\n}\n.subtitle[_ngcontent-%COMP%] {\n  margin: var(--space-sm) 0 var(--space-xl);\n  color: var(--color-text-secondary);\n}\n.field[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: var(--space-xs);\n  margin-bottom: var(--space-lg);\n  font-size: 0.875rem;\n  font-weight: 600;\n  color: var(--color-text-secondary);\n}\n.submit[_ngcontent-%COMP%] {\n  width: 100%;\n}\n.error[_ngcontent-%COMP%] {\n  color: var(--color-danger);\n  font-size: 0.875rem;\n}\n.links[_ngcontent-%COMP%] {\n  margin: var(--space-lg) 0 0;\n  text-align: center;\n  font-size: 0.875rem;\n}\n.links[_ngcontent-%COMP%]   a[_ngcontent-%COMP%] {\n  color: var(--color-primary);\n  font-weight: 600;\n}\n/*# sourceMappingURL=reset-password-page.component.css.map */'], changeDetection: 0 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ResetPasswordPageComponent, [{
    type: Component,
    args: [{ selector: "app-reset-password-page", changeDetection: ChangeDetectionStrategy.OnPush, imports: [ReactiveFormsModule, RouterLink], template: `
    <div class="auth-card card">
      <h2 class="title">Set new password</h2>
      <p class="subtitle">Choose a strong password for your account.</p>

      <form [formGroup]="form" (ngSubmit)="onSubmit()">
        <label class="field">
          <span>New password</span>
          <input class="input" type="password" formControlName="password" autocomplete="new-password" />
        </label>
        @if (error()) {
          <p class="error" role="alert">{{ error() }}</p>
        }
        <button class="btn btn-primary submit" type="submit" [disabled]="form.invalid || submitting()">
          Update password
        </button>
      </form>

      <p class="links"><a routerLink="/login">Back to sign in</a></p>
    </div>
  `, styles: ['/* angular:styles/component:scss;ad4b93f9ecdbc6bb22487f89c834537ade9341ebd4b8ef8d49b5579a33c7f1fa;C:/Users/baseb/OneDrive/Documents/GitHub/boardgame-social-v2/apps/web/src/app/features/auth/reset-password-page.component.ts */\n.auth-card {\n  width: min(100%, 420px);\n  padding: var(--space-2xl);\n}\n.title {\n  margin: 0;\n  font-family: "Fraunces", serif;\n  font-size: 1.75rem;\n  font-weight: 700;\n}\n.subtitle {\n  margin: var(--space-sm) 0 var(--space-xl);\n  color: var(--color-text-secondary);\n}\n.field {\n  display: flex;\n  flex-direction: column;\n  gap: var(--space-xs);\n  margin-bottom: var(--space-lg);\n  font-size: 0.875rem;\n  font-weight: 600;\n  color: var(--color-text-secondary);\n}\n.submit {\n  width: 100%;\n}\n.error {\n  color: var(--color-danger);\n  font-size: 0.875rem;\n}\n.links {\n  margin: var(--space-lg) 0 0;\n  text-align: center;\n  font-size: 0.875rem;\n}\n.links a {\n  color: var(--color-primary);\n  font-weight: 600;\n}\n/*# sourceMappingURL=reset-password-page.component.css.map */\n'] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ResetPasswordPageComponent, { className: "ResetPasswordPageComponent", filePath: "apps/web/src/app/features/auth/reset-password-page.component.ts", lineNumber: 41 });
})();
export {
  ResetPasswordPageComponent
};
//# sourceMappingURL=chunk-TDN4GR6Y.js.map
