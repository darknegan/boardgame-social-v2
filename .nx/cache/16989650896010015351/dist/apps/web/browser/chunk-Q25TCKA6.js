import {
  ThemeService,
  ToastService
} from "./chunk-EOI6FRHZ.js";
import {
  SocialApiService
} from "./chunk-R5BZDD44.js";
import {
  DefaultValueAccessor,
  FormBuilder,
  FormControlName,
  FormGroupDirective,
  NgControlStatus,
  NgControlStatusGroup,
  ReactiveFormsModule,
  ɵNgNoValidate
} from "./chunk-RUD23VHN.js";
import {
  AuthService
} from "./chunk-QR2D7B5O.js";
import "./chunk-ESOBHDPQ.js";
import {
  RouterLink
} from "./chunk-3YWMTBPO.js";
import {
  PageHeaderComponent
} from "./chunk-5ISH4G2G.js";
import "./chunk-G3THX2OW.js";
import "./chunk-XKHOIK35.js";
import {
  ChangeDetectionStrategy,
  Component,
  __spreadProps,
  __spreadValues,
  inject,
  setClassMetadata,
  signal,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵdefineComponent,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1
} from "./chunk-B6IJ3W3N.js";

// apps/web/src/app/features/settings/settings-page.component.ts
var _forTrack0 = ($index, $item) => $item.id;
function SettingsPageComponent_Conditional_29_For_2_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 14);
    \u0275\u0275listener("click", function SettingsPageComponent_Conditional_29_For_2_Conditional_5_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r1);
      const friend_r2 = \u0275\u0275nextContext().$implicit;
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.accept(friend_r2.id));
    });
    \u0275\u0275text(1, " Accept ");
    \u0275\u0275elementEnd();
  }
}
function SettingsPageComponent_Conditional_29_For_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "li", 11)(1, "span");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 12);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(5, SettingsPageComponent_Conditional_29_For_2_Conditional_5_Template, 2, 0, "button", 13);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const friend_r2 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(friend_r2.display_name ?? friend_r2.username);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(friend_r2.status);
    \u0275\u0275advance();
    \u0275\u0275conditional(friend_r2.status === "pending" && ctx_r2.isIncoming(friend_r2) ? 5 : -1);
  }
}
function SettingsPageComponent_Conditional_29_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "ul", 10);
    \u0275\u0275repeaterCreate(1, SettingsPageComponent_Conditional_29_For_2_Template, 6, 3, "li", 11, _forTrack0);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r2.friends());
  }
}
function SettingsPageComponent_Conditional_30_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 2);
    \u0275\u0275text(1, "No friends yet. Send a request above.");
    \u0275\u0275elementEnd();
  }
}
var SettingsPageComponent = class _SettingsPageComponent {
  theme = inject(ThemeService);
  auth = inject(AuthService);
  social = inject(SocialApiService);
  toast = inject(ToastService);
  fb = inject(FormBuilder);
  notifications = signal(false, ...ngDevMode ? [{ debugName: "notifications" }] : (
    /* istanbul ignore next */
    []
  ));
  requesting = signal(false, ...ngDevMode ? [{ debugName: "requesting" }] : (
    /* istanbul ignore next */
    []
  ));
  friends = signal([], ...ngDevMode ? [{ debugName: "friends" }] : (
    /* istanbul ignore next */
    []
  ));
  friendForm = this.fb.group({ username: [""] });
  email() {
    return this.auth.user()?.email ?? "unknown";
  }
  ngOnInit() {
    this.social.getFriends().subscribe({
      next: (f) => this.friends.set(f)
    });
  }
  toggleNotifications() {
    this.notifications.update((v) => !v);
    this.toast.success("Notification preference saved");
  }
  sendRequest() {
    const username = this.friendForm.value.username?.trim();
    if (!username)
      return;
    this.requesting.set(true);
    this.social.sendFriendRequest(username).subscribe({
      next: (friend) => {
        this.friends.update((list) => [...list, friend]);
        this.friendForm.reset();
        this.toast.success("Friend request sent");
        this.requesting.set(false);
      },
      error: () => this.requesting.set(false)
    });
  }
  accept(requestId) {
    this.social.acceptFriendRequest(requestId).subscribe({
      next: (friend) => {
        this.friends.update((list) => list.map((f) => f.id === requestId ? __spreadProps(__spreadValues({}, f), { status: "accepted" }) : f));
        this.toast.success("Friend request accepted");
      }
    });
  }
  isIncoming(friend) {
    return friend.friend_id === this.auth.user()?.id;
  }
  static \u0275fac = function SettingsPageComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _SettingsPageComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _SettingsPageComponent, selectors: [["app-settings-page"]], decls: 31, vars: 7, consts: [["title", "Settings", "subtitle", "Account, notifications, and appearance.", "overline", "Preferences"], [1, "card", "section"], [1, "meta"], ["routerLink", "/profile/edit", 1, "btn", "btn-secondary"], ["type", "button", 1, "btn", "btn-secondary", 3, "click"], [1, "toggle"], ["type", "checkbox", 3, "change", "checked"], [1, "friend-form", 3, "ngSubmit", "formGroup"], ["type", "text", "formControlName", "username", "placeholder", "Add friend by username", 1, "input"], ["type", "submit", 1, "btn", "btn-primary", 3, "disabled"], [1, "friend-list"], [1, "friend-item"], [1, "status"], ["type", "button", 1, "btn", "btn-secondary", "btn-sm"], ["type", "button", 1, "btn", "btn-secondary", "btn-sm", 3, "click"]], template: function SettingsPageComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275element(0, "app-page-header", 0);
      \u0275\u0275elementStart(1, "section", 1)(2, "h2");
      \u0275\u0275text(3, "Account");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(4, "p", 2);
      \u0275\u0275text(5);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(6, "a", 3);
      \u0275\u0275text(7, "Edit profile");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(8, "section", 1)(9, "h2");
      \u0275\u0275text(10, "Appearance");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(11, "p", 2);
      \u0275\u0275text(12);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(13, "button", 4);
      \u0275\u0275listener("click", function SettingsPageComponent_Template_button_click_13_listener() {
        return ctx.theme.toggle();
      });
      \u0275\u0275text(14);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(15, "section", 1)(16, "h2");
      \u0275\u0275text(17, "Notifications");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(18, "label", 5)(19, "input", 6);
      \u0275\u0275listener("change", function SettingsPageComponent_Template_input_change_19_listener() {
        return ctx.toggleNotifications();
      });
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(20, "span");
      \u0275\u0275text(21, "Email notifications (coming soon)");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(22, "section", 1)(23, "h2");
      \u0275\u0275text(24, "Friends");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(25, "form", 7);
      \u0275\u0275listener("ngSubmit", function SettingsPageComponent_Template_form_ngSubmit_25_listener() {
        return ctx.sendRequest();
      });
      \u0275\u0275element(26, "input", 8);
      \u0275\u0275elementStart(27, "button", 9);
      \u0275\u0275text(28, " Send request ");
      \u0275\u0275elementEnd()();
      \u0275\u0275conditionalCreate(29, SettingsPageComponent_Conditional_29_Template, 3, 0, "ul", 10)(30, SettingsPageComponent_Conditional_30_Template, 2, 0, "p", 2);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      \u0275\u0275advance(5);
      \u0275\u0275textInterpolate1("Signed in as ", ctx.email());
      \u0275\u0275advance(7);
      \u0275\u0275textInterpolate1("Current theme: ", ctx.theme.theme());
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate1(" Switch to ", ctx.theme.theme() === "light" ? "dark" : "light", " mode ");
      \u0275\u0275advance(5);
      \u0275\u0275property("checked", ctx.notifications());
      \u0275\u0275advance(6);
      \u0275\u0275property("formGroup", ctx.friendForm);
      \u0275\u0275advance(2);
      \u0275\u0275property("disabled", ctx.friendForm.invalid || ctx.requesting());
      \u0275\u0275advance(2);
      \u0275\u0275conditional(ctx.friends().length ? 29 : 30);
    }
  }, dependencies: [PageHeaderComponent, ReactiveFormsModule, \u0275NgNoValidate, DefaultValueAccessor, NgControlStatus, NgControlStatusGroup, FormGroupDirective, FormControlName, RouterLink], styles: ['\n.section[_ngcontent-%COMP%] {\n  padding: var(--space-xl);\n  margin-bottom: var(--space-lg);\n  max-width: 560px;\n}\n.section[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  margin: 0 0 var(--space-md);\n  font-family: "Fraunces", serif;\n  font-size: 1.125rem;\n}\n.meta[_ngcontent-%COMP%] {\n  margin: 0 0 var(--space-lg);\n  color: var(--color-text-secondary);\n  font-size: 0.875rem;\n}\n.toggle[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: var(--space-md);\n  font-weight: 600;\n  color: var(--color-text-secondary);\n}\n.friend-form[_ngcontent-%COMP%] {\n  display: flex;\n  gap: var(--space-md);\n  margin-bottom: var(--space-lg);\n}\n.friend-list[_ngcontent-%COMP%] {\n  list-style: none;\n  margin: 0;\n  padding: 0;\n}\n.friend-item[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: var(--space-md);\n  padding: var(--space-sm) 0;\n  border-bottom: 1px solid var(--color-border);\n  font-weight: 600;\n}\n.status[_ngcontent-%COMP%] {\n  margin-left: auto;\n  font-size: 0.75rem;\n  color: var(--color-text-muted);\n  text-transform: uppercase;\n}\n.btn-sm[_ngcontent-%COMP%] {\n  padding: 0.375rem 0.75rem;\n  font-size: 0.75rem;\n}\n/*# sourceMappingURL=settings-page.component.css.map */'], changeDetection: 0 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(SettingsPageComponent, [{
    type: Component,
    args: [{ selector: "app-settings-page", changeDetection: ChangeDetectionStrategy.OnPush, imports: [PageHeaderComponent, ReactiveFormsModule, RouterLink], template: `
    <app-page-header
      title="Settings"
      subtitle="Account, notifications, and appearance."
      overline="Preferences"
    />

    <section class="card section">
      <h2>Account</h2>
      <p class="meta">Signed in as {{ email() }}</p>
      <a class="btn btn-secondary" routerLink="/profile/edit">Edit profile</a>
    </section>

    <section class="card section">
      <h2>Appearance</h2>
      <p class="meta">Current theme: {{ theme.theme() }}</p>
      <button class="btn btn-secondary" type="button" (click)="theme.toggle()">
        Switch to {{ theme.theme() === 'light' ? 'dark' : 'light' }} mode
      </button>
    </section>

    <section class="card section">
      <h2>Notifications</h2>
      <label class="toggle">
        <input type="checkbox" [checked]="notifications()" (change)="toggleNotifications()" />
        <span>Email notifications (coming soon)</span>
      </label>
    </section>

    <section class="card section">
      <h2>Friends</h2>
      <form class="friend-form" [formGroup]="friendForm" (ngSubmit)="sendRequest()">
        <input class="input" type="text" formControlName="username" placeholder="Add friend by username" />
        <button class="btn btn-primary" type="submit" [disabled]="friendForm.invalid || requesting()">
          Send request
        </button>
      </form>

      @if (friends().length) {
        <ul class="friend-list">
          @for (friend of friends(); track friend.id) {
            <li class="friend-item">
              <span>{{ friend.display_name ?? friend.username }}</span>
              <span class="status">{{ friend.status }}</span>
              @if (friend.status === 'pending' && isIncoming(friend)) {
                <button class="btn btn-secondary btn-sm" type="button" (click)="accept(friend.id)">
                  Accept
                </button>
              }
            </li>
          }
        </ul>
      } @else {
        <p class="meta">No friends yet. Send a request above.</p>
      }
    </section>
  `, styles: ['/* angular:styles/component:scss;fe64eba963bec623f763f88b36e3080c4b0fc24e37d332be53e4d40b76106037;C:/Users/baseb/OneDrive/Documents/GitHub/boardgame-social-v2/apps/web/src/app/features/settings/settings-page.component.ts */\n.section {\n  padding: var(--space-xl);\n  margin-bottom: var(--space-lg);\n  max-width: 560px;\n}\n.section h2 {\n  margin: 0 0 var(--space-md);\n  font-family: "Fraunces", serif;\n  font-size: 1.125rem;\n}\n.meta {\n  margin: 0 0 var(--space-lg);\n  color: var(--color-text-secondary);\n  font-size: 0.875rem;\n}\n.toggle {\n  display: flex;\n  align-items: center;\n  gap: var(--space-md);\n  font-weight: 600;\n  color: var(--color-text-secondary);\n}\n.friend-form {\n  display: flex;\n  gap: var(--space-md);\n  margin-bottom: var(--space-lg);\n}\n.friend-list {\n  list-style: none;\n  margin: 0;\n  padding: 0;\n}\n.friend-item {\n  display: flex;\n  align-items: center;\n  gap: var(--space-md);\n  padding: var(--space-sm) 0;\n  border-bottom: 1px solid var(--color-border);\n  font-weight: 600;\n}\n.status {\n  margin-left: auto;\n  font-size: 0.75rem;\n  color: var(--color-text-muted);\n  text-transform: uppercase;\n}\n.btn-sm {\n  padding: 0.375rem 0.75rem;\n  font-size: 0.75rem;\n}\n/*# sourceMappingURL=settings-page.component.css.map */\n'] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(SettingsPageComponent, { className: "SettingsPageComponent", filePath: "apps/web/src/app/features/settings/settings-page.component.ts", lineNumber: 133 });
})();
export {
  SettingsPageComponent
};
//# sourceMappingURL=chunk-Q25TCKA6.js.map
