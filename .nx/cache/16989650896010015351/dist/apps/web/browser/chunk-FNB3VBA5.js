import {
  Injectable,
  setClassMetadata,
  signal,
  ɵɵdefineInjectable
} from "./chunk-B6IJ3W3N.js";

// apps/web/src/app/shared/components/toast/toast.service.ts
var ToastService = class _ToastService {
  nextId = 0;
  toasts = signal([], ...ngDevMode ? [{ debugName: "toasts" }] : (
    /* istanbul ignore next */
    []
  ));
  show(message, type = "info") {
    const id = ++this.nextId;
    this.toasts.update((list) => [...list, { id, message, type }]);
    setTimeout(() => this.dismiss(id), 5e3);
  }
  error(message) {
    this.show(message, "error");
  }
  success(message) {
    this.show(message, "success");
  }
  dismiss(id) {
    this.toasts.update((list) => list.filter((t) => t.id !== id));
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

export {
  ToastService
};
//# sourceMappingURL=chunk-FNB3VBA5.js.map
