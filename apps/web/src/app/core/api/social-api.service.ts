import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  CreateCommentDto,
  CreatePostDto,
  FeedPost,
  Friend,
  FriendRequestDto,
  PostComment,
} from '@bgs/shared';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SocialApiService {
  private readonly http = inject(HttpClient);

  getFeed(): Observable<FeedPost[]> {
    return this.http.get<FeedPost[]>('/social/feed');
  }

  createPost(dto: CreatePostDto): Observable<FeedPost> {
    return this.http.post<FeedPost>('/social/posts', dto);
  }

  toggleLike(postId: string): Observable<{ liked: boolean }> {
    return this.http.post<{ liked: boolean }>(`/social/posts/${postId}/like`, {});
  }

  /** @deprecated Use toggleLike */
  likePost(postId: string): Observable<{ liked: boolean }> {
    return this.toggleLike(postId);
  }

  addComment(postId: string, body: string): Observable<PostComment> {
    const dto: CreateCommentDto = { body };
    return this.http.post<PostComment>(`/social/posts/${postId}/comments`, dto);
  }

  /** @deprecated Use addComment(postId, body) */
  commentOnPost(postId: string, dto: CreateCommentDto): Observable<PostComment> {
    return this.addComment(postId, dto.body);
  }

  getFriends(): Observable<Friend[]> {
    return this.http.get<Friend[]>('/social/friends');
  }

  sendFriendRequest(username: string): Observable<Friend> {
    const dto: FriendRequestDto = { username };
    return this.http.post<Friend>('/social/friends/requests', dto);
  }

  acceptFriendRequest(requestId: string): Observable<Friend> {
    return this.http.post<Friend>(`/social/friends/requests/${requestId}/accept`, {});
  }
}
