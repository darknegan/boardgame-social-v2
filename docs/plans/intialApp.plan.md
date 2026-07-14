# Board Game Social v2 — Initial App Implementation Plan

> **Status:** M0–M6 scaffold implemented. Web + API build successfully. Feature screens use placeholders except Home and Login.
> **Goal:** Rebuild the original `boardgame-social` (Nuxt 3 / Vue 3) app as an Angular 21 application inside an **Nx monorepo**, using the **"Game Night" (Option B)** Figma design, a freshly-built NestJS backend for BoardGameGeek + admin DB work, and the existing Supabase project for auth/data/storage.

---

## 1. Locked-in Decisions

| Decision | Choice |
|----------|--------|
| Repo structure | **Nx monorepo** — Angular app (`web`) + NestJS API (`api`) + shared TS lib (`shared`) |
| BGG / backend | **Rebuild fresh in v2** (clean NestJS, fixing the original's known bugs) |
| Supabase | **Reuse existing project + keys** (same tables/RPCs; add new tables for the social/tier features we designed) |
| Angular setup | **Standalone components + SCSS** (already scaffolded), signals, OnPush, lazy routes |
| Design | **Game Night (Option B)** — Figma file key `p9cdnQTLHGc2CM2GALCb1K` |
| Viewport | Desktop-first (1440px), with the mobile variants already designed (Home, Collection, Game Detail) |

---

## 2. Current State of `boardgame-social-v2`

A default **Angular 21.2** CLI workspace already exists at the repo root:

- Standalone bootstrap (`src/main.ts` → `bootstrapApplication(App, appConfig)`)
- `provideRouter` with an empty `routes` array (`src/app/app.routes.ts`)
- SCSS configured as default style language; global `src/styles.scss` is empty
- **Vitest** as the test runner (`@angular/build:unit-test`)
- `@angular/build:application` builder; `prefix: app`
- Only the default Angular "hello world" template in `src/app/app.html` (to be discarded)
- `package.json` name is `boardgame-social`, version `0.0.0`, npm `11.8.0`, Node `25.5.0`

**Implication:** There is no real application code to preserve — only the default template. This makes converting to (or recreating as) an Nx monorepo low-risk.

---

## 3. Source App Recap (what we are reproducing)

Original `boardgame-social` = Nx monorepo (pnpm) with Nuxt 3 `web/`, NestJS `api/`, `shared/` interfaces.

**Architecture:** hybrid — Nuxt talks **directly to Supabase** for auth/profiles/plays/storage, and to a **NestJS BFF** for collections, games catalog, BGG proxy, event creation, and venues (Nest uses the Supabase **service-role** admin client, bypassing RLS).

**Implemented in original:** Supabase auth, profiles (onboarding/edit/public/avatar), BGG collection import pipeline, collection browsing, games catalog + search, profile play analytics, event creation, venues, client-only tier-list UI, light/dark theming.

**Stubbed / broken in original (we will build these properly):** social feed (`FeedPage.vue` unused), friends (hardcoded), events listing (no GET endpoint), log-play (modal UI, broken API, no plays endpoint), tier-list persistence (UI only), filters (placeholders), game-overview (overwrites BGG data with a constant), disabled auth middleware, onboarding BGG import bug (`username` vs `bgg_username`), create-event contract mismatch, hardcoded dev user IDs.

---

## 4. Target Architecture

```
boardgame-social-v2/                 (Nx workspace root)
├── apps/
│   ├── web/                         Angular 21 app (standalone, SCSS, signals)
│   │   └── src/
│   │       ├── app/
│   │       │   ├── core/            singletons: services, guards, interceptors, supabase
│   │       │   ├── shared/          reusable UI components, pipes, directives
│   │       │   ├── layout/          app shell (sidebar, topbar), auth layout
│   │       │   ├── features/        lazy feature routes (auth, home, profile, …)
│   │       │   ├── styles/          design tokens + theme partials (SCSS)
│   │       │   ├── app.config.ts
│   │       │   ├── app.routes.ts
│   │       │   └── app.ts
│   │       ├── environments/
│   │       └── styles.scss
│   ├── api/                         NestJS 11 REST API (prefix /api)
│   │   └── src/app/
│   │       ├── collections/         list + BGG import
│   │       ├── games/               catalog + search + BGG details
│   │       ├── events/              create + list
│   │       ├── locations/           countries/subdivisions/venues
│   │       ├── plays/               NEW: log/list plays
│   │       ├── social/              NEW: feed, friends
│   │       ├── tier-lists/          NEW: persist tier lists
│   │       ├── bgg/                 BGG client + XML parsing/mapping
│   │       └── supabase/            admin + per-user clients, JWT guard
│   └── api-e2e/                     (optional) API e2e tests
├── libs/
│   ├── shared/                      @bgs/shared — interfaces/models/DTOs
│   └── ui/                          (optional) @bgs/ui — design-system components
├── nx.json
├── tsconfig.base.json               path aliases @bgs/shared, @bgs/ui
└── package.json
```

**Library naming / aliases (proposal):** `@bgs/shared`, `@bgs/ui`.

---

## 5. Tech Stack & Versions

| Area | Choice |
|------|--------|
| Monorepo | Nx (latest, v21+ to match Angular 21) with `@nx/angular`, `@nx/nest`, `@nx/js` |
| Frontend | Angular 21.2, standalone, signals, OnPush, native control flow (`@if`/`@for`/`@switch`) |
| Forms | Reactive Forms |
| Styling | SCSS with CSS custom properties for tokens; light + dark themes |
| HTTP | `provideHttpClient(withInterceptors([...]))` + functional interceptor for the API base + JWT |
| State | Signals for local/component state; small signal-based stores (services) for cross-cutting state (auth/session) |
| Backend | NestJS 11, `@nestjs/axios` + `fast-xml-parser` for BGG, `@supabase/supabase-js` |
| Data/Auth | Supabase (existing project): Postgres + Auth + Storage |
| Testing | Vitest (web, already wired) + Jest/Vitest (api) |
| Icons | Inline SVG components (or `lucide-angular` to mirror the original's `lucide-vue-next`) |
| Fonts | **Fraunces** (display/headings) + **Nunito** (body) — Game Night type pairing |

---

## 6. Phase 0 — Monorepo Conversion

**Recommended approach: recreate as an Nx integrated monorepo** (the current app is only the default template, so nothing of value is lost).

Steps:
1. Back up the current default workspace files we want to keep as reference (`angular.json`, `tsconfig*.json`) — mostly informational.
2. Scaffold a fresh Nx workspace targeting an Angular app, or run `npx nx@latest init` in place and then restructure. **Preferred:** create a clean Nx workspace in a temp dir and move it in, OR:
   - `npx nx@latest init` (adopt Nx in the existing repo)
   - `npx nx add @nx/angular` then move the app into `apps/web` (`nx g @nx/angular:move --project boardgame-social --destination apps/web`)
3. Add the NestJS plugin and app: `npx nx add @nx/nest` → `nx g @nx/nest:app api --directory=apps/api`.
4. Add the shared lib: `nx g @nx/js:lib shared --directory=libs/shared --importPath=@bgs/shared`.
5. (Optional) Add UI lib: `nx g @nx/angular:lib ui --directory=libs/ui --importPath=@bgs/ui`.
6. Configure `tsconfig.base.json` path aliases for `@bgs/shared` (+ `@bgs/ui`).
7. Confirm targets work: `nx serve web`, `nx serve api`, `nx build web`, `nx build api`, `nx lint`, `nx test`.

**Alternative (lower churn):** keep the Angular CLI workspace as-is for `web`, add Nx only as a task runner. *Rejected* because the chosen goal is a true Nx monorepo mirroring the original (Angular + Nest + shared in one graph).

**Acceptance:** `nx serve web` and `nx serve api` both run; `@bgs/shared` is importable from both.

---

## 7. Phase 1 — Design Tokens & Theme (Game Night)

Port the **Game Night** Figma foundations into SCSS. Source of truth = Figma file `p9cdnQTLHGc2CM2GALCb1K`, Foundations page.

**Action:** Transcribe the exact hex/typography/spacing values from the Figma Foundations page into `apps/web/src/app/styles/_tokens.scss` as CSS custom properties. Token **names** (already defined in Figma):

- **Color:** `bg/base`, `bg/raised`, `surface`, `surface/elevated`, `border`, `primary`, `primary/hover`, `primary/soft`, `accent`, `accent/soft`, `text/primary`, `text/secondary`, `text/muted`, `success`, `warning`, `danger`, and tier colors `tier/s`, `tier/a`, `tier/b`, `tier/c`, `tier/d`.
- **Typography:** Display/H1/H2/H3 = **Fraunces** (Black/Bold/SemiBold); Body/Caption/Overline = **Nunito** (Regular/Medium/SemiBold/Bold). Map each Figma text style to a SCSS mixin or utility class.
- **Spacing scale:** `xs 4`, `sm 8`, `md 12`, `lg 16`, `xl 24`, `2xl 32`, `3xl 48`, `4xl 64`.
- **Radius:** Game Night uses soft/rounded corners — capture the radius scale used per component.

Deliverables:
- `styles/_tokens.scss` — CSS custom properties (`--color-*`, `--space-*`, `--radius-*`, `--font-*`).
- `styles/_typography.scss` — font-face (or Google Fonts link in `index.html`) + heading/body classes/mixins.
- `styles/_themes.scss` — `:root` (light) + `[data-theme="dark"]` overrides.
- Global resets + base element styles in `styles.scss`; import token partials.
- Replace the default `index.html` `<title>` and add Fraunces + Nunito font loading.

**Note on values:** exact hex codes must be read from Figma during this step (not invented) to keep parity with the approved mock.

**Acceptance:** a tokens preview/storybook-ish page renders the palette, type scale, and spacing matching the Figma Foundations screenshot.

---

## 8. Phase 2 — Shared Lib (`@bgs/shared`)

Port the original `shared/src/interfaces/` into `libs/shared/src/lib/` and add models for the new features.

**Port (existing):** `Profile`, `Collection` (+ `collection_games`), `Game` (catalog), BGG raw shapes (`bggCollectionData`, `bggGameData`), `GameInfo` (mapped detail), `Play`/`LogPlay` (+ participants), `Event`, `Venue`/location, `Country`/`Subdivision`, `SelectItem`.

**Add (new features):** `Friendship`/`FriendRequest`, `Post`/`FeedItem` (+ `PostLike`, `PostComment`), `TierList`/`TierListItem`, and request/response **DTOs** for the new API endpoints.

**Acceptance:** both `web` and `api` import models from `@bgs/shared` with no duplication.

---

## 9. Phase 3 — Supabase Integration (web + api)

**Web (`apps/web/src/app/core/supabase/`):**
- `supabase.client.ts` — create client from `environment` (`SUPABASE_URL`, `SUPABASE_ANON_KEY`).
- `auth.service.ts` (signals): `session`, `user`, `profile` signals; `signIn`, `signUp`, `signOut`, `resetPassword`, `loadProfile`, `updateProfile`. Persist session via Supabase's built-in storage.
- `auth.guard.ts` (functional `CanActivateFn`) — **enforce auth** (fixing the original's disabled middleware); plus `onboarding.guard.ts` to require a completed profile.
- `api.interceptor.ts` — prefix relative API calls with `API_BASE` and attach the Supabase access token as `Authorization: Bearer`.
- Storage helpers for `avatars` and `events` buckets.

**API (`apps/api/src/app/supabase/`):**
- `supabase.service.ts` — admin client (`SUPABASE_SERVICE_ROLE_KEY`) + per-user client (anon key + forwarded JWT).
- `jwt-auth.guard.ts` — validate Bearer token; apply to protected routes.

**Environment variables (names only):**
- web: `SUPABASE_URL`, `SUPABASE_ANON_KEY`, `API_BASE` (default `http://localhost:3000/api`)
- api: `SUPABASE_URL`, `SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`, `FRONTEND_URL`, `PORT`, `NODE_ENV`

**Acceptance:** login round-trips against the real Supabase project; the interceptor attaches the JWT; protected API route rejects anonymous requests.

---

## 10. Phase 4 — NestJS API (fresh build)

Global prefix `/api`, CORS from `FRONTEND_URL`. Modules:

| Module | Endpoints | Notes |
|--------|-----------|-------|
| `bgg` | (internal client) | `axios` + `fast-xml-parser`; `/thing` + `/collection` fetch & map. Replaces the original's data-overwrite bug. |
| `collections` | `GET /collections`, `GET /collections/preview`, `POST /collections/import` | Import pipeline: fetch BGG XML → parse → upsert `collections` → resolve missing `games` → link `collection_games` → set `profiles.collection_imported`. Fix onboarding `bgg_username` usage. |
| `games` | `GET /games` (paginated/search), `GET /games/:id`, `GET /games/bggGameDetails?bggGameId=` | Use RPCs `get_game`, `get_game_details`, `search_game_name`. **Return real BGG data** (no constant override). |
| `events` | `POST /events`, **`GET /events`** (new) | Fix create-event DTO contract (`{ gameEvent }`). Add listing endpoint the original lacked. |
| `locations` | `GET /locations/countries`, `GET /locations/subdivisions`, `GET/POST /locations/venues` | Venues require JWT. |
| `plays` (new) | `POST /plays`, `GET /plays` | Proper play-logging API writing `plays` + `play_participants`. Replaces broken `logGame` store. |
| `social` (new) | `GET /feed`, `POST /posts`, `POST /posts/:id/like`, `POST /posts/:id/comments`, `GET /friends`, `POST /friends/requests`, `POST /friends/requests/:id/accept` | Backs the fully-designed feed + friends screens. |
| `tier-lists` (new) | `GET /tier-lists`, `POST /tier-lists`, `PUT /tier-lists/:id` | Persist tier-list ordering (replaces console.log-only UI). |

**Acceptance:** each endpoint returns typed DTOs from `@bgs/shared`; collection import works end-to-end against a real BGG username.

---

## 11. Phase 5 — App Shell & Layout

Build from the Game Night design:
- `layout/app-shell` — left **sidebar** nav (Home, Profile, Collection, Games, Tier List, Events, Settings) + **topbar** (search, theme toggle, user menu, primary CTA). Sidebar nav items lazy-route to features.
- `layout/auth-layout` — split-branding layout for auth screens.
- Responsive: collapse sidebar / show bottom tab nav at mobile breakpoints (mobile designs exist for Home, Collection, Game Detail).
- Theme toggle wired to `[data-theme]` + persisted preference.

**Acceptance:** shell matches the Game Night Home screenshot at 1440px; nav routing works; theme toggle switches light/dark.

---

## 12. Phase 6 — Feature Screens (lazy routes)

Each feature is a lazy-loaded standalone route under `features/`. Build order roughly mirrors original completeness + design priority.

| # | Route | Feature | Data source | Designed states |
|---|-------|---------|-------------|-----------------|
| 1 | `/login`, `/signup`, `/confirm-email`, `/forgot-password`, `/reset-password` | **Auth** | Supabase direct | Login, Sign Up, Password Reset (designed) |
| 2 | `/onboarding`, `/onboarding/import-games` | **Onboarding** | Supabase + API (BGG import) | profile setup + optional import |
| 3 | `/` | **Home — Social Feed** | API `social` | Feed (fully designed; new backend) |
| 4 | `/profile`, `/profile/edit`, `/user/:username` | **Profile** | Supabase (profile/stats) + API (collection preview) | Profile, Edit (designed) |
| 5 | `/collection` | **Collection** | API `collections` | grid (desktop + mobile designed) |
| 6 | `/games` | **Games catalog** | API `games` | browse + search/filters |
| 7 | `/game-overview/:id` | **Game Detail** | API `games`/BGG | detail (desktop + mobile designed) |
| 8 | `/play` | **Tier List** | API `tier-lists` | drag-rank UI + persistence (designed) |
| 9 | `/events` | **Events** | API `events` | list + create modal (designed) |
| 10 | `/settings` | **Settings** | Supabase | account/connected/notifications/appearance (designed) |
| — | Modals | **Log a Play**, **Create Event** | API `plays`/`events` | both modals designed |

**Per-screen conventions (from `.cursor/rules/cursor.mdc`):** standalone, `ChangeDetectionStrategy.OnPush`, `inject()`, `input()`/`output()`, `computed()` for derived state, signals for local state, native control flow, Reactive Forms, class/style bindings (no `ngClass`/`ngStyle`), `NgOptimizedImage` for static images, WCAG AA + AXE pass.

**Acceptance per screen:** visual parity with the Game Night mock (desktop, and mobile where designed); loading/empty/error states; keyboard + screen-reader accessible.

---

## 13. Data Model (Supabase)

**Existing (reuse):** `profiles`; `collections`, `collection_games`; `games`; `plays`, `play_participants`; `events`; `locations`, `countries`, `subdivisions`. RPCs: `get_user_collection`, `get_game_preview`, `get_missing_game_ids`, `get_game_details`, `get_game`, `search_game_name`, `get_user_locations`.

**New tables required for the fully-designed features:**
- `friendships` (user_id, friend_id, status) and/or `friend_requests`
- `posts` (author_id, type, body, game_id?, created_at), `post_likes`, `post_comments`
- `tier_lists` (user_id, name), `tier_list_items` (tier_list_id, game_id, tier, position)
- (Confirm `plays`/`play_participants` columns support the Log-a-Play form fields)

**Open item:** original DB schema/migrations are **not** in the repo (they live in Supabase). Decide whether to add SQL migrations to v2 for the new tables (recommended) and how to apply them (Supabase migration files vs. dashboard). RLS policies needed for all new tables.

---

## 14. Cross-Cutting Concerns

- **Auth enforcement:** apply route guards (the original left auth disabled).
- **Error handling:** global HTTP error interceptor → toast/snackbar service (port `useSnackBar`).
- **Loading/empty states:** standardized skeletons + empty-state component in `@bgs/ui`.
- **Accessibility:** AXE checks in CI; focus management on route change + modals; color-contrast verified against tokens.
- **Forms/validation:** shared validators (email etc.), reactive form helpers (port `useFormValidation`).
- **Image uploads:** avatar + event image → Supabase Storage (port `useAvatarUpload`, `useEventImgUpload`).
- **Config:** `environment.ts` / `environment.development.ts`; never commit real keys (use `.env`/CI secrets; provide `.env.example`).

---

## 15. Testing & Quality

- **Web:** Vitest unit tests for services/guards/critical components; key user flows (login, import, log play).
- **API:** unit tests for BGG parsing/mapping + service logic; e2e for import + plays + feed.
- **Lint:** `nx lint` across projects; strict TS (`strict: true`, no `any`, prefer `unknown`).
- **CI (later):** `nx affected -t lint test build`.

---

## 16. Suggested Milestones / Sequencing

1. **M0 — Monorepo:** Nx workspace with `web`, `api`, `@bgs/shared`; both serve.
2. **M1 — Design system:** tokens/typography/themes ported; tokens preview matches Figma.
3. **M2 — Shell + Auth:** app shell + auth screens + Supabase auth + guards working end-to-end.
4. **M3 — Core data screens:** Collection, Games catalog, Game Detail, Profile (with real BGG import via fresh API).
5. **M4 — Engagement features:** Tier List (persisted), Events (list + create), Log a Play.
6. **M5 — Social:** Home feed + Friends (new tables + endpoints).
7. **M6 — Polish:** Settings, mobile responsiveness, a11y pass, empty/error states, tests, CI.

---

## 17. Open Questions / Risks

- **DB migrations:** add SQL migrations for the new social/tier tables to v2, or manage in Supabase dashboard? (Recommend versioned SQL in repo.)
- **Exact design tokens:** must be transcribed from Figma during Phase 1 (not yet captured as hex in this plan).
- **BGG reliability:** BGG XML API is rate-limited/occasionally 202-queued; the import client needs retry/backoff (original used `rejectUnauthorized:false` as a dev hack — replace with proper handling).
- **`vuedraggable` analog:** pick an Angular drag-drop solution for the tier list (Angular CDK `DragDrop`).
- **Lucide icons:** confirm `lucide-angular` vs hand-rolled inline SVGs.
- **Nx adoption method:** confirm `nx init`-in-place vs fresh-workspace-then-move.
- **Hosting/deploy:** original used Heroku via `Procfile`; decide v2 target (out of scope for initial build).

---

*End of plan — awaiting approval before implementation.*
