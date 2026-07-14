import {
  HttpClient
} from "./chunk-XKHOIK35.js";
import {
  Injectable,
  inject,
  setClassMetadata,
  ɵɵdefineInjectable
} from "./chunk-B6IJ3W3N.js";

// apps/web/src/app/core/api/social-api.service.ts
var SocialApiService = class _SocialApiService {
  http = inject(HttpClient);
  getFeed() {
    return this.http.get("social/feed");
  }
  createPost(dto) {
    return this.http.post("social/posts", dto);
  }
  likePost(postId) {
    return this.http.post(`social/posts/${postId}/like`, {});
  }
  commentOnPost(postId, dto) {
    return this.http.post(`social/posts/${postId}/comments`, dto);
  }
  getFriends() {
    return this.http.get("social/friends");
  }
  sendFriendRequest(dto) {
    return this.http.post("social/friends/requests", dto);
  }
  acceptFriendRequest(requestId) {
    return this.http.post(`social/friends/requests/${requestId}/accept`, {});
  }
  static \u0275fac = function SocialApiService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _SocialApiService)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _SocialApiService, factory: _SocialApiService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(SocialApiService, [{
    type: Injectable,
    args: [{ providedIn: "root" }]
  }], null, null);
})();

export {
  SocialApiService
};
//# sourceMappingURL=chunk-HPCL2HOE.js.map
