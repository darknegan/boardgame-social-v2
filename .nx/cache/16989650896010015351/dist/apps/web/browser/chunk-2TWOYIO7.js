import {
  HttpClient
} from "./chunk-XKHOIK35.js";
import {
  Injectable,
  inject,
  setClassMetadata,
  ɵɵdefineInjectable
} from "./chunk-B6IJ3W3N.js";

// apps/web/src/app/core/api/collections-api.service.ts
var CollectionsApiService = class _CollectionsApiService {
  http = inject(HttpClient);
  getCollection() {
    return this.http.get("collections");
  }
  getPreview(limit = 12) {
    return this.http.get("collections/preview", { params: { limit } });
  }
  importFromBgg(username) {
    return this.http.post("collections/import", { username });
  }
  static \u0275fac = function CollectionsApiService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _CollectionsApiService)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _CollectionsApiService, factory: _CollectionsApiService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CollectionsApiService, [{
    type: Injectable,
    args: [{ providedIn: "root" }]
  }], null, null);
})();

export {
  CollectionsApiService
};
//# sourceMappingURL=chunk-2TWOYIO7.js.map
