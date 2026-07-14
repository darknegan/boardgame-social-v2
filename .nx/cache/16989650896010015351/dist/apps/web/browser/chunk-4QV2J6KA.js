import {
  DefaultValueAccessor,
  FormBuilder,
  FormControlName,
  FormGroupDirective,
  MinValidator,
  NgControlStatus,
  NgControlStatusGroup,
  NgSelectOption,
  NumberValueAccessor,
  ReactiveFormsModule,
  SelectControlValueAccessor,
  Validators,
  ɵNgNoValidate,
  ɵNgSelectMultipleOption
} from "./chunk-RUD23VHN.js";
import {
  ToastService
} from "./chunk-FNB3VBA5.js";
import {
  EmptyStateComponent,
  SkeletonComponent
} from "./chunk-T3V355ZA.js";
import {
  PageHeaderComponent
} from "./chunk-5ISH4G2G.js";
import "./chunk-G3THX2OW.js";
import {
  HttpClient
} from "./chunk-XKHOIK35.js";
import {
  ChangeDetectionStrategy,
  Component,
  Injectable,
  Output,
  inject,
  output,
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
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵpureFunction0,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵrepeaterTrackByIdentity,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate2
} from "./chunk-B6IJ3W3N.js";

// apps/web/src/app/core/api/events-api.service.ts
var EventsApiService = class _EventsApiService {
  http = inject(HttpClient);
  listEvents() {
    return this.http.get("events");
  }
  createEvent(dto) {
    return this.http.post("events", dto);
  }
  static \u0275fac = function EventsApiService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _EventsApiService)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _EventsApiService, factory: _EventsApiService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(EventsApiService, [{
    type: Injectable,
    args: [{ providedIn: "root" }]
  }], null, null);
})();

// apps/web/src/app/core/api/locations-api.service.ts
var LocationsApiService = class _LocationsApiService {
  http = inject(HttpClient);
  getCountries() {
    return this.http.get("locations/countries");
  }
  getSubdivisions() {
    return this.http.get("locations/subdivisions");
  }
  getVenues() {
    return this.http.get("locations/venues");
  }
  createVenue(venue) {
    return this.http.post("locations/venues", venue);
  }
  static \u0275fac = function LocationsApiService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _LocationsApiService)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _LocationsApiService, factory: _LocationsApiService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(LocationsApiService, [{
    type: Injectable,
    args: [{ providedIn: "root" }]
  }], null, null);
})();

// apps/web/src/app/features/events/create-event-modal.component.ts
var _forTrack0 = ($index, $item) => $item.id;
function CreateEventModalComponent_For_30_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 13);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const venue_r1 = ctx.$implicit;
    \u0275\u0275property("value", venue_r1.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(venue_r1.name);
  }
}
var CreateEventModalComponent = class _CreateEventModalComponent {
  closed = output();
  created = output();
  events = inject(EventsApiService);
  locations = inject(LocationsApiService);
  toast = inject(ToastService);
  fb = inject(FormBuilder);
  submitting = signal(false, ...ngDevMode ? [{ debugName: "submitting" }] : (
    /* istanbul ignore next */
    []
  ));
  venues = signal([], ...ngDevMode ? [{ debugName: "venues" }] : (
    /* istanbul ignore next */
    []
  ));
  form = this.fb.nonNullable.group({
    title: ["", Validators.required],
    description: [""],
    kind: ["regular", Validators.required],
    location_id: ["", Validators.required],
    start_time: ["", Validators.required],
    end_time: ["", Validators.required],
    min_players: [2, Validators.required],
    max_players: [6, Validators.required],
    experience_required: ["any"],
    recurring: [false],
    image: [""]
  });
  constructor() {
    this.locations.getVenues().subscribe({
      next: (v) => this.venues.set(v)
    });
  }
  close() {
    this.closed.emit();
  }
  onSubmit() {
    if (this.form.invalid)
      return;
    this.submitting.set(true);
    const raw = this.form.getRawValue();
    const dto = {
      gameEvent: {
        title: raw.title,
        description: raw.description,
        kind: raw.kind,
        image: raw.image,
        created_by: "",
        location_id: raw.location_id,
        start_time: new Date(raw.start_time).toISOString(),
        end_time: new Date(raw.end_time).toISOString(),
        recurring: raw.recurring,
        min_players: raw.min_players,
        max_players: raw.max_players,
        experience_required: raw.experience_required
      }
    };
    this.events.createEvent(dto).subscribe({
      next: (event) => {
        this.toast.success("Event created");
        this.created.emit(event);
      },
      error: () => this.submitting.set(false),
      complete: () => this.submitting.set(false)
    });
  }
  static \u0275fac = function CreateEventModalComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _CreateEventModalComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _CreateEventModalComponent, selectors: [["app-create-event-modal"]], outputs: { closed: "closed", created: "created" }, decls: 54, vars: 2, consts: [["role", "presentation", 1, "backdrop", 3, "click"], ["role", "dialog", "aria-labelledby", "create-event-title", 1, "modal", "card", 3, "click"], ["id", "create-event-title"], [3, "ngSubmit", "formGroup"], [1, "field"], ["type", "text", "formControlName", "title", 1, "input"], ["formControlName", "description", "rows", "3", 1, "input"], ["formControlName", "kind", 1, "input"], ["value", "regular"], ["value", "playtest"], ["value", "demo"], ["formControlName", "location_id", 1, "input"], ["value", ""], [3, "value"], [1, "row"], ["type", "datetime-local", "formControlName", "start_time", 1, "input"], ["type", "datetime-local", "formControlName", "end_time", 1, "input"], ["type", "number", "formControlName", "min_players", "min", "1", 1, "input"], ["type", "number", "formControlName", "max_players", "min", "1", 1, "input"], [1, "actions"], ["type", "button", 1, "btn", "btn-secondary", 3, "click"], ["type", "submit", 1, "btn", "btn-primary", 3, "disabled"]], template: function CreateEventModalComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0);
      \u0275\u0275listener("click", function CreateEventModalComponent_Template_div_click_0_listener() {
        return ctx.close();
      });
      \u0275\u0275elementStart(1, "div", 1);
      \u0275\u0275listener("click", function CreateEventModalComponent_Template_div_click_1_listener($event) {
        return $event.stopPropagation();
      });
      \u0275\u0275elementStart(2, "h2", 2);
      \u0275\u0275text(3, "Create event");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(4, "form", 3);
      \u0275\u0275listener("ngSubmit", function CreateEventModalComponent_Template_form_ngSubmit_4_listener() {
        return ctx.onSubmit();
      });
      \u0275\u0275elementStart(5, "label", 4)(6, "span");
      \u0275\u0275text(7, "Title");
      \u0275\u0275elementEnd();
      \u0275\u0275element(8, "input", 5);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(9, "label", 4)(10, "span");
      \u0275\u0275text(11, "Description");
      \u0275\u0275elementEnd();
      \u0275\u0275element(12, "textarea", 6);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(13, "label", 4)(14, "span");
      \u0275\u0275text(15, "Kind");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(16, "select", 7)(17, "option", 8);
      \u0275\u0275text(18, "Regular game night");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(19, "option", 9);
      \u0275\u0275text(20, "Playtest");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(21, "option", 10);
      \u0275\u0275text(22, "Demo");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(23, "label", 4)(24, "span");
      \u0275\u0275text(25, "Venue");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(26, "select", 11)(27, "option", 12);
      \u0275\u0275text(28, "Select venue");
      \u0275\u0275elementEnd();
      \u0275\u0275repeaterCreate(29, CreateEventModalComponent_For_30_Template, 2, 2, "option", 13, _forTrack0);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(31, "div", 14)(32, "label", 4)(33, "span");
      \u0275\u0275text(34, "Start");
      \u0275\u0275elementEnd();
      \u0275\u0275element(35, "input", 15);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(36, "label", 4)(37, "span");
      \u0275\u0275text(38, "End");
      \u0275\u0275elementEnd();
      \u0275\u0275element(39, "input", 16);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(40, "div", 14)(41, "label", 4)(42, "span");
      \u0275\u0275text(43, "Min players");
      \u0275\u0275elementEnd();
      \u0275\u0275element(44, "input", 17);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(45, "label", 4)(46, "span");
      \u0275\u0275text(47, "Max players");
      \u0275\u0275elementEnd();
      \u0275\u0275element(48, "input", 18);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(49, "div", 19)(50, "button", 20);
      \u0275\u0275listener("click", function CreateEventModalComponent_Template_button_click_50_listener() {
        return ctx.close();
      });
      \u0275\u0275text(51, "Cancel");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(52, "button", 21);
      \u0275\u0275text(53, " Create ");
      \u0275\u0275elementEnd()()()()();
    }
    if (rf & 2) {
      \u0275\u0275advance(4);
      \u0275\u0275property("formGroup", ctx.form);
      \u0275\u0275advance(25);
      \u0275\u0275repeater(ctx.venues());
      \u0275\u0275advance(23);
      \u0275\u0275property("disabled", ctx.form.invalid || ctx.submitting());
    }
  }, dependencies: [ReactiveFormsModule, \u0275NgNoValidate, NgSelectOption, \u0275NgSelectMultipleOption, DefaultValueAccessor, NumberValueAccessor, SelectControlValueAccessor, NgControlStatus, NgControlStatusGroup, MinValidator, FormGroupDirective, FormControlName], styles: ['\n.backdrop[_ngcontent-%COMP%] {\n  position: fixed;\n  inset: 0;\n  background: rgba(43, 32, 24, 0.4);\n  display: grid;\n  place-items: center;\n  z-index: 50;\n  padding: var(--space-lg);\n}\n.modal[_ngcontent-%COMP%] {\n  width: min(100%, 520px);\n  padding: var(--space-xl);\n  max-height: 90vh;\n  overflow: auto;\n}\n.modal[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  margin: 0 0 var(--space-xl);\n  font-family: "Fraunces", serif;\n}\n.field[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: var(--space-xs);\n  margin-bottom: var(--space-lg);\n  font-size: 0.875rem;\n  font-weight: 600;\n  color: var(--color-text-secondary);\n}\n.row[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: var(--space-md);\n}\ntextarea.input[_ngcontent-%COMP%] {\n  resize: vertical;\n}\n.actions[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: flex-end;\n  gap: var(--space-md);\n}\n/*# sourceMappingURL=create-event-modal.component.css.map */'], changeDetection: 0 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CreateEventModalComponent, [{
    type: Component,
    args: [{ selector: "app-create-event-modal", changeDetection: ChangeDetectionStrategy.OnPush, imports: [ReactiveFormsModule], template: `
    <div class="backdrop" (click)="close()" role="presentation">
      <div class="modal card" role="dialog" aria-labelledby="create-event-title" (click)="$event.stopPropagation()">
        <h2 id="create-event-title">Create event</h2>

        <form [formGroup]="form" (ngSubmit)="onSubmit()">
          <label class="field">
            <span>Title</span>
            <input class="input" type="text" formControlName="title" />
          </label>

          <label class="field">
            <span>Description</span>
            <textarea class="input" formControlName="description" rows="3"></textarea>
          </label>

          <label class="field">
            <span>Kind</span>
            <select class="input" formControlName="kind">
              <option value="regular">Regular game night</option>
              <option value="playtest">Playtest</option>
              <option value="demo">Demo</option>
            </select>
          </label>

          <label class="field">
            <span>Venue</span>
            <select class="input" formControlName="location_id">
              <option value="">Select venue</option>
              @for (venue of venues(); track venue.id) {
                <option [value]="venue.id">{{ venue.name }}</option>
              }
            </select>
          </label>

          <div class="row">
            <label class="field">
              <span>Start</span>
              <input class="input" type="datetime-local" formControlName="start_time" />
            </label>
            <label class="field">
              <span>End</span>
              <input class="input" type="datetime-local" formControlName="end_time" />
            </label>
          </div>

          <div class="row">
            <label class="field">
              <span>Min players</span>
              <input class="input" type="number" formControlName="min_players" min="1" />
            </label>
            <label class="field">
              <span>Max players</span>
              <input class="input" type="number" formControlName="max_players" min="1" />
            </label>
          </div>

          <div class="actions">
            <button class="btn btn-secondary" type="button" (click)="close()">Cancel</button>
            <button class="btn btn-primary" type="submit" [disabled]="form.invalid || submitting()">
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  `, styles: ['/* angular:styles/component:scss;82eb4d174463ae831b8cc2e295a4efceff53d3c24a5dce98c6fec6d7f06085b0;C:/Users/baseb/OneDrive/Documents/GitHub/boardgame-social-v2/apps/web/src/app/features/events/create-event-modal.component.ts */\n.backdrop {\n  position: fixed;\n  inset: 0;\n  background: rgba(43, 32, 24, 0.4);\n  display: grid;\n  place-items: center;\n  z-index: 50;\n  padding: var(--space-lg);\n}\n.modal {\n  width: min(100%, 520px);\n  padding: var(--space-xl);\n  max-height: 90vh;\n  overflow: auto;\n}\n.modal h2 {\n  margin: 0 0 var(--space-xl);\n  font-family: "Fraunces", serif;\n}\n.field {\n  display: flex;\n  flex-direction: column;\n  gap: var(--space-xs);\n  margin-bottom: var(--space-lg);\n  font-size: 0.875rem;\n  font-weight: 600;\n  color: var(--color-text-secondary);\n}\n.row {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: var(--space-md);\n}\ntextarea.input {\n  resize: vertical;\n}\n.actions {\n  display: flex;\n  justify-content: flex-end;\n  gap: var(--space-md);\n}\n/*# sourceMappingURL=create-event-modal.component.css.map */\n'] }]
  }], () => [], { closed: [{ type: Output, args: ["closed"] }], created: [{ type: Output, args: ["created"] }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(CreateEventModalComponent, { className: "CreateEventModalComponent", filePath: "apps/web/src/app/features/events/create-event-modal.component.ts", lineNumber: 129 });
})();

// apps/web/src/app/features/events/events-page.component.ts
var _c0 = () => [1, 2, 3];
var _forTrack02 = ($index, $item) => $item.id;
function EventsPageComponent_Conditional_3_For_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "app-skeleton", 4);
  }
}
function EventsPageComponent_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 2);
    \u0275\u0275repeaterCreate(1, EventsPageComponent_Conditional_3_For_2_Template, 1, 0, "app-skeleton", 4, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275advance();
    \u0275\u0275repeater(\u0275\u0275pureFunction0(0, _c0));
  }
}
function EventsPageComponent_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "app-empty-state", 3)(1, "button", 1);
    \u0275\u0275listener("click", function EventsPageComponent_Conditional_4_Template_button_click_1_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.showCreate.set(true));
    });
    \u0275\u0275text(2, "Create event");
    \u0275\u0275elementEnd()();
  }
}
function EventsPageComponent_Conditional_5_For_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "article", 5)(1, "div", 6)(2, "span", 7);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "time");
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "h2", 8);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "p", 9);
    \u0275\u0275text(9);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "p", 10);
    \u0275\u0275text(11);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const event_r3 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(event_r3.kind);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.formatDate(event_r3.start_time));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(event_r3.title);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(event_r3.description);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate2("", event_r3.min_players, "\u2013", event_r3.max_players, " players");
  }
}
function EventsPageComponent_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 2);
    \u0275\u0275repeaterCreate(1, EventsPageComponent_Conditional_5_For_2_Template, 12, 6, "article", 5, _forTrack02);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r1.events());
  }
}
function EventsPageComponent_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "app-create-event-modal", 11);
    \u0275\u0275listener("closed", function EventsPageComponent_Conditional_6_Template_app_create_event_modal_closed_0_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.showCreate.set(false));
    })("created", function EventsPageComponent_Conditional_6_Template_app_create_event_modal_created_0_listener($event) {
      \u0275\u0275restoreView(_r4);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onCreated($event));
    });
    \u0275\u0275elementEnd();
  }
}
var EventsPageComponent = class _EventsPageComponent {
  eventsApi = inject(EventsApiService);
  loading = signal(true, ...ngDevMode ? [{ debugName: "loading" }] : (
    /* istanbul ignore next */
    []
  ));
  showCreate = signal(false, ...ngDevMode ? [{ debugName: "showCreate" }] : (
    /* istanbul ignore next */
    []
  ));
  events = signal([], ...ngDevMode ? [{ debugName: "events" }] : (
    /* istanbul ignore next */
    []
  ));
  ngOnInit() {
    this.load();
  }
  load() {
    this.eventsApi.listEvents().subscribe({
      next: (list) => {
        this.events.set(list);
        this.loading.set(false);
      },
      error: () => this.loading.set(false)
    });
  }
  onCreated(event) {
    this.showCreate.set(false);
    this.events.update((list) => [event, ...list]);
  }
  formatDate(iso) {
    return new Date(iso).toLocaleString(void 0, {
      weekday: "short",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit"
    });
  }
  static \u0275fac = function EventsPageComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _EventsPageComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _EventsPageComponent, selectors: [["app-events-page"]], decls: 7, vars: 2, consts: [["title", "Events", "subtitle", "Find and host game nights.", "overline", "Community"], ["type", "button", 1, "btn", "btn-primary", 3, "click"], [1, "event-list"], ["title", "No upcoming events", "message", "Be the first to host a game night!", "icon", "\u{1F4C5}"], ["height", "120px"], [1, "event-card", "card"], [1, "event-meta"], [1, "badge"], [1, "event-title"], [1, "event-desc"], [1, "event-players"], [3, "closed", "created"]], template: function EventsPageComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "app-page-header", 0)(1, "button", 1);
      \u0275\u0275listener("click", function EventsPageComponent_Template_button_click_1_listener() {
        return ctx.showCreate.set(true);
      });
      \u0275\u0275text(2, "Create event");
      \u0275\u0275elementEnd()();
      \u0275\u0275conditionalCreate(3, EventsPageComponent_Conditional_3_Template, 3, 1, "div", 2)(4, EventsPageComponent_Conditional_4_Template, 3, 0, "app-empty-state", 3)(5, EventsPageComponent_Conditional_5_Template, 3, 0, "div", 2);
      \u0275\u0275conditionalCreate(6, EventsPageComponent_Conditional_6_Template, 1, 0, "app-create-event-modal");
    }
    if (rf & 2) {
      \u0275\u0275advance(3);
      \u0275\u0275conditional(ctx.loading() ? 3 : ctx.events().length === 0 ? 4 : 5);
      \u0275\u0275advance(3);
      \u0275\u0275conditional(ctx.showCreate() ? 6 : -1);
    }
  }, dependencies: [PageHeaderComponent, EmptyStateComponent, SkeletonComponent, CreateEventModalComponent], styles: ['\n.event-list[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: var(--space-lg);\n  max-width: 720px;\n}\n.event-card[_ngcontent-%COMP%] {\n  padding: var(--space-xl);\n}\n.event-meta[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: var(--space-md);\n  margin-bottom: var(--space-sm);\n  font-size: 0.8125rem;\n  color: var(--color-text-muted);\n}\n.badge[_ngcontent-%COMP%] {\n  padding: 0.2rem 0.6rem;\n  border-radius: var(--radius-full);\n  background: var(--color-primary-soft);\n  color: var(--color-primary);\n  font-weight: 700;\n  text-transform: uppercase;\n  font-size: 0.6875rem;\n}\n.event-title[_ngcontent-%COMP%] {\n  margin: 0 0 var(--space-sm);\n  font-family: "Fraunces", serif;\n  font-size: 1.25rem;\n}\n.event-desc[_ngcontent-%COMP%] {\n  margin: 0 0 var(--space-sm);\n  color: var(--color-text-secondary);\n  line-height: 1.5;\n}\n.event-players[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 0.875rem;\n  font-weight: 600;\n  color: var(--color-text-muted);\n}\n/*# sourceMappingURL=events-page.component.css.map */'], changeDetection: 0 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(EventsPageComponent, [{
    type: Component,
    args: [{ selector: "app-events-page", changeDetection: ChangeDetectionStrategy.OnPush, imports: [PageHeaderComponent, EmptyStateComponent, SkeletonComponent, CreateEventModalComponent], template: `
    <app-page-header
      title="Events"
      subtitle="Find and host game nights."
      overline="Community"
    >
      <button class="btn btn-primary" type="button" (click)="showCreate.set(true)">Create event</button>
    </app-page-header>

    @if (loading()) {
      <div class="event-list">
        @for (i of [1, 2, 3]; track i) {
          <app-skeleton height="120px" />
        }
      </div>
    } @else if (events().length === 0) {
      <app-empty-state
        title="No upcoming events"
        message="Be the first to host a game night!"
        icon="\u{1F4C5}"
      >
        <button class="btn btn-primary" type="button" (click)="showCreate.set(true)">Create event</button>
      </app-empty-state>
    } @else {
      <div class="event-list">
        @for (event of events(); track event.id) {
          <article class="event-card card">
            <div class="event-meta">
              <span class="badge">{{ event.kind }}</span>
              <time>{{ formatDate(event.start_time) }}</time>
            </div>
            <h2 class="event-title">{{ event.title }}</h2>
            <p class="event-desc">{{ event.description }}</p>
            <p class="event-players">{{ event.min_players }}\u2013{{ event.max_players }} players</p>
          </article>
        }
      </div>
    }

    @if (showCreate()) {
      <app-create-event-modal
        (closed)="showCreate.set(false)"
        (created)="onCreated($event)"
      />
    }
  `, styles: ['/* angular:styles/component:scss;6e93737d99f54c9b3568e6fdd89b6812854ee0106c6dab645ae171f5023f2663;C:/Users/baseb/OneDrive/Documents/GitHub/boardgame-social-v2/apps/web/src/app/features/events/events-page.component.ts */\n.event-list {\n  display: flex;\n  flex-direction: column;\n  gap: var(--space-lg);\n  max-width: 720px;\n}\n.event-card {\n  padding: var(--space-xl);\n}\n.event-meta {\n  display: flex;\n  align-items: center;\n  gap: var(--space-md);\n  margin-bottom: var(--space-sm);\n  font-size: 0.8125rem;\n  color: var(--color-text-muted);\n}\n.badge {\n  padding: 0.2rem 0.6rem;\n  border-radius: var(--radius-full);\n  background: var(--color-primary-soft);\n  color: var(--color-primary);\n  font-weight: 700;\n  text-transform: uppercase;\n  font-size: 0.6875rem;\n}\n.event-title {\n  margin: 0 0 var(--space-sm);\n  font-family: "Fraunces", serif;\n  font-size: 1.25rem;\n}\n.event-desc {\n  margin: 0 0 var(--space-sm);\n  color: var(--color-text-secondary);\n  line-height: 1.5;\n}\n.event-players {\n  margin: 0;\n  font-size: 0.875rem;\n  font-weight: 600;\n  color: var(--color-text-muted);\n}\n/*# sourceMappingURL=events-page.component.css.map */\n'] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(EventsPageComponent, { className: "EventsPageComponent", filePath: "apps/web/src/app/features/events/events-page.component.ts", lineNumber: 110 });
})();
export {
  EventsPageComponent
};
//# sourceMappingURL=chunk-4QV2J6KA.js.map
