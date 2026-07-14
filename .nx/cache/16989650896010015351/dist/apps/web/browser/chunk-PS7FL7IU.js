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

// apps/web/src/app/features/onboarding/onboarding-page.component.ts
function OnboardingPageComponent_Conditional_18_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 8);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.error());
  }
}
var OnboardingPageComponent = class _OnboardingPageComponent {
  auth = inject(AuthService);
  router = inject(Router);
  fb = inject(FormBuilder);
  form = this.fb.nonNullable.group({
    username: ["", [Validators.required, Validators.minLength(3)]],
    display_name: ["", Validators.required]
  });
  error = signal("", ...ngDevMode ? [{ debugName: "error" }] : (
    /* istanbul ignore next */
    []
  ));
  submitting = signal(false, ...ngDevMode ? [{ debugName: "submitting" }] : (
    /* istanbul ignore next */
    []
  ));
  avatarFile = null;
  onFile(event) {
    const input = event.target;
    this.avatarFile = input.files?.[0] ?? null;
  }
  async onSubmit() {
    if (this.form.invalid)
      return;
    this.submitting.set(true);
    this.error.set("");
    try {
      await this.auth.updateProfile(this.form.getRawValue());
      if (this.avatarFile) {
        await this.auth.uploadAvatar(this.avatarFile);
      }
      await this.router.navigate(["/onboarding/import-games"]);
    } catch (e) {
      this.error.set(e instanceof Error ? e.message : "Setup failed");
    } finally {
      this.submitting.set(false);
    }
  }
  static \u0275fac = function OnboardingPageComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _OnboardingPageComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _OnboardingPageComponent, selectors: [["app-onboarding-page"]], decls: 24, vars: 3, consts: [[1, "onboarding", "card"], [1, "title"], [1, "subtitle"], [3, "ngSubmit", "formGroup"], [1, "field"], ["formControlName", "username", "autocomplete", "username", 1, "input"], ["formControlName", "display_name", "autocomplete", "name", 1, "input"], ["type", "file", "accept", "image/*", 3, "change"], ["role", "alert", 1, "error"], ["type", "submit", 1, "btn", "btn-primary", 3, "disabled"], [1, "skip"], ["routerLink", "/onboarding/import-games"]], template: function OnboardingPageComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "h1", 1);
      \u0275\u0275text(2, "Set up your profile");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(3, "p", 2);
      \u0275\u0275text(4, "Tell us a bit about yourself to get started.");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(5, "form", 3);
      \u0275\u0275listener("ngSubmit", function OnboardingPageComponent_Template_form_ngSubmit_5_listener() {
        return ctx.onSubmit();
      });
      \u0275\u0275elementStart(6, "label", 4)(7, "span");
      \u0275\u0275text(8, "Username");
      \u0275\u0275elementEnd();
      \u0275\u0275element(9, "input", 5);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(10, "label", 4)(11, "span");
      \u0275\u0275text(12, "Display name");
      \u0275\u0275elementEnd();
      \u0275\u0275element(13, "input", 6);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(14, "label", 4)(15, "span");
      \u0275\u0275text(16, "Avatar");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(17, "input", 7);
      \u0275\u0275listener("change", function OnboardingPageComponent_Template_input_change_17_listener($event) {
        return ctx.onFile($event);
      });
      \u0275\u0275elementEnd()();
      \u0275\u0275conditionalCreate(18, OnboardingPageComponent_Conditional_18_Template, 2, 1, "p", 8);
      \u0275\u0275elementStart(19, "button", 9);
      \u0275\u0275text(20, " Continue ");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(21, "p", 10)(22, "a", 11);
      \u0275\u0275text(23, "Skip to BGG import \u2192");
      \u0275\u0275elementEnd()()();
    }
    if (rf & 2) {
      \u0275\u0275advance(5);
      \u0275\u0275property("formGroup", ctx.form);
      \u0275\u0275advance(13);
      \u0275\u0275conditional(ctx.error() ? 18 : -1);
      \u0275\u0275advance();
      \u0275\u0275property("disabled", ctx.form.invalid || ctx.submitting());
    }
  }, dependencies: [ReactiveFormsModule, \u0275NgNoValidate, DefaultValueAccessor, NgControlStatus, NgControlStatusGroup, FormGroupDirective, FormControlName, RouterLink], styles: ['\n.onboarding[_ngcontent-%COMP%] {\n  max-width: 480px;\n  margin: 0 auto;\n  padding: var(--space-2xl);\n}\n.title[_ngcontent-%COMP%] {\n  margin: 0;\n  font-family: "Fraunces", serif;\n  font-size: 1.75rem;\n}\n.subtitle[_ngcontent-%COMP%] {\n  margin: var(--space-sm) 0 var(--space-xl);\n  color: var(--color-text-secondary);\n}\n.field[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: var(--space-xs);\n  margin-bottom: var(--space-lg);\n  font-size: 0.875rem;\n  font-weight: 600;\n  color: var(--color-text-secondary);\n}\n.error[_ngcontent-%COMP%] {\n  color: var(--color-danger);\n  font-size: 0.875rem;\n}\n.skip[_ngcontent-%COMP%] {\n  margin-top: var(--space-lg);\n  text-align: center;\n  font-size: 0.875rem;\n}\n.skip[_ngcontent-%COMP%]   a[_ngcontent-%COMP%] {\n  color: var(--color-primary);\n  font-weight: 600;\n}\n/*# sourceMappingURL=onboarding-page.component.css.map */'], changeDetection: 0 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(OnboardingPageComponent, [{
    type: Component,
    args: [{ selector: "app-onboarding-page", changeDetection: ChangeDetectionStrategy.OnPush, imports: [ReactiveFormsModule, RouterLink], template: `
    <div class="onboarding card">
      <h1 class="title">Set up your profile</h1>
      <p class="subtitle">Tell us a bit about yourself to get started.</p>

      <form [formGroup]="form" (ngSubmit)="onSubmit()">
        <label class="field">
          <span>Username</span>
          <input class="input" formControlName="username" autocomplete="username" />
        </label>
        <label class="field">
          <span>Display name</span>
          <input class="input" formControlName="display_name" autocomplete="name" />
        </label>
        <label class="field">
          <span>Avatar</span>
          <input type="file" accept="image/*" (change)="onFile($event)" />
        </label>
        @if (error()) {
          <p class="error" role="alert">{{ error() }}</p>
        }
        <button class="btn btn-primary" type="submit" [disabled]="form.invalid || submitting()">
          Continue
        </button>
      </form>

      <p class="skip">
        <a routerLink="/onboarding/import-games">Skip to BGG import \u2192</a>
      </p>
    </div>
  `, styles: ['/* angular:styles/component:scss;967219014eda3ec4d4d36930ba95f7cf2e52b702d249d1c3ec2155fba15e9533;C:/Users/baseb/OneDrive/Documents/GitHub/boardgame-social-v2/apps/web/src/app/features/onboarding/onboarding-page.component.ts */\n.onboarding {\n  max-width: 480px;\n  margin: 0 auto;\n  padding: var(--space-2xl);\n}\n.title {\n  margin: 0;\n  font-family: "Fraunces", serif;\n  font-size: 1.75rem;\n}\n.subtitle {\n  margin: var(--space-sm) 0 var(--space-xl);\n  color: var(--color-text-secondary);\n}\n.field {\n  display: flex;\n  flex-direction: column;\n  gap: var(--space-xs);\n  margin-bottom: var(--space-lg);\n  font-size: 0.875rem;\n  font-weight: 600;\n  color: var(--color-text-secondary);\n}\n.error {\n  color: var(--color-danger);\n  font-size: 0.875rem;\n}\n.skip {\n  margin-top: var(--space-lg);\n  text-align: center;\n  font-size: 0.875rem;\n}\n.skip a {\n  color: var(--color-primary);\n  font-weight: 600;\n}\n/*# sourceMappingURL=onboarding-page.component.css.map */\n'] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(OnboardingPageComponent, { className: "OnboardingPageComponent", filePath: "apps/web/src/app/features/onboarding/onboarding-page.component.ts", lineNumber: 50 });
})();
export {
  OnboardingPageComponent
};
//# sourceMappingURL=chunk-PS7FL7IU.js.map
