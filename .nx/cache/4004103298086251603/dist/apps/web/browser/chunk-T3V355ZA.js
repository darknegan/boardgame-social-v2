import {
  ChangeDetectionStrategy,
  Component,
  Input,
  Output,
  input,
  output,
  setClassMetadata,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵclassProp,
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵdefineComponent,
  ɵɵdomElement,
  ɵɵdomElementEnd,
  ɵɵdomElementStart,
  ɵɵdomListener,
  ɵɵgetCurrentView,
  ɵɵnextContext,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵstyleProp,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1
} from "./chunk-B6IJ3W3N.js";

// apps/web/src/app/shared/components/empty-state/empty-state.component.ts
function EmptyStateComponent_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "p", 3);
    \u0275\u0275text(1);
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.message());
  }
}
function EmptyStateComponent_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275domElementStart(0, "button", 5);
    \u0275\u0275domListener("click", function EmptyStateComponent_Conditional_6_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.action.emit());
    });
    \u0275\u0275text(1);
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.actionLabel(), " ");
  }
}
var EmptyStateComponent = class _EmptyStateComponent {
  icon = input("\u{1F4ED}", ...ngDevMode ? [{ debugName: "icon" }] : (
    /* istanbul ignore next */
    []
  ));
  title = input.required(...ngDevMode ? [{ debugName: "title" }] : (
    /* istanbul ignore next */
    []
  ));
  message = input(...ngDevMode ? [void 0, { debugName: "message" }] : (
    /* istanbul ignore next */
    []
  ));
  actionLabel = input(...ngDevMode ? [void 0, { debugName: "actionLabel" }] : (
    /* istanbul ignore next */
    []
  ));
  action = output();
  static \u0275fac = function EmptyStateComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _EmptyStateComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _EmptyStateComponent, selectors: [["app-empty-state"]], inputs: { icon: [1, "icon"], title: [1, "title"], message: [1, "message"], actionLabel: [1, "actionLabel"] }, outputs: { action: "action" }, decls: 7, vars: 4, consts: [[1, "empty-state"], ["aria-hidden", "true", 1, "icon"], [1, "title"], [1, "message"], ["type", "button", 1, "btn", "btn-primary"], ["type", "button", 1, "btn", "btn-primary", 3, "click"]], template: function EmptyStateComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275domElementStart(0, "div", 0)(1, "span", 1);
      \u0275\u0275text(2);
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(3, "h2", 2);
      \u0275\u0275text(4);
      \u0275\u0275domElementEnd();
      \u0275\u0275conditionalCreate(5, EmptyStateComponent_Conditional_5_Template, 2, 1, "p", 3);
      \u0275\u0275conditionalCreate(6, EmptyStateComponent_Conditional_6_Template, 2, 1, "button", 4);
      \u0275\u0275domElementEnd();
    }
    if (rf & 2) {
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate(ctx.icon());
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate(ctx.title());
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.message() ? 5 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.actionLabel() ? 6 : -1);
    }
  }, styles: ['\n.empty-state[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  text-align: center;\n  padding: var(--space-3xl) var(--space-xl);\n  gap: var(--space-md);\n}\n.icon[_ngcontent-%COMP%] {\n  font-size: 2.5rem;\n}\n.title[_ngcontent-%COMP%] {\n  margin: 0;\n  font-family: "Fraunces", serif;\n  font-size: 1.25rem;\n}\n.message[_ngcontent-%COMP%] {\n  margin: 0;\n  color: var(--color-text-secondary);\n  max-width: 360px;\n}\n/*# sourceMappingURL=empty-state.component.css.map */'], changeDetection: 0 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(EmptyStateComponent, [{
    type: Component,
    args: [{ selector: "app-empty-state", changeDetection: ChangeDetectionStrategy.OnPush, template: `
    <div class="empty-state">
      <span class="icon" aria-hidden="true">{{ icon() }}</span>
      <h2 class="title">{{ title() }}</h2>
      @if (message()) {
        <p class="message">{{ message() }}</p>
      }
      @if (actionLabel()) {
        <button type="button" class="btn btn-primary" (click)="action.emit()">
          {{ actionLabel() }}
        </button>
      }
    </div>
  `, styles: ['/* angular:styles/component:scss;2b4f51341ba0235014716134e74301f527975cac53ac0070fee72516ef2748d5;C:/Users/baseb/OneDrive/Documents/GitHub/boardgame-social-v2/apps/web/src/app/shared/components/empty-state/empty-state.component.ts */\n.empty-state {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  text-align: center;\n  padding: var(--space-3xl) var(--space-xl);\n  gap: var(--space-md);\n}\n.icon {\n  font-size: 2.5rem;\n}\n.title {\n  margin: 0;\n  font-family: "Fraunces", serif;\n  font-size: 1.25rem;\n}\n.message {\n  margin: 0;\n  color: var(--color-text-secondary);\n  max-width: 360px;\n}\n/*# sourceMappingURL=empty-state.component.css.map */\n'] }]
  }], null, { icon: [{ type: Input, args: [{ isSignal: true, alias: "icon", required: false }] }], title: [{ type: Input, args: [{ isSignal: true, alias: "title", required: true }] }], message: [{ type: Input, args: [{ isSignal: true, alias: "message", required: false }] }], actionLabel: [{ type: Input, args: [{ isSignal: true, alias: "actionLabel", required: false }] }], action: [{ type: Output, args: ["action"] }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(EmptyStateComponent, { className: "EmptyStateComponent", filePath: "apps/web/src/app/shared/components/empty-state/empty-state.component.ts", lineNumber: 47 });
})();

// apps/web/src/app/shared/components/skeleton/skeleton.component.ts
var SkeletonComponent = class _SkeletonComponent {
  width = input("100%", ...ngDevMode ? [{ debugName: "width" }] : (
    /* istanbul ignore next */
    []
  ));
  height = input("1rem", ...ngDevMode ? [{ debugName: "height" }] : (
    /* istanbul ignore next */
    []
  ));
  round = input(false, ...ngDevMode ? [{ debugName: "round" }] : (
    /* istanbul ignore next */
    []
  ));
  static \u0275fac = function SkeletonComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _SkeletonComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _SkeletonComponent, selectors: [["app-skeleton"]], inputs: { width: [1, "width"], height: [1, "height"], round: [1, "round"] }, decls: 1, vars: 6, consts: [[1, "skeleton"]], template: function SkeletonComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275domElement(0, "div", 0);
    }
    if (rf & 2) {
      \u0275\u0275styleProp("width", ctx.width())("height", ctx.height());
      \u0275\u0275classProp("round", ctx.round());
    }
  }, styles: ["\n.skeleton[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      90deg,\n      var(--color-surface-elevated) 25%,\n      var(--color-surface-hover) 50%,\n      var(--color-surface-elevated) 75%);\n  background-size: 200% 100%;\n  animation: _ngcontent-%COMP%_shimmer 1.2s infinite;\n  border-radius: var(--radius-md);\n}\n.round[_ngcontent-%COMP%] {\n  border-radius: var(--radius-full);\n}\n@keyframes _ngcontent-%COMP%_shimmer {\n  0% {\n    background-position: 200% 0;\n  }\n  100% {\n    background-position: -200% 0;\n  }\n}\n/*# sourceMappingURL=skeleton.component.css.map */"], changeDetection: 0 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(SkeletonComponent, [{
    type: Component,
    args: [{ selector: "app-skeleton", changeDetection: ChangeDetectionStrategy.OnPush, template: `
    <div class="skeleton" [style.width]="width()" [style.height]="height()" [class.round]="round()"></div>
  `, styles: ["/* angular:styles/component:scss;a6d33d7d95b30fe1683c984f430b006fb7bd7068df35feeed957f61972895414;C:/Users/baseb/OneDrive/Documents/GitHub/boardgame-social-v2/apps/web/src/app/shared/components/skeleton/skeleton.component.ts */\n.skeleton {\n  background:\n    linear-gradient(\n      90deg,\n      var(--color-surface-elevated) 25%,\n      var(--color-surface-hover) 50%,\n      var(--color-surface-elevated) 75%);\n  background-size: 200% 100%;\n  animation: shimmer 1.2s infinite;\n  border-radius: var(--radius-md);\n}\n.round {\n  border-radius: var(--radius-full);\n}\n@keyframes shimmer {\n  0% {\n    background-position: 200% 0;\n  }\n  100% {\n    background-position: -200% 0;\n  }\n}\n/*# sourceMappingURL=skeleton.component.css.map */\n"] }]
  }], null, { width: [{ type: Input, args: [{ isSignal: true, alias: "width", required: false }] }], height: [{ type: Input, args: [{ isSignal: true, alias: "height", required: false }] }], round: [{ type: Input, args: [{ isSignal: true, alias: "round", required: false }] }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(SkeletonComponent, { className: "SkeletonComponent", filePath: "apps/web/src/app/shared/components/skeleton/skeleton.component.ts", lineNumber: 32 });
})();

export {
  EmptyStateComponent,
  SkeletonComponent
};
//# sourceMappingURL=chunk-T3V355ZA.js.map
