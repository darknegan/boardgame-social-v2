import {
  HttpClient
} from "./chunk-XKHOIK35.js";
import {
  Injectable,
  inject,
  setClassMetadata,
  ɵɵdefineInjectable
} from "./chunk-B6IJ3W3N.js";

// apps/web/src/app/core/api/plays-api.service.ts
var PlaysApiService = class _PlaysApiService {
  http = inject(HttpClient);
  listPlays(limit = 20) {
    return this.http.get("plays", { params: { limit } });
  }
  logPlay(play) {
    return this.http.post("plays", play);
  }
  static \u0275fac = function PlaysApiService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _PlaysApiService)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _PlaysApiService, factory: _PlaysApiService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(PlaysApiService, [{
    type: Injectable,
    args: [{ providedIn: "root" }]
  }], null, null);
})();

export {
  PlaysApiService
};
//# sourceMappingURL=chunk-2BHGF5LB.js.map
