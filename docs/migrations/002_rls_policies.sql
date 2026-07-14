-- RLS policies for social + tier-list tables (002)
-- Run after 001_social_tier_tables.sql

alter table posts enable row level security;
alter table post_likes enable row level security;
alter table post_comments enable row level security;
alter table friendships enable row level security;
alter table tier_lists enable row level security;
alter table tier_list_items enable row level security;

-- Posts: authenticated users can read all; authors manage own
create policy "posts_select_authenticated"
  on posts for select
  to authenticated
  using (true);

create policy "posts_insert_own"
  on posts for insert
  to authenticated
  with check (auth.uid() = author_id);

create policy "posts_update_own"
  on posts for update
  to authenticated
  using (auth.uid() = author_id);

create policy "posts_delete_own"
  on posts for delete
  to authenticated
  using (auth.uid() = author_id);

-- Post likes
create policy "post_likes_select_authenticated"
  on post_likes for select
  to authenticated
  using (true);

create policy "post_likes_insert_own"
  on post_likes for insert
  to authenticated
  with check (auth.uid() = user_id);

create policy "post_likes_delete_own"
  on post_likes for delete
  to authenticated
  using (auth.uid() = user_id);

-- Post comments
create policy "post_comments_select_authenticated"
  on post_comments for select
  to authenticated
  using (true);

create policy "post_comments_insert_own"
  on post_comments for insert
  to authenticated
  with check (auth.uid() = author_id);

create policy "post_comments_delete_own"
  on post_comments for delete
  to authenticated
  using (auth.uid() = author_id);

-- Friendships
create policy "friendships_select_participant"
  on friendships for select
  to authenticated
  using (auth.uid() = user_id or auth.uid() = friend_id);

create policy "friendships_insert_requester"
  on friendships for insert
  to authenticated
  with check (auth.uid() = user_id);

create policy "friendships_update_participant"
  on friendships for update
  to authenticated
  using (auth.uid() = user_id or auth.uid() = friend_id);

-- Tier lists
create policy "tier_lists_select_authenticated"
  on tier_lists for select
  to authenticated
  using (true);

create policy "tier_lists_insert_own"
  on tier_lists for insert
  to authenticated
  with check (auth.uid() = user_id);

create policy "tier_lists_update_own"
  on tier_lists for update
  to authenticated
  using (auth.uid() = user_id);

create policy "tier_lists_delete_own"
  on tier_lists for delete
  to authenticated
  using (auth.uid() = user_id);

-- Tier list items (via tier list ownership)
create policy "tier_list_items_select_authenticated"
  on tier_list_items for select
  to authenticated
  using (true);

create policy "tier_list_items_manage_own"
  on tier_list_items for all
  to authenticated
  using (
    exists (
      select 1 from tier_lists tl
      where tl.id = tier_list_id and tl.user_id = auth.uid()
    )
  )
  with check (
    exists (
      select 1 from tier_lists tl
      where tl.id = tier_list_id and tl.user_id = auth.uid()
    )
  );
