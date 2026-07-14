import {
  SupabaseService,
  environment
} from "./chunk-ESOBHDPQ.js";
import {
  Router
} from "./chunk-3YWMTBPO.js";
import {
  Injectable,
  computed,
  inject,
  setClassMetadata,
  signal,
  ɵɵdefineInjectable
} from "./chunk-B6IJ3W3N.js";

// apps/web/src/app/core/auth/auth.service.ts
var AuthService = class _AuthService {
  supabase = inject(SupabaseService, { optional: true })?.supabase;
  router = inject(Router);
  _session = signal(null, ...ngDevMode ? [{ debugName: "_session" }] : (
    /* istanbul ignore next */
    []
  ));
  _profile = signal(null, ...ngDevMode ? [{ debugName: "_profile" }] : (
    /* istanbul ignore next */
    []
  ));
  _loading = signal(true, ...ngDevMode ? [{ debugName: "_loading" }] : (
    /* istanbul ignore next */
    []
  ));
  _readyResolve = null;
  _ready = new Promise((resolve) => {
    this._readyResolve = resolve;
  });
  session = this._session.asReadonly();
  profile = this._profile.asReadonly();
  loading = this._loading.asReadonly();
  user = computed(() => this._session()?.user ?? null, ...ngDevMode ? [{ debugName: "user" }] : (
    /* istanbul ignore next */
    []
  ));
  devBypass = computed(() => environment.devPreview && !environment.supabaseUrl, ...ngDevMode ? [{ debugName: "devBypass" }] : (
    /* istanbul ignore next */
    []
  ));
  isAuthenticated = computed(() => this.devBypass() || !!this._session(), ...ngDevMode ? [{ debugName: "isAuthenticated" }] : (
    /* istanbul ignore next */
    []
  ));
  hasProfile = computed(() => this.devBypass() || !!this._profile()?.username, ...ngDevMode ? [{ debugName: "hasProfile" }] : (
    /* istanbul ignore next */
    []
  ));
  waitUntilReady() {
    if (!this._loading())
      return Promise.resolve();
    return this._ready;
  }
  async init() {
    if (!this.supabase) {
      this._loading.set(false);
      this._readyResolve?.();
      return;
    }
    const { data } = await this.supabase.auth.getSession();
    this._session.set(data.session);
    if (data.session?.user) {
      await this.loadProfile(data.session.user.id);
    }
    this._loading.set(false);
    this._readyResolve?.();
    this.supabase.auth.onAuthStateChange(async (_event, session) => {
      this._session.set(session);
      if (session?.user) {
        await this.loadProfile(session.user.id);
      } else {
        this._profile.set(null);
      }
    });
  }
  async signIn(email, password) {
    if (!this.supabase)
      throw new Error("Supabase is not configured");
    const { error } = await this.supabase.auth.signInWithPassword({ email, password });
    if (error)
      throw error;
  }
  async signUp(email, password) {
    if (!this.supabase)
      throw new Error("Supabase is not configured");
    const { error } = await this.supabase.auth.signUp({ email, password });
    if (error)
      throw error;
  }
  async signOut() {
    if (this.supabase)
      await this.supabase.auth.signOut();
    this._profile.set(null);
    await this.router.navigate(["/login"]);
  }
  async resetPassword(email) {
    if (!this.supabase)
      throw new Error("Supabase is not configured");
    const redirectTo = `${window.location.origin}/reset-password`;
    const { error } = await this.supabase.auth.resetPasswordForEmail(email, {
      redirectTo
    });
    if (error)
      throw error;
  }
  async updatePassword(password) {
    if (!this.supabase)
      throw new Error("Supabase is not configured");
    const { error } = await this.supabase.auth.updateUser({ password });
    if (error)
      throw error;
  }
  async updateProfile(updates) {
    const userId = this.user()?.id;
    if (!userId || !this.supabase)
      throw new Error("Not authenticated");
    const { error } = await this.supabase.from("profiles").update(updates).eq("id", userId);
    if (error)
      throw error;
    await this.loadProfile(userId);
  }
  async uploadAvatar(file) {
    const userId = this.user()?.id;
    if (!userId || !this.supabase)
      throw new Error("Not authenticated");
    const ext = file.name.split(".").pop() ?? "jpg";
    const path = `${userId}/avatar.${ext}`;
    const { error: uploadError } = await this.supabase.storage.from("avatars").upload(path, file, { upsert: true });
    if (uploadError)
      throw uploadError;
    const { data } = this.supabase.storage.from("avatars").getPublicUrl(path);
    await this.updateProfile({ profile_picture_url: data.publicUrl });
    return data.publicUrl;
  }
  async loadProfile(userId) {
    if (!this.supabase)
      return;
    const { data, error } = await this.supabase.from("profiles").select("*").eq("id", userId).maybeSingle();
    if (!error && data) {
      this._profile.set(data);
    }
  }
  async getProfileByUsername(username) {
    if (!this.supabase)
      return null;
    const { data, error } = await this.supabase.from("profiles").select("*").eq("username", username).maybeSingle();
    if (error || !data)
      return null;
    return data;
  }
  getAccessToken() {
    return this._session()?.access_token ?? null;
  }
  static \u0275fac = function AuthService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _AuthService)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _AuthService, factory: _AuthService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AuthService, [{
    type: Injectable,
    args: [{ providedIn: "root" }]
  }], null, null);
})();

export {
  AuthService
};
//# sourceMappingURL=chunk-QR2D7B5O.js.map
