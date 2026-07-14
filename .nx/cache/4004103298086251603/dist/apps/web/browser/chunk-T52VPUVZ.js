import {
  DefaultValueAccessor,
  FormBuilder,
  FormControlName,
  FormGroupDirective,
  NgControlStatus,
  NgControlStatusGroup,
  ReactiveFormsModule,
  Validators,
  ɵNgNoValidate
} from "./chunk-RUD23VHN.js";
import {
  ToastService
} from "./chunk-FNB3VBA5.js";
import {
  AuthService
} from "./chunk-QR2D7B5O.js";
import {
  SupabaseService
} from "./chunk-ESOBHDPQ.js";
import {
  Router
} from "./chunk-3YWMTBPO.js";
import {
  PageHeaderComponent
} from "./chunk-5ISH4G2G.js";
import "./chunk-G3THX2OW.js";
import "./chunk-XKHOIK35.js";
import {
  ChangeDetectionStrategy,
  Component,
  Injectable,
  inject,
  setClassMetadata,
  signal,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵdefineComponent,
  ɵɵdefineInjectable,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵsanitizeUrl,
  ɵɵtext,
  ɵɵtextInterpolate
} from "./chunk-B6IJ3W3N.js";

// apps/web/src/app/core/supabase/avatar-storage.service.ts
var AVATAR_BUCKET = "avatars";
var MAX_AVATAR_BYTES = 2 * 1024 * 1024;
var ALLOWED_TYPES = /* @__PURE__ */ new Set(["image/jpeg", "image/png", "image/webp", "image/gif"]);
var AvatarStorageService = class _AvatarStorageService {
  supabase = inject(SupabaseService, { optional: true })?.supabase;
  validateAvatarFile(file) {
    if (!ALLOWED_TYPES.has(file.type)) {
      return "Please choose a JPEG, PNG, WebP, or GIF image.";
    }
    if (file.size > MAX_AVATAR_BYTES) {
      return "Image must be 2 MB or smaller.";
    }
    return null;
  }
  async uploadAvatar(userId, file) {
    if (!this.supabase)
      throw new Error("Supabase is not configured");
    const validationError = this.validateAvatarFile(file);
    if (validationError)
      throw new Error(validationError);
    const ext = file.name.split(".").pop()?.toLowerCase() ?? "jpg";
    const path = `${userId}/avatar.${ext}`;
    const { error } = await this.supabase.storage.from(AVATAR_BUCKET).upload(path, file, { upsert: true, contentType: file.type });
    if (error)
      throw error;
    const { data } = this.supabase.storage.from(AVATAR_BUCKET).getPublicUrl(path);
    return `${data.publicUrl}?t=${Date.now()}`;
  }
  async removeAvatar(userId) {
    if (!this.supabase)
      throw new Error("Supabase is not configured");
    const { data, error: listError } = await this.supabase.storage.from(AVATAR_BUCKET).list(userId);
    if (listError)
      throw listError;
    if (!data?.length)
      return;
    const paths = data.map((item) => `${userId}/${item.name}`);
    const { error } = await this.supabase.storage.from(AVATAR_BUCKET).remove(paths);
    if (error)
      throw error;
  }
  static \u0275fac = function AvatarStorageService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _AvatarStorageService)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _AvatarStorageService, factory: _AvatarStorageService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AvatarStorageService, [{
    type: Injectable,
    args: [{ providedIn: "root" }]
  }], null, null);
})();

// apps/web/src/app/features/profile/profile-edit-page.component.ts
function ProfileEditPageComponent_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "img", 4);
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275property("src", ctx_r0.avatarPreview(), \u0275\u0275sanitizeUrl);
  }
}
function ProfileEditPageComponent_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.initials());
  }
}
function ProfileEditPageComponent_Conditional_21_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 11);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.error());
  }
}
var USERNAME_PATTERN = /^[a-zA-Z0-9_]{3,20}$/;
var ProfileEditPageComponent = class _ProfileEditPageComponent {
  auth = inject(AuthService);
  avatarStorage = inject(AvatarStorageService);
  router = inject(Router);
  toast = inject(ToastService);
  fb = inject(FormBuilder);
  error = signal("", ...ngDevMode ? [{ debugName: "error" }] : (
    /* istanbul ignore next */
    []
  ));
  submitting = signal(false, ...ngDevMode ? [{ debugName: "submitting" }] : (
    /* istanbul ignore next */
    []
  ));
  avatarPreview = signal(this.auth.profile()?.profile_picture_url ?? null, ...ngDevMode ? [{ debugName: "avatarPreview" }] : (
    /* istanbul ignore next */
    []
  ));
  avatarFile = null;
  form = this.fb.nonNullable.group({
    username: [
      this.auth.profile()?.username ?? "",
      [Validators.required, Validators.pattern(USERNAME_PATTERN)]
    ],
    display_name: [this.auth.profile()?.display_name ?? ""],
    bgg_username: [this.auth.profile()?.bgg_username ?? ""]
  });
  initials() {
    const name = this.form.controls.display_name.value || this.form.controls.username.value || "?";
    return name.split(" ").map((p) => p[0]).join("").slice(0, 2).toUpperCase();
  }
  onAvatarSelected(event) {
    const input = event.target;
    const file = input.files?.[0];
    if (!file)
      return;
    const validationError = this.avatarStorage.validateAvatarFile(file);
    if (validationError) {
      this.error.set(validationError);
      return;
    }
    this.avatarFile = file;
    this.avatarPreview.set(URL.createObjectURL(file));
  }
  cancel() {
    this.router.navigate(["/profile"]);
  }
  async onSubmit() {
    if (this.form.invalid)
      return;
    const userId = this.auth.user()?.id;
    if (!userId)
      return;
    this.submitting.set(true);
    this.error.set("");
    try {
      const { username, display_name, bgg_username } = this.form.getRawValue();
      const updates = { username };
      if (display_name.trim())
        updates["display_name"] = display_name.trim();
      if (bgg_username.trim())
        updates["bgg_username"] = bgg_username.trim();
      if (this.avatarFile) {
        updates["profile_picture_url"] = await this.avatarStorage.uploadAvatar(userId, this.avatarFile);
      }
      await this.auth.updateProfile(updates);
      this.toast.success("Profile updated");
      await this.router.navigate(["/profile"]);
    } catch (e) {
      this.error.set(e instanceof Error ? e.message : "Could not save profile");
    } finally {
      this.submitting.set(false);
    }
  }
  static \u0275fac = function ProfileEditPageComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ProfileEditPageComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ProfileEditPageComponent, selectors: [["app-profile-edit-page"]], decls: 27, vars: 4, consts: [["title", "Edit profile", "subtitle", "Update how you appear to other players.", "overline", "Settings"], [1, "card", "form", 3, "ngSubmit", "formGroup"], [1, "avatar-row"], ["aria-hidden", "true", 1, "avatar-preview"], ["alt", "", 3, "src"], [1, "avatar-upload", "btn", "btn-secondary"], ["type", "file", "accept", "image/jpeg,image/png,image/webp,image/gif", "hidden", "", 3, "change"], [1, "field"], ["type", "text", "formControlName", "username", "autocomplete", "username", 1, "input"], ["type", "text", "formControlName", "display_name", "autocomplete", "name", 1, "input"], ["type", "text", "formControlName", "bgg_username", "placeholder", "BoardGameGeek username", 1, "input"], ["role", "alert", 1, "error"], [1, "actions"], ["type", "button", 1, "btn", "btn-secondary", 3, "click"], ["type", "submit", 1, "btn", "btn-primary", 3, "disabled"]], template: function ProfileEditPageComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275element(0, "app-page-header", 0);
      \u0275\u0275elementStart(1, "form", 1);
      \u0275\u0275listener("ngSubmit", function ProfileEditPageComponent_Template_form_ngSubmit_1_listener() {
        return ctx.onSubmit();
      });
      \u0275\u0275elementStart(2, "div", 2)(3, "div", 3);
      \u0275\u0275conditionalCreate(4, ProfileEditPageComponent_Conditional_4_Template, 1, 1, "img", 4)(5, ProfileEditPageComponent_Conditional_5_Template, 2, 1, "span");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(6, "label", 5);
      \u0275\u0275text(7, " Change photo ");
      \u0275\u0275elementStart(8, "input", 6);
      \u0275\u0275listener("change", function ProfileEditPageComponent_Template_input_change_8_listener($event) {
        return ctx.onAvatarSelected($event);
      });
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(9, "label", 7)(10, "span");
      \u0275\u0275text(11, "Username");
      \u0275\u0275elementEnd();
      \u0275\u0275element(12, "input", 8);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(13, "label", 7)(14, "span");
      \u0275\u0275text(15, "Display name");
      \u0275\u0275elementEnd();
      \u0275\u0275element(16, "input", 9);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(17, "label", 7)(18, "span");
      \u0275\u0275text(19, "BGG username");
      \u0275\u0275elementEnd();
      \u0275\u0275element(20, "input", 10);
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(21, ProfileEditPageComponent_Conditional_21_Template, 2, 1, "p", 11);
      \u0275\u0275elementStart(22, "div", 12)(23, "button", 13);
      \u0275\u0275listener("click", function ProfileEditPageComponent_Template_button_click_23_listener() {
        return ctx.cancel();
      });
      \u0275\u0275text(24, "Cancel");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(25, "button", 14);
      \u0275\u0275text(26, " Save changes ");
      \u0275\u0275elementEnd()()();
    }
    if (rf & 2) {
      \u0275\u0275advance();
      \u0275\u0275property("formGroup", ctx.form);
      \u0275\u0275advance(3);
      \u0275\u0275conditional(ctx.avatarPreview() ? 4 : 5);
      \u0275\u0275advance(17);
      \u0275\u0275conditional(ctx.error() ? 21 : -1);
      \u0275\u0275advance(4);
      \u0275\u0275property("disabled", ctx.form.invalid || ctx.submitting());
    }
  }, dependencies: [PageHeaderComponent, ReactiveFormsModule, \u0275NgNoValidate, DefaultValueAccessor, NgControlStatus, NgControlStatusGroup, FormGroupDirective, FormControlName], styles: ["\n.form[_ngcontent-%COMP%] {\n  max-width: 480px;\n  padding: var(--space-xl);\n}\n.avatar-row[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: var(--space-lg);\n  margin-bottom: var(--space-xl);\n}\n.avatar-preview[_ngcontent-%COMP%] {\n  width: 72px;\n  height: 72px;\n  border-radius: var(--radius-full);\n  background:\n    linear-gradient(\n      135deg,\n      var(--color-grad-start),\n      var(--color-grad-end));\n  color: white;\n  display: grid;\n  place-items: center;\n  font-weight: 700;\n  overflow: hidden;\n}\n.avatar-preview[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n}\n.avatar-upload[_ngcontent-%COMP%] {\n  cursor: pointer;\n}\n.field[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: var(--space-xs);\n  margin-bottom: var(--space-lg);\n  font-size: 0.875rem;\n  font-weight: 600;\n  color: var(--color-text-secondary);\n}\n.actions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: var(--space-md);\n  justify-content: flex-end;\n}\n.error[_ngcontent-%COMP%] {\n  color: var(--color-danger);\n  font-size: 0.875rem;\n}\n/*# sourceMappingURL=profile-edit-page.component.css.map */"], changeDetection: 0 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ProfileEditPageComponent, [{
    type: Component,
    args: [{ selector: "app-profile-edit-page", changeDetection: ChangeDetectionStrategy.OnPush, imports: [PageHeaderComponent, ReactiveFormsModule], template: `
    <app-page-header
      title="Edit profile"
      subtitle="Update how you appear to other players."
      overline="Settings"
    />

    <form class="card form" [formGroup]="form" (ngSubmit)="onSubmit()">
      <div class="avatar-row">
        <div class="avatar-preview" aria-hidden="true">
          @if (avatarPreview()) {
            <img [src]="avatarPreview()" alt="" />
          } @else {
            <span>{{ initials() }}</span>
          }
        </div>
        <label class="avatar-upload btn btn-secondary">
          Change photo
          <input
            type="file"
            accept="image/jpeg,image/png,image/webp,image/gif"
            (change)="onAvatarSelected($event)"
            hidden
          />
        </label>
      </div>

      <label class="field">
        <span>Username</span>
        <input class="input" type="text" formControlName="username" autocomplete="username" />
      </label>

      <label class="field">
        <span>Display name</span>
        <input class="input" type="text" formControlName="display_name" autocomplete="name" />
      </label>

      <label class="field">
        <span>BGG username</span>
        <input class="input" type="text" formControlName="bgg_username" placeholder="BoardGameGeek username" />
      </label>

      @if (error()) {
        <p class="error" role="alert">{{ error() }}</p>
      }

      <div class="actions">
        <button class="btn btn-secondary" type="button" (click)="cancel()">Cancel</button>
        <button class="btn btn-primary" type="submit" [disabled]="form.invalid || submitting()">
          Save changes
        </button>
      </div>
    </form>
  `, styles: ["/* angular:styles/component:scss;1cbcffb36ecfe24a6648115a29ca8249cf563a517995859beb12461c2e923c94;C:/Users/baseb/OneDrive/Documents/GitHub/boardgame-social-v2/apps/web/src/app/features/profile/profile-edit-page.component.ts */\n.form {\n  max-width: 480px;\n  padding: var(--space-xl);\n}\n.avatar-row {\n  display: flex;\n  align-items: center;\n  gap: var(--space-lg);\n  margin-bottom: var(--space-xl);\n}\n.avatar-preview {\n  width: 72px;\n  height: 72px;\n  border-radius: var(--radius-full);\n  background:\n    linear-gradient(\n      135deg,\n      var(--color-grad-start),\n      var(--color-grad-end));\n  color: white;\n  display: grid;\n  place-items: center;\n  font-weight: 700;\n  overflow: hidden;\n}\n.avatar-preview img {\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n}\n.avatar-upload {\n  cursor: pointer;\n}\n.field {\n  display: flex;\n  flex-direction: column;\n  gap: var(--space-xs);\n  margin-bottom: var(--space-lg);\n  font-size: 0.875rem;\n  font-weight: 600;\n  color: var(--color-text-secondary);\n}\n.actions {\n  display: flex;\n  gap: var(--space-md);\n  justify-content: flex-end;\n}\n.error {\n  color: var(--color-danger);\n  font-size: 0.875rem;\n}\n/*# sourceMappingURL=profile-edit-page.component.css.map */\n"] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ProfileEditPageComponent, { className: "ProfileEditPageComponent", filePath: "apps/web/src/app/features/profile/profile-edit-page.component.ts", lineNumber: 126 });
})();
export {
  ProfileEditPageComponent
};
//# sourceMappingURL=chunk-T52VPUVZ.js.map
