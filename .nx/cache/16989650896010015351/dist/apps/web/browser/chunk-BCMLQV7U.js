import {
  PageHeaderComponent
} from "./chunk-5ISH4G2G.js";
import {
  ChangeDetectionStrategy,
  Component,
  setClassMetadata,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵdefineComponent,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵrepeaterTrackByIdentity,
  ɵɵstyleProp,
  ɵɵtext,
  ɵɵtextInterpolate
} from "./chunk-B6IJ3W3N.js";

// apps/web/src/app/features/dev/tokens-preview-page.component.ts
var _forTrack0 = ($index, $item) => $item.name;
function TokensPreviewPageComponent_For_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 3);
    \u0275\u0275element(1, "div", 8);
    \u0275\u0275elementStart(2, "span");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const color_r1 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275styleProp("background", color_r1.var);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(color_r1.name);
  }
}
function TokensPreviewPageComponent_For_19_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "div", 9);
  }
  if (rf & 2) {
    const space_r2 = ctx.$implicit;
    \u0275\u0275styleProp("width", space_r2)("height", space_r2);
  }
}
var TokensPreviewPageComponent = class _TokensPreviewPageComponent {
  colors = [
    { name: "Primary", var: "var(--color-primary)" },
    { name: "Accent", var: "var(--color-accent)" },
    { name: "Surface", var: "var(--color-surface)" },
    { name: "Border", var: "var(--color-border)" },
    { name: "Danger", var: "var(--color-danger)" }
  ];
  spaces = [
    "var(--space-xs)",
    "var(--space-sm)",
    "var(--space-md)",
    "var(--space-lg)",
    "var(--space-xl)"
  ];
  static \u0275fac = function TokensPreviewPageComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _TokensPreviewPageComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _TokensPreviewPageComponent, selectors: [["app-tokens-preview"]], decls: 20, vars: 0, consts: [["title", "Design tokens", "subtitle", "Palette, type, and spacing preview.", "overline", "Dev"], [1, "card", "section"], [1, "swatches"], [1, "swatch"], [1, "display"], [1, "body"], [1, "spacing-row"], [1, "space-block", 3, "width", "height"], [1, "swatch-color"], [1, "space-block"]], template: function TokensPreviewPageComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275element(0, "app-page-header", 0);
      \u0275\u0275elementStart(1, "section", 1)(2, "h2");
      \u0275\u0275text(3, "Colors");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(4, "div", 2);
      \u0275\u0275repeaterCreate(5, TokensPreviewPageComponent_For_6_Template, 4, 3, "div", 3, _forTrack0);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(7, "section", 1)(8, "h2");
      \u0275\u0275text(9, "Typography");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(10, "p", 4);
      \u0275\u0275text(11, "Fraunces display \u2014 Game Night");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(12, "p", 5);
      \u0275\u0275text(13, "Nunito body \u2014 Track plays, rank favorites, host events.");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(14, "section", 1)(15, "h2");
      \u0275\u0275text(16, "Spacing");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(17, "div", 6);
      \u0275\u0275repeaterCreate(18, TokensPreviewPageComponent_For_19_Template, 1, 4, "div", 7, \u0275\u0275repeaterTrackByIdentity);
      \u0275\u0275elementEnd()();
    }
    if (rf & 2) {
      \u0275\u0275advance(5);
      \u0275\u0275repeater(ctx.colors);
      \u0275\u0275advance(13);
      \u0275\u0275repeater(ctx.spaces);
    }
  }, dependencies: [PageHeaderComponent], styles: ['\n.section[_ngcontent-%COMP%] {\n  padding: var(--space-xl);\n  margin-bottom: var(--space-lg);\n}\n.section[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  margin-top: 0;\n  font-family: "Fraunces", serif;\n}\n.swatches[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  gap: var(--space-md);\n}\n.swatch[_ngcontent-%COMP%] {\n  text-align: center;\n  font-size: 0.75rem;\n  font-weight: 600;\n}\n.swatch-color[_ngcontent-%COMP%] {\n  width: 64px;\n  height: 64px;\n  border-radius: var(--radius-md);\n  margin-bottom: var(--space-xs);\n  border: 1px solid var(--color-border);\n}\n.display[_ngcontent-%COMP%] {\n  font-family: "Fraunces", serif;\n  font-size: 2rem;\n  font-weight: 700;\n}\n.body[_ngcontent-%COMP%] {\n  font-size: 1rem;\n  color: var(--color-text-secondary);\n}\n.spacing-row[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: flex-end;\n  gap: var(--space-sm);\n}\n.space-block[_ngcontent-%COMP%] {\n  background: var(--color-primary-soft);\n  border-radius: var(--radius-sm);\n}\n/*# sourceMappingURL=tokens-preview-page.component.css.map */'], changeDetection: 0 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(TokensPreviewPageComponent, [{
    type: Component,
    args: [{ selector: "app-tokens-preview", changeDetection: ChangeDetectionStrategy.OnPush, imports: [PageHeaderComponent], template: `
    <app-page-header title="Design tokens" subtitle="Palette, type, and spacing preview." overline="Dev" />

    <section class="card section">
      <h2>Colors</h2>
      <div class="swatches">
        @for (color of colors; track color.name) {
          <div class="swatch">
            <div class="swatch-color" [style.background]="color.var"></div>
            <span>{{ color.name }}</span>
          </div>
        }
      </div>
    </section>

    <section class="card section">
      <h2>Typography</h2>
      <p class="display">Fraunces display \u2014 Game Night</p>
      <p class="body">Nunito body \u2014 Track plays, rank favorites, host events.</p>
    </section>

    <section class="card section">
      <h2>Spacing</h2>
      <div class="spacing-row">
        @for (space of spaces; track space) {
          <div class="space-block" [style.width]="space" [style.height]="space"></div>
        }
      </div>
    </section>
  `, styles: ['/* angular:styles/component:scss;bcfbbb64e1cf8b886d265a29bc753f3e3c98842bcd7883eabf22d573c1793802;C:/Users/baseb/OneDrive/Documents/GitHub/boardgame-social-v2/apps/web/src/app/features/dev/tokens-preview-page.component.ts */\n.section {\n  padding: var(--space-xl);\n  margin-bottom: var(--space-lg);\n}\n.section h2 {\n  margin-top: 0;\n  font-family: "Fraunces", serif;\n}\n.swatches {\n  display: flex;\n  flex-wrap: wrap;\n  gap: var(--space-md);\n}\n.swatch {\n  text-align: center;\n  font-size: 0.75rem;\n  font-weight: 600;\n}\n.swatch-color {\n  width: 64px;\n  height: 64px;\n  border-radius: var(--radius-md);\n  margin-bottom: var(--space-xs);\n  border: 1px solid var(--color-border);\n}\n.display {\n  font-family: "Fraunces", serif;\n  font-size: 2rem;\n  font-weight: 700;\n}\n.body {\n  font-size: 1rem;\n  color: var(--color-text-secondary);\n}\n.spacing-row {\n  display: flex;\n  align-items: flex-end;\n  gap: var(--space-sm);\n}\n.space-block {\n  background: var(--color-primary-soft);\n  border-radius: var(--radius-sm);\n}\n/*# sourceMappingURL=tokens-preview-page.component.css.map */\n'] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(TokensPreviewPageComponent, { className: "TokensPreviewPageComponent", filePath: "apps/web/src/app/features/dev/tokens-preview-page.component.ts", lineNumber: 49 });
})();
export {
  TokensPreviewPageComponent
};
//# sourceMappingURL=chunk-BCMLQV7U.js.map
