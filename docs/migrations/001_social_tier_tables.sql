-- New tables for Board Game Social v2 social + tier-list features
-- Apply via Supabase SQL editor or migration pipeline

create table if not exists posts (
  id uuid primary key default gen_random_uuid(),
  author_id uuid not null references auth.users(id) on delete cascade,
  type text not null check (type in ('play', 'collection', 'event', 'tier_list', 'text')),
  body text not null,
  game_id text,
  game_name text,
  like_count int not null default 0,
  comment_count int not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists post_likes (
  id uuid primary key default gen_random_uuid(),
  post_id uuid not null references posts(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  created_at timestamptz not null default now(),
  unique (post_id, user_id)
);

create table if not exists post_comments (
  id uuid primary key default gen_random_uuid(),
  post_id uuid not null references posts(id) on delete cascade,
  author_id uuid not null references auth.users(id) on delete cascade,
  body text not null,
  created_at timestamptz not null default now()
);

create table if not exists friendships (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  friend_id uuid not null references auth.users(id) on delete cascade,
  status text not null default 'pending' check (status in ('pending', 'accepted', 'declined')),
  created_at timestamptz not null default now(),
  unique (user_id, friend_id)
);

create table if not exists tier_lists (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null unique references auth.users(id) on delete cascade,
  name text not null default 'My Tier List',
  updated_at timestamptz not null default now()
);

create table if not exists tier_list_items (
  id uuid primary key default gen_random_uuid(),
  tier_list_id uuid not null references tier_lists(id) on delete cascade,
  game_id int not null,
  bgg_game_id int not null,
  name text not null,
  thumbnail_url text,
  tier text not null check (tier in ('S', 'A', 'B', 'C', 'D')),
  position int not null default 0
);

create index if not exists idx_posts_author on posts(author_id);
create index if not exists idx_posts_created on posts(created_at desc);
create index if not exists idx_friendships_user on friendships(user_id);
create index if not exists idx_tier_list_items_list on tier_list_items(tier_list_id);
