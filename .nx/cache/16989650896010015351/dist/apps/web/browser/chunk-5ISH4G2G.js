import {
  ChangeDetectionStrategy,
  Component,
  Input,
  input,
  setClassMetadata,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵdefineComponent,
  ɵɵdomElementEnd,
  ɵɵdomElementStart,
  ɵɵnextContext,
  ɵɵprojection,
  ɵɵprojectionDef,
  ɵɵtext,
  ɵɵtextInterpolate
} from "./chunk-B6IJ3W3N.js";

// apps/web/src/app/shared/components/page-header/page-header.component.ts
var _c0 = ["*"];
function PageHeaderComponent_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "p", 1);
    \u0275\u0275text(1);
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.overline());
  }
}
function PageHeaderComponent_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "p", 3);
    \u0275\u0275text(1);
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.subtitle());
  }
}
var PageHeaderComponent = class _PageHeaderComponent {
  title = input.required(...ngDevMode ? [{ debugName: "title" }] : (
    /* istanbul ignore next */
    []
  ));
  subtitle = input(...ngDevMode ? [void 0, { debugName: "subtitle" }] : (
    /* istanbul ignore next */
    []
  ));
  overline = input(...ngDevMode ? [void 0, { debugName: "overline" }] : (
    /* istanbul ignore next */
    []
  ));
  static \u0275fac = function PageHeaderComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _PageHeaderComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _PageHeaderComponent, selectors: [["app-page-header"]], inputs: { title: [1, "title"], subtitle: [1, "subtitle"], overline: [1, "overline"] }, ngContentSelectors: _c0, decls: 7, vars: 3, consts: [[1, "page-header"], [1, "overline"], [1, "title"], [1, "subtitle"]], template: function PageHeaderComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275projectionDef();
      \u0275\u0275domElementStart(0, "header", 0)(1, "div");
      \u0275\u0275conditionalCreate(2, PageHeaderComponent_Conditional_2_Template, 2, 1, "p", 1);
      \u0275\u0275domElementStart(3, "h1", 2);
      \u0275\u0275text(4);
      \u0275\u0275domElementEnd();
      \u0275\u0275conditionalCreate(5, PageHeaderComponent_Conditional_5_Template, 2, 1, "p", 3);
      \u0275\u0275domElementEnd();
      \u0275\u0275projection(6);
      \u0275\u0275domElementEnd();
    }
    if (rf & 2) {
      \u0275\u0275advance(2);
      \u0275\u0275conditional(ctx.overline() ? 2 : -1);
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate(ctx.title());
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.subtitle() ? 5 : -1);
    }
  }, styles: ['\n.page-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: flex-start;\n  justify-content: space-between;\n  gap: var(--space-lg);\n  margin-bottom: var(--space-xl);\n}\n.overline[_ngcontent-%COMP%] {\n  margin: 0 0 var(--space-xs);\n  font-size: 0.6875rem;\n  font-weight: 700;\n  letter-spacing: 0.06em;\n  text-transform: uppercase;\n  color: var(--color-primary);\n}\n.title[_ngcontent-%COMP%] {\n  margin: 0;\n  font-family: "Fraunces", serif;\n  font-weight: 700;\n  font-size: 2rem;\n  color: var(--color-text-primary);\n}\n.subtitle[_ngcontent-%COMP%] {\n  margin: var(--space-sm) 0 0;\n  color: var(--color-text-secondary);\n  font-size: 1rem;\n}\n/*# sourceMappingURL=page-header.component.css.map */'], changeDetection: 0 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(PageHeaderComponent, [{
    type: Component,
    args: [{ selector: "app-page-header", changeDetection: ChangeDetectionStrategy.OnPush, template: `
    <header class="page-header">
      <div>
        @if (overline()) {
          <p class="overline">{{ overline() }}</p>
        }
        <h1 class="title">{{ title() }}</h1>
        @if (subtitle()) {
          <p class="subtitle">{{ subtitle() }}</p>
        }
      </div>
      <ng-content />
    </header>
  `, styles: ['/* angular:styles/component:scss;ee953d7916a174b392904293bb1395a30da65479980bfbd068d1ea7ce2f682a1;C:/Users/baseb/OneDrive/Documents/GitHub/boardgame-social-v2/apps/web/src/app/shared/components/page-header/page-header.component.ts */\n.page-header {\n  display: flex;\n  align-items: flex-start;\n  justify-content: space-between;\n  gap: var(--space-lg);\n  margin-bottom: var(--space-xl);\n}\n.overline {\n  margin: 0 0 var(--space-xs);\n  font-size: 0.6875rem;\n  font-weight: 700;\n  letter-spacing: 0.06em;\n  text-transform: uppercase;\n  color: var(--color-primary);\n}\n.title {\n  margin: 0;\n  font-family: "Fraunces", serif;\n  font-weight: 700;\n  font-size: 2rem;\n  color: var(--color-text-primary);\n}\n.subtitle {\n  margin: var(--space-sm) 0 0;\n  color: var(--color-text-secondary);\n  font-size: 1rem;\n}\n/*# sourceMappingURL=page-header.component.css.map */\n'] }]
  }], null, { title: [{ type: Input, args: [{ isSignal: true, alias: "title", required: true }] }], subtitle: [{ type: Input, args: [{ isSignal: true, alias: "subtitle", required: false }] }], overline: [{ type: Input, args: [{ isSignal: true, alias: "overline", required: false }] }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(PageHeaderComponent, { className: "PageHeaderComponent", filePath: "apps/web/src/app/shared/components/page-header/page-header.component.ts", lineNumber: 53 });
})();

export {
  PageHeaderComponent
};
//# sourceMappingURL=chunk-5ISH4G2G.js.map
