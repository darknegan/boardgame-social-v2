import {
  Injectable,
  setClassMetadata,
  signal,
  ɵɵdefineInjectable
} from "./chunk-B6IJ3W3N.js";

// apps/web/src/app/core/toast/toast.service.ts
var ToastService = class _ToastService {
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
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ToastService, [{
    type: Injectable,
    args: [{ providedIn: "root" }]
  }], null, null);
})();

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
  ToastService,
  ThemeService
};
//# sourceMappingURL=chunk-EOI6FRHZ.js.map
