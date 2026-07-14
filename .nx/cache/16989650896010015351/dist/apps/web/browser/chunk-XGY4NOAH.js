import {
  HttpClient
} from "./chunk-XKHOIK35.js";
import {
  Injectable,
  inject,
  setClassMetadata,
  ɵɵdefineInjectable
} from "./chunk-B6IJ3W3N.js";

// apps/web/src/app/core/api/games-api.service.ts
var GamesApiService = class _GamesApiService {
  http = inject(HttpClient);
  getAll(limit = 24, offset = 0) {
    return this.http.get("games", { params: { limit, offset } });
  }
  search(name) {
    return this.http.get("games/search", { params: { name } });
  }
  getInfo(gameId) {
    return this.http.get("games/info", { params: { gameId } });
  }
  getBggDetails(bggGameId) {
    return this.http.get("games/bggGameDetails", { params: { bggGameId } });
  }
  static \u0275fac = function GamesApiService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _GamesApiService)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _GamesApiService, factory: _GamesApiService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(GamesApiService, [{
    type: Injectable,
    args: [{ providedIn: "root" }]
  }], null, null);
})();

export {
  GamesApiService
};
//# sourceMappingURL=chunk-XGY4NOAH.js.map
