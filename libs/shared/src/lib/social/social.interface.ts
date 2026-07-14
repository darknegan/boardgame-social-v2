export type PostType = 'play' | 'collection' | 'event' | 'tier_list' | 'text';

export interface FeedPost {
  id: string;
  author_id: string;
  author_username: string;
  author_display_name?: string;
  author_avatar_url?: string;
  type: PostType;
  body: string;
  game_id?: string;
  game_name?: string;
  created_at: string;
  like_count: number;
  comment_count: number;
  liked_by_me?: boolean;
}

export type FriendshipStatus = 'pending' | 'accepted' | 'declined';

export interface Friend {
  id: string;
  user_id: string;
  friend_id: string;
  username: string;
  display_name?: string;
  avatar_url?: string;
  status: FriendshipStatus;
}

export interface CreatePostDto {
  type: PostType;
  body: string;
  game_id?: string;
}

export interface FriendRequestDto {
  username: string;
}

export interface CreateCommentDto {
  body: string;
}

export interface PostComment {
  id: string;
  post_id: string;
  author_id: string;
  author_username: string;
  author_display_name?: string;
  body: string;
  created_at: string;
}
