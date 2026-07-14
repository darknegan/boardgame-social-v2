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
    return this.http.get("/social/feed");
  }
  createPost(dto) {
    return this.http.post("/social/posts", dto);
  }
  toggleLike(postId) {
    return this.http.post(`/social/posts/${postId}/like`, {});
  }
  /** @deprecated Use toggleLike */
  likePost(postId) {
    return this.toggleLike(postId);
  }
  addComment(postId, body) {
    const dto = { body };
    return this.http.post(`/social/posts/${postId}/comments`, dto);
  }
  /** @deprecated Use addComment(postId, body) */
  commentOnPost(postId, dto) {
    return this.addComment(postId, dto.body);
  }
  getFriends() {
    return this.http.get("/social/friends");
  }
  sendFriendRequest(username) {
    const dto = { username };
    return this.http.post("/social/friends/requests", dto);
  }
  acceptFriendRequest(requestId) {
    return this.http.post(`/social/friends/requests/${requestId}/accept`, {});
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
//# sourceMappingURL=chunk-R5BZDD44.js.map
