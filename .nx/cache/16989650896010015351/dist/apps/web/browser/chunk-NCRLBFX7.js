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

// apps/web/src/app/features/auth/signup-page.component.ts
function SignupPageComponent_Conditional_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 7);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.error());
  }
}
function SignupPageComponent_Conditional_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 8);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.success());
  }
}
var SignupPageComponent = class _SignupPageComponent {
  auth = inject(AuthService);
  router = inject(Router);
  fb = inject(FormBuilder);
  form = this.fb.nonNullable.group({
    email: ["", [Validators.required, Validators.email]],
    password: ["", [Validators.required, Validators.minLength(8)]]
  });
  error = signal("", ...ngDevMode ? [{ debugName: "error" }] : (
    /* istanbul ignore next */
    []
  ));
  success = signal("", ...ngDevMode ? [{ debugName: "success" }] : (
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
      const { email, password } = this.form.getRawValue();
      await this.auth.signUp(email, password);
      this.success.set("Check your email to confirm your account.");
      setTimeout(() => this.router.navigate(["/confirm-email"]), 1500);
    } catch (e) {
      this.error.set(e instanceof Error ? e.message : "Sign up failed");
    } finally {
      this.submitting.set(false);
    }
  }
  static \u0275fac = function SignupPageComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _SignupPageComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _SignupPageComponent, selectors: [["app-signup-page"]], decls: 21, vars: 4, consts: [[1, "auth-card", "card"], [1, "title"], [1, "subtitle"], [3, "ngSubmit", "formGroup"], [1, "field"], ["type", "email", "formControlName", "email", "autocomplete", "email", 1, "input"], ["type", "password", "formControlName", "password", "autocomplete", "new-password", 1, "input"], ["role", "alert", 1, "error"], ["role", "status", 1, "success"], ["type", "submit", 1, "btn", "btn-primary", "submit", 3, "disabled"], [1, "links"], ["routerLink", "/login"]], template: function SignupPageComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "h2", 1);
      \u0275\u0275text(2, "Create account");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(3, "p", 2);
      \u0275\u0275text(4, "Join the tabletop community.");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(5, "form", 3);
      \u0275\u0275listener("ngSubmit", function SignupPageComponent_Template_form_ngSubmit_5_listener() {
        return ctx.onSubmit();
      });
      \u0275\u0275elementStart(6, "label", 4)(7, "span");
      \u0275\u0275text(8, "Email");
      \u0275\u0275elementEnd();
      \u0275\u0275element(9, "input", 5);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(10, "label", 4)(11, "span");
      \u0275\u0275text(12, "Password");
      \u0275\u0275elementEnd();
      \u0275\u0275element(13, "input", 6);
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(14, SignupPageComponent_Conditional_14_Template, 2, 1, "p", 7);
      \u0275\u0275conditionalCreate(15, SignupPageComponent_Conditional_15_Template, 2, 1, "p", 8);
      \u0275\u0275elementStart(16, "button", 9);
      \u0275\u0275text(17, " Sign up ");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(18, "p", 10)(19, "a", 11);
      \u0275\u0275text(20, "Already have an account?");
      \u0275\u0275elementEnd()()();
    }
    if (rf & 2) {
      \u0275\u0275advance(5);
      \u0275\u0275property("formGroup", ctx.form);
      \u0275\u0275advance(9);
      \u0275\u0275conditional(ctx.error() ? 14 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.success() ? 15 : -1);
      \u0275\u0275advance();
      \u0275\u0275property("disabled", ctx.form.invalid || ctx.submitting());
    }
  }, dependencies: [ReactiveFormsModule, \u0275NgNoValidate, DefaultValueAccessor, NgControlStatus, NgControlStatusGroup, FormGroupDirective, FormControlName, RouterLink], styles: ['\n.auth-card[_ngcontent-%COMP%] {\n  width: min(100%, 420px);\n  padding: var(--space-2xl);\n}\n.title[_ngcontent-%COMP%] {\n  margin: 0;\n  font-family: "Fraunces", serif;\n  font-size: 1.75rem;\n  font-weight: 700;\n}\n.subtitle[_ngcontent-%COMP%] {\n  margin: var(--space-sm) 0 var(--space-xl);\n  color: var(--color-text-secondary);\n}\n.field[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: var(--space-xs);\n  margin-bottom: var(--space-lg);\n  font-size: 0.875rem;\n  font-weight: 600;\n  color: var(--color-text-secondary);\n}\n.submit[_ngcontent-%COMP%] {\n  width: 100%;\n  margin-top: var(--space-sm);\n}\n.error[_ngcontent-%COMP%] {\n  color: var(--color-danger);\n  font-size: 0.875rem;\n  margin: 0 0 var(--space-md);\n}\n.success[_ngcontent-%COMP%] {\n  color: var(--color-primary);\n  font-size: 0.875rem;\n  margin: 0 0 var(--space-md);\n}\n.links[_ngcontent-%COMP%] {\n  margin: var(--space-lg) 0 0;\n  text-align: center;\n  font-size: 0.875rem;\n}\n.links[_ngcontent-%COMP%]   a[_ngcontent-%COMP%] {\n  color: var(--color-primary);\n  font-weight: 600;\n}\n/*# sourceMappingURL=signup-page.component.css.map */'], changeDetection: 0 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(SignupPageComponent, [{
    type: Component,
    args: [{ selector: "app-signup-page", changeDetection: ChangeDetectionStrategy.OnPush, imports: [ReactiveFormsModule, RouterLink], template: `
    <div class="auth-card card">
      <h2 class="title">Create account</h2>
      <p class="subtitle">Join the tabletop community.</p>

      <form [formGroup]="form" (ngSubmit)="onSubmit()">
        <label class="field">
          <span>Email</span>
          <input class="input" type="email" formControlName="email" autocomplete="email" />
        </label>
        <label class="field">
          <span>Password</span>
          <input class="input" type="password" formControlName="password" autocomplete="new-password" />
        </label>
        @if (error()) {
          <p class="error" role="alert">{{ error() }}</p>
        }
        @if (success()) {
          <p class="success" role="status">{{ success() }}</p>
        }
        <button class="btn btn-primary submit" type="submit" [disabled]="form.invalid || submitting()">
          Sign up
        </button>
      </form>

      <p class="links">
        <a routerLink="/login">Already have an account?</a>
      </p>
    </div>
  `, styles: ['/* angular:styles/component:scss;2b04fa05b066d352c4af7d7ce98eae17947277139680de4147804f56c9b3240b;C:/Users/baseb/OneDrive/Documents/GitHub/boardgame-social-v2/apps/web/src/app/features/auth/signup-page.component.ts */\n.auth-card {\n  width: min(100%, 420px);\n  padding: var(--space-2xl);\n}\n.title {\n  margin: 0;\n  font-family: "Fraunces", serif;\n  font-size: 1.75rem;\n  font-weight: 700;\n}\n.subtitle {\n  margin: var(--space-sm) 0 var(--space-xl);\n  color: var(--color-text-secondary);\n}\n.field {\n  display: flex;\n  flex-direction: column;\n  gap: var(--space-xs);\n  margin-bottom: var(--space-lg);\n  font-size: 0.875rem;\n  font-weight: 600;\n  color: var(--color-text-secondary);\n}\n.submit {\n  width: 100%;\n  margin-top: var(--space-sm);\n}\n.error {\n  color: var(--color-danger);\n  font-size: 0.875rem;\n  margin: 0 0 var(--space-md);\n}\n.success {\n  color: var(--color-primary);\n  font-size: 0.875rem;\n  margin: 0 0 var(--space-md);\n}\n.links {\n  margin: var(--space-lg) 0 0;\n  text-align: center;\n  font-size: 0.875rem;\n}\n.links a {\n  color: var(--color-primary);\n  font-weight: 600;\n}\n/*# sourceMappingURL=signup-page.component.css.map */\n'] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(SignupPageComponent, { className: "SignupPageComponent", filePath: "apps/web/src/app/features/auth/signup-page.component.ts", lineNumber: 51 });
})();
export {
  SignupPageComponent
};
//# sourceMappingURL=chunk-NCRLBFX7.js.map
