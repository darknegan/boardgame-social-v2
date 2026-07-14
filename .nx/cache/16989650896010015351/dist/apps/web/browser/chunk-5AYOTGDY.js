import {
  PlaysApiService
} from "./chunk-2BHGF5LB.js";
import {
  CheckboxControlValueAccessor,
  DefaultValueAccessor,
  FormBuilder,
  FormControlName,
  FormGroupDirective,
  NgControlStatus,
  NgControlStatusGroup,
  NumberValueAccessor,
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
import "./chunk-ESOBHDPQ.js";
import {
  GamesApiService
} from "./chunk-XGY4NOAH.js";
import {
  EmptyStateComponent,
  SkeletonComponent
} from "./chunk-T3V355ZA.js";
import {
  ActivatedRoute
} from "./chunk-3YWMTBPO.js";
import {
  PageHeaderComponent
} from "./chunk-5ISH4G2G.js";
import "./chunk-G3THX2OW.js";
import "./chunk-XKHOIK35.js";
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  Output,
  inject,
  input,
  output,
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
  ɵɵsanitizeHtml,
  ɵɵsanitizeUrl,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate2
} from "./chunk-B6IJ3W3N.js";

// apps/web/src/app/features/plays/log-play-modal.component.ts
var LogPlayModalComponent = class _LogPlayModalComponent {
  gameId = input.required(...ngDevMode ? [{ debugName: "gameId" }] : (
    /* istanbul ignore next */
    []
  ));
  gameName = input.required(...ngDevMode ? [{ debugName: "gameName" }] : (
    /* istanbul ignore next */
    []
  ));
  closed = output();
  saved = output();
  plays = inject(PlaysApiService);
  auth = inject(AuthService);
  toast = inject(ToastService);
  fb = inject(FormBuilder);
  submitting = signal(false, ...ngDevMode ? [{ debugName: "submitting" }] : (
    /* istanbul ignore next */
    []
  ));
  form = this.fb.nonNullable.group({
    description: [""],
    score: [0, Validators.required],
    winner: [false]
  });
  close() {
    this.closed.emit();
  }
  onSubmit() {
    const userId = this.auth.user()?.id;
    const profile = this.auth.profile();
    if (!userId)
      return;
    this.submitting.set(true);
    const { description, score, winner } = this.form.getRawValue();
    this.plays.logPlay({
      created_by: userId,
      description,
      game: { game_id: this.gameId(), name: this.gameName() },
      location_id: "",
      start_time: (/* @__PURE__ */ new Date()).toISOString(),
      players: [
        {
          name: profile?.display_name ?? profile?.username ?? "You",
          user_id: userId,
          score,
          winner
        }
      ]
    }).subscribe({
      next: () => {
        this.toast.success("Play logged");
        this.saved.emit();
      },
      error: () => this.submitting.set(false),
      complete: () => this.submitting.set(false)
    });
  }
  static \u0275fac = function LogPlayModalComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _LogPlayModalComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _LogPlayModalComponent, selectors: [["app-log-play-modal"]], inputs: { gameId: [1, "gameId"], gameName: [1, "gameName"] }, outputs: { closed: "closed", saved: "saved" }, decls: 24, vars: 3, consts: [["role", "presentation", 1, "backdrop", 3, "click"], ["role", "dialog", "aria-labelledby", "log-play-title", 1, "modal", "card", 3, "click"], ["id", "log-play-title"], [1, "game-name"], [3, "ngSubmit", "formGroup"], [1, "field"], ["formControlName", "description", "rows", "3", "placeholder", "How did it go?", 1, "input"], ["type", "number", "formControlName", "score", 1, "input"], [1, "field", "checkbox"], ["type", "checkbox", "formControlName", "winner"], [1, "actions"], ["type", "button", 1, "btn", "btn-secondary", 3, "click"], ["type", "submit", 1, "btn", "btn-primary", 3, "disabled"]], template: function LogPlayModalComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0);
      \u0275\u0275listener("click", function LogPlayModalComponent_Template_div_click_0_listener() {
        return ctx.close();
      });
      \u0275\u0275elementStart(1, "div", 1);
      \u0275\u0275listener("click", function LogPlayModalComponent_Template_div_click_1_listener($event) {
        return $event.stopPropagation();
      });
      \u0275\u0275elementStart(2, "h2", 2);
      \u0275\u0275text(3, "Log a play");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(4, "p", 3);
      \u0275\u0275text(5);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(6, "form", 4);
      \u0275\u0275listener("ngSubmit", function LogPlayModalComponent_Template_form_ngSubmit_6_listener() {
        return ctx.onSubmit();
      });
      \u0275\u0275elementStart(7, "label", 5)(8, "span");
      \u0275\u0275text(9, "Notes");
      \u0275\u0275elementEnd();
      \u0275\u0275element(10, "textarea", 6);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(11, "label", 5)(12, "span");
      \u0275\u0275text(13, "Your score");
      \u0275\u0275elementEnd();
      \u0275\u0275element(14, "input", 7);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(15, "label", 8);
      \u0275\u0275element(16, "input", 9);
      \u0275\u0275elementStart(17, "span");
      \u0275\u0275text(18, "I won");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(19, "div", 10)(20, "button", 11);
      \u0275\u0275listener("click", function LogPlayModalComponent_Template_button_click_20_listener() {
        return ctx.close();
      });
      \u0275\u0275text(21, "Cancel");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(22, "button", 12);
      \u0275\u0275text(23, "Log play");
      \u0275\u0275elementEnd()()()()();
    }
    if (rf & 2) {
      \u0275\u0275advance(5);
      \u0275\u0275textInterpolate(ctx.gameName());
      \u0275\u0275advance();
      \u0275\u0275property("formGroup", ctx.form);
      \u0275\u0275advance(16);
      \u0275\u0275property("disabled", ctx.submitting());
    }
  }, dependencies: [ReactiveFormsModule, \u0275NgNoValidate, DefaultValueAccessor, NumberValueAccessor, CheckboxControlValueAccessor, NgControlStatus, NgControlStatusGroup, FormGroupDirective, FormControlName], styles: ['\n.backdrop[_ngcontent-%COMP%] {\n  position: fixed;\n  inset: 0;\n  background: rgba(43, 32, 24, 0.4);\n  display: grid;\n  place-items: center;\n  z-index: 50;\n  padding: var(--space-lg);\n}\n.modal[_ngcontent-%COMP%] {\n  width: min(100%, 440px);\n  padding: var(--space-xl);\n}\n.modal[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  margin: 0;\n  font-family: "Fraunces", serif;\n}\n.game-name[_ngcontent-%COMP%] {\n  margin: var(--space-sm) 0 var(--space-xl);\n  color: var(--color-text-secondary);\n  font-weight: 600;\n}\n.field[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: var(--space-xs);\n  margin-bottom: var(--space-lg);\n  font-size: 0.875rem;\n  font-weight: 600;\n  color: var(--color-text-secondary);\n}\n.checkbox[_ngcontent-%COMP%] {\n  flex-direction: row;\n  align-items: center;\n}\ntextarea.input[_ngcontent-%COMP%] {\n  resize: vertical;\n  min-height: 80px;\n}\n.actions[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: flex-end;\n  gap: var(--space-md);\n}\n/*# sourceMappingURL=log-play-modal.component.css.map */'], changeDetection: 0 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(LogPlayModalComponent, [{
    type: Component,
    args: [{ selector: "app-log-play-modal", changeDetection: ChangeDetectionStrategy.OnPush, imports: [ReactiveFormsModule], template: `
    <div class="backdrop" (click)="close()" role="presentation">
      <div class="modal card" role="dialog" aria-labelledby="log-play-title" (click)="$event.stopPropagation()">
        <h2 id="log-play-title">Log a play</h2>
        <p class="game-name">{{ gameName() }}</p>

        <form [formGroup]="form" (ngSubmit)="onSubmit()">
          <label class="field">
            <span>Notes</span>
            <textarea class="input" formControlName="description" rows="3" placeholder="How did it go?"></textarea>
          </label>

          <label class="field">
            <span>Your score</span>
            <input class="input" type="number" formControlName="score" />
          </label>

          <label class="field checkbox">
            <input type="checkbox" formControlName="winner" />
            <span>I won</span>
          </label>

          <div class="actions">
            <button class="btn btn-secondary" type="button" (click)="close()">Cancel</button>
            <button class="btn btn-primary" type="submit" [disabled]="submitting()">Log play</button>
          </div>
        </form>
      </div>
    </div>
  `, styles: ['/* angular:styles/component:scss;0202158a2b5cd30dfb77ab18deffa7e90718862dafff9627a430a498217c7e77;C:/Users/baseb/OneDrive/Documents/GitHub/boardgame-social-v2/apps/web/src/app/features/plays/log-play-modal.component.ts */\n.backdrop {\n  position: fixed;\n  inset: 0;\n  background: rgba(43, 32, 24, 0.4);\n  display: grid;\n  place-items: center;\n  z-index: 50;\n  padding: var(--space-lg);\n}\n.modal {\n  width: min(100%, 440px);\n  padding: var(--space-xl);\n}\n.modal h2 {\n  margin: 0;\n  font-family: "Fraunces", serif;\n}\n.game-name {\n  margin: var(--space-sm) 0 var(--space-xl);\n  color: var(--color-text-secondary);\n  font-weight: 600;\n}\n.field {\n  display: flex;\n  flex-direction: column;\n  gap: var(--space-xs);\n  margin-bottom: var(--space-lg);\n  font-size: 0.875rem;\n  font-weight: 600;\n  color: var(--color-text-secondary);\n}\n.checkbox {\n  flex-direction: row;\n  align-items: center;\n}\ntextarea.input {\n  resize: vertical;\n  min-height: 80px;\n}\n.actions {\n  display: flex;\n  justify-content: flex-end;\n  gap: var(--space-md);\n}\n/*# sourceMappingURL=log-play-modal.component.css.map */\n'] }]
  }], null, { gameId: [{ type: Input, args: [{ isSignal: true, alias: "gameId", required: true }] }], gameName: [{ type: Input, args: [{ isSignal: true, alias: "gameName", required: true }] }], closed: [{ type: Output, args: ["closed"] }], saved: [{ type: Output, args: ["saved"] }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(LogPlayModalComponent, { className: "LogPlayModalComponent", filePath: "apps/web/src/app/features/plays/log-play-modal.component.ts", lineNumber: 95 });
})();

// apps/web/src/app/features/games/game-overview-page.component.ts
var _forTrack0 = ($index, $item) => $item.id;
function GameOverviewPageComponent_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "app-skeleton", 2)(1, "app-skeleton", 3);
  }
}
function GameOverviewPageComponent_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "app-empty-state", 0)(1, "a", 4);
    \u0275\u0275text(2, "Back to games");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275property("message", ctx_r0.error());
  }
}
function GameOverviewPageComponent_Conditional_2_Conditional_5_Conditional_20_For_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 15);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const cat_r3 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(cat_r3.value);
  }
}
function GameOverviewPageComponent_Conditional_2_Conditional_5_Conditional_20_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "section", 11)(1, "h2");
    \u0275\u0275text(2, "Categories");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 14);
    \u0275\u0275repeaterCreate(4, GameOverviewPageComponent_Conditional_2_Conditional_5_Conditional_20_For_5_Template, 2, 1, "span", 15, _forTrack0);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(4);
    \u0275\u0275repeater(ctx_r0.details().gameCategories);
  }
}
function GameOverviewPageComponent_Conditional_2_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "section", 11)(1, "h2");
    \u0275\u0275text(2, "Overview");
    \u0275\u0275elementEnd();
    \u0275\u0275element(3, "p", 12);
    \u0275\u0275elementStart(4, "dl", 13)(5, "div")(6, "dt");
    \u0275\u0275text(7, "Players");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "dd");
    \u0275\u0275text(9);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(10, "div")(11, "dt");
    \u0275\u0275text(12, "Play time");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "dd");
    \u0275\u0275text(14);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(15, "div")(16, "dt");
    \u0275\u0275text(17, "Year");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(18, "dd");
    \u0275\u0275text(19);
    \u0275\u0275elementEnd()()()();
    \u0275\u0275conditionalCreate(20, GameOverviewPageComponent_Conditional_2_Conditional_5_Conditional_20_Template, 6, 0, "section", 11);
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(3);
    \u0275\u0275property("innerHTML", ctx_r0.details().description, \u0275\u0275sanitizeHtml);
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate2("", ctx_r0.details().minplayers, "\u2013", ctx_r0.details().maxplayers);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate2("", ctx_r0.details().minPlayTime, "\u2013", ctx_r0.details().maxPlayTime, " min");
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r0.details().yearpublished);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.details().gameCategories.length ? 20 : -1);
  }
}
function GameOverviewPageComponent_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275element(0, "app-page-header", 5);
    \u0275\u0275elementStart(1, "div", 6)(2, "div", 7);
    \u0275\u0275element(3, "img", 8);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div", 9);
    \u0275\u0275conditionalCreate(5, GameOverviewPageComponent_Conditional_2_Conditional_5_Template, 21, 7);
    \u0275\u0275elementStart(6, "button", 10);
    \u0275\u0275listener("click", function GameOverviewPageComponent_Conditional_2_Template_button_click_6_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.showLogPlay.set(true));
    });
    \u0275\u0275text(7, "Log a play");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    let tmp_1_0;
    let tmp_3_0;
    let tmp_4_0;
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275property("title", ((tmp_1_0 = ctx_r0.game()) == null ? null : tmp_1_0.name) ?? "Game")("subtitle", ctx_r0.metaLine());
    \u0275\u0275advance(3);
    \u0275\u0275property("src", (tmp_3_0 = ctx_r0.game()) == null ? null : tmp_3_0.imageUrl, \u0275\u0275sanitizeUrl)("alt", (tmp_4_0 = ctx_r0.game()) == null ? null : tmp_4_0.name);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r0.details() ? 5 : -1);
  }
}
function GameOverviewPageComponent_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "app-log-play-modal", 16);
    \u0275\u0275listener("closed", function GameOverviewPageComponent_Conditional_3_Template_app_log_play_modal_closed_0_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.showLogPlay.set(false));
    })("saved", function GameOverviewPageComponent_Conditional_3_Template_app_log_play_modal_saved_0_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.showLogPlay.set(false));
    });
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275property("gameId", ctx_r0.String(ctx_r0.game().gameId))("gameName", ctx_r0.game().name);
  }
}
var GameOverviewPageComponent = class _GameOverviewPageComponent {
  route = inject(ActivatedRoute);
  gamesApi = inject(GamesApiService);
  loading = signal(true, ...ngDevMode ? [{ debugName: "loading" }] : (
    /* istanbul ignore next */
    []
  ));
  error = signal("", ...ngDevMode ? [{ debugName: "error" }] : (
    /* istanbul ignore next */
    []
  ));
  game = signal(null, ...ngDevMode ? [{ debugName: "game" }] : (
    /* istanbul ignore next */
    []
  ));
  details = signal(null, ...ngDevMode ? [{ debugName: "details" }] : (
    /* istanbul ignore next */
    []
  ));
  showLogPlay = signal(false, ...ngDevMode ? [{ debugName: "showLogPlay" }] : (
    /* istanbul ignore next */
    []
  ));
  metaLine() {
    const d = this.details();
    if (!d)
      return "";
    return `${d.minplayers}\u2013${d.maxplayers} players \xB7 ${d.yearpublished}`;
  }
  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get("id"));
    if (!id) {
      this.error.set("Invalid game ID");
      this.loading.set(false);
      return;
    }
    this.gamesApi.getInfo(id).subscribe({
      next: (info) => {
        this.game.set(info);
        this.gamesApi.getBggDetails(String(info.bggGameId)).subscribe({
          next: (d) => {
            this.details.set(d);
            this.loading.set(false);
          },
          error: () => this.loading.set(false)
        });
      },
      error: (err) => {
        this.error.set(err?.message ?? "Could not load game");
        this.loading.set(false);
      }
    });
  }
  static \u0275fac = function GameOverviewPageComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _GameOverviewPageComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _GameOverviewPageComponent, selectors: [["app-game-overview-page"]], decls: 4, vars: 2, consts: [["title", "Game not found", "icon", "\u{1F3B2}", 3, "message"], [3, "gameId", "gameName"], ["height", "2rem", "width", "300px"], ["height", "400px"], ["href", "/games", 1, "btn", "btn-secondary"], ["overline", "Game", 3, "title", "subtitle"], [1, "layout"], [1, "hero", "card"], [3, "src", "alt"], [1, "details"], ["type", "button", 1, "btn", "btn-primary", 3, "click"], [1, "card", "section"], [1, "description", 3, "innerHTML"], [1, "stats"], [1, "chips"], [1, "chip"], [3, "closed", "saved", "gameId", "gameName"]], template: function GameOverviewPageComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275conditionalCreate(0, GameOverviewPageComponent_Conditional_0_Template, 2, 0)(1, GameOverviewPageComponent_Conditional_1_Template, 3, 1, "app-empty-state", 0)(2, GameOverviewPageComponent_Conditional_2_Template, 8, 5);
      \u0275\u0275conditionalCreate(3, GameOverviewPageComponent_Conditional_3_Template, 1, 2, "app-log-play-modal", 1);
    }
    if (rf & 2) {
      \u0275\u0275conditional(ctx.loading() ? 0 : ctx.error() ? 1 : 2);
      \u0275\u0275advance(3);
      \u0275\u0275conditional(ctx.showLogPlay() && ctx.game() ? 3 : -1);
    }
  }, dependencies: [PageHeaderComponent, EmptyStateComponent, SkeletonComponent, LogPlayModalComponent], styles: ['\n.layout[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: minmax(200px, 320px) 1fr;\n  gap: var(--space-xl);\n}\n@media (max-width: 768px) {\n  .layout[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n}\n.hero[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n  width: 100%;\n  border-radius: var(--radius-md);\n}\n.section[_ngcontent-%COMP%] {\n  padding: var(--space-xl);\n  margin-bottom: var(--space-lg);\n}\n.section[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  margin: 0 0 var(--space-md);\n  font-family: "Fraunces", serif;\n  font-size: 1.125rem;\n}\n.description[_ngcontent-%COMP%] {\n  color: var(--color-text-secondary);\n  line-height: 1.6;\n  margin: 0 0 var(--space-lg);\n}\n.stats[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: var(--space-md);\n  margin: 0;\n}\n.stats[_ngcontent-%COMP%]   dt[_ngcontent-%COMP%] {\n  font-size: 0.75rem;\n  font-weight: 700;\n  text-transform: uppercase;\n  color: var(--color-text-muted);\n}\n.stats[_ngcontent-%COMP%]   dd[_ngcontent-%COMP%] {\n  margin: var(--space-xs) 0 0;\n  font-weight: 700;\n}\n.chips[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  gap: var(--space-sm);\n}\n.chip[_ngcontent-%COMP%] {\n  padding: 0.25rem 0.75rem;\n  border-radius: var(--radius-full);\n  background: var(--color-primary-soft);\n  color: var(--color-primary);\n  font-size: 0.8125rem;\n  font-weight: 600;\n}\n/*# sourceMappingURL=game-overview-page.component.css.map */'], changeDetection: 0 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(GameOverviewPageComponent, [{
    type: Component,
    args: [{ selector: "app-game-overview-page", changeDetection: ChangeDetectionStrategy.OnPush, imports: [PageHeaderComponent, EmptyStateComponent, SkeletonComponent, LogPlayModalComponent], template: `
    @if (loading()) {
      <app-skeleton height="2rem" width="300px" />
      <app-skeleton height="400px" />
    } @else if (error()) {
      <app-empty-state title="Game not found" [message]="error()" icon="\u{1F3B2}">
        <a class="btn btn-secondary" href="/games">Back to games</a>
      </app-empty-state>
    } @else {
      <app-page-header [title]="game()?.name ?? 'Game'" [subtitle]="metaLine()" overline="Game" />

      <div class="layout">
        <div class="hero card">
          <img [src]="game()?.imageUrl" [alt]="game()?.name" />
        </div>

        <div class="details">
          @if (details()) {
            <section class="card section">
              <h2>Overview</h2>
              <p class="description" [innerHTML]="details()!.description"></p>
              <dl class="stats">
                <div><dt>Players</dt><dd>{{ details()!.minplayers }}\u2013{{ details()!.maxplayers }}</dd></div>
                <div><dt>Play time</dt><dd>{{ details()!.minPlayTime }}\u2013{{ details()!.maxPlayTime }} min</dd></div>
                <div><dt>Year</dt><dd>{{ details()!.yearpublished }}</dd></div>
              </dl>
            </section>

            @if (details()!.gameCategories.length) {
              <section class="card section">
                <h2>Categories</h2>
                <div class="chips">
                  @for (cat of details()!.gameCategories; track cat.id) {
                    <span class="chip">{{ cat.value }}</span>
                  }
                </div>
              </section>
            }
          }

          <button class="btn btn-primary" type="button" (click)="showLogPlay.set(true)">Log a play</button>
        </div>
      </div>
    }

    @if (showLogPlay() && game()) {
      <app-log-play-modal
        [gameId]="String(game()!.gameId)"
        [gameName]="game()!.name"
        (closed)="showLogPlay.set(false)"
        (saved)="showLogPlay.set(false)"
      />
    }
  `, styles: ['/* angular:styles/component:scss;2aecf64ef63bf5876d73cdbe55389e1a458c762d286969dc57471690dd645600;C:/Users/baseb/OneDrive/Documents/GitHub/boardgame-social-v2/apps/web/src/app/features/games/game-overview-page.component.ts */\n.layout {\n  display: grid;\n  grid-template-columns: minmax(200px, 320px) 1fr;\n  gap: var(--space-xl);\n}\n@media (max-width: 768px) {\n  .layout {\n    grid-template-columns: 1fr;\n  }\n}\n.hero img {\n  width: 100%;\n  border-radius: var(--radius-md);\n}\n.section {\n  padding: var(--space-xl);\n  margin-bottom: var(--space-lg);\n}\n.section h2 {\n  margin: 0 0 var(--space-md);\n  font-family: "Fraunces", serif;\n  font-size: 1.125rem;\n}\n.description {\n  color: var(--color-text-secondary);\n  line-height: 1.6;\n  margin: 0 0 var(--space-lg);\n}\n.stats {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: var(--space-md);\n  margin: 0;\n}\n.stats dt {\n  font-size: 0.75rem;\n  font-weight: 700;\n  text-transform: uppercase;\n  color: var(--color-text-muted);\n}\n.stats dd {\n  margin: var(--space-xs) 0 0;\n  font-weight: 700;\n}\n.chips {\n  display: flex;\n  flex-wrap: wrap;\n  gap: var(--space-sm);\n}\n.chip {\n  padding: 0.25rem 0.75rem;\n  border-radius: var(--radius-full);\n  background: var(--color-primary-soft);\n  color: var(--color-primary);\n  font-size: 0.8125rem;\n  font-weight: 600;\n}\n/*# sourceMappingURL=game-overview-page.component.css.map */\n'] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(GameOverviewPageComponent, { className: "GameOverviewPageComponent", filePath: "apps/web/src/app/features/games/game-overview-page.component.ts", lineNumber: 136 });
})();
export {
  GameOverviewPageComponent
};
//# sourceMappingURL=chunk-5AYOTGDY.js.map
