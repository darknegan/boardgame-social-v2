# Board Game Social v2

Nx monorepo rebuild of the original Vue/Nuxt app in **Angular 21** with a fresh **NestJS** API and **Game Night** design system.

## Structure

```
apps/
  web/     Angular 21 standalone app (Game Night theme)
  api/     NestJS REST API (/api prefix)
libs/
  shared/  @bgs/shared TypeScript interfaces
```

## Quick start

```bash
npm install --legacy-peer-deps

# Web (http://localhost:4200) — dev preview works without Supabase keys
npm run start:web

# API (http://localhost:3000/api)
cp apps/api/.env.example apps/api/.env   # add your Supabase keys
npm run start:api
```

## Environment

**Web** — copy `apps/web/.env.example` values into `apps/web/src/environments/environment.development.ts`:
- `SUPABASE_URL`
- `SUPABASE_ANON_KEY`
- `API_BASE` (default `http://localhost:3000/api`)

Set `devPreview: false` once Supabase is configured.

**API** — `apps/api/.env`:
- `SUPABASE_URL`, `SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`
- `FRONTEND_URL=http://localhost:4200`
- `PORT=3000`

## Build

```bash
npm run build        # web + api
npm run build:web
npm run build:api
```

## What's implemented

- Nx monorepo with `@bgs/shared` lib
- Game Night design tokens (SCSS CSS variables)
- App shell (sidebar + topbar) + auth layout
- Lazy routes for all core screens
- Home feed UI + login form
- Supabase auth service, guards, API interceptor
- NestJS modules: collections, games, events, locations, plays, social, tier-lists
- SQL migration for new social/tier tables (`docs/migrations/`)

## Next steps

See `intialApp.plan.md` for the full phased plan. Remaining work: wire each feature screen to real API/Supabase data, flesh out auth screens (signup, reset), modals (log play, create event), and mobile layouts.
