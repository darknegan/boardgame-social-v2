import { Injectable } from '@nestjs/common';
import {
  CreateCommentDto,
  CreatePostDto,
  FeedPost,
  Friend,
  PostComment,
} from '@bgs/shared';
import { SupabaseService } from '../supabase/supabase.service';

@Injectable()
export class SocialService {
  constructor(private readonly supabase: SupabaseService) {}

  async getFeed(userId: string): Promise<FeedPost[]> {
    const admin = this.supabase.getAdminClient();
    const { data, error } = await admin
      .from('posts')
      .select('*, profiles:author_id(username, display_name, profile_picture_url)')
      .order('created_at', { ascending: false })
      .limit(50);

    if (error) {
      return this.getMockFeed(userId);
    }

    const postIds = (data ?? []).map((r) => r.id);
    const likedIds = await this.getLikedPostIds(userId, postIds);

    return (data ?? []).map((row) => ({
      id: row.id,
      author_id: row.author_id,
      author_username: row.profiles?.username ?? 'user',
      author_display_name: row.profiles?.display_name,
      author_avatar_url: row.profiles?.profile_picture_url,
      type: row.type,
      body: row.body,
      game_id: row.game_id,
      game_name: row.game_name,
      created_at: row.created_at,
      like_count: row.like_count ?? 0,
      comment_count: row.comment_count ?? 0,
      liked_by_me: likedIds.has(row.id),
    }));
  }

  async createPost(userId: string, dto: CreatePostDto): Promise<FeedPost> {
    const now = new Date().toISOString();
    const admin = this.supabase.getAdminClient();
    const { data, error } = await admin
      .from('posts')
      .insert({
        author_id: userId,
        type: dto.type,
        body: dto.body,
        game_id: dto.game_id ?? null,
        created_at: now,
      })
      .select()
      .single();

    if (error) throw new Error(error.message);

    const profile = await this.getProfile(userId);

    return {
      id: data.id,
      author_id: userId,
      author_username: profile?.username ?? 'you',
      author_display_name: profile?.display_name,
      author_avatar_url: profile?.profile_picture_url,
      type: dto.type,
      body: dto.body,
      game_id: dto.game_id,
      created_at: now,
      like_count: 0,
      comment_count: 0,
      liked_by_me: false,
    };
  }

  async toggleLike(userId: string, postId: string): Promise<{ liked: boolean }> {
    const admin = this.supabase.getAdminClient();
    const { data: existing } = await admin
      .from('post_likes')
      .select('id')
      .eq('post_id', postId)
      .eq('user_id', userId)
      .maybeSingle();

    if (existing) {
      await admin.from('post_likes').delete().eq('id', existing.id);
      await this.adjustCount('posts', postId, 'like_count', -1);
      return { liked: false };
    }

    await admin.from('post_likes').insert({ post_id: postId, user_id: userId });
    await this.adjustCount('posts', postId, 'like_count', 1);
    return { liked: true };
  }

  async addComment(
    userId: string,
    postId: string,
    dto: CreateCommentDto,
  ): Promise<PostComment> {
    const admin = this.supabase.getAdminClient();
    const now = new Date().toISOString();
    const { data, error } = await admin
      .from('post_comments')
      .insert({ post_id: postId, author_id: userId, body: dto.body, created_at: now })
      .select()
      .single();

    if (error) throw new Error(error.message);

    await this.adjustCount('posts', postId, 'comment_count', 1);
    const profile = await this.getProfile(userId);

    return {
      id: data.id,
      post_id: postId,
      author_id: userId,
      author_username: profile?.username ?? 'user',
      author_display_name: profile?.display_name,
      body: dto.body,
      created_at: now,
    };
  }

  async getFriends(userId: string): Promise<Friend[]> {
    const admin = this.supabase.getAdminClient();
    const { data, error } = await admin
      .from('friendships')
      .select('*')
      .or(`user_id.eq.${userId},friend_id.eq.${userId}`);

    if (error) return [];

    const rows = data ?? [];
    const profileIds = new Set<string>();
    for (const row of rows) {
      profileIds.add(row.user_id === userId ? row.friend_id : row.user_id);
    }

    const profiles = await this.getProfiles([...profileIds]);

    return rows.map((row) => {
      const otherId = row.user_id === userId ? row.friend_id : row.user_id;
      const profile = profiles.get(otherId);
      return {
        id: row.id,
        user_id: row.user_id,
        friend_id: row.friend_id,
        username: profile?.username ?? 'user',
        display_name: profile?.display_name,
        avatar_url: profile?.profile_picture_url,
        status: row.status,
      };
    });
  }

  async sendFriendRequest(userId: string, username: string): Promise<Friend> {
    const admin = this.supabase.getAdminClient();
    const { data: target, error: lookupError } = await admin
      .from('profiles')
      .select('id, username, display_name, profile_picture_url')
      .eq('username', username)
      .maybeSingle();

    if (lookupError || !target) throw new Error('User not found');
    if (target.id === userId) throw new Error('Cannot add yourself');

    const { data, error } = await admin
      .from('friendships')
      .insert({ user_id: userId, friend_id: target.id, status: 'pending' })
      .select()
      .single();

    if (error) throw new Error(error.message);

    return {
      id: data.id,
      user_id: userId,
      friend_id: target.id,
      username: target.username,
      display_name: target.display_name,
      avatar_url: target.profile_picture_url,
      status: 'pending',
    };
  }

  async acceptFriendRequest(userId: string, requestId: string): Promise<Friend> {
    const admin = this.supabase.getAdminClient();
    const { data: request, error: fetchError } = await admin
      .from('friendships')
      .select('*')
      .eq('id', requestId)
      .maybeSingle();

    if (fetchError || !request) throw new Error('Request not found');
    if (request.friend_id !== userId) throw new Error('Not authorized');
    if (request.status !== 'pending') throw new Error('Request already handled');

    const { data, error } = await admin
      .from('friendships')
      .update({ status: 'accepted' })
      .eq('id', requestId)
      .select()
      .single();

    if (error) throw new Error(error.message);

    const profile = await this.getProfile(request.user_id);

    return {
      id: data.id,
      user_id: data.user_id,
      friend_id: data.friend_id,
      username: profile?.username ?? 'user',
      display_name: profile?.display_name,
      avatar_url: profile?.profile_picture_url,
      status: 'accepted',
    };
  }

  private async getLikedPostIds(userId: string, postIds: string[]): Promise<Set<string>> {
    if (!postIds.length) return new Set();
    const { data } = await this.supabase
      .getAdminClient()
      .from('post_likes')
      .select('post_id')
      .eq('user_id', userId)
      .in('post_id', postIds);
    return new Set((data ?? []).map((r) => r.post_id));
  }

  private async adjustCount(
    table: string,
    id: string,
    column: string,
    delta: number,
  ): Promise<void> {
    const admin = this.supabase.getAdminClient();
    const { data } = await admin.from(table).select(column).eq('id', id).single();
    if (!data) return;
    const current = (data as unknown as Record<string, number>)[column] ?? 0;
    await admin
      .from(table)
      .update({ [column]: Math.max(0, current + delta) })
      .eq('id', id);
  }

  private async getProfile(userId: string) {
    const { data } = await this.supabase
      .getAdminClient()
      .from('profiles')
      .select('username, display_name, profile_picture_url')
      .eq('id', userId)
      .maybeSingle();
    return data;
  }

  private async getProfiles(ids: string[]) {
    const map = new Map<string, { username: string; display_name?: string; profile_picture_url?: string }>();
    if (!ids.length) return map;
    const { data } = await this.supabase
      .getAdminClient()
      .from('profiles')
      .select('id, username, display_name, profile_picture_url')
      .in('id', ids);
    for (const p of data ?? []) {
      map.set(p.id, p);
    }
    return map;
  }

  private getMockFeed(userId: string): FeedPost[] {
    return [
      {
        id: 'mock-1',
        author_id: userId,
        author_username: 'alexplays',
        author_display_name: 'Alex',
        type: 'play',
        body: 'Logged a play of Wingspan — 87 points!',
        game_name: 'Wingspan',
        created_at: new Date().toISOString(),
        like_count: 3,
        comment_count: 1,
        liked_by_me: false,
      },
      {
        id: 'mock-2',
        author_id: 'friend-1',
        author_username: 'meeplemaven',
        author_display_name: 'Sam',
        type: 'collection',
        body: 'Added 12 new titles from BGG import.',
        created_at: new Date(Date.now() - 3600000).toISOString(),
        like_count: 8,
        comment_count: 2,
        liked_by_me: false,
      },
    ];
  }
}
