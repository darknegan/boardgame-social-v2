import {
  Injectable,
  setClassMetadata,
  signal,
  ɵɵdefineInjectable
} from "./chunk-B6IJ3W3N.js";

// apps/web/src/app/core/theme/theme.service.ts
var ThemeService = class _ThemeService {
  storageKey = "bgs-theme";
  _theme = signal(this.readStoredTheme(), ...ngDevMode ? [{ debugName: "_theme" }] : (
    /* istanbul ignore next */
    []
  ));
  theme = this._theme.asReadonly();
  constructor() {
    this.apply(this._theme());
  }
  toggle() {
    const next = this._theme() === "light" ? "dark" : "light";
    this._theme.set(next);
    this.apply(next);
    localStorage.setItem(this.storageKey, next);
  }
  apply(theme) {
    document.documentElement.setAttribute("data-theme", theme);
  }
  readStoredTheme() {
    const stored = localStorage.getItem(this.storageKey);
    return stored === "dark" ? "dark" : "light";
  }
  static \u0275fac = function ThemeService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ThemeService)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _ThemeService, factory: _ThemeService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ThemeService, [{
    type: Injectable,
    args: [{ providedIn: "root" }]
  }], () => [], null);
})();

export {
  ThemeService
};
//# sourceMappingURL=chunk-M2PROZ2H.js.map
