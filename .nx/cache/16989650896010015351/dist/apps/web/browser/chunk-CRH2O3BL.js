import {
  CollectionsApiService
} from "./chunk-2TWOYIO7.js";
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
  Router
} from "./chunk-3YWMTBPO.js";
import "./chunk-G3THX2OW.js";
import "./chunk-XKHOIK35.js";
import {
  ChangeDetectionStrategy,
  Component,
  firstValueFrom,
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
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1
} from "./chunk-B6IJ3W3N.js";

// apps/web/src/app/features/onboarding/import-games-page.component.ts
function ImportGamesPageComponent_Conditional_10_Template(rf, ctx) {
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
function ImportGamesPageComponent_Conditional_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 7);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("Imported ", ctx_r0.result(), " games!");
  }
}
var ImportGamesPageComponent = class _ImportGamesPageComponent {
  collections = inject(CollectionsApiService);
  auth = inject(AuthService);
  router = inject(Router);
  fb = inject(FormBuilder);
  form = this.fb.nonNullable.group({
    username: [this.auth.profile()?.bgg_username ?? "", Validators.required]
  });
  error = signal("", ...ngDevMode ? [{ debugName: "error" }] : (
    /* istanbul ignore next */
    []
  ));
  result = signal(null, ...ngDevMode ? [{ debugName: "result" }] : (
    /* istanbul ignore next */
    []
  ));
  importing = signal(false, ...ngDevMode ? [{ debugName: "importing" }] : (
    /* istanbul ignore next */
    []
  ));
  async onSubmit() {
    if (this.form.invalid)
      return;
    this.importing.set(true);
    this.error.set("");
    try {
      const { username } = this.form.getRawValue();
      const res = await firstValueFrom(this.collections.importFromBgg(username));
      this.result.set(res.imported ?? 0);
      await this.auth.loadProfile(this.auth.user()?.id ?? "");
      setTimeout(() => this.router.navigate(["/"]), 1500);
    } catch (e) {
      this.error.set(e instanceof Error ? e.message : "Import failed");
    } finally {
      this.importing.set(false);
    }
  }
  skip() {
    this.router.navigate(["/"]);
  }
  static \u0275fac = function ImportGamesPageComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ImportGamesPageComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ImportGamesPageComponent, selectors: [["app-import-games-page"]], decls: 17, vars: 5, consts: [[1, "import", "card"], [1, "title"], [1, "subtitle"], [3, "ngSubmit", "formGroup"], [1, "field"], ["formControlName", "username", "placeholder", "e.g. alexplays", 1, "input"], ["role", "alert", 1, "error"], ["role", "status", 1, "success"], [1, "actions"], ["type", "submit", 1, "btn", "btn-primary", 3, "disabled"], ["type", "button", 1, "btn", "btn-secondary", 3, "click"]], template: function ImportGamesPageComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "h1", 1);
      \u0275\u0275text(2, "Import your collection");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(3, "p", 2);
      \u0275\u0275text(4, "Enter your BoardGameGeek username to sync owned games.");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(5, "form", 3);
      \u0275\u0275listener("ngSubmit", function ImportGamesPageComponent_Template_form_ngSubmit_5_listener() {
        return ctx.onSubmit();
      });
      \u0275\u0275elementStart(6, "label", 4)(7, "span");
      \u0275\u0275text(8, "BGG username");
      \u0275\u0275elementEnd();
      \u0275\u0275element(9, "input", 5);
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(10, ImportGamesPageComponent_Conditional_10_Template, 2, 1, "p", 6);
      \u0275\u0275conditionalCreate(11, ImportGamesPageComponent_Conditional_11_Template, 2, 1, "p", 7);
      \u0275\u0275elementStart(12, "div", 8)(13, "button", 9);
      \u0275\u0275text(14);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(15, "button", 10);
      \u0275\u0275listener("click", function ImportGamesPageComponent_Template_button_click_15_listener() {
        return ctx.skip();
      });
      \u0275\u0275text(16, "Skip for now");
      \u0275\u0275elementEnd()()()();
    }
    if (rf & 2) {
      \u0275\u0275advance(5);
      \u0275\u0275property("formGroup", ctx.form);
      \u0275\u0275advance(5);
      \u0275\u0275conditional(ctx.error() ? 10 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.result() ? 11 : -1);
      \u0275\u0275advance(2);
      \u0275\u0275property("disabled", ctx.form.invalid || ctx.importing());
      \u0275\u0275advance();
      \u0275\u0275textInterpolate1(" ", ctx.importing() ? "Importing\u2026" : "Import from BGG", " ");
    }
  }, dependencies: [ReactiveFormsModule, \u0275NgNoValidate, DefaultValueAccessor, NgControlStatus, NgControlStatusGroup, FormGroupDirective, FormControlName], styles: ['\n.import[_ngcontent-%COMP%] {\n  max-width: 480px;\n  margin: 0 auto;\n  padding: var(--space-2xl);\n}\n.title[_ngcontent-%COMP%] {\n  margin: 0;\n  font-family: "Fraunces", serif;\n  font-size: 1.75rem;\n}\n.subtitle[_ngcontent-%COMP%] {\n  margin: var(--space-sm) 0 var(--space-xl);\n  color: var(--color-text-secondary);\n}\n.field[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: var(--space-xs);\n  margin-bottom: var(--space-lg);\n  font-size: 0.875rem;\n  font-weight: 600;\n  color: var(--color-text-secondary);\n}\n.actions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: var(--space-md);\n  flex-wrap: wrap;\n}\n.error[_ngcontent-%COMP%] {\n  color: var(--color-danger);\n  font-size: 0.875rem;\n}\n.success[_ngcontent-%COMP%] {\n  color: var(--color-primary);\n  font-size: 0.875rem;\n}\n/*# sourceMappingURL=import-games-page.component.css.map */'], changeDetection: 0 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ImportGamesPageComponent, [{
    type: Component,
    args: [{ selector: "app-import-games-page", changeDetection: ChangeDetectionStrategy.OnPush, imports: [ReactiveFormsModule], template: `
    <div class="import card">
      <h1 class="title">Import your collection</h1>
      <p class="subtitle">Enter your BoardGameGeek username to sync owned games.</p>

      <form [formGroup]="form" (ngSubmit)="onSubmit()">
        <label class="field">
          <span>BGG username</span>
          <input class="input" formControlName="username" placeholder="e.g. alexplays" />
        </label>
        @if (error()) {
          <p class="error" role="alert">{{ error() }}</p>
        }
        @if (result()) {
          <p class="success" role="status">Imported {{ result() }} games!</p>
        }
        <div class="actions">
          <button class="btn btn-primary" type="submit" [disabled]="form.invalid || importing()">
            {{ importing() ? 'Importing\u2026' : 'Import from BGG' }}
          </button>
          <button type="button" class="btn btn-secondary" (click)="skip()">Skip for now</button>
        </div>
      </form>
    </div>
  `, styles: ['/* angular:styles/component:scss;ad4d8132575c591265bbbe3eca9e9cdd8cef5877b311f05ce46e1f684f35ae08;C:/Users/baseb/OneDrive/Documents/GitHub/boardgame-social-v2/apps/web/src/app/features/onboarding/import-games-page.component.ts */\n.import {\n  max-width: 480px;\n  margin: 0 auto;\n  padding: var(--space-2xl);\n}\n.title {\n  margin: 0;\n  font-family: "Fraunces", serif;\n  font-size: 1.75rem;\n}\n.subtitle {\n  margin: var(--space-sm) 0 var(--space-xl);\n  color: var(--color-text-secondary);\n}\n.field {\n  display: flex;\n  flex-direction: column;\n  gap: var(--space-xs);\n  margin-bottom: var(--space-lg);\n  font-size: 0.875rem;\n  font-weight: 600;\n  color: var(--color-text-secondary);\n}\n.actions {\n  display: flex;\n  gap: var(--space-md);\n  flex-wrap: wrap;\n}\n.error {\n  color: var(--color-danger);\n  font-size: 0.875rem;\n}\n.success {\n  color: var(--color-primary);\n  font-size: 0.875rem;\n}\n/*# sourceMappingURL=import-games-page.component.css.map */\n'] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ImportGamesPageComponent, { className: "ImportGamesPageComponent", filePath: "apps/web/src/app/features/onboarding/import-games-page.component.ts", lineNumber: 47 });
})();
export {
  ImportGamesPageComponent
};
//# sourceMappingURL=chunk-CRH2O3BL.js.map
