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
  EmptyStateComponent,
  SkeletonComponent
} from "./chunk-T3V355ZA.js";
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
  ɵɵclassProp,
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
  ɵɵpureFunction0,
  ɵɵreference,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵrepeaterTrackByIdentity,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵsanitizeUrl,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1
} from "./chunk-B6IJ3W3N.js";

// apps/web/src/app/features/home/home-page.component.ts
var _c0 = () => [1, 2, 3];
var _forTrack0 = ($index, $item) => $item.id;
function HomePageComponent_Conditional_5_For_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "app-skeleton", 7);
  }
}
function HomePageComponent_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 5);
    \u0275\u0275repeaterCreate(1, HomePageComponent_Conditional_5_For_2_Template, 1, 0, "app-skeleton", 7, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275advance();
    \u0275\u0275repeater(\u0275\u0275pureFunction0(0, _c0));
  }
}
function HomePageComponent_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "app-empty-state", 6);
  }
}
function HomePageComponent_Conditional_7_For_2_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "img", 11);
  }
  if (rf & 2) {
    const post_r2 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275property("src", post_r2.author_avatar_url, \u0275\u0275sanitizeUrl);
  }
}
function HomePageComponent_Conditional_7_For_2_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0);
  }
  if (rf & 2) {
    const post_r2 = \u0275\u0275nextContext().$implicit;
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275textInterpolate1(" ", ctx_r2.initials(post_r2), " ");
  }
}
function HomePageComponent_Conditional_7_For_2_Conditional_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 16);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const post_r2 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(post_r2.game_name);
  }
}
function HomePageComponent_Conditional_7_For_2_Conditional_20_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 19)(1, "form", 20);
    \u0275\u0275listener("ngSubmit", function HomePageComponent_Conditional_7_For_2_Conditional_20_Template_form_ngSubmit_1_listener() {
      \u0275\u0275restoreView(_r4);
      const commentInput_r5 = \u0275\u0275reference(3);
      const post_r2 = \u0275\u0275nextContext().$implicit;
      const ctx_r2 = \u0275\u0275nextContext(2);
      ctx_r2.addComment(post_r2.id, commentInput_r5.value);
      return \u0275\u0275resetView(commentInput_r5.value = "");
    });
    \u0275\u0275element(2, "input", 21, 0);
    \u0275\u0275elementStart(4, "button", 22);
    \u0275\u0275text(5, "Reply");
    \u0275\u0275elementEnd()()();
  }
}
function HomePageComponent_Conditional_7_For_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "article", 8)(1, "header", 9)(2, "div", 10);
    \u0275\u0275conditionalCreate(3, HomePageComponent_Conditional_7_For_2_Conditional_3_Template, 1, 1, "img", 11)(4, HomePageComponent_Conditional_7_For_2_Conditional_4_Template, 1, 1);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "div")(6, "p", 12);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "p", 13);
    \u0275\u0275text(9);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(10, "span", 14);
    \u0275\u0275text(11);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(12, "p", 15);
    \u0275\u0275text(13);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(14, HomePageComponent_Conditional_7_For_2_Conditional_14_Template, 2, 1, "div", 16);
    \u0275\u0275elementStart(15, "footer", 17)(16, "button", 18);
    \u0275\u0275listener("click", function HomePageComponent_Conditional_7_For_2_Template_button_click_16_listener() {
      const post_r2 = \u0275\u0275restoreView(_r1).$implicit;
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.toggleLike(post_r2));
    });
    \u0275\u0275text(17);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(18, "button", 18);
    \u0275\u0275listener("click", function HomePageComponent_Conditional_7_For_2_Template_button_click_18_listener() {
      const post_r2 = \u0275\u0275restoreView(_r1).$implicit;
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.toggleComments(post_r2.id));
    });
    \u0275\u0275text(19);
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(20, HomePageComponent_Conditional_7_For_2_Conditional_20_Template, 6, 0, "div", 19);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const post_r2 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(3);
    \u0275\u0275conditional(post_r2.author_avatar_url ? 3 : 4);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(post_r2.author_display_name ?? post_r2.author_username);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r2.formatTime(post_r2.created_at));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(post_r2.type);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(post_r2.body);
    \u0275\u0275advance();
    \u0275\u0275conditional(post_r2.game_name ? 14 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275classProp("liked", post_r2.liked_by_me);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" \u2764\uFE0F ", post_r2.like_count, " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" \u{1F4AC} ", post_r2.comment_count, " ");
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r2.expandedComments() === post_r2.id ? 20 : -1);
  }
}
function HomePageComponent_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 5);
    \u0275\u0275repeaterCreate(1, HomePageComponent_Conditional_7_For_2_Template, 21, 11, "article", 8, _forTrack0);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r2.posts());
  }
}
var HomePageComponent = class _HomePageComponent {
  social = inject(SocialApiService);
  fb = inject(FormBuilder);
  loading = signal(true, ...ngDevMode ? [{ debugName: "loading" }] : (
    /* istanbul ignore next */
    []
  ));
  posting = signal(false, ...ngDevMode ? [{ debugName: "posting" }] : (
    /* istanbul ignore next */
    []
  ));
  posts = signal([], ...ngDevMode ? [{ debugName: "posts" }] : (
    /* istanbul ignore next */
    []
  ));
  expandedComments = signal(null, ...ngDevMode ? [{ debugName: "expandedComments" }] : (
    /* istanbul ignore next */
    []
  ));
  composeForm = this.fb.group({ body: [""] });
  ngOnInit() {
    this.loadFeed();
  }
  loadFeed() {
    this.social.getFeed().subscribe({
      next: (feed) => {
        this.posts.set(feed);
        this.loading.set(false);
      },
      error: () => this.loading.set(false)
    });
  }
  createPost() {
    const body = this.composeForm.value.body?.trim();
    if (!body)
      return;
    this.posting.set(true);
    this.social.createPost({ type: "text", body }).subscribe({
      next: (post) => {
        this.posts.update((list) => [post, ...list]);
        this.composeForm.reset();
        this.posting.set(false);
      },
      error: () => this.posting.set(false)
    });
  }
  toggleLike(post) {
    this.social.likePost(post.id).subscribe({
      next: ({ liked }) => {
        this.posts.update((list) => list.map((p) => p.id === post.id ? __spreadProps(__spreadValues({}, p), {
          liked_by_me: liked,
          like_count: liked ? p.like_count + 1 : Math.max(0, p.like_count - 1)
        }) : p));
      }
    });
  }
  toggleComments(postId) {
    this.expandedComments.update((id) => id === postId ? null : postId);
  }
  addComment(postId, body) {
    if (!body.trim())
      return;
    this.social.commentOnPost(postId, { body: body.trim() }).subscribe({
      next: () => {
        this.posts.update((list) => list.map((p) => p.id === postId ? __spreadProps(__spreadValues({}, p), { comment_count: p.comment_count + 1 }) : p));
      }
    });
  }
  initials(post) {
    const name = post.author_display_name ?? post.author_username;
    return name.split(" ").map((p) => p[0]).join("").slice(0, 2).toUpperCase();
  }
  formatTime(iso) {
    const diff = Date.now() - new Date(iso).getTime();
    const hours = Math.floor(diff / 36e5);
    if (hours < 1)
      return "Just now";
    if (hours < 24)
      return `${hours}h ago`;
    return new Date(iso).toLocaleDateString();
  }
  static \u0275fac = function HomePageComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _HomePageComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _HomePageComponent, selectors: [["app-home-page"]], decls: 8, vars: 3, consts: [["commentInput", ""], ["title", "Your game night HQ", "subtitle", "See what your friends are playing, logging, and ranking.", "overline", "Social feed"], [1, "composer", "card", 3, "ngSubmit", "formGroup"], ["formControlName", "body", "rows", "2", "placeholder", "Share an update\u2026", 1, "input"], ["type", "submit", 1, "btn", "btn-primary", 3, "disabled"], [1, "feed-grid"], ["title", "Feed is quiet", "message", "Post an update or add friends to see their activity.", "icon", "\u{1F3E0}"], ["height", "160px"], [1, "card", "feed-card"], [1, "feed-card__header"], [1, "avatar"], ["alt", "", 3, "src"], [1, "author"], [1, "time"], [1, "badge"], [1, "body"], [1, "game-chip"], [1, "feed-card__footer"], ["type", "button", 1, "action-btn", 3, "click"], [1, "comments"], [1, "comment-form", 3, "ngSubmit"], ["type", "text", "placeholder", "Write a comment\u2026", 1, "input"], ["type", "submit", 1, "btn", "btn-secondary"]], template: function HomePageComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275element(0, "app-page-header", 1);
      \u0275\u0275elementStart(1, "form", 2);
      \u0275\u0275listener("ngSubmit", function HomePageComponent_Template_form_ngSubmit_1_listener() {
        return ctx.createPost();
      });
      \u0275\u0275element(2, "textarea", 3);
      \u0275\u0275elementStart(3, "button", 4);
      \u0275\u0275text(4, " Post ");
      \u0275\u0275elementEnd()();
      \u0275\u0275conditionalCreate(5, HomePageComponent_Conditional_5_Template, 3, 1, "div", 5)(6, HomePageComponent_Conditional_6_Template, 1, 0, "app-empty-state", 6)(7, HomePageComponent_Conditional_7_Template, 3, 0, "div", 5);
    }
    if (rf & 2) {
      \u0275\u0275advance();
      \u0275\u0275property("formGroup", ctx.composeForm);
      \u0275\u0275advance(2);
      \u0275\u0275property("disabled", !(ctx.composeForm.value.body == null ? null : ctx.composeForm.value.body.trim()) || ctx.posting());
      \u0275\u0275advance(2);
      \u0275\u0275conditional(ctx.loading() ? 5 : ctx.posts().length === 0 ? 6 : 7);
    }
  }, dependencies: [PageHeaderComponent, ReactiveFormsModule, \u0275NgNoValidate, DefaultValueAccessor, NgControlStatus, NgControlStatusGroup, FormGroupDirective, FormControlName, EmptyStateComponent, SkeletonComponent], styles: ["\n.composer[_ngcontent-%COMP%] {\n  display: flex;\n  gap: var(--space-md);\n  padding: var(--space-lg);\n  margin-bottom: var(--space-xl);\n  max-width: 720px;\n  align-items: flex-end;\n}\n.composer[_ngcontent-%COMP%]   textarea[_ngcontent-%COMP%] {\n  flex: 1;\n  resize: vertical;\n  min-height: 60px;\n}\n.feed-grid[_ngcontent-%COMP%] {\n  display: grid;\n  gap: var(--space-lg);\n  max-width: 720px;\n}\n.feed-card[_ngcontent-%COMP%] {\n  padding: var(--space-lg);\n}\n.feed-card__header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: var(--space-md);\n  margin-bottom: var(--space-md);\n}\n.avatar[_ngcontent-%COMP%] {\n  width: 40px;\n  height: 40px;\n  border-radius: var(--radius-full);\n  background: var(--color-accent-soft);\n  color: var(--color-accent);\n  display: grid;\n  place-items: center;\n  font-weight: 700;\n  font-size: 0.875rem;\n  overflow: hidden;\n}\n.avatar[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n}\n.author[_ngcontent-%COMP%] {\n  margin: 0;\n  font-weight: 700;\n  color: var(--color-text-primary);\n}\n.time[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 0.75rem;\n  color: var(--color-text-muted);\n}\n.badge[_ngcontent-%COMP%] {\n  margin-left: auto;\n  padding: 0.25rem 0.625rem;\n  border-radius: var(--radius-full);\n  background: var(--color-primary-soft);\n  color: var(--color-primary);\n  font-size: 0.6875rem;\n  font-weight: 700;\n  text-transform: uppercase;\n}\n.body[_ngcontent-%COMP%] {\n  margin: 0 0 var(--space-md);\n  color: var(--color-text-secondary);\n  line-height: 1.5;\n}\n.game-chip[_ngcontent-%COMP%] {\n  display: inline-block;\n  padding: 0.375rem 0.75rem;\n  border-radius: var(--radius-sm);\n  background: var(--color-surface-elevated);\n  font-size: 0.8125rem;\n  font-weight: 600;\n  margin-bottom: var(--space-md);\n}\n.feed-card__footer[_ngcontent-%COMP%] {\n  display: flex;\n  gap: var(--space-lg);\n}\n.action-btn[_ngcontent-%COMP%] {\n  border: none;\n  background: transparent;\n  font-size: 0.875rem;\n  color: var(--color-text-muted);\n  font-weight: 600;\n}\n.action-btn.liked[_ngcontent-%COMP%] {\n  color: var(--color-danger);\n}\n.comments[_ngcontent-%COMP%] {\n  margin-top: var(--space-md);\n  padding-top: var(--space-md);\n  border-top: 1px solid var(--color-border);\n}\n.comment-form[_ngcontent-%COMP%] {\n  display: flex;\n  gap: var(--space-sm);\n}\n/*# sourceMappingURL=home-page.component.css.map */"], changeDetection: 0 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(HomePageComponent, [{
    type: Component,
    args: [{ selector: "app-home-page", changeDetection: ChangeDetectionStrategy.OnPush, imports: [PageHeaderComponent, ReactiveFormsModule, EmptyStateComponent, SkeletonComponent], template: `
    <app-page-header
      title="Your game night HQ"
      subtitle="See what your friends are playing, logging, and ranking."
      overline="Social feed"
    />

    <form class="composer card" [formGroup]="composeForm" (ngSubmit)="createPost()">
      <textarea
        class="input"
        formControlName="body"
        rows="2"
        placeholder="Share an update\u2026"
      ></textarea>
      <button class="btn btn-primary" type="submit" [disabled]="!composeForm.value.body?.trim() || posting()">
        Post
      </button>
    </form>

    @if (loading()) {
      <div class="feed-grid">
        @for (i of [1, 2, 3]; track i) {
          <app-skeleton height="160px" />
        }
      </div>
    } @else if (posts().length === 0) {
      <app-empty-state
        title="Feed is quiet"
        message="Post an update or add friends to see their activity."
        icon="\u{1F3E0}"
      />
    } @else {
      <div class="feed-grid">
        @for (post of posts(); track post.id) {
          <article class="card feed-card">
            <header class="feed-card__header">
              <div class="avatar">
                @if (post.author_avatar_url) {
                  <img [src]="post.author_avatar_url" alt="" />
                } @else {
                  {{ initials(post) }}
                }
              </div>
              <div>
                <p class="author">{{ post.author_display_name ?? post.author_username }}</p>
                <p class="time">{{ formatTime(post.created_at) }}</p>
              </div>
              <span class="badge">{{ post.type }}</span>
            </header>
            <p class="body">{{ post.body }}</p>
            @if (post.game_name) {
              <div class="game-chip">{{ post.game_name }}</div>
            }
            <footer class="feed-card__footer">
              <button
                type="button"
                class="action-btn"
                [class.liked]="post.liked_by_me"
                (click)="toggleLike(post)"
              >
                \u2764\uFE0F {{ post.like_count }}
              </button>
              <button type="button" class="action-btn" (click)="toggleComments(post.id)">
                \u{1F4AC} {{ post.comment_count }}
              </button>
            </footer>

            @if (expandedComments() === post.id) {
              <div class="comments">
                <form class="comment-form" (ngSubmit)="addComment(post.id, commentInput.value); commentInput.value = ''">
                  <input #commentInput class="input" type="text" placeholder="Write a comment\u2026" />
                  <button class="btn btn-secondary" type="submit">Reply</button>
                </form>
              </div>
            }
          </article>
        }
      </div>
    }
  `, styles: ["/* angular:styles/component:scss;d7ae4335e8c281b1e8ea14e68b31f31aa3bb5ccdb95ae7b0db1008e9c70af48d;C:/Users/baseb/OneDrive/Documents/GitHub/boardgame-social-v2/apps/web/src/app/features/home/home-page.component.ts */\n.composer {\n  display: flex;\n  gap: var(--space-md);\n  padding: var(--space-lg);\n  margin-bottom: var(--space-xl);\n  max-width: 720px;\n  align-items: flex-end;\n}\n.composer textarea {\n  flex: 1;\n  resize: vertical;\n  min-height: 60px;\n}\n.feed-grid {\n  display: grid;\n  gap: var(--space-lg);\n  max-width: 720px;\n}\n.feed-card {\n  padding: var(--space-lg);\n}\n.feed-card__header {\n  display: flex;\n  align-items: center;\n  gap: var(--space-md);\n  margin-bottom: var(--space-md);\n}\n.avatar {\n  width: 40px;\n  height: 40px;\n  border-radius: var(--radius-full);\n  background: var(--color-accent-soft);\n  color: var(--color-accent);\n  display: grid;\n  place-items: center;\n  font-weight: 700;\n  font-size: 0.875rem;\n  overflow: hidden;\n}\n.avatar img {\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n}\n.author {\n  margin: 0;\n  font-weight: 700;\n  color: var(--color-text-primary);\n}\n.time {\n  margin: 0;\n  font-size: 0.75rem;\n  color: var(--color-text-muted);\n}\n.badge {\n  margin-left: auto;\n  padding: 0.25rem 0.625rem;\n  border-radius: var(--radius-full);\n  background: var(--color-primary-soft);\n  color: var(--color-primary);\n  font-size: 0.6875rem;\n  font-weight: 700;\n  text-transform: uppercase;\n}\n.body {\n  margin: 0 0 var(--space-md);\n  color: var(--color-text-secondary);\n  line-height: 1.5;\n}\n.game-chip {\n  display: inline-block;\n  padding: 0.375rem 0.75rem;\n  border-radius: var(--radius-sm);\n  background: var(--color-surface-elevated);\n  font-size: 0.8125rem;\n  font-weight: 600;\n  margin-bottom: var(--space-md);\n}\n.feed-card__footer {\n  display: flex;\n  gap: var(--space-lg);\n}\n.action-btn {\n  border: none;\n  background: transparent;\n  font-size: 0.875rem;\n  color: var(--color-text-muted);\n  font-weight: 600;\n}\n.action-btn.liked {\n  color: var(--color-danger);\n}\n.comments {\n  margin-top: var(--space-md);\n  padding-top: var(--space-md);\n  border-top: 1px solid var(--color-border);\n}\n.comment-form {\n  display: flex;\n  gap: var(--space-sm);\n}\n/*# sourceMappingURL=home-page.component.css.map */\n"] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(HomePageComponent, { className: "HomePageComponent", filePath: "apps/web/src/app/features/home/home-page.component.ts", lineNumber: 213 });
})();
export {
  HomePageComponent
};
//# sourceMappingURL=chunk-FBDP7AF5.js.map
